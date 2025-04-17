import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { message, emotion } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // For demo purposes, if OpenAI API key is not available, use mock responses
    if (!process.env.OPENAI_API_KEY) {
      return mockChatbotResponse(message, emotion)
    }

    // Create a system prompt based on the detected emotion
    let systemPrompt = "You are an empathetic AI assistant that responds to users based on their emotional state."

    switch (emotion) {
      case "happy":
        systemPrompt += " The user seems happy. Match their positive energy and enthusiasm."
        break
      case "sad":
        systemPrompt += " The user seems sad. Be compassionate and supportive. Offer encouragement or comfort."
        break
      case "angry":
        systemPrompt +=
          " The user seems angry. Be calm and understanding. Help them process their feelings constructively."
        break
      case "fear":
        systemPrompt +=
          " The user seems anxious or fearful. Be reassuring and provide a sense of safety and perspective."
        break
      case "surprise":
        systemPrompt += " The user seems surprised. Acknowledge their reaction and help them process new information."
        break
      default:
        systemPrompt += " Respond in a balanced, helpful manner."
    }

    // Generate response using OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: message,
      system: systemPrompt,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error processing chatbot request:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

// Mock responses for demo purposes when OpenAI API key is not available
function mockChatbotResponse(message: string, emotion: string) {
  let response = ""

  // Simple keyword matching for demo
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    response = "Hello there! How can I help you today?"
  } else if (lowerMessage.includes("how are you")) {
    response = "I'm just a digital assistant, but I'm here and ready to help you!"
  } else if (lowerMessage.includes("thank")) {
    response = "You're welcome! I'm glad I could help."
  } else if (lowerMessage.includes("bye")) {
    response = "Goodbye! Take care of yourself."
  } else {
    // Emotion-based responses
    switch (emotion) {
      case "happy":
        response = "It's great to see you're in a good mood! How can I make your day even better?"
        break
      case "sad":
        response =
          "I notice you might be feeling down. Remember that it's okay to feel this way, and things will get better. Is there something specific you'd like to talk about?"
        break
      case "angry":
        response =
          "I understand you might be feeling frustrated. Taking deep breaths can help. Would you like to talk about what's bothering you?"
        break
      case "fear":
        response =
          "It seems like you might be anxious about something. Remember that you're not alone, and many challenges are temporary. Can I help you work through your concerns?"
        break
      case "surprise":
        response = "Wow! Unexpected things can be quite startling. Would you like to discuss what surprised you?"
        break
      default:
        response = "I'm here to chat about whatever's on your mind. What would you like to talk about today?"
    }
  }

  return NextResponse.json({ response })
}

