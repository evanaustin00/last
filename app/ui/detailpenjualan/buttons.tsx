'use client';

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import { fetchtanggaltransaksi } from '../../lib/actionpenjualan';
import { transaksipenjualanForm } from "../../lib/definitions";

interface transaksipenjualan {
  id_transaksi_penjualan: string;
  tanggal_transaksi: string;
  total_transaksi: number;
}

export function ReportFilter() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState<transaksipenjualanForm[]>([]);
  const [selectedTingkat, setSelectedTingkat] = useState<string>("");

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      alert("Pilih tanggal awal dan akhir sebelum mencari!");
      return;
    }
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    try {
      const data = await fetchtanggaltransaksi({ startDate: startDateString, endDate: endDateString });
      const filtered = data.filter(item => !selectedTingkat || item.tingkat === selectedTingkat);
      setFilteredData(filtered);
    } catch (error) {
      alert("Terjadi kesalahan saat mengambil data.");
    }
  };

  const handleTingkatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTingkat(event.target.value);
  };

  const totalTransaksi = filteredData.reduce((sum, item) => sum + item.total_transaksi, 0);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-50">
      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 md:flex-row w-full">
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          placeholderText="Start Date"
          className="px-4 py-2 rounded-md border w-40"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          placeholderText="End Date"
          className="px-4 py-2 rounded-md border w-40"
        />
        <select
          onChange={handleTingkatChange}
          className="px-4 py-2 rounded-md border w-40"
          value={selectedTingkat}
        >
          <option value="">Pilih Tingkat</option>
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-32"
        >
          Cari
        </button>
        <button
          onClick={() => console.log("Print PDF action")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-32"
        >
          Cetak PDF
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-auto rounded-md border p-4 mt-2 max-h-96">
        {filteredData.length > 0 ? (
          <table className="w-full border-collapse table-auto md:text-sm text-xs">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-4 py-2 text-left">ID Transaksi</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Nama Pegawai</th>
                <th className="px-4 py-2 text-left">Nama Pelanggan</th>
                <th className="px-4 py-2 text-left">Tingkat</th>
                <th className="px-4 py-2 text-left">No HP</th>
                <th className="px-4 py-2 text-left">Total Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr className="hover:bg-gray-200 transition-all duration-300 odd:bg-gray-100 even:bg-white">
                  <td className="px-4 py-2 text-sm">{item.id_transaksi_penjualan}</td>
                  <td className="px-4 py-2 text-sm">
                    {new Date(item.tanggal_transaksi).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm">{item.nama_pegawai}</td>
                  <td className="px-4 py-2 text-sm">{item.nama_pelanggan}</td>
                  <td className="px-4 py-2 text-sm">{item.tingkat}</td>
                  <td className="px-4 py-2 text-sm">{item.no_hp}</td>
                  <td className="px-4 py-2 text-sm">Rp {item.total_transaksi.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">Data akan ditampilkan di sini setelah pencarian.</p>
        )}
      </div>

      {/* Total Transaksi Section */}
      {filteredData.length > 0 && (
        <div className="text-lg font-semibold w-full text-center mt-2 md:mt-4">
          <p>Total Transaksi: Rp {totalTransaksi.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
