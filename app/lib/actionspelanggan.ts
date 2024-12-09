'use server';
 
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  id_pelanggan: z.string(),
  nama_pelanggan: z.coerce.string(),
  alamat: z.coerce.string(),
  no_hp: z.coerce.string(),
  jumlah_xp: z.coerce.string(),
  tingkat: z.coerce.string(),
});

const CreatePelanggan = FormSchema.omit({ id: true});

export async function createPelanggan(formData: FormData) {
  const { id_pelanggan, nama_pelanggan, alamat, no_hp, jumlah_xp, tingkat } = CreatePelanggan.parse({
  
    id_pelanggan: formData.get('id_pelanggan'),
    nama_pelanggan: formData.get('nama_pelanggan'),
    alamat: formData.get('alamat'),
    no_hp: formData.get('no_hp'),
    jumlah_xp: formData.get('jumlah_xp')

    
  });
//   const amountInCents = harga_produk * 100;
  const date = new Date().toISOString().split('T')[0];
  await sql`
  INSERT INTO pelanggan (nama_pelanggan, alamat, no_hp, jumlah_xp)
  VALUES (${nama_pelanggan}, ${alamat}, ${no_hp}, ${jumlah_xp})
`;
;
  // Test it out:
  revalidatePath('/dashboard/pelanggan');
  redirect('/dashboard/pelanggan');
}

export async function updatePelanggan(id: string, formData: FormData) {
  const { nama_pelanggan, alamat, no_hp, jumlah_xp } = CreatePelanggan.parse({
    id_pelanggan: formData.get('id_pelanggan'),
    nama_pelanggan: formData.get('nama_pelanggan'),
    alamat: formData.get('alamat'),
    no_hp: formData.get('no_hp'),
    jumlah_xp: formData.get('jumlah_xp'),
  });

  const date = new Date().toISOString().split('T')[0];
  await sql`
    UPDATE pelanggan 
    SET nama_pelanggan = ${nama_pelanggan}, alamat = ${alamat}, no_hp = ${no_hp}, jumlah_xp = ${jumlah_xp}
    WHERE id_pelanggan = ${id} 
  `;

  revalidatePath('/dashboard/pelanggan');
  redirect('/dashboard/pelanggan');
}

export async function deletePelanggan(id: string) {
  await sql`DELETE FROM detail_penjualan WHERE id_transaksi_penjualan IN (SELECT id_transaksi_penjualan FROM transaksi_penjualan WHERE id_pelanggan = ${id})`;

  // Then, delete records from 'transaksi_penjualan'
  await sql`DELETE FROM transaksi_penjualan WHERE id_pelanggan = ${id}`;

  // Finally, delete the 'pelanggan' record
  await sql`DELETE FROM pelanggan WHERE id_pelanggan = ${id}`;
  revalidatePath('/dashboard/pelanggan');
}

export async function tampilPelanggan(id: string) {
  await sql`SELECT * FROM pelanggan WHERE id_pelanggan = ${id}`;
  revalidatePath('/dashboard/pelanggan');
}
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
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