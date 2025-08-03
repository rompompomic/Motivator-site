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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    color: "border-emerald-deep"
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              style={{ animationDelay: `${index * 2}s` }}
            >
              <img 
                src={quote.image}
                alt={`${quote.author} portrait`} 
                className={`w-24 h-24 rounded-full mx-auto mb-4 border-2 ${quote.color}`}
              />
              <blockquote className="text-center">
                <p className="text-lg mb-4 italic">"{quote.text}"</p>
                <cite className={`${quote.color.replace('border-', 'text-')} font-mono`}>
                  — {quote.author}
                </cite>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
