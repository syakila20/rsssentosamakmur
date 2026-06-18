"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { http } from "@/lib/api/http";
import LinkBack from "@/Component/LinkBack/LinkBack";
import { Button } from "@/Component/Button/Button";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    await http.post("/api/auth/verify-otp", { code });

    router.push("/dashboard");
  }

  return (
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
        <input
          className="w-full border px-3 py-2 text-center tracking-widest text-emerald-700 rounded-md"
          placeholder="6 digit OTP"
          value={code}
          onChange={(e) => setCode(e.target.value)}
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
  );
}
