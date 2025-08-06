"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Download, Clock, Users, Calendar, AlertTriangle } from "lucide-react"

export default function TimeAttendance() {
  const attendanceRecords = [
    {
      id: "EMP001",
      name: "John Smith",
      department: "Engineering",
      date: "2024-01-15",
      clockIn: "08:30 AM",
      clockOut: "05:45 PM",
      totalHours: 8.25,
      breakTime: 1.0,
      overtime: 0.25,
      status: "Present",
    },
    {
      id: "EMP002",
      name: "Sarah Johnson",
      department: "Marketing",
      date: "2024-01-15",
      clockIn: "09:00 AM",
      clockOut: "06:00 PM",
      totalHours: 8.0,
      breakTime: 1.0,
      overtime: 0,
      status: "Present",
    },
    {
      id: "EMP003",
      name: "Mike Davis",
      department: "Sales",
      date: "2024-01-15",
      clockIn: "-",
      clockOut: "-",
      totalHours: 0,
      breakTime: 0,
      overtime: 0,
      status: "Absent",
    },
    {
      id: "EMP004",
      name: "Emily Brown",
      department: "HR",
      date: "2024-01-15",
      clockIn: "08:45 AM",
      clockOut: "05:30 PM",
      totalHours: 7.75,
      breakTime: 1.0,
      overtime: 0,
      status: "Present",
    },
  ]

  const leaveRequests = [
    {
      id: "LR-2024-001",
      employee: "John Smith",
      type: "Vacation",
      startDate: "2024-01-22",
      endDate: "2024-01-26",
      days: 5,
      status: "Approved",
      approver: "Sarah Johnson",
    },
    {
      id: "LR-2024-002",
      employee: "Mike Davis",
      type: "Sick Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-15",
      days: 1,
      status: "Pending",
      approver: "Emily Brown",
    },
    {
      id: "LR-2024-003",
      employee: "Lisa Wilson",
      type: "Personal",
      startDate: "2024-01-20",
      endDate: "2024-01-20",
      days: 1,
      status: "Approved",
      approver: "Sarah Johnson",
    },
  ]

  const departmentAttendance = [
    { department: "Engineering", present: 42, absent: 3, late: 2, total: 47, rate: 89.4 },
    { department: "Sales", present: 28, absent: 2, late: 1, total: 31, rate: 90.3 },
    { department: "Marketing", present: 16, absent: 1, late: 0, total: 17, rate: 94.1 },
    { department: "HR", present: 11, absent: 0, late: 1, total: 12, rate: 91.7 },
    { department: "Finance", present: 13, absent: 1, late: 0, total: 14, rate: 92.9 },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Present":
        return "default" as const
      case "Absent":
        return "destructive" as const
      case "Late":
        return "secondary" as const
      case "On Leave":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  const getLeaveStatusVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "default" as const
      case "Pending":
        return "secondary" as const
      case "Rejected":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Time & Attendance</h1>
          <p className="text-muted-foreground">Biometric integration with overtime calculation and leave management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Manual Entry
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <p className="text-xs text-muted-foreground">94.7% attendance rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">5.3% of workforce</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456</div>
            <p className="text-xs text-muted-foreground">Today's logged hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">3.6% of total hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Attendance Overview</CardTitle>
          <CardDescription>Attendance rates by department for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentAttendance.map((dept) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{dept.department}</div>
                  <div className="text-sm text-muted-foreground">
                    {dept.present}/{dept.total} present ({dept.rate}%)
                  </div>
                </div>
                <Progress value={dept.rate} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Present: {dept.present}</span>
                  <span>Absent: {dept.absent}</span>
                  <span>Late: {dept.late}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance Records</CardTitle>
          <CardDescription>Employee clock-in/out times and hours worked</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
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
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Break Time</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.name}</div>
                      <div className="text-sm text-muted-foreground">{record.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.clockIn}</TableCell>
                  <TableCell>{record.clockOut}</TableCell>
                  <TableCell className="font-medium">{record.totalHours}h</TableCell>
                  <TableCell>{record.breakTime}h</TableCell>
                  <TableCell className={record.overtime > 0 ? "text-orange-600 font-medium" : ""}>
                    {record.overtime}h
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(record.status)}>{record.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
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

      {/* Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>Pending and approved leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.employee}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{request.type}</Badge>
                  </TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell>{request.days}</TableCell>
                  <TableCell>{request.approver}</TableCell>
                  <TableCell>
                    <Badge variant={getLeaveStatusVariant(request.status)}>{request.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    {request.status === "Pending" && (
                      <Button variant="ghost" size="sm">
                        Approve
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
