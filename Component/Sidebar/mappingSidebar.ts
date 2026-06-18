import { SIDEBAR_MENU } from "@/Component/Sidebar/menu";
import { can } from "@/lib/auth/rbac";

export function getSidebarMenu(permissions: string[]) {
  return SIDEBAR_MENU.filter((menu) => {
    if (!menu.permissions) {
      return true;
    }

    return menu.permissions.some((permission) => can(permissions, permission));
  }).map((menu) => ({
    ...menu,
    children: menu.children?.filter((child) => {
      if (!child.permissions) {
        return true;
      }

      return child.permissions.some((permission) =>
        can(permissions, permission),
      );
    }),
  }));
}
