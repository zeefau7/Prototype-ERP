"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, QrCode, Package, ArrowUpCircle, ArrowDownCircle, Move, Calculator } from 'lucide-react'
import { MobileScanner } from "@/components/mobile-scanner"
import { BarcodeGenerator } from "@/components/barcode-generator"

interface ScanResult {
  id: string
  code: string
  type: string
  timestamp: Date
  action: string
  user: string
  status: "success" | "error"
}

export default function BarcodeScanningPage() {
  const [activeTab, setActiveTab] = useState("scanner")
  const [scanResults, setScanResults] = useState<ScanResult[]>([
    {
      id: "1",
      code: "123456789012",
      type: "EAN-13",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      action: "Stock In",
      user: "John Doe",
      status: "success",
    },
    {
      id: "2",
      code: "987654321098",
      type: "Code 128",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      action: "Move",
      user: "Jane Smith",
      status: "success",
    },
    {
      id: "3",
      code: "456789123456",
      type: "QR Code",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      action: "Count",
      user: "Mike Johnson",
      status: "error",
    },
  ])

  const [scanStats, setScanStats] = useState({
    totalScans: 247,
    successRate: 95.1,
    todayScans: 42,
    activeUsers: 8,
  })

  const handleScanResult = (code: string, type: string, action: string) => {
    const newResult: ScanResult = {
      id: Date.now().toString(),
      code,
      type,
      timestamp: new Date(),
      action,
      user: "Current User",
      status: "success",
    }
    setScanResults((prev) => [newResult, ...prev])
    setScanStats((prev) => ({
      ...prev,
      totalScans: prev.totalScans + 1,
      todayScans: prev.todayScans + 1,
    }))
  }

  return (
    <div className="flex-1 space-y-4 p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Header - Mobile Responsive */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Barcode Scanning</h2>
          <p className="text-sm text-muted-foreground sm:hidden">Mobile inventory management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 text-xs sm:text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></div>
            Scanner Active
          </Badge>
        </div>
      </div>

      {/* Statistics Cards - Mobile Responsive Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-0 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Scans</CardTitle>
            <QrCode className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 sm:p-6 pt-1 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{scanStats.totalScans}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-0 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Success Rate</CardTitle>
            <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 sm:p-6 pt-1 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{scanStats.successRate}%</div>
            <p className="text-xs text-muted-foreground hidden sm:block">+2.1% from last week</p>
          </CardContent>
        </Card>
        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-0 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Today's Scans</CardTitle>
            <Calculator className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 sm:p-6 pt-1 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{scanStats.todayScans}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">+8 from yesterday</p>
          </CardContent>
        </Card>
        <Card className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-0 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Users</CardTitle>
            <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 sm:p-6 pt-1 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{scanStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">Currently scanning</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs - Mobile Responsive */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="scanner" className="text-xs sm:text-sm py-2">
            <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Scanner</span>
            <span className="sm:hidden">Scan</span>
          </TabsTrigger>
          <TabsTrigger value="generator" className="text-xs sm:text-sm py-2">
            <QrCode className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Generator</span>
            <span className="sm:hidden">Gen</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm py-2">
            <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">History</span>
            <span className="sm:hidden">Hist</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm py-2">
            <Calculator className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Settings</span>
            <span className="sm:hidden">Set</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scanner" className="space-y-4">
          {/* Mobile-First Layout */}
          <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Camera Scanner</CardTitle>
                <CardDescription className="text-sm">Point your camera at a barcode or QR code to scan</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <MobileScanner onScanResult={handleScanResult} />
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
                  <CardDescription className="text-sm">Common inventory operations after scanning</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 space-y-2 sm:space-y-3">
                  <Button className="w-full justify-start bg-transparent h-10 sm:h-11" variant="outline">
                    <ArrowUpCircle className="mr-2 h-4 w-4" />
                    Stock In
                  </Button>
                  <Button className="w-full justify-start bg-transparent h-10 sm:h-11" variant="outline">
                    <ArrowDownCircle className="mr-2 h-4 w-4" />
                    Stock Out
                  </Button>
                  <Button className="w-full justify-start bg-transparent h-10 sm:h-11" variant="outline">
                    <Move className="mr-2 h-4 w-4" />
                    Move Item
                  </Button>
                  <Button className="w-full justify-start bg-transparent h-10 sm:h-11" variant="outline">
                    <Calculator className="mr-2 h-4 w-4" />
                    Cycle Count
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Manual Entry</CardTitle>
                  <CardDescription className="text-sm">Enter barcode manually if camera scanning is not available</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 space-y-4">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Input placeholder="Enter barcode number..." className="flex-1 h-10 sm:h-11" />
                    <Button className="h-10 sm:h-11 sm:px-6">Process</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="generator" className="space-y-4">
          <BarcodeGenerator />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Scan History</CardTitle>
              <CardDescription className="text-sm">Recent barcode scanning activity</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {scanResults.map((result) => (
                  <div key={result.id} className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 p-3 sm:p-4 border rounded-lg">
                    <div className="space-y-1 sm:space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <code className="text-xs sm:text-sm font-mono bg-muted px-2 py-1 rounded">{result.code}</code>
                        <Badge variant="secondary" className="text-xs">{result.type}</Badge>
                        <Badge variant={result.status === "success" ? "default" : "destructive"} className="text-xs">{result.status}</Badge>
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {result.action} by {result.user}
                      </div>
                      <div className="text-xs text-muted-foreground sm:hidden">
                        {result.timestamp.toLocaleString()}
                      </div>
                    </div>
                    <div className="hidden sm:block text-xs text-muted-foreground">
                      {result.timestamp.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Scanner Settings</CardTitle>
              <CardDescription className="text-sm">Configure barcode scanning preferences</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm sm:text-base">Supported Barcode Types</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Code 128", "Code 39", "EAN-13", "UPC-A", "QR Code", "Data Matrix"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <Label className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm sm:text-base">Camera Settings</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <Label className="text-sm">Auto-focus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <Label className="text-sm">Continuous scanning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <Label className="text-sm">Beep on successful scan</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
