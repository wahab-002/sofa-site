import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sofas UK | Quality Sofas, Delivered | Your Sofa Co.",
  description:
    "Shop quality corner, 3-seater and 3+2 sofa sets with UK delivery and cash on delivery available.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body">
        <Header />
        <main className="max-w-5xl mx-auto px-6 py-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
