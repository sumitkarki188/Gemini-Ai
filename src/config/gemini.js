import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDZ3XR4YwHddJX_NuNjKJUyP3trdIwUWYM"; // Replace with a secure method
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Use "gemini-1.5-pro" or a valid model version
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1024, // Reduce token limit to avoid API errors
};

async function runChat(prompt) {
  try {
    console.log("Sending request:", { text: prompt }); // Debugging

    // ✅ Use `generateContent` instead of `startChat`
    const result = await model.generateContent(prompt);

    if (result.response && result.response.text) {
      console.log("API Response:", result.response.text());
      return result.response.text();
    } else {
      console.error("Unexpected response format:", result);
      return "Error: Invalid response format";
    }
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    return "Error fetching response";
  }
}

export default runChat;
