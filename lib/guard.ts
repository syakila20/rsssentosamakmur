import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { can } from "./rbac";

export async function requirePermission(permission: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  if (!can(session.user.permissions, permission)) {
    throw new Error("FORBIDDEN");
  }

  return session;
}
