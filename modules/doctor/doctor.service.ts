import { requirePermission } from "@/lib/auth/require-permission";

import {
  createDoctorRepository,
  updateDoctorRepository,
  findDoctorByIdRepository,
  findDoctorBySlugRepository,
  deleteDoctorRepository,
  restoreDoctorRepository,
} from "./doctor.repository";

import { CreateDoctorPayload, UpdateDoctorPayload } from "./type";

export async function createDoctor(payload: CreateDoctorPayload) {
  await requirePermission("doctor.create");

  return createDoctorRepository(payload);
}

export async function updateDoctor(id: number, payload: UpdateDoctorPayload) {
  await requirePermission("doctor.update");

  return updateDoctorRepository(id, payload);
}

export async function getDoctorById(id: number) {
  await requirePermission("doctor.read");

  return findDoctorByIdRepository(id);
}

export async function getDoctorBySlug(slug: string) {
  await requirePermission("doctor.read");

  return findDoctorBySlugRepository(slug);
}

export async function deleteDoctor(id: number) {
  await requirePermission("doctor.delete");

  return deleteDoctorRepository(id);
}

export async function restoreDoctor(id: number) {
  await requirePermission("doctor.update");

  return restoreDoctorRepository(id);
}
