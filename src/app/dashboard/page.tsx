"use client"

import { useState } from "react"
import { Plus, Search, Grid, List, Calendar, Users, FileText, Brain, Activity, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/store"
import FaultyTerminalBackground from "@/components/ui/faulty-terminal-background"

// Mock data for development
const mockCanvases = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    topic: "Machine Learning",
    updatedAt: "2025-01-20T10:30:00Z",
    isPublic: false,
    nodeCount: 12,
  },
  {
    id: "2",
    title: "React Ecosystem Deep Dive",
    topic: "React",
    updatedAt: "2025-01-19T15:45:00Z",
    isPublic: true,
    nodeCount: 8,
  },
  {
    id: "3",
    title: "Database Design Principles",
    topic: "Databases",
    updatedAt: "2025-01-18T09:20:00Z",
    isPublic: false,
    nodeCount: 15,
  },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { user, clearAuth } = useAuthStore()

  const handleSignOut = () => {
    clearAuth()
    window.location.href = "/"
  }

  const filteredCanvases = mockCanvases.filter(
    (canvas) =>
      canvas.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      canvas.topic.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const stats = [
    {
      label: "Total Canvases",
      value: mockCanvases.length,
      icon: Brain,
      color: "from-blue-500/20 to-blue-500/10",
      iconColor: "text-blue-600",
      change: "+12%",
      trend: "up"
    },
    {
      label: "Public Canvases",
      value: mockCanvases.filter((c) => c.isPublic).length,
      icon: Users,
      color: "from-green-500/20 to-green-500/10",
      iconColor: "text-green-600",
      change: "+5%",
      trend: "up"
    },
    {
      label: "Total Nodes",
      value: mockCanvases.reduce((acc, c) => acc + c.nodeCount, 0),
      icon: Activity,
      color: "from-purple-500/20 to-purple-500/10",
      iconColor: "text-purple-600",
      change: "+18%",
      trend: "up"
    },
    {
      label: "Learning Hours",
      value: "24.5h",
      icon: Clock,
      color: "from-orange-500/20 to-orange-500/10",
      iconColor: "text-orange-600",
      change: "+8%",
      trend: "up"
    },
  ]

  return (
    <div className="min-h-screen bg-white relative">
      <FaultyTerminalBackground />
      
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-8 py-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <Brain className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <p className="text-lg text-gray-600 font-medium">Welcome back, {user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowCreateModal(true)}
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Canvas
              </Button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="lg"
                className="rounded-full font-semibold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 px-6 py-3"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-12 relative z-10 max-w-7xl">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 border-gray-100 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:border-blue-200 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${stat.color.replace('500/20', '100').replace('500/10', '200')} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    <TrendingUp className="h-4 w-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold tracking-tight text-gray-900">{stat.value}</div>
                  <div className="text-lg text-gray-600 font-semibold">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Controls */}
        <Card className="border-2 border-gray-100 bg-white shadow-lg mb-12">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search canvases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-14 rounded-full bg-gray-50 border-2 border-gray-200 focus:bg-white focus:border-blue-300 transition-all duration-200 text-lg"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex rounded-full border-2 border-gray-200 bg-gray-50 overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="lg"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none rounded-l-full px-6 py-3 font-semibold"
                  >
                    <Grid className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="lg"
                    onClick={() => setViewMode("list")}
                    className="rounded-none rounded-r-full px-6 py-3 font-semibold"
                  >
                    <List className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Canvas Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCanvases.map((canvas) => (
              <Card
                key={canvas.id}
                className="border-0 bg-card/40 backdrop-blur-sm shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 group hover:scale-[1.02]"
                onClick={() => (window.location.href = `/canvas/${canvas.id}`)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                    {canvas.title}
                  </CardTitle>
                  <CardDescription className="font-medium">{canvas.topic}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      <span>{canvas.nodeCount} nodes</span>
                    </div>
                    <span>{new Date(canvas.updatedAt).toLocaleDateString()}</span>
                  </div>
                  {canvas.isPublic && (
                    <div className="flex justify-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 border border-green-200/50">
                        Public
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 bg-card/40 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="h-14 px-6 text-left align-middle font-semibold text-muted-foreground text-sm">
                      Title
                    </th>
                    <th className="h-14 px-6 text-left align-middle font-semibold text-muted-foreground text-sm">
                      Topic
                    </th>
                    <th className="h-14 px-6 text-left align-middle font-semibold text-muted-foreground text-sm">
                      Nodes
                    </th>
                    <th className="h-14 px-6 text-left align-middle font-semibold text-muted-foreground text-sm">
                      Status
                    </th>
                    <th className="h-14 px-6 text-left align-middle font-semibold text-muted-foreground text-sm">
                      Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCanvases.map((canvas) => (
                    <tr
                      key={canvas.id}
                      className="border-b border-border/30 transition-colors hover:bg-accent/50 cursor-pointer group"
                      onClick={() => (window.location.href = `/canvas/${canvas.id}`)}
                    >
                      <td className="p-6 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <Brain className="h-4 w-4 text-primary" />
                          </div>
                          <div className="font-medium group-hover:text-primary transition-colors">{canvas.title}</div>
                        </div>
                      </td>
                      <td className="p-6 align-middle text-muted-foreground font-medium">
                        {canvas.topic}
                      </td>
                      <td className="p-6 align-middle text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          {canvas.nodeCount}
                        </div>
                      </td>
                      <td className="p-6 align-middle">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                            canvas.isPublic
                              ? "bg-green-500/10 text-green-600 border border-green-200/50"
                              : "bg-muted text-muted-foreground border border-border/50"
                          }`}
                        >
                          {canvas.isPublic ? "Public" : "Private"}
                        </span>
                      </td>
                      <td className="p-6 align-middle text-muted-foreground text-sm">
                        {new Date(canvas.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {filteredCanvases.length === 0 && (
          <Card className="border-0 bg-card/30 backdrop-blur-sm shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-muted/50 to-muted">
                <Brain className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardTitle className="mb-2 text-2xl">
                {searchQuery ? "No canvases found" : "No canvases yet"}
              </CardTitle>
              <CardDescription className="mb-8 max-w-md text-center text-base">
                {searchQuery
                  ? "Try adjusting your search terms to find what you're looking for"
                  : "Create your first canvas to get started with AI-powered learning"}
              </CardDescription>
              {!searchQuery && (
                <Button
                  onClick={() => setShowCreateModal(true)}
                  size="lg"
                  className="rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Canvas
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}