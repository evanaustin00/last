  'use server';

  import { signIn } from '../../auth';
  import { AuthError } from 'next-auth';
  import { z } from 'zod';
  import { sql } from '@vercel/postgres';
  import { revalidatePath } from 'next/cache';
  import { redirect } from 'next/navigation';
  import { v4 as uuidv4 } from 'uuid';

  // export type State = {
  //   errors?: {
  //     id_transaksi_penjualan?: string[];
  //     id_pelanggan?: string[];
  //     harga?: number[];
  //     tanggal_transaksi?: string[];
  //     id_pegawai?: string[];
  //     nama_pegawai?: string[];
  //     nama_pelanggan?: string[];
  //     nama_produk?: string[];
  //     total_transaksi?: number[];
  //     diskon?: number[];
  //     id_produk?: string[];
  //     harga_produk?: number[];
  //     quantity?: number[];
  //     no_hp?: string[];
  //   };
  //   message?: string | number ;
  // };

  // Define the Zod Schema for form validation
  const FormSchema = z.object({
    // id: z.string(),
    id_transaksi_penjualan: z.string().optional(),
    id_pelanggan: z.string().optional(),
    harga_produk: z.number().optional(),
    total_transaksi: z.number(),
    tanggal_transaksi: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format. Expected YYYY-MM-DD.",
      }),
    id_pegawai: z.string().optional(),
    nama_pelanggan: z.string().optional(),
    no_hp: z.string(),
    jumlah_penjualan: z.number(),
    produkList: z.array(
      z.object({
        id_produk: z.string(),
        nama_produk: z.string(),
        harga_produk: z.number(),
        quantity: z.number(),
      })
    ),
  });

  // Create a schema for creating `transaksipenjualan`
  // const CreateTransaksipenjualan = FormSchema.omit({ id: true });

  export async function createtransaksipenjualan(formData: FormData) {
    const id_transaksi_penjualan = uuidv4();  // Generate a new transaction ID if it's not passed
    const id_pegawai = formData.get("id_pegawai")?.toString() || null;  // Use a fallback if not provided
    const tanggal_transaksi = new Date().toISOString(); // Get today's date
    const totalTransaksi = parseFloat(formData.get("total_transaksi")?.toString() || "0");
    const id_pelanggan = formData.get("id_pelanggan")?.toString();
  
    // Ensure produkList is provided
    const produkList = formData.get("produkList")?.toString();
  
    if (!produkList) {
      throw new Error('produkList is required.');
    }
  
    try {
      await sql`BEGIN`;
  
      // Parse produkList
      const produkListParsed = JSON.parse(formData.get("produkList")?.toString() || "[]").map((produk: any) => ({
        ...produk,
        harga_produk: parseFloat(produk.harga_produk),
      }));
  
      // Validate formData with the schema
      const parsedData = FormSchema.parse({
        id_transaksi_penjualan,  // Transaction ID (auto-generated)
        total_transaksi: parseFloat(formData.get("total_transaksi")?.toString() || "0"),
        tanggal_transaksi,  // Transaction date
        id_pegawai,  // Employee ID (may be auto-generated)
        nama_pelanggan: formData.get("nama_pelanggan")?.toString(),  // Customer name
        no_hp: formData.get("no_hp")?.toString(),  // Customer phone number
        diskon: Number(formData.get("diskon")?.toString()),  // Discount (defaults to 0)
        produkList: produkListParsed, // List of products
        totalTransaksi: totalTransaksi,
        jumlah_penjualan: parseFloat(formData.get("jumlah_penjualan")?.toString() || "0"),
      });
  
      // Query for the customer based on phone number
      const pelangganQueryResult = await sql`
          SELECT id_pelanggan, nama_pelanggan, no_hp
          FROM pelanggan
          WHERE no_hp = ${parsedData.no_hp}
          LIMIT 1;
        `;
  
      let id_pelanggan;
  
      if (pelangganQueryResult.rows.length > 0) {
        // If the customer exists, use their ID
        id_pelanggan = pelangganQueryResult.rows[0].id_pelanggan;
      } else {
        // Optionally handle creating a new customer if needed
        id_pelanggan = uuidv4();
        await sql`
          INSERT INTO pelanggan (id_pelanggan, nama_pelanggan, no_hp)
            VALUES (${id_pelanggan}, ${parsedData.nama_pelanggan}, ${parsedData.no_hp});
          `;
      }
  
      // Combine all product names to insert into transaksi_penjualan
      const namaProduk = parsedData.produkList.map((produk: any) => produk.nama_produk).join(', ');
  
      // Insert the main transaction record (including total_transaksi, tanggal_transaksi, and nama_produk)
      await sql`
          INSERT INTO transaksi_penjualan
          (id_transaksi_penjualan, id_pegawai, id_pelanggan, total_transaksi, tanggal_transaksi, nama_produk)
          VALUES
          (${id_transaksi_penjualan}, ${id_pegawai}, ${id_pelanggan}, ${parsedData.total_transaksi}, ${tanggal_transaksi}, ${namaProduk});
        `;
  
      // **REMOVE the insertion into detail_penjualan to prevent inserting NULL values**.
      // No insertion into detail_penjualan anymore.
  
      // Convert total_transaksi to XP (1 XP = Rp1.000)
      await sql`
      UPDATE pelanggan 
      SET jumlah_xp = pelanggan.jumlah_xp + ${totalTransaksi}
      FROM transaksi_penjualan 
      WHERE transaksi_penjualan.id_pelanggan = pelanggan.id_pelanggan::text
      AND transaksi_penjualan.id_transaksi_penjualan = ${id_transaksi_penjualan};
      `;
  
      // Update employee sales count
      await sql`
      UPDATE pegawai
      SET jumlah_penjualan = jumlah_penjualan + 1
      WHERE id_pegawai = ${id_pegawai};
    `;
  
      await sql`COMMIT`;
  
      // Return response with transaction details
      return {
        id_transaksi_penjualan,
        id_pegawai,
        id_pelanggan,
        total_transaksi: totalTransaksi,
        tanggal_transaksi,
      };
    } catch (error) {
      await sql`ROLLBACK`;
      console.error('Error in transaction:', error);
      throw new Error("Failed to create transaction due to an unknown error.");
    }
  }
  




  // export async function updatetransaksipenjualan(id: string, formData: FormData) {
  //   // Validate the input data using the Zod schema
  //   const {nama_pelanggan, no_hp, total_transaksi} = createtransaksipenjualan.parse({
  //     id_transaksi_penjualan: formData.get('id_transaksi_penjualan'),  // Transaction ID
  //     total_transaksi: formData.get('total_transaksi'),  // Total transaction amount
  //     id_pegawai: formData.get('id_pegawai'),  // Employee ID (optional)
  //     nama_pelanggan: formData.get('nama_pelanggan'),  // Customer name
  //     no_hp: formData.get('no_hp'),  // Customer phone number
  //     diskon: formData.get('diskon'),  // Discount (defaults to 0)
  //     produkList: JSON.parse(formData.get('produkList')?.toString() || '[]'),  // Product list
  //   });

  //   const date = new Date().toISOString().split('T')[0]; // Get today's date

  //   // Update the validated data in the database
  //   await sql`
  //     UPDATE transaksi_penjualan 
  //     SET total_transaksi = ${total_transaksi}, 
  //         nama_pelanggan = ${nama_pelanggan}, 
  //         no_hp = ${no_hp}, 
  //         tanggal_transaksi = ${date}
  //     WHERE id_transaksi_penjualan = ${id};
  //   `;

  //   // Revalidate the path to reflect the changes
  //   revalidatePath('/dashboard/transaksipenjualan');  // Only one argument
  //   redirect('/dashboard/transaksipenjualan');        // Only one argument
  // }

  export async function tampiltransaksipenjualan(id: string) {
    try {
      const result = await sql`
        SELECT * 
        FROM detail_penjualan 
        WHERE id_transaksi_penjualan = ${id}
      `;
      console.log(result); // Log hasil query ke console untuk memeriksa data
      revalidatePath('/dashboard/transaksipenjualan');
    } catch (error) {
      console.error('Error fetching transaksi penjualan:', error);
    }
  }

  export async function deleteTransaksipenjualan(id: string) {
    await sql`DELETE FROM transaksi_penjualan WHERE id_transaksi_penjualan = ${id}`;
    revalidatePath('/dashboard/transaksipenjualan');
  }

  export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }
