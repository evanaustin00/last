// Page.tsx
import Form from '../../../../ui/pelanggan/edit-form';
import Breadcrumbs from '../../../../ui/pelanggan/breadcrumbs';
import { fetchPelangganById } from '../../../../lib/data';
import React from 'react';
import type { PelangganField } from '../../../../lib/definitions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  try {
    // Fetch stok by ID
    const pelanggan = await fetchPelangganById(id);

    // Type check for stok
    if (!pelanggan || !('id_pelanggan' in pelanggan && 'nama_pelanggan' in pelanggan && 'alamat' in pelanggan  && 'no_hp' in pelanggan && 'jumlah_xp' in pelanggan)) {
      return <p>pelanggan not found</p>;
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Pelanggan', href: '/dashboard/pelanggan' },
            {
              label: 'Edit Pelanggan',
              href: `/dashboard/pelanggan/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form pelanggan={pelanggan as PelangganField} /> {/* Only pass stok */}
      </main>
    );
  } catch (error) {
    console.error('Error fetching stok data:', error);
    return <p>Failed to load stok data. Please try again later.</p>;
  }
}
