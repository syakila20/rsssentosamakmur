"use client";

import { Button } from "@/Component/Button/Button";
import Loading from "@/Component/Loading/Loading";
import { http } from "@/lib/api/http";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSendOtp } from "./hooks/useSendOtp";
import Modal from "@/Component/Modal/Modal";

export const PageLogin = () => {
  const [email, setEmail] = useState<string>("");
  const sendOtp = useSendOtp();
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

      <div className="relative w-[90%] md:w-[85%] xl:w-[85%] mx-auto pt-35 pb-16">
        <Modal
          widthModal="xs"
          isOpen={sendOtp?.error}
          title={`Gagal Mengirim Nomor OTP`}
          onClose={() => sendOtp?.setError(false)}
        >
          <p className="text-base text-red-600">Gagal Kirim OTP</p>
        </Modal>
        <div className="mx-auto max-w-xl">
          <div className="mb-8 space-y-3">
            <p className="text-xl font-semibold text-slate-700">
              Masuk ke Sistem
            </p>

            <p className="text-slate-500">
              Masukkan alamat email Anda untuk menerima kode verifikasi dan
              mengakses Sistem Informasi Rumah Sakit.
            </p>
          </div>

          <form className="w-full">
            <div className="mb-10 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@domain.co.id"
                  value={email}
                  onChange={(val) => setEmail(val?.target?.value)}
                  className="h-10 w-full rounded-md border bg-gray-100 px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                />
              </div>

              <Button
                onClick={() => sendOtp?.submit(email)}
                variant="primary"
                size="md"
                className="w-full"
                loading={sendOtp?.isLoading}
                disabled={!email}
              >
                Kirim Kode Verifikasi
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
