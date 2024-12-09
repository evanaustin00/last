'use server';
 
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    id_stok?: string[];
    nama_barang?: string[];
    harga_barang?: number[];
    jumlah_barang?: number[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  id_stok: z.string(),
  nama_barang: z.coerce.string({
    invalid_type_error: 'Nama Barang Belum dimasukan.',
  }),
  harga_barang: z.coerce.string({
    invalid_type_error: 'Harga Barang Belum dimasukan.',
  }),
  jumlah_barang: z.coerce.number({
    invalid_type_error: 'Harga Barang Belum dimasukan.',
  }),
});

const CreateStok = FormSchema.omit({ id: true});

export async function createStok(prevState: State, formData: FormData) {
  const validatedFields = CreateStok.safeParse({
  
    id_stok: formData.get('id_stok'),
    nama_barang: formData.get('nama_barang'),
    harga_barang: formData.get('harga_barang'),
    jumlah_barang: formData.get('jumlah_barang')  
    
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { nama_barang, harga_barang, jumlah_barang } = validatedFields.data;
//   const amountInCents = harga_barang * 100;
  const date = new Date().toISOString().split('T')[0];
  await sql`
  INSERT INTO stok (nama_barang, harga_barang, jumlah_barang)
  VALUES (${nama_barang}, ${harga_barang}, ${jumlah_barang})
`;
;
  // Test it out:
  revalidatePath('/dashboard/stok');
  redirect('/dashboard/stok');

  
}


 
export async function updateStok(id: string, formData: FormData) {
  const { nama_barang, harga_barang, jumlah_barang } = CreateStok.parse({
    id_stok: formData.get('id_stok'),
    nama_barang: formData.get('nama_barang'),
    harga_barang: formData.get('harga_barang'),
    jumlah_barang: formData.get('jumlah_barang'),
  });

  const date = new Date().toISOString().split('T')[0];
  await sql`
    UPDATE stok 
    SET nama_barang = ${nama_barang}, harga_barang = ${harga_barang}, jumlah_barang = ${jumlah_barang}
    WHERE id_stok = ${id}  -- Use id_stok here instead of id
  `;

  revalidatePath('/dashboard/stok');
  redirect('/dashboard/stok');
}




export async function deleteStok(id: string) {
  await sql`DELETE FROM stok WHERE id_stok = ${id}`;
  revalidatePath('/dashboard/stok');
}

export async function tampilStok(id: string) {
  await sql`SELECT * FROM stok WHERE id_stok = ${id}`;
  revalidatePath('/dashboard/stok');
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