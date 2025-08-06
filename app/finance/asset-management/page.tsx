"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, Building, TrendingDown, Calendar, AlertTriangle } from "lucide-react"

export default function AssetManagement() {
  const assets = [
    {
      id: "AST-001",
      name: "Manufacturing Equipment A",
      category: "Machinery",
      location: "Factory Floor 1",
      purchaseDate: "2020-01-15",
      purchaseValue: "$125,000",
      currentValue: "$87,500",
      depreciation: "30%",
      condition: "Good",
      status: "Active",
      nextMaintenance: "2024-02-15",
    },
    {
      id: "AST-002",
      name: "Office Building",
      category: "Real Estate",
      location: "Main Campus",
      purchaseDate: "2018-06-01",
      purchaseValue: "$2,500,000",
      currentValue: "$2,750,000",
      depreciation: "-10%",
      condition: "Excellent",
      status: "Active",
      nextMaintenance: "2024-03-01",
    },
    {
      id: "AST-003",
      name: "Delivery Truck Fleet",
      category: "Vehicles",
      location: "Warehouse",
      purchaseDate: "2021-03-20",
      purchaseValue: "$180,000",
      currentValue: "$108,000",
      depreciation: "40%",
      condition: "Fair",
      status: "Active",
      nextMaintenance: "2024-01-30",
    },
    {
      id: "AST-004",
      name: "IT Server Infrastructure",
      category: "Technology",
      location: "Data Center",
      purchaseDate: "2022-09-10",
      purchaseValue: "$95,000",
      currentValue: "$66,500",
      depreciation: "30%",
      condition: "Good",
      status: "Active",
      nextMaintenance: "2024-02-10",
    },
  ]

  const depreciationSchedule = [
    { year: "2024", straightLine: "$45,000", accelerated: "$52,000", actual: "$48,500" },
    { year: "2025", straightLine: "$45,000", accelerated: "$41,600", actual: "$43,300" },
    { year: "2026", straightLine: "$45,000", accelerated: "$33,280", actual: "$39,140" },
    { year: "2027", straightLine: "$45,000", accelerated: "$26,624", actual: "$35,812" },
  ]

  const assetCategories = [
    { category: "Machinery", count: 15, value: "$1,250,000", depreciation: "25%" },
    { category: "Real Estate", count: 3, value: "$3,200,000", depreciation: "-5%" },
    { category: "Vehicles", count: 8, value: "$320,000", depreciation: "35%" },
    { category: "Technology", count: 12, value: "$480,000", depreciation: "40%" },
    { category: "Furniture", count: 25, value: "$125,000", depreciation: "20%" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default" as const
      case "Inactive":
        return "secondary" as const
      case "Disposed":
        return "outline" as const
      case "Under Maintenance":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  const getConditionVariant = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "default" as const
      case "Good":
        return "secondary" as const
      case "Fair":
        return "outline" as const
      case "Poor":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asset Management</h1>
          <p className="text-muted-foreground">Fixed asset tracking with depreciation schedules and maintenance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">63</div>
            <p className="text-xs text-muted-foreground">Across 5 categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5.4M</div>
            <p className="text-xs text-muted-foreground">Current book value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Depreciation</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$485K</div>
            <p className="text-xs text-muted-foreground">This fiscal year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Assets require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Asset Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Categories</CardTitle>
          <CardDescription>Asset distribution and depreciation by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assetCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{category.category}</div>
                  <div className="text-sm text-muted-foreground">{category.count} assets</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{category.value}</div>
                  <div
                    className={`text-sm ${category.depreciation.startsWith("-") ? "text-green-600" : "text-red-600"}`}
                  >
                    {category.depreciation} depreciation
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Asset Register */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Register</CardTitle>
          <CardDescription>Complete fixed asset inventory with depreciation tracking</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search assets..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="machinery">Machinery</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="vehicles">Vehicles</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="disposed">Disposed</SelectItem>
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
                <TableHead>Asset ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Purchase Value</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Depreciation</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.id}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{asset.category}</Badge>
                  </TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.purchaseDate}</TableCell>
                  <TableCell className="font-medium">{asset.purchaseValue}</TableCell>
                  <TableCell className="font-medium">{asset.currentValue}</TableCell>
                  <TableCell className={asset.depreciation.startsWith("-") ? "text-green-600" : "text-red-600"}>
                    {asset.depreciation}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getConditionVariant(asset.condition)}>{asset.condition}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(asset.status)}>{asset.status}</Badge>
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

      {/* Depreciation Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Depreciation Schedule</CardTitle>
          <CardDescription>Multi-method depreciation calculation and forecasting</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Straight Line</TableHead>
                <TableHead>Accelerated</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead className="text-right">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {depreciationSchedule.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{schedule.year}</TableCell>
                  <TableCell>{schedule.straightLine}</TableCell>
                  <TableCell>{schedule.accelerated}</TableCell>
                  <TableCell className="font-medium">{schedule.actual}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">
                      {(
                        ((Number.parseFloat(schedule.actual.replace("$", "").replace(",", "")) -
                          Number.parseFloat(schedule.straightLine.replace("$", "").replace(",", ""))) /
                          Number.parseFloat(schedule.straightLine.replace("$", "").replace(",", ""))) *
                        100
                      ).toFixed(1)}
                      %
                    </Badge>
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
