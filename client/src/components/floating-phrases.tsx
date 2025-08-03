import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const motivationalPhrases = [
  "Действуй",
  "Не сдавайся", 
  "Ты можешь больше",
  "Начни сейчас",
  "Просто сделай",
  "Живи",
  "Создавай",
  "Дерзай",
  "Вперёд",
  "Ты сильнее"
];

interface FloatingPhrase {
  id: number;
  text: string;
  x: number;
  y: number;
}

export default function FloatingPhrases() {
  const [phrases, setPhrases] = useState<FloatingPhrase[]>([]);

  useEffect(() => {
    let id = 0;
    
    const createPhrase = () => {
      const newPhrase: FloatingPhrase = {
        id: id++,
        text: motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)],
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 100)
      };

      setPhrases(prev => [...prev, newPhrase]);

      // Remove phrase after 8 seconds
      setTimeout(() => {
        setPhrases(prev => prev.filter(phrase => phrase.id !== newPhrase.id));
      }, 8000);
    };

    // Create phrase every 5-10 seconds
    const interval = setInterval(() => {
      createPhrase();
    }, Math.random() * 5000 + 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {phrases.map((phrase) => (
          <motion.div
            key={phrase.id}
            className="absolute text-matrix font-mono text-sm opacity-20"
            style={{ left: phrase.x, top: phrase.y }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [50, -20, -50],
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 8,
              ease: "easeInOut"
            }}
          >
            {phrase.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
