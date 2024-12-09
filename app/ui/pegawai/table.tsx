import { formatDateToLocal, formatCurrency } from '../../lib/utils';
import { fetchFilteredpegawai } from '../../lib/data';
import React from 'react';
import { UpdatePegawai, DeletePegawai, TampilPegawai } from './buttons';

export default async function PegawaiTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // Fetching filtered data for pegawai (employees)
  const pegawai = await fetchFilteredpegawai(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-green-100 p-4 shadow-md">
          {/* Tampilan Mobile */}
          <div className="md:hidden">
            {pegawai?.map((pg) => (
              <div
                key={pg.id_pegawai}
                className="mb-4 w-full rounded-lg bg-white p-4 shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium text-green-800">{pg.nama_pegawai}</p>
                    <p className="text-sm text-gray-500">{pg.no_hp}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-bold text-green-700">
                      {pg.jumlah_penjualan}
                    </p>
                    <p className="text-sm text-gray-500">{pg.id_pegawai}</p>
                  </div>
                  <div className="flex gap-2">
                    <TampilPegawai id={pg.id_pegawai} />
                    <UpdatePegawai id={pg.id_pegawai} />
                    <DeletePegawai id={pg.id_pegawai} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tampilan Desktop */}
          <table className="hidden min-w-full md:table bg-green-50 rounded-lg">
            <thead className="bg-green-600 text-white text-sm font-medium rounded-t-lg">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">ID Pegawai</th>
                <th scope="col" className="px-4 py-3 text-left">Nama Pegawai</th>
                <th scope="col" className="px-4 py-3 text-left">No. HP</th>
                <th scope="col" className="px-4 py-3 text-left">Jumlah Penjualan</th>
                <th scope="col" className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-green-900">
              {pegawai?.map((pg, idx) => (
                <tr
                  key={pg.id_pegawai}
                  className={`border-b ${idx % 2 === 0 ? 'bg-green-50' : 'bg-white'}`}
                >
                  <td className="px-4 py-3">{pg.id_pegawai}</td>
                  <td className="px-4 py-3">{pg.nama_pegawai}</td>
                  <td className="px-4 py-3">{pg.no_hp}</td>
                  <td className="px-4 py-3">{pg.jumlah_penjualan}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <TampilPegawai id={pg.id_pegawai} />
                      <UpdatePegawai id={pg.id_pegawai} />
                      <DeletePegawai id={pg.id_pegawai} />
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
