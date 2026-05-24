import Navbar from "@/Component/Navbar/Navbar";
import Sidebar from "@/Component/Navbar/Sidebar";
import "./globals.css";
import FooterSection from "@/Component/Footer/Footer";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-linear-to-br from-fuchsia-50 to-teal-50">
        <Navbar />

        <main className="flex-1">{children}</main>
        <FooterSection />
      </body>
    </html>
  );
}
