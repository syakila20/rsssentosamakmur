export default function UnderConstructionPage() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-fuchsia-50 to-teal-50">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
      linear-gradient(to right, #0f172a 1px, transparent 1px),
      linear-gradient(to bottom, #0f172a 1px, transparent 1px)
    `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-fuchsia-200 blur-3xl opacity-20" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-teal-200 blur-3xl opacity-20" />

      <div className="relative w-[90%] md:w-[85%] xl:w-[85%] mx-auto pt-10 pb-16">
        <main className="flex min-h-screen items-center justify-center">
          <div className="max-w-xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-teal-600">
              Rumah Sakit Sentosa Makmur
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-700 md:text-5xl">
              Website Sedang Dalam Pengembangan
            </h1>
            <p className="mt-6 text-base leading-7 text-slate-600">
              Kami sedang melakukan pengembangan dan peningkatan layanan digital
              untuk memberikan pengalaman yang lebih baik kepada pasien dan
              pengunjung. Silakan kunjungi kembali dalam waktu dekat.
            </p>
            <div className="mt-10 h-px w-full bg-slate-200" />
            <div className="mt-8 space-y-2 text-sm text-slate-500">
              <p>Untuk informasi lebih lanjut, silakan hubungi:</p>
              <p className="font-medium text-slate-700">
                Rumah Sakit Sentosa Makmur
              </p>
              <p>(0761) 123456</p> <p>info@rssentosamakmur.com</p>
            </div>
            <p className="mt-12 text-xs text-slate-400">
              © 2026 Rumah Sakit Sentosa Makmur. All rights reserved.
            </p>
          </div>
        </main>
      </div>
    </section>
  );
}
