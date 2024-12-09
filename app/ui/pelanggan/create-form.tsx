'use client';
import { PelangganField } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React, { useState } from 'react';
import { createPelanggan } from '../../lib/actionspelanggan';

export default function Form({ pelanggan }: { pelanggan: PelangganField[] }) {
  const [selectedPelanggan, setSelectedPelanggan] = useState<PelangganField>({
    id_pelanggan: '', 
    nama_pelanggan: '', 
    alamat: '',
    no_hp: '',
    jumlah_xp: 0,
    id_loyalitas: '',
    tingkat: 'bronze',
    diskon: 0
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setSelectedPelanggan((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cek apakah nomor HP sudah ada dalam daftar pelanggan
    const isPhoneNumberExists = pelanggan.some(
      (item) => item.no_hp === selectedPelanggan.no_hp
    );

    if (isPhoneNumberExists) {
      setError('Nomor HP sudah terdaftar. Silakan masukkan nomor yang berbeda.');
      return; // Tidak melanjutkan submit jika ada duplikasi nomor
    }

    setError(null); // Reset error jika tidak ada duplikasi

    const formData = new FormData(e.target as HTMLFormElement);

    // Kirim data form menggunakan createPelanggan
    await createPelanggan(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-white p-6 shadow-lg max-w-lg mx-auto">
        
        {/* Pelanggan ID */}
        <input
          id="id_pelanggan"
          name="id_pelanggan"
          type="text"
          className="hidden"
          value={selectedPelanggan.id_pelanggan}  
          onChange={(e) => handleInputChange(e, 'id_pelanggan')}
        />

        {/* Nama Pelanggan */}
        <div className="mb-6">
          <label htmlFor="nama_pelanggan" className="mb-2 block text-sm font-medium text-gray-700">
            Nama Pelanggan
          </label>
          <input
            id="nama_pelanggan"
            name="nama_pelanggan"
            type="text"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedPelanggan.nama_pelanggan}  
            onChange={(e) => handleInputChange(e, 'nama_pelanggan')}
            required
          />
        </div>

        {/* Alamat */}
        <div className="mb-6">
          <label htmlFor="alamat" className="mb-2 block text-sm font-medium text-gray-700">
            Alamat
          </label>
          <input
            id="alamat"
            name="alamat"
            type="text"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedPelanggan.alamat}  
            onChange={(e) => handleInputChange(e, 'alamat')}
            required
          />
        </div>

        {/* No HP */}
        <div className="mb-6">
          <label htmlFor="no_hp" className="mb-2 block text-sm font-medium text-gray-700">
            No HP
          </label>
          <input
            id="no_hp"
            name="no_hp"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedPelanggan.no_hp}  
            onChange={(e) => handleInputChange(e, 'no_hp')}
            required
          />
        </div>

        {/* Jumlah XP */}
        <div className="mb-6">
          <label htmlFor="jumlah_xp" className="mb-2 block text-sm font-medium text-gray-700">
            Jumlah XP
          </label>
          <input
            id="jumlah_xp"
            name="jumlah_xp"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedPelanggan.jumlah_xp}  
            onChange={(e) => handleInputChange(e, 'jumlah_xp')}
            required
          />
        </div>

        {/* Menampilkan pesan error jika ada duplikasi */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-between gap-4">
        <Link
          href="/dashboard/pelanggan"
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
