import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import QueryClientContextProvider from "./core/QueryClientContextProvider";
import "./globals.css";

import Sidebar from "./components/Sidebar";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Management",
  description: "Using tanstack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <main className="flex h-screen bg-gray-900 text-white overflow-hidden">
          <Sidebar />
          <div className="flex flex-col w-full p-4 relative overflow-auto">
            <QueryClientContextProvider><CustomProvider>{children}</CustomProvider></QueryClientContextProvider>
          </div>
        </main>
      </body>
    </html>
  );
}

