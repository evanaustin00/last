import Image from 'next/image';
import { formatDateToLocal, formatCurrency } from '../../lib/utils';
import { fetchFilteredproduk } from '../../lib/data';
import React from 'react';

import { UpdateProduk, DeleteProduk, TampilProduk } from '../../ui/produk/buttons';

export default async function ProdukTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const produk = await fetchFilteredproduk(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-green-100 p-4 shadow-md">
          {/* Tampilan Mobile */}
          <div className="md:hidden">
            {produk?.map((pk) => (
              <div
                key={pk.id_produk}
                className="mb-4 w-full rounded-lg bg-white p-4 shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium text-green-800">{pk.nama_produk}</p>
                    <p className="text-sm text-gray-500">{pk.nama_produk}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-bold text-green-700">
                      {(pk.harga_produk)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <TampilProduk id={pk.id_produk} />
                    <UpdateProduk id={pk.id_produk} />
                    <DeleteProduk id={pk.id_produk} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tampilan Desktop */}
          <table className="hidden min-w-full md:table bg-green-50 rounded-lg">
            <thead className="bg-green-600 text-white text-sm font-medium rounded-t-lg">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">Nama Produk</th>
                <th scope="col" className="px-4 py-3 text-left">Harga</th>
                <th scope="col" className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-green-900">
              {produk?.map((pk, idx) => (
                <tr
                  key={pk.id_produk}
                  className={`border-b ${idx % 2 === 0 ? 'bg-green-50' : 'bg-white'}`}
                >
                  <td className="px-4 py-3">{pk.nama_produk}</td>
                  <td className="px-4 py-3">{(pk.harga_produk)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <TampilProduk id={pk.id_produk} />
                      <UpdateProduk id={pk.id_produk} />
                      <DeleteProduk id={pk.id_produk} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
