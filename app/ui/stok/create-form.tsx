'use client';
import { StokField } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React, { useState } from 'react';
import { createStok } from '../../lib/actionsstok';
import { State } from '../../lib/actionsstok';

export default function Form({ stok }: { stok: StokField[] }) {
  const [selectedStok, setSelectedStok] = useState<StokField>({
    id_stok: '', 
    nama_barang: '', 
    harga_barang: 0,
    
    jumlah_barang: 0
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setSelectedStok((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  // Fungsi perantara untuk handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cek apakah nama barang sudah ada dalam daftar stok
    const isProductExists = stok.some(
      (item) => item.nama_barang.toLowerCase() === selectedStok.nama_barang.toLowerCase()
    );

    if (isProductExists) {
      setError('Nama barang sudah ada. Silakan pilih nama barang yang berbeda.');
      return; // Tidak melanjutkan submit jika ada duplikasi
    }

    setError(null); // Reset error jika tidak ada duplikasi

    const formData = new FormData(e.target as HTMLFormElement);

    // Kirim data form menggunakan createStok dengan status atau pesan sebagai objek
    const state: State = { message: "Product successfully created", errors: {} }; // Ganti dengan objek yang sesuai dengan tipe State
    await createStok(state, formData); // Mengirimkan objek state dan formData
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-white p-6 shadow-lg max-w-lg mx-auto">
        
        {/* Stok ID */}
        <div className="mb-6">
          <label htmlFor="id_stok" className="mb-2 block text-sm font-medium text-gray-700">
            Stok ID
          </label>
          <input
            id="id_stok"
            name="id_stok"
            type="text"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedStok.id_stok}  
            onChange={(e) => handleInputChange(e, 'id_stok')}
          />
        </div>

        {/* Nama Barang */}
        <div className="mb-6">
          <label htmlFor="nama_barang" className="mb-2 block text-sm font-medium text-gray-700">
            Stok Name
          </label>
          <input
            id="nama_barang"
            name="nama_barang"
            type="text"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            required
            value={selectedStok.nama_barang}  
            onChange={(e) => handleInputChange(e, 'nama_barang')}
          />
        </div>

        {/* Harga Barang */}
        <div className="mb-6">
          <label htmlFor="harga_barang" className="mb-2 block text-sm font-medium text-gray-700">
            Barang Price
          </label>
          <input
            id="harga_barang"
            name="harga_barang"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            required
            value={selectedStok.harga_barang}
            onChange={(e) => handleInputChange(e, 'harga_barang')}
          />
        </div>

        {/* Jumlah Barang */}
        <div className="mb-6 flex items-center">
          <label htmlFor="jumlah_barang" className="mb-2 block text-sm font-medium text-gray-700">
            Jumlah Barang
          </label>
          <input
            id="jumlah_barang"
            name="jumlah_barang"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            required
            value={selectedStok.jumlah_barang}
            onChange={(e) => handleInputChange(e, 'jumlah_barang')}
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-between gap-4">
        <Link
          href="/dashboard/stok"
          className="flex items-center justify-center h-10 px-6 bg-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
        >
          Cancel
        </Link>
        <Button type="submit" className="flex items-center justify-center h-10 px-6 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all">
          Simpan
        </Button>
      </div>
    </form>
  );
}
