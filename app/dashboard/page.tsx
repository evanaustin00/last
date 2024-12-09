import LatestTransaksiPenjualan from '../ui/dashboard/latest-transaksipenjualan';
import { inter } from '../ui/fonts';
import { fetchLatestTransaksiPenjualan } from '../lib/data';
import React from 'react';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton } from '../ui/skeletons';

export default async function Page() {
  const latest_Transaksi_penjualan = await fetchLatestTransaksiPenjualan();

  return (
    <main className="p-6 bg-green-50 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1
          className={`${inter.className} text-2xl md:text-4xl font-bold text-green-800 text-center`}
        >
          Welcome to the Coffee Shop Dashboard
        </h1>
        <p className="text-center text-green-600 mt-2">
          Stay updated with the latest transactions and menu highlights.
        </p>
      </header>

      {/* Highlighted Menu Items */}
      <section className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {[{ name: 'Americano', image: '/americano.png' },
          { name: 'Mie Ayam', image: '/mieayam.png' },
          { name: 'Nasi Goreng', image: '/nasigoreng.png' },
          { name: 'Savana', image: '/kopi1.png' }].map((item) => (
          <div
            key={item.name}
            className="border border-green-300 rounded-lg overflow-hidden shadow-md bg-white text-center transition-transform transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-contain bg-green-100"
            />
            <p className="mt-2 text-lg font-semibold text-green-700">{item.name}</p>
          </div>
        ))}
      </section>

      {/* Latest Transactions */}
      <section className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold text-green-800 mb-4">
          Latest Transactionss
        </h2>
        <div className="bg-white rounded-lg shadow p-4">
          <Suspense fallback={<LatestInvoicesSkeleton />}>
            <LatestTransaksiPenjualan />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
