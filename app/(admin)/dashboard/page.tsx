import { requireAuth } from "@/lib/auth/require-auth";
import NavbarLogout from "./Navbar";
import StatCard from "./Components/StateCard";
import { formatDate } from "@/lib/helperDate";
import {
  Caption,
  CardTitle,
  Description,
  Label,
  PageTitle,
  SectionTitle,
} from "@/Component/Typography/Typhography";

export default async function Dashboard() {
  const user = await requireAuth();
  console.log("??user", { user });
  return (
    <section className="space-y-6">
      <div className="flex flex-col">
        <PageTitle>Selamat datang kembali, {user?.name}</PageTitle>
        <Description className="mt-2">
          {formatDate(new Date(), "full")}
        </Description>
      </div>
    </section>
  );
}
// <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
//         <div className="flex items-start gap-4">
//           <div className="h-12 w-1 rounded-full bg-gradient-to-b from-fuchsia-500 to-emerald-500" />

//           <div>
//             <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
//               Dashboard Rumah Sakit
//             </span>

//             <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-800">
//               Selamat Datang, Dr. Ahmad Fauzi
//             </h1>

//             <p className="mt-3 max-w-3xl text-slate-500 leading-relaxed">
//               Kelola data pasien, dokter, jadwal praktik, artikel kesehatan, dan
//               layanan rumah sakit melalui dashboard administrasi.
//             </p>

//
//           </div>
//         </div>
//       </div>

//       {/* Statistics */}
//       <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
//         <StatCard title="Pasien Hari Ini" value={124} color="emerald" />

//         <StatCard title="Dokter Bertugas" value={18} color="blue" />

//         <StatCard title="Janji Temu" value={56} color="amber" />

//         <StatCard title="Artikel Aktif" value={32} color="fuchsia" />
//       </div>
