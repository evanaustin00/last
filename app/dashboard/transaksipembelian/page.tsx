import Pagination from '../../ui/transaksipembelian/pagination';
import Search from '../../ui/search';
import Table from '../../ui/transaksipembelian/table';
import { CreateTransaksiPembelian } from '../../ui/transaksipembelian/buttons';
import { inter } from '../../ui/fonts';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchTransaksipembelianPages } from '../../lib/data';
import React from 'react';
import { InvoicesTableSkeleton } from '../../ui/skeletons';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchTransaksipembelianPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Transaksi Pembelian</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Transaksi Pembelian..." />
        <CreateTransaksiPembelian />
      </div>
      {/* Uncomment and implement this as needed */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
