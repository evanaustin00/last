import Link from 'next/link';
import NavLinks from '../../ui/dashboard/nav-links';
import PowerIcon from '@heroicons/react/24/outline/PowerIcon.js';
import { signOut } from '../../../auth';
import React from 'react';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-green-100 px-3 py-4 md:px-2">
      <Link
        href="/"
        className="mb-4 flex h-20 flex-col items-center justify-center rounded-md bg-green-300 p-4 md:h-40 transition-all duration-300"
      >
        {/* Logo DK */}
        <img
          src="/logodk.png"
          alt="DK Logo"
          className="w-24 h-24 md:w-30 md:h-30 rounded-full"
        />
        <div className="text-lg mt-2 font-bold text-white">Dkonkrit</div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-4">
        <NavLinks />
        <div className="hidden md:block w-full h-auto grow bg-green-100"></div>

        {/* Sign Out Section */}
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <Link href="/login" passHref>
            <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-green-50 p-3 text-sm font-medium text-green-700 hover:bg-green-200 hover:text-green-600 transition duration-300 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6 text-green-600" />
              <div className="hidden md:block text-slate-700">Sign Out</div>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
