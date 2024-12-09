// Page.tsx
import React from 'react';
import Breadcrumbs from '../../../../ui/stok/breadcrumbs';
import { fetchStokById } from '../../../../lib/data';

export default async function Page(props: { params: { id: string } }) {
  const { id } = await props.params;

  try {
    // Fetch stok by ID
    const stok = await fetchStokById(id);

    if (!stok) {
      return <p className="text-red-500 text-center mt-4">Stok tidak ditemukan</p>;
    }

    return (
      <main className="min-h-screen bg-green-50 p-6">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Stok', href: '/dashboard/stok' },
            {
              label: 'Tampil Stok',
              href: `/dashboard/stok/${id}/tampil`,
              active: true,
            },
          ]}
        />
        <div className="rounded-lg bg-white p-8 shadow-xl max-w-xl mx-auto border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Detail Stok
          </h2>
          <table className="w-full border-collapse border border-green-300 rounded-md">
            <tbody>
              <tr className="border-b border-green-300">
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    ID Stok
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {stok.id_stok}
                </td>
              </tr>
              <tr className="border-b border-green-300">
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    Nama Barang
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {stok.nama_barang}
                </td>
              </tr>
              <tr className="border-b border-green-300">
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    Harga Barang
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {stok.harga_barang}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    Jumlah Barang
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {stok.jumlah_barang}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center mt-8">
          <a
            href="/dashboard/stok"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-green-700"
          >
            Kembali ke Daftar Stok
          </a>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching stok data:', error);
    return (
      <p className="text-red-500 text-center mt-4">
        Gagal memuat data stok. Silakan coba lagi nanti.
      </p>
    );
  }
}