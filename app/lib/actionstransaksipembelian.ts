'use server';

import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Schema untuk validasi data transaksi pembelian
const FormSchema = z.object({
  id_transaksi_pembelian: z.string().optional(),
  nama_supplier: z.string(),
  total_harga: z.number().optional(), // Optional karena dihitung terpisah
  tanggal_pembelian: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Format tanggal tidak valid. Gunakan format YYYY-MM-DD.",
  }),
  stokList: z.array(
    z.object({
      id_stok: z.string(),
      nama_barang: z.string(),
      harga_barang: z.number(),
      jumlah_barang: z.number(),
    })
  ),
});

// Fungsi untuk membuat transaksi pembelian
export async function Createtransaksipembelian(formData: FormData) {
  const id_transaksi_pembelian = uuidv4();
  const nama_supplier = formData.get("nama_supplier")?.toString() || "";
  const tanggal_pembelian = formData.get("tanggal_pembelian")?.toString() || new Date().toISOString();
  const stokListRaw = formData.get("stokList")?.toString() || "[]";

  try {
    await sql`BEGIN`;

    // Hitung total harga berdasarkan data stokList
    const stokList = JSON.parse(stokListRaw);
    const total_harga = stokList.reduce((total: number, stok: any) => {
      return total + stok.harga_barang * stok.jumlah_barang;
    }, 0);

    // Parsing dan validasi data
    const parsedData = FormSchema.parse({
      id_transaksi_pembelian,
      nama_supplier,
      total_harga,
      tanggal_pembelian,
      stokList,
    });

    // Masukkan data transaksi pembelian
    await sql`
      INSERT INTO transaksi_pembelian
      (id_transaksi_pembelian, nama_supplier, total_harga, tanggal_pembelian)
      VALUES
      (${parsedData.id_transaksi_pembelian}, ${parsedData.nama_supplier}, ${parsedData.total_harga}, ${parsedData.tanggal_pembelian});
    `;

    // Masukkan data detail pembelian
    for (const stok of parsedData.stokList) {
      await sql`
        INSERT INTO detail_pembelian
        (id_transaksi_pembelian, id_stok, nama_barang, harga_barang, total_harga)
        VALUES
        (${parsedData.id_transaksi_pembelian}, ${stok.id_stok}, ${stok.nama_barang}, ${stok.harga_barang}, ${stok.harga_barang * stok.jumlah_barang});
      `;
    }

    // Masukkan data stok terkait transaksi pembelian (opsional, tergantung struktur tabel stok_transaksi_pembelian)
    for (const stok of parsedData.stokList) {
      await sql`
        INSERT INTO stok_transaksi_pembelian
        (id_transaksi_pembelian, id_stok, nama_barang, harga_barang, jumlah_barang)
        VALUES
        (${parsedData.id_transaksi_pembelian}, ${stok.id_stok}, ${stok.nama_barang}, ${stok.harga_barang}, ${stok.jumlah_barang});
      `;
    }

    await sql`COMMIT`;

    return {
      id_transaksi_pembelian,
      total_harga,
      tanggal_pembelian,
    };
  } catch (error) {
    await sql`ROLLBACK`;
    console.error('Error in transaction:', error);
    throw new Error("Failed to create transaction due to an unknown error.");
  }
}

// Fungsi untuk menghapus transaksi pembelian
export async function deleteTransaksipembelian(id: string) {
  await sql`DELETE FROM transaksi_pembelian WHERE id_transaksi_pembelian = ${id}`;
  revalidatePath('/dashboard/transaksipembelian');
}

// Fungsi untuk menampilkan detail transaksi pembelian
export async function tampiltransaksipembelian(id: string) {
  try {
    const result = await sql`
      SELECT *
      FROM transaksi_pembelian 
      WHERE id_transaksi_pembelian = ${id}
    `;
    console.log(result.rows); // Debugging
    revalidatePath('/dashboard/transaksipembelian');
  } catch (error) {
    console.error('Kesalahan saat mengambil transaksi pembelian:', error);
  }
}
