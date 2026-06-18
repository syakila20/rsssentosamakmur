import { prisma } from "@/lib/prisma";

export async function getUserPermissions(userId: number) {
  const roles = await prisma.userRole.findMany({
    where: {
      userId,
    },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  const permissions = new Set<string>();

  roles.forEach((role) => {
    role.role.permissions.forEach((permission) => {
      permissions.add(permission.permission.name);
    });
  });

  return [...permissions];
}

export function can(permissions: string[], permission: string) {
  if (permissions.includes("*")) {
    return true;
  }

  if (permissions.includes(permission)) {
    return true;
  }

  const [resource] = permission.split(".");

  return permissions.includes(`${resource}.*`);
}
