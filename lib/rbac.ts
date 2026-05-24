import { prisma } from "./prisma";

export async function getUserPermissions(userId: number) {
  const roles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          permissions: {
            include: { permission: true },
          },
        },
      },
    },
  });

  const perms = new Set<string>();

  roles.forEach((r) => {
    r.role.permissions.forEach((p) => {
      perms.add(p.permission.name);
    });
  });

  return Array.from(perms);
}

export function can(userPerms: string[], permission: string) {
  if (userPerms.includes(permission)) return true;

  const [resource] = permission.split(".");
  return userPerms.includes(`${resource}.*`);
}
