"use client";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const handleOpenTab = () => {
    const url = "https://www.flaticon.com/free-icons/page-not-found";
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <section className="bg-linear-to-br from-fuchsia-50 to-teal-50 relative overflow-hidden py-4 h-screen flex justify-center items-center  ">
      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 flex-col">
        <div className="flex relative w-90 h-100">
          <Image
            onClick={handleOpenTab}
            src="/success.png"
            fill
            className="object-fill"
            alt="Page not found icons created by Roundicons Premium - Flaticon"
          />
        </div>
        <div className="text-center max-w-lg">
          <span className="text-zinc-800 text-center w-full text-1xl">
            We’re sorry, the page you are looking for could{" "}
            <span className="text-emerald-500 font-bold">not be found.</span>
          </span>

          <p className="mt-3 text-gray-500">
            It may have been moved or is no longer available.
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
    </section>
  );
}
