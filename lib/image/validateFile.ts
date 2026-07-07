import { ALLOWED_IMAGE_TYPES, IUploadFile, MAX_IMAGE_SIZE } from "./type";

export function validateFile({
  file,
  maxSize = MAX_IMAGE_SIZE,
  allowedTypes = ALLOWED_IMAGE_TYPES,
}: IUploadFile) {
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Format file tidak didukung.");
  }

  if (file.size > maxSize) {
    throw new Error(
      `Ukuran file maksimal ${Math.round(maxSize / 1024 / 1024)} MB.`,
    );
  }

  return true;
}
