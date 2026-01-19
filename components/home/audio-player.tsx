"use client"

import * as React from "react"
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Music,
} from "lucide-react"

import { cn } from "@/lib/utils"

type AudioPlayerProps = {
  title?: string
  artist?: string
  durationSeconds?: number
  className?: string
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`
}

export default function Audioplayer({
  title = "Chapter 1",
  artist = "Unknown author",
  durationSeconds = 6 * 60 + 12,
  className,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [positionSeconds, setPositionSeconds] = React.useState(0)
  const [volume, setVolume] = React.useState(80)

  const positionPercent =
    durationSeconds > 0 ? (positionSeconds / durationSeconds) * 100 : 0

  return (
    <div
      className={cn(
        // Layout: Full screen height, Flex Column, Centered horizontally
        "w-full h-screen flex flex-col justify-between p-6 md:p-12 bg-background",
        className
      )}
      aria-label="Audio player"
    >
      {/* 1. Top/Middle Section: Album Art & Info */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 min-h-0">
        {/* Album Art Placeholder */}
        <div className="aspect-square w-full max-w-sm bg-muted rounded-2xl flex items-center justify-center shadow-sm">
          <Music className="size-20 opacity-20" />
        </div>

        {/* Title & Artist */}
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold truncate px-4">{title}</div>
          <div className="text-lg opacity-70 truncate px-4">{artist}</div>
        </div>
      </div>

      {/* 2. Bottom Section: Controls */}
      <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto mt-8">
        
        {/* Progress Bar */}
        <div className="flex flex-col gap-2">
          <input
            id="audio-position"
            type="range"
            min={0}
            max={durationSeconds}
            value={positionSeconds}
            onChange={(e) => setPositionSeconds(Number(e.target.value))}
            className="w-full h-2 rounded-lg cursor-pointer accent-primary"
            aria-valuetext={`${Math.round(positionPercent)} percent`}
          />
          <div className="flex justify-between text-xs font-medium tabular-nums opacity-70">
            <span>{formatTime(positionSeconds)}</span>
            <span>{formatTime(durationSeconds)}</span>
          </div>
        </div>

        {/* Playback Buttons */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <button
            type="button"
            className="p-2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Previous"
          >
            <SkipBack className="size-6" />
          </button>

          <button
            type="button"
            className="flex items-center justify-center size-13 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
            aria-label={isPlaying ? "Pause" : "Play"}
            aria-pressed={isPlaying}
            onClick={() => setIsPlaying((value) => !value)}
          >
            {isPlaying ? (
              <Pause className="size-6 fill-current" />
            ) : (
              <Play className="size-6 fill-current ml-1" />
            )}
          </button>

          <button
            type="button"
            className="p-2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Next"
          >
            <SkipForward className="size-6" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <Volume2 className="size-5 opacity-70" />
          <input
            id="audio-volume"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-32 md:w-48 h-1.5 accent-current opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  )
}