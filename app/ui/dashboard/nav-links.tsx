'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BanknotesIcon,
  UsersIcon,
  NewspaperIcon,
  CubeIcon,
  BeakerIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Transaksi Penjualan', href: '/dashboard/transaksipenjualan', icon: BanknotesIcon },
  { name: 'Transaksi Pembelian', href: '/dashboard/transaksipembelian', icon: BanknotesIcon },
  { name: 'Produk', href: '/dashboard/produk', icon: BeakerIcon },
  { name: 'Stok', href: '/dashboard/stok', icon: CubeIcon },
  { name: 'Pelanggan', href: '/dashboard/pelanggan', icon: UsersIcon },
  { name: 'Pegawai', href: '/dashboard/pegawai', icon: UserGroupIcon },
  { name: 'Laporan', href: '/dashboard/laporan', icon: NewspaperIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Get the role from localStorage when the component mounts
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        // If the link is "Laporan" and the role is not 'owner', do not render the link
        if (link.name === 'Laporan' && role !== 'owner') {
          return null;
        }

        if (link.name === 'Laporan') {
          return (
            <div key={link.name} className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className={clsx(
                  'flex h-[48px] w-full items-center justify-between gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-300 hover:text-green-600 md:justify-start md:p-2 md:px-3 transform hover:scale-110 transition-transform',
                  { 'bg-slate-300 text-green-600': pathname.startsWith('/dashboard/laporan') }
                )}
              >
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-6" />
                  <p className="hidden md:block">Laporan</p>
                </div>
                <ChevronDownIcon className="w-4 h-4 ml-auto" />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 top-12 z-10 w-full rounded-md bg-white shadow-lg">
                  {role === 'pegawai' ? (
                    <p className="px-4 py-2 text-sm text-red-600">Akses ditolak: Anda tidak memiliki izin untuk mengakses halaman ini.</p>
                  ) : (
                    <>
                      <Link
                        href="/dashboard/detail_penjualan"
                        className={clsx(
                          'block px-4 py-2 text-sm hover:bg-slate-300 hover:text-green-600 transform hover:scale-110 transition-transform',
                          { 'bg-slate-300 text-green-600': pathname === '/dashboard/detail_penjualan' }
                        )}
                      >
                        Detail Penjualan
                      </Link>
                      <Link
                        href="/dashboard/detail_pembelian"
                        className={clsx(
                          'block px-4 py-2 text-sm hover:bg-slate-300 hover:text-green-600 transform hover:scale- 110 transition-transform',
                          { 'bg-slate-300 text-green-600': pathname === '/dashboard/detail_pembelian' }
                        )}
                      >
                        Detail Pembelian
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-300 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 transform hover:scale-110 transition-transform',
              {
                'bg-slate-300 text-green-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
} 