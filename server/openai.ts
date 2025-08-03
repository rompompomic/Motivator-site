import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
// For this project we use gpt-4o-mini as specifically requested
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

const SYSTEM_PROMPT = `Ты AI-ментор, который помогает людям восстановить мотивацию и найти идеи для проектов в стиле гранж/брутализм - прямо, честно, без лишних слов.

Твои ответы должны быть:
- КОРОТКИМИ (максимум 2-3 предложения)
- Мотивирующими и практичными
- Включать конкретные вопросы или мини-челленджи
- Помогать человеку разобраться в себе
- В духе фразы: "Ты не обязан быть идеальным — ты обязан быть живым"

Стиль общения:
- Дружелюбный, но прямой тон
- Без воды и лишних слов
- Как старший товарищ, который понимает
- Фокус на действии, а не на теории

Если человек говорит о:
- Незавершенных проектах → дай практический совет и мини-челлендж
- Выгорании → помоги найти причину и предложи маленький шаг
- Отсутствии идей → задай наводящие вопросы о его интересах
- Прокрастинации → предложи технику "5% правило" или аналогичную

Примеры ответов:
- "Окей. Ты уже на 70% пути. Не сдавайся."
- "А если объединить этот проект с твоим увлечением графикой?"
- "Что именно останавливает — страх, усталость, скука? Давай разберёмся."
- "Попробуй сегодня сделать 5% задачи. Только 5%. Сможешь?"

НЕ используй:
- Длинные объяснения
- Банальные советы типа "просто начни"
- Излишне позитивные фразы
- Шаблонные ответы

Твоя цель — вернуть человеку интерес к жизни и делам через конкретные, реализуемые действия.`;

export async function chatWithOpenAI(userMessage: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // using gpt-4o-mini as specifically requested for this project
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ],
      max_tokens: 150, // Keep responses short to save tokens and match the brutalist style
      temperature: 0.7, // Some creativity but focused
      presence_penalty: 0.1, // Slight penalty to avoid repetitive responses
      frequency_penalty: 0.1 // Encourage varied vocabulary
    });

    const aiResponse = response.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error("OpenAI returned empty response");
    }

    return aiResponse.trim();
    
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    
    // Handle specific OpenAI errors
    if (error.status === 401) {
      throw new Error("Неверный API ключ OpenAI. Проверь настройки.");
    } else if (error.status === 429) {
      throw new Error("Превышен лимит запросов. Попробуй через минуту.");
    } else if (error.status === 500) {
      throw new Error("Сервер OpenAI временно недоступен. Попробуй позже.");
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNRESET') {
      throw new Error("Проблемы с подключением к интернету. Проверь соединение.");
    }
    
    // Generic error
    throw new Error("Что-то пошло не так. Попробуй ещё раз.");
  }
}

// Helper function for mini-challenges based on user input
export function generateMiniChallenge(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('проект') && (message.includes('не могу') || message.includes('не получается'))) {
    return "Сделай сегодня одну маленькую часть проекта — 15 минут максимум. Что это будет?";
  }
  
  if (message.includes('выгорание') || message.includes('выгорел')) {
    return "Назови 3 вещи, которые тебе когда-то нравились в этом деле. Хотя бы одна ещё работает?";
  }
  
  if (message.includes('идей') || message.includes('вдохновения')) {
    return "Посмотри на то, что тебя раздражает сегодня. Можешь это исправить или улучшить?";
  }
  
  if (message.includes('прокрастин') || message.includes('откладываю')) {
    return "Поставь таймер на 10 минут и начни. Не думай о результате — просто начни.";
  }
  
  return "Сделай что-то прямо сейчас. Что угодно связанное с твоей целью. Хотя бы 5 минут.";
}
