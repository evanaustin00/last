'use client';
import { ProdukField } from '../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../ui/button';
import React, { useState } from 'react';
import { createProduk } from '../../lib/actionsproduk';

export default function Form({ produk }: { produk: ProdukField[] }) {
  const [selectedProduk, setSelectedProduk] = useState<ProdukField>({
    id_produk: '', 
    nama_produk: '', 
    harga_produk: 0,
    quantity:0
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setSelectedProduk((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if product name already exists in the list of products
    const isProductExists = produk.some((item) => item.nama_produk.toLowerCase() === selectedProduk.nama_produk.toLowerCase());

    if (isProductExists) {
      setError('Nama produk sudah ada. Silakan pilih nama produk yang berbeda.');
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('id_produk', selectedProduk.id_produk);
    formData.append('nama_produk', selectedProduk.nama_produk);
    formData.append('harga_produk', selectedProduk.harga_produk.toString());

    // Call createProduk with FormData
    createProduk(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-white p-6 shadow-lg max-w-lg mx-auto">
        <div className="mb-6">
          <label htmlFor="id_produk" className="mb-2 block text-sm font-medium text-gray-700">
            Product ID
          </label>
          <input
            id="id_produk"
            name="id_produk"
            type="text"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedProduk.id_produk}
            onChange={(e) => handleInputChange(e, 'id_produk')}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="nama_produk" className="mb-2 block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="nama_produk"
            name="nama_produk"
            type="text"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedProduk.nama_produk}
            onChange={(e) => handleInputChange(e, 'nama_produk')}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="harga_produk" className="mb-2 block text-sm font-medium text-gray-700">
            Product Price
          </label>
          <input
            id="harga_produk"
            name="harga_produk"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            value={selectedProduk.harga_produk}
            onChange={(e) => handleInputChange(e, 'harga_produk')}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="mt-6 flex justify-between gap-4">
        <Link
          href="/dashboard/produk"
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
