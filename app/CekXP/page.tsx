'use client';

import React, { useState } from 'react';
import { fetchPelangganByNoHp } from '../lib/actionloyalitas';

interface Pelanggan {
  id_pelanggan: string;
  nama_pelanggan: string;
  alamat: string;
  no_hp: string;
  jumlah_xp: number;
}

export default function CekPelangganPage() {
  const [no_hp, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [pelanggan, setPelanggan] = useState<Pelanggan | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPelanggan(null);

    if (!no_hp.trim()) {
      setError('Nomor telepon tidak boleh kosong');
      return;
    }

    try {
      setLoading(true);
      const response = await fetchPelangganByNoHp(no_hp.trim());
      // const test = response?.rows[0];
      // const test = response?.alamat;
      console.log(response);
      
      if (response) {
        setPelanggan(response);
      // if (test) {
      //   setPelanggan(test);
      } else {
        setError('Pelanggan tidak ditemukan');
      }
    } catch (err) {
      console.error("Error fetching pelanggan data:", err);
      setError('Terjadi kesalahan saat mencari pelanggan');
    } finally {
      setLoading(false);
    }
  };

  const getTingkat = (jumlah_xp: number): string => {
    if (jumlah_xp >= 100000) return 'Gold';
    if (jumlah_xp >= 50000) return 'Silver';
    if (jumlah_xp >= 10000) return 'Bronze';
    return 'Bronze';
  };

  const getTingkatColor = (tingkat: string): string => {
    switch (tingkat) {
      case 'Gold':
        return 'text-yellow-500';
      case 'Silver':
        return 'text-slate-500';
      case 'Bronze':
        return 'text-orange-400';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <main className="p-6 bg-gradient-to-r from-green-400 to-green-600 min-h-screen">
      <h2 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
        Cek Data Pelanggan
      </h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-lg space-y-6">
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium text-lg mb-2">
            Nomor Telepon
          </label>
          <input
            id="no_hp"
            type="text"
            value={no_hp}
            onChange={handlePhoneNumberChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 shadow-md"
            placeholder="Masukkan nomor telepon"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          {loading ? 'Memuat...' : 'Cek Pelanggan'}
        </button>
      </form>

      {pelanggan && (
        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-6 drop-shadow-lg">Detail Pelanggan</h3>
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-4">
            <table className="min-w-full table-auto border-collapse overflow-hidden rounded-xl">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Nomor Handphone</th>
                  <th className="px-6 py-4 text-left font-semibold">Nama</th>
                  <th className="px-6 py-4 text-left font-semibold">Jumlah XP</th>
                  <th className="px-6 py-4 text-left font-semibold">Tingkat</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-green-100 transition duration-200 transform hover:scale-105">
                  <td className="px-6 py-4 text-gray-700">{pelanggan.no_hp}</td>
                  <td className="px-6 py-4 text-gray-700">{pelanggan.nama_pelanggan}</td>
                  <td className="px-6 py-4 text-gray-700">{pelanggan.jumlah_xp}</td>
                  <td className={`px-6 py-4 text-gray-700 font-semibold ${getTingkatColor(getTingkat(pelanggan.jumlah_xp))}`}>
                    {getTingkat(pelanggan.jumlah_xp)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
