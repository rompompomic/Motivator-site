import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isError?: boolean;
}

export function useOpenAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я здесь, чтобы помочь тебе найти мотивацию и идеи. Расскажи, что тебя беспокоит или над чем работаешь?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Use Netlify function endpoint in production, local API in development
      const apiEndpoint = import.meta.env.PROD 
        ? '/.netlify/functions/chat' 
        : '/api/chat';
        
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Извини, произошла ошибка. Проверь подключение и попробуй снова.',
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        text: 'Привет! Я здесь, чтобы помочь тебе найти мотивацию и идеи. Расскажи, что тебя беспокоит или над чем работаешь?',
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
}
