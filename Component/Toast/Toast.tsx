import SvgCircleDown from "@/Icon/CircleDown";
import SvgSuccess from "@/Icon/Success";
import DangerTriangleSolid from "@/Icon/Warning";
import SvgCrossInCircleFilled from "@/Icon/Wrong";
import { AnimatePresence, motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";

type ToastType = "success" | "warning" | "danger";

type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

type IconComponent = ComponentType<{ className?: string }>;

interface ToastConfig {
  icon: IconComponent;
  title: string;
  bg: string;
  border: string;
  iconBg: string;
  iconColor: string;
  progress: string;
}

interface ToastProps {
  show: boolean;
  type?: ToastType;
  message?: string;
  position?: ToastPosition;
  duration?: number;
}

interface AnimationState {
  x?: number;
  y?: number;
  opacity: number;
  scale: number;
}

interface AnimationConfig {
  initial: AnimationState;
  animate: AnimationState;
  exit: AnimationState;
}

const toastConfig: Record<ToastType, ToastConfig> = {
  success: {
    icon: SvgSuccess,
    title: "Success",
    bg: "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    progress: "bg-green-500",
  },

  warning: {
    icon: DangerTriangleSolid,
    title: "Warning",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    progress: "bg-yellow-500",
  },

  danger: {
    icon: SvgCrossInCircleFilled,
    title: "Danger",
    bg: "bg-red-50",
    border: "border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    progress: "bg-red-500",
  },
};

const positions: Record<ToastPosition, string> = {
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-center": "top-6 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
};

const getAnimation = (position: ToastPosition): AnimationConfig => {
  switch (position) {
    case "top-left":
    case "bottom-left":
      return {
        initial: { x: -80, opacity: 0, scale: 0.9 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: -80, opacity: 0, scale: 0.9 },
      };

    case "top-center":
      return {
        initial: { y: -60, opacity: 0, scale: 0.9 },
        animate: { y: 0, opacity: 1, scale: 1 },
        exit: { y: -60, opacity: 0, scale: 0.9 },
      };

    case "bottom-center":
      return {
        initial: { y: 60, opacity: 0, scale: 0.9 },
        animate: { y: 0, opacity: 1, scale: 1 },
        exit: { y: 60, opacity: 0, scale: 0.9 },
      };

    default:
      return {
        initial: { x: 80, opacity: 0, scale: 0.9 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: 80, opacity: 0, scale: 0.9 },
      };
  }
};

export default function Toast({
  show,
  type = "success",
  message = "",
  position = "top-right",
  duration = 4000,
}: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  const animation = getAnimation(position);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 28,
          }}
          className={`fixed z-50 w-96 overflow-hidden rounded-xl border shadow-2xl ${positions[position]} ${config.bg} ${config.border}`}
        >
          <div className="flex items-start gap-3 p-4">
            <div className={`rounded-full p-2 ${config.iconBg}`}>
              <Icon className={`h-6 w-6 ${config.iconColor}`} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{config.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{message}</p>
            </div>
          </div>

          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{
              duration: duration / 1000,
              ease: "linear",
            }}
            className={`h-1 ${config.progress}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
