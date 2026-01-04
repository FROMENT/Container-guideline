import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants.ts';

/**
 * Note: Following developer guidelines for @google/genai SDK.
 * - Always use new GoogleGenAI({apiKey: process.env.API_KEY})
 * - Use ai.models.generateContent for querying
 * - Use gemini-3-flash-preview for general tasks
 * - Use gemini-3-pro-preview for complex reasoning (chat)
 */

export const generateModuleContent = async (topic: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  if (!process.env.API_KEY) {
    return "## API Key Missing\n\nPlease provide a valid API key in the environment variables to generate content.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: topic,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Lower temperature for more consistent technical documentation
      }
    });

    return response.text || "No content generated.";
  } catch (error: any) {
    console.error("Error generating content:", error);
    return `## Generation Error\n\n${error.message || 'An unexpected error occurred while generating content.'}`;
  }
};

export const generateChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  if (!process.env.API_KEY) return "API Key missing.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + "\n\nYou are interacting via a chat interface. Keep responses concise but accurate.",
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I couldn't generate a response.";
  } catch (e: any) {
    console.error("Chat error:", e);
    return "Sorry, I encountered an error processing your request.";
  }
};
