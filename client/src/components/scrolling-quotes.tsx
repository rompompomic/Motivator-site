import { motion } from "framer-motion";

const inspirationalQuotes = [
  { text: "Ошибка — это возможность начать снова, но уже более разумно.", author: "Генри Форд" },
  { text: "Успех — это способность идти от одной неудачи к другой, не теряя энтузиазма.", author: "Уинстон Черчилль" },
  { text: "Дорогу осилит идущий.", author: "Восточная мудрость" },
  { text: "Всё, что нас не убивает, делает нас сильнее.", author: "Фридрих Ницше" },
  { text: "Начни там, где ты есть. Используй то, что у тебя есть. Делай что можешь.", author: "Артур Эш" },
  { text: "Единственный способ делать великую работу — любить то, что делаешь.", author: "Стив Джобс" },
  { text: "Не важно, насколько медленно ты идешь, главное — не останавливаться.", author: "Конфуций" },
  { text: "Будущее принадлежит тем, кто верит в красоту своих мечтаний.", author: "Элеонора Рузвельт" },
  { text: "Падение не является поражением. Поражение — когда остаешься там, где упал.", author: "Сократ" },
  { text: "Творчество — это интеллект, который веселится.", author: "Альберт Эйнштейн" }
];

export default function ScrollingQuotes() {
  return (
    <section className="relative py-20 overflow-hidden">
      <motion.h3 
        className="text-center text-2xl font-orbitron font-bold mb-12 text-acid neon-glow"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        МУДРОСТЬ ВЕКОВ
      </motion.h3>
      
      {/* Scrolling quotes container */}
      <div className="relative h-40 overflow-hidden">
        <motion.div
          className="flex flex-col space-y-8"
          animate={{
            y: [0, -1200] // Move upward through all quotes
          }}
          transition={{
            duration: 60, // 60 seconds for full cycle
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Duplicate quotes for seamless loop */}
          {[...inspirationalQuotes, ...inspirationalQuotes].map((quote, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 text-center px-8"
              whileHover={{ scale: 1.05 }}
            >
              <blockquote className="text-lg md:text-xl font-light text-white opacity-80 mb-2 italic">
                "{quote.text}"
              </blockquote>
              <cite className="text-matrix font-rajdhani font-medium">
                — {quote.author}
              </cite>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient fade effects */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-dark-bg to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none"></div>
    </section>
  );
}