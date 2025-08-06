"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingUp, TrendingDown, Package, Truck, Clock, CheckCircle } from "lucide-react"

// Mock data for supply chain
const supplierPerformance = [
  {
    id: 1,
    name: "Global Tech Supplies",
    onTimeDelivery: 95,
    qualityScore: 98,
    costEfficiency: 92,
    status: "excellent",
  },
  {
    id: 2,
    name: "Industrial Components Ltd",
    onTimeDelivery: 88,
    qualityScore: 94,
    costEfficiency: 89,
    status: "good",
  },
  {
    id: 3,
    name: "Premium Materials Co",
    onTimeDelivery: 76,
    qualityScore: 85,
    costEfficiency: 78,
    status: "needs-improvement",
  },
  { id: 4, name: "Quick Supply Solutions", onTimeDelivery: 92, qualityScore: 91, costEfficiency: 95, status: "good" },
]

const shipmentTracking = [
  {
    id: "SH001",
    supplier: "Global Tech Supplies",
    items: "Electronic Components",
    status: "in-transit",
    eta: "2024-01-15",
    progress: 75,
  },
  {
    id: "SH002",
    supplier: "Industrial Components Ltd",
    items: "Steel Parts",
    status: "delivered",
    eta: "2024-01-14",
    progress: 100,
  },
  {
    id: "SH003",
    supplier: "Premium Materials Co",
    items: "Raw Materials",
    status: "delayed",
    eta: "2024-01-18",
    progress: 45,
  },
  {
    id: "SH004",
    supplier: "Quick Supply Solutions",
    items: "Packaging Materials",
    status: "preparing",
    eta: "2024-01-16",
    progress: 25,
  },
]

const riskAlerts = [
  { id: 1, type: "supplier", message: "Premium Materials Co has 3 delayed shipments this month", severity: "high" },
  { id: 2, type: "inventory", message: "Low stock alert for critical component SKU-12345", severity: "medium" },
  { id: 3, type: "quality", message: "Quality issues reported with Batch #B789", severity: "high" },
  { id: 4, type: "logistics", message: "Transportation costs increased by 15% this quarter", severity: "low" },
]

export default function SupplyChainPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-transit":
        return <Truck className="h-4 w-4 text-blue-500" />
      case "delayed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "preparing":
        return <Package className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      excellent: "bg-green-100 text-green-800",
      good: "bg-blue-100 text-blue-800",
      "needs-improvement": "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    }
    return variants[severity as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supply Chain Management</h1>
          <p className="text-muted-foreground">Monitor and optimize your supply chain operations</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supply Chain Cost</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">-5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 high priority</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
          <TabsTrigger value="shipments">Shipment Tracking</TabsTrigger>
          <TabsTrigger value="risks">Risk Management</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Performance Dashboard</CardTitle>
              <CardDescription>Monitor key performance indicators for all suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>On-Time Delivery</TableHead>
                    <TableHead>Quality Score</TableHead>
                    <TableHead>Cost Efficiency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplierPerformance.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={supplier.onTimeDelivery} className="w-16" />
                          <span className="text-sm">{supplier.onTimeDelivery}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={supplier.qualityScore} className="w-16" />
                          <span className="text-sm">{supplier.qualityScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={supplier.costEfficiency} className="w-16" />
                          <span className="text-sm">{supplier.costEfficiency}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(supplier.status)}>{supplier.status.replace("-", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Tracking</CardTitle>
              <CardDescription>Real-time tracking of all inbound shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipmentTracking.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>{shipment.supplier}</TableCell>
                      <TableCell>{shipment.items}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(shipment.status)}
                          <span className="capitalize">{shipment.status.replace("-", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={shipment.progress} className="w-16" />
                          <span className="text-sm">{shipment.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{shipment.eta}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Track
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Management</CardTitle>
              <CardDescription>Monitor and manage supply chain risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground capitalize">{alert.type} Risk</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityBadge(alert.severity)}>{alert.severity}</Badge>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
