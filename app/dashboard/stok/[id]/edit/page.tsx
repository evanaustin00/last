// Page.tsx
import Form from '../../../../ui/stok/edit-form';
import Breadcrumbs from '../../../../ui/stok/breadcrumbs';
import { fetchStokById } from '../../../../lib/data';
import React from 'react';
import type { StokField } from '../../../../lib/definitions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  try {
    // Fetch stok by ID
    const stok = await fetchStokById(id);

    // Type check for stok
    if (!stok || !('id_stok' in stok && 'nama_barang' in stok && 'harga_barang' in stok && 'jumlah_barang' in stok)) {
      return <p>Stok not found</p>;
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Stok', href: '/dashboard/stok' },
            {
              label: 'Edit Stok',
              href: `/dashboard/stok/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form stok={stok as StokField} /> {/* Only pass stok */}
      </main>
    );
  } catch (error) {
    console.error('Error fetching stok data:', error);
    return <p>Failed to load stok data. Please try again later.</p>;
  }
}
