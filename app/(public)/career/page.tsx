import JobClient from "./JobClient";
import { getJobs } from "@/lib/api/career/career.api";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function CareerPage({ searchParams }: Props) {
  const params = await searchParams;

  const query = new URLSearchParams(params);
  const job = await getJobs(query);
  return (
    <JobClient
      initialData={job.data as []}
      initialMeta={job.meta}
      categories={[]}
    />
  );
}
