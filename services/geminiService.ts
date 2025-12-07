import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateModuleContent = async (topic: string): Promise<string> => {
  if (!apiKey) {
    return "## API Key Missing\n\nPlease provide a valid API key in the environment variables to generate content.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: topic,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // Low temperature for factual technical content
      }
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Error generating content:", error);
    return "## Error\n\nFailed to generate content. Please try again later.";
  }
};

export const generateChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
    if (!apiKey) return "API Key missing.";

    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION + "\n\nAnswer the user's specific question about OpenShift security concisely.",
            },
            history: history
        });

        const result = await chat.sendMessage({ message });
        return result.text || "I couldn't generate a response.";
    } catch (e) {
        console.error(e);
        return "Sorry, I encountered an error processing your request.";
    }
}
