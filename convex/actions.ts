import { v } from "convex/values";
import { action } from "./_generated/server";
import OpenAI from "openai";
import { internal } from "./_generated/api";
import { requireUser } from "./helpers";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const systemPrompt = `
You are a task management assistant. Generate a to-do list in JSON format based on the user's instructions. Each to-do item should include a title and a brief description. The JSON should be formatted as follows:

{
  "todos": [
    {
      "title": "string", 
      "description": "string"
    }
  ]
}

Make sure the JSON is valid and properly formatted. Do not return anything outside of the JSON.
`



export const generateTodos = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireUser(ctx);
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [
        { 
          role: "system", 
          content: systemPrompt 
        },
        {
          role: "user",
          content: `Prompt: ${args.prompt}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const content = JSON.parse(response.choices[0].message.content!) as {
      todos: { title: string, description: string }[]
    };
    await ctx.runMutation(internal.functions.createManyTodos, {
      todos: content.todos,
      userId: user.tokenIdentifier,
    });
    
    return content.todos;
  },
});