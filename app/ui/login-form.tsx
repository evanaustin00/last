'use client';
import React from 'react';
import {inter} from '../ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline/index.js';
import { ArrowRightIcon } from '@heroicons/react/20/solid/index.js';
import { Button } from './button';
import { useState } from 'react';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const error = await localAuthenticate(formData);
    if (error) {
      setErrorMessage(error);
    } else {
      // Redirect to the dashboard page
      window.location.href = '/dashboard';
    }

    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="shadow-lg flex-1 rounded-lg bg-white px-6 pb-4 pt-8">
        <h1 className={`${inter.className} mb-3 text-4xl text-black text-center text-bold`}>
          Login
        </h1>
        <div className="w-full">
          <div>
            <label
              className="text-left mb-2 block text-L mx-auto w-1/2 font-medium text-gray-900"
              htmlFor="email"
            >
              Username
            </label>
            <div className="relative text-center mx-auto">
              <input
                className="peer block w-1/2 mx-auto rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                
              />
              {/* <AtSymbolIcon className="absolute left-3 top-10  h-5 w-5 text-gray-500" /> */}
             
            </div>
          </div>
          <div className="mt-4">
            <label
              className="text-left mb-2 block text-L mx-auto w-1/2 font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-1/2 mx-auto rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              {/* <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
        <LoginButton pending={pending} />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <a href="/CekXP" className="text-left mb-2 block text-L mx-auto w-1/2 font-medium text-black hover:text-green-300">Cek Xp?</a>
      </div>
      
    </form>
  );
}

function LoginButton({ pending }: { pending: boolean }) {
  return (
    <Button className="mt-6 w-1/2 peer block mx-auto py-3 text-l" disabled={pending} type="submit">
      Log in <ArrowRightIcon className="ml-auto h-6 w-6 text-black" />
    </Button>
  );
}

async function localAuthenticate(formData: FormData): Promise<string | null> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log("Authenticating", { email, password });

  // Simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check for user and password, and return the role
  if (email === 'owner@nextmail.com' && password === '123456') {
    // Owner role
    localStorage.setItem('role', 'owner');
    return null;
  } else if (email === 'pegawai@nextmail.com' && password === '123456') {
    // Employee role
    localStorage.setItem('role', 'pegawai');
    return null;
  } else {
    return 'Invalid email or password'; // Gagal login
  }
}

