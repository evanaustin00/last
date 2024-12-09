// Page.tsx
import Form from '../../../../ui/pegawai/edit-form';
import Breadcrumbs from '../../../../ui/pegawai/breadcrumbs';
import { fetchPegawaiById } from '../../../../lib/data';
import React from 'react';
import type { PegawaiField } from '../../../../lib/definitions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  try {
    // Fetch stok by ID
    const pegawai = await fetchPegawaiById(id);

    // Type check for stok
    if (!pegawai || !('id_pegawai' in pegawai && 'nama_pegawai' in pegawai &&  'no_hp' in pegawai && 'jumlah_penjualan' in pegawai)) {
      return <p>pelanggan not found</p>;
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Pegawai', href: '/dashboard/pegawai' },
            {
              label: 'Edit Pegawai',
              href: `/dashboard/pegawai/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form pegawai={pegawai as PegawaiField} /> {/* Only pass stok */}
      </main>
    );  
  } catch (error) {
    console.error('Error fetching stok data:', error);
    return <p>Failed to load stok data. Please try again later.</p>;
  }
}
