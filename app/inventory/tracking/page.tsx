"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { QrCode, Barcode, MapPin, Package, Search, Filter, Plus, Eye, History, Truck } from "lucide-react"

// Mock data for item tracking
const trackedItems = [
  {
    id: "TI001",
    sku: "SKU-12345",
    name: "Electronic Component A",
    serialNumber: "SN123456789",
    batchNumber: "B2024001",
    currentLocation: "Main Warehouse - A1-B2-C3",
    status: "in-stock",
    lastMovement: "2024-01-15 10:30:00",
    quantity: 100,
    trackingMethod: "serial",
  },
  {
    id: "TI002",
    sku: "SKU-67890",
    name: "Pharmaceutical Product B",
    serialNumber: null,
    batchNumber: "PH2024002",
    currentLocation: "Cold Storage - CS1-A1-B1",
    status: "reserved",
    lastMovement: "2024-01-14 14:15:00",
    quantity: 50,
    trackingMethod: "batch",
  },
  {
    id: "TI003",
    sku: "SKU-11111",
    name: "High-Value Equipment C",
    serialNumber: "EQ987654321",
    batchNumber: null,
    currentLocation: "Distribution Center A - D1-C2-A1",
    status: "in-transit",
    lastMovement: "2024-01-16 09:45:00",
    quantity: 1,
    trackingMethod: "serial",
  },
  {
    id: "TI004",
    sku: "SKU-22222",
    name: "Food Product D",
    serialNumber: null,
    batchNumber: "FD2024003",
    currentLocation: "Retail Store - Downtown",
    status: "sold",
    lastMovement: "2024-01-16 16:20:00",
    quantity: 25,
    trackingMethod: "batch",
  },
]

const movementHistory = [
  {
    id: "MH001",
    itemId: "TI001",
    action: "received",
    fromLocation: "Supplier - Global Tech Supplies",
    toLocation: "Main Warehouse - Receiving",
    quantity: 100,
    timestamp: "2024-01-10 08:00:00",
    user: "John Smith",
    reference: "PO-2024-001",
  },
  {
    id: "MH002",
    itemId: "TI001",
    action: "moved",
    fromLocation: "Main Warehouse - Receiving",
    toLocation: "Main Warehouse - A1-B2-C3",
    quantity: 100,
    timestamp: "2024-01-10 10:30:00",
    user: "Sarah Johnson",
    reference: "PUT-2024-001",
  },
  {
    id: "MH003",
    itemId: "TI003",
    action: "shipped",
    fromLocation: "Main Warehouse - A2-B1-C1",
    toLocation: "Distribution Center A",
    quantity: 1,
    timestamp: "2024-01-16 09:45:00",
    user: "Mike Davis",
    reference: "SO-2024-015",
  },
  {
    id: "MH004",
    itemId: "TI002",
    action: "reserved",
    fromLocation: "Cold Storage - CS1-A1-B1",
    toLocation: "Cold Storage - CS1-A1-B1",
    quantity: 50,
    timestamp: "2024-01-14 14:15:00",
    user: "Lisa Wilson",
    reference: "RES-2024-008",
  },
]

const trackingMethods = [
  { value: "serial", label: "Serial Number", icon: QrCode },
  { value: "batch", label: "Batch/Lot Number", icon: Barcode },
  { value: "location", label: "Location Only", icon: MapPin },
]

export default function TrackingPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddTrackingOpen, setIsAddTrackingOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const filteredItems = trackedItems.filter(
    (item) =>
      (selectedMethod === "all" || item.trackingMethod === selectedMethod) &&
      (selectedStatus === "all" || item.status === selectedStatus) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.serialNumber && item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.batchNumber && item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  const getStatusBadge = (status: string) => {
    const variants = {
      "in-stock": "bg-green-100 text-green-800",
      reserved: "bg-yellow-100 text-yellow-800",
      "in-transit": "bg-blue-100 text-blue-800",
      sold: "bg-gray-100 text-gray-800",
      damaged: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getMethodIcon = (method: string) => {
    const methodConfig = trackingMethods.find((m) => m.value === method)
    const IconComponent = methodConfig?.icon || Package
    return <IconComponent className="h-4 w-4" />
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "received":
        return <Package className="h-4 w-4 text-green-500" />
      case "moved":
        return <MapPin className="h-4 w-4 text-blue-500" />
      case "shipped":
        return <Truck className="h-4 w-4 text-orange-500" />
      case "reserved":
        return <Eye className="h-4 w-4 text-yellow-500" />
      default:
        return <History className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Item Tracking</h1>
          <p className="text-muted-foreground">Track inventory items with serial numbers, batch codes, and locations</p>
        </div>
        <Dialog open={isAddTrackingOpen} onOpenChange={setIsAddTrackingOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tracking
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Item Tracking</DialogTitle>
              <DialogDescription>Set up tracking for a new inventory item</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sku" className="text-right">
                  SKU
                </Label>
                <Input id="sku" className="col-span-3" placeholder="Enter SKU" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tracking-method" className="text-right">
                  Method
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select tracking method" />
                  </SelectTrigger>
                  <SelectContent>
                    {trackingMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serial-number" className="text-right">
                  Serial Number
                </Label>
                <Input id="serial-number" className="col-span-3" placeholder="Enter serial number" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="batch-number" className="text-right">
                  Batch Number
                </Label>
                <Input id="batch-number" className="col-span-3" placeholder="Enter batch number" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" className="col-span-3" placeholder="Enter location" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddTrackingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddTrackingOpen(false)}>Add Tracking</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracked Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trackedItems.length}</div>
            <p className="text-xs text-muted-foreground">Total tracked items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serial Tracked</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trackedItems.filter((item) => item.trackingMethod === "serial").length}
            </div>
            <p className="text-xs text-muted-foreground">Items with serial numbers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Batch Tracked</CardTitle>
            <Barcode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trackedItems.filter((item) => item.trackingMethod === "batch").length}
            </div>
            <p className="text-xs text-muted-foreground">Items with batch numbers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trackedItems.filter((item) => item.status === "in-transit").length}
            </div>
            <p className="text-xs text-muted-foreground">Items being moved</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by SKU, name, serial, or batch number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedMethod} onValueChange={setSelectedMethod}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            {trackingMethods.map((method) => (
              <SelectItem key={method.value} value={method.value}>
                {method.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
            <SelectItem value="in-transit">In Transit</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="items" className="space-y-4">
        <TabsList>
          <TabsTrigger value="items">Tracked Items</TabsTrigger>
          <TabsTrigger value="history">Movement History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Item Tracking Overview</CardTitle>
              <CardDescription>Monitor all tracked inventory items and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Tracking Method</TableHead>
                    <TableHead>Serial/Batch</TableHead>
                    <TableHead>Current Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Last Movement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getMethodIcon(item.trackingMethod)}
                          <span className="capitalize">{item.trackingMethod}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.serialNumber || item.batchNumber || "-"}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.currentLocation}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(item.status)}>{item.status.replace("-", " ")}</Badge>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{new Date(item.lastMovement).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => setSelectedItem(item.id)}>
                          View History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movement History</CardTitle>
              <CardDescription>Complete audit trail of all item movements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>From Location</TableHead>
                    <TableHead>To Location</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movementHistory.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="font-medium">{movement.itemId}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getActionIcon(movement.action)}
                          <span className="capitalize">{movement.action}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{movement.fromLocation}</TableCell>
                      <TableCell className="max-w-xs truncate">{movement.toLocation}</TableCell>
                      <TableCell>{movement.quantity}</TableCell>
                      <TableCell>{new Date(movement.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{movement.user}</TableCell>
                      <TableCell>{movement.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tracking Reports</CardTitle>
              <CardDescription>Generate reports on item tracking and movement patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Serial Number Report</CardTitle>
                    <CardDescription>All items tracked by serial number</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Batch Tracking Report</CardTitle>
                    <CardDescription>Items grouped by batch/lot numbers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Movement Analysis</CardTitle>
                    <CardDescription>Item movement patterns and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
