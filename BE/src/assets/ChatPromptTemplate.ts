import dotenv from "dotenv";
dotenv.config();
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: process.env.GOOGLE_API_KEY
});

export default async function ChatWithPromt(mode: String) {
    const systemTemplate = `
    You are a chatbot and your name is {name},    
    If not then reply directly
    `;
    const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", systemTemplate],
        ["user", "{text}"],
    ]);

    const promptValue = await promptTemplate.invoke({
        name: "Abhay",
        text: "Why Orange color is red sometimes ?",
    });


    if (mode === "stream") {
        const stream = await model.stream(promptValue.toChatMessages());
        for await (const chunk of stream) {
            console.log(`${chunk.content}|`);
        }
    } else {
        const response = await model.invoke(promptValue.toChatMessages());
        console.log("🚀 ~ main ~ response.content:--------------------->", response.content)
    }
}


