/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { PERMISSIONS } from "../config/permission";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const tags = [
    { name: "Imunisasi", slug: "imunisasi" },
    { name: "Vaksin", slug: "vaksin" },
    { name: "Demam", slug: "demam" },
    { name: "Batuk & Flu", slug: "batuk-flu" },
    { name: "Diabetes", slug: "diabetes" },
    { name: "Hipertensi", slug: "hipertensi" },
    { name: "Vitamin", slug: "vitamin" },
    { name: "ASI", slug: "asi" },
    { name: "Tumbuh Kembang", slug: "tumbuh-kembang" },
    { name: "Kesehatan Mental", slug: "mental-health" },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }
  const categories = [
    {
      name: "Kesehatan Anak",
      slug: "kesehatan-anak",
    },
    {
      name: "Kesehatan Ibu & Kehamilan",
      slug: "kesehatan-ibu-kehamilan",
    },
    {
      name: "Penyakit & Kondisi Medis",
      slug: "penyakit-kondisi-medis",
    },
    {
      name: "Obat & Pengobatan",
      slug: "obat-pengobatan",
    },
    {
      name: "Gaya Hidup Sehat",
      slug: "gaya-hidup-sehat",
    },
    {
      name: "Nutrisi & Makanan",
      slug: "nutrisi-makanan",
    },
    {
      name: "Kesehatan Mental",
      slug: "kesehatan-mental",
    },
  ];
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  // permissions
  for (const p of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { name: p },
      update: {},
      create: { name: p },
    });
  }

  // roles
  const roles = ["ADMIN", "EDITOR", "STAFF_MEDIS"];
  const roleMap: any = {};

  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: { name: r },
      update: {},
      create: { name: r },
    });

    roleMap[r] = role.id;
  }

  // assign permissions (simple: admin = all)
  const allPerms = await prisma.permission.findMany();

  for (const p of allPerms) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: roleMap.ADMIN,
          permissionId: p.id,
        },
      },
      update: {},
      create: {
        roleId: roleMap.ADMIN,
        permissionId: p.id,
      },
    });
  }

  // user
  const password = await hash("123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@hospital.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@hospital.com",
      password,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: roleMap.ADMIN,
      },
    },
    update: {},
    create: {
      userId: admin.id,
      roleId: roleMap.ADMIN,
    },
  });
}

main().finally(() => prisma.$disconnect());
