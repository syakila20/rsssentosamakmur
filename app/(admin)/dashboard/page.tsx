import { requireAuth } from "@/lib/auth/require-auth";
import { formatDate } from "@/lib/helperDate";
import {
  Caption,
  CardTitle,
  Description,
  Label,
  PageTitle,
  SectionTitle,
} from "@/Component/Typography/Typhography";

export default async function Dashboard() {
  const user = await requireAuth();
  console.log("??re", user);
  return (
    <section className="space-y-6">
      <div className="flex flex-col">
        <PageTitle>Selamat datang kembali, {user?.name}</PageTitle>
        <Description className="mt-2">
          {formatDate(new Date(), "full")}
        </Description>
      </div>
    </section>
  );
}
