import { type NextRequest, NextResponse } from "next/server"
import type { MusicRecommendation } from "@/lib/types"

// Mock music recommendations for demo purposes
// In a real app, this would call the Spotify or YouTube API
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const emotion = searchParams.get("emotion") || "neutral"

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  let recommendations: MusicRecommendation[] = []

  switch (emotion) {
    case "happy":
      recommendations = [
        {
          title: "Happy",
          artist: "Pharrell Williams",
          url: "https://example.com/happy",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Good Feeling",
          artist: "Flo Rida",
          url: "https://example.com/good-feeling",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Walking on Sunshine",
          artist: "Katrina & The Waves",
          url: "https://example.com/walking-on-sunshine",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Can't Stop the Feeling",
          artist: "Justin Timberlake",
          url: "https://example.com/cant-stop-the-feeling",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
      ]
      break

    case "sad":
      recommendations = [
        {
          title: "Someone Like You",
          artist: "Adele",
          url: "https://example.com/someone-like-you",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Fix You",
          artist: "Coldplay",
          url: "https://example.com/fix-you",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Hurt",
          artist: "Johnny Cash",
          url: "https://example.com/hurt",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "All I Want",
          artist: "Kodaline",
          url: "https://example.com/all-i-want",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
      ]
      break

    case "angry":
      recommendations = [
        {
          title: "Calm Down",
          artist: "Taylor Swift",
          url: "https://example.com/calm-down",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Breathe",
          artist: "Sia",
          url: "https://example.com/breathe",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Let It Go",
          artist: "James Bay",
          url: "https://example.com/let-it-go",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Weightless",
          artist: "Marconi Union",
          url: "https://example.com/weightless",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
      ]
      break

    case "fear":
      recommendations = [
        {
          title: "Don't Worry Be Happy",
          artist: "Bobby McFerrin",
          url: "https://example.com/dont-worry-be-happy",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Somewhere Over The Rainbow",
          artist: "Israel Kamakawiwo'ole",
          url: "https://example.com/somewhere-over-the-rainbow",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Here Comes The Sun",
          artist: "The Beatles",
          url: "https://example.com/here-comes-the-sun",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "What A Wonderful World",
          artist: "Louis Armstrong",
          url: "https://example.com/what-a-wonderful-world",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
      ]
      break

    default:
      recommendations = [
        {
          title: "Imagine",
          artist: "John Lennon",
          url: "https://example.com/imagine",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Bohemian Rhapsody",
          artist: "Queen",
          url: "https://example.com/bohemian-rhapsody",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Hotel California",
          artist: "Eagles",
          url: "https://example.com/hotel-california",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
        {
          title: "Stairway to Heaven",
          artist: "Led Zeppelin",
          url: "https://example.com/stairway-to-heaven",
          thumbnailUrl: "/placeholder.svg?height=64&width=64",
        },
      ]
  }

  return NextResponse.json({ recommendations })
}

