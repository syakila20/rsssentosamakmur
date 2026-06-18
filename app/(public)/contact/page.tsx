"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
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
        <div className="absolute -top-40 -left-40 w-125 h-125 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Customer Care
        </motion.h1>

        <p className="text-center text-gray-600 mb-12">
          Kami siap membantu Anda 24/7 untuk kebutuhan informasi dan layanan.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="font-semibold text-blue-600 mb-2">Call Center</h2>
            <p className="text-gray-600">+62 812-0000-0000</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="font-semibold text-blue-600 mb-2">Email</h2>
            <p className="text-gray-600">support@hospital.com</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="font-semibold text-blue-600 mb-2">WhatsApp</h2>
            <p className="text-gray-600">Chat langsung dengan admin</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="font-semibold text-blue-600 mb-2">
              Jam Operasional
            </h2>
            <p className="text-gray-600">24 Jam Setiap Hari</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// export default function SmartMap() {
//   const lat = -0.947083;
//   const lng = 100.417181;

//   const [loaded, setLoaded] = useState(false);
//   const [openMap, setOpenMap] = useState(false);

//   const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

//   // ⚠️ kalau tidak pakai API key, ganti ke local image
//   const staticMap =
//     `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=800x400&markers=color:orange|${lat},${lng}`;

//   return (
//     <div className="relative w-full h-[320px] rounded-2xl overflow-hidden shadow-xl">
//       <AnimatePresence mode="wait">
//         {!openMap ? (
//           <motion.div
//             key="fake"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setOpenMap(true)}
//             className="relative w-full h-full cursor-pointer group"
//           >
//             {/* Skeleton */}
//             {!loaded && (
//               <div className="absolute inset-0 animate-pulse bg-gray-300" />
//             )}

//             {/* Map Image */}
//             <motion.div
//               initial={{ scale: 1 }}
//               whileHover={{ scale: 1.08 }}
//               transition={{ duration: 0.4 }}
//               className="w-full h-full"
//             >
//               <Image
//                 src={staticMap}
//                 alt="map"
//                 fill
//                 className={`object-cover transition duration-500 ${
//                   loaded ? "blur-0" : "blur-md scale-105"
//                 }`}
//                 onLoad={() => setLoaded(true)}
//               />
//             </motion.div>

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

//             {/* Center content */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//               <motion.div
//                 initial={{ y: 10, opacity: 0 }}
//                 whileHover={{ y: 0, opacity: 1 }}
//                 className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold shadow"
//               >
//                 📍 Buka Peta
//               </motion.div>
//             </div>

//             {/* Pulse marker */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//               <span className="relative flex h-4 w-4">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
//               </span>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.iframe
//             key="real"
//             src={mapUrl}
//             className="w-full h-full border-0"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
