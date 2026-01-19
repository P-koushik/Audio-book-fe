"use client";

import * as React from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, Music } from "lucide-react";

import { cn } from "@/lib/utils";

type AudioPlayerProps = {
  title?: string;
  artist?: string;
  durationSeconds?: number;
  className?: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function Audioplayer({
  title = "Chapter 1",
  artist = "Unknown author",
  durationSeconds = 6 * 60 + 12,
  className,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [positionSeconds, setPositionSeconds] = React.useState(0);
  const [volume, setVolume] = React.useState(80);

  const positionPercent =
    durationSeconds > 0 ? (positionSeconds / durationSeconds) * 100 : 0;

  return (
    <div
      className={cn(
        // ✅ important changes: h-full (not h-screen), smaller padding, no huge max widths
        "h-full w-full bg-background p-4 md:p-6 flex flex-col gap-4",
        className
      )}
      aria-label="Audio player"
    >
      {/* Top/Middle: Art + Info */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4">
        {/* Smaller album art to avoid layout shifting */}
        <div className="aspect-square w-40 md:w-56 bg-muted rounded-2xl flex items-center justify-center shadow-sm">
          <Music className="size-12 opacity-20" />
        </div>

        {/* Title & Artist */}
        <div className="text-center space-y-1">
          <div className="text-lg md:text-xl font-bold truncate max-w-[18rem]">
            {title}
          </div>
          <div className="text-sm md:text-base opacity-70 truncate max-w-[18rem]">
            {artist}
          </div>
        </div>
      </div>

      {/* Bottom: Controls */}
      <div className="flex flex-col gap-4">
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
            className="inline-flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
            aria-label={isPlaying ? "Pause" : "Play"}
            aria-pressed={isPlaying}
            onClick={() => setIsPlaying((v) => !v)}
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
        <div className="flex items-center justify-center gap-3">
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
  );
}
