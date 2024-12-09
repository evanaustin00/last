'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserCircleIcon, PlusIcon, TrashIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Button } from "../../ui/button";
import { transaksipembelianField, StokField } from "../../lib/definitions";
// import { State } from '../../lib/actionstransaksipenjualan';
import { Createtransaksipembelian } from "../../lib/actionstransaksipembelian";

export default function Form({
  transaksipembelian=[],
  stok = []
}: {
  transaksipembelian: transaksipembelianField[],
  stok: StokField[];
}) {
  const router = useRouter();

  const [stokList, setStokList] = useState<{
    id_stok: string;
    nama_barang: string;
    harga_barang: number;
    jumlah_barang: number;
  }[]>([]);


  const [namaSupplier, setNamaSupplier] = useState<string>('');

  const total_harga = stokList.reduce(
    (total, stokItem) => total + stokItem.harga_barang * stokItem.jumlah_barang,
    0
  );

  const handleDeleteStok = (id_stok: string) => {
    setStokList((prev) => prev.filter((stokItem) => stokItem.id_stok !== id_stok));
  };

  const handleAddStok = (id_stok: string) => {
    const selectedStok = stok.find((s) => s.id_stok === id_stok);
    if (!selectedStok) return;

    setStokList((prev) => {
      const existingStok = prev.find((s) => s.id_stok === id_stok);
      if (existingStok) {
        return prev.map((s) =>
          s.id_stok === id_stok ? { ...s, jumlah_barang: s.jumlah_barang + 1 } : s
        );
      } else {
        return [
          ...prev,
          {
            id_stok,
            nama_barang: selectedStok.nama_barang,
            harga_barang: selectedStok.harga_barang,
            jumlah_barang: 1,
          },
        ];
      }
    });
  };

  const handleDecreaseStok = (id_stok: string) => {
    setStokList((prev) => {
      const updatedList = prev.map((stokItem) => {
        if (stokItem.id_stok === id_stok && stokItem.jumlah_barang > 1) {
          return { ...stokItem, jumlah_barang: stokItem.jumlah_barang - 1 };
        }
        return stokItem;
      });
      return updatedList;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    

    const formData = new FormData();
    formData.append('nama_supplier', namaSupplier); 
    formData.append('total_harga', total_harga.toString());
    formData.append('tanggal_pembelian', new Date().toISOString());
    formData.append('stokList', JSON.stringify(stokList));

    try {
      await Createtransaksipembelian(formData);
      console.log('Transaksi berhasil disimpan.');
      router.push('/dashboard/transaksipembelian');
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-green-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-6">Tambah Transaksi</h2>

        {/* Input Nama Supplier */}
        <div className="mb-4">
  <label htmlFor="nama_supplier" className="block text-sm font-medium mb-2">
    Nama Supplier
  </label>
  <input
    id="nama_supplier"
    type="text"
    value={namaSupplier}
    onChange={(e) => setNamaSupplier(e.target.value)} // Update state
    className="w-full rounded-md border px-4 py-2 text-sm"
    placeholder="Masukkan nama supplier"
    required
  />
</div>





        <div className="mb-4">
      <label htmlFor="nama_barang" className="mb-2 block text-sm font-medium">
        Pilih barang
      </label>
      <div className="relative">
        <select
          id="nama_barang"
          name="nama_barang"
          className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 bg-blue-100"
          defaultValue=""
          onChange={(e) => handleAddStok(e.target.value)}
        >
          <option value="" disabled>
            Pilih Stok
          </option>
          {stok.map((stok) => (
            <option key={stok.id_stok} value={stok.id_stok}>
              {stok.nama_barang} - Rp{stok.harga_barang.toLocaleString('id-ID')}
            </option>
          ))}
        </select>
      </div>
    </div>


        {/* Pilih Barang */}
        {stokList.map((stokItem, index) => (
  <div key={stokItem.id_stok} className="mb-4 flex items-center justify-between">
    <div className="flex-grow">
      <label className="mb-2 block text-sm font-medium">{stokItem.nama_barang}</label>
      <input
        type="text"
        value={`Rp${stokItem.harga_barang.toLocaleString('id-ID')}`}
        readOnly
        className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-[#D4B499]"
      />
    </div>
    <div className="flex items-center space-x-2 ml-4">
      {/* Tombol Kurangi (-) */}
      <button
        type="button"
        className="text-white bg-blue-500 p-1 rounded"
        onClick={() => handleDecreaseStok(stokItem.id_stok)}
      >
        <MinusIcon className="h-4 w-4" />
      </button>

      {/* Jumlah Barang */}
      <span className="text-center text-sm font-semibold">{stokItem.jumlah_barang}</span>

      {/* Tombol Tambah (+) */}
      <button
        type="button"
        className="text-white bg-green-500 p-1 rounded"
        onClick={() => handleAddStok(stokItem.id_stok)}
      >
        <PlusIcon className="h-4 w-4" />
      </button>

      {/* Tombol Hapus */}
      <button
        type="button"
        className="text-white bg-red-500 p-1 rounded"
        onClick={() => handleDeleteStok(stokItem.id_stok)}
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  </div>
))}



        {/* Daftar Produk */}
        

        {/* Tanggal Transaksi */}
        <div className="mb-4">
          <label htmlFor="tanggal_pembelian" className="mb-2 block text-sm font-medium">
            Tanggal Pembelian
          </label>
          <input
            id="tanggal_pembelian"
            type="text"
            value={new Date().toLocaleDateString('id-ID')}
            readOnly
            className="w-full rounded-md border px-4 py-2 text-sm"
          />
        </div>

        {/* Total Transaksi */}
        <div className="mb-4 text-right font-semibold">
          <span>Total: </span>
          <span className="text-lg text-green-600">
            Rp{total_harga.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}