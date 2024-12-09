import Form from '../../../ui/transaksipembelian/create-form';
import Breadcrumbs from '../../../ui/transaksipembelian/breadcrumbs';
import { fetchtransaksipembelian, fetchStok } from '../../../lib/data';
import React from 'react';

export default async function Page() {
  const query = ''; // Provide default or dynamic query value
  const page = 1; // Default to the first page

  // Call the function with the required arguments
  const transaksipembelian = await fetchtransaksipembelian();
  const stok = await fetchStok();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transaksi Pembelian', href: '/dashboard/transaksipembelian' },
          {
            label: 'Create transaksi pembelian',
            href: '/dashboard/transaksipembelian/create',
            active: true,
          },
        ]}
      />
      <Form transaksipembelian={transaksipembelian} stok={stok} />
    </main>
  );
}
