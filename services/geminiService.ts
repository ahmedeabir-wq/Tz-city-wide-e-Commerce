import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Will be injected by the runtime environment
const ai = new GoogleGenAI({ apiKey });

export const getRecipeSuggestion = async (ingredients: string[]) => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return "I need an API key to suggest recipes! Please add items to your cart and try again.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      I have the following ingredients in my shopping cart: ${ingredients.join(', ')}.
      Suggest 3 simple recipes I can make with these (assuming basic pantry staples like oil, salt, pepper).
      Format the output as a clean list with titles and brief instructions.
      Keep it concise (under 200 words).
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't cook up a response right now. Please try again later.";
  }
};