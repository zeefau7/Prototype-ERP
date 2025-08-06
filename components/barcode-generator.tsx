"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Download, Printer, QrCode, BarChart3 } from 'lucide-react'

export function BarcodeGenerator() {
  const [barcodeType, setBarcodeType] = useState("code128")
  const [singleCode, setSingleCode] = useState("")
  const [batchCodes, setBatchCodes] = useState("")
  const [generatedCodes, setGeneratedCodes] = useState<Array<{ code: string; type: string }>>([])

  const barcodeTypes = [
    { value: "code128", label: "Code 128" },
    { value: "code39", label: "Code 39" },
    { value: "ean13", label: "EAN-13" },
    { value: "upca", label: "UPC-A" },
    { value: "qrcode", label: "QR Code" },
    { value: "datamatrix", label: "Data Matrix" },
  ]

  const generateSingleBarcode = () => {
    if (singleCode.trim()) {
      setGeneratedCodes([{ code: singleCode, type: barcodeType }])
    }
  }

  const generateBatchBarcodes = () => {
    const codes = batchCodes.split("\n").filter((code) => code.trim())
    const generated = codes.map((code) => ({ code: code.trim(), type: barcodeType }))
    setGeneratedCodes(generated)
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const downloadBarcode = (code: string) => {
    // Simulate download
    console.log(`Downloading barcode: ${code}`)
  }

  const printBarcode = (code: string) => {
    // Simulate print
    console.log(`Printing barcode: ${code}`)
  }

  const renderBarcodePreview = (code: string, type: string) => {
    if (type === "qrcode") {
      return (
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white border-2 border-gray-300 flex items-center justify-center mx-auto">
          <div className="grid grid-cols-8 gap-px">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
            ))}
          </div>
        </div>
      )
    } else if (type === "datamatrix") {
      return (
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border-2 border-gray-300 flex items-center justify-center mx-auto">
          <div className="grid grid-cols-12 gap-px">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className={`w-0.5 h-0.5 ${Math.random() > 0.6 ? "bg-black" : "bg-white"}`} />
            ))}
          </div>
        </div>
      )
    } else {
      // Traditional barcode
      return (
        <div className="w-40 h-12 sm:w-48 sm:h-16 bg-white border-2 border-gray-300 flex items-end justify-center p-1 sm:p-2 mx-auto">
          <div className="flex items-end space-x-px h-full">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className={`bg-black ${Math.random() > 0.5 ? "w-1" : "w-0.5"}`}
                style={{ height: `${Math.random() * 80 + 20}%` }}
              />
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Barcode Generator</CardTitle>
          <CardDescription className="text-sm">Generate barcodes and QR codes for inventory items</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">Barcode Type</Label>
              <Select value={barcodeType} onValueChange={setBarcodeType}>
                <SelectTrigger className="h-10 sm:h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {barcodeTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="single" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-auto">
                <TabsTrigger value="single" className="text-xs sm:text-sm py-2">
                  <QrCode className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Single Code
                </TabsTrigger>
                <TabsTrigger value="batch" className="text-xs sm:text-sm py-2">
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Batch Generation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="single" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Code Value</Label>
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Input
                      placeholder="Enter code value..."
                      value={singleCode}
                      onChange={(e) => setSingleCode(e.target.value)}
                      className="flex-1 h-10 sm:h-11"
                    />
                    <Button onClick={generateSingleBarcode} className="h-10 sm:h-11 sm:px-6">Generate</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="batch" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Code Values (one per line)</Label>
                  <Textarea
                    placeholder="Enter multiple codes, one per line..."
                    value={batchCodes}
                    onChange={(e) => setBatchCodes(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <Button onClick={generateBatchBarcodes} className="w-full sm:w-auto h-10 sm:h-11">Generate All</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {generatedCodes.length > 0 && (
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Generated Barcodes</CardTitle>
            <CardDescription className="text-sm">
              {generatedCodes.length} barcode{generatedCodes.length > 1 ? "s" : ""} generated
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {generatedCodes.map((item, index) => (
                <div key={index} className="border rounded-lg p-3 sm:p-4 space-y-3">
                  <div className="flex justify-center">{renderBarcodePreview(item.code, item.type)}</div>
                  <div className="text-center">
                    <code className="text-xs sm:text-sm font-mono bg-muted px-2 py-1 rounded break-all">{item.code}</code>
                    <p className="text-xs text-muted-foreground mt-1">
                      {barcodeTypes.find((t) => t.value === item.type)?.label}
                    </p>
                  </div>
                  <div className="flex justify-center space-x-1 sm:space-x-2">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(item.code)} className="h-8 w-8 p-0">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => downloadBarcode(item.code)} className="h-8 w-8 p-0">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => printBarcode(item.code)} className="h-8 w-8 p-0">
                      <Printer className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
