"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Send, Clock, ImageIcon, Sparkles, Brain, MessageSquare, Zap, ChevronRight } from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp?: string
  frameReference?: string
  imageUrl?: string
}

interface ChatPanelProps {
  collapsed?: boolean
  onToggle?: () => void
}

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    type: "user",
    content: "Explain the topic at 3:20",
  },
  {
    id: "2",
    type: "ai",
    content:
      "At 3:20, the video discusses React Hooks, specifically the useState hook. This is a fundamental concept that allows functional components to have state. Here's what's covered:",
    timestamp: "3:20",
    frameReference: "React Hooks Introduction",
    imageUrl: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "3",
    type: "user",
    content: "Can you show me the code example?",
  },
  {
    id: "4",
    type: "ai",
    content:
      "Here's the useState example from the video at 5:30. The code demonstrates how to declare state variables and update them:",
    timestamp: "5:30",
    frameReference: "useState Code Example",
  },
]

const quickQuestions = [
  { text: "Summarize this section", icon: Brain },
  { text: "Explain the code example", icon: Zap },
  { text: "What are the key takeaways?", icon: MessageSquare },
]

export function ChatPanel({ collapsed = false, onToggle }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "I understand your question. Let me analyze the video content and provide you with a detailed explanation...",
        timestamp: "Current",
        frameReference: "AI Analysis",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const jumpToTimestamp = (timestamp: string) => {
    console.log(`Jumping to ${timestamp}`)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950">
        {/* Enhanced Header */}
        <div className="p-6 border-b border-border/50 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">AI Assistant</h3>
                <p className="text-sm text-purple-100">Ask questions about the video content</p>
              </div>
            </div>

            {onToggle && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggle}
                    className="text-white hover:bg-white/20 rounded-lg"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="flex items-center space-x-2">
                  <span>Collapse AI Assistant</span>
                  <Badge variant="outline" className="text-xs">
                    Ctrl+Shift+R
                  </Badge>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Enhanced Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <Card
                  className={`max-w-[85%] p-4 shadow-lg border-0 transition-all duration-200 hover:shadow-xl ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-white dark:bg-slate-800 shadow-xl"
                  }`}
                >
                  {message.type === "ai" && (
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="p-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
                        AI Assistant
                      </Badge>
                    </div>
                  )}

                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {message.type === "ai" && message.timestamp && (
                    <div className="mt-4 space-y-3">
                      {message.imageUrl && (
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            src={message.imageUrl || "/placeholder.svg"}
                            alt="Video frame"
                            className="rounded-lg border w-full max-w-48 shadow-md"
                          />
                          <Badge className="absolute top-2 left-2 text-xs bg-black/70 text-white border-0">
                            <ImageIcon className="h-3 w-3 mr-1" />
                            Frame
                          </Badge>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => jumpToTimestamp(message.timestamp!)}
                          className="text-xs hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Jump to {message.timestamp}
                        </Button>
                        {message.frameReference && (
                          <Badge variant="outline" className="text-xs">
                            {message.frameReference}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <Card className="p-4 bg-white dark:bg-slate-800 shadow-lg border-0">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Enhanced Input */}
        <div className="p-6 border-t border-border/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="flex space-x-3 mb-4">
            <Input
              placeholder="Ask about the video content..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border-2 focus:border-blue-400 transition-colors"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Enhanced Quick Questions */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => {
                const IconComponent = question.icon
                return (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-xs transition-all duration-200 hover:scale-105 flex items-center space-x-1"
                    onClick={() => setInputValue(question.text)}
                  >
                    <IconComponent className="h-3 w-3" />
                    <span>{question.text}</span>
                  </Badge>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
