import { getCurrentUser } from "./current-user";
import { can } from "./rbac";

export async function hasPermission(permission: string) {
  const user = await getCurrentUser();

  if (!user) return false;

  return can(user.permissions, permission);
}
// const canCreateArticle =
//   await hasPermission(
//     "article.create"
//   );
