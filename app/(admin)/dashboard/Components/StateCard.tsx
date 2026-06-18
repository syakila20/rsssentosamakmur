interface StatCardProps {
  title: string;
  value: number;
  color?: "emerald" | "blue" | "amber" | "fuchsia";
}

const StatCard = ({ title, value, color = "emerald" }: StatCardProps) => {
  const colors = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    fuchsia: "bg-fuchsia-500",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${colors[color]}`} />

        <p className="text-sm text-slate-500">{title}</p>
      </div>

      <h3 className="mt-4 text-3xl font-bold text-slate-800">
        {value.toLocaleString("id-ID")}
      </h3>
    </div>
  );
};

export default StatCard;
