"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  PictureInPicture,
  SkipBack,
  SkipForward,
  FileText,
  Sparkles,
  Brain,
  Lightbulb,
  Target,
  Zap,
  ChevronLeft,
  Maximize2,
  Minimize2,
} from "lucide-react"

interface VideoPlayerPanelProps {
  compact?: boolean
  collapsed?: boolean
  onToggle?: () => void
}

const highlights = [
  { time: "2:15", title: "React Hooks Introduction", type: "concept", icon: Brain },
  { time: "5:30", title: "useState Example", type: "example", icon: Lightbulb },
  { time: "8:45", title: "useEffect Deep Dive", type: "concept", icon: Brain },
  { time: "12:20", title: "Custom Hook Demo", type: "demo", icon: Zap },
  { time: "15:10", title: "Best Practices", type: "tip", icon: Target },
]

const transcript = [
  {
    time: "0:00",
    text: "Welcome to this comprehensive tutorial on React Hooks, where we'll explore modern React development.",
  },
  {
    time: "0:15",
    text: "In this video, we'll dive deep into useState, useEffect, and custom hooks with practical examples.",
  },
  { time: "0:30", text: "Let's start with the fundamentals of state management in React functional components." },
  {
    time: "2:15",
    text: "React Hooks were introduced in React 16.8 as a revolutionary way to use state and lifecycle methods...",
  },
  { time: "5:30", text: "Here's a practical example of useState in action with real-world scenarios..." },
]

export function VideoPlayerPanel({ compact = false, collapsed = false, onToggle }: VideoPlayerPanelProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(1200)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getHighlightColor = (type: string) => {
    switch (type) {
      case "concept":
        return "bg-gradient-to-r from-blue-500 to-blue-600"
      case "example":
        return "bg-gradient-to-r from-green-500 to-green-600"
      case "demo":
        return "bg-gradient-to-r from-purple-500 to-purple-600"
      case "tip":
        return "bg-gradient-to-r from-orange-500 to-orange-600"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  return (
    <TooltipProvider>
      <div className={`flex flex-col h-full transition-all duration-300 ${compact ? "p-3" : "p-8"}`}>
        {/* Panel Header with Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Play className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Video Player</h3>
              <p className="text-xs text-muted-foreground">React Hooks Mastery</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg"
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</TooltipContent>
            </Tooltip>

            {onToggle && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggle}
                    className="hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="flex items-center space-x-2">
                  <span>Collapse Video Player</span>
                  <Badge variant="outline" className="text-xs">
                    Ctrl+Shift+V
                  </Badge>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Video Player */}
        <Card
          className={`relative overflow-hidden shadow-2xl border-0 transition-all duration-300 ${
            isFullscreen ? "fixed inset-4 z-50" : compact ? "aspect-video mb-4" : "aspect-video mb-6"
          }`}
        >
          <div
            ref={videoRef}
            className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-xl flex items-center justify-center relative overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-float"></div>
              <div
                className="absolute bottom-10 right-10 w-24 h-24 bg-purple-500 rounded-full blur-2xl animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 w-16 h-16 bg-indigo-500 rounded-full blur-xl animate-pulse-slow"
                style={{ animationDelay: "4s" }}
              ></div>
            </div>

            <div className="text-white text-center z-10">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto border border-white/20 shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                  {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10 ml-1" />}
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse-slow"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                React Hooks Mastery
              </h3>
              <p className="text-sm text-blue-200/80">Advanced React Development Tutorial</p>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Enhanced
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">Interactive</Badge>
              </div>
            </div>
          </div>

          {/* Enhanced Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
            {/* Progress Bar with Enhanced Highlights */}
            <div className="relative mb-4">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-blue-400 [&_[role=slider]]:shadow-lg"
                onValueChange={(value) => setCurrentTime(value[0])}
              />
              {/* Enhanced highlight markers */}
              {highlights.map((highlight, index) => {
                const timeInSeconds =
                  Number.parseInt(highlight.time.split(":")[0]) * 60 + Number.parseInt(highlight.time.split(":")[1])
                const position = (timeInSeconds / duration) * 100
                return (
                  <div
                    key={index}
                    className={`absolute top-0 w-2 h-3 ${getHighlightColor(highlight.type)} rounded-full transform -translate-y-1 shadow-lg cursor-pointer hover:scale-125 transition-transform`}
                    style={{ left: `${position}%` }}
                    title={highlight.title}
                  />
                )
              })}
            </div>

            {/* Enhanced Control Buttons */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 rounded-full w-12 h-12"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full w-10 h-10">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full w-10 h-10">
                  <SkipForward className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-3 ml-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={100}
                    step={1}
                    className="w-24 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3"
                    onValueChange={(value) => setVolume(value[0])}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium bg-black/30 px-3 py-1 rounded-full">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full w-10 h-10">
                  <PictureInPicture className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 rounded-full w-10 h-10"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {!compact && !isFullscreen && (
          <>
            {/* Enhanced AI Highlights */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                  AI-Generated Highlights
                </h3>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Smart Learning</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {highlights.map((highlight, index) => {
                  const IconComponent = highlight.icon
                  return (
                    <Card
                      key={index}
                      className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900"
                      onClick={() => {
                        const timeInSeconds =
                          Number.parseInt(highlight.time.split(":")[0]) * 60 +
                          Number.parseInt(highlight.time.split(":")[1])
                        setCurrentTime(timeInSeconds)
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getHighlightColor(highlight.type)}`}>
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs font-medium">
                              {highlight.time}
                            </Badge>
                            <Badge className={`text-xs ${getHighlightColor(highlight.type)} text-white border-0`}>
                              {highlight.type}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium mt-1">{highlight.title}</p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Enhanced Transcript */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Interactive Transcript</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranscript(!showTranscript)}
                className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                {showTranscript ? "Hide" : "Show"} Transcript
              </Button>
            </div>

            {showTranscript && (
              <Card className="flex-1 p-6 overflow-y-auto border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900">
                <div className="space-y-3">
                  {transcript.map((line, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer transition-all duration-200 hover:shadow-md group"
                      onClick={() => {
                        const timeInSeconds =
                          Number.parseInt(line.time.split(":")[0]) * 60 + Number.parseInt(line.time.split(":")[1])
                        setCurrentTime(timeInSeconds)
                      }}
                    >
                      <Badge
                        variant="secondary"
                        className="text-xs min-w-fit font-medium group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors"
                      >
                        {line.time}
                      </Badge>
                      <p className="text-sm leading-relaxed">{line.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </TooltipProvider>
  )
}
