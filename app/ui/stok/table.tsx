import { formatDateToLocal, formatCurrency } from '../../lib/utils';
import { fetchFilteredstok } from '../../lib/data';
import React from 'react';
import { UpdateStok, DeleteStok, TampilStok } from './buttons';

export default async function StokTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const stok = await fetchFilteredstok(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-green-100 p-4 shadow-md">
          {/* Tampilan Mobile */}
          <div className="md:hidden">
            {stok?.map((stok) => (
              <div
                key={stok.id_stok}
                className="mb-4 w-full rounded-lg bg-white p-4 shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium text-green-800">{stok.nama_barang}</p>
                    <p className="text-sm text-gray-500">{stok.jumlah_barang}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-bold text-green-700">
                      {(stok.harga_barang)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <TampilStok id={stok.id_stok} />
                    <UpdateStok id={stok.id_stok} />
                    <DeleteStok id={stok.id_stok} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tampilan Desktop */}
          <table className="hidden min-w-full md:table bg-green-50 rounded-lg">
            <thead className="bg-green-600 text-white text-sm font-medium rounded-t-lg">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">ID Stok</th>
                <th scope="col" className="px-4 py-3 text-left">Nama Barang</th>
                <th scope="col" className="px-4 py-3 text-left">Jumlah Barang</th>
                <th scope="col" className="px-4 py-3 text-left">Harga</th>
                <th scope="col" className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-green-900">
              {stok?.map((st, idx) => (
                <tr
                  key={st.id_stok}
                  className={`border-b ${idx % 2 === 0 ? 'bg-green-50' : 'bg-white'}`}
                >
                  <td className="px-4 py-3">{st.id_stok}</td>
                  <td className="px-4 py-3">{st.nama_barang}</td>
                  <td className="px-4 py-3">{st.jumlah_barang}</td>
                  <td className="px-4 py-3">{(st.harga_barang)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <TampilStok id={st.id_stok} />
                      <UpdateStok id={st.id_stok} />
                      <DeleteStok id={st.id_stok} />
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
