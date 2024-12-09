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

  // Function to determine text color based on 'tingkat'
  const getTingkatColor = (tingkat: string): string => {
    switch (tingkat) {
      case 'Gold':
        return 'text-yellow-500';
      case 'Silver':
        return 'text-slate-300';
      case 'Bronze':
        return 'text-orange-600';
      default:
        return 'text-gray-700';
    }
  };

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      alert("Pilih tanggal awal dan akhir sebelum mencari!");
      return;
    }

    // Format the dates to YYYY-MM-DD (no time portion)
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    try {
      const data = await fetchtanggaltransaksi({ startDate: startDateString, endDate: endDateString });

      if (data.length === 0) {
        alert("Tidak ada data ditemukan untuk rentang tanggal ini.");
      }

      // Filter data berdasarkan tingkat
      const filtered = filterDataByTingkat(data);
      setFilteredData(filtered);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data:", error);
      alert("Terjadi kesalahan saat mengambil data.");
    }
  };

  const filterDataByTingkat = (data: transaksipenjualanForm[]) => {
    if (!selectedTingkat) return data; // Tidak ada filter tingkat jika kosong
    return data.filter(item => item.tingkat === selectedTingkat);
  };

  const handleTingkatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTingkat(event.target.value);
  };

  const handlePrintPDF = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada data untuk dicetak!");
      return;
    }
  
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const lineHeight = 10;
    const columnWidths = [35, 35, 35, 35, 25, 35, 30]; // Lebar setiap kolom
  
    const startX = margin;
    const tableStartY = 50; // Ubah posisi tabel header lebih jelas
    const headerHeight = 8; // Tinggi untuk header tabel
  
    // Judul Laporan
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Laporan Transaksi Penjualan", pageWidth / 2, 20, { align: "center" });
  
    // Periode Laporan
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Periode: ${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`,
      startX,
      30
    );
  
    // Header tabel
    const headers = [
      "ID Transaksi",
      "Tanggal Transaksi",
      "Nama Pegawai",
      "Nama Pelanggan",
      "Tingkat",
      "No HP",
      "Total Transaksi",
    ];
  
    // Cetak Header
    let currentY = tableStartY;
  
    doc.setFontSize(10);
    headers.forEach((header, index) => {
      const columnX = startX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
      doc.text(header, columnX, currentY);
    });
  
    // Garis horizontal bawah header tabel
    doc.setLineWidth(0.5);
    doc.line(startX, currentY + headerHeight, pageWidth - margin, currentY + headerHeight);
  
    currentY += headerHeight + 5 ; // Geser Y agar data mulai dari bawah tabel header
  
    // Cetak data dari filteredData
    filteredData.forEach((item, index) => {
      if (currentY > doc.internal.pageSize.getHeight() - margin) {
        // Jika halaman penuh, buat halaman baru
        doc.addPage();
        currentY = tableStartY; // Reset ke awal tabel pada halaman baru
      }
  
      const columnValues = [
        item.id_transaksi_penjualan.substring(0, 20),
        new Date(item.tanggal_transaksi).toLocaleDateString(),
        item.nama_pegawai,
        item.nama_pelanggan,
        item.tingkat,
        item.no_hp,
        `Rp ${item.total_transaksi.toLocaleString()}`,
      ];
  
      columnValues.forEach((value, colIndex) => {
        const columnX = startX + columnWidths.slice(0, colIndex).reduce((a, b) => a + b, 0);
        doc.text(value, columnX, currentY);
      });
  
      currentY += lineHeight;
    });
  
    // Total Transaksi
    const totalTransaksi = filteredData.reduce((sum, item) => sum + item.total_transaksi, 0);
  
    currentY += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Transaksi: Rp ${totalTransaksi.toLocaleString()}`, startX, currentY);
  
    // Simpan PDF
    doc.save("laporan_transaksi.pdf");
  };
    

  // Calculate the total transaksi from the filtered data
  const totalTransaksi = filteredData.reduce((sum, item) => sum + item.total_transaksi, 0);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex space-x-4">
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          placeholderText="Start Date"
          className="px-4 py-2 rounded-md border"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          placeholderText="End Date"
          className="px-4 py-2 rounded-md border"
        />
        <select
          onChange={handleTingkatChange}
          className="px-4 py-2 rounded-md border"
          value={selectedTingkat}
        >
          <option value="">Pilih Tingkat</option>
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>
        <button
          onClick={handleSearch}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <span>Cari</span>
        </button>
        <button
          onClick={handlePrintPDF}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <span>Cetak PDF</span>
        </button>
      </div>

      <div className="w-full rounded-md border p-4 mt-4">
        {filteredData.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-6 py-3 text-left">ID Transaksi</th>
                <th className="px-6 py-3 text-left">Tanggal Transaksi</th>
                <th className="px-6 py-3 text-left">Nama Pegawai</th>
                <th className="px-6 py-3 text-left">Nama Pelanggan</th>
                <th className="px-6 py-3 text-left">Tingkat</th>
                <th className="px-6 py-3 text-left">No HP</th>
                <th className="px-6 py-3 text-left">Total Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id_transaksi_penjualan}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition-all duration-300`}
                >
                  <td className="px-6 py-4 text-sm font-medium">{item.id_transaksi_penjualan}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {new Date(item.tanggal_transaksi).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{item.nama_pegawai}</td>
                  <td className="px-6 py-4 text-sm font-medium">{item.nama_pelanggan}</td>
                  <td className={`px-6 py-4 text-sm font-medium ${getTingkatColor(item.tingkat)}`}>
                    {item.tingkat}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{item.no_hp}</td>
                  <td className="px-6 py-4 text-sm font-medium">Rp {item.total_transaksi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">
            Data akan ditampilkan di sini setelah pencarian.
          </p>
        )}
      </div>

      {/* Display Total Transaksi below the table */}
      {filteredData.length > 0 && (
        <div className="mt-4 text-lg font-semibold">
          <p>Total Transaksi: Rp {totalTransaksi.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

