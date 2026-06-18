import { requireAuth } from "@/lib/auth/require-auth";
import NavbarAdmin from "./NavbarAdmin";

export default async function NavbarProfileAccount() {
  const user = await requireAuth();

  return (
    <NavbarAdmin
      name={user?.name}
      email={user?.email}
      avatar={user?.avatar || ""}
    />
  );
}
