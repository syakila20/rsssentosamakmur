import Back from "@/component/Back/Back";
import SafeImage from "@/component/SafeImage/SafeImage";
import Image from "next/image";

type Props = {
  title: string;
  image: string;
  date: string;
  readingTime: number;
  content: string;
  category: string;
};

export default function BlogDetail(props: Props) {
  return (
    <article className="">
      <div className="flex gap-2 mb-4">
        <Back desc="Blog Detail" title="Back to Blog List" linkTo="/blog" />
        {/* <Link
          href={"/blog"}
          className="bg-blue-800 flex rounded-full h-9 w-9 px-2 items-center text-white"
        >
          <SvgChevronLeft height="40" />
        </Link>
         */}
      </div>
      <h1 className="text-3xl font-bold text-slate-600">{props.title}</h1>

      <div className="mt-3 flex gap-4 text-sm text-slate-500 items-center">
        <span>{props.date}</span>•<span>{props.readingTime} menit baca</span>
        <span className="inline-flex items-center px-3 py-1 text-base font-medium rounded-full bg-blue-800 text-white">
          {props?.category}
        </span>
      </div>

      <div className="relative w-full h-50 md:h-100 lg:h-105 mt-6 rounded-lg overflow-hidden">
        <SafeImage
          src={props.image}
          alt={props.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="prose prose-slate max-w-none mt-8">
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
    </article>
  );
}
