import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants.ts';

// Lazy initialization helper
const getAiClient = () => {
  // Check for API_KEY in process.env safely
  let apiKey = '';
  try {
    if (typeof process !== 'undefined' && process.env) {
      apiKey = process.env.API_KEY || '';
    }
  } catch (e) {
    console.warn('Unable to read process.env');
  }
  
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateModuleContent = async (topic: string): Promise<string> => {
  const ai = getAiClient();
  
  if (!ai) {
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
  } catch (error: any) {
    console.error("Error generating content:", error);

    let title = "Generation Error";
    let desc = "An unexpected error occurred.";
    const msg = (error.message || '').toLowerCase();

    if (msg.includes('401') || msg.includes('unauthorized') || msg.includes('api key')) {
        title = "Authentication Error";
        desc = "Invalid API Key or unauthorized access. Please check your environment configuration.";
    } else if (msg.includes('429') || msg.includes('quota') || msg.includes('exhausted')) {
        title = "Quota Exceeded";
        desc = "API rate limit or quota exceeded. Please try again later.";
    } else if (msg.includes('404') || msg.includes('not found')) {
        title = "Model Not Found";
        desc = "The requested AI model is currently unavailable.";
    } else if (msg.includes('503') || msg.includes('overloaded')) {
        title = "Service Overloaded";
        desc = "The AI service is currently overloaded. Please try again in a moment.";
    } else {
        desc = error.message || String(error);
    }

    return `## ${title}\n\n${desc}\n\n> Please try refreshing the page or checking your connection.`;
  }
};

export const generateChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
    const ai = getAiClient();
    if (!ai) return "API Key missing.";

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
