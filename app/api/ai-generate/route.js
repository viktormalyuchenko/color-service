import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { generateAiPalette } from "@/lib/ai-engine"; // Наш локальный запасной движок

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("Ключ не настроен");

    // Используем 2.0 Flash — она обычно стабильнее, чем экспериментальная 2.5
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const finalPrompt = `
      Ты — эксперт-колорист. Создай гармоничную палитру (5 цветов) по запросу: "${prompt}".
      Верни ТОЛЬКО список 5 HEX-кодов через запятую.
    `;

    // Ставим жесткий лимит по времени ожидания (5 секунд)
    const aiPromise = model.generateContent(finalPrompt);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 5000)
    );

    // Кто быстрее: ответ ИИ или таймаут
    const result = await Promise.race([aiPromise, timeoutPromise]);

    const response = await result.response;
    const text = response.text();

    const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
    const foundColors = text.match(hexRegex);

    if (foundColors && foundColors.length >= 5) {
      console.log("✅ Успех: Ответ получен от Google Gemini");
      return NextResponse.json({
        colors: foundColors.slice(0, 5).map((c) => c.toUpperCase()),
        provider: "gemini",
      });
    }

    throw new Error("Неверный формат ответа ИИ");
  } catch (error) {
    // ЕСЛИ ГУГЛ ВЫДАЛ 503, 429 ИЛИ ПРОСТО ТОРМОЗИТ:
    console.warn(
      `⚠️ ИИ недоступен (${error.message}). Использую локальный алгоритм.`
    );

    const fallbackColors = generateAiPalette(prompt);

    return NextResponse.json({
      colors: fallbackColors,
      provider: "local_semantic",
    });
  }
}
