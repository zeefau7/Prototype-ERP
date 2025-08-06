"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, Building2, Star, TrendingUp, AlertTriangle } from "lucide-react"

export default function VendorManagement() {
  const vendors = [
    {
      id: "VEN-001",
      name: "Tech Components Ltd",
      contact: "Alice Johnson",
      email: "alice@techcomponents.com",
      phone: "+1 (555) 123-4567",
      category: "Electronics",
      rating: 4.8,
      status: "Active",
      totalOrders: 45,
      totalSpend: "$125,000",
      onTimeDelivery: 96,
      qualityScore: 98,
      paymentTerms: "Net 30",
    },
    {
      id: "VEN-002",
      name: "Global Supplies Inc",
      contact: "Bob Smith",
      email: "bob@globalsupplies.com",
      phone: "+1 (555) 234-5678",
      category: "Office Supplies",
      rating: 4.2,
      status: "Active",
      totalOrders: 32,
      totalSpend: "$89,500",
      onTimeDelivery: 88,
      qualityScore: 92,
      paymentTerms: "Net 15",
    },
    {
      id: "VEN-003",
      name: "Manufacturing Solutions",
      contact: "Carol Davis",
      email: "carol@mfgsolutions.com",
      phone: "+1 (555) 345-6789",
      category: "Raw Materials",
      rating: 4.6,
      status: "Under Review",
      totalOrders: 28,
      totalSpend: "$156,200",
      onTimeDelivery: 94,
      qualityScore: 95,
      paymentTerms: "Net 45",
    },
    {
      id: "VEN-004",
      name: "Service Providers Co",
      contact: "David Brown",
      email: "david@serviceproviders.com",
      phone: "+1 (555) 456-7890",
      category: "Services",
      rating: 3.8,
      status: "Inactive",
      totalOrders: 15,
      totalSpend: "$45,300",
      onTimeDelivery: 82,
      qualityScore: 88,
      paymentTerms: "Net 60",
    },
  ]

  const vendorCategories = [
    { category: "Electronics", vendors: 12, spend: "$450,000", avgRating: 4.5 },
    { category: "Raw Materials", vendors: 8, spend: "$320,000", avgRating: 4.3 },
    { category: "Office Supplies", vendors: 15, spend: "$125,000", avgRating: 4.1 },
    { category: "Services", vendors: 6, spend: "$89,000", avgRating: 3.9 },
    { category: "Equipment", vendors: 4, spend: "$210,000", avgRating: 4.7 },
  ]

  const performanceMetrics = [
    { metric: "On-Time Delivery", target: 95, actual: 92, trend: "up" },
    { metric: "Quality Score", target: 95, actual: 94, trend: "up" },
    { metric: "Cost Savings", target: 10, actual: 12, trend: "up" },
    { metric: "Vendor Diversity", target: 25, actual: 22, trend: "down" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default" as const
      case "Under Review":
        return "secondary" as const
      case "Inactive":
        return "outline" as const
      case "Blacklisted":
        return "destructive" as const
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

  const getPerformanceColor = (actual: number, target: number, trend: string) => {
    if (actual >= target) return "text-green-600"
    if (actual >= target * 0.9) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
          <p className="text-muted-foreground">
            Supplier qualification with performance scorecards and risk assessment
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Across 5 categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">84.4% of total vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3</div>
            <p className="text-xs text-muted-foreground">Out of 5.0 stars</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Vendors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Categories</CardTitle>
          <CardDescription>Vendor distribution and spend by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendorCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{category.category}</div>
                  <div className="text-sm text-muted-foreground">{category.vendors} vendors</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{category.spend}</div>
                  <div className="flex items-center space-x-1">
                    {renderStars(category.avgRating)}
                    <span className="text-sm ml-2">{category.avgRating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators across all vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <div className="font-medium">{metric.metric}</div>
                <div className="flex items-center justify-between">
                  <div
                    className={`text-2xl font-bold ${getPerformanceColor(metric.actual, metric.target, metric.trend)}`}
                  >
                    {metric.actual}%
                  </div>
                  <div className="text-sm text-muted-foreground">Target: {metric.target}%</div>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {metric.trend === "up" ? "Improving" : "Declining"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Directory</CardTitle>
          <CardDescription>Complete vendor database with performance tracking</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vendors..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="raw-materials">Raw Materials</SelectItem>
                <SelectItem value="office-supplies">Office Supplies</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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
                <TableHead>Vendor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>On-Time %</TableHead>
                <TableHead>Quality %</TableHead>
                <TableHead>Status</TableHead>
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
                    <Badge variant="outline">{vendor.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(vendor.rating)}
                      <span className="text-sm font-medium ml-2">{vendor.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.totalOrders}</TableCell>
                  <TableCell className="font-medium">{vendor.totalSpend}</TableCell>
                  <TableCell>
                    <Badge variant={vendor.onTimeDelivery >= 95 ? "default" : "secondary"}>
                      {vendor.onTimeDelivery}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={vendor.qualityScore >= 95 ? "default" : "secondary"}>{vendor.qualityScore}%</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(vendor.status)}>{vendor.status}</Badge>
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
