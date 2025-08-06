"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, ShoppingBag, Clock, CheckCircle, AlertTriangle, Star } from "lucide-react"

export default function PurchaseOrderManagement() {
  const purchaseOrders = [
    {
      id: "PO-2024-001",
      vendor: "Tech Components Ltd",
      date: "2024-01-15",
      items: 5,
      total: "$12,500.00",
      status: "Approved",
      deliveryDate: "2024-01-22",
      approver: "John Smith",
      priority: "High",
      terms: "Net 30",
    },
    {
      id: "PO-2024-002",
      vendor: "Audio Solutions Inc",
      date: "2024-01-14",
      items: 3,
      total: "$8,750.00",
      status: "Pending Approval",
      deliveryDate: "2024-01-25",
      approver: "Sarah Johnson",
      priority: "Medium",
      terms: "Net 15",
    },
    {
      id: "PO-2024-003",
      vendor: "Plastic Works Co",
      date: "2024-01-13",
      items: 2,
      total: "$5,200.00",
      status: "Received",
      deliveryDate: "2024-01-20",
      approver: "Mike Davis",
      priority: "Low",
      terms: "Net 45",
    },
    {
      id: "PO-2024-004",
      vendor: "Power Tech Ltd",
      date: "2024-01-12",
      items: 4,
      total: "$15,300.00",
      status: "Partially Received",
      deliveryDate: "2024-01-19",
      approver: "Emily Brown",
      priority: "High",
      terms: "Net 30",
    },
    {
      id: "PO-2024-005",
      vendor: "Global Supplies Inc",
      date: "2024-01-11",
      items: 6,
      total: "$22,100.00",
      status: "Rejected",
      deliveryDate: "2024-01-28",
      approver: "David Wilson",
      priority: "Medium",
      terms: "Net 60",
    },
  ]

  const vendors = [
    {
      id: "VEN-001",
      name: "Tech Components Ltd",
      contact: "Alice Johnson",
      email: "alice@techcomponents.com",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
      orders: 45,
      totalSpend: "$125,000",
      onTimeDelivery: "96%",
      qualityScore: "98%",
    },
    {
      id: "VEN-002",
      name: "Audio Solutions Inc",
      contact: "Bob Smith",
      email: "bob@audiosolutions.com",
      phone: "+1 (555) 234-5678",
      rating: 4.5,
      orders: 32,
      totalSpend: "$89,500",
      onTimeDelivery: "92%",
      qualityScore: "95%",
    },
    {
      id: "VEN-003",
      name: "Plastic Works Co",
      contact: "Carol Davis",
      email: "carol@plasticworks.com",
      phone: "+1 (555) 345-6789",
      rating: 4.2,
      orders: 28,
      totalSpend: "$67,800",
      onTimeDelivery: "88%",
      qualityScore: "92%",
    },
    {
      id: "VEN-004",
      name: "Power Tech Ltd",
      contact: "David Brown",
      email: "david@powertech.com",
      phone: "+1 (555) 456-7890",
      rating: 4.7,
      orders: 38,
      totalSpend: "$156,200",
      onTimeDelivery: "94%",
      qualityScore: "97%",
    },
  ]

  const approvalWorkflow = [
    { level: 1, approver: "Department Manager", limit: "$5,000", status: "Active" },
    { level: 2, approver: "Finance Director", limit: "$25,000", status: "Active" },
    { level: 3, approver: "VP Operations", limit: "$100,000", status: "Active" },
    { level: 4, approver: "CEO", limit: "Unlimited", status: "Active" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "default" as const
      case "Pending Approval":
        return "secondary" as const
      case "Received":
        return "default" as const
      case "Partially Received":
        return "outline" as const
      case "Rejected":
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Order Management</h1>
          <p className="text-muted-foreground">Multi-level approval workflow with 3-way matching (PO/GRN/Invoice)</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create PO
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total POs</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">567</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.8M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Approval Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Workflow Matrix</CardTitle>
          <CardDescription>Multi-level purchase order approval limits and hierarchy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {approvalWorkflow.map((level) => (
              <div key={level.level} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Level {level.level}</h3>
                  <Badge variant={level.status === "Active" ? "default" : "secondary"}>{level.status}</Badge>
                </div>
                <div className="text-sm font-medium">{level.approver}</div>
                <div className="text-lg font-bold">{level.limit}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Purchase Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>Complete purchase order tracking with approval status</CardDescription>
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="partial">Partially Received</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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
                <TableHead>PO Number</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.vendor}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(order.priority)}>{order.priority}</Badge>
                  </TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>{order.approver}</TableCell>
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

      {/* Vendor Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Performance</CardTitle>
          <CardDescription>Quality, delivery, and cost performance scoring</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>On-Time Delivery</TableHead>
                <TableHead>Quality Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vendor.name}</div>
                      <div className="text-sm text-muted-foreground">{vendor.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vendor.contact}</div>
                      <div className="text-sm text-muted-foreground">{vendor.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(vendor.rating)}
                      <span className="text-sm font-medium ml-2">{vendor.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.orders}</TableCell>
                  <TableCell className="font-medium">{vendor.totalSpend}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{vendor.onTimeDelivery}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{vendor.qualityScore}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Evaluate
                    </Button>
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
