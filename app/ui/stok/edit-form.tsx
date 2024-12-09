'use client';

import { StokForm } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React, { useState } from 'react';
import { updateStok } from '../../lib/actionsstok';

export default function EditStokForm({ stok }: { stok: StokForm }) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Periksa apakah semua field yang diperlukan ada
      if (!formData.get('nama_barang') || !formData.get('harga_barang') || !formData.get('jumlah_barang')) {
        setError('Semua kolom harus diisi.');
        return;
      }

      // Mengirim id_stok dan formData untuk memperbarui stok
      await updateStok(stok.id_stok, formData);
    } catch (error) {
      setError('Terjadi kesalahan saat memperbarui stok.');
      console.error('Error updating stock:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id_stok" value={stok.id_stok || ''} />
      
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
            placeholder="Masukkan Nama Barang"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={stok.nama_barang}
            required
          />
        </div>

        {/* Harga Barang */}
        <div className="mb-4">
          <label htmlFor="harga_barang" className="mb-2 block text-sm font-medium">
            Harga Barang
          </label>
          <input
            id="harga_barang"
            name="harga_barang"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Masukkan Harga Barang"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={stok.harga_barang}
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
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Masukkan Jumlah Barang"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={stok.jumlah_barang}
            required
          />
        </div>
      </div>

      {/* Menampilkan pesan error jika ada */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Tombol Aksi */}
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/stok" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
