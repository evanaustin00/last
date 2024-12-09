'use client';
import LoginForm from '../../app/ui/login-form';
import React from 'react';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen w-full bg-gradient-to-b from-green-400 to-green-200">
      <div className="relative flex w-full h-full flex-col space-y-6 p-12 rounded-lg shadow-2xl bg-white overflow-hidden">
        
        {/* Logo and Doodle Section */}
        <div className="flex items-center justify-center h-1/3 w-full bg-green-600 p-8 rounded-lg relative shadow-md">
          <div className="w-32 md:w-48">
            {/* Menghapus border dan latar belakang putih */}
            <div className="relative z-10 rounded-full bg-transparent p-0">
              <img src="/logodk.png" alt="DK Logo" className="w-full rounded-full" />
            </div>
          </div>
          <img src="/doodlee.png" alt="Doodle" className="absolute bottom-0 left-0 w-full h-auto opacity-40" />
        </div>

        {/* Welcome Text */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-green-700">Welcome Back to Dkonkrit!</h1>
          <p className="text-xl text-gray-600">Sign in to Continue!.</p>
        </div>

        {/* Login Form Section */}
        <div className="w-full bg-green-50 p-12 rounded-lg shadow-md">
          <LoginForm />
        </div>
        
      </div>
    </main>
  );
}
