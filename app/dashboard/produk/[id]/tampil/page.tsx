// Page.tsx
import React from 'react';
import Breadcrumbs from '../../../../ui/stok/breadcrumbs';
import { fetchProdukById } from '../../../../lib/data';

export default async function Page(props: { params: { id: string } }) {
  const { id } = await props.params;

  try {
    // Fetch produk by ID
    const produk = await fetchProdukById(id);

    if (!produk) {
      return <p className="text-red-500 text-center mt-4">Produk tidak ditemukan</p>;
    }

    return (
      <main className="min-h-screen bg-green-50 p-6">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Produk', href: '/dashboard/produk' },
            {
              label: 'Tampil Produk',
              href: `/dashboard/produk/${id}/tampil`,
              active: true,
            },
          ]}
        />
        <div className="rounded-lg bg-white p-8 shadow-xl max-w-xl mx-auto border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Detail Produk
          </h2>
          <table className="w-full border-collapse border border-green-300 rounded-md">
            <tbody>
              <tr className="border-b border-green-300">
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    ID Produk
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {produk.id_produk}
                </td>
              </tr>
              <tr className="border-b border-green-300">
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    Nama Produk
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {produk.nama_produk}
                </td>
              </tr>
              <tr className="border-b border-green-300">
                <td className="py-3 px-4 font-medium text-green-700">
                  <span className="inline-flex items-center">
                    <span className="material-icons text-green-600 mr-2"></span>
                    Harga Produk
                  </span>
                </td>
                <td className="py-3 px-4 text-green-900 border-l-2 border-green-300">
                  {produk.harga_produk}
                </td>
              </tr>
              <tr>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center mt-8">
          <a
            href="/dashboard/produk"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-green-700"
          >
            Kembali ke Daftar Produk
          </a>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching produk data:', error);
    return (
      <p className="text-red-500 text-center mt-4">
        Gagal memuat data produk. Silakan coba lagi nanti.
      </p>
    );
  }
}
