"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, Filter, Calendar } from 'lucide-react'

const inspections = [
  {
    id: "QC-001",
    batchNumber: "BATCH-2024-001",
    product: "Widget Assembly A",
    inspector: "Alice Johnson",
    date: "2024-01-30",
    status: "passed",
    defects: 2,
    sampleSize: 100,
    passRate: 98,
    category: "Final Inspection"
  },
  {
    id: "QC-002",
    batchNumber: "BATCH-2024-002",
    product: "Component B-Series",
    inspector: "Bob Smith",
    date: "2024-01-29",
    status: "failed",
    defects: 15,
    sampleSize: 50,
    passRate: 70,
    category: "In-Process"
  },
  {
    id: "QC-003",
    batchNumber: "BATCH-2024-003",
    product: "Premium Widget X",
    inspector: "Carol Davis",
    date: "2024-01-28",
    status: "passed",
    defects: 0,
    sampleSize: 75,
    passRate: 100,
    category: "Final Inspection"
  },
  {
    id: "QC-004",
    batchNumber: "BATCH-2024-004",
    product: "Standard Assembly",
    inspector: "David Wilson",
    date: "2024-01-27",
    status: "pending",
    defects: 5,
    sampleSize: 80,
    passRate: 93.75,
    category: "Incoming"
  },
  {
    id: "QC-005",
    batchNumber: "BATCH-2024-005",
    product: "Deluxe Component",
    inspector: "Eva Brown",
    date: "2024-01-26",
    status: "passed",
    defects: 1,
    sampleSize: 60,
    passRate: 98.33,
    category: "Final Inspection"
  }
]

const defectTypes = [
  { type: "Dimensional", count: 8, percentage: 34.8 },
  { type: "Surface Finish", count: 6, percentage: 26.1 },
  { type: "Assembly", count: 4, percentage: 17.4 },
  { type: "Material", count: 3, percentage: 13.0 },
  { type: "Other", count: 2, percentage: 8.7 }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "passed": return "bg-green-100 text-green-800"
    case "failed": return "bg-red-100 text-red-800"
    case "pending": return "bg-yellow-100 text-yellow-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "passed": return <CheckCircle className="h-4 w-4" />
    case "failed": return <XCircle className="h-4 w-4" />
    case "pending": return <AlertTriangle className="h-4 w-4" />
    default: return null
  }
}

export default function QualityControlPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inspection.status === statusFilter
    const matchesCategory = categoryFilter === "all" || inspection.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const totalInspections = filteredInspections.length
  const passedInspections = filteredInspections.filter(i => i.status === "passed").length
  const failedInspections = filteredInspections.filter(i => i.status === "failed").length
  const overallPassRate = totalInspections > 0 ? (passedInspections / totalInspections) * 100 : 0
  const totalDefects = filteredInspections.reduce((sum, i) => sum + i.defects, 0)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Quality Control</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Inspection
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inspections</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{totalInspections}</div>
            <p className="text-xs text-muted-foreground">This period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{overallPassRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Overall quality</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Inspections</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{failedInspections}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Defects</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{totalDefects}</div>
            <p className="text-xs text-muted-foreground">Identified issues</p>
          </CardContent>
        </Card>
      </div>

      {/* Defect Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Defect Analysis</CardTitle>
          <CardDescription>Breakdown of defect types and frequencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {defectTypes.map((defect, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium">{defect.type}</div>
                <div className="flex-1">
                  <Progress value={defect.percentage} className="h-2" />
                </div>
                <div className="w-12 text-sm text-muted-foreground">{defect.count}</div>
                <div className="w-16 text-sm text-muted-foreground">{defect.percentage.toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inspections List */}
      <Card>
        <CardHeader>
          <CardTitle>Quality Inspections</CardTitle>
          <CardDescription>Track and manage quality control inspections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inspections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Incoming">Incoming</SelectItem>
                <SelectItem value="In-Process">In-Process</SelectItem>
                <SelectItem value="Final Inspection">Final Inspection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredInspections.map((inspection) => (
              <Card key={inspection.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{inspection.id}</h3>
                      <p className="text-sm text-muted-foreground">{inspection.product}</p>
                    </div>
                    <Badge className={getStatusColor(inspection.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(inspection.status)}
                        {inspection.status}
                      </div>
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Batch:</span>
                      <span className="text-sm font-medium">{inspection.batchNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pass Rate:</span>
                      <span className="text-sm font-medium">{inspection.passRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Defects:</span>
                      <span className="text-sm">{inspection.defects}/{inspection.sampleSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Inspector:</span>
                      <span className="text-sm">{inspection.inspector}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="text-sm">{inspection.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inspection ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pass Rate</TableHead>
                  <TableHead>Defects</TableHead>
                  <TableHead>Inspector</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInspections.map((inspection) => (
                  <TableRow key={inspection.id}>
                    <TableCell className="font-medium">{inspection.id}</TableCell>
                    <TableCell>{inspection.product}</TableCell>
                    <TableCell>{inspection.batchNumber}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(inspection.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(inspection.status)}
                          {inspection.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={inspection.passRate} className="w-16 h-2" />
                        <span className="text-sm">{inspection.passRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{inspection.defects}/{inspection.sampleSize}</TableCell>
                    <TableCell>{inspection.inspector}</TableCell>
                    <TableCell>{inspection.date}</TableCell>
                    <TableCell>{inspection.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
