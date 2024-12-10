
import { sql } from '@vercel/postgres';
import { LatestTransaksiPenjualanRaw, Transaksi_penjualanTable, Transaksi_PembelianTable, StokTable, ProdukTable, PelangganTable, PegawaiTable, Detail_penjualanTable, Detail_pembelianTable, ProdukField, StokField, PelangganField, PegawaiField, StokForm, ProdukForm, PelangganForm, PegawaiForm, transaksipenjualanForm, transaksipembelianField, transaksiPembelianForm, LoyalitasForm, LoyalitasField} from './definitions';
import { formatCurrency } from './utils'; // Assuming you have a format function for currency, if needed
import React from 'react';
import { unstable_noStore } from 'next/cache';
import { transaksipenjualanField } from './definitions';



const ITEMS_PER_PAGE = 10;

export async function fetchLatestTransaksiPenjualan() {
  try {
    const data = await sql<LatestTransaksiPenjualanRaw>` 
      SELECT  transaksi_penjualan.tanggal_transaksi, transaksi_penjualan.total_transaksi, pelanggan.nama_pelanggan
      FROM transaksi_penjualan 
      JOIN pelanggan on transaksi_penjualan.id_pelanggan = pelanggan.id_pelanggan::text
      ORDER BY Transaksi_penjualan.tanggal_transaksi DESC 
      LIMIT 5`;

    const latest_Transaksi_Penjualan = data.rows.map((transaksipenjualan) => ({
      ...transaksipenjualan,
      tanggal_transaksi: new Date(transaksipenjualan.tanggal_transaksi).toLocaleDateString(), // Format the date
    }));
    
    return latest_Transaksi_Penjualan;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest Transaksi Penjualan.');
  }
}

export async function fetchDetailpenjualanPages(query: string) {
  try {
    const count = await sql`
    SELECT COUNT(*)
FROM Transaksi_penjualan
JOIN detail_penjualan 
    ON Transaksi_penjualan.id_transaksi_penjualan = detail_penjualan.id_transaksi_penjualan
JOIN produk 
    ON detail_penjualan.id_produk = produk.id_produk::uuid
WHERE 
    CAST(Transaksi_penjualan.id_transaksi_penjualan AS TEXT) ILIKE ${`%${query}%`} OR
    CAST(detail_penjualan.id_produk AS TEXT) ILIKE ${`%${query}%`} OR
    CAST(produk.nama_produk AS TEXT) ILIKE ${`%${query}%`} OR
    CAST(Transaksi_penjualan.tanggal_transaksi AS TEXT) ILIKE ${`%${query}%`} OR
    CAST(Transaksi_penjualan.total_transaksi AS TEXT) ILIKE ${`%${query}%`};
  `;
  console.log('Count Result:', count.rows);  // Debugging output

    if (count.rows.length === 0) {
      throw new Error('No data found.');
    }

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  } 
}

export async function fetchTransaksipenjualanPages(query: string) {
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM transaksi_penjualan
    JOIN pelanggan ON transaksi_penjualan.id_pelanggan = Pelanggan.id_pelanggan::text;

  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  } 
}

export async function fetchTransaksipembelianPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM transaksi_pembelian
      JOIN detail_pembelian ON transaksi_pembelian.id_transaksi_pembelian = detail_pembelian.id_transaksi_pembelian
      JOIN stok ON detail_pembelian.id_stok = stok.id_stok
    `;

    console.log('Count Result:', count.rows);  // Debugging output

    if (count.rows.length === 0) {
      throw new Error('No data found.');
    }

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    // More detailed error logging
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch total number of invoices: ${error || error}`);
  }
}


export async function fetchFilteredTransaksiPenjualan(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const transaksipenjualan = await sql<Transaksi_penjualanTable>`
      SELECT
        transaksi_penjualan.id_transaksi_penjualan,
        transaksi_penjualan.tanggal_transaksi,
        Pelanggan.nama_pelanggan,
        Pelanggan.no_hp,
        transaksi_penjualan.total_transaksi
      FROM transaksi_penjualan
      JOIN Pelanggan
        ON transaksi_penjualan.id_pelanggan = Pelanggan.id_pelanggan::text
      WHERE
        CAST(transaksi_penjualan.id_transaksi_penjualan AS TEXT) ILIKE ${`%${query}%`} OR
        Pelanggan.nama_pelanggan ILIKE ${`%${query}%`} OR
        Pelanggan.no_hp ILIKE ${`%${query}%`} OR
        CAST(transaksi_penjualan.total_transaksi AS TEXT) ILIKE ${`%${query}%`}
      ORDER BY transaksi_penjualan.tanggal_transaksi DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return transaksipenjualan.rows; // Return directly if this is the expected type for your component
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transaksipenjualan data.');
  }
}



export async function fetchFilteredstok(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const stok = await sql<StokTable>`
      SELECT
        id_stok,
        nama_barang,
        harga_barang,
        jumlah_barang
      FROM stok
      WHERE
        CAST(id_stok AS TEXT) ILIKE ${`%${query}%`} OR
        nama_barang ILIKE ${`%${query}%`} OR
        CAST(harga_barang AS TEXT) ILIKE ${`%${query}%`} OR
        CAST(jumlah_barang AS TEXT) ILIKE ${`%${query}%`}
      ORDER BY jumlah_barang DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return stok.rows; // Return directly if this is the expected type for your component
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stock data.');
  }
}

export async function fetchFilteredproduk(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const produk = await sql<ProdukTable>`
      SELECT
        id_produk,
        nama_produk,
        harga_produk
      FROM produk
      WHERE
        CAST(id_produk AS TEXT) ILIKE ${`%${query}%`} OR
        nama_produk ILIKE ${`%${query}%`} OR
        CAST(harga_produk AS TEXT) ILIKE ${`%${query}%`}
      ORDER BY harga_produk ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return produk.rows; // Return directly if this is the expected type for your component
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stock data.');
  }
}



export async function fetchFilteredpelanggan(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const pelanggan = await sql<PelangganTable>`
      SELECT *
      FROM pelanggan
      WHERE
        CAST(id_pelanggan AS TEXT) ILIKE ${`%${query}%`} OR
        nama_pelanggan ILIKE ${`%${query}%`} OR
        no_hp ILIKE ${`%${query}%`} OR
        alamat ILIKE ${`%${query}%`} OR
        CAST(jumlah_xp AS TEXT) ILIKE ${`%${query}%`}
      
      ORDER BY jumlah_xp DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    // Map data pelanggan dan tambahkan tingkat berdasarkan jumlah_xp
    return pelanggan.rows.map((pelanggan) => ({
      ...pelanggan,
      tingkat: getTingkat(pelanggan.jumlah_xp),  // Menambahkan tingkat pelanggan
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pelanggan data.');
  }
}


export async function fetchFilteredpegawai(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const pegawai = await sql<PegawaiTable>` 
      SELECT *
      FROM pegawai
      WHERE
        CAST(id_pegawai AS TEXT) ILIKE ${`%${query}%`} OR
        nama_pegawai ILIKE ${`%${query}%`} OR
        no_hp ILIKE ${`%${query}%`} OR
        CAST(jumlah_penjualan AS TEXT) ILIKE ${`%${query}%`} 
      ORDER BY jumlah_penjualan DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return pegawai.rows; // Return directly if this is the expected type for your component
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch employee data.'); // Update error message for clarity
  }
}

export async function fetchFiltereddetailpenjualan(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const detail_penjualan = await sql<Detail_penjualanTable>`
    SELECT
  transaksi_penjualan.id_transaksi_penjualan,
  transaksi_penjualan.tanggal_transaksi,
  Pelanggan.nama_pelanggan,
  Pelanggan.no_hp,
  transaksi_penjualan.total_transaksi
FROM transaksi_penjualan
JOIN Pelanggan
  ON transaksi_penjualan.id_pelanggan = Pelanggan.id_pelanggan::text
WHERE
  CAST(transaksi_penjualan.id_transaksi_penjualan AS TEXT) ILIKE ${`%${query}%`} OR
  CAST(transaksi_penjualan.tanggal_transaksi AS TEXT) ILIKE ${`%${query}%`} OR
  Pelanggan.nama_pelanggan ILIKE ${`%${query}%`} OR
  CAST(Pelanggan.no_hp AS TEXT) ILIKE ${`%${query}%`} OR
  CAST(transaksi_penjualan.total_transaksi AS TEXT) ILIKE ${`%${query}%`}
ORDER BY
  transaksi_penjualan.tanggal_transaksi DESC;
    `;

    return detail_penjualan.rows; // Return directly if this is the expected type for your component
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transaction details.'); // Update error message for clarity
  }
}

export async function fetchFiltereddetailpembelian(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const detail_pembelian = await sql<Detail_pembelianTable>`
     SELECT 
    transaksi_pembelian.id_transaksi_pembelian,
    SUM(stok.jumlah_barang * stok.harga_barang) AS total_harga,
    transaksi_pembelian.tanggal_pembelian,
    transaksi_pembelian.nama_supplier,
    stok.id_stok,
    stok.nama_barang,
    stok.jumlah_barang,
    stok.harga_barang
FROM transaksi_pembelian
JOIN detail_pembelian 
    ON transaksi_pembelian.id_transaksi_pembelian = detail_pembelian.id_transaksi_pembelian
JOIN stok 
    ON detail_pembelian.id_stok = stok.id_stok
    GROUP BY 
    transaksi_pembelian.id_transaksi_pembelian,
    transaksi_pembelian.tanggal_pembelian,
    transaksi_pembelian.nama_supplier,
    transaksi_pembelian.total_harga,
    stok.id_stok,
    stok.nama_barang,
    stok.jumlah_barang,
    stok.harga_barang
        ORDER BY transaksi_pembelian.tanggal_pembelian DESC

    `;

    return detail_pembelian.rows; // Return directly if this is the expected type for your component
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch purchase details.');
  }
}


export async function fetchFilteredtransaksipembelian(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const transaksipembelian = await sql<Transaksi_PembelianTable>`
      SELECT 
        transaksi_pembelian.id_transaksi_pembelian,
        SUM(stok.jumlah_barang * stok.harga_barang) AS total_harga,
        transaksi_pembelian.tanggal_pembelian,
        transaksi_pembelian.nama_supplier,
        stok.id_stok,
        stok.nama_barang,
        stok.jumlah_barang,
        stok.harga_barang
      FROM transaksi_pembelian
      JOIN detail_pembelian 
        ON transaksi_pembelian.id_transaksi_pembelian = detail_pembelian.id_transaksi_pembelian
      JOIN stok 
        ON detail_pembelian.id_stok = stok.id_stok
      WHERE
        CAST(transaksi_pembelian.id_transaksi_pembelian AS TEXT) ILIKE ${`%${query}%`} OR
        transaksi_pembelian.nama_supplier ILIKE ${`%${query}%`} OR
        stok.nama_barang ILIKE ${`%${query}%`} OR
        CAST(stok.harga_barang AS TEXT) ILIKE ${`%${query}%`} OR
        CAST(stok.jumlah_barang AS TEXT) ILIKE ${`%${query}%`}
      GROUP BY 
        transaksi_pembelian.id_transaksi_pembelian,
        transaksi_pembelian.tanggal_pembelian,
        transaksi_pembelian.nama_supplier,
        stok.id_stok,
        stok.nama_barang,
        stok.jumlah_barang,
        stok.harga_barang
      ORDER BY transaksi_pembelian.tanggal_pembelian DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return transaksipembelian.rows; // Ensure this matches the expected type in your component
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch purchases.');
  }
}


// export async function fetchCardData() {
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
//     const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
//     const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
//     const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

// const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredInvoices(
//   query: string,
//   currentPage: number,
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const invoices = await sql<InvoicesTable>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${%${query}%} OR
//         customers.email ILIKE ${%${query}%} OR
//         invoices.amount::text ILIKE ${%${query}%} OR
//         invoices.date::text ILIKE ${%${query}%} OR
//         invoices.status ILIKE ${%${query}%}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return invoices.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoices.');
//   }
// }

export async function fetchstokPages(query: string) {
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM stok
    WHERE
       CAST(id_stok AS TEXT) ILIKE ${`%${query}%`} OR
        nama_barang ILIKE ${`%${query}%`} OR
        CAST(harga_barang AS TEXT) ILIKE ${`%${query}%`} OR
        CAST(jumlah_barang AS TEXT) ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchprodukPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM produk
    WHERE
       CAST(id_produk AS TEXT) ILIKE ${`%${query}%`} OR
        nama_produk ILIKE ${`%${query}%`} OR
        CAST(harga_produk AS TEXT) ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchpelangganPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM pelanggan
    WHERE
       CAST(id_pelanggan AS TEXT) ILIKE ${`%${query}%`} OR
        nama_pelanggan ILIKE ${`%${query}%`} OR
        no_hp ILIKE ${`%${query}%`} OR
        alamat ILIKE ${`%${query}%`} OR
        CAST(jumlah_xp AS TEXT) ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchpegawaiPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM pegawai
    WHERE
       CAST(id_pegawai AS TEXT) ILIKE ${`%${query}%`} OR
        nama_pegawai ILIKE ${`%${query}%`} OR
        no_hp ILIKE ${`%${query}%`} OR
        CAST(jumlah_penjualan AS TEXT) ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}



// export async function fetchInvoiceById(id: string) {
//   try {
//     const data = await sql<InvoiceForm>`
//       SELECT
//         invoices.id,
//         invoices.customer_id,
//         invoices.amount,
//         invoices.status
//       FROM invoices
//       WHERE invoices.id = ${id};
//     `;

//     const invoice = data.rows.map((invoice) => ({
//       ...invoice,
//       // Convert amount from cents to dollars
//       amount: invoice.amount / 100,
//     }));

//     return invoice[0];
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoice.');
//   }
// }

// const ITEMS_PER_PAGE = 10; // Definisikan jumlah item per halaman sesuai kebutuhan




export async function fetchtransaksipenjualan() {
  unstable_noStore();
  try {
    const data = await sql<transaksipenjualanField>` 
      SELECT 
    transaksi_penjualan.id_transaksi_penjualan,
    SUM(detail_penjualan.total_transaksi) AS total_transaksi,
    transaksi_penjualan.tanggal_transaksi,
    pegawai.nama_pegawai,
    produk.nama_produk,
    pelanggan.no_hp,
    pelanggan.nama_pelanggan,
    loyalitas.diskon,
    loyalitas.id_loyalitas,
    pegawai.id_pegawai,
    produk.id_produk,
    pelanggan.id_pelanggan,
    pegawai.jumlah_penjualan
FROM transaksi_penjualan
JOIN pegawai 
    ON transaksi_penjualan.id_pegawai = pegawai.id_pegawai
JOIN detail_penjualan 
    ON transaksi_penjualan.id_transaksi_penjualan = detail_penjualan.id_transaksi_penjualan
JOIN produk 
    ON detail_penjualan.id_produk = produk.id_produk
JOIN pelanggan 
    ON pelanggan.id_pelanggan::text = transaksi_penjualan.id_pelanggan
JOIN loyalitas 
    ON loyalitas.id_loyalitas = pelanggan.id_loyalitas
GROUP BY 
    transaksi_penjualan.id_transaksi_penjualan, 
    transaksi_penjualan.tanggal_transaksi,
    pegawai.nama_pegawai,
    produk.nama_produk,
    pelanggan.no_hp,
    pelanggan.nama_pelanggan,
    loyalitas.diskon,
    loyalitas.id_loyalitas,
    pegawai.id_pegawai,
    produk.id_produk,
    pelanggan.id_pelanggan,
pegawai.jumlah_penjualan
ORDER BY transaksi_penjualan.tanggal_transaksi DESC;
    `;

    
    const transaksi_penjualan = data.rows;
    console.log('Fetched transaksi_penjualan Data:', data); // L

    // Format date field for consistent output
    return transaksi_penjualan;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all transaksi_penjualan.');
  }
}

export async function fetchtransaksipembelian() {
  unstable_noStore();
  try {
    const data = await sql<transaksipembelianField>` 
       SELECT 
    transaksi_pembelian.id_transaksi_pembelian,
    SUM(stok.jumlah_barang * stok.harga_barang) AS total_harga,
    transaksi_pembelian.tanggal_pembelian,
    transaksi_pembelian.nama_supplier,
    stok.id_stok,
    stok.nama_barang,
    stok.jumlah_barang,
    stok.harga_barang
FROM transaksi_pembelian
JOIN detail_pembelian 
    ON transaksi_pembelian.id_transaksi_pembelian = detail_pembelian.id_transaksi_pembelian
JOIN stok 
    ON detail_pembelian.id_stok = stok.id_stok
GROUP BY 
    transaksi_pembelian.id_transaksi_pembelian,
    transaksi_pembelian.tanggal_pembelian,
    transaksi_pembelian.nama_supplier,
    transaksi_pembelian.total_harga,
    stok.id_stok,
    stok.nama_barang,
    stok.jumlah_barang,
    stok.harga_barang
ORDER BY transaksi_pembelian.tanggal_pembelian DESC;
    `;    

    const transaksi_pembelian = data.rows;
    console.log('Fetched transaksi_penjualan Data:', data); // L

    // Format date field for consistent output
    return transaksi_pembelian;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all transaksi_penjualan.');
  }
}


export async function fetchProduk() {
  unstable_noStore();
  try {
    const data = await sql<ProdukField>`
      SELECT
        id_produk,
        nama_produk,
        harga_produk
      FROM produk
      ORDER BY nama_produk ASC
    `;

    const produk = data.rows;
    return produk;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchPelanggan() {
  try {
    const data = await sql<PelangganField>`
      SELECT
        id_pelanggan,
        nama_pelanggan,
        alamat,
        no_hp,
        jumlah_xp,
        tingkat
      FROM pelanggan
      ORDER BY nama_pelanggan ASC
    `;

    const pelanggan = data.rows;
    return pelanggan;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

// Fungsi baru untuk memeriksa tingkat loyalitas berdasarkan nomor HP
// data.ts
export async function fetchPelangganByNoHp(no_hp: string) {
  unstable_noStore();

    console.log('Mencari pelanggan dengan nomor telepon:', no_hp); // Debugging untuk memastikan parameter yang diterima

    // Jalankan query SQL untuk mencari pelanggan berdasarkan nomor telepon
    const data = await sql<PelangganField>`
      SELECT
        id_pelanggan,
        nama_pelanggan,
        no_hp,
        tingkat,
        jumlah_xp
      FROM pelanggan
      WHERE no_hp = ${no_hp}
    `;

    // Periksa apakah ada hasil yang ditemukan
    if (data && data.rows && data.rows.length > 0) { // Pastikan ada data yang ditemukan
      console.log('Pelanggan ditemukan:', data.rows[0]);  // Debugging untuk menampilkan hasil query
      return data.rows[0];  // Mengembalikan data pelanggan pertama yang ditemukan
    } else {
      console.log('Pelanggan tidak ditemukan'); // Debugging jika pelanggan tidak ditemukan
      return null;  // Jika pelanggan tidak ditemukan
    }
  
  }  


export async function fetchPegawai() {
  try {
    const data = await sql<PegawaiField>`
      SELECT
        id_pegawai,
        nama_pegawai,
        no_hp,
        jumlah_penjualan
      FROM pegawai
      ORDER BY nama_pegawai ASC
    `;

    const pegawai = data.rows;
    return pegawai;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchStok() {
  unstable_noStore();
  try {
    const data = await sql<StokField>`
      SELECT
        id_stok,
        nama_barang,
        harga_barang,
        jumlah_barang
      FROM stok
      ORDER BY nama_barang ASC
    `;

    console.log('Fetched Stok Data:', data); // Log to inspect the fetched data

    const stok = data.rows;  // Assuming 'data.rows' contains the result
    return stok;
  } catch (err) {
    console.error('Database Error:', err);  // Log the error
    throw new Error('Failed to fetch all stok.');
  }
}





export async function fetchStokById(id: string) {
  unstable_noStore();
  
    const data = await sql<StokForm>`
      SELECT
        stok.id_stok,
        stok.nama_barang,
        stok.harga_barang,
        stok.jumlah_barang
      FROM stok
      WHERE id_stok = ${id} -- Mengambil stok tertentu berdasarkan id
      
    `;
    const stok = data.rows.map((stok) => ({
      ...stok,
      // Convert amount from cents to dollars
      // amount: customer.amount / 100,
    }));

    
    console.log(stok); // Invoice is an empty array []
    return stok[0];
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch customer.');
  // }
}
export async function fetchtransaksipenjualanById(id: string) {
  unstable_noStore();
  
    const data = await sql<transaksipenjualanForm>`
      SELECT
    transaksi_penjualan.id_transaksi_penjualan,
  transaksi_penjualan.tanggal_transaksi,
  Pelanggan.nama_pelanggan,
  Pelanggan.no_hp,
  transaksi_penjualan.total_transaksi
FROM transaksi_penjualan
JOIN Pelanggan
  ON transaksi_penjualan.id_pelanggan = Pelanggan.id_pelanggan::text
WHERE transaksi_penjualan.id_transaksi_penjualan = ${id}
GROUP BY transaksi_penjualan.id_transaksi_penjualan, pelanggan.nama_pelanggan, transaksi_penjualan.total_transaksi, transaksi_penjualan.tanggal_transaksi, pelanggan.id_pelanggan

    `;
    const transaksi_penjualan = data.rows.map((transaksi_penjualan) => ({
      ...transaksi_penjualan,
      // Convert amount from cents to dollars
      // amount: customer.amount / 100,
    }));

    
    console.log(transaksi_penjualan); // Invoice is an empty array []
    return transaksi_penjualan[0];
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch customer.');
  // }
}

export async function fetchtransaksipembelianById(id: string) {
  unstable_noStore();
  
    const data = await sql<transaksiPembelianForm>`
      SELECT
        transaksi_pembelian.id_transaksi_pembelian,
        transaksi_pembelian.total_harga,
        transaksi_pembelian.tanggal_pembelian,
        transaksi_pembelian.nama_supplier,
        stok.nama_barang,
        stok.jumlah_barang
      FROM transaksi_pembelian
      JOIN detail_pembelian ON transaksi_pembelian.id_transaksi_pembelian = detail_pembelian.id_transaksi_pembelian
      JOIN stok ON stok.id_stok = detail_pembelian.id_stok
      WHERE transaksi_pembelian.id_transaksi_pembelian = ${id}
      GROUP BY transaksi_pembelian.id_transaksi_pembelian, transaksi_pembelian.total_harga, transaksi_pembelian.tanggal_pembelian, transaksi_pembelian.nama_supplier, stok.nama_barang, stok.jumlah_barang
    `;
    const transaksi_pembelian = data.rows.map((transaksi_pembelian) => ({
      ...transaksi_pembelian,
      // Convert amount from cents to dollars
      // amount: customer.amount / 100,
    }));

    
    console.log(transaksi_pembelian); // Invoice is an empty array []
    return transaksi_pembelian[0];
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch customer.');
  // }
}


export async function fetchProdukById(id: string) {
  unstable_noStore();
  
    const data = await sql<ProdukForm>`
      SELECT
        produk.id_produk, 
        produk.nama_produk,
        produk.harga_produk
      FROM produk
      WHERE id_produk = ${id}
      
    `;
    const produk = data.rows.map((produk) => ({
      ...produk,
      // Convert amount from cents to dollars
      // amount: customer.amount / 100,
    }));

    
    console.log(produk); // Invoice is an empty array []
    return produk[0];
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch customer.');
  // }
}


export async function fetchLoyalitas() {
  unstable_noStore();
  try {
    const data = await sql<LoyalitasField>`
      SELECT
        id_loyalitas,
        tingkat,
        diskon
      FROM loyalitas
      ORDER BY tingkat ASC
    `;

    console.log('Fetched Stok Data:', data); // Log to inspect the fetched data

    const stok = data.rows;  // Assuming 'data.rows' contains the result
    return stok;
  } catch (err) {
    console.error('Database Error:', err);  // Log the error
    throw new Error('Failed to fetch all stok.');
  }
}










export function getTingkat(jumlah_xp: number): string {
  if (jumlah_xp > 100000) return 'Gold';
  if (jumlah_xp > 50000) return 'Silver';
  if (jumlah_xp >= 0) return 'Bronze'; // Ensure this condition covers all non-negative values

  return 'Unknown'; // Return a default value for negative values or any other unexpected input
}

// data.ts
export async function fetchPelangganByPhone(phoneNumber: string) {
  try {
    const data = await sql<PelangganForm>`
      SELECT
        id_pelanggan, 
        nama_pelanggan, 
        alamat, 
        no_hp, 
        jumlah_xp
      FROM pelanggan
      WHERE no_hp = ${phoneNumber}
    `;

    return data.rows[0];  // Mengembalikan pelanggan pertama
  } catch (error) {
    console.error('Error fetching pelanggan by phone:', error);
    throw new Error('Gagal mengambil data pelanggan');
  }
}


export async function fetchPelangganById(id: string) {
  try {
    const data = await sql<PelangganForm>`
      SELECT
        pelanggan.id_pelanggan, 
        pelanggan.nama_pelanggan,
        pelanggan.alamat,
        pelanggan.no_hp,
        pelanggan.jumlah_xp
      FROM pelanggan
      WHERE id_pelanggan = ${id}
    `;

    // Map data pelanggan dan tambahkan tingkat berdasarkan jumlah_xp
    const pelanggan = data.rows.map((pelanggan) => ({
      ...pelanggan,
      tingkat: getTingkat(pelanggan.jumlah_xp),  // Menambahkan tingkat pelanggan
    }));

    console.log(pelanggan); // Melihat hasil pelanggan
    return pelanggan[0];  // Mengembalikan pelanggan pertama (hanya satu pelanggan berdasarkan id)
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
  }
}

export async function fetchPegawaiById(id: string) {
  unstable_noStore();
  
    const data = await sql<PegawaiForm>`
      SELECT
        pegawai.id_pegawai,
        pegawai.nama_pegawai,
        pegawai.no_hp,
        pegawai.jumlah_penjualan
      FROM pegawai
      WHERE id_pegawai = ${id}
      
    `;
    const pegawai = data.rows.map((pegawai) => ({
      ...pegawai,
      // Convert amount from cents to dollars
      // amount: customer.amount / 100,
    }));

    
    console.log(pegawai); // Invoice is an empty array []
    return pegawai[0];
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch customer.');
  // }
}






// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await sql<CustomersTableType>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${%${query}%} OR
//         customers.email ILIKE ${%${query}%}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.rows.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }

// export async function getUser(email: string) {
//   try {
//     const user = await sql`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0] as User;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }