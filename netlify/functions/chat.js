import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Ты мотивационный коуч и ментор. Твоя задача - помогать людям находить вдохновение и преодолевать сложности. 

Стиль общения:
- Говори просто и понятно, как друг
- Будь поддерживающим, но честным
- Давай конкретные советы, а не общие фразы
- Используй примеры из жизни
- Будь кратким - отвечай в 2-3 предложениях максимум

Темы, которые ты освещаешь:
- Преодоление прокрастинации
- Поиск мотивации для проектов
- Борьба с выгоранием
- Развитие креативности
- Постановка и достижение целей
- Работа со страхами и сомнениями

Помни: твоя цель - не решить все проблемы человека, а дать ему инструмент или новый взгляд на ситуацию.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: completion.choices[0].message.content
      }),
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Произошла ошибка при обработке запроса. Проверьте настройки API ключа.' 
      }),
    };
  }
};