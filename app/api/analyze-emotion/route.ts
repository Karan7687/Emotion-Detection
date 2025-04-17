import { type NextRequest, NextResponse } from "next/server"

// Mock emotion detection response for demo purposes
// In a real app, this would call the DeepFace API
export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Generate random emotion values for demo
    // In a real app, this would be the result from DeepFace API
    const emotions = {
      angry: Math.random() * 0.2,
      disgust: Math.random() * 0.1,
      fear: Math.random() * 0.15,
      happy: Math.random() * 0.5,
      sad: Math.random() * 0.3,
      surprise: Math.random() * 0.25,
      neutral: Math.random() * 0.4,
    }

    // Normalize values to sum to 1
    const total = Object.values(emotions).reduce((sum, val) => sum + val, 0)
    const normalizedEmotions = Object.fromEntries(Object.entries(emotions).map(([key, value]) => [key, value / total]))

    return NextResponse.json({ emotions: normalizedEmotions })
  } catch (error) {
    console.error("Error processing emotion analysis:", error)
    return NextResponse.json({ error: "Failed to analyze emotions" }, { status: 500 })
  }
}

