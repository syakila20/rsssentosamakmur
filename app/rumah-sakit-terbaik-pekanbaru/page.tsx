import { motion } from "framer-motion";
import type { Metadata } from "next";

const SITE_URL = "https://yourdomain.com";

export const metadata: Metadata = {
  title: "Rumah Sakit Terbaik di Pekanbaru 2026 | RS Sehat Riau",
  description:
    "Cari rumah sakit terbaik di Pekanbaru? Simak kriteria, fasilitas, layanan unggulan, dokter spesialis, dan alasan mengapa RS Sehat Riau menjadi pilihan masyarakat Riau.",
  alternates: {
    canonical: `${SITE_URL}/rumah-sakit-terbaik-pekanbaru`,
  },
};

export default function RumahSakitTerbaikPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Apa rumah sakit terbaik di Pekanbaru?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rumah sakit terbaik ditentukan berdasarkan akreditasi, kelengkapan dokter spesialis, fasilitas medis, serta kualitas pelayanan kepada pasien.",
        },
      },
      {
        "@type": "Question",
        name: "Bagaimana cara memilih rumah sakit yang bagus?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pastikan rumah sakit memiliki akreditasi resmi, fasilitas modern, dokter berpengalaman, serta lokasi yang mudah diakses.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah RS Sehat Riau menerima BPJS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ya, RS Sehat Riau melayani pasien BPJS sesuai ketentuan yang berlaku.",
        },
      },
    ],
  };

  const hospitalSchema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: "RS Sehat Riau",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Contoh No.123",
      addressLocality: "Pekanbaru",
      addressRegion: "Riau",
      addressCountry: "ID",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Provinsi Riau",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rumah Sakit Terbaik di Pekanbaru",
        item: `${SITE_URL}/rumah-sakit-terbaik-pekanbaru`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="relative min-h-screen bg-gray-50 overflow-hidden">
        {/* BACKGROUND GRID */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* SOFT BLOBS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* CONTENT WRAPPER */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 space-y-14 pt-40">
          {/* TITLE */}
          <header className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 leading-tight">
              Rumah Sakit Terbaik di Pekanbaru 2026
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              Mencari rumah sakit terbaik di Pekanbaru adalah keputusan penting
              bagi Anda dan keluarga. Kualitas layanan kesehatan, kompetensi
              dokter, fasilitas medis, hingga lokasi menjadi faktor utama dalam
              menentukan pilihan.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Artikel ini membahas kriteria rumah sakit terbaik di Pekanbaru
              serta alasan RS Sehat Riau menjadi salah satu pilihan utama
              masyarakat di Provinsi Riau.
            </p>
          </header>

          {/* SECTION 1 */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              Kriteria Rumah Sakit Terbaik di Pekanbaru
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Tidak semua rumah sakit memiliki standar layanan yang sama.
              Berikut beberapa indikator penting:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>Akreditasi nasional dari KARS</li>
              <li>Ketersediaan dokter spesialis lengkap</li>
              <li>UGD 24 jam dan fasilitas ICU</li>
              <li>Peralatan medis modern</li>
              <li>Pelayanan ramah dan profesional</li>
            </ul>

            <p className="text-gray-600 leading-relaxed">
              Rumah sakit dengan standar tersebut umumnya memberikan pelayanan
              yang lebih aman, cepat, dan optimal bagi pasien.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              Mengapa RS Sehat Riau Layak Dipertimbangkan
            </h2>

            <p className="text-gray-600 leading-relaxed">
              RS Sehat Riau hadir sebagai rumah sakit modern di Pekanbaru yang
              mengutamakan kualitas pelayanan dan keselamatan pasien.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Didukung oleh tim{" "}
              <a href="/dokter" className="text-blue-600 underline">
                dokter spesialis berpengalaman
              </a>
              , fasilitas medis lengkap, serta layanan rawat jalan dan rawat
              inap, rumah sakit ini terus berkembang untuk memenuhi kebutuhan
              kesehatan masyarakat.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Berbagai{" "}
              <a href="/layanan" className="text-blue-600 underline">
                layanan unggulan
              </a>{" "}
              tersedia mulai dari jantung, bedah, kandungan, anak, hingga
              medical check-up rutin.
            </p>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              Komitmen Edukasi Kesehatan
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Selain layanan medis, RS Sehat Riau juga aktif memberikan edukasi
              kesehatan melalui{" "}
              <a href="/blog" className="text-blue-600 underline">
                artikel medis terbaru
              </a>
              .
            </p>

            <p className="text-gray-600 leading-relaxed">
              Informasi kesehatan yang akurat membantu masyarakat memahami
              gejala penyakit, pencegahan, serta pentingnya pemeriksaan dini.
            </p>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              Lokasi Strategis di Pekanbaru
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Berlokasi di pusat Kota Pekanbaru, RS Sehat Riau mudah diakses
              dari berbagai wilayah di Provinsi Riau, termasuk kawasan perumahan
              dan pusat bisnis.
            </p>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Pertanyaan yang Sering Diajukan
            </h2>

            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-800">
                  Apa rumah sakit terbaik di Pekanbaru?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Rumah sakit terbaik ditentukan berdasarkan akreditasi,
                  fasilitas, dokter spesialis, dan kualitas layanan.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-gray-800">
                  Bagaimana cara memilih rumah sakit yang bagus?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Pilih rumah sakit dengan akreditasi resmi, dokter
                  berpengalaman, serta fasilitas lengkap.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-gray-800">
                  Apakah RS Sehat Riau menerima BPJS?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ya, melayani pasien BPJS sesuai regulasi yang berlaku.
                </p>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
