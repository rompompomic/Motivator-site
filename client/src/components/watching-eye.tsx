import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WatchingEye() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed top-5 right-5 z-50">
      <motion.div
        className="watching-eye cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
      />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -left-32 top-8 bg-dark-secondary bg-opacity-95 px-3 py-2 rounded-lg border border-matrix whitespace-nowrap"
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-acid font-rajdhani">Ты ещё здесь?</p>
            <div className="absolute -top-1 right-8 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-matrix"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}