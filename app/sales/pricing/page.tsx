"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, DollarSign, Percent, TrendingUp, Calculator, Tag, Filter } from 'lucide-react'

const pricingRules = [
  {
    id: "RULE-001",
    name: "Volume Discount - Electronics",
    type: "Volume",
    category: "Electronics",
    condition: "Quantity >= 100",
    discount: 15,
    status: "Active",
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    priority: 1,
    createdBy: "John Smith"
  },
  {
    id: "RULE-002",
    name: "Customer Tier - Enterprise",
    type: "Customer Tier",
    category: "All Products",
    condition: "Customer Type = Enterprise",
    discount: 20,
    status: "Active",
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    priority: 2,
    createdBy: "Sarah Johnson"
  },
  {
    id: "RULE-003",
    name: "Seasonal Promotion - Q1",
    type: "Promotional",
    category: "Office Supplies",
    condition: "Date Range Q1 2024",
    discount: 10,
    status: "Expired",
    validFrom: "2024-01-01",
    validTo: "2024-03-31",
    priority: 3,
    createdBy: "Mike Wilson"
  },
  {
    id: "RULE-004",
    name: "Bundle Discount - Software",
    type: "Bundle",
    category: "Software",
    condition: "Bundle >= 3 items",
    discount: 25,
    status: "Active",
    validFrom: "2024-01-15",
    validTo: "2024-06-30",
    priority: 1,
    createdBy: "Lisa Chen"
  }
]

const priceHistory = [
  {
    product: "Wireless Headphones Pro",
    sku: "WHP-001",
    basePrice: 299.99,
    currentPrice: 254.99,
    previousPrice: 279.99,
    changeDate: "2024-01-25",
    changeReason: "Volume Discount Applied",
    margin: 45.2,
    competitor: "Best Electronics",
    competitorPrice: 269.99
  },
  {
    product: "Bluetooth Speaker Max",
    sku: "BSM-002",
    basePrice: 199.99,
    currentPrice: 179.99,
    previousPrice: 199.99,
    changeDate: "2024-01-20",
    changeReason: "Promotional Discount",
    margin: 38.5,
    competitor: "Audio World",
    competitorPrice: 189.99
  },
  {
    product: "USB-C Cable Premium",
    sku: "UCC-003",
    basePrice: 29.99,
    currentPrice: 26.99,
    previousPrice: 29.99,
    changeDate: "2024-01-18",
    changeReason: "Customer Tier Discount",
    margin: 52.1,
    competitor: "Cable Co",
    competitorPrice: 24.99
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-800"
    case "Inactive": return "bg-gray-100 text-gray-800"
    case "Expired": return "bg-red-100 text-red-800"
    case "Scheduled": return "bg-blue-100 text-blue-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Volume": return "bg-blue-100 text-blue-800"
    case "Customer Tier": return "bg-purple-100 text-purple-800"
    case "Promotional": return "bg-orange-100 text-orange-800"
    case "Bundle": return "bg-green-100 text-green-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export default function PricingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredRules = pricingRules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || rule.status === statusFilter
    const matchesType = typeFilter === "all" || rule.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalRules = filteredRules.length
  const activeRules = filteredRules.filter(r => r.status === "Active").length
  const avgDiscount = filteredRules.reduce((sum, r) => sum + r.discount, 0) / filteredRules.length || 0
  const totalSavings = 125000 // Mock data

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dynamic Pricing</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Rule
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{totalRules}</div>
            <p className="text-xs text-muted-foreground">Pricing rules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{activeRules}</div>
            <p className="text-xs text-muted-foreground">{((activeRules/totalRules)*100).toFixed(0)}% active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Discount</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{avgDiscount.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Average discount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">${totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Customer savings</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Management</CardTitle>
          <CardDescription>Manage dynamic pricing rules and price history</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rules" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
              <TabsTrigger value="history">Price History</TabsTrigger>
              <TabsTrigger value="analysis">Price Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rules" className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search pricing rules..."
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full lg:w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Volume">Volume</SelectItem>
                    <SelectItem value="Customer Tier">Customer Tier</SelectItem>
                    <SelectItem value="Promotional">Promotional</SelectItem>
                    <SelectItem value="Bundle">Bundle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Card View */}
              <div className="block lg:hidden space-y-4">
                {filteredRules.map((rule) => (
                  <Card key={rule.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{rule.name}</h3>
                          <p className="text-sm text-muted-foreground">{rule.id}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className={getStatusColor(rule.status)}>{rule.status}</Badge>
                          <Badge className={getTypeColor(rule.type)}>{rule.type}</Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Category:</span>
                          <span className="text-sm">{rule.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Discount:</span>
                          <span className="text-sm font-medium">{rule.discount}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Valid Until:</span>
                          <span className="text-sm">{rule.validTo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Priority:</span>
                          <span className="text-sm">{rule.priority}</span>
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
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valid Until</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{rule.name}</div>
                            <div className="text-sm text-muted-foreground">{rule.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(rule.type)}>{rule.type}</Badge>
                        </TableCell>
                        <TableCell>{rule.category}</TableCell>
                        <TableCell className="max-w-xs truncate">{rule.condition}</TableCell>
                        <TableCell className="font-medium">{rule.discount}%</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(rule.status)}>{rule.status}</Badge>
                        </TableCell>
                        <TableCell>{rule.validTo}</TableCell>
                        <TableCell>{rule.priority}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <div className="space-y-4">
                {priceHistory.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{item.product}</h4>
                          <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Base Price</div>
                            <div className="font-medium">${item.basePrice}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Current Price</div>
                            <div className="font-medium text-green-600">${item.currentPrice}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Previous Price</div>
                            <div className="font-medium">${item.previousPrice}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Margin</div>
                            <div className="font-medium">{item.margin}%</div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="text-muted-foreground">Changed: {item.changeDate}</div>
                          <div>{item.changeReason}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analysis" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Competitive Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {priceHistory.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{item.product}</div>
                            <div className="text-sm text-muted-foreground">vs {item.competitor}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${item.currentPrice} vs ${item.competitorPrice}</div>
                            <div className={`text-sm ${item.currentPrice < item.competitorPrice ? 'text-green-600' : 'text-red-600'}`}>
                              {item.currentPrice < item.competitorPrice ? 'Competitive' : 'Above Market'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Margin Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {priceHistory.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.product}</span>
                            <span className="font-medium">{item.margin}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(item.margin, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
