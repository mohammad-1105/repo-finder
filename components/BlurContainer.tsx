"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface BlurContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}
const BlurContainer = ({
  children,
  className,
  variant,
  duration = 1,
}: BlurContainerProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export { BlurContainer };
