"use client";

import { motion } from "framer-motion";
import { CSSProperties, useMemo } from "react";

type AnimatedOrbProps = {
  colors: [string, string, ...string[]];
  size: number;
  initialX: string | number;
  initialY: string | number;
  duration?: number;
  blur?: number;
  opacity?: number;
};

export function AnimatedOrb({
  colors,
  size,
  initialX,
  initialY,
  duration = 2200, // ⚡ animation rapide
  blur = 45,       // 👈 moins de flou = plus visible
  opacity = 1,
}: AnimatedOrbProps) {

  // Gradient lumineux (plus visible qu’un linear-gradient)
  const background = useMemo(
    () => `radial-gradient(circle at 30% 30%, ${colors.join(", ")})`,
    [colors]
  );

  const style: CSSProperties = {
    position: "absolute",
    left: initialX,
    top: initialY,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "9999px",
    background,
    filter: `blur(${blur}px)`,
    opacity,
    pointerEvents: "none",
    willChange: "transform",
  };

  return (
    <motion.div
      style={style}
      animate={{
        x: [0, 140, -120, 60, 0],
        y: [0, -110, 100, -40, 0],
        scale: [1, 1.25, 0.9, 1.15, 1],
      }}
      transition={{
        duration: duration / 1000,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}