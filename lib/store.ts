import { create } from "zustand"
import type { EmotionData, EmotionHistory, StressLevel } from "@/lib/types"

interface EmotionState {
  isDetecting: boolean
  emotions: EmotionData
  emotionHistory: EmotionHistory[]
  stressLevel: StressLevel
  dominantEmotion: string
  toggleDetection: () => void
  setEmotions: (emotions: EmotionData) => void
  addEmotionHistory: (emotions: EmotionData) => void
  setStressLevel: (level: StressLevel) => void
  resetState: () => void
}

const initialEmotions: EmotionData = {
  angry: 0,
  disgust: 0,
  fear: 0,
  happy: 0,
  sad: 0,
  surprise: 0,
  neutral: 0,
}

export const useEmotionStore = create<EmotionState>((set, get) => ({
  isDetecting: false,
  emotions: initialEmotions,
  emotionHistory: [],
  stressLevel: "normal",
  dominantEmotion: "neutral",

  toggleDetection: () => set((state) => ({ isDetecting: !state.isDetecting })),

  setEmotions: (emotions: EmotionData) => {
    const entries = Object.entries(emotions)
    const dominantEmotion = entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0]
    set({ emotions, dominantEmotion })
  },

  addEmotionHistory: (emotions: EmotionData) => {
    const timestamp = new Date()
    set((state) => ({
      emotionHistory: [
        ...state.emotionHistory.slice(-30), // Keep only the last 30 entries
        { timestamp, emotions },
      ],
    }))
  },

  setStressLevel: (level: StressLevel) => set({ stressLevel: level }),

  resetState: () =>
    set({
      emotions: initialEmotions,
      emotionHistory: [],
      stressLevel: "normal",
      dominantEmotion: "neutral",
    }),
}))

