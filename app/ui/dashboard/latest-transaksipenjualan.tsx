import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon.js';
import clsx from 'clsx';
import { inter } from '../../ui/fonts';
import { fetchLatestTransaksiPenjualan } from '../../lib/data';
import React from 'react';

export default async function LatestTransaksiPenjualan() {
  const latestTransaksi = await fetchLatestTransaksiPenjualan();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Latest Transaksi Penjualan
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-green-200 p-4">
        <div className="bg-white px-6">
          {latestTransaksi.map((transaksi, i) => {
            return (
              <div
                key={transaksi.id_transaksi_penjualan}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {transaksi.nama_pelanggan}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {transaksi.tanggal_transaksi}
                    </p>
                  </div>
                </div>
                <p className={`${inter.className} truncate text-sm font-medium md:text-base`}>
                  Rp {transaksi.total_transaksi.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-yellow-800" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
