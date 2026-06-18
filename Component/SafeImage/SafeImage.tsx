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
      src={imgSrc || "/og.png"}
      placeholder="empty"
      quality={75}
      alt={alt}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
}
