"use client"

import { useEffect, useState } from "react"
import WebcamCapture from "./webcam-capture"
import EmotionDisplay from "./emotion-display"
import EmotionGraph from "./emotion-graph"
import MusicRecommendation from "./music-recommendation"
import StressDetection from "./stress-detection"
import EmotionChatbot from "./emotion-chatbot"
import { useEmotionStore } from "@/lib/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmotionDetectionApp() {
  const [isClient, setIsClient] = useState(false)
  const { emotions, isDetecting, toggleDetection } = useEmotionStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">AI Emotion Detection & Mood Analysis</h1>
        <p className="text-xl text-slate-300">
          Analyze your emotions in real-time and get personalized recommendations
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Webcam Feed</CardTitle>
              <CardDescription className="text-slate-400">Real-time emotion detection</CardDescription>
            </CardHeader>
            <CardContent>
              <WebcamCapture />
              <div className="mt-4 flex justify-center">
                <button
                  onClick={toggleDetection}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isDetecting ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {isDetecting ? "Stop Detection" : "Start Detection"}
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 mt-6">
            <CardHeader>
              <CardTitle>Current Emotions</CardTitle>
              <CardDescription className="text-slate-400">Confidence scores for detected emotions</CardDescription>
            </CardHeader>
            <CardContent>
              <EmotionDisplay />
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 mt-6">
            <CardHeader>
              <CardTitle>Stress Level</CardTitle>
              <CardDescription className="text-slate-400">Based on facial tension and blink rate</CardDescription>
            </CardHeader>
            <CardContent>
              <StressDetection />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="graph" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="graph">Emotion Trends</TabsTrigger>
              <TabsTrigger value="music">Music Recommendations</TabsTrigger>
              <TabsTrigger value="chat">Emotion Chatbot</TabsTrigger>
            </TabsList>
            <TabsContent value="graph">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>Emotion Trends Over Time</CardTitle>
                  <CardDescription className="text-slate-400">Track how your emotions change</CardDescription>
                </CardHeader>
                <CardContent>
                  <EmotionGraph />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="music">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>Music Based on Your Mood</CardTitle>
                  <CardDescription className="text-slate-400">Personalized recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <MusicRecommendation />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chat">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>Emotion-Aware Chatbot</CardTitle>
                  <CardDescription className="text-slate-400">
                    Chat with an AI that responds to your mood
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmotionChatbot />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

