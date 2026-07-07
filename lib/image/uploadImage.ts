import { uploadToCloudinary } from "@/lib/api/uploadImage";

import { validateFile } from "./validateFile";
import { IUploadFile } from "./type";

export async function uploadFile({ file, maxSize, allowedTypes }: IUploadFile) {
  validateFile({
    file,
    maxSize,
    allowedTypes,
  });

  return uploadToCloudinary(file);
}
