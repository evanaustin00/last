'use client';

import { transaksipenjualanForm } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React, { useState } from 'react';
import { createtransaksipenjualan } from '../../lib/actionstransaksipenjualan';

export default function EdittransaksipenjualanForm({ transaksi_penjualan }: { transaksi_penjualan: transaksipenjualanForm }) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Periksa apakah semua field yang diperlukan ada
      if (!formData.get('id_transaksi_penjualan')) {
        setError('Semua kolom harus diisi.');
        return;
      }

      // Mengirim id_stok dan formData untuk memperbarui stok
      await createtransaksipenjualan(formData);
    } catch (error) {
      setError('Terjadi kesalahan saat memperbarui stok.');
      console.error('Error updating stock:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id_transaksi_penjualan" value={transaksi_penjualan.id_transaksi_penjualan || ''} />
      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nama Barang */}
        <div className="mb-4">
          <label htmlFor="harga" className="mb-2 block text-sm font-medium">
            no hp
          </label>
          <input
            id="no_hp"
            name="no_hp"
            type="text"
            placeholder="Masukkan harga"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={transaksi_penjualan.no_hp}
            required
          />
        </div>

        {/* Harga Barang */}
        {/* <div className="mb-4">
          <label htmlFor="tanggal_transaksi" className="mb-2 block text-sm font-medium">
            tanggal transaksi
          </label>
          <input
            id="tanggal_transaksi"
            name="tanggal_transaksi"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Masukkan tanggal transaksi"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={transaksi_penjualan.tanggal_transaksi}
            required
          />
        </div> */}

        {/* Jumlah Barang */}
        <div className="mb-4">
          <label htmlFor="nama_pelanggan" className="mb-2 block text-sm font-medium">
            nama pelanggan
          </label>
          <input
            id="nama_pelanggan"
            name="nama_pelanggan"
            type="text"
            placeholder="Masukkan nama pelanggan"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={transaksi_penjualan.nama_pelanggan}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nama_pegawai" className="mb-2 block text-sm font-medium">
            total   transaksi  
          </label>
          <input
            id="total_transaksi"
            name="total_transaksi"
            type="number"
            placeholder="Masukkan nama pegawai"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={transaksi_penjualan.total_transaksi}
            required
          />
        </div>
      </div>

      {/* Menampilkan pesan error jika ada */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Tombol Aksi */}
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/transaksipenjualan" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
