'use client';

import { ProdukForm } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React from 'react';
import { updateProduk } from '../../lib/actionsproduk';
import { UpdateProduk } from './buttons';

export default function EditStokForm({ produk }: { produk: ProdukForm }) {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Pass both id_stok and formData
      await updateProduk(produk.id_produk, formData); 
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };
  const updateProdukWithId = updateProduk.bind(null, produk.id_produk);
  return (
    <form action={updateProdukWithId}>
      <input type="hidden" name="id_produk" value={produk.id_produk || ''} /> {/* Add this hidden input for id_stok */}
      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nama Barang */}
        <div className="mb-4">
          <label htmlFor="nama_produk" className="mb-2 block text-sm font-medium">
            Nama Barang
          </label>
          <input
            id="nama_produk"
            name="nama_produk"
            type="text"
            placeholder="Masukkan Nama Produk"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={produk.nama_produk}
            required
          />
        </div>

        {/* Harga Barang */}
        <div className="mb-4">
          <label htmlFor="harga_produk" className="mb-2 block text-sm font-medium">
            Harga Barang
          </label>
          <input
            id="harga_produk"
            name="harga_produk"
            type="number"
            placeholder="Masukkan Harga Produk"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={produk.harga_produk}
            required
          />
        </div>

        {/* Jumlah Barang */}
        {/* <div className="mb-4">
          <label htmlFor="jumlah_barang" className="mb-2 block text-sm font-medium">
            Jumlah Barang
          </label>
          <input
            id="jumlah_barang"
            name="jumlah_barang"
            type="number"
            placeholder="Masukkan Jumlah Barang"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={produk.jumlah_barang}
          />
        </div> */}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/produk" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
