import type { EmotionData, StressLevel } from "./types"

export function calculateStressLevel(emotions: EmotionData, faceData: any): StressLevel {
  // Calculate stress based on negative emotions
  const negativeEmotions = emotions.angry + emotions.fear + emotions.sad + emotions.disgust

  // In a real app, we would analyze blink rate and facial tension
  // For this demo, we'll use a simplified approach based on emotions

  if (negativeEmotions > 0.7) {
    return "very-high"
  } else if (negativeEmotions > 0.5) {
    return "high"
  } else if (negativeEmotions > 0.3) {
    return "normal"
  } else {
    return "low"
  }
}

