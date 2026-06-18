export const revalidate = 300;

import { createMetadata } from "@/lib/seo/createMetaData";
import { SITE_URL } from "@/lib/seo/constant";
import PromoClient from "./PromoClient";
import { getPromoCategories, getPromos } from "@/lib/api/promo/promo.api";

interface Props {
  searchParams: {
    specialty?: string;
    search?: string;
    page?: string;
  };
}

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams;

  const category = params.specialty;

  return createMetadata({
    title: `Temukan Dokter Terbaik`,
    description: `Kami hadir untuk membantu Anda menemukan tenaga medis yang peduli dan
          tepercaya, agar setiap kunjungan terasa nyaman dan aman.`,
    path: `${category} ? /doctor?category=${params?.specialty} : /doctor`,
    canonical: `${category} ? ${SITE_URL}/doctor?category=${params?.specialty} : /doctor`,
  });
}

export default async function PromoPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = new URLSearchParams(params);
  const result = await getPromos(query);
  const categories = await getPromoCategories();
  return (
    <PromoClient
      initialData={result?.data as []}
      categories={categories}
      initialMeta={result?.meta}
    />
  );
}
