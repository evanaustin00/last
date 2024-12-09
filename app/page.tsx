import Link from 'next/link';
import React from 'react';
// import DKLogo from '@/public/logodk.png';

export default function Page() {
  return (
    <main
      className="flex min-h-screen flex-col p-6 bg-cover bg-bottom bg-origin-border"
      style={{ backgroundImage: "url('/zz.png')" }}
    >
      {/* <div className="flex items-center justify-center h-screen">
        <img src="/logodk.png" alt="DK Logo" className="w-32 rounded-full md:w-64" />
        </div> */}
      
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        {/* Tambahkan konten sesuai kebutuhan */}
      </div>
      <Link
              href="http://localhost:3000/login"
              className="gap-5 self-start rounded-lg px-10 mx-auto bg-yellow-900 opacity-80 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-500 md:text-base border-2 border-gray-50"
            >
              <span>Login</span>
            </Link>
    </main>
  );
}