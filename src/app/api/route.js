// code/story-generator/src/app/api/route.js
import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"
const model = new ChatOpenAI({
openAIApiKey: process.env.OPENAI_API_KEY,
temperature: 0.9
})

const prompt = new PromptTemplate({
  inputVariables: ["subject"],
  template: "Tell me a fortune about {subject}"
})
export async function POST(req) {
  const { subject } = await req.json()
  const formattedPrompt = await prompt.format({
    subject
  })
  const gptResponse = await model.invoke(formattedPrompt)
  return Response.json({data: gptResponse.content})
}