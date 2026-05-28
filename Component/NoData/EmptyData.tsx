import SvgBox from "@/Icon/Box";

interface NoDataProps {
  title?: string;
  description?: string;
}

export default function EmptyData({
  title = "No Data",
  description = "",
}: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative rounded-full text-slate-200">
        <SvgBox height="100" />
      </div>

      <h3 className="text-base font-medium text-slate-300">{title}</h3>

      <p className="text-sm text-slate-300 mt-1">{description}</p>
    </div>
  );
}
