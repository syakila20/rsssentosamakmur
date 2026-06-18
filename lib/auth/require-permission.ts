import { redirect } from "next/navigation";

import { getCurrentUser } from "./current-user";
import { can } from "./rbac";

export async function requirePermission(permission: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!can(user.permissions, permission)) {
    redirect("/403");
  }

  return user;
}
