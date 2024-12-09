import  PencilIcon from '@heroicons/react/24/outline/PencilIcon.js';
 import PlusIcon from '@heroicons/react/24/outline/PlusIcon.js';
 import {TrashIcon, EyeIcon} from '@heroicons/react/24/outline';
 import Link from 'next/link';
import React from 'react';
import { deleteProduk } from '../../lib/actionsproduk';


export function CreateProduk() {
  return (
    <Link
      href="/dashboard/produk/create"
      className="flex h-10 items-center rounded-lg bg-slate-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Produk</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProduk({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/produk/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProduk({ id }: { id: string }) {
  const deleteProdukWithId = deleteProduk.bind(null, id);
 
  return (
    <form action={deleteProdukWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}

export function TampilProduk({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/produk/${id}/tampil`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}


