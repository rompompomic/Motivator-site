import { motion } from "framer-motion";

const quotes = [
  {
    text: "Твоя работа займёт большую часть жизни, и единственный способ получить истинное удовлетворение — делать то, что считаешь великим делом.",
    author: "Стив Джобс",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    color: "border-matrix"
  },
  {
    text: "Если чувствуешь себя в безопасности в той области, которой занимаешься, ты делаешь что-то не так.",
    author: "Дэвид Боуи",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    color: "border-acid"
  },
  {
    text: "Воображение важнее знания. Знание ограничено, воображение же охватывает весь мир.",
    author: "Альберт Эйнштейн",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/400px-Albert_Einstein_Head.jpg",
    color: "border-emerald-deep"
  },
  {
    text: "Я не терплю неудач. Я просто нахожу 10 000 способов, которые не работают.",
    author: "Томас Эдисон",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    color: "border-glitch-pink"
  },
  {
    text: "Лучшее время посадить дерево было 20 лет назад. Второе лучшее время — сейчас.",
    author: "Китайская пословица",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    color: "border-acid"
  },
  {
    text: "Не ждите. Время никогда не будет подходящим.",
    author: "Наполеон Хилл",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    color: "border-matrix"
  }
];

export default function QuotesSection() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-mono font-bold text-center mb-16 glitch-text neon-glow"
          data-text="ВДОХНОВЕНИЕ"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          ВДОХНОВЕНИЕ
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              className="distorted-block bg-dark-secondary bg-opacity-80 p-6 floating-element"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              style={{ 
                animationDelay: `${index * 2}s`,
                perspective: "1000px"
              }}
            >
              <motion.img 
                src={quote.image}
                alt={`${quote.author} portrait`} 
                className={`w-24 h-24 rounded-full mx-auto mb-4 border-2 ${quote.color}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <blockquote className="text-center">
                <motion.p 
                  className="text-lg mb-4 italic font-rajdhani"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.3 + 0.5 }}
                >
                  "{quote.text}"
                </motion.p>
                <motion.cite 
                  className={`${quote.color.replace('border-', 'text-')} font-orbitron font-bold text-sm`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.3 + 0.7 }}
                >
                  — {quote.author}
                </motion.cite>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
