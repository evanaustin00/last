import { formatDateToLocal, formatCurrency } from '../../lib/utils';
import { fetchFilteredpelanggan } from '../../lib/data';
import React from 'react';
import { DeletePelanggan, UpdatePelanggan, TampilPelanggan } from './buttons';

export default async function PelangganTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const pelanggan = await fetchFilteredpelanggan(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-green-100 p-4 shadow-md">
          {/* Tampilan Mobile */}
          <div className="md:hidden">
            {pelanggan?.map((pl) => (
              <div
                key={pl.id_pelanggan}
                className="mb-4 w-full rounded-lg bg-white p-4 shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium text-green-800">{pl.nama_pelanggan}</p>
                    <p className="text-sm text-gray-500">{pl.no_hp}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-bold text-green-700">{pl.tingkat}</p>
                    <p className="text-sm text-gray-500">{pl.id_pelanggan}</p>
                  </div>
                  <div className="flex gap-2">
                    <TampilPelanggan id={pl.id_pelanggan} />
                    <UpdatePelanggan id={pl.id_pelanggan} />
                    <DeletePelanggan id={pl.id_pelanggan} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tampilan Desktop */}
          <table className="hidden min-w-full md:table bg-green-50 rounded-lg">
            <thead className="bg-green-600 text-white text-sm font-medium rounded-t-lg">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">Id Pelanggan</th>
                <th scope="col" className="px-4 py-3 text-left">Nama Pelanggan</th>
                <th scope="col" className="px-4 py-3 text-left">Tingkat</th>
                <th scope="col" className="px-4 py-3 text-left">No. HP</th>
                <th scope="col" className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-green-900">
              {pelanggan?.map((pl, idx) => (
                <tr
                  key={pl.id_pelanggan}
                  className={`border-b ${idx % 2 === 0 ? 'bg-green-50' : 'bg-white'}`}
                >
                  <td className="px-4 py-3">{pl.id_pelanggan}</td>
                  <td className="px-4 py-3">{pl.nama_pelanggan}</td>
                  <td className="px-4 py-3">{pl.tingkat}</td>
                  <td className="px-4 py-3">{pl.no_hp}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <TampilPelanggan id={pl.id_pelanggan} />
                      <UpdatePelanggan id={pl.id_pelanggan} />
                      <DeletePelanggan id={pl.id_pelanggan} />
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
