import { ReportFilter } from '../../ui/detailpenjualan/buttons';
import { inter } from '../../ui/fonts';
import { InvoicesTableSkeleton } from '../../ui/skeletons';
import { Suspense } from 'react';
import React from 'react';
// import { fetchDetailpenjualanPages, fetchFiltereddetailpenjualan } from '../../lib/data';
import { redirect } from 'next/navigation'; // Import redirect from next/navigation

export default async function Page() {

  // Mendapatkan total halaman untuk pagination
//   const totalPages = await fetchDetailpenjualanPages(query);
// const total_transaksi = await fetchFiltereddetailpenjualan(query, currentPage);

//   // Mendapatkan data transaksi penjualan untuk halaman saat ini
//   const detailpenjualan = await fetchFiltereddetailpenjualan(query, currentPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Laporan Penjualan</h1>
      </div>
      
      {/* Search and Filter Row */}
      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 md:mt-8">
        <ReportFilter />
      </div>

      {/* Pagination */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}