import { http } from "@/lib/api/http";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useSendOtp() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const submit = async (email: string) => {
    try {
      setIsLoading(true);
      setMessage(null);
      setError(false);

      const res = await http.post("/api/auth/send-otp", { email });

      if (!res.success) {
        setMessage(res?.message);
        setError(true);
        return res;
      }

      router.push("/verify");

      return res;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setMessage(message);

      return {
        success: false,
        message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submit,
    isLoading,
    error,
    setError,
  };
}
