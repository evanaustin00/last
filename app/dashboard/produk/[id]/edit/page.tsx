// Page.tsx
import Form from '../../../../ui/produk/edit-form';
import Breadcrumbs from '../../../../ui/produk/breadcrumbs';
import { fetchProdukById } from '../../../../lib/data';
import React from 'react';
import type { ProdukField } from '../../../../lib/definitions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  try {
    // Fetch stok by ID
    const produk = await fetchProdukById(id);

    // Type check for stok
    if (!produk || !('id_produk' in produk && 'nama_produk' in produk && 'harga_produk' in produk)) {
      return <p>produk not found</p>;
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Produk', href: '/dashboard/produk' },
            {
              label: 'Edit Produk',
              href: `/dashboard/produk/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form produk={produk as ProdukField} /> {/* Only pass stok */}
      </main>
    );
  } catch (error) {
    console.error('Error fetching stok data:', error);
    return <p>Failed to load stok data. Please try again later.</p>;
  }
}
