import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { chatWithOpenAI } from "./openai";

const chatRequestSchema = z.object({
  message: z.string().min(1).max(1000)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint for OpenAI integration
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = chatRequestSchema.parse(req.body);
      
      const response = await chatWithOpenAI(message);
      
      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Неверный формат сообщения",
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        message: "Ошибка при обработке запроса. Попробуйте снова." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
