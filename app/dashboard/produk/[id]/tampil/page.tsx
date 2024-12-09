// Page.tsx
import React from 'react';
import Breadcrumbs from '../../../../ui/stok/breadcrumbs';
import { fetchProdukById} from '../../../../lib/data';
import type { ProdukForm } from '../../../../lib/definitions';

export default async function Page(props: { params: { id: string } }) {
  const { id } = await props.params;

  try {
    // Fetch produk by ID
    const produk = await fetchProdukById(id);

    if (!produk) {
      return <p>Produk not found</p>;
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'produk', href: '/dashboard/produk' },
            {
              label: 'Tampil produk',
              href: `/dashboard/produk/${id}/tampil`,
              active: true,
            },
          ]}
        />
        <div className="rounded-md bg-white p-6 shadow-lg max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Detail Stok</h2>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Id Stok: </span>
            <span>{produk.id_produk}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Nama Barang: </span>
            <span>{produk.nama_produk}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Harga Barang: </span>
            <span>{produk.harga_produk}</span>
          </div>
          {/* <div className="mb-2">
            <span className="font-medium text-gray-700">Jumlah Barang: </span>
            <span>{stok.jumlah_barang}</span>
          </div> */}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching produk data:', error);
    return <p>Failed to load produk data. Please try again later.</p>;
  }
}
