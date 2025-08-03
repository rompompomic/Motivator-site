import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroMessages = [
  "ВПЕРЁД!",
  "НЕ СДАВАЙСЯ!",
  "ТЫ МОЖЕШЬ!",
  "ДЕЙСТВУЙ!",
  "ПОБЕЖДАЙ!",
  "ЖИВИ ПОЛНОЙ ЖИЗНЬЮ!",
  "СОЗДАВАЙ!",
  "ДЕРЗАЙ!",
  "ПРЕВОСХОДИ СЕБЯ!",
  "БУДЬ СОБОЙ!"
];

export default function HeroPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const showHero = () => {
      // Random position on screen
      const newPosition = {
        x: Math.random() * 80 + 10, // 10% to 90% of screen width
        y: Math.random() * 70 + 15   // 15% to 85% of screen height
      };
      
      const randomMessage = heroMessages[Math.floor(Math.random() * heroMessages.length)];
      
      setPosition(newPosition);
      setCurrentMessage(randomMessage);
      setIsVisible(true);

      // Hide after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    // Show hero every 15 seconds
    const interval = setInterval(showHero, 15000);

    // Show immediately on first load after 5 seconds
    const initialTimeout = setTimeout(showHero, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-5 pointer-events-none"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ 
            opacity: 0, 
            scale: 0.5, 
            rotateZ: -45,
            filter: 'brightness(0.5) hue-rotate(180deg)'
          }}
          animate={{ 
            opacity: 1, 
            scale: [0.5, 1.2, 1], 
            rotateZ: [0, 5, -5, 0],
            filter: [
              'brightness(0.5) hue-rotate(180deg)', 
              'brightness(2) hue-rotate(0deg)',
              'brightness(1.5) hue-rotate(30deg)',
              'brightness(1) hue-rotate(0deg)'
            ]
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.3, 
            rotateZ: 45,
            filter: 'brightness(0) hue-rotate(360deg)'
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            scale: { times: [0, 0.6, 1] }
          }}
        >
          {/* Hero Figure */}
          <motion.div
            className="relative"
            animate={{
              filter: [
                'drop-shadow(0 0 10px #00ff41)',
                'drop-shadow(0 0 20px #ff4141)',
                'drop-shadow(0 0 15px #41ff41)',
                'drop-shadow(0 0 10px #00ff41)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Glowing silhouette effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-matrix via-acid to-glitch-pink rounded-full blur-xl opacity-60 w-32 h-32"></div>
            
            {/* Hero figure - using CSS to create a silhouette */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-matrix to-acid rounded-full flex items-center justify-center overflow-hidden">
              {/* Angry/determined face effect */}
              <div className="w-full h-full relative">
                {/* Eyes */}
                <div className="absolute top-6 left-6 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-6 right-6 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                
                {/* Mouth/scream */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-6 border-4 border-red-500 rounded-full animate-pulse"></div>
                
                {/* Energy aura lines */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-8 bg-gradient-to-t from-transparent to-acid"
                      style={{
                        top: '10%',
                        left: '50%',
                        transformOrigin: '0 200%',
                        transform: `rotate(${i * 45}deg) translateX(-50%)`
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-dark-secondary bg-opacity-90 px-6 py-3 rounded-lg border-2 border-matrix">
              <p className="font-orbitron font-black text-lg text-acid text-center animate-pulse">
                {currentMessage}
              </p>
            </div>
            
            {/* Speech bubble pointer */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-matrix"></div>
          </motion.div>

          {/* Particle effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-acid rounded-full"
                style={{
                  left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 60}px`,
                  top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 60}px`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, Math.cos(i * 30 * Math.PI / 180) * 30],
                  y: [0, Math.sin(i * 30 * Math.PI / 180) * 30]
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}