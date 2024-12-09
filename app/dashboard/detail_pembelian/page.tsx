import { ReportFilter } from '../../ui/detailpembelian/buttons';
import { inter } from '../../ui/fonts';
import { InvoicesTableSkeleton } from '../../ui/skeletons';
import { Suspense } from 'react';
import React from 'react';
import { redirect } from 'next/navigation'; // Import redirect from next/navigation

export default async function Page() {

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Laporan Pembelian</h1>
      </div>

      {/* Search and Filter Row */}
      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 md:mt-8">
        <ReportFilter />
      </div>

      {/* Pagination */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination /> */}
      </div>
    </div>
  );
}
