// Page.tsx
import React from 'react';
import Breadcrumbs from '../../../../ui/stok/breadcrumbs';
import { fetchPegawaiById } from '../../../../lib/data';

export default async function Page(props: { params: { id: string } }) {
  const { id } = await props.params;

  try {
    // Fetch pegawai by ID
    const pegawai = await fetchPegawaiById(id);

    if (!pegawai) {
      return <p className="text-red-500 text-center mt-4">Pegawai tidak ditemukan</p>;
    }

    return (
      <main className="min-h-screen bg-green-50 p-6">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Pegawai', href: '/dashboard/pegawai' },
            {
              label: 'Tampil Pegawai',
              href: `/dashboard/pegawai/${id}/tampil`,
              active: true,
            },
          ]}
        />
        <div className="rounded-lg bg-white p-8 shadow-xl max-w-xl mx-auto border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Detail Pegawai
          </h2>
          <table className="w-full border-collapse border border-green-300 rounded-md">
            <tbody>
              <tr className="border-b border-green-300">
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    ID Pegawai
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {pegawai.id_pegawai}
                </td>
              </tr>
              <tr className="border-b border-green-300">
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    Nama Pegawai
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {pegawai.nama_pegawai}
                </td>
              </tr>
              <tr className="border-b border-green-300">
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    No. HP
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {pegawai.no_hp}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    Jumlah Penjualan
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {pegawai.jumlah_penjualan}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center mt-8">
          <a
            href="/dashboard/pegawai"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-green-700"
          >
            Kembali ke Daftar Pegawai
          </a>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching pegawai data:', error);
    return (
      <p className="text-red-500 text-center mt-4">
        Gagal memuat data pegawai. Silakan coba lagi nanti.
      </p>
    );
  }
}
