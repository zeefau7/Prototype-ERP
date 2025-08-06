"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Download, Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

export default function StockTracking() {
  const stockItems = [
    {
      sku: "SKU-001",
      name: "Wireless Headphones",
      category: "Electronics",
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      unitCost: "$45.00",
      totalValue: "$6,750",
      status: "In Stock",
      location: "WH-A-01",
    },
    {
      sku: "SKU-002",
      name: "Bluetooth Speaker",
      category: "Electronics",
      currentStock: 25,
      minStock: 30,
      maxStock: 200,
      unitCost: "$65.00",
      totalValue: "$1,625",
      status: "Low Stock",
      location: "WH-A-02",
    },
    {
      sku: "SKU-003",
      name: "USB Cable",
      category: "Accessories",
      currentStock: 500,
      minStock: 100,
      maxStock: 1000,
      unitCost: "$8.00",
      totalValue: "$4,000",
      status: "In Stock",
      location: "WH-B-01",
    },
    {
      sku: "SKU-004",
      name: "Phone Case",
      category: "Accessories",
      currentStock: 0,
      minStock: 25,
      maxStock: 300,
      unitCost: "$12.00",
      totalValue: "$0",
      status: "Out of Stock",
      location: "WH-B-02",
    },
    {
      sku: "SKU-005",
      name: "Laptop Stand",
      category: "Office",
      currentStock: 75,
      minStock: 20,
      maxStock: 150,
      unitCost: "$35.00",
      totalValue: "$2,625",
      status: "In Stock",
      location: "WH-C-01",
    },
  ]

  const stockMovements = [
    {
      date: "2024-01-15",
      sku: "SKU-001",
      type: "IN",
      quantity: 100,
      reason: "Purchase Order PO-001",
      location: "WH-A-01",
    },
    {
      date: "2024-01-15",
      sku: "SKU-002",
      type: "OUT",
      quantity: 15,
      reason: "Sales Order SO-123",
      location: "WH-A-02",
    },
    {
      date: "2024-01-14",
      sku: "SKU-003",
      type: "IN",
      quantity: 200,
      reason: "Purchase Order PO-002",
      location: "WH-B-01",
    },
    {
      date: "2024-01-14",
      sku: "SKU-004",
      type: "OUT",
      quantity: 25,
      reason: "Sales Order SO-124",
      location: "WH-B-02",
    },
    {
      date: "2024-01-13",
      sku: "SKU-005",
      type: "IN",
      quantity: 50,
      reason: "Purchase Order PO-003",
      location: "WH-C-01",
    },
  ]

  const getStockStatus = (current: number, min: number, max: number) => {
    if (current === 0) return { status: "Out of Stock", variant: "destructive" as const, percentage: 0 }
    if (current <= min) return { status: "Low Stock", variant: "secondary" as const, percentage: (current / max) * 100 }
    return { status: "In Stock", variant: "default" as const, percentage: (current / max) * 100 }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Tracking</h1>
          <p className="text-muted-foreground">
            Monitor inventory levels with FIFO/LIFO/Weighted Average costing methods
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,901</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Auto-PO generation enabled</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Items */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Real-time stock levels with automatic reorder points</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search items..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="office">Office</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
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
                <TableHead>SKU</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Unit Cost</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockItems.map((item) => {
                const stockInfo = getStockStatus(item.currentStock, item.minStock, item.maxStock)
                return (
                  <TableRow key={item.sku}>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="font-medium">{item.currentStock}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={stockInfo.percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          Min: {item.minStock} | Max: {item.maxStock}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.unitCost}</TableCell>
                    <TableCell className="font-medium">{item.totalValue}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Badge variant={stockInfo.variant}>{stockInfo.status}</Badge>
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
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Stock Movements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Stock Movements</CardTitle>
          <CardDescription>Latest inventory transactions and adjustments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockMovements.map((movement, index) => (
                <TableRow key={index}>
                  <TableCell>{movement.date}</TableCell>
                  <TableCell className="font-medium">{movement.sku}</TableCell>
                  <TableCell>
                    <Badge variant={movement.type === "IN" ? "default" : "secondary"}>{movement.type}</Badge>
                  </TableCell>
                  <TableCell className={`font-medium ${movement.type === "IN" ? "text-green-600" : "text-red-600"}`}>
                    {movement.type === "IN" ? "+" : "-"}
                    {movement.quantity}
                  </TableCell>
                  <TableCell>{movement.reason}</TableCell>
                  <TableCell>{movement.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
