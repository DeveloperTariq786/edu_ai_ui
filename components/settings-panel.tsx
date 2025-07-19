"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import {
  Monitor,
  Moon,
  Sun,
  Volume2,
  Video,
  FileText,
  Download,
  Upload,
  Trash2,
  Settings,
  Palette,
  Brain,
  Shield,
} from "lucide-react"

export function SettingsPanel() {
  const [theme, setTheme] = useState("system")
  const [autoPlay, setAutoPlay] = useState(true)
  const [autoGenerateNotes, setAutoGenerateNotes] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState([1])
  const [videoQuality, setVideoQuality] = useState("auto")
  const [defaultVolume, setDefaultVolume] = useState([80])

  const settingSections = [
    {
      title: "Appearance",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme" className="text-base font-medium">
              Theme Preference
            </Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center">
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    System
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: "Video Settings",
      icon: Video,
      color: "from-blue-500 to-cyan-500",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoplay" className="text-base font-medium">
                Auto-play videos
              </Label>
              <p className="text-sm text-muted-foreground">Automatically start playing when video loads</p>
            </div>
            <Switch id="autoplay" checked={autoPlay} onCheckedChange={setAutoPlay} />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Default playback speed</Label>
            <div className="flex items-center space-x-4">
              <Slider
                value={playbackSpeed}
                onValueChange={setPlaybackSpeed}
                max={2}
                min={0.25}
                step={0.25}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-center bg-muted px-2 py-1 rounded">
                {playbackSpeed[0]}x
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="video-quality" className="text-base font-medium">
              Video quality
            </Label>
            <Select value={videoQuality} onValueChange={setVideoQuality}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="1080p">1080p</SelectItem>
                <SelectItem value="720p">720p</SelectItem>
                <SelectItem value="480p">480p</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Default volume</Label>
            <div className="flex items-center space-x-4">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={defaultVolume}
                onValueChange={setDefaultVolume}
                max={100}
                min={0}
                step={5}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-center bg-muted px-2 py-1 rounded">
                {defaultVolume[0]}%
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "AI & Learning",
      icon: Brain,
      color: "from-green-500 to-emerald-500",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-notes" className="text-base font-medium">
                Auto-generate notes
              </Label>
              <p className="text-sm text-muted-foreground">Automatically create AI notes while watching</p>
            </div>
            <Switch id="auto-notes" checked={autoGenerateNotes} onCheckedChange={setAutoGenerateNotes} />
          </div>

          <div className="space-y-3">
            <Label htmlFor="openai-key" className="text-base font-medium">
              OpenAI API Key
            </Label>
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-..."
              className="font-mono border-2 focus:border-green-400 transition-colors"
            />
            <p className="text-xs text-muted-foreground bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
              <Shield className="h-4 w-4 inline mr-2 text-green-600" />
              Your API key is encrypted and stored locally. It's never shared or transmitted to our servers.
            </p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 min-h-full">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-gray-600 to-slate-600 rounded-xl">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent">
              Settings
            </h2>
            <p className="text-muted-foreground">Customize your learning experience</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {settingSections.map((section, index) => {
          const IconComponent = section.icon
          return (
            <Card
              key={index}
              className="p-8 border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden relative"
            >
              {/* Gradient overlay */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.color}`} />

              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 bg-gradient-to-r ${section.color} rounded-xl`}>
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">{section.title}</h3>
              </div>

              {section.content}
            </Card>
          )
        })}

        {/* Data Management */}
        <Card className="p-8 border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500" />

          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">Data Management</h3>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div>
                  <Label className="text-base font-medium">Export all notes</Label>
                  <p className="text-sm text-muted-foreground">Download all your notes as a ZIP file</p>
                </div>
                <Button
                  variant="outline"
                  className="hover:bg-blue-100 hover:border-blue-300 transition-colors bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200 dark:border-green-800">
                <div>
                  <Label className="text-base font-medium">Import notes</Label>
                  <p className="text-sm text-muted-foreground">Import notes from a backup file</p>
                </div>
                <Button
                  variant="outline"
                  className="hover:bg-green-100 hover:border-green-300 transition-colors bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-xl border border-red-200 dark:border-red-800">
              <div>
                <Label className="text-base font-medium">Clear all data</Label>
                <p className="text-sm text-muted-foreground">Delete all notes and settings (cannot be undone)</p>
              </div>
              <Button variant="destructive" className="hover:bg-red-600 transition-colors">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Data
              </Button>
            </div>
          </div>
        </Card>

        {/* Save Settings */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Reset to Defaults
          </Button>
          <Button
            size="lg"
            className="px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
