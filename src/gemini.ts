import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI((import.meta as any).env.VITE_API_KEY);
const shouldMockLLM = (import.meta as any).env.VITE_MOCK_LLM === "true";

export async function gemini(prompt: string = "Tell me a joke") {
  if (!shouldMockLLM) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } else {
    return Promise.resolve("Mock response from LLM.");
  }
}
