'use client';
import Link from 'next/link';
import React from 'react';
import {transaksiPembelianForm } from '../../lib/definitions';
// type TransaksiField = {
//   nama_pelanggan: string;
//   nomor_hp_pelanggan: string;
//   nama_karyawan: string;
//   total_transaksi?: number; // Ubah ke optional
//   waktu_transaksi: string;
//   detail_pesanan?: { item: string; harga: number }[]; // Ubah ke optional
// };

export default function TampilTransaksiForm({
  transaksipembelian,
}: {
  transaksipembelian: transaksiPembelianForm;
}) {
  return (
    <div className="rounded-md bg-white p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-6">Detail Transaksi</h2>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Nama Supplier</label>
        <input
          value={transaksipembelian.nama_supplier || ''}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-white"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Nama barang</label>
        <input
          value={transaksipembelian.nama_barang || ''}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-white"
        />
      </div>

      {/* <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Nama Karyawan</label>
        <input
          value={transaksipembelian.nama_karyawan || ''}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-white"
        />
      </div> */}


      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Total transaksi pembelian</label>
        <input
          value={
            transaksipembelian.total_harga !== undefined
              ? `Rp. ${transaksipembelian.total_harga.toLocaleString('id-ID')}`
              : ''
          }
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-white"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Waktu Transaksi</label>
        <input
          value={transaksipembelian.tanggal_pembelian || ''}
          readOnly
          className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-white"
        />
      </div>

      {/* <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Detail Pesanan</label>
        <div className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-white">
          {transaksi.detail_pesanan && transaksi.detail_pesanan.length > 0 ? (
            transaksi.detail_pesanan.map((pesanan, index) => (
              <div key={index} className="flex justify-between">
                <span>{pesanan.item}</span>
                <span className="text-right">Rp. {pesanan.harga.toLocaleString('id-ID')}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Tidak ada detail pesanan.</p>
          )}
        </div>
      </div> */}

 {/* <div className="mb-4">
   <label className="mb-2 block text-sm font-medium">Detail Pesanan</label>
   <div className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-white"> */}
    {/* {transaksi.detail_pesanan && transaksi.detail_pesanan.length > 0 ? (
//       transaksi.detail_pesanan.map((item, index) => (
//         <div key={index} className="flex justify-between">
//           <span>{item.nama_produk || 'Nama Produk Tidak Tersedia'}</span>
//           <span className="text-right">
//             Rp. {item.harga_produk ? item.harga_produk.toLocaleString('id-ID') : 'Harga Tidak Tersedia'}
//           </span>
//         </div>
//       ))
//     ) : ( */}
      {/* <p className="text-gray-600">nasi orak arik special - Rp34355</p> */}
    {/* )} */}
   {/* </div>
 </div> */}



 <div className="mt-6 flex justify-end">
         <Link
          href="/dashboard/transaksipembelian"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

{/* <div className="rounded-md bg-white p-6 shadow-lg max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Detail Stok</h2>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Id transaksi penjualan: </span>
            <span>{transaksipembelian.id_transaksi_penjualan}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Nama pelanggan: </span>
            <span>{transaksipembelian.nama_pelanggan}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Total transaksi: </span>
            <span>{transaksipembelian.total_transaksi}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Tanggal transaksi: </span>
            <span>{transaksipembelian.tanggal_transaksi}</span>
          </div>
        </div> */}