import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GlitchText from "@/components/glitch-text";
import MatrixRain from "@/components/matrix-rain";
import BackgroundVideo from "@/components/background-video";
import CustomCursor from "@/components/custom-cursor";
import FilmGrain from "@/components/film-grain";
import WatchingEye from "@/components/watching-eye";
import FloatingPhrases from "@/components/floating-phrases";
import QuotesSection from "@/components/quotes-section";
import ScrollingQuotes from "@/components/scrolling-quotes";
import ChatInterface from "@/components/chat-interface";
import MotivationTracker from "@/components/motivation-tracker";
import HeroPopup from "@/components/hero-popup";
import { useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Ensure we start at the top
    window.scrollTo(0, 0);

    // Enable smooth scroll after a brief delay
    const timer = setTimeout(() => {
      document.documentElement.classList.add('smooth-scroll');
    }, 100);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('smooth-scroll');
    };
  }, []);

  const parallaxElements = [
    { speed: 0.02, delay: 0 },
    { speed: 0.04, delay: 2 },
    { speed: 0.03, delay: 4 }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      {/* Background Effects */}
      <BackgroundVideo />
      <MatrixRain />
      <div className="fixed inset-0 noise-bg vhs-lines digital-grid vhs-effect pointer-events-none z-10"></div>
      <FloatingPhrases />
      <HeroPopup />
      <CustomCursor />
      <WatchingEye />
      <FilmGrain />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Floating geometric shapes */}
        {parallaxElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${
              index === 0 ? 'top-20 left-10 w-16 h-16 bg-matrix opacity-20' : 
              index === 1 ? 'top-40 right-20 w-12 h-12 bg-acid opacity-30' :
              'bottom-40 left-1/4 w-8 h-8 bg-glitch-pink opacity-25'
            } floating-element`}
            style={{
              clipPath: index === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
              animationDelay: `${element.delay}s`,
              transform: `translate(${(mousePosition.x - window.innerWidth / 2) * element.speed}px, ${(mousePosition.y - window.innerHeight / 2) * element.speed}px)`
            }}
          />
        ))}

        <motion.div 
          className="text-center z-10 max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <GlitchText 
            className="text-6xl md:text-8xl font-orbitron font-black mb-8 neon-glow"
            animate={true}
          >
            ЖИВОЙ
          </GlitchText>

          <motion.div 
            className="mb-12 distorted-block bg-dark-secondary bg-opacity-80 p-8 mx-auto max-w-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-2xl md:text-3xl font-rajdhani font-light text-matrix mb-4 animate-flicker text-stroke">
              "Ты не обязан быть идеальным —
            </p>
            <p className="text-2xl md:text-3xl font-rajdhani font-light text-acid text-stroke">
              ты обязан быть живым."
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4 text-lg md:text-xl opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="animate-pulse">Пробуди свою мотивацию</p>
            <p>Найди силы продолжать</p>
            <p className="text-matrix">Стань собой</p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-matrix text-2xl">⬇</div>
        </motion.div>
      </section>
      {/* About Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GlitchText className="text-4xl md:text-5xl font-orbitron font-bold">
                ЧТО ЗДЕСЬ?
              </GlitchText>

              <div className="space-y-4 text-lg leading-relaxed">
                {[
                  { text: "ИИ-помощник, который не будет читать лекции", color: "text-acid" },
                  { text: "Короткие, но точные советы для твоих проектов", color: "text-matrix" },
                  { text: "Мини-челленджи, чтобы сдвинуться с места", color: "text-glitch-pink" },
                  { text: "Вопросы, которые помогут разобраться в себе", color: "text-neon-yellow" }
                ].map((item, index) => (
                  <motion.p 
                    key={index}
                    className="brutal-shadow bg-dark-secondary p-6 font-rajdhani text-lg text-stroke"
                    initial={{ opacity: 0, y: 30, rotateX: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    whileHover={{ scale: 1.02, rotateX: 2 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className={item.color}>●</span> {item.text}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Chat Preview */}
              <div className="chat-container bg-dark-secondary bg-opacity-90 rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-3 border-b border-matrix pb-3">
                  <div className="w-3 h-3 bg-matrix rounded-full animate-pulse"></div>
                  <span className="font-orbitron text-matrix font-bold">AI_MENTOR</span>
                </div>

                <div className="message-bubble p-4 rounded">
                  <p className="text-sm opacity-60 mb-2">Пользователь:</p>
                  <p>"Не могу доделать свой проект..."</p>
                </div>

                <div className="message-bubble p-4 rounded">
                  <p className="text-sm text-matrix mb-2">AI:</p>
                  <p>"Окей. Ты уже на 70% пути. Что именно останавливает — страх, усталость, скука? Давай разберёмся."</p>
                </div>

                <div className="flex items-center space-x-2 text-matrix">
                  <div className="w-2 h-2 bg-matrix rounded-full animate-ping"></div>
                  <span className="text-sm">Печатает...</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <QuotesSection />
      <ScrollingQuotes />
      <MotivationTracker />
      <ChatInterface />
      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-matrix">
        <motion.div 
          className="max-w-4xl mx-auto text-center space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlitchText className="text-2xl font-orbitron font-bold">ЖИВОЙ</GlitchText>
          <p className="opacity-60 font-rajdhani text-lg text-stroke">Проект для тех, кто хочет жить, а не существовать</p>
          <div className="flex justify-center space-x-6 text-sm">
            <span className="text-matrix">Made with chaos & love</span>
            <span className="text-acid">●</span>
            <span className="text-emerald-deep">2025</span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}