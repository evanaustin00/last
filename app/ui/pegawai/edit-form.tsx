'use client';

import { PegawaiForm } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React from 'react';
import { updatePegawai } from '../../lib/actionspegawai';

export default function EditPegawaiForm({ pegawai }: { pegawai: PegawaiForm }) {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Mengirim `id_pegawai` dan data form ke `updatePegawai`
      await updatePegawai(pegawai.id_pegawai, formData); 
    } catch (error) {
      console.error('Error updating pegawai:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Menyertakan hidden input untuk `id_pegawai` */}
      <input type="hidden" name="id_pegawai" value={pegawai.id_pegawai || ''} /> 
      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nama Pegawai */}
        <div className="mb-4">
          <label htmlFor="nama_pegawai" className="mb-2 block text-sm font-medium">
            Nama Pegawai
          </label>
          <input
            id="nama_pegawai"
            name="nama_pegawai"
            type="text"
            placeholder="Masukkan Nama Pegawai"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={pegawai.nama_pegawai}
            required
          />
        </div>

        {/* No HP */}
        <div className="mb-4">
          <label htmlFor="no_hp" className="mb-2 block text-sm font-medium">
            No HP
          </label>
          <input
            id="no_hp"
            name="no_hp"
            type="text"
            placeholder="Masukkan No HP"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={pegawai.no_hp}
            required
          />
        </div>

        {/* Jumlah Penjualan */}
        <div className="mb-4">
          <label htmlFor="jumlah_penjualan" className="mb-2 block text-sm font-medium">
            Jumlah Penjualan
          </label>
          <input
            id="jumlah_penjualan"
            name="jumlah_penjualan"
            type="number"
            placeholder="Masukkan Jumlah Penjualan"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={pegawai.jumlah_penjualan}
            required
          />
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/pegawai" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit" className="h-10 px-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
