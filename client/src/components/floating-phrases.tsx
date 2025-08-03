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
  "Ты сильнее",
  "Превосходи себя",
  "Будь смелым",
  "Мечтай больше",
  "Рискуй",
  "Верь в себя",
  "Иди до конца",
  "Побеждай страхи",
  "Твори свой мир",
  "Никогда не сдавайся",
  "Разрушь границы",
  "Стань легендой",
  "Лови момент",
  "Меняй мир",
  "Бунтуй против обыденности",
  "Живи на полную",
  "Сопротивляйся",
  "Выходи из зоны комфорта",
  "Твоя игра",
  "Бей рекорды",
  "Не оглядывайся"
];

interface FloatingPhrase {
  id: string;
  text: string;
  x: number;
  y: number;
}

export default function FloatingPhrases() {
  const [phrases, setPhrases] = useState<FloatingPhrase[]>([]);

  useEffect(() => {
    const createPhrase = () => {
      const uniqueId = `phrase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newPhrase: FloatingPhrase = {
        id: uniqueId,
        text: motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)],
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 100)
      };

      setPhrases(prev => [...prev, newPhrase]);

      // Remove phrase after 12 seconds (longer to have more on screen)
      setTimeout(() => {
        setPhrases(prev => prev.filter(phrase => phrase.id !== newPhrase.id));
      }, 12000);
    };

    // Create more phrases more frequently (every 2-4 seconds)
    const interval = setInterval(() => {
      createPhrase();
    }, Math.random() * 2000 + 2000);

    // Create initial phrases immediately
    for (let i = 0; i < 3; i++) {
      setTimeout(createPhrase, i * 1000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {phrases.map((phrase) => (
          <motion.div
            key={phrase.id}
            className="absolute text-matrix font-rajdhani font-medium text-base opacity-30"
            style={{ left: phrase.x, top: phrase.y }}
            initial={{ opacity: 0, y: 50, scale: 0.5, rotateZ: -15 }}
            animate={{ 
              opacity: [0, 0.4, 0.6, 0.4, 0],
              y: [50, -20, -60, -80, -100],
              scale: [0.5, 1, 1.1, 0.9, 0.7],
              rotateZ: [-15, 5, -5, 10, -10],
              filter: [
                'hue-rotate(0deg) brightness(1)',
                'hue-rotate(30deg) brightness(1.2)',
                'hue-rotate(60deg) brightness(1.5)',
                'hue-rotate(90deg) brightness(1.2)',
                'hue-rotate(120deg) brightness(0.8)'
              ]
            }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ 
              duration: 12,
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
