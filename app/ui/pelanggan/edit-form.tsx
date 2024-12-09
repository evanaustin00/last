'use client';

import { PelangganForm } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React from 'react';
import { updatePelanggan } from '../../lib/actionspelanggan';

export default function EditPelangganForm({ pelanggan }: { pelanggan: PelangganForm }) {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      await updatePelanggan(pelanggan.id_pelanggan, formData); 
    } catch (error) {
      console.error('Error updating pelanggan:', error);
    }
  };

  const updatePelangganWithId = updatePelanggan.bind(null, pelanggan.id_pelanggan);

  return (
    <form action={updatePelangganWithId}>
      <input type="hidden" name="id_pelanggan" value={pelanggan.id_pelanggan || ''} />

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Nama Pelanggan */}
        <div className="mb-4">
          <label htmlFor="nama_pelanggan" className="mb-2 block text-sm font-medium">
            Nama Pelanggan
          </label>
          <input
            id="nama_pelanggan"
            name="nama_pelanggan"
            type="text"
            placeholder="Masukkan Nama Pelanggan"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={pelanggan.nama_pelanggan}
            required
          />
        </div>

        {/* Alamat */}
        <div className="mb-4">
          <label htmlFor="alamat" className="mb-2 block text-sm font-medium">
            Alamat
          </label>
          <input
            id="alamat"
            name="alamat"
            type="text"
            placeholder="Masukkan Alamat"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={pelanggan.alamat}
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
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Masukkan No HP"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={pelanggan.no_hp}
            required
          />
        </div>

        {/* Jumlah XP */}
        <div className="mb-4">
          <label htmlFor="jumlah_xp" className="mb-2 block text-sm font-medium">
            Jumlah XP
          </label>
          <input
            id="jumlah_xp"
            name="jumlah_xp"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Masukkan Jumlah XP"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={pelanggan.jumlah_xp}
            required
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pegawai"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
