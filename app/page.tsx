import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <main
      className="flex min-h-screen flex-col p-6 bg-cover bg-bottom bg-origin-border"
      style={{ backgroundImage: "url('/zz.png')" }}
    >
      {/* Kontainer utama dengan tata letak fleksibel */}
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row md:gap-8">
        {/* Tambahkan konten sesuai kebutuhan di sini jika perlu */}
      </div>

      {/* Tombol Login dengan tampilan yang responsif */}
      <div className="mt-4 flex justify-center">
        <Link
          href="https://last-lime.vercel.app/login"
          className="gap-2 self-center rounded-lg px-6 py-3 bg-yellow-900 opacity-90 text-sm font-medium text-white transition-colors hover:bg-gray-500 md:text-base md:px-10"
        >
          <span>Login</span>
        </Link>
      </div>
    </main>
  );
}
