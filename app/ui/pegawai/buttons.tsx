import  PencilIcon from '@heroicons/react/24/outline/PencilIcon.js';
 import PlusIcon from '@heroicons/react/24/outline/PlusIcon.js';
 import {TrashIcon, EyeIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import { deletePegawai } from '../../lib/actionspegawai';


export function CreatePegawai() {
  return (
    <Link
      href="/dashboard/pegawai/create"
      className="flex h-10 items-center rounded-lg bg-slate-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Pegawai</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePegawai({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/pegawai/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePegawai({ id }: { id: string }) {
  const deletePegawaiWithId = deletePegawai.bind(null, id);
 
  return (
    <form action={deletePegawaiWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}

export function TampilPegawai({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/pegawai/${id}/tampil`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}

