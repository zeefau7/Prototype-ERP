"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, AlertTriangle, CheckCircle, Clock, Database, Play, Pause, RefreshCw, Server, TrendingUp, Users, Zap } from 'lucide-react'

interface MetricData {
  label: string
  value: number
  unit: string
  trend: number
  status: "good" | "warning" | "critical"
}

interface Alert {
  id: string
  type: "info" | "warning" | "error"
  message: string
  timestamp: string
  module: string
}

export default function RealTimeAnalyticsPage() {
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [metrics, setMetrics] = useState<MetricData[]>([
    { label: "Active Users", value: 1247, unit: "", trend: 5.2, status: "good" },
    { label: "System Load", value: 68, unit: "%", trend: -2.1, status: "warning" },
    { label: "Response Time", value: 245, unit: "ms", trend: 12.3, status: "critical" },
    { label: "Throughput", value: 8.7, unit: "req/s", trend: -1.8, status: "good" },
    { label: "Error Rate", value: 0.3, unit: "%", trend: -15.2, status: "good" },
    { label: "Database Connections", value: 89, unit: "", trend: 3.4, status: "good" }
  ])

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "warning",
      message: "High CPU usage detected on server-02",
      timestamp: "2024-01-30 14:32:15",
      module: "Infrastructure"
    },
    {
      id: "2",
      type: "error",
      message: "Database connection timeout in inventory module",
      timestamp: "2024-01-30 14:28:42",
      module: "Inventory"
    },
    {
      id: "3",
      type: "info",
      message: "Scheduled maintenance completed successfully",
      timestamp: "2024-01-30 14:15:00",
      module: "System"
    },
    {
      id: "4",
      type: "warning",
      message: "Memory usage approaching threshold on production server",
      timestamp: "2024-01-30 14:10:33",
      module: "Infrastructure"
    }
  ])

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 10),
        trend: (Math.random() - 0.5) * 20
      })))
      setLastUpdate(new Date())
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600"
      case "warning": return "text-yellow-600"
      case "critical": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "info": return "bg-blue-100 text-blue-800"
      case "warning": return "bg-yellow-100 text-yellow-800"
      case "error": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "info": return <CheckCircle className="h-4 w-4" />
      case "warning": return <AlertTriangle className="h-4 w-4" />
      case "error": return <AlertTriangle className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Real-time Analytics</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={isLive ? "default" : "outline"}
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className="w-full sm:w-auto"
          >
            {isLive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isLive ? "Pause" : "Resume"}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm font-medium">
                {isLive ? "Live Updates" : "Paused"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={`text-xl md:text-2xl font-bold ${getStatusColor(metric.status)}`}>
                  {metric.value.toFixed(metric.unit === "%" || metric.unit === "ms" ? 0 : 1)}{metric.unit}
                </div>
                <div className={`flex items-center text-sm ${metric.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className={`h-3 w-3 mr-1 ${metric.trend < 0 ? 'rotate-180' : ''}`} />
                  {Math.abs(metric.trend).toFixed(1)}%
                </div>
              </div>
              <Progress 
                value={metric.unit === "%" ? metric.value : Math.min(100, (metric.value / 1000) * 100)} 
                className="mt-2 h-1"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>Current system status and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">CPU Usage</span>
              <div className="flex items-center gap-2">
                <Progress value={68} className="w-24 h-2" />
                <span className="text-sm text-yellow-600">68%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Memory Usage</span>
              <div className="flex items-center gap-2">
                <Progress value={45} className="w-24 h-2" />
                <span className="text-sm text-green-600">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Disk Usage</span>
              <div className="flex items-center gap-2">
                <Progress value={72} className="w-24 h-2" />
                <span className="text-sm text-yellow-600">72%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Network I/O</span>
              <div className="flex items-center gap-2">
                <Progress value={34} className="w-24 h-2" />
                <span className="text-sm text-green-600">34%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Performance
            </CardTitle>
            <CardDescription>Database metrics and connection status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Connections</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-green-600">89</span>
                <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Query Response Time</span>
              <span className="text-sm font-medium">12ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Transactions/sec</span>
              <span className="text-sm font-medium">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cache Hit Rate</span>
              <span className="text-sm font-medium text-green-600">94.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Live Alerts
          </CardTitle>
          <CardDescription>Real-time system alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <Badge className={getAlertColor(alert.type)}>
                  <div className="flex items-center gap-1">
                    {getAlertIcon(alert.type)}
                    {alert.type}
                  </div>
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">{alert.module}</span>
                    <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Active Users
          </CardTitle>
          <CardDescription>Current user activity across modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">324</div>
              <div className="text-sm text-muted-foreground">Sales Module</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">198</div>
              <div className="text-sm text-muted-foreground">Inventory</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-muted-foreground">Finance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">89</div>
              <div className="text-sm text-muted-foreground">HR Module</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
