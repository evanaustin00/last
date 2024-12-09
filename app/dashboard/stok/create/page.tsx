import Form from '../../../ui/stok/create-form';
import Breadcrumbs from '../../../ui/stok/breadcrumbs';
import { fetchStok} from '../../../lib/data';
import React from 'react';

export default async function Page() {
  const stok = await fetchStok();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Stok', href: '/dashboard/stok' },
          {
            label: 'Create Stok',
            href: '/dashboard/stok/create',
            active: true,
          },
        ]}
      />
      {/* Update to stokList prop */}
      <Form stok={stok} />
    </main>
  );
}
