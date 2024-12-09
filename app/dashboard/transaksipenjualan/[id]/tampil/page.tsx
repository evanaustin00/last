// Page.tsx
import Form from '../../../../ui/transaksipenjualan/tampil-form';
import React from 'react';
import Breadcrumbs from '../../../../ui/transaksipenjualan/breadcrumbs';
import { fetchtransaksipenjualanById } from '../../../../lib/data';
import type { transaksipenjualanForm } from '../../../../lib/definitions';

export default async function Page(props: { params: { id: string } }) {
  // Await the params to make sure you can safely access its properties
  const params = await props.params;
  const id = params.id; // Await this to avoid the error

  try {
    // Fetch transaksi penjualan by ID
    const transaksipenjualan = await fetchtransaksipenjualanById(id);

    if (!transaksipenjualan || !('id_transaksi_penjualan' in transaksipenjualan && 'nama_pelanggan' in transaksipenjualan && 'total_transaksi' in transaksipenjualan && 'tanggal_transaksi' in transaksipenjualan)) {
      return <p>Produk not found</p>;
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'transaksipenjualan', href: '/dashboard/transaksipenjualan' },
            {
              label: 'Tampil transaksi penjualan',
              href: `/dashboard/transaksipenjualan/${id}/tampil`,
              active: true,
            },
          ]}
        />
       <Form transaksipenjualan={transaksipenjualan as transaksipenjualanForm} />
      </main>
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching produk data:', error.message);
      return <p>Failed to load produk data. Please try again later. Error: {error.message}</p>;
    } else {
      console.error('Unknown error:', error);
      return <p>Failed to load produk data. Please try again later.</p>;
    }
  }
}
