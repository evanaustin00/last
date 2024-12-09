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
      setFilteredData(data);
    } catch (error) {
      alert("Terjadi kesalahan saat mengambil data.");
    }
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
  
    doc.setLineWidth(0.5);
    doc.line(startX, currentY + headerHeight, pageWidth - margin, currentY + headerHeight);
  
    currentY += headerHeight + 5; // Geser Y agar data mulai dari bawah tabel header
  
    // Cetak data dari filteredData
    filteredData.forEach((item, index) => {
      if (currentY > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        currentY = tableStartY;
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
  
    const totalTransaksi = filteredData.reduce((sum, item) => sum + item.total_transaksi, 0);
  
    currentY += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Transaksi: Rp ${totalTransaksi.toLocaleString()}`, startX, currentY);
  
    doc.save("laporan_transaksi.pdf");
  };

  const totalTransaksi = filteredData.reduce((sum, item) => sum + item.total_transaksi, 0);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-50">
      {/* Bagian Tombol */}
      <div className="w-full flex space-x-4 md:space-x-0 flex-wrap justify-center">
        <button
          onClick={handlePrintPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Cetak PDF
        </button>
      </div>

      <div className="mt-2 text-lg font-semibold text-center w-full">
        <p>Total Transaksi: Rp {totalTransaksi.toLocaleString()}</p>
      </div>
    </div>
  );
}
