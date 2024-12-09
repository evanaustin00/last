import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; // Pastikan bcryptjs sudah terinstal
import { db } from '@vercel/postgres';
import { 
  transaksi_penjualan, 
  transaksi_pembelian, 
  detail_pembelian, 
  detail_penjualan, 
  users, 
  stok, 
  produk, 
  pelanggan, 
  pegawai,
  loyalitas
} from '../app/lib/placeholder-data.mjs';

dotenv.config();
console.log("Environment variables loaded.");

// Menghubungkan ke database
const client = await db.connect();

const runSeed = async () => {
    try {
        await client.sql`BEGIN`;

        // Seed tables in order of dependencies
        await seedLoyalitas();
        await seedUsers();
        await seedPegawai();
        await seedPelanggan();
        await seedProduk();
        await seedStok();
        await seedTransaksiPenjualan();
        await seedTransaksiPembelian();
        await seedDetailPenjualan();
        await seedDetailPembelian();
       

        await client.sql`COMMIT`;
        console.log("Database seeded successfully");
    } catch (error) {
        await client.sql`ROLLBACK`;
        console.error("Seeding failed:", error);
    } finally {
        client.release();
    }
};

async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            password TEXT NOT NULL,
            role VARCHAR(50) NOT NULL
        );
    `;

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return client.sql`
                INSERT INTO users (username, password, role)
                VALUES (${user.username}, ${hashedPassword}, ${user.role})
                ON CONFLICT (username) DO NOTHING;
            `;
        }),
    );
    return insertedUsers;
}


async function seedLoyalitas() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS loyalitas (
            id_loyalitas UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            tingkat VARCHAR(255) NOT NULL,
            diskon FLOAT NOT NULL
        );
    `;

    const insertedLoyalitas = await Promise.all(
        loyalitas.map((l) => client.sql`
            INSERT INTO loyalitas (id_loyalitas, tingkat, diskon)
            VALUES (${l.id_loyalitas}, ${l.tingkat}, ${l.diskon})
            ON CONFLICT (id_loyalitas) DO NOTHING;
        `),
    );
    return insertedLoyalitas;
}

async function seedPelanggan() {
   
    // Make sure the column "tingkat" exists or alter the table to add it
    await client.sql`
        CREATE TABLE IF NOT EXISTS pelanggan (
            id_pelanggan UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            nama_pelanggan VARCHAR(255) NOT NULL,
            alamat VARCHAR(30) NOT NULL,
            no_hp VARCHAR(15) NOT NULL,
            jumlah_xp FLOAT DEFAULT 0,
            id_loyalitas UUID NOT NULL REFERENCES loyalitas(id_loyalitas)
        );
    `;

    // In case the column 'tingkat' doesn't exist, add it
    

    const insertedPelanggan = await Promise.all(
        pelanggan.map((p) =>  client.sql`
                INSERT INTO pelanggan (id_pelanggan, nama_pelanggan, alamat, no_hp, jumlah_xp, id_loyalitas)
                VALUES (${p.id_pelanggan}, ${p.nama_pelanggan}, ${p.alamat}, ${p.no_hp}, ${p.jumlah_xp}, ${p.id_loyalitas})
                ON CONFLICT (id_pelanggan) DO NOTHING;
            `
        ),
    );
    
    return insertedPelanggan;
}

async function seedPegawai() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS pegawai (
            id_pegawai UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            nama_pegawai VARCHAR(255) NOT NULL,
            no_hp VARCHAR(15) NOT NULL,
            jumlah_penjualan FLOAT DEFAULT 0
        );
    `;

    const insertedPegawai = await Promise.all(
        pegawai.map((p) => client.sql`
            INSERT INTO pegawai (id_pegawai, nama_pegawai, no_hp, jumlah_penjualan)
            VALUES (${p.id_pegawai}, ${p.nama_pegawai}, ${p.no_hp}, ${p.jumlah_penjualan})
            ON CONFLICT (id_pegawai) DO NOTHING;
        `),
    );
    return insertedPegawai;
}

async function seedProduk() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS produk (
            id_produk UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            nama_produk VARCHAR(255) NOT NULL,
            harga_produk FLOAT NOT NULL
        );
    `;

    const insertedProduk = await Promise.all(
        produk.map((p) => client.sql`
            INSERT INTO produk (id_produk, nama_produk, harga_produk)
            VALUES (${p.id_produk}, ${p.nama_produk}, ${p.harga_produk})
            ON CONFLICT (id_produk) DO NOTHING;
        `),
    );
    return insertedProduk;
}

async function seedStok() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS stok (
            id_stok UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            nama_barang VARCHAR(255) NOT NULL,
            harga_barang FLOAT NOT NULL,
            jumlah_barang FLOAT NOT NULL
        );
    `;

    const insertedStok = await Promise.all(
        stok.map((s) => client.sql`
            INSERT INTO stok (id_stok, nama_barang, harga_barang, jumlah_barang)
            VALUES (${s.id_stok}, ${s.nama_barang}, ${s.harga_barang}, ${s.jumlah_barang})
            ON CONFLICT (id_stok) DO NOTHING;
        `),
    );
    return insertedStok;
}



async function seedTransaksiPenjualan() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS transaksi_penjualan (
            id_transaksi_penjualan UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            id_pelanggan UUID NOT NULL REFERENCES pelanggan(id_pelanggan),
            tanggal_transaksi DATE NOT NULL,
            total_transaksi FLOAT NOT NULL,
            id_pegawai UUID NOT NULL REFERENCES pegawai(id_pegawai),
            id_produk UUID NOT NULL REFERENCES produk(id_produk)
        );
    `;

    const insertedTransaksiPenjualan = await Promise.all(
        transaksi_penjualan.map((tp) => client.sql`
            INSERT INTO transaksi_penjualan (
                id_transaksi_penjualan, id_pelanggan, tanggal_transaksi, id_pegawai,total_transaksi, id_produk
            )
            VALUES (
                ${tp.id_transaksi_penjualan}, ${tp.id_pelanggan},  
                ${tp.tanggal_transaksi}, ${tp.id_pegawai}, ${tp.total_transaksi}, ${tp.id_produk}
            )
            ON CONFLICT (id_transaksi_penjualan) DO NOTHING;
        `),
    );
    return insertedTransaksiPenjualan;
}

async function seedTransaksiPembelian() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS transaksi_pembelian (
            id_transaksi_pembelian UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            total_harga FLOAT NOT NULL,
            tanggal_pembelian DATE NOT NULL,
            nama_supplier VARCHAR(255) NOT NULL,
            nama_barang VARCHAR(255) NOT NULL,
            id_stok UUID NOT NULL REFERENCES stok(id_stok)
        );
    `;

    await client.sql`
        CREATE TABLE IF NOT EXISTS stok_transaksi_pembelian (
            id_transaksi_pembelian UUID NOT NULL,
            id_stok UUID NOT NULL,
            nama_barang VARCHAR(255) NOT NULL,
            harga_barang FLOAT NOT NULL,
            jumlah_barang INT NOT NULL,
            PRIMARY KEY (id_transaksi_pembelian, id_stok),
            FOREIGN KEY (id_transaksi_pembelian) REFERENCES transaksi_pembelian(id_transaksi_pembelian) ON DELETE CASCADE
        );
    `;

    const insertedTransaksiPembelian = await Promise.all(
        transaksi_pembelian.map((tp) => client.sql`
            INSERT INTO transaksi_pembelian (
                id_transaksi_pembelian, total_harga, tanggal_pembelian,
                nama_supplier, nama_barang, id_stok
            )
            VALUES (
                ${tp.id_transaksi_pembelian}, ${tp.total_harga},
                ${tp.tanggal_pembelian}, ${tp.nama_supplier}, ${tp.nama_barang}, ${tp.id_stok}
            )
            ON CONFLICT (id_transaksi_pembelian) DO NOTHING;
        `),
    );

    return insertedTransaksiPembelian;
}


async function seedDetailPenjualan() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS detail_penjualan (
            id_produk UUID REFERENCES produk(id_produk),
            id_transaksi_penjualan UUID REFERENCES transaksi_penjualan(id_transaksi_penjualan),
            total_transaksi FLOAT NOT NULL,
            jumlah_produk FLOAT NOT NULL,
            PRIMARY KEY (id_produk, id_transaksi_penjualan) -- Define composite primary key if needed
        );
    `;

    const insertedDetailPenjualan = await Promise.all(
        detail_penjualan.map((dp) => client.sql`
            INSERT INTO detail_penjualan (
                id_produk, id_transaksi_penjualan, total_transaksi, jumlah_produk
            )
            VALUES (
                ${dp.id_produk}, ${dp.id_transaksi_penjualan}, ${dp.total_transaksi},
                ${dp.jumlah_produk}
            )
            ON CONFLICT (id_produk, id_transaksi_penjualan) DO NOTHING;
        `),
    );
    return insertedDetailPenjualan;
}

async function seedDetailPembelian() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS detail_pembelian (
            id_transaksi_pembelian UUID REFERENCES transaksi_pembelian(id_transaksi_pembelian) ON DELETE CASCADE,
            id_stok UUID REFERENCES stok(id_stok) ON DELETE CASCADE,
            total_transaksi FLOAT NOT NULL,
            PRIMARY KEY (id_transaksi_pembelian, id_stok) -- This remains a composite primary key
        );
    `;

    const insertedDetailPembelian = await Promise.all(
        detail_pembelian.map((dp) => client.sql`
            INSERT INTO detail_pembelian (
                id_transaksi_pembelian, id_stok, total_transaksi
            )
            VALUES (
                ${dp.id_transaksi_pembelian}, ${dp.id_stok}, ${dp.total_transaksi}
            )
            ON CONFLICT (id_transaksi_pembelian, id_stok) DO NOTHING;
        `),
    );
    return insertedDetailPembelian;
}






// Memanggil fungsi runSeed untuk mengeksekusi seeding
runSeed();
