import { requireAuth } from "@/lib/auth/require-auth";
import NavbarAdmin from "./NavbarAdmin";

export default async function NavbarProfileAccount() {
  const user = await requireAuth();
  console.log("??user", { user });
  return (
    <NavbarAdmin
      name={user?.name}
      email={user?.email}
      avatar={user?.avatar || ""}
      role={user?.roles[0] || "-"}
    />
  );
}
