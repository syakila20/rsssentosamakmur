"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";

import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

// ==============================
// HOSPITAL LOCATION
// ==============================

const hospital: [number, number] = [0.4512206939985392, 101.4482731309308];

// ==============================
// LOCATION HANDLER
// ==============================

function LocationHandler({
  setPosition,
}: {
  setPosition: (value: LatLng) => void;
}) {
  const map = useMapEvents({
    click() {
      map.locate();
    },

    locationfound(e) {
      setPosition(e.latlng);

      map.flyTo(e.latlng, 15, {
        duration: 2,
      });
    },
  });

  return null;
}

export default function LocationPage() {
  const [position, setPosition] = useState<LatLng | null>(null);

  // ==============================
  // ICONS
  // ==============================

  const hospitalIcon = useMemo(() => {
    return new L.Icon({
      iconUrl: "/favicon-32x32.png",
      iconSize: [34, 34],
    });
  }, []);

  const pulseIcon = useMemo(() => {
    return L.divIcon({
      className: "",
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-10 h-10 rounded-full bg-red-500/30 animate-ping"></div>
          <div class="w-5 h-5 rounded-full bg-red-600 border-4 border-white shadow-lg"></div>
        </div>
      `,
      iconSize: [40, 40],
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white mt-4">
      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-3xl animate-pulse" />

        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-emerald-600">
            Hospital Location
          </h1>

          <p className="mt-4 text-gray-500">
            Temukan lokasi rumah sakit kami dengan mudah.
          </p>
        </motion.div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-white/30 bg-white/70 shadow-2xl backdrop-blur-xl"
        >
          {/* TOP BAR */}
          <div className="flex items-center justify-between border-b bg-white/70 px-6 py-4 backdrop-blur-xl">
            <div>
              <h2 className="font-semibold text-gray-800">RS Sentosa Makmur</h2>

              <p className="text-sm text-gray-500">
                Live navigation & location map
              </p>
            </div>

            <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-600">
              Online
            </div>
          </div>

          {/* MAP */}
          <div className="h-[650px] w-full">
            <MapContainer
              center={hospital}
              zoom={14}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              {/* LOCATION DETECTOR */}
              <LocationHandler setPosition={setPosition} />

              {/* TILE */}
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* HOSPITAL */}
              <Marker position={hospital} icon={hospitalIcon}>
                <Popup closeButton={false}>
                  <div className="w-62.5">
                    <div className="flex items-center gap-3">
                      <img
                        src="/og.png"
                        className="h-12 w-12 rounded-xl object-cover"
                      />

                      <div>
                        <h2 className="font-bold text-blue-600">
                          RS Sentosa Makmur
                        </h2>

                        <p className="text-xs text-gray-500">
                          Rumah Sakit Utama
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      Jl. Bima No.1, Delima, Pekanbaru, Riau
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <span className="text-yellow-500">★★★★★</span>

                      <span className="font-semibold">4.8</span>

                      <span className="text-blue-600">(2.146 reviews)</span>
                    </div>

                    {position && (
                      <button
                        disabled={!position}
                        onClick={() => {
                          if (!position) return;

                          window.open(
                            `https://www.google.com/maps/dir/${position.lat},${position.lng}/${hospital[0]},${hospital[1]}`,
                            "_blank",
                          );
                        }}
                        className="cursor-pointer mt-4 flex w-full items-center justify-center rounded-xl bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        View Direction
                      </button>
                    )}

                    {!position && (
                      <p className="mt-4 text-xs text-gray-400">
                        Klik area map untuk mendeteksi lokasi Anda
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>

              {/* USER LOCATION */}
              {position && (
                <>
                  <Marker position={position} icon={pulseIcon} />

                  <Polyline
                    positions={[[position.lat, position.lng], hospital]}
                    pathOptions={{
                      color: "#2563eb",
                      weight: 5,
                      opacity: 0.7,
                    }}
                  />
                </>
              )}
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
