import  PencilIcon from '@heroicons/react/24/outline/PencilIcon.js';
 import PlusIcon from '@heroicons/react/24/outline/PlusIcon.js';
  import {TrashIcon, EyeIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import { deleteStok, tampilStok } from '../../lib/actionsstok';

export function CreateStok() {
  return (
    <Link
      href="/dashboard/stok/create"
      className="flex h-10 items-center rounded-lg bg-slate-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Stok</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateStok({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/stok/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}


 
// ...
 
export function DeleteStok({ id }: { id: string }) {
  const deleteStokWithId = deleteStok.bind(null, id);
 
  return (
    <form action={deleteStokWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}


export function TampilStok({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/stok/${id}/tampil`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}

  


