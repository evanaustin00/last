// pages/api/getPelangganByPhone.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchPelangganByPhone } from '../lib/data'; // Sesuaikan dengan lokasi fungsi fetch Anda

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { phone } = req.query;

    if (!phone || typeof phone !== 'string') {
      return res.status(400).json({ message: 'Nomor telepon tidak valid' });
    }

    try {
      const pelanggan = await fetchPelangganByPhone(phone); // Panggil fungsi untuk mendapatkan pelanggan berdasarkan no_hp

      if (pelanggan) {
        return res.status(200).json({ id: pelanggan.id_pelanggan });
      } else {
        return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
