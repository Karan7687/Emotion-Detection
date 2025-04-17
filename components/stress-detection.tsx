"use client"

import { useEmotionStore } from "@/lib/store"

export default function StressDetection() {
  const { stressLevel } = useEmotionStore()

  const getStressColor = () => {
    switch (stressLevel) {
      case "low":
        return "bg-green-500"
      case "normal":
        return "bg-blue-500"
      case "high":
        return "bg-orange-500"
      case "very-high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStressEmoji = () => {
    switch (stressLevel) {
      case "low":
        return "😌"
      case "normal":
        return "😊"
      case "high":
        return "😓"
      case "very-high":
        return "😰"
      default:
        return "😐"
    }
  }

  const getStressDescription = () => {
    switch (stressLevel) {
      case "low":
        return "You seem very relaxed"
      case "normal":
        return "Your stress level is normal"
      case "high":
        return "You appear to be stressed"
      case "very-high":
        return "You seem highly stressed"
      default:
        return "Calculating stress level..."
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl mb-2">{getStressEmoji()}</div>
      <div className="text-xl font-medium mb-4 capitalize">{stressLevel} Stress</div>
      <div className="w-full bg-slate-700 rounded-full h-4 mb-2">
        <div
          className={`h-4 rounded-full ${getStressColor()}`}
          style={{
            width:
              stressLevel === "low"
                ? "25%"
                : stressLevel === "normal"
                  ? "50%"
                  : stressLevel === "high"
                    ? "75%"
                    : "100%",
          }}
        ></div>
      </div>
      <p className="text-sm text-slate-300">{getStressDescription()}</p>
    </div>
  )
}

