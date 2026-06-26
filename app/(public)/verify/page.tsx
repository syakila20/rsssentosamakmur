"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { http } from "@/lib/api/http";
import LinkBack from "@/Component/LinkBack/LinkBack";
import { Button } from "@/Component/Button/Button";
import { Description } from "@/Component/Typography/Typhography";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    await http.post("/api/auth/verify-otp", { code });

    router.push("/dashboard");
  }

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

      <div className="relative w-[90%] md:w-[85%] xl:w-[85%] mx-auto pt-3 pb-16">
        <div className="flex h-screen items-center justify-center">
          <form onSubmit={handleVerify} className="space-y-4 w-full max-w-md">
            <LinkBack
              title={
                <span className="inline-block text-sm px-4 py-1 border border-emerald-800/50 rounded-full text-emerald-800/50">
                  Verifikasi OTP
                </span>
              }
              linkTo="/login"
            />
            <Description>
              Demi menjaga keamanan data pasien dan pengguna, silakan masukkan
              kode OTP yang telah dikirim ke email Anda. Kode verifikasi ini
              berlaku selama 5 menit.
            </Description>
            <input
              className="h-10 w-full text-center rounded-md border bg-gray-100 px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
              placeholder="6 digit OTP"
              value={code}
              maxLength={6}
              onChange={(e) => setCode(e.target.value)}
              onKeyPress={(e) => {
                if (!/\d+/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />

            <Button
              onClick={handleVerify}
              variant="primary"
              size="md"
              className="w-full"
            >
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
