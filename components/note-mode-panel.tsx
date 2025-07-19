"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Save, Download, Sparkles, ImageIcon, FileText, Lightbulb, Clock, Brain, Zap, ChevronRight } from "lucide-react"

interface NoteModeProps {
  collapsed?: boolean
  onToggle?: () => void
}

const aiSuggestions = [
  { text: "• React Hooks revolutionized functional components", icon: Brain },
  { text: "• useState manages local component state", icon: Zap },
  { text: "• useEffect handles side effects and lifecycle", icon: Lightbulb },
  { text: "• Custom hooks promote code reusability", icon: Sparkles },
  { text: "• Always follow the Rules of Hooks", icon: FileText },
]

export function NoteModePanel({ collapsed = false, onToggle }: NoteModeProps) {
  const [notes, setNotes] = useState(`# React Hooks Tutorial Notes

## Introduction (0:00 - 2:15)
- React Hooks introduced in version 16.8
- Allows state and lifecycle in functional components

## useState Hook (2:15 - 5:30)
`)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const insertFrameSnapshot = () => {
    const snapshot = "\n\n![Video Frame](frame-snapshot-5-30.png)\n*Frame from 5:30 - useState example*\n\n"
    setNotes((prev) => prev + snapshot)
  }

  const generateAINotes = () => {
    const aiGenerated = `

## AI-Generated Summary
Based on the video content, here are the key points:

${aiSuggestions.map((s) => s.text).join("\n")}

## Code Examples
\`\`\`javascript
const [count, setCount] = useState(0);

useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

## Best Practices
1. Always call hooks at the top level
2. Use descriptive names for state variables
3. Separate concerns with multiple useState calls
`
    setNotes((prev) => prev + aiGenerated)
  }

  const exportNotes = (format: string) => {
    console.log(`Exporting notes as ${format}`)
  }

  if (collapsed) {
    return (
      <TooltipProvider>
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                onClick={onToggle}
                className="flex flex-col items-center space-y-2 p-6 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <ChevronRight className="h-6 w-6" />
                <FileText className="h-5 w-5" />
                <span className="text-xs font-medium">Notes</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="flex items-center space-x-2">
              <span>Expand Smart Notes</span>
              <Badge variant="outline" className="text-xs">
                Ctrl+Shift+R
              </Badge>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950">
        {/* Enhanced Header */}
        <div className="p-6 border-b border-border/50 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Smart Notes</h3>
                <p className="text-sm text-green-100">AI-powered note taking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => exportNotes("pdf")}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-white text-green-600 hover:bg-gray-100">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
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
                    <span>Collapse Smart Notes</span>
                    <Badge variant="outline" className="text-xs">
                      Ctrl+Shift+R
                    </Badge>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced AI Suggestions Panel */}
        {showSuggestions && (
          <Card className="m-6 p-6 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100">AI Suggestions</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Click to add to your notes</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSuggestions(false)}
                className="text-blue-600 hover:bg-blue-100 rounded-full w-8 h-8 p-0"
              >
                ×
              </Button>
            </div>
            <div className="grid gap-3">
              {aiSuggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer transition-all duration-200 hover:shadow-md group"
                    onClick={() => setNotes((prev) => prev + "\n" + suggestion.text)}
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-blue-800 dark:text-blue-200 font-medium">{suggestion.text}</span>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {/* Enhanced Notes Editor */}
        <div className="flex-1 p-6">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Start taking notes... Use ## for headings, ** for bold, and [] for links"
            className="w-full h-full resize-none font-mono text-sm border-2 focus:border-blue-400 transition-colors shadow-inner"
          />
        </div>

        {/* Enhanced Action Buttons */}
        <div className="p-6 border-t border-border/50 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
          <div className="flex flex-wrap gap-3 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={insertFrameSnapshot}
              className="hover:bg-blue-50 hover:border-blue-300 transition-colors bg-transparent"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Insert Frame
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={generateAINotes}
              className="hover:bg-purple-50 hover:border-purple-300 transition-colors bg-transparent"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Notes
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-green-50 hover:border-green-300 transition-colors bg-transparent"
            >
              <Clock className="h-4 w-4 mr-2" />
              Add Timestamp
            </Button>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" size="sm" onClick={() => exportNotes("markdown")} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Markdown
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportNotes("pdf")} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportNotes("docx")} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Word
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
