/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

export function useImagePreview(file: File | null, initialPreview?: string) {
  const [preview, setPreview] = useState<string | null>(initialPreview ?? null);

  useEffect(() => {
    if (!file) {
      setPreview(initialPreview ?? null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file, initialPreview]);

  return preview;
}
