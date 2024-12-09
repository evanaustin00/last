// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    username: 'user1@nextmail.com',
    password: '123456',
    role:'admin'
  },
  {
    username: 'user2@nextmail.com',
  password: 'abcdef',
  role: 'user',
  }
 
];

const loyalitas = [
  {id_loyalitas: '1b9abb9f-8917-4e94-a6f8-daa3ebfa82c4',
  tingkat: 'bronze',
  diskon: 5},
  {id_loyalitas: '908b4ea2-ca0e-49d4-87e2-43d618385607',
    tingkat: 'silver',
    diskon: 10},
    {id_loyalitas: 'bf7e9379-459f-429f-8074-2cc01dfb3329',
      tingkat: 'Gold',
      diskon: 15},
  ]



const pegawai = [{
  id_pegawai: '4478b01d-1cf0-40e4-8905-140f8306c514',
  nama_pegawai: 'anton',
  no_hp: '0849281381',
  jumlah_penjualan: 13,
  username: 'owner',
  role:'owner'

},
{
  id_pegawai: 'c09b7884-9636-4429-b10b-d41f963b4139',
  nama_pegawai: 'joko',
  no_hp: '0831748383',
  jumlah_penjualan: 10 ,
  username: 'pegawai',
  role: 'pegawai',
  

},
{
  id_pegawai: '2dcd921b-0b2b-4361-92a0-28a755adb77b',
  nama_pegawai: 'bagus',
  no_hp: '0892818181',
  jumlah_penjualan: 11 ,
  username: 'pegawai',
    role: 'pegawai',
 

},
{
  id_pegawai: '8cf1bb4a-11de-4073-9dde-ee9c59579cba',
  nama_pegawai: 'sila',
  no_hp: '0839392911',
  jumlah_penjualan: 7 ,
  username: 'pegawai',
    role: 'pegawai',
  

},
{
  id_pegawai: '62432f25-5f38-4adc-8000-035207d571d8',
  nama_pegawai: 'fira',
  no_hp: '0831657474',
  jumlah_penjualan: 13 ,
  username: 'pegawai',
    role: 'pegawai',
  

},
{
  id_pegawai: 'c34644da-2268-4e60-9290-911ad181561f',
  nama_pegawai: 'cara',
  no_hp: '0839191912',
  jumlah_penjualan: 5 ,
  username: 'pegawai',
    role: 'pegawai',
  

},
{
  id_pegawai: 'c9f720eb-4bca-43e5-addb-14be4ddb5af8',
  nama_pegawai: 'pajo',
  no_hp: '0831674834',
  jumlah_penjualan: 2 ,
  username: 'pegawai',
    role: 'pegawai',
  

},
{
  id_pegawai: 'd6b4b828-d39f-42c1-aca0-6c3d02dc7596',
  nama_pegawai: 'mesi',
  no_hp: '0831294882',
  jumlah_penjualan: 4 ,
  username: 'pegawai',
    role: 'pegawai',
  

},
{
  id_pegawai: 'b78cadff-a94c-43ad-97ab-b4f5260bcc9d',
  nama_pegawai: 'cris',
  no_hp: '093183883',
  jumlah_penjualan: 8,
  username: 'pegawai',
    role: 'pegawai',
  

},
{
  id_pegawai: '099082fc-d54e-4e47-b657-ebff07adae7a',
  nama_pegawai: 'axel',
  no_hp: '08317371737',
  jumlah_penjualan: 5,
  username: 'pegawai',
    role: 'pegawai',

},
];

const transaksi_penjualan = [
  {id_transaksi_penjualan: '45c2f704-ffdb-4b08-b9d5-7ab2ce9c0cab',
    id_pelanggan: 'c131d693-4954-4173-80f3-6d6909be8c7d',
    tanggal_transaksi: '2023-10-01',
    id_pegawai: '4478b01d-1cf0-40e4-8905-140f8306c514',
    id_produk:'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    total_transaksi:50010
  },
  {id_transaksi_penjualan: '9b8770d4-5d5b-41d8-b19d-526e847e6654',
    id_pelanggan: 'e9441933-fe87-47b3-a265-ad6e53f3fc86',
    tanggal_transaksi: '2023-10-02',
    id_pegawai: 'c09b7884-9636-4429-b10b-d41f963b4139',
    id_produk:'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    total_transaksi:50009 
  },
  {id_transaksi_penjualan: '72a2dc1a-eaff-48fc-86d9-c77ca5d134fa',
    id_pelanggan: '43806692-0829-4e3e-b5f5-a954f75c307e',
    tanggal_transaksi: '2023-10-03',
    id_pegawai: '2dcd921b-0b2b-4361-92a0-28a755adb77b',
    id_produk:'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    total_transaksi:50008
  },
  {id_transaksi_penjualan: '1b1cc3e3-a5b9-4cb2-bfb6-f11640fb2faa',
    id_pelanggan: '1a22ec68-6ffc-440b-a439-26d5754428fb',
    tanggal_transaksi: '2023-10-04',
    id_pegawai: '8cf1bb4a-11de-4073-9dde-ee9c59579cba',
    id_produk:'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    total_transaksi:50007
  },
  {id_transaksi_penjualan: '4e0b63a0-76b8-408f-9b2e-05ec4230e4d0',
    id_pelanggan: '68eb45c0-94b4-4512-aa86-17f66ea30d0d',
    tanggal_transaksi: '2023-10-05',
    id_pegawai: '62432f25-5f38-4adc-8000-035207d571d8',
    id_produk:'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    total_transaksi:50006
  },
  {id_transaksi_penjualan: 'f6e63384-a0d4-4fd9-a2ea-73f53ea6f141',
    id_pelanggan: 'd940f782-fc8e-42ea-90e3-acfb92f3e06d',
    tanggal_transaksi: '2023-10-06',
    id_pegawai: 'c34644da-2268-4e60-9290-911ad181561f',
    id_produk:'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    total_transaksi:50005
  },
  {id_transaksi_penjualan: '932087f9-eadf-4b1f-93e9-d33c8bde373e',
    id_pelanggan: 'd1939e14-9b19-4f8d-ba53-af5533d0d49a',
    tanggal_transaksi: '2023-10-07',
    id_pegawai: 'c9f720eb-4bca-43e5-addb-14be4ddb5af8',
    id_produk:'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    total_transaksi:50004
  },
  {id_transaksi_penjualan: 'e6582f8f-f17d-4327-b201-fd6f646476ca',
    id_pelanggan: '97c9f2cb-70a2-4ad9-94f9-9679ae9cc3a4',
    tanggal_transaksi: '2023-10-08',
    id_pegawai: 'd6b4b828-d39f-42c1-aca0-6c3d02dc7596',
    id_produk:'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    total_transaksi:50003
  },
  {id_transaksi_penjualan: '302e1d92-8729-4c1c-9dab-053949c2fe75',
    id_pelanggan: 'aae326c9-0440-456f-8d2f-acce4ab5add3',
    harga: 45000,
    tanggal_transaksi: '2023-10-09',
    id_pegawai: 'b78cadff-a94c-43ad-97ab-b4f5260bcc9d',
    id_produk:'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    total_transaksi:50002
  },
  {id_transaksi_penjualan: 'b91ba6c6-ddc7-4429-9534-188323b346d3',
    id_pelanggan: '90c10c6f-7681-4cc6-9aa2-0f992c43572e',
    harga: 55000,
    tanggal_transaksi: '2023-10-10',
    id_pegawai: '099082fc-d54e-4e47-b657-ebff07adae7a',
    id_produk:'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    total_transaksi:50001
  },
];

const transaksi_pembelian = [{
  id_transaksi_pembelian: 'f9a64026-443e-4359-b83c-61d093c42f47',
  total_harga: 400000,
  tanggal_pembelian: '2023-10-01',
  nama_supplier: 'supplier a',
  nama_barang: 'SKM',
  id_stok:'695af83d-e158-423a-ad9d-60e1903eb558'

},
{
  id_transaksi_pembelian: 'b562fbb0-fa8a-4452-995e-b7ee8596488a',
  total_harga: 300000,
  tanggal_pembelian: '2023-10-01',
  nama_supplier: 'supplier b',
  nama_barang: 'kopi arabica',
  id_stok:'eba841c5-88f8-464d-9486-54bf0d5058e5'
},
{
  id_transaksi_pembelian: '5dfe49a6-516b-48d7-86db-810f3bf9900f',
  total_harga: 250000,
  tanggal_pembelian: '2023-10-03',
  nama_supplier: 'supplier c',
  nama_barang: 'kopi robusta',
  id_stok:'eaf33d32-7539-4378-92ad-5a7d0713e974'
},
{
  id_transaksi_pembelian: '31bc2fb2-79e0-4423-b54b-1285c812087c',
  total_harga: 500000,
  tanggal_pembelian: '2023-10-04',
  nama_supplier: 'supplier a',
  nama_barang: 'telur',
  id_stok:'a6d2401b-0aaf-4df5-93db-eabc7e3ac571'
},
{
  id_transaksi_pembelian: '01d8789c-63fd-43fa-a627-2ebf24a6524f',
  total_harga: 375000,
  tanggal_pembelian: '2023-10-05',
  nama_supplier: 'supplier d',
  nama_barang: 'beras',
  id_stok:'7c2496f2-7808-44ac-ad72-2a2eade76339'
},
{
  id_transaksi_pembelian: '4f622188-a6b1-40db-82ae-231077c85acc',
  total_harga: 1200000,
  tanggal_pembelian: '2023-10-06',
  nama_supplier: 'supplier b',
  nama_barang: 'minyak goreng',
  id_stok:'f3157cdd-49d2-4a23-a821-388d94fb78ad'
},
{
  id_transaksi_pembelian: '3670725d-7123-431e-b4db-7b9f1c0bd005',
  tanggal_pembelian: '2023-10-07',
  nama_supplier: 'supplier c',
  nama_barang: 'ayam',
  id_stok:'8d6521c7-bdae-4789-b956-657b6429e869'
},
{
  id_transaksi_pembelian: '236bdefc-f60c-4a37-9f0b-94022f2e5967',
  total_harga: 300000,
  tanggal_pembelian: '2023-10-08',
  nama_supplier: 'supplier a',
  nama_barang: 'sapi',
  id_stok:'65a49b44-2dbe-4c6f-ab77-bcf704e891ec'
},
{
  id_transaksi_pembelian: '6c729467-6704-4445-83f8-38149c77d21b',
  total_harga: 225000,
  tanggal_pembelian: '2023-10-09',
  nama_supplier: 'supplier d',
  nama_barang: 'garam',
  id_stok:'26f48298-9665-4197-ae72-ebf9cd99d0ac'
},
{
  id_transaksi_pembelian: 'c540284a-6ff4-4c2f-a43a-0b87ba20d043',
  total_harga: 125000,
  tanggal_pembelian: '2023-10-10',
  nama_supplier: 'supplier b',
  nama_barang: 'micin',
  id_stok:'b2aa5542-1dec-4d18-9555-00ece60c2662'
},
];

const pelanggan = [{
  id_pelanggan: 'c131d693-4954-4173-80f3-6d6909be8c7d',
  nama_pelanggan: 'alvin',
  alamat: 'tb',
  no_hp: '08318383838',
  jumlah_xp: 9000,
  id_loyalitas: '1b9abb9f-8917-4e94-a6f8-daa3ebfa82c4',
  tingkat: 'bronze'  
},
{
  id_pelanggan: 'e9441933-fe87-47b3-a265-ad6e53f3fc86',
  nama_pelanggan: 'jesi',
  alamat: 'bb',
  no_hp: '08128218111',
  jumlah_xp: 8500,
  id_loyalitas: '1b9abb9f-8917-4e94-a6f8-daa3ebfa82c4',
  tingkat:  'bronze' 
},
{
  id_pelanggan: '43806692-0829-4e3e-b5f5-a954f75c307e',
  nama_pelanggan: 'hana',
  alamat: 'seturan',
  no_hp: '08491921822',
  jumlah_xp: 7000,
  id_loyalitas: '1b9abb9f-8917-4e94-a6f8-daa3ebfa82c4',
  tingkat:  'bronze' 
},
{
  id_pelanggan: '1a22ec68-6ffc-440b-a439-26d5754428fb',
  nama_pelanggan: 'siska',
  alamat: 'maguwo',
  no_hp: '08319844774',
  jumlah_xp: 10000,
  id_loyalitas: '1b9abb9f-8917-4e94-a6f8-daa3ebfa82c4',
  tingkat: 'bronze' 
},
{
  id_pelanggan: '68eb45c0-94b4-4512-aa86-17f66ea30d0d',
  nama_pelanggan: 'mona',
  alamat: 'gamping',
  no_hp: '08532828282',
  jumlah_xp: 55000,
  id_loyalitas: '908b4ea2-ca0e-49d4-87e2-43d618385607',
  tingkat: 'silver' 
},
{
  id_pelanggan: 'd940f782-fc8e-42ea-90e3-acfb92f3e06d',
  nama_pelanggan: 'engki',
  alamat: 'nolo',
  no_hp: '08528719273',
  jumlah_xp: 73000,
  id_loyalitas: '908b4ea2-ca0e-49d4-87e2-43d618385607',
  tingkat: 'silver' 
},
{
  id_pelanggan: 'd1939e14-9b19-4f8d-ba53-af5533d0d49a',
  nama_pelanggan: 'evan',
  alamat: 'kledo',
  no_hp: '08756172882',
  jumlah_xp: 76000,
  id_loyalitas: '908b4ea2-ca0e-49d4-87e2-43d618385607',
  tingkat: 'silver' 
},
{
  id_pelanggan: '97c9f2cb-70a2-4ad9-94f9-9679ae9cc3a4',
  nama_pelanggan: 'felix',
  alamat: 'perum',
  no_hp: '08471823721',
  jumlah_xp: 198000,
  id_loyalitas: 'bf7e9379-459f-429f-8074-2cc01dfb3329',
  tingkat:  'gold' 
},
{
  id_pelanggan: 'aae326c9-0440-456f-8d2f-acce4ab5add3',
  nama_pelanggan: 'jesi',
  alamat: 'mrican',
  no_hp: '0847461717',
  jumlah_xp: 100000,
  id_loyalitas: 'bf7e9379-459f-429f-8074-2cc01dfb3329',
  tingkat: 'gold'
},
{
  id_pelanggan: '90c10c6f-7681-4cc6-9aa2-0f992c43572e',
  nama_pelanggan: 'fazal',
  alamat: 'adisup',
  no_hp: '08498481828',
  jumlah_xp: 158000,
  id_loyalitas: 'bf7e9379-459f-429f-8074-2cc01dfb3329',
  tingkat:  'gold' 
},
];

const stok = [
  {
    id_stok: '695af83d-e158-423a-ad9d-60e1903eb558',
    nama_barang: 'SKM',
    harga_barang: 20000,
    jumlah_barang: 20,
  },
  {
    id_stok: 'eba841c5-88f8-464d-9486-54bf0d5058e5',
    nama_barang: 'Kopi Arabica',
    harga_barang: 15000,
    jumlah_barang: 10,
  },
  {
    id_stok: 'eaf33d32-7539-4378-92ad-5a7d0713e974',
    nama_barang: 'Kopi Robusta',
    harga_barang: 50000,
    jumlah_barang: 5,
  },
  {
    id_stok: 'a6d2401b-0aaf-4df5-93db-eabc7e3ac571',
    nama_barang: 'Telur',
    harga_barang: 100000,
    jumlah_barang: 5,
  },
  {
    id_stok: '7c2496f2-7808-44ac-ad72-2a2eade76339',
    nama_barang: 'Beras',
    harga_barang: 75000,
    jumlah_barang: 5,
  },
  {
    id_stok: 'f3157cdd-49d2-4a23-a821-388d94fb78ad',
    nama_barang: 'Minyak Goreng',
    harga_barang: 60000,
    jumlah_barang: 5,
  },
  {
    id_stok: '8d6521c7-bdae-4789-b956-657b6429e869',
    nama_barang: 'Ayam',
    harga_barang: 45000,
    jumlah_barang: 5,
  },
  {
    id_stok: '65a49b44-2dbe-4c6f-ab77-bcf704e891ec',
    nama_barang: 'Sapi',
    harga_barang: 25000,
    jumlah_barang: 5,
  },
  {
    id_stok: '26f48298-9665-4197-ae72-ebf9cd99d0ac',
    nama_barang: 'Garam',
    harga_barang: 30000,
    jumlah_barang: 10,
  },
  {
    id_stok: 'b2aa5542-1dec-4d18-9555-00ece60c2662',
    nama_barang: 'Micin',
    harga_barang: 10000,
    jumlah_barang: 15,
  }
];





const produk = [
  {
    id_produk: '0348ac4e-800f-417c-a973-cd5035efbc66',
    nama_produk: 'Americano',
    harga_produk: 25000,
  },
  {
    id_produk: '814639b4-3817-49df-ba20-3f904dd18c9d',
    nama_produk: 'Affogato',
    harga_produk: 30000,
  },
  {
    id_produk: 'df20fd5b-e310-44db-aa22-f0b16487f286',
    nama_produk: 'savana',
    harga_produk: 15000,
  },
  {
    id_produk: '235eadc0-a086-4691-8996-69f0b3e25c78',
    nama_produk: 'mie ayam',
    harga_produk: 50000,
  },
  {
    id_produk: 'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    nama_produk: 'nasi goreng ayam',
    harga_produk: 20000,
  },
  {
    id_produk: 'f245d858-8b82-4571-bace-510ce58a8ae3',
    nama_produk: 'nasi goreng sapi',
    harga_produk: 40000,
  },
  {
    id_produk: '6d89b776-ee34-4253-892d-98bfb37a363a',
    nama_produk: 'butterscoth',
    harga_produk: 10000,
  },
  {
    id_produk: '321c3a06-14e6-4cab-b378-a224d9da1638',
    nama_produk: 'kopi susu',
    harga_produk: 35000,
  },
  {
    id_produk: '5c1b882c-9c0b-4138-8442-00d6a20a90ed',
    nama_produk: 'espresso',
    harga_produk: 45000,
  },
  {
    id_produk: 'd7cbbd08-1903-4ce1-ac95-45600b26baa9',
    nama_produk: 'kopi rum',
    harga_produk: 55000,
  },
  ];

const detail_pembelian = [
  {
    id_transaksi_pembelian:'f9a64026-443e-4359-b83c-61d093c42f47',
    id_stok:'695af83d-e158-423a-ad9d-60e1903eb558',
    total_transaksi:400000,
    jumlah_barang:20
  },
  {
    id_transaksi_pembelian:'b562fbb0-fa8a-4452-995e-b7ee8596488a',
    id_stok:'eba841c5-88f8-464d-9486-54bf0d5058e5',
    total_transaksi:300000,
    jumlah_barang:10
  },
  {
    id_transaksi_pembelian:'5dfe49a6-516b-48d7-86db-810f3bf9900f',
    id_stok:'eaf33d32-7539-4378-92ad-5a7d0713e974',
    total_transaksi:2500000,
    jumlah_barang:5
  },
  {
    id_transaksi_pembelian:'31bc2fb2-79e0-4423-b54b-1285c812087c',
    id_stok:'a6d2401b-0aaf-4df5-93db-eabc7e3ac571',
    total_transaksi:500000,
    jumlah_barang:5
  },
  {
    id_transaksi_pembelian:'01d8789c-63fd-43fa-a627-2ebf24a6524f',
    id_stok:'7c2496f2-7808-44ac-ad72-2a2eade76339',
    total_transaksi:3750000,
    jumlah_barang:5
  },
  {
    id_transaksi_pembelian:'4f622188-a6b1-40db-82ae-231077c85acc',
    id_stok:'f3157cdd-49d2-4a23-a821-388d94fb78ad',
    total_transaksi:1200000,
    jumlah_barang:5
  },
  {
    id_transaksi_pembelian:'3670725d-7123-431e-b4db-7b9f1c0bd005',
    id_stok:'8d6521c7-bdae-4789-b956-657b6429e869',
    total_transaksi:150000,
    jumlah_barang:5
  },
  {
    id_transaksi_pembelian:'236bdefc-f60c-4a37-9f0b-94022f2e5967',
    id_stok:'65a49b44-2dbe-4c6f-ab77-bcf704e891ec',
    total_transaksi:300000,
    jumlah_barang:5
  },
  {
    id_transaksi_pembelian:'6c729467-6704-4445-83f8-38149c77d21b',
    id_stok:'26f48298-9665-4197-ae72-ebf9cd99d0ac',
    total_transaksi:225000,
    jumlah_barang:10
  },
  {
    id_transaksi_pembelian:'c540284a-6ff4-4c2f-a43a-0b87ba20d043',
    id_stok:'b2aa5542-1dec-4d18-9555-00ece60c2662',
    total_transaksi:125000,
    jumlah_barang:15
  },
];

const detail_penjualan = [
  {id_produk: '0348ac4e-800f-417c-a973-cd5035efbc66',
    id_transaksi_penjualan: '45c2f704-ffdb-4b08-b9d5-7ab2ce9c0cab',
    total_transaksi: 50000,
    jumlah_produk: 100,
  },
  {id_produk: '814639b4-3817-49df-ba20-3f904dd18c9d',
    id_transaksi_penjualan: '9b8770d4-5d5b-41d8-b19d-526e847e6654',
    total_transaksi: 60000,
    jumlah_produk: 150,
  },
  {id_produk: 'df20fd5b-e310-44db-aa22-f0b16487f286',
    id_transaksi_penjualan: '72a2dc1a-eaff-48fc-86d9-c77ca5d134fa',
    total_transaksi: 450000,
    jumlah_produk: 200,
     },
  {id_produk: '235eadc0-a086-4691-8996-69f0b3e25c78',
    id_transaksi_penjualan: '1b1cc3e3-a5b9-4cb2-bfb6-f11640fb2faa',
    total_transaksi: 100000,
    jumlah_produk: 120,
  },
  {id_produk: 'f6d880d2-3b58-46ff-bd14-cd3fd6165d83',
    id_transaksi_penjualan: '4e0b63a0-76b8-408f-9b2e-05ec4230e4d0',
    total_transaksi: 40000,
    jumlah_produk: 130,
  },
  {id_produk: 'f245d858-8b82-4571-bace-510ce58a8ae3',
    id_transaksi_penjualan: 'f6e63384-a0d4-4fd9-a2ea-73f53ea6f141',
    total_transaksi: 80000,
    jumlah_produk: 90,
  },
  {id_produk: '6d89b776-ee34-4253-892d-98bfb37a363a',
    id_transaksi_penjualan: '932087f9-eadf-4b1f-93e9-d33c8bde373e',
    total_transaksi: 30000,
    jumlah_produk: 200,
  },
  {id_produk: '321c3a06-14e6-4cab-b378-a224d9da1638',
    id_transaksi_penjualan: 'e6582f8f-f17d-4327-b201-fd6f646476ca',
    total_transaksi: 70000,
    jumlah_produk: 80,
  },
  {id_produk: '5c1b882c-9c0b-4138-8442-00d6a20a90ed',
    id_transaksi_penjualan: '302e1d92-8729-4c1c-9dab-053949c2fe75',
    total_transaksi: 90000,
    jumlah_produk: 50,
  },
  {id_produk: 'd7cbbd08-1903-4ce1-ac95-45600b26baa9',
    id_transaksi_penjualan: 'b91ba6c6-ddc7-4429-9534-188323b346d3',
    total_transaksi: 110000,
    jumlah_produk: 70,
  },
];





export { users, pelanggan, pegawai, stok, produk, transaksi_pembelian, transaksi_penjualan, detail_pembelian, detail_penjualan, loyalitas };
