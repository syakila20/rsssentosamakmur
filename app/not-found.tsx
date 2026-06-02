"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const handleOpenTab = () => {
    const url = "https://www.flaticon.com/free-icons/page-not-found";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-gradient-to-br from-fuchsia-50 to-teal-50 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full flex flex-col items-center text-center">
        <div className="relative w-60 h-60 md:w-75 md:h-75">
          <Image
            onClick={handleOpenTab}
            src="/success.png"
            fill
            priority
            sizes="(max-width: 768px) 320px, 384px"
            className="object-contain"
            alt="Halaman tidak ditemukan"
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-bold text-gray-700">
          Halaman Tidak Dapat Diakses
        </h1>

        <p className="mt-4 text-base text-gray-400 leading-relaxed max-w-xl">
          Mohon maaf, halaman yang Anda cari saat ini tidak tersedia.
          Kemungkinan halaman telah dipindahkan, diperbarui, atau sudah tidak
          lagi tersedia. Silakan gunakan menu di bawah untuk melanjutkan
          pencarian informasi dan layanan kesehatan yang Anda butuhkan.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-4 text-emerald-600 py-1.5 rounded-xl hover:bg-emerald-700 hover:text-white transition duration-300"
          >
            Back to Home
          </Link>

          <Link
            href="/doctor"
            className="px-4 text-emerald-600 py-1.5 rounded-xl hover:bg-emerald-700 hover:text-white transition duration-300"
          >
            Find Doctor
          </Link>

          <Link
            href="/blog"
            className="px-4 text-emerald-600 py-1.5 rounded-xl hover:bg-emerald-700 hover:text-white transition duration-300"
          >
            Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
