"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = ImageProps & {
  fallback?: string;
};

export default function SafeImage({
  src,
  fallback = "/og.png",
  alt,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string | typeof src>(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      placeholder="empty"
      sizes="
(max-width: 640px) 100vw,
(max-width: 1024px) 50vw,
25vw
"
      alt={alt}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
}
