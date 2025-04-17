"use client"

import { useEffect, useState } from "react"
import { useEmotionStore } from "@/lib/store"
import type { MusicRecommendation } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward } from "lucide-react"

export default function MusicRecommendationComponent() {
  const { dominantEmotion } = useEmotionStore()
  const [recommendations, setRecommendations] = useState<MusicRecommendation[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`/api/music-recommendations?emotion=${dominantEmotion}`)
        if (response.ok) {
          const data = await response.json()
          setRecommendations(data.recommendations)
          setCurrentIndex(0)
          setIsPlaying(false)
        }
      } catch (error) {
        console.error("Error fetching music recommendations:", error)
      }
    }

    if (dominantEmotion) {
      fetchRecommendations()
    }
  }, [dominantEmotion])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length)
    setIsPlaying(true)
  }

  if (recommendations.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-700/20 rounded-lg">
        <p className="text-slate-400">Start emotion detection to get music recommendations</p>
      </div>
    )
  }

  const currentSong = recommendations[currentIndex]

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-medium">Music for your {dominantEmotion} mood</h3>
        <p className="text-slate-400">
          {dominantEmotion === "happy"
            ? "Upbeat songs to keep your spirits high"
            : dominantEmotion === "sad"
              ? "Soothing melodies to comfort you"
              : dominantEmotion === "angry"
                ? "Calming tracks to ease your mind"
                : dominantEmotion === "fear"
                  ? "Relaxing music to reduce anxiety"
                  : dominantEmotion === "surprise"
                    ? "Interesting tunes for your curious mood"
                    : "Music that matches your current emotion"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((song, index) => (
          <Card
            key={index}
            className={`bg-slate-700 border-slate-600 ${index === currentIndex ? "ring-2 ring-primary" : ""}`}
          >
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={song.thumbnailUrl || "/placeholder.svg"}
                  alt={song.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{song.title}</h4>
                <p className="text-xs text-slate-400 truncate">{song.artist}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="icon" onClick={handlePlayPause}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

