import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getSession() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: {
      sessionToken,
    },
    include: {
      user: {
        include: {
          roles: {
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
          },
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  if (session.expires < new Date()) {
    return null;
  }

  return session;
}
