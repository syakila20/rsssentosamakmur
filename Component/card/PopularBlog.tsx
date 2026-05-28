import { formatDate } from "@/lib/helperDate";
import Image from "next/image";
import Link from "next/link";

interface PopularCardProps {
  image: string;
  title: string;
  description: string;
  href?: string;
  views: number;
  category: string;
  createdAt?: string;
}

export default function PopularCard({
  image,
  title,
  description,
  href,
  views,
  category,
  createdAt,
}: PopularCardProps) {
  return (
    <Link href={`/article/${href}`} className="group flex gap-4">
      <div className="relative h-24 w-32 overflow-hidden rounded-xl shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-between min-w-0">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-teal-600">
            {category}
          </p>

          <h4 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-500 group-hover:text-teal-600 transition-colors">
            {title}
          </h4>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          <span>{views} views</span>
          <span>•</span>
          <span>{createdAt}</span>
        </div>
      </div>
    </Link>
  );
}
