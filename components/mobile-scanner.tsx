"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Flashlight, FlashlightOff, Maximize, Minimize, RotateCcw, CheckCircle, XCircle } from 'lucide-react'

interface MobileScannerProps {
  onScanResult: (code: string, type: string, action: string) => void
}

export function MobileScanner({ onScanResult }: MobileScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [flashEnabled, setFlashEnabled] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success" | "error">("idle")
  const [lastScannedCode, setLastScannedCode] = useState<string>("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate camera permission and access
  const startCamera = async () => {
    try {
      setIsScanning(true)
      setScanStatus("scanning")

      // Simulate camera initialization delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful camera access
      console.log("Camera started successfully")
    } catch (error) {
      console.error("Camera access failed:", error)
      setScanStatus("error")
    }
  }

  const stopCamera = () => {
    setIsScanning(false)
    setScanStatus("idle")
  }

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Simulate barcode detection
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        // Simulate random barcode detection
        if (Math.random() > 0.95) {
          const mockCodes = [
            { code: "123456789012", type: "EAN-13" },
            { code: "987654321098", type: "Code 128" },
            { code: "QR_CODE_DATA_123", type: "QR Code" },
            { code: "456789123456", type: "UPC-A" },
          ]
          const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)]

          setLastScannedCode(randomCode.code)
          setScanStatus("success")
          onScanResult(randomCode.code, randomCode.type, "Scan")

          // Reset status after 2 seconds
          setTimeout(() => {
            setScanStatus("scanning")
          }, 2000)
        }
      }, 500)

      return () => clearInterval(interval)
    }
  }, [isScanning, onScanResult])

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="relative h-full w-full">
          {/* Fullscreen Camera View */}
          <div className="relative h-full bg-gradient-to-br from-gray-800 to-gray-900">
            {/* Scanning overlay for fullscreen */}
            {isScanning && (
              <div className="absolute inset-0">
                {/* Corner indicators */}
                <div className="absolute top-8 left-8 w-12 h-12 border-l-4 border-t-4 border-white"></div>
                <div className="absolute top-8 right-8 w-12 h-12 border-r-4 border-t-4 border-white"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 border-l-4 border-b-4 border-white"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-r-4 border-b-4 border-white"></div>

                {/* Scanning line animation */}
                <div className="absolute inset-x-8 top-1/2 transform -translate-y-1/2">
                  <div className="h-1 bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
                </div>

                {/* Center targeting frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-48 sm:w-96 sm:h-56 border-2 border-white border-dashed rounded-lg opacity-50"></div>
                </div>
              </div>
            )}

            {/* Status indicators for fullscreen */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
              {scanStatus === "scanning" && (
                <Badge className="bg-blue-500 text-white px-4 py-2 text-base">
                  <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
                  Scanning...
                </Badge>
              )}
              {scanStatus === "success" && (
                <Badge className="bg-green-500 text-white px-4 py-2 text-base">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Scanned: {lastScannedCode}
                </Badge>
              )}
              {scanStatus === "error" && (
                <Badge className="bg-red-500 text-white px-4 py-2 text-base">
                  <XCircle className="w-5 h-5 mr-3" />
                  Scan Failed
                </Badge>
              )}
            </div>

            {/* Fullscreen controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={toggleFlash}
                disabled={!isScanning}
                className="bg-black/50 text-white border-white/20 hover:bg-black/70 h-12 w-12 p-0"
              >
                {flashEnabled ? <FlashlightOff className="w-6 h-6" /> : <Flashlight className="w-6 h-6" />}
              </Button>

              <Button
                size="lg"
                variant="secondary"
                onClick={toggleFullscreen}
                className="bg-black/50 text-white border-white/20 hover:bg-black/70 h-12 w-12 p-0"
              >
                <Minimize className="w-6 h-6" />
              </Button>

              <Button
                size="lg"
                variant="secondary"
                disabled={!isScanning}
                className="bg-black/50 text-white border-white/20 hover:bg-black/70 h-12 w-12 p-0"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>

            {/* Instructions for fullscreen */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center text-white">
              <p className="text-lg opacity-75">
                {isScanning ? "Point camera at barcode or QR code" : "Tap 'Start Scanning' to begin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        {/* Regular Camera View - Mobile Responsive */}
        <div className="relative bg-gray-900 h-48 sm:h-56 md:h-64 rounded-t-lg overflow-hidden">
          {/* Simulated camera feed */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
            {/* Scanning overlay */}
            {isScanning && (
              <div className="absolute inset-0">
                {/* Corner indicators - responsive */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-white"></div>
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-white"></div>
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-white"></div>
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-white"></div>

                {/* Scanning line animation */}
                <div className="absolute inset-x-2 sm:inset-x-4 top-1/2 transform -translate-y-1/2">
                  <div className="h-0.5 bg-red-500 animate-pulse"></div>
                </div>

                {/* Center targeting frame - responsive */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-20 sm:w-48 sm:h-32 border-2 border-white border-dashed rounded-lg opacity-50"></div>
                </div>
              </div>
            )}

            {/* Status indicators - responsive */}
            <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2">
              {scanStatus === "scanning" && (
                <Badge className="bg-blue-500 text-xs sm:text-sm px-2 py-1">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 sm:mr-2 animate-pulse"></div>
                  Scanning...
                </Badge>
              )}
              {scanStatus === "success" && (
                <Badge className="bg-green-500 text-xs sm:text-sm px-2 py-1">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Scanned: </span>{lastScannedCode.slice(0, 8)}...
                </Badge>
              )}
              {scanStatus === "error" && (
                <Badge className="bg-red-500 text-xs sm:text-sm px-2 py-1">
                  <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Scan Failed
                </Badge>
              )}
            </div>

            {/* Flash indicator */}
            {flashEnabled && (
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Camera not available message */}
          {!isScanning && scanStatus === "idle" && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <Camera className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 opacity-50" />
                <p className="text-xs sm:text-sm opacity-75">Camera not active</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls - Mobile Responsive */}
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div className="flex justify-center">
            {!isScanning ? (
              <Button onClick={startCamera} className="w-full sm:w-auto sm:px-8 h-10 sm:h-11">
                <Camera className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
            ) : (
              <Button onClick={stopCamera} variant="destructive" className="w-full sm:w-auto sm:px-8 h-10 sm:h-11">
                Stop Scanning
              </Button>
            )}
          </div>

          <div className="flex justify-center space-x-2">
            <Button variant="outline" size="sm" onClick={toggleFlash} disabled={!isScanning} className="h-8 w-8 sm:h-10 sm:w-10 p-0">
              {flashEnabled ? <FlashlightOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Flashlight className="w-3 h-3 sm:w-4 sm:h-4" />}
            </Button>

            <Button variant="outline" size="sm" onClick={toggleFullscreen} disabled={!isScanning} className="h-8 w-8 sm:h-10 sm:w-10 p-0">
              <Maximize className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>

            <Button variant="outline" size="sm" disabled={!isScanning} className="h-8 w-8 sm:h-10 sm:w-10 p-0">
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>

          {/* Instructions - responsive */}
          <div className="text-center text-xs sm:text-sm text-muted-foreground">
            {isScanning ? "Point camera at barcode or QR code" : "Click 'Start Scanning' to begin"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
