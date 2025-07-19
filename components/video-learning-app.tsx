"use client"

import { useState, useCallback, useEffect } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  Play,
  MessageCircle,
  FileText,
  FolderOpen,
  Settings,
  Sparkles,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { VideoPlayerPanel } from "@/components/video-player-panel"
import { ChatPanel } from "@/components/chat-panel"
import { NoteModePanel } from "@/components/note-mode-panel"
import { MyNotesPanel } from "@/components/my-notes-panel"
import { SettingsPanel } from "@/components/settings-panel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ActiveMode = "video" | "questions" | "notes" | "my-notes" | "settings"

interface PanelState {
  videoPlayer: boolean
  rightPanel: boolean
}

const sidebarItems = [
  {
    id: "video",
    icon: Play,
    label: "Video Mode",
    description: "Focus on learning",
    color: "text-blue-600 dark:text-blue-400",
    shortcut: "1",
  },
  {
    id: "questions",
    icon: MessageCircle,
    label: "AI Assistant",
    description: "Ask questions",
    color: "text-purple-600 dark:text-purple-400",
    shortcut: "2",
  },
  {
    id: "notes",
    icon: FileText,
    label: "Smart Notes",
    description: "AI-powered notes",
    color: "text-green-600 dark:text-green-400",
    shortcut: "3",
  },
  {
    id: "my-notes",
    icon: FolderOpen,
    label: "My Library",
    description: "Saved content",
    color: "text-orange-600 dark:text-orange-400",
    shortcut: "4",
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    description: "Preferences",
    color: "text-gray-600 dark:text-gray-400",
    shortcut: "5",
  },
]

export function VideoLearningApp() {
  const [activeMode, setActiveMode] = useState<ActiveMode>("video")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [panelStates, setPanelStates] = useState<PanelState>({
    videoPlayer: true,
    rightPanel: true,
  })

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + number keys for mode switching
      if ((event.ctrlKey || event.metaKey) && event.key >= "1" && event.key <= "5") {
        event.preventDefault()
        const modeIndex = Number.parseInt(event.key) - 1
        setActiveMode(sidebarItems[modeIndex].id as ActiveMode)
      }

      // Ctrl/Cmd + B for sidebar toggle
      if ((event.ctrlKey || event.metaKey) && event.key === "b") {
        event.preventDefault()
        setSidebarCollapsed(!sidebarCollapsed)
      }

      // Ctrl/Cmd + Shift + V for video panel toggle
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "V") {
        event.preventDefault()
        togglePanel("videoPlayer")
      }

      // Ctrl/Cmd + Shift + R for right panel toggle
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "R") {
        event.preventDefault()
        togglePanel("rightPanel")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [sidebarCollapsed])

  const togglePanel = useCallback((panel: keyof PanelState) => {
    setPanelStates((prev) => ({
      ...prev,
      [panel]: !prev[panel],
    }))
  }, [])

  const renderMainContent = () => {
    const hasRightPanel = activeMode === "questions" || activeMode === "notes"

    if (activeMode === "video") {
      return (
        <div className="flex h-full">
          <div className={`transition-all duration-300 ${panelStates.videoPlayer ? "flex-1" : "w-0 overflow-hidden"}`}>
            <VideoPlayerPanel collapsed={!panelStates.videoPlayer} onToggle={() => togglePanel("videoPlayer")} />
          </div>
        </div>
      )
    }

    if (hasRightPanel) {
      return (
        <div className="flex h-full">
          <div className={`transition-all duration-300 ${panelStates.videoPlayer ? "flex-1" : "w-0 overflow-hidden"}`}>
            <VideoPlayerPanel
              compact
              collapsed={!panelStates.videoPlayer}
              onToggle={() => togglePanel("videoPlayer")}
            />
          </div>
          <div
            className={`transition-all duration-300 border-l border-border/50 ${panelStates.rightPanel ? "w-96" : "w-0 overflow-hidden"}`}
          >
            {activeMode === "questions" && (
              <ChatPanel collapsed={!panelStates.rightPanel} onToggle={() => togglePanel("rightPanel")} />
            )}
            {activeMode === "notes" && (
              <NoteModePanel collapsed={!panelStates.rightPanel} onToggle={() => togglePanel("rightPanel")} />
            )}
          </div>
        </div>
      )
    }

    // Full screen modes
    switch (activeMode) {
      case "my-notes":
        return <MyNotesPanel />
      case "settings":
        return <SettingsPanel />
      default:
        return <VideoPlayerPanel />
    }
  }

  return (
    <TooltipProvider>
      <SidebarProvider open={!sidebarCollapsed} onOpenChange={(open) => setSidebarCollapsed(!open)}>
        <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
          <Sidebar
            className={`border-r border-border/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"}`}
          >
            <SidebarHeader className="border-b border-border/50 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div
                className={`flex items-center p-4 transition-all duration-300 ${sidebarCollapsed ? "justify-center" : "space-x-3"}`}
              >
                <div className="relative flex-shrink-0">
                  <GraduationCap className="h-8 w-8" />
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 animate-pulse" />
                </div>
                {!sidebarCollapsed && (
                  <div className="transition-opacity duration-300">
                    <h2 className="text-lg font-bold">EduAI</h2>
                    <p className="text-xs text-blue-100">Smart Learning Platform</p>
                  </div>
                )}
              </div>
            </SidebarHeader>

            <SidebarContent className="p-2">
              <SidebarMenu className="space-y-2">
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          onClick={() => setActiveMode(item.id as ActiveMode)}
                          isActive={activeMode === item.id}
                          className={`
                            w-full justify-start p-4 rounded-xl transition-all duration-200 hover:scale-[1.02]
                            ${sidebarCollapsed ? "justify-center" : ""}
                            ${
                              activeMode === item.id
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                                : "hover:bg-white/60 dark:hover:bg-slate-800/60 hover:shadow-md"
                            }
                          `}
                        >
                          <item.icon
                            className={`h-5 w-5 flex-shrink-0 ${activeMode === item.id ? "text-white" : item.color}`}
                          />
                          {!sidebarCollapsed && (
                            <>
                              <div className="flex flex-col items-start ml-3 min-w-0">
                                <span className="text-sm font-semibold truncate">{item.label}</span>
                                <span
                                  className={`text-xs truncate ${activeMode === item.id ? "text-blue-100" : "text-muted-foreground"}`}
                                >
                                  {item.description}
                                </span>
                              </div>
                              {item.id === "questions" && (
                                <Badge className="ml-auto bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 flex-shrink-0">
                                  AI
                                </Badge>
                              )}
                            </>
                          )}
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {sidebarCollapsed && (
                        <TooltipContent side="right" className="flex items-center space-x-2">
                          <span>{item.label}</span>
                          <Badge variant="outline" className="text-xs">
                            Ctrl+{item.shortcut}
                          </Badge>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>

              {/* Collapse Toggle Button */}
              <div className="absolute bottom-4 left-2 right-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className={`w-full rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200 ${sidebarCollapsed ? "justify-center" : "justify-between"}`}
                    >
                      {!sidebarCollapsed && <span className="text-sm">Collapse</span>}
                      {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center space-x-2">
                    <span>{sidebarCollapsed ? "Expand" : "Collapse"} Sidebar</span>
                    <Badge variant="outline" className="text-xs">
                      Ctrl+B
                    </Badge>
                  </TooltipContent>
                </Tooltip>
              </div>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1 bg-transparent">{renderMainContent()}</SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
