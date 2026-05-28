import { motion } from "framer-motion";

interface IMotionCheckboxPill {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export default function MotionCheckboxPill({
  label,
  checked,
  onToggle,
}: IMotionCheckboxPill) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: checked ? "#1d4ed8" : "#ffffff",
        color: checked ? "#ffffff" : "#475569",
        borderColor: checked ? "#1d4ed8" : "#ffff",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
      h-9
      border-white        cursor-pointer
        flex items-center gap-2
        px-3 py-1.5 rounded-full
        border-2 font-medium
        shadow-sm
        uppercase
        text-xs
      "
    >
      {checked && (
        <motion.svg
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      )}
      {label}
    </motion.button>
  );
}
