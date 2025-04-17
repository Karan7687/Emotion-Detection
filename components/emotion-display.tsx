"use client"

import { useEmotionStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"

export default function EmotionDisplay() {
  const { emotions, dominantEmotion } = useEmotionStore()

  const emotionColors = {
    angry: "bg-red-500",
    disgust: "bg-green-700",
    fear: "bg-purple-600",
    happy: "bg-yellow-500",
    sad: "bg-blue-500",
    surprise: "bg-pink-500",
    neutral: "bg-gray-500",
  }

  const emotionEmojis = {
    angry: "😠",
    disgust: "🤢",
    fear: "😨",
    happy: "😄",
    sad: "😢",
    surprise: "😲",
    neutral: "😐",
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">
          {dominantEmotion ? emotionEmojis[dominantEmotion as keyof typeof emotionEmojis] : "😐"}
        </div>
        <div className="text-xl font-medium capitalize">{dominantEmotion || "Neutral"}</div>
      </div>

      {Object.entries(emotions).map(([emotion, value]) => (
        <div key={emotion} className="space-y-1">
          <div className="flex justify-between">
            <span className="text-sm font-medium capitalize">{emotion}</span>
            <span className="text-sm font-medium">{Math.round(value * 100)}%</span>
          </div>
          <Progress value={value * 100} className={`h-2 ${emotionColors[emotion as keyof typeof emotionColors]}`} />
        </div>
      ))}
    </div>
  )
}

