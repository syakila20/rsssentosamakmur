import { cookies } from "next/headers";
import { prisma } from "../prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: {
      user: {
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: { permission: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!session) return null;

  const user = session.user;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roles: user.roles.map((r) => r.role.name),
    avatar: user?.avatar,
    permissions: user.roles.flatMap((r) =>
      r.role.permissions.map((p) => p.permission.name),
    ),
  };
}
