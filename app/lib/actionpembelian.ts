'use server';

import { sql } from '@vercel/postgres';
import { transaksiPembelianForm } from './definitions';

export async function fetchtanggaltransaksi({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): Promise<transaksiPembelianForm[]> {
  try {
    // Mengambil data pembelian dari database dengan rentang tanggal
    const result = await sql<transaksiPembelianForm>`
      SELECT
        transaksi_pembelian.id_transaksi_pembelian,
        transaksi_pembelian.total_harga,
        transaksi_pembelian.tanggal_pembelian,
        transaksi_pembelian.nama_supplier,
        stok.nama_barang,
        stok.jumlah_barang
      FROM transaksi_pembelian
      JOIN detail_pembelian ON transaksi_pembelian.id_transaksi_pembelian = detail_pembelian.id_transaksi_pembelian
      JOIN stok ON stok.id_stok = detail_pembelian.id_stok
      WHERE transaksi_pembelian.tanggal_pembelian BETWEEN ${startDate} AND ${endDate};
    `;

    return result.rows;
  } catch (error) {
    console.error("Error fetching pembelian:", error);
    throw new Error("Failed to fetch pembelian data.");
  }
}
