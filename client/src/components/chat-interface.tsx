import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOpenAIChat } from "@/hooks/use-openai-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import aiAvatar from "@assets/generated_images/AI_robot_avatar_f3424969.png";
import userAvatar from "@assets/generated_images/Cyberpunk_user_avatar_48f306aa.png";

const suggestions = [
  "Не могу доделать проект",
  "У меня выгорание",
  "Нет идей для нового проекта",
  "Прокрастинирую"
];

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage, clearMessages } = useOpenAIChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    sendMessage(suggestion);
    setInputValue("");
  };

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-orbitron font-black text-center mb-16 glitch-text neon-glow"
          data-text="НАЧНИ ДИАЛОГ"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          НАЧНИ ДИАЛОГ
        </motion.h2>
        
        {/* Chat Container */}
        <motion.div 
          className="chat-container bg-dark-secondary bg-opacity-90 rounded-lg p-6 h-96 flex flex-col"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-matrix pb-4 mb-4">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-4 h-4 bg-matrix rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <span className="font-orbitron text-matrix text-lg font-bold">AI_MENTOR</span>
              <motion.span 
                className="text-xs opacity-60 font-rajdhani"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                онлайн
              </motion.span>
            </div>
            <button
              onClick={clearMessages}
              className="btn-3d text-dark-bg text-xs px-3 py-1 rounded font-rajdhani font-bold"
            >
              Очистить
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className="message-bubble p-4 rounded"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.sender === 'user' ? (
                    <div className="flex items-start space-x-3 justify-end">
                      <div>
                        <p className="text-sm text-acid mb-1 text-right">Ты</p>
                        <p className="bg-acid bg-opacity-20 p-3 rounded">{message.text}</p>
                      </div>
                      <div className="w-8 h-8 bg-acid rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                          src={userAvatar} 
                          alt="User Avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-matrix rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                          src={aiAvatar} 
                          alt="AI Avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className={`text-sm mb-1 ${message.isError ? 'text-red-400' : 'text-matrix'}`}>
                          AI
                        </p>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isLoading && (
              <motion.div
                className="message-bubble p-4 rounded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-matrix rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={aiAvatar} 
                      alt="AI Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-matrix mb-1">AI</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-matrix rounded-full animate-ping"></div>
                      <div className="w-2 h-2 bg-matrix rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-matrix rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                      <span className="text-sm opacity-60 ml-2">Думаю...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="mt-4">
            <div className="flex space-x-3">
              <Input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напиши свой вопрос или проблему..."
                className="flex-1 bg-dark-bg border-matrix text-white placeholder:text-gray-500 focus:border-acid text-stroke"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                className="btn-3d text-dark-bg px-6 py-3 font-orbitron font-bold"
                disabled={isLoading || !inputValue.trim()}
              >
                Отправить
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs opacity-60">
              <span>Нажми Enter для отправки</span>
              <span className="text-matrix">● Подключено к GPT-4o-mini</span>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Suggestions */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-sm opacity-60 mb-4">Или выбери готовый вопрос:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                onClick={() => handleSuggestion(suggestion)}
                variant="outline"
                className={`
                  bg-dark-secondary border text-sm hover:text-dark-bg transition-colors
                  ${index === 0 ? 'border-matrix hover:bg-matrix' : ''}
                  ${index === 1 ? 'border-acid hover:bg-acid' : ''}
                  ${index === 2 ? 'border-emerald-deep hover:bg-emerald-deep' : ''}
                  ${index === 3 ? 'border-glitch-pink hover:bg-glitch-pink' : ''}
                `}
                disabled={isLoading}
              >
                "{suggestion}"
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
