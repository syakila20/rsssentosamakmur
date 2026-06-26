"use client";
import LinkBack from "@/Component/LinkBack/LinkBack";
import { motion, Variants } from "framer-motion";
const Page = () => {
  const contacts = [
    {
      title: "Instalasi Gawat Darurat (IGD)",
      description: "Layanan darurat medis 24 jam",
      phone: "(0761) 123456",
    },
    {
      title: "Ambulans",
      description: "Layanan ambulans dan evakuasi pasien",
      phone: "(0761) 123457",
    },
    {
      title: "Pendaftaran Pasien",
      description: "Informasi pendaftaran dan kunjungan pasien",
      phone: "(0761) 123458",
    },
    {
      title: "Informasi Rumah Sakit",
      description: "Informasi layanan dan fasilitas rumah sakit",
      phone: "(0761) 123459",
    },
    {
      title: "Customer Service",
      description: "Bantuan umum dan informasi pasien",
      phone: "(0761) 123460",
    },
  ];

  return (
    <main className="bg-linear-to-br from-fuchsia-50 to-teal-50 min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16"
        >
          <div className="absolute right-0 top-0 w-80 h-80 bg-linear-to-tr from-blue-400 to-teal-300 rounded-full blur-3xl opacity-30 -z-10" />
          <LinkBack
            title={
              <span className="inline-block text-sm px-4 py-1 border border-red-800/50 rounded-full text-red-800">
                Layanan Darurat
              </span>
            }
            linkTo="/"
          />

          <p className="mt-5 text-slate-600">
            Hubungi nomor berikut untuk mendapatkan bantuan cepat dari Rumah
            Sakit Sentosa Makmur.
          </p>
        </motion.div>

        <div className="space-y-5">
          {contacts.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition border-b border-dashed lg:pb-2 md:pb-2 xl:pb-2 pb-1 border-b-slate-400"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-slate-700">
                  {item.title}
                </h2>
                <p className="text-neutral-600 mb-4">{item?.description}</p>
              </div>

              <motion.a
                href={`tel:${item.phone}`}
                whileHover={{ x: 5 }}
                className="text-lg font-medium pl-2 text-blue-700 hover:underline flex items-center gap-2 cursor-pointer"
              >
                {item.phone}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
// <main className="min-h-screen bg-slate-50 px-6 py-40">
//   <div className="mx-auto max-w-3xl">
//     <div className="text-center">
//       <p className="">
//         Layanan Darurat
//       </p>

//       <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
//         Emergency Contact
//       </h1>

//       <p className="mt-5 text-slate-600">
//         Hubungi nomor berikut untuk mendapatkan bantuan cepat dari Rumah
//         Sakit Sentosa Makmur.
//       </p>
//     </div>

//     <div className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
//       {contacts.map((item) => (
//         <div
//           key={item.title}
//           className="flex flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between"
//         >
//           <div>
//             <h2 className="font-semibold text-slate-700">{item.title}</h2>

//             <p className="mt-1 text-sm text-slate-500">
//               {item.description}
//             </p>
//           </div>

//
//         </div>
//       ))}
//     </div>

//     <div className="mt-10 border-t border-slate-200 pt-8 text-center">
//       <p className="text-sm text-slate-500">
//         Layanan darurat tersedia selama 24 jam.
//       </p>

//       <p className="mt-2 text-sm font-medium text-slate-700">
//         Rumah Sakit Sentosa Makmur
//       </p>
//     </div>
//   </div>
// </main>
