
import Form from '../../../ui/transaksipenjualan/create-form';
import Breadcrumbs from '../../../ui/transaksipenjualan/breadcrumbs';
import { fetchtransaksipenjualan, fetchPegawai, fetchProduk, fetchPelanggan, fetchLoyalitas } from '../../../lib/data';
import React from 'react';

export default async function Page() {
  const query = ''; // Provide default or dynamic query value
  const page = 1; // Default to the first page

  // Call the function with the required arguments
  const transaksipenjualan = await fetchtransaksipenjualan();
  const pegawai = await fetchPegawai(); // Fetch karyawan data
  const produk = await fetchProduk();     // Fetch produk data
  const pelanggan = await fetchPelanggan(); 
  const loyalitas = await fetchLoyalitas(); // Fetch loyalitas data

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transaksi Penjualan', href: '/dashboard/transaksipenjualan' },
          {
            label: 'Create transaksi penjualan',
            href: '/dashboard/transaksipenjualan/create',
            active: true,
          },
        ]}
      />
      <Form transaksipenjualan={transaksipenjualan} pegawai={pegawai} produk={produk} pelanggan={pelanggan} loyalitas={loyalitas}/>

    </main>
  );
}
