import { redirect } from "next/navigation";
import { getCurrentUser } from "./current-user";

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
//   const user =
//     await requireAuth();

//   return <div>{user.name}</div>;
// }
