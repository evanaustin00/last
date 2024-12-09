import { GlobeAltIcon } from '@heroicons/react/24/outline/index.js';
import { inter } from '../ui/fonts';
import React from 'react';
export default function AcmeLogo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p>
    </div>
  );
}
