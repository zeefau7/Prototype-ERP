"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Search,
  Filter,
  Download,
  Play,
  Save,
  Copy,
  Edit,
  Trash2,
  FileBarChart,
  Database,
  BarChart3,
} from "lucide-react"

export default function ReportBuilder() {
  const [selectedTables, setSelectedTables] = useState<string[]>([])
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  const availableTables = [
    { name: "sales_orders", description: "Sales order transactions", fields: 12 },
    { name: "customers", description: "Customer master data", fields: 8 },
    { name: "products", description: "Product catalog", fields: 15 },
    { name: "inventory", description: "Stock levels and movements", fields: 10 },
    { name: "employees", description: "Employee information", fields: 18 },
    { name: "vendors", description: "Vendor master data", fields: 9 },
    { name: "purchase_orders", description: "Purchase order data", fields: 11 },
    { name: "financial_transactions", description: "General ledger entries", fields: 14 },
  ]

  const savedReports = [
    {
      id: "RPT-001",
      name: "Monthly Sales Summary",
      description: "Sales performance by month and region",
      creator: "John Smith",
      created: "2024-01-10",
      lastRun: "2024-01-15",
      status: "Active",
      type: "Scheduled",
    },
    {
      id: "RPT-002",
      name: "Inventory Aging Report",
      description: "Stock aging analysis with turnover rates",
      creator: "Sarah Johnson",
      created: "2024-01-08",
      lastRun: "2024-01-14",
      status: "Active",
      type: "On-Demand",
    },
    {
      id: "RPT-003",
      name: "Customer Profitability",
      description: "Customer revenue and profit analysis",
      creator: "Mike Davis",
      created: "2024-01-05",
      lastRun: "2024-01-12",
      status: "Draft",
      type: "Ad-Hoc",
    },
    {
      id: "RPT-004",
      name: "Vendor Performance Scorecard",
      description: "Vendor quality and delivery metrics",
      creator: "Emily Brown",
      created: "2024-01-03",
      lastRun: "2024-01-13",
      status: "Active",
      type: "Scheduled",
    },
  ]

  const reportTemplates = [
    { name: "Financial Statement", description: "P&L, Balance Sheet, Cash Flow", category: "Finance" },
    { name: "Sales Dashboard", description: "Revenue, orders, customer metrics", category: "Sales" },
    { name: "Inventory Analysis", description: "Stock levels, turnover, aging", category: "Inventory" },
    { name: "HR Analytics", description: "Headcount, turnover, performance", category: "HR" },
    { name: "Production Report", description: "Manufacturing metrics and KPIs", category: "Production" },
    { name: "Purchasing Summary", description: "Spend analysis and vendor metrics", category: "Purchasing" },
  ]

  const handleTableSelection = (tableName: string, checked: boolean) => {
    if (checked) {
      setSelectedTables([...selectedTables, tableName])
    } else {
      setSelectedTables(selectedTables.filter((t) => t !== tableName))
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default" as const
      case "Draft":
        return "secondary" as const
      case "Inactive":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "Scheduled":
        return "default" as const
      case "On-Demand":
        return "secondary" as const
      case "Ad-Hoc":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Report Builder</h1>
          <p className="text-muted-foreground">Drag-and-drop query builder for custom reports and analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      {/* Report Builder Interface */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Data Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Data Sources
            </CardTitle>
            <CardDescription>Select tables and fields for your report</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tables..." className="pl-8" />
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availableTables.map((table) => (
                <div key={table.name} className="flex items-start space-x-2 p-2 border rounded">
                  <Checkbox
                    id={table.name}
                    checked={selectedTables.includes(table.name)}
                    onCheckedChange={(checked) => handleTableSelection(table.name, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={table.name} className="text-sm font-medium cursor-pointer">
                      {table.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">{table.description}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {table.fields} fields
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Report Configuration
            </CardTitle>
            <CardDescription>Configure your report parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-name">Report Name</Label>
              <Input id="report-name" placeholder="Enter report name..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-description">Description</Label>
              <Textarea id="report-description" placeholder="Describe your report..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table">Table</SelectItem>
                  <SelectItem value="chart">Chart</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="pivot">Pivot Table</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                Run Report
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileBarChart className="mr-2 h-5 w-5" />
              Report Templates
            </CardTitle>
            <CardDescription>Start with pre-built report templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {reportTemplates.map((template, index) => (
                <div key={index} className="p-3 border rounded cursor-pointer hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{template.name}</div>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Reports</CardTitle>
          <CardDescription>Manage your custom reports and analytics</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search reports..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="on-demand">On-Demand</SelectItem>
                <SelectItem value="ad-hoc">Ad-Hoc</SelectItem>
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
                <TableHead>Report Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{report.description}</TableCell>
                  <TableCell>{report.creator}</TableCell>
                  <TableCell>{report.created}</TableCell>
                  <TableCell>{report.lastRun}</TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(report.type)}>{report.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
