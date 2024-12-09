'use client';

import { transaksiPembelianForm } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React, { useState } from 'react';
import { Createtransaksipembelian } from '../../lib/actionstransaksipembelian';
import { useRouter } from 'next/router';

export default function EdittransaksipembelianForm({ transaksi_pembelian }: { transaksi_pembelian: transaksiPembelianForm }) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();  // Gunakan useRouter untuk navigasi

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Periksa apakah semua field yang diperlukan ada
      if (!formData.get('id_transaksi_pembelian')) {
        setError('Semua kolom harus diisi.');
        return;
      }

      // Mengirim id_transaksi_pembelian dan formData untuk memperbarui transaksi pembelian
      await Createtransaksipembelian(formData);
      
      // Redirect ke halaman lain setelah berhasil
      router.push('/dashboard/transaksipembelian');  // Ganti dengan URL yang sesuai
    } catch (error) {
      setError('Terjadi kesalahan saat memperbarui transaksi pembelian.');
      console.error('Error updating purchase transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id_transaksi_pembelian" value={transaksi_pembelian.id_transaksi_pembelian || ''} />
      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nama Barang */}
        <div className="mb-4">
          <label htmlFor="nama_barang" className="mb-2 block text-sm font-medium">
            Nama Barang
          </label>
          <input
            id="nama_barang"
            name="nama_barang"
            type="text"
            placeholder="Masukkan nama barang"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={transaksi_pembelian.nama_barang}
            required
          />
        </div>

        {/* Jumlah Barang */}
        <div className="mb-4">
          <label htmlFor="jumlah_barang" className="mb-2 block text-sm font-medium">
            Jumlah Barang
          </label>
          <input
            id="jumlah_barang"
            name="jumlah_barang"
            type="number"
            placeholder="Masukkan jumlah barang"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={transaksi_pembelian.jumlah_barang}
            required
          />
        </div>

        {/* Harga */}
        <div className="mb-4">
          <label htmlFor="harga" className="mb-2 block text-sm font-medium">
            Harga
          </label>
          <input
            id="harga"
            name="harga"
            type="number"
            step="0.01"
            placeholder="Masukkan harga"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={transaksi_pembelian.harga_barang}
            required
          />
        </div>

        {/* Total Harga */}
        <div className="mb-4">
          <label htmlFor="total_harga" className="mb-2 block text-sm font-medium">
            Total Harga
          </label>
          <input
            id="total_harga"
            name="total_harga"
            type="number"
            step="0.01"
            placeholder="Masukkan total harga"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={transaksi_pembelian.total_harga}
            required
          />
        </div>

        {/* Tanggal Pembelian */}
        <div className="mb-4">
          <label htmlFor="tanggal_pembelian" className="mb-2 block text-sm font-medium">
            Tanggal Pembelian
          </label>
          <input
            id="tanggal_pembelian"
            name="tanggal_pembelian"
            type="date"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={transaksi_pembelian.tanggal_pembelian}
            required
          />
        </div>

        {/* Supplier */}
        <div className="mb-4">
          <label htmlFor="nama_supplier" className="mb-2 block text-sm font-medium">
            Nama Supplier
          </label>
          <input
            id="nama_supplier"
            name="nama_supplier"
            type="text"
            placeholder="Masukkan nama supplier"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={transaksi_pembelian.nama_supplier}
            required
          />
        </div>

      </div>

      {/* Menampilkan pesan error jika ada */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Tombol Aksi */}
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/transaksipembelian" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
