// Page.tsx
import React from 'react';
import Breadcrumbs from '../../../../ui/stok/breadcrumbs';
import { fetchStokById } from '../../../../lib/data';
import type { StokForm } from '../../../../lib/definitions';

export default async function Page(props: { params: { id: string } }) {
  const { id } = await props.params;

  try {
    // Fetch produk by ID
    const stok = await fetchStokById(id);

    if (!stok) {
      return <p>Produk not found</p>;
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'stok', href: '/dashboard/stok' },
            {
              label: 'Tampil Stok',
              href: `/dashboard/stok/${id}/tampil`,
              active: true,
            },
          ]}
        />
        <div className="rounded-md bg-white p-6 shadow-lg max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Detail Stok</h2>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Id Stok: </span>
            <span>{stok.id_stok}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Nama Barang: </span>
            <span>{stok.nama_barang}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Harga Barang: </span>
            <span>{stok.harga_barang}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Jumlah Barang: </span>
            <span>{stok.jumlah_barang}</span>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching produk data:', error);
    return <p>Failed to load produk data. Please try again later.</p>;
  }
}
