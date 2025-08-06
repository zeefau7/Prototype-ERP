"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, CheckCircle, Clock, AlertTriangle, Plus, Search, Filter, BarChart3, Target } from "lucide-react"

// Mock data for cycle counts
const cycleCounts = [
  {
    id: "CC001",
    name: "Q1 2024 - Zone A1",
    location: "Main Warehouse - Zone A1",
    status: "in-progress",
    assignedTo: "John Smith",
    startDate: "2024-01-15",
    dueDate: "2024-01-20",
    progress: 65,
    itemsTotal: 150,
    itemsCounted: 98,
    discrepancies: 3,
    accuracy: 97.2,
  },
  {
    id: "CC002",
    name: "Monthly Count - Electronics",
    location: "Distribution Center A",
    status: "completed",
    assignedTo: "Sarah Johnson",
    startDate: "2024-01-10",
    dueDate: "2024-01-15",
    progress: 100,
    itemsTotal: 85,
    itemsCounted: 85,
    discrepancies: 1,
    accuracy: 98.8,
  },
  {
    id: "CC003",
    name: "Annual Inventory - Cold Storage",
    location: "Cold Storage Facility",
    status: "scheduled",
    assignedTo: "Mike Davis",
    startDate: "2024-01-25",
    dueDate: "2024-01-30",
    progress: 0,
    itemsTotal: 200,
    itemsCounted: 0,
    discrepancies: 0,
    accuracy: 0,
  },
  {
    id: "CC004",
    name: "Weekly Count - Fast Movers",
    location: "Main Warehouse - Picking Zone",
    status: "overdue",
    assignedTo: "Lisa Wilson",
    startDate: "2024-01-08",
    dueDate: "2024-01-12",
    progress: 45,
    itemsTotal: 75,
    itemsCounted: 34,
    discrepancies: 5,
    accuracy: 85.3,
  },
]

const discrepancies = [
  {
    id: "D001",
    cycleCountId: "CC001",
    sku: "SKU-12345",
    itemName: "Electronic Component A",
    location: "A1-B2-C3",
    systemQty: 100,
    countedQty: 98,
    variance: -2,
    reason: "Damaged items found",
    status: "resolved",
  },
  {
    id: "D002",
    cycleCountId: "CC001",
    sku: "SKU-67890",
    itemName: "Mechanical Part B",
    location: "A1-C4-D5",
    systemQty: 50,
    countedQty: 52,
    variance: 2,
    reason: "Receiving not updated",
    status: "investigating",
  },
  {
    id: "D003",
    cycleCountId: "CC004",
    sku: "SKU-11111",
    itemName: "Fast Moving Item C",
    location: "P1-A1-B1",
    systemQty: 25,
    countedQty: 20,
    variance: -5,
    reason: "Theft suspected",
    status: "open",
  },
]

export default function CycleCountsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateCountOpen, setIsCreateCountOpen] = useState(false)

  const filteredCounts = cycleCounts.filter(
    (count) =>
      (selectedStatus === "all" || count.status === selectedStatus) &&
      (count.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        count.location.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: "bg-blue-100 text-blue-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getDiscrepancyStatusBadge = (status: string) => {
    const variants = {
      open: "bg-red-100 text-red-800",
      investigating: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cycle Counts</h1>
          <p className="text-muted-foreground">Manage inventory cycle counting and accuracy tracking</p>
        </div>
        <Dialog open={isCreateCountOpen} onOpenChange={setIsCreateCountOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Cycle Count
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Cycle Count</DialogTitle>
              <DialogDescription>Set up a new inventory cycle count</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="count-name" className="text-right">
                  Name
                </Label>
                <Input id="count-name" className="col-span-3" placeholder="Enter count name" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main-warehouse">Main Warehouse</SelectItem>
                    <SelectItem value="distribution-a">Distribution Center A</SelectItem>
                    <SelectItem value="cold-storage">Cold Storage Facility</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assigned-to" className="text-right">
                  Assigned To
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-smith">John Smith</SelectItem>
                    <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                    <SelectItem value="mike-davis">Mike Davis</SelectItem>
                    <SelectItem value="lisa-wilson">Lisa Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="due-date" className="text-right">
                  Due Date
                </Label>
                <Input id="due-date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea id="notes" className="col-span-3" placeholder="Additional notes..." />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateCountOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateCountOpen(false)}>Create Count</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Counts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cycleCounts.filter((c) => c.status === "in-progress").length}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <p className="text-xs text-muted-foreground">Average accuracy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Discrepancies</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{discrepancies.filter((d) => d.status === "open").length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Cycle counts completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cycle counts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="counts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="counts">Cycle Counts</TabsTrigger>
          <TabsTrigger value="discrepancies">Discrepancies</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="counts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cycle Count Management</CardTitle>
              <CardDescription>Track and manage all inventory cycle counts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Count ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCounts.map((count) => (
                    <TableRow key={count.id}>
                      <TableCell className="font-medium">{count.id}</TableCell>
                      <TableCell>{count.name}</TableCell>
                      <TableCell>{count.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(count.status)}
                          <Badge className={getStatusBadge(count.status)}>{count.status.replace("-", " ")}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{count.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={count.progress} className="w-16" />
                          <span className="text-sm">{count.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{count.dueDate}</TableCell>
                      <TableCell>{count.accuracy > 0 ? `${count.accuracy}%` : "-"}</TableCell>
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

        <TabsContent value="discrepancies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Discrepancies</CardTitle>
              <CardDescription>Review and resolve inventory count discrepancies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>System Qty</TableHead>
                    <TableHead>Counted Qty</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {discrepancies.map((discrepancy) => (
                    <TableRow key={discrepancy.id}>
                      <TableCell className="font-medium">{discrepancy.sku}</TableCell>
                      <TableCell>{discrepancy.itemName}</TableCell>
                      <TableCell>{discrepancy.location}</TableCell>
                      <TableCell>{discrepancy.systemQty}</TableCell>
                      <TableCell>{discrepancy.countedQty}</TableCell>
                      <TableCell>
                        <span className={discrepancy.variance < 0 ? "text-red-600" : "text-green-600"}>
                          {discrepancy.variance > 0 ? "+" : ""}
                          {discrepancy.variance}
                        </span>
                      </TableCell>
                      <TableCell>{discrepancy.reason}</TableCell>
                      <TableCell>
                        <Badge className={getDiscrepancyStatusBadge(discrepancy.status)}>{discrepancy.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Resolve
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cycle Count Analytics</CardTitle>
              <CardDescription>Performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">Analytics Dashboard</p>
                  <p className="text-muted-foreground">Cycle count performance charts would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
