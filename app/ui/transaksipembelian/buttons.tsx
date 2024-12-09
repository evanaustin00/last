import  PencilIcon from '@heroicons/react/24/outline/PencilIcon.js';
 import PlusIcon from '@heroicons/react/24/outline/PlusIcon.js';
 import {TrashIcon, EyeIcon} from '@heroicons/react/24/outline';
 import Link from 'next/link';
 import { deleteTransaksipembelian } from '../../lib/actionstransaksipembelian';

import React from 'react';
import { deleteTransaksipenjualan } from '../../lib/actionstransaksipenjualan';

export function CreateTransaksiPembelian() {
  return (
    <Link
      href="/dashboard/transaksipembelian/create"
      className="flex h-10 items-center rounded-lg bg-slate-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Transaksi Pembelian</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTransaksiPembelian({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/transaksipembelian/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}


export function TampilTransaksiPembelian({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/transaksipembelian/${id}/tampil`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}


export function DeleteTransaksipembelian({ id }: { id: string }) {
  const deleteTransaksipembelianWithId = deleteTransaksipenjualan.bind(null, id);
 
  return (
    <form action={deleteTransaksipembelianWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
