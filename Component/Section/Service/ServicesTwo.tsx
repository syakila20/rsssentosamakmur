import { motion } from "framer-motion";

interface IServiceTwo {
  title: string;
  desc: string;
  active: boolean;
}

export default function ServiceCard({ title, desc, active }: IServiceTwo) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`
        relative rounded-2xl p-6 w-64
        bg-white
        shadow-sm
        border
        ${active ? "border-blue-500 shadow-md" : "border-gray-100"}
      `}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        <span className="text-blue-600 text-lg">✚</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold tracking-wide text-gray-900">
        {title}
      </h3>

      {/* Desc */}
      <p className="mt-1 text-sm text-gray-500 leading-relaxed">{desc}</p>

      {/* CTA */}
      <button
        className={`
          mt-4 text-sm font-medium
          ${active ? "text-blue-600" : "text-gray-400"}
          flex items-center gap-1
        `}
      >
        Learn More →
      </button>
    </motion.div>
  );
}
