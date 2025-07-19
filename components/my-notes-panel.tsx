"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  Download,
  Sparkles,
  Calendar,
  FileText,
  Video,
  MoreVertical,
  FolderOpen,
  Star,
  Clock,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Note {
  id: string
  title: string
  videoTitle: string
  lastEdited: string
  type: "manual" | "ai-generated"
  preview: string
  tags: string[]
  starred?: boolean
}

const sampleNotes: Note[] = [
  {
    id: "1",
    title: "React Hooks Fundamentals",
    videoTitle: "React Hooks Tutorial",
    lastEdited: "2 hours ago",
    type: "manual",
    preview: "React Hooks revolutionized functional components by allowing state and lifecycle methods...",
    tags: ["react", "hooks", "javascript"],
    starred: true,
  },
  {
    id: "2",
    title: "useState and useEffect Examples",
    videoTitle: "React Hooks Tutorial",
    lastEdited: "1 day ago",
    type: "ai-generated",
    preview: "Key examples of useState for state management and useEffect for side effects...",
    tags: ["react", "useState", "useEffect"],
  },
  {
    id: "3",
    title: "Custom Hooks Best Practices",
    videoTitle: "Advanced React Patterns",
    lastEdited: "3 days ago",
    type: "manual",
    preview: "Custom hooks allow you to extract component logic into reusable functions...",
    tags: ["react", "custom-hooks", "patterns"],
    starred: true,
  },
  {
    id: "4",
    title: "JavaScript ES6 Features",
    videoTitle: "Modern JavaScript Course",
    lastEdited: "1 week ago",
    type: "ai-generated",
    preview: "Arrow functions, destructuring, template literals, and other ES6 features...",
    tags: ["javascript", "es6", "modern"],
  },
]

export function MyNotesPanel() {
  const [notes] = useState<Note[]>(sampleNotes)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "manual" | "ai-generated" | "starred">("all")
  const [sortBy, setSortBy] = useState<"recent" | "title" | "video">("recent")

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesFilter =
        filterType === "all" || note.type === filterType || (filterType === "starred" && note.starred)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "video":
          return a.videoTitle.localeCompare(b.videoTitle)
        default:
          return 0
      }
    })

  const regenerateWithAI = (noteId: string) => {
    console.log(`Regenerating note ${noteId} with AI`)
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Enhanced Header */}
      <div className="p-8 border-b border-border/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
              <FolderOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                My Library
              </h2>
              <p className="text-muted-foreground">Organize and access your learning notes</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />
              {filteredNotes.length} notes
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              {notes.filter((n) => n.starred).length} starred
            </Badge>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes, videos, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 border-2 focus:border-blue-400 transition-colors"
            />
          </div>

          <div className="flex space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 px-6 hover:bg-blue-50 hover:border-blue-300 transition-colors bg-transparent"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setFilterType("all")}>
                  <FileText className="h-4 w-4 mr-2" />
                  All Notes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("starred")}>
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  Starred
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("manual")}>Manual Notes</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("ai-generated")}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Generated
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 px-6 hover:bg-green-50 hover:border-green-300 transition-colors bg-transparent"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("recent")}>
                  <Clock className="h-4 w-4 mr-2" />
                  Last Edited
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("title")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Title
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("video")}>
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Enhanced Notes Grid */}
      <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="group p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm cursor-pointer overflow-hidden relative"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/50 dark:to-blue-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Badge
                      variant={note.type === "ai-generated" ? "default" : "secondary"}
                      className={`text-xs ${
                        note.type === "ai-generated" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : ""
                      }`}
                    >
                      {note.type === "ai-generated" ? (
                        <>
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI
                        </>
                      ) : (
                        "Manual"
                      )}
                    </Badge>
                    {note.starred && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" />
                        {note.starred ? "Unstar" : "Star"}
                      </DropdownMenuItem>
                      {note.type === "manual" && (
                        <DropdownMenuItem onClick={() => regenerateWithAI(note.id)}>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Regenerate with AI
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {note.title}
                </h3>

                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Video className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="truncate font-medium">{note.videoTitle}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{note.preview}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{note.lastEdited}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-100 hover:text-blue-700"
                  >
                    Open
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
                <FileText className="h-12 w-12 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              No notes found
            </h3>
            <p className="text-muted-foreground text-lg">
              {searchTerm ? "Try adjusting your search terms" : "Start taking notes to build your learning library"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
