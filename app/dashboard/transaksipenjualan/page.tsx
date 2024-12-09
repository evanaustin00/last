import Pagination from '../../ui/transaksipenjualan/pagination';
import Search from '../../ui/search';
import Table from '../../ui/transaksipenjualan/table';
import { CreateTransaksiPenjualan } from '../../ui/transaksipenjualan/buttons';
import { inter } from '../../ui/fonts';
import { Suspense } from 'react';
import React from 'react';
import { InvoicesTableSkeleton } from '../../ui/skeletons';
import { fetchTransaksipenjualanPages } from '../../lib/data';


export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTransaksipenjualanPages(query);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Transaksi Penjualan</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Transaksi Penjualan..." />
        <CreateTransaksiPenjualan />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
