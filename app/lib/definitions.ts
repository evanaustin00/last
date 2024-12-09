  // This file contains type definitions for your data.
  // It describes the shape of the data, and what data type each property should accept.
  // For simplicity of teaching, we're manually defining these types.
  // However, these types are generated automatically if you're using an ORM such as Prisma.
  export type User = {
    username: string;
    password: string;
    role: string;
  };
  export type Loyalitas = {
    id_loyalitas: string;
    tingkat: string;
    diskon: number;
      }

      export type LoyalitasForm = {
        id_loyalitas: string;
        tingkat: string;
        diskon: number;
          }

      export type LoyalitasField = {
        id_loyalitas: string;
        tingkat: 'bronze' | 'silver' | 'gold';
        diskon: number;
          }

  export type Pelanggan = {
    id_pelanggan: string;
    nama_pelanggan: string;
    alamat: string;
    no_hp: string;
    jumlah_xp: number;
    id_loyalitas: string;
    tingkat: 'bronze' | 'silver' | 'gold';
    diskon: number;
  };

  export type PelangganForm = {
    id_pelanggan: string;
    nama_pelanggan: string;
    alamat: string;
    no_hp: string;
    jumlah_xp: number;
    id_loyalitas: string;
    tingkat: 'bronze' | 'silver' | 'gold';
  };

  export type PelangganField = {
    id_pelanggan: string;
    nama_pelanggan: string;
    alamat: string;
    no_hp: string;
    jumlah_xp: number;
    id_loyalitas: string;
    tingkat: 'bronze' | 'silver' | 'gold';
    diskon : number; // Menambahkan tipe tingkat
  };

  

  export type PelangganTable = {
    id_pelanggan: string;
    nama_pelanggan: string;
    id_loyalitas: string;
    alamat: string;
    no_hp: string;
    jumlah_xp: number;
    tingkat: 'bronze' | 'silver' | 'gold';
  };

  export type Pegawai = {
    id_pegawai: string;
    nama_pegawai: string;
    no_hp: string;
    jumlah_penjualan: number;
  };

  export type PegawaiForm = {
    id_pegawai: string;
    nama_pegawai: string;
    no_hp: string;
    jumlah_penjualan: number;
  };

  export type PegawaiField = {
    id_pegawai: string;
    nama_pegawai: string;
    no_hp: string;
    jumlah_penjualan: number;
  };

  export type PegawaiTable = {
    id_pegawai: string;
    nama_pegawai: string;
    no_hp: string;
    jumlah_penjualan: number;
  };

  export type Transaksi_penjualan = {
    id_transaksi_penjualan: string;
    harga: number;
    tanggal_transaksi: string;
    id_pegawai: string;
    id_produk: string;
    nama_pegawai:string;
    nama_produk:string;
    nama_pelanggan: string;
    total_transaksi: number;
    diskon: number;
    quantity: number;
    jumlah_penjualan: number;
    tingkat: 'bronze' | 'silver' | 'gold';
  };

  export type Transaksi_penjualanTable = {
    id_transaksi_penjualan: string;
    id_pelanggan: string;
    harga: number;
    tanggal_transaksi: string;
    id_pegawai: string;
    nama_pegawai : string;
    nama_pelanggan: string;
    id_produk: string;
    nama_produk: string;
    total_transaksi: number;
    diskon: number;
    no_hp: string;
    quantity: number;
    harga_produk: number;
    id_loyalitas: string; 
  };

  export type Transaksi_PembelianTable = {
    id_transaksi_pembelian: string;
    total_harga: number;
    tanggal_pembelian: string;
    nama_supplier: string;
    nama_barang: string;
    jumlah_barang: number;
    harga_barang:number;
    id_stok : string;
  };




  export type latest_Transaksi_Penjualan = {
    id_transaksi_penjualan: string;
    nama_pelanggan: string;
    nama_produk: string;
    tanggal_transaksi: string;
    nama_pegawai: string;
    jumlah_penjualan: number;
    total_transaksi: number;
  };

  export type Transaksi_Pembelian = {
    id_transaksi_pembelian: string;
    total_harga: number;
    tanggal_pembelian: string;
    nama_supplier: string;
    nama_barang: string;
    jumlah_barang: number;
    id_stok : string;
  };

  // The database returns a number for amount, but we later format it to a string with the formatCurrency function
  // export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  //   amount: number;
  // };

  export type Produk = {
    id_produk: string;
    nama_produk: string;
    harga_produk: number;
  };

  export type ProdukForm = {
    id_produk: string;
    nama_produk: string;
    harga_produk: number;
  };

  export type ProdukTable = {
    id_produk: string;
    nama_produk: string;
    harga_produk: number;
  };

  export type ProdukField = {
    id_produk: string;
    nama_produk: string;
    harga_produk: number;
    quantity: number;
  };



  export type Stok = {
    id_stok: string;
    nama_barang: string;
    harga_barang: number;
    jumlah_barang: number;
  };

  export type StokForm = {
    id_stok: string;
    nama_barang: string;
    harga_barang: number;
    jumlah_barang: number;
  };

  export type transaksipenjualanForm = {
    id_transaksi_penjualan: string;
    id_pelanggan: string;
    harga: number;
    tanggal_transaksi: string;
    id_pegawai: string;
    nama_pegawai : string;
    nama_pelanggan: string;
    id_produk: string;
    nama_produk: string;
    total_transaksi: number;
    diskon: number;
    no_hp: string;
    quantity: number;
    harga_produk: number;
    id_loyalitas: string; 
    jumlah_penjualan: number;
    tingkat: 'bronze' | 'silver' | 'gold';
  }

  export type transaksiPembelianForm = {
    id_transaksi_pembelian: string;
    total_harga: number;
    tanggal_pembelian: string;
    nama_supplier: string;
    nama_barang: string;
    jumlah_barang: number;
    harga_barang:number;
    id_stok: string;
  };

  export type StokTable = {
    id_stok: string;
    nama_barang: string;
    harga_barang: number;
    jumlah_barang: number;
  };

  export type Detail_penjualan = {
    id_produk: string;
    id_transaksi_penjualan: string;
    total_transaksi: number;
    jumlah_produk: number;
    tanggal_transaksi:string;
  };

  export type Detail_penjualanTable = {
    id_produk: string;
    id_transaksi_penjualan: string;
    total_transaksi: number;
    tanggal_transaksi: string;

  };

  export type Detail_penjualanField = {
    id_produk: string;
    id_transaksi_penjualan: string;
    total_transaksi: number;
    jumlah_produk: number;
    id_pegawai: string;
    tanggal_transaksi: string;

  };

  export type Detail_pembelian = {
    id_transaksi_pembelian: string;
    id_stok: string;
    tanggal_pembelian: string;
    nama_supplier: string;
    nama_barang: string;
    jumlah_barang: number;
    total_harga: number;
    total_transaksi: number;
  };

  export type Detail_pembelianTable = {
    id_transaksi_pembelian: string;
    id_stok: string;
    total_harga: number;
    tanggal_pembelian: string;
    nama_supplier: string;

  };

  export type LatestTransaksiPenjualanRaw = Omit<latest_Transaksi_Penjualan, 'amount'> & {
    amount: number;
  };

  export type transaksipenjualanField = {
    id_transaksi_penjualan: string;
    id_pelanggan: string;
    harga: number;
    tanggal_transaksi: string;
    id_pegawai: string;
    nama_pegawai : string;
    nama_pelanggan: string;
    id_produk: string;
    nama_produk: string;
    total_transaksi: number;
    diskon: number;
    no_hp: string;
    quantity: number;
    jumlah_penjualan: number;
    tingkat: 'bronze' | 'silver' | 'gold';
    harga_produk: number;
    id_loyalitas: string;
  }



  export type Detail_pembelianField = {
    id_transaksi_pembelian: string;
    id_stok: string;
    total_transaksi: number;
  };

  export type transaksipembelianField = {
    id_transaksi_pembelian: string;
    id_stok:string;
    total_harga: number;
    tanggal_pembelian: string;
    nama_supplier: string;
    nama_barang: string;
    harga_barang: number;
    jumlah_barang: number;
  };

  export type StokField = {
    id_stok: string;
    nama_barang: string;
    harga_barang: number;
    jumlah_barang: number;
  }
