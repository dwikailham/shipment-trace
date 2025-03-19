import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from './providers'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shipment Trace",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className='relative w-full max-w-md min-h-screen mx-auto pt-5 pb-32'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
