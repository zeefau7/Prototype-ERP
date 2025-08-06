"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Camera, Keyboard } from 'lucide-react'

interface QuickScanButtonProps {
  onScanResult?: (code: string, method: "camera" | "manual") => void
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function QuickScanButton({
  onScanResult,
  variant = "outline",
  size = "default",
  className,
}: QuickScanButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [manualCode, setManualCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScanResult?.(manualCode.trim(), "manual")
      setManualCode("")
      setIsOpen(false)
    }
  }

  const startCameraScanning = () => {
    setIsScanning(true)
    // Simulate camera scanning
    setTimeout(() => {
      const mockCode = "123456789012"
      onScanResult?.(mockCode, "camera")
      setIsScanning(false)
      setIsOpen(false)
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <QrCode className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Quick Scan</span>
          <span className="sm:hidden">Scan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Quick Barcode Scan</DialogTitle>
          <DialogDescription className="text-sm">Scan a barcode using your camera or enter it manually</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="camera" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="camera" className="text-xs sm:text-sm py-2">
              <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Camera
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs sm:text-sm py-2">
              <Keyboard className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="space-y-4">
            <div className="text-center space-y-4">
              {!isScanning ? (
                <>
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                  </div>
                  <Button onClick={startCameraScanning} className="w-full h-10 sm:h-11">
                    <Camera className="w-4 h-4 mr-2" />
                    Start Camera
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gray-900 rounded-lg flex items-center justify-center relative">
                    <div className="absolute inset-2 border-2 border-white border-dashed rounded animate-pulse"></div>
                    <div className="text-white text-xs sm:text-sm">Scanning...</div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Point camera at barcode</p>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="manual-code" className="text-sm sm:text-base">Barcode Number</Label>
              <Input
                id="manual-code"
                placeholder="Enter barcode number..."
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleManualSubmit()}
                className="h-10 sm:h-11"
              />
            </div>
            <Button onClick={handleManualSubmit} className="w-full h-10 sm:h-11" disabled={!manualCode.trim()}>
              <Keyboard className="w-4 h-4 mr-2" />
              Submit Code
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
