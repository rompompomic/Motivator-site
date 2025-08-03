import { motion } from "framer-motion";
import { useState } from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
  animate?: boolean;
}

export default function GlitchText({ children, className = "", animate = false }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`glitch-text ${animate ? 'animate-flicker' : ''} ${className}`}
      data-text={children}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: isHovered ? 'glitch 0.1s infinite linear alternate-reverse' : undefined
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
