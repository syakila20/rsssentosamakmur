/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { PERMISSIONS } from "../config/permission";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
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
