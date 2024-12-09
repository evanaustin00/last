// Page.tsx
import React from 'react';
import Breadcrumbs from '../../../../ui/stok/breadcrumbs';
import { fetchPegawaiById } from '../../../../lib/data';
import type { PegawaiForm } from '../../../../lib/definitions';

export default async function Page(props: { params: { id: string } }) {
  const { id } = await props.params;

  try {
    // Fetch produk by ID
    const pegawai = await fetchPegawaiById(id);

    if (!pegawai) {
      return <p>Produk not found</p>;
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'pegawai', href: '/dashboard/pegawai' },
            {
              label: 'Tampil pegawai',
              href: `/dashboard/pegawai/${id}/tampil`,
              active: true,
            },
          ]}
        />
        <div className="rounded-md bg-white p-6 shadow-lg max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Detail Stok</h2>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Id Stok: </span>
            <span>{pegawai.id_pegawai}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Nama Barang: </span>
            <span>{pegawai.nama_pegawai}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Harga Barang: </span>
            <span>{pegawai.no_hp}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Jumlah Barang: </span>
            <span>{pegawai.jumlah_penjualan}</span>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching produk data:', error);
    return <p>Failed to load produk data. Please try again later.</p>;
  }
}
