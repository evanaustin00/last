'use client';
import React, { useState } from "react";
import Link from "next/link";
import { UserCircleIcon, PlusIcon, TrashIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Button } from "../../ui/button";
import { transaksipenjualanField, ProdukField, PegawaiField, PelangganField, LoyalitasField } from "../../lib/definitions";
import { createtransaksipenjualan } from "../../lib/actionstransaksipenjualan";

export default function Form({
  transaksipenjualan = [],
  produk = [],
  pegawai = [],
  pelanggan = [],
  loyalitas = []
}: {
  transaksipenjualan: transaksipenjualanField[];
  produk: ProdukField[];
  pegawai: PegawaiField[];
  pelanggan: PelangganField[];
  loyalitas: LoyalitasField[];
}) {
  const router = useRouter();

  const [produkList, setProdukList] = useState<{
    id_produk: string;
    nama_produk: string;
    harga_produk: number;
    quantity: number;
  }[]>([]);

  const [selectedPegawai, setSelectedPegawai] = useState<string>('');
  const [selectedPelanggan, setSelectedPelanggan] = useState<string>('');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [changeAmount, setChangeAmount] = useState<number>(0);


  const total_transaksi = produkList.reduce(
    (total, produkItem) => total + produkItem.harga_produk * produkItem.quantity,
    0
  );

  const selectedPelangganData = pelanggan.find((p) => p.id_pelanggan === selectedPelanggan);
  const additionalDiscount = selectedPelangganData
    ? selectedPelangganData.jumlah_xp > 100000
      ? 15
      : selectedPelangganData.jumlah_xp > 50000
      ? 10
      : selectedPelangganData.jumlah_xp > 10000
      ? 5
      : 0
    : 0;


  const handleDeleteProduct = (id_produk: string) => {
    setProdukList((prev) => prev.filter((produkItem) => produkItem.id_produk !== id_produk));
  };

  

  const [warning, setWarning] = useState<string | null>(null);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
  
    // Cek apakah jumlah pembayaran kurang dari total transaksi
    if (amount < totalTransaksiFinal) {
      setWarning('Jumlah pembayaran kurang dari total transaksi.');
    } else {
      setWarning(null); // Hilangkan peringatan jika jumlah bayar sudah cukup
    }
  
    // Set jumlah pembayaran yang dimasukkan
    setPaymentAmount(amount);
  
    // Hitung kembalian, jangan sampai kurang dari 0
    setChangeAmount(Math.max(amount - totalTransaksiFinal, 0));
  }
  

  const totalTransaksiFinal = total_transaksi * (1 - additionalDiscount / 100);

  const handleAddProduct = (id_produk: string) => {
    const selectedProduct = produk.find((p) => p.id_produk === id_produk);
    if (!selectedProduct) return;

    setProdukList((prev) => {
      const existingProduct = prev.find((p) => p.id_produk === id_produk);
      if (existingProduct) {
        return prev.map((p) =>
          p.id_produk === id_produk ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [
          ...prev,
          {
            id_produk,
            nama_produk: selectedProduct.nama_produk,
            harga_produk: selectedProduct.harga_produk,
            quantity: 1,
          },
        ];
      }
    });
  };

  const handleDecreaseProduct = (id_produk: string) => {
    setProdukList((prev) => {
      const updatedList = prev.map((produkItem) => {
        if (produkItem.id_produk === id_produk && produkItem.quantity > 1) {
          return { ...produkItem, quantity: produkItem.quantity - 1 };
        }
        return produkItem;
      });
      return updatedList;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedPelangganData = pelanggan.find((p) => p.id_pelanggan === selectedPelanggan);
    if (!selectedPelangganData) {
      console.error("Pelanggan tidak ditemukan.");
      return;
    }

    const selectedPegawaiData = pegawai.find((pe) => pe.id_pegawai === selectedPegawai);
    if (!selectedPegawaiData) {
      console.error("Pegawai tidak ditemukan.");
      return;
    }

    // Hitung diskon otomatis berdasarkan XP pelanggan
    let additionalDiscount = 0;
    if (selectedPelangganData.jumlah_xp > 100000) {
      additionalDiscount = 15; // 15% diskon
    } else if (selectedPelangganData.jumlah_xp > 50000) {
      additionalDiscount = 10; // 10% diskon
    } else if (selectedPelangganData.jumlah_xp > 10000) {
      additionalDiscount = 5; // 5% diskon
    }

    // Hitung total transaksi setelah diskon
    const totalTransaksiFinal = total_transaksi * (1 - additionalDiscount / 100);

    const formData = new FormData();
    formData.append('id_pelanggan', selectedPelangganData.id_pelanggan);
    formData.append('nama_pelanggan', selectedPelangganData.nama_pelanggan);
    formData.append('no_hp', selectedPelangganData.no_hp);
    formData.append('id_pegawai', selectedPegawaiData.id_pegawai);
    formData.append('total_transaksi', totalTransaksiFinal.toString());
    formData.append('diskon', additionalDiscount.toString());
    formData.append('tanggal_transaksi', new Date().toISOString());
    formData.append('produkList', JSON.stringify(produkList));

    try {
      await createtransaksipenjualan(formData);
      console.log('Transaksi berhasil disimpan.');
      router.push('/dashboard/transaksipenjualan');
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
     <div className="rounded-md bg-green-100 p-6 shadow-lg">
     <h2 className="text-xl font-bold text-green-800 mb-4">Tambah Transaksi</h2>

        {/* Pilih Pelanggan */}
        <div className="mb-4">
          <label htmlFor="id_pelanggan" className="block text-sm font-medium text-green-700">
            Pilih Pelanggan
          </label>
          <select
            id="id_pelanggan"
            name="id_pelanggan"
            className="mt-2 w-full rounded-md border border-green-300 py-2 px-3 text-sm focus:ring-2 focus:ring-green-500"
            value={selectedPelanggan}
            onChange={(e) => setSelectedPelanggan(e.target.value)}
            required
          >
            <option value="" disabled>
              Pilih Pelanggan
            </option>
            {pelanggan.map((pe) => (
              <option key={pe.id_pelanggan} value={pe.id_pelanggan}>
                {pe.nama_pelanggan} - {pe.no_hp}
              </option>
            ))}
          </select>
        </div>

        {/* Pilih Pegawai */}
        <div className="mb-4">
        <label htmlFor="id_pegawai" className="block text-sm font-medium text-green-700">
            Pilih Pegawai
          </label>
          <select
            id="id_pegawai"
            name="id_pegawai"
            className="mt-2 w-full rounded-md border border-green-300 py-2 px-3 text-sm focus:ring-2 focus:ring-green-500"
            value={selectedPegawai}
            onChange={(e) => setSelectedPegawai(e.target.value)}
            required
          >
            <option value="" disabled>
              Pilih Pegawai
            </option>
            {pegawai.map((employee) => (
              <option key={employee.id_pegawai} value={employee.id_pegawai}>
                {employee.nama_pegawai}
              </option>
            ))}
          </select>
        </div>

        {/* Pilih Produk */}
        <div className="mb-4">
        <label htmlFor="nama_produk" className="block text-sm font-medium text-green-700">
            Pilih Produk
          </label>
          <div className="relative">
            <select
              id="nama_produk"
              name="nama_produk"
               className="mt-2 w-full rounded-md border border-green-300 py-2 px-3 text-sm focus:ring-2 focus:ring-green-500"
              defaultValue=""
              onChange={(e) => handleAddProduct(e.target.value)}
              required
            >
              <option value="" disabled>
                Pilih Produk
              </option>
              {produk.map((product) => (
                <option key={product.id_produk} value={product.id_produk}>
                  {product.nama_produk} - Rp{product.harga_produk.toLocaleString('id-ID')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Daftar Produk */}
        {produkList.map((produkItem) => (
          <div key={produkItem.id_produk} className="mb-4 flex items-center justify-between">
            <div className="flex-grow">
              <label className="text-sm font-medium text-green-800">{produkItem.nama_produk}</label>
              <input
                type="text"
                value={`Rp${produkItem.harga_produk.toLocaleString('id-ID')}`}
                readOnly
                className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm text-gray-900 bg-[#D4B499]"
              />
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {/* Quantity Controls */}
              <button
                type="button"
                className="text-white bg-blue-500 p-1 rounded"
                onClick={() => handleDecreaseProduct(produkItem.id_produk)}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span>{produkItem.quantity}</span>
              <button
                type="button"
                className="text-white bg-blue-500 p-1 rounded"
                onClick={() => handleAddProduct(produkItem.id_produk)}
              >
                <PlusIcon className="h-4 w-4" />
              </button>

              {/* Delete */}
              <button
                type="button"
                className="text-white bg-red-500 p-1 rounded"
                onClick={() => handleDeleteProduct(produkItem.id_produk)}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Informasi Diskon Otomatis */}
        {selectedPelanggan && (
          <div className="mb-4 text-right">
            <span>Diskon Otomatis: </span>
            <span className="text-lg text-blue-600">{additionalDiscount}%</span>
          </div>
        )}

        {/* Total Transaksi */}
        <div className="mb-4 text-right font-semibold">
          <span>Total Setelah Diskon: </span>
          <span className="text-lg text-green-600">
          Rp{(totalTransaksiFinal).toLocaleString('id-ID')}
          </span>
        </div>

        {/* Pembayaran */}
<div className="mt-4 mb-6">
  <label className="block text-sm font-medium text-green-700">Jumlah Pembayaran</label>
  <input
    type="number"
    className="mt-2 w-full rounded-md border border-green-300 py-2 px-3 text-sm"
    placeholder="Masukkan jumlah pembayaran"
    value={paymentAmount}
    onChange={handlePaymentChange}
    required
  />
  {/* Tampilkan peringatan jika jumlah pembayaran kurang */}
  {warning && (
    <div className="text-sm text-red-500 mt-2">
      <span>{warning}</span>
    </div>
  )}
</div>


        {/* Kembalian */}
        <div className="flex justify-between mb-4">
  <span className="font-bold text-green-800">Kembalian</span>
  <span className="text-green-800">Rp{changeAmount.toLocaleString('id-ID')}</span>
</div>


        

        <div className="mt-6 flex items-center">
  {/* Tombol Kembali di sebelah kiri */}
  <Link href="/dashboard/transaksipenjualan">
    <Button
     className="bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded-md text-sm font-medium leading-none"
    >
      Kembali
    </Button>
  </Link>
  {/* Spacer untuk memisahkan tombol */}
  <div className="flex-grow"></div>
  {/* Tombol Simpan di sebelah kanan */}
  <Button
    className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
    type="submit"
  >
    Tambah Transaksi
  </Button>
</div>



      </div>
    </form>
  );
}
