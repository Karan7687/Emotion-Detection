import type { EmotionData } from "./types"

export async function analyzeEmotion(imageData: string): Promise<EmotionData | null> {
  try {
    // Remove the data URL prefix
    const base64Image = imageData.split(",")[1]

    const response = await fetch("/api/analyze-emotion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Image }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return data.emotions
  } catch (error) {
    console.error("Error analyzing emotion:", error)
    return null
  }
}

