import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctorBySlug,
  restoreDoctor,
  updateDoctor,
} from "./doctor.service";
import { CreateDoctorPayload, UpdateDoctorPayload } from "./type";

export async function createDoctorAction(payload: CreateDoctorPayload) {
  try {
    const doctor = await createDoctor(payload);

    return apiResponse(doctor, null, "Data dokter berhasil ditambahkan");
  } catch (error) {
    return apiErrorResponse(
      error instanceof Error ? error.message : "Terjadi kesalahan",
    );
  }
}

export async function updateDoctorAction(
  id: number,
  payload: UpdateDoctorPayload,
) {
  try {
    const doctor = await updateDoctor(id, payload);

    return apiResponse(doctor, null, "Data dokter berhasil diperbarui");
  } catch (error) {
    return apiErrorResponse(
      error instanceof Error ? error.message : "Terjadi kesalahan",
    );
  }
}

export async function getDoctorByIdAction(id: number) {
  return getDoctorById(id);
}

export async function getDoctorBySlugAction(slug: string) {
  return getDoctorBySlug(slug);
}

export async function deleteDoctorAction(id: number) {
  return deleteDoctor(id);
}

export async function restoreDoctorAction(id: number) {
  return restoreDoctor(id);
}
