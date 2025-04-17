"use client"

import { useEffect, useState } from "react"
import { useEmotionStore } from "@/lib/store"
import { ChartContainer } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function EmotionGraph() {
  const { emotionHistory } = useEmotionStore()
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (emotionHistory.length === 0) return

    const formattedData = emotionHistory.map((entry) => {
      const time = entry.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

      return {
        time,
        ...entry.emotions,
      }
    })

    setChartData(formattedData)
  }, [emotionHistory])

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-700/20 rounded-lg">
        <p className="text-slate-400">Start emotion detection to see your trends</p>
      </div>
    )
  }

  return (
    <div className="h-80">
      <ChartContainer
        config={{
          happy: {
            label: "Happy",
            color: "hsl(54, 100%, 50%)",
          },
          sad: {
            label: "Sad",
            color: "hsl(210, 100%, 50%)",
          },
          angry: {
            label: "Angry",
            color: "hsl(0, 100%, 50%)",
          },
          fear: {
            label: "Fear",
            color: "hsl(270, 100%, 50%)",
          },
          surprise: {
            label: "Surprise",
            color: "hsl(330, 100%, 50%)",
          },
          neutral: {
            label: "Neutral",
            color: "hsl(0, 0%, 70%)",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value * 100}%`}
              domain={[0, 1]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "0.5rem",
                color: "#f8fafc",
              }}
              formatter={(value: number) => [`${(value * 100).toFixed(0)}%`]}
            />
            <Legend />
            <Line type="monotone" dataKey="happy" stroke="var(--color-happy)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="sad" stroke="var(--color-sad)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="angry" stroke="var(--color-angry)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="fear" stroke="var(--color-fear)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="surprise" stroke="var(--color-surprise)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="neutral" stroke="var(--color-neutral)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

