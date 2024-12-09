'use client';

import { PegawaiField } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React, { useState } from 'react';
import { createPegawai } from '../../lib/actionspegawai';

export default function Form({ pegawai }: { pegawai: PegawaiField[] }) {
  const [selectedPegawai, setSelectedPegawai] = useState<PegawaiField>({
    id_pegawai: '', 
    nama_pegawai: '', 
    no_hp: '',
    jumlah_penjualan: 0
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof PegawaiField) => {
    const value = e.target.value;
    setSelectedPegawai((prevState) => ({
      ...prevState,
      [field]: field === 'jumlah_penjualan' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cek apakah nomor HP sudah ada dalam daftar pegawai
    const isPhoneNumberExists = pegawai.some(
      (item) => item.no_hp === selectedPegawai.no_hp
    );

    if (isPhoneNumberExists) {
      setError('Nomor HP sudah terdaftar. Silakan masukkan nomor yang berbeda.');
      return; // Tidak melanjutkan submit jika ada duplikasi nomor
    }

    setError(null); // Reset error jika tidak ada duplikasi

    const formData = new FormData();

    // Mengisi FormData dengan data dari selectedPegawai
    formData.append('id_pegawai', selectedPegawai.id_pegawai);
    formData.append('nama_pegawai', selectedPegawai.nama_pegawai);
    formData.append('no_hp', selectedPegawai.no_hp);
    formData.append('jumlah_penjualan', String(selectedPegawai.jumlah_penjualan));

    try {
      await createPegawai(formData); // Mengirim FormData ke createPegawai
    } catch (error) {
      console.error('Error creating pegawai:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-white p-6 shadow-lg max-w-lg mx-auto">
        
        <div className="mb-6">
          <label htmlFor="id_pegawai" className="mb-2 block text-sm font-medium text-gray-700">
            Pegawai ID
          </label>
          <input
            id="id_pegawai"
            name="id_pegawai"
            type="text"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedPegawai.id_pegawai}  
            onChange={(e) => handleInputChange(e, 'id_pegawai')}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="nama_pegawai" className="mb-2 block text-sm font-medium text-gray-700">
            Nama Pegawai
          </label>
          <input
            id="nama_pegawai"
            name="nama_pegawai"
            type="text"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedPegawai.nama_pegawai}  
            onChange={(e) => handleInputChange(e, 'nama_pegawai')}
            required
          />
        </div>

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
            value={selectedPegawai.no_hp}  
            onChange={(e) => handleInputChange(e, 'no_hp')}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="jumlah_penjualan" className="mb-2 block text-sm font-medium text-gray-700">
            Jumlah Penjualan
          </label>
          <input
            id="jumlah_penjualan"
            name="jumlah_penjualan"
            type="number"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedPegawai.jumlah_penjualan}  
            onChange={(e) => handleInputChange(e, 'jumlah_penjualan')}
            required
          />
        </div>

        {/* Menampilkan pesan error jika ada duplikasi */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="mt-6 flex justify-between gap-4">
        <Link
          href="/dashboard/pegawai"
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
