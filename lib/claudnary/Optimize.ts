const DEFAULT_TRANSFORM = ["f_auto", "q_auto"].join(",");

type OptimizeImageOptions = {
  width?: number;
  height?: number;
  quality?: number | "auto";
};

export function optimizeImage(url: string, options?: OptimizeImageOptions) {
  if (!url.includes("/image/upload/")) {
    return url;
  }

  const transforms = [
    "f_auto",

    options?.quality ? `q_${options.quality}` : "q_auto",
  ];

  if (options?.width) {
    transforms.push(`w_${options.width}`);
  }

  if (options?.height) {
    transforms.push(`h_${options.height}`);
  }

  const transform = transforms.join(",");

  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}

export function optimizeImageDefault(url: string) {
  if (!url.includes("/image/upload/")) {
    return url;
  }

  return url.replace("/image/upload/", `/image/upload/${DEFAULT_TRANSFORM}/`);
}
