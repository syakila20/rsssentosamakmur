import SafeImage from "@/Component/SafeImage/SafeImage";

type Props = {
  title: string;
  image: string;
  date: string;
  readingTime: number;
  content: string;
  publishBy: string;
  profile: string;
};

export default function BlogDetail(props: Props) {
  return (
    <article className="">
      <div className="flex gap-2 mb-4"></div>
      <h1 className="text-3xl font-bold text-slate-600">{props.title}</h1>

      <div className="mt-3 flex gap-4 text-sm items-center">
        <span className="inline-flex items-center  relative h-7 px-3 py-1 text-[8pt] font-medium rounded-full bg-neutral-100 text-slate-400 uppercase">
          {props.date}
        </span>
        <span className="inline-flex items-center  relative h-7 px-3 py-1 text-[8pt] font-medium rounded-full bg-neutral-100 text-slate-400 uppercase">
          {props.readingTime} menit baca
        </span>
        <span className="inline-flex items-center gap-2  relative h-7 px-3 py-1 text-[8pt] font-medium rounded-full bg-neutral-100 text-slate-400 uppercase">
          <SafeImage
            src={props?.profile || ""}
            alt={props?.publishBy}
            width={2}
            height={2}
            className="inline-block size-5 rounded-full"
          />{" "}
          {props?.publishBy}
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
