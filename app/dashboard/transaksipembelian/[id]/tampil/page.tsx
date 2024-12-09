// Page.tsx
import Form from '../../../../ui/transaksipembelian/tampil-form';
import React from 'react';
import Breadcrumbs from '../../../../ui/transaksipenjualan/breadcrumbs';
import { fetchtransaksipembelianById } from '../../../../lib/data';
import type { transaksiPembelianForm } from '../../../../lib/definitions';

export default async function Page(props: { params: { id: string } }) {
  // Await the params to make sure you can safely access its properties
  const params = await props.params;
  const id = params.id; // Await this to avoid the error

  try {
    // Fetch transaksi penjualan by ID
    const transaksipembelian = await fetchtransaksipembelianById(id);

    if (!transaksipembelian || !('id_transaksi_pembelian' in transaksipembelian && 'nama_supplier' in transaksipembelian && 'total_harga' in transaksipembelian && 'tanggal_pembelian' in transaksipembelian)) {
      return <p>Produk not found</p>;
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'transaksipembelian', href: '/dashboard/transaksipembelian' },
            {
              label: 'Tampil transaksi pembelian',
              href: `/dashboard/transaksipembelian/${id}/tampil`,
              active: true,
            },
          ]}
        />
       <Form transaksipembelian={transaksipembelian as transaksiPembelianForm} />
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
