"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Download, Calendar, Clock, Factory, AlertTriangle } from "lucide-react"

export default function ProductionScheduling() {
  const schedules = [
    {
      id: "SCH-001",
      product: "Wireless Headphones",
      quantity: 500,
      workCenter: "Assembly Line 1",
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      duration: 5,
      priority: "High",
      status: "Scheduled",
      progress: 0,
    },
    {
      id: "SCH-002",
      product: "Bluetooth Speaker",
      quantity: 300,
      workCenter: "Assembly Line 2",
      startDate: "2024-01-18",
      endDate: "2024-01-22",
      duration: 4,
      priority: "Medium",
      status: "In Progress",
      progress: 65,
    },
    {
      id: "SCH-003",
      product: "USB Cable",
      quantity: 1000,
      workCenter: "Cable Assembly",
      startDate: "2024-01-15",
      endDate: "2024-01-17",
      duration: 2,
      priority: "Low",
      status: "Completed",
      progress: 100,
    },
  ]

  const workCenters = [
    {
      id: "WC-001",
      name: "Assembly Line 1",
      capacity: 100,
      scheduled: 85,
      available: 15,
      efficiency: 92,
      status: "Active",
      shift: "Day Shift",
    },
    {
      id: "WC-002",
      name: "Assembly Line 2",
      capacity: 80,
      scheduled: 60,
      available: 20,
      efficiency: 88,
      status: "Active",
      shift: "Day Shift",
    },
    {
      id: "WC-003",
      name: "Cable Assembly",
      capacity: 200,
      scheduled: 180,
      available: 20,
      efficiency: 95,
      status: "Active",
      shift: "24/7",
    },
    {
      id: "WC-004",
      name: "Quality Control",
      capacity: 150,
      scheduled: 120,
      available: 30,
      efficiency: 90,
      status: "Maintenance",
      shift: "Day Shift",
    },
  ]

  const shifts = [
    {
      name: "Day Shift",
      time: "06:00 - 14:00",
      workers: 45,
      efficiency: 92,
      status: "Active",
    },
    {
      name: "Evening Shift",
      time: "14:00 - 22:00",
      workers: 38,
      efficiency: 88,
      status: "Active",
    },
    {
      name: "Night Shift",
      time: "22:00 - 06:00",
      workers: 25,
      efficiency: 85,
      status: "Active",
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default" as const
      case "In Progress":
        return "secondary" as const
      case "Scheduled":
        return "outline" as const
      case "Delayed":
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

  const getWorkCenterStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default" as const
      case "Maintenance":
        return "destructive" as const
      case "Idle":
        return "secondary" as const
      default:
        return "outline" as const
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Production Scheduling</h1>
          <p className="text-muted-foreground">Finite capacity scheduling with bottleneck analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Schedule
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Schedules</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacity Utilization</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">Across all work centers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bottlenecks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Work centers at capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Work Center Capacity */}
      <Card>
        <CardHeader>
          <CardTitle>Work Center Capacity</CardTitle>
          <CardDescription>Real-time capacity utilization and availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workCenters.map((center) => (
              <div key={center.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="font-medium">{center.name}</div>
                    <Badge variant={getWorkCenterStatusVariant(center.status)}>{center.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {center.scheduled}/{center.capacity} units ({center.efficiency}% efficiency)
                  </div>
                </div>
                <Progress value={(center.scheduled / center.capacity) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Scheduled: {center.scheduled}</span>
                  <span>Available: {center.available}</span>
                  <span>Shift: {center.shift}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Production Schedules */}
      <Card>
        <CardHeader>
          <CardTitle>Production Schedules</CardTitle>
          <CardDescription>Finite capacity scheduling with resource optimization</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search schedules..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Work Center" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Centers</SelectItem>
                <SelectItem value="assembly1">Assembly Line 1</SelectItem>
                <SelectItem value="assembly2">Assembly Line 2</SelectItem>
                <SelectItem value="cable">Cable Assembly</SelectItem>
                <SelectItem value="qc">Quality Control</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
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
                <TableHead>Schedule ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Work Center</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.id}</TableCell>
                  <TableCell>{schedule.product}</TableCell>
                  <TableCell>{schedule.quantity}</TableCell>
                  <TableCell>{schedule.workCenter}</TableCell>
                  <TableCell>{schedule.startDate}</TableCell>
                  <TableCell>{schedule.endDate}</TableCell>
                  <TableCell>{schedule.duration} days</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(schedule.priority)}>{schedule.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{schedule.progress}%</div>
                      <Progress value={schedule.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(schedule.status)}>{schedule.status}</Badge>
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

      {/* Shift Management */}
      <Card>
        <CardHeader>
          <CardTitle>Shift Management</CardTitle>
          <CardDescription>Multi-shift scheduling and workforce allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {shifts.map((shift, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{shift.name}</h3>
                  <Badge variant={shift.status === "Active" ? "default" : "secondary"}>{shift.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">{shift.time}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Workers: {shift.workers}</span>
                    <span>Efficiency: {shift.efficiency}%</span>
                  </div>
                  <Progress value={shift.efficiency} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
