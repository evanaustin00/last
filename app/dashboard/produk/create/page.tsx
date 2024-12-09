import Form from '../../../ui/produk/create-form';
import Breadcrumbs from '../../../ui/produk/breadcrumbs';
import { fetchProduk } from '../../../lib/data';
import React from 'react';
export default async function Page() {
  const produk = await fetchProduk();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Produk', href: '/dashboard/produk' },
          {
            label: 'Create Produk',
            href: '/dashboard/produk/create',
            active: true,
          },
        ]}
      />
      {/* Update to stokList prop */}
      <Form produk={produk} />
    </main>
  );
}
