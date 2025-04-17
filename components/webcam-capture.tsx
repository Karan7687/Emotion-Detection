"use client"

import { useRef, useEffect } from "react"
import * as tf from "@tensorflow/tfjs"
import * as blazeface from "@tensorflow-models/blazeface"
import { useEmotionStore } from "@/lib/store"
import { analyzeEmotion } from "@/lib/emotion-detection"
import { calculateStressLevel } from "@/lib/stress-detection"

export default function WebcamCapture() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isDetecting, setEmotions, addEmotionHistory, setStressLevel } = useEmotionStore()

  // Load TensorFlow.js and Blazeface model
  useEffect(() => {
    let model: blazeface.BlazeFaceModel

    const loadModel = async () => {
      await tf.ready()
      model = await blazeface.load()
      console.log("Face detection model loaded")
    }

    loadModel()

    return () => {
      // Cleanup
    }
  }, [])

  // Setup webcam
  useEffect(() => {
    const setupWebcam = async () => {
      if (!videoRef.current) return

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        })

        videoRef.current.srcObject = stream
      } catch (error) {
        console.error("Error accessing webcam:", error)
      }
    }

    setupWebcam()

    return () => {
      // Stop webcam stream on cleanup
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  // Detect faces and emotions
  useEffect(() => {
    let animationFrameId: number
    let lastProcessTime = 0
    const processInterval = 500 // Process every 500ms

    const detectFaces = async (model: blazeface.BlazeFaceModel) => {
      if (!videoRef.current || !canvasRef.current || !model || !isDetecting) return

      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (!ctx || video.paused || video.ended) return

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const now = Date.now()
      if (now - lastProcessTime > processInterval) {
        // Process frame for emotion detection
        try {
          // Get predictions from Blazeface
          const predictions = await model.estimateFaces(video, false)

          if (predictions.length > 0) {
            // Draw rectangles around detected faces
            predictions.forEach((prediction) => {
              const start = prediction.topLeft as [number, number]
              const end = prediction.bottomRight as [number, number]
              const size = [end[0] - start[0], end[1] - start[1]]

              ctx.strokeStyle = "#00FF00"
              ctx.lineWidth = 2
              ctx.strokeRect(start[0], start[1], size[0], size[1])
            })

            // Extract face region and send for emotion analysis
            const prediction = predictions[0] // Use the first face
            const start = prediction.topLeft as [number, number]
            const end = prediction.bottomRight as [number, number]

            // Create a temporary canvas to extract the face
            const tempCanvas = document.createElement("canvas")
            const tempCtx = tempCanvas.getContext("2d")

            if (tempCtx) {
              const width = end[0] - start[0]
              const height = end[1] - start[1]

              tempCanvas.width = width
              tempCanvas.height = height

              // Draw the face region to the temporary canvas
              tempCtx.drawImage(video, start[0], start[1], width, height, 0, 0, width, height)

              // Convert to base64 and send for analysis
              const faceImageData = tempCanvas.toDataURL("image/jpeg")

              // Analyze emotions
              const emotions = await analyzeEmotion(faceImageData)
              if (emotions) {
                setEmotions(emotions)
                addEmotionHistory(emotions)

                // Calculate stress level
                const stressLevel = calculateStressLevel(emotions, predictions[0])
                setStressLevel(stressLevel)
              }
            }
          }

          lastProcessTime = now
        } catch (error) {
          console.error("Error during face detection:", error)
        }
      }

      // Continue detection loop
      animationFrameId = requestAnimationFrame(() => detectFaces(model))
    }

    if (isDetecting) {
      const startDetection = async () => {
        const model = await blazeface.load()
        detectFaces(model)
      }

      startDetection()
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isDetecting, setEmotions, addEmotionHistory, setStressLevel])

  return (
    <div className="relative w-full max-w-md mx-auto">
      <video ref={videoRef} autoPlay playsInline muted className="w-full rounded-lg" style={{ display: "block" }} />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full rounded-lg" />
    </div>
  )
}

