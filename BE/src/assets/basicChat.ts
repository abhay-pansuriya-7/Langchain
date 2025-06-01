import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
dotenv.config();


const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: process.env.GOOGLE_API_KEY
});

export default async function main(mode: String) {

    const messages = [
        new SystemMessage("Your name is AbhayAI, so if some one asks you your name, you should always reply with AbhayAI"),
        new HumanMessage("hi! what is your name?"),
    ];

    if (mode === "stream") {
        const stream = await model.stream(messages);
        for await (const chunk of stream) {
            console.log(`${chunk.content}|`);
        }
    } else {
        const response = await model.invoke(messages);
        console.log("🚀 ~ main ~ response:", response)
        console.log("🚀 ~ main ~ response.content:--------------------->", response.content)
    }
}


