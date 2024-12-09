'use server';

import { sql } from '@vercel/postgres';
import { PelangganField } from './definitions';
// Definisikan tipe data pelanggan


// Fungsi untuk mencari pelanggan berdasarkan nomor HP
export async function fetchPelangganByNoHp(no_hp: string): Promise<PelangganField | null> {
    try {
      console.log("Fetching pelanggan with no_hp:", no_hp); // Debug nomor HP
  
      const result = await sql<PelangganField>`
        SELECT id_pelanggan, nama_pelanggan, alamat, no_hp, jumlah_xp
        FROM pelanggan
        WHERE no_hp = ${no_hp}
        LIMIT 1;
      `;
  
      // console.log("Database result:", result); // Debug hasil query

      // return result.rows.length > 0 ? result.rows[0] : null; // Return the first row or null
      // return result;
      // return result.rows; 
      // return pelanggan ? 0 : null; // Kembalikan pelanggan atau null jika tidak ditemukan
      // return result.rows && result.rows.length > 0 ? result.rows[0] : null;
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error("Error fetching pelanggan:", error);
      throw new Error("Failed to fetch pelanggan data.");
    }
  }
    