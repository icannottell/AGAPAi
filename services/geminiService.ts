import { GoogleGenAI } from "@google/genai";
import { Message, NodeData, WeatherData } from "../types";
import { getSystemInstruction } from "../constants";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendToGemini = async (
  currentMessage: string,
  history: Message[],
  imageBase64: string | undefined,
  weather: WeatherData,
  nodes: NodeData[]
): Promise<string> => {
  
  try {
    const modelId = "gemini-2.5-flash"; // Using 2.5 Flash for speed and multimodal capabilities

    // Construct the prompt contents manually to ensure context is passed correctly
    // We treat this as a stateless call with history injection because we need to 
    // inject the *latest* weather/node data into the system instruction every time.
    
    const systemInstruction = getSystemInstruction(weather, nodes);

    const contents = [];

    // Add history (simplified)
    history.forEach(msg => {
      if (msg.role === 'user') {
         // If history had an image, we are skipping re-sending the heavy base64 for history to save bandwidth/tokens
         // unless it's critical. For this demo, we just send the text history.
         contents.push({ role: 'user', parts: [{ text: msg.text }] });
      } else {
         contents.push({ role: 'model', parts: [{ text: msg.text }] });
      }
    });

    // Current Turn
    const currentParts: any[] = [];
    
    if (imageBase64) {
      // Remove data URL prefix if present for the API
      const base64Data = imageBase64.split(',')[1]; 
      currentParts.push({
        inlineData: {
          mimeType: "image/jpeg", // Assuming JPEG for simplicity, or detect from string
          data: base64Data
        }
      });
      currentParts.push({ text: "Analyze this image specifically for plant diseases or issues. " + currentMessage });
    } else {
      currentParts.push({ text: currentMessage });
    }

    contents.push({ role: 'user', parts: currentParts });

    const response = await ai.models.generateContent({
      model: modelId,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        tools: [{ googleMaps: {} }], // Enable grounding for location queries outside our hardcoded list
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the AgriSmart server. Please check your connection.";
  }
};