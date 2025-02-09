import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainHeader from '@/components/nav/MainHeader';
import { ToastContainer } from 'react-toastify';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gestor de Ordenes y Pacientes',
  description: 'Gestor de Ordenes y Pacientes de Laboratorio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-200 h-screen flex flex-col`}>
        <MainHeader/>
        <main className="min-h-[calc(100vh-82px)] py-6">
          {children}
          <ToastContainer/>
        </main>
      </body>
    </html>
  );
}
