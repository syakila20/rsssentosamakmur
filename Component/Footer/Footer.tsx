export default function FooterSection() {
  return (
    <footer
      className="bg-slate-50 border-t pt-2.5 border-slate-100 text-slate-700
    "
    >
      <div className="relative overflow-hidden md:w-[85%] xl:w-[85%] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              RS SENTOSA MAKMUR
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              Memberikan pelayanan kesehatan yang aman, profesional, dan
              berorientasi pada keselamatan pasien.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Layanan
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Rawat Jalan",
                "Rawat Inap",
                "Imunisasi Center",
                "IGD 24 Jam",
                "Laboratorium",
                "Farmasi",
              ]?.map((x, idx) => (
                <li key={idx}>{x}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Informasi
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Pendaftaran Online",
                "Jadwal Dokter",
                "BPJS Kesehatan",
                "Hak & Kewajiban Pasien",
              ]?.map((x, idx) => (
                <li key={idx}>{x}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Hubungi Kami
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>📍 Jl. Kesehatan No. 10, Jakarta</li>
              <li>☎️ (021) 1234 5678</li>
              <li>✉️ info@rssehatsentosa.id</li>
              <li className="mt-3 text-xs text-slate-500">
                IGD & Ambulans 24 Jam
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} RS SENTOSA MAKMUR. Seluruh hak cipta
            dilindungi.
          </p>
          <p className="mt-2 md:mt-0">Terintegrasi SATUSEHAT Kemenkes</p>
        </div>
      </div>
    </footer>
  );
}
