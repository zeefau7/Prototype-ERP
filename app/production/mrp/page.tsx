"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Download, Factory, Calendar, AlertTriangle, CheckCircle } from "lucide-react"

export default function MRPPlanning() {
  const productionOrders = [
    {
      id: "PO-2024-001",
      product: "Wireless Headphones",
      quantity: 500,
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      status: "In Progress",
      progress: 65,
      priority: "High",
      workCenter: "Assembly Line 1",
      materials: ["PCB Board", "Speakers", "Plastic Housing"],
    },
    {
      id: "PO-2024-002",
      product: "Bluetooth Speaker",
      quantity: 300,
      startDate: "2024-01-22",
      endDate: "2024-01-28",
      status: "Scheduled",
      progress: 0,
      priority: "Medium",
      workCenter: "Assembly Line 2",
      materials: ["Speaker Driver", "Battery", "Metal Casing"],
    },
    {
      id: "PO-2024-003",
      product: "USB Cable",
      quantity: 1000,
      startDate: "2024-01-18",
      endDate: "2024-01-20",
      status: "Completed",
      progress: 100,
      priority: "Low",
      workCenter: "Cable Assembly",
      materials: ["USB Connector", "Wire", "Plastic Cover"],
    },
    {
      id: "PO-2024-004",
      product: "Phone Case",
      quantity: 750,
      startDate: "2024-01-25",
      endDate: "2024-01-30",
      status: "Material Shortage",
      progress: 0,
      priority: "High",
      workCenter: "Molding Station",
      materials: ["Silicone", "Dye", "Packaging"],
    },
  ]

  const materialRequirements = [
    {
      material: "PCB Board",
      required: 500,
      available: 450,
      shortage: 50,
      supplier: "Tech Components Ltd",
      leadTime: "5 days",
      status: "Shortage",
    },
    {
      material: "Speakers",
      required: 500,
      available: 600,
      shortage: 0,
      supplier: "Audio Solutions Inc",
      leadTime: "3 days",
      status: "Available",
    },
    {
      material: "Plastic Housing",
      required: 500,
      available: 520,
      shortage: 0,
      supplier: "Plastic Works Co",
      leadTime: "7 days",
      status: "Available",
    },
    {
      material: "Speaker Driver",
      required: 300,
      available: 280,
      shortage: 20,
      supplier: "Audio Solutions Inc",
      leadTime: "3 days",
      status: "Shortage",
    },
    {
      material: "Battery",
      required: 300,
      available: 350,
      shortage: 0,
      supplier: "Power Tech Ltd",
      leadTime: "4 days",
      status: "Available",
    },
  ]

  const workCenterCapacity = [
    { center: "Assembly Line 1", capacity: 100, utilized: 85, efficiency: "85%" },
    { center: "Assembly Line 2", capacity: 80, utilized: 60, efficiency: "75%" },
    { center: "Cable Assembly", capacity: 200, utilized: 180, efficiency: "90%" },
    { center: "Molding Station", capacity: 120, utilized: 95, efficiency: "79%" },
    { center: "Quality Control", capacity: 150, utilized: 120, efficiency: "80%" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default" as const
      case "In Progress":
        return "secondary" as const
      case "Scheduled":
        return "outline" as const
      case "Material Shortage":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive" as const
      case "Medium":
        return "secondary" as const
      case "Low":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MRP Planning</h1>
          <p className="text-muted-foreground">Material Requirements Planning with multi-level BOM and yield factors</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Production Order
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Schedule</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">79.9% on-time delivery</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Material Shortages</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacity Utilization</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">Across all work centers</p>
          </CardContent>
        </Card>
      </div>

      {/* Work Center Capacity */}
      <Card>
        <CardHeader>
          <CardTitle>Work Center Capacity</CardTitle>
          <CardDescription>Real-time capacity utilization and efficiency metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workCenterCapacity.map((center) => (
              <div key={center.center} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{center.center}</div>
                  <div className="text-sm text-muted-foreground">
                    {center.utilized}/{center.capacity} units ({center.efficiency})
                  </div>
                </div>
                <Progress value={(center.utilized / center.capacity) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Production Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Production Orders</CardTitle>
          <CardDescription>Active production orders with scheduling and progress tracking</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="shortage">Material Shortage</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Work Center</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{order.startDate}</div>
                      <div className="text-muted-foreground">to {order.endDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{order.progress}%</div>
                      <Progress value={order.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(order.priority)}>{order.priority}</Badge>
                  </TableCell>
                  <TableCell>{order.workCenter}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Material Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Material Requirements</CardTitle>
          <CardDescription>Raw material availability and shortage analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Shortage</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Lead Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialRequirements.map((material, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{material.material}</TableCell>
                  <TableCell>{material.required}</TableCell>
                  <TableCell>{material.available}</TableCell>
                  <TableCell className={material.shortage > 0 ? "text-red-600 font-medium" : "text-green-600"}>
                    {material.shortage > 0 ? material.shortage : "None"}
                  </TableCell>
                  <TableCell>{material.supplier}</TableCell>
                  <TableCell>{material.leadTime}</TableCell>
                  <TableCell>
                    <Badge variant={material.status === "Available" ? "default" : "destructive"}>
                      {material.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {material.shortage > 0 && (
                      <Button variant="outline" size="sm">
                        Create PO
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
