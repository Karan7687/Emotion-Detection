export interface EmotionData {
  angry: number
  disgust: number
  fear: number
  happy: number
  sad: number
  surprise: number
  neutral: number
}

export interface EmotionHistory {
  timestamp: Date
  emotions: EmotionData
}

export type StressLevel = "low" | "normal" | "high" | "very-high"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface MusicRecommendation {
  title: string
  artist: string
  url: string
  thumbnailUrl: string
}

