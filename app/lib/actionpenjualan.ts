'use server';

import { sql } from '@vercel/postgres';
import { transaksipenjualanField, transaksipenjualanForm } from './definitions';

export async function fetchtanggaltransaksi({
  startDate,
  endDate,
  tingkat,
}: {
  startDate: string;
  endDate: string;
  tingkat?: string;
}): Promise<transaksipenjualanForm[]> {
  try {
    const result = await sql<transaksipenjualanForm>`
      SELECT 
        transaksi_penjualan.id_transaksi_penjualan,
        transaksi_penjualan.tanggal_transaksi,
        transaksi_penjualan.total_transaksi,
        pelanggan.nama_pelanggan,
        pelanggan.no_hp,
        pelanggan.jumlah_xp,
        pegawai.nama_pegawai,
        CASE 
          WHEN pelanggan.jumlah_xp > 100000 THEN 'Gold'
          WHEN pelanggan.jumlah_xp > 50000 THEN 'Silver'
          WHEN pelanggan.jumlah_xp > 10000 THEN 'Bronze'
          ELSE 'None'
        END AS tingkat
      FROM transaksi_penjualan
      JOIN pelanggan 
        ON transaksi_penjualan.id_pelanggan = pelanggan.id_pelanggan::text
      JOIN pegawai
        ON transaksi_penjualan.id_pegawai = pegawai.id_pegawai::uuid
      WHERE transaksi_penjualan.tanggal_transaksi >= ${startDate} ::date + interval '1 day'
  AND transaksi_penjualan.tanggal_transaksi <= ${endDate}::date + interval '1 day';`;

    return result.rows;
  } catch (error) {
    console.error("Error fetching transaksi_penjualan:", error);
    throw new Error("Failed to fetch transaksi_penjualan data.");
  }
}
