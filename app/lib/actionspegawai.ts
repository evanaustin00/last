'use server';
 
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  id_pegawai: z.string(),
  nama_pegawai: z.coerce.string(),
  no_hp: z.coerce.string(),
  jumlah_penjualan: z.coerce.string(),
});

const CreatePegawai = FormSchema.omit({ id: true});

export async function createPegawai(formData: FormData) {
  const { id_pegawai, nama_pegawai, no_hp, jumlah_penjualan } = CreatePegawai.parse({
  
    id_pegawai: formData.get('id_pegawai'),
    nama_pegawai: formData.get('nama_pegawai'),
    // alamat: formData.get('alamat'),
    no_hp: formData.get('no_hp'),
    jumlah_penjualan: formData.get('jumlah_penjualan')

    
  });
//   const amountInCents = harga_produk * 100;
  const date = new Date().toISOString().split('T')[0];
  await sql`
  INSERT INTO pegawai (nama_pegawai, no_hp, jumlah_penjualan)
  VALUES (${nama_pegawai}, ${no_hp}, ${jumlah_penjualan})
`;
;
  // Test it out:
  revalidatePath('/dashboard/pegawai');
  redirect('/dashboard/pegawai');
}

export async function updatePegawai(id: string, formData: FormData) {
  const { nama_pegawai, no_hp, jumlah_penjualan } = CreatePegawai.parse({
    id_pegawai: formData.get('id_pegawai'),
    nama_pegawai: formData.get('nama_pegawai'),
    no_hp: formData.get('no_hp'),
    jumlah_penjualan: formData.get('jumlah_penjualan'),
  });

  const date = new Date().toISOString().split('T')[0];
  await sql`
    UPDATE pegawai 
    SET nama_pegawai = ${nama_pegawai}, no_hp = ${no_hp}, jumlah_penjualan = ${jumlah_penjualan}
    WHERE id_pegawai = ${id}
  `;

  revalidatePath('/dashboard/pegawai');
  redirect('/dashboard/pegawai');
}

export async function deletePegawai(id: string) {
  await sql`DELETE FROM detail_penjualan WHERE id_transaksi_penjualan IN (SELECT id_transaksi_penjualan FROM transaksi_penjualan WHERE id_pegawai = ${id})`;

  // Now, delete related entries from 'transaksi_penjualan'
  await sql`DELETE FROM transaksi_penjualan WHERE id_pegawai = ${id}`;

  // Then, delete the 'pegawai' record
  await sql`DELETE FROM pegawai WHERE id_pegawai = ${id}`;
  revalidatePath('/dashboard/pegawai');
}

export async function tampilPegawaiid(id: string) {
  await sql`SELECT * FROM pegawai WHERE id_pegawai = ${id}`;
  revalidatePath('/dashboard/pegawai');
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