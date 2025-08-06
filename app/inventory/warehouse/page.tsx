"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Download, Warehouse, MapPin, Package, TrendingUp } from "lucide-react"

export default function WarehouseManagement() {
  const warehouses = [
    {
      id: "WH-001",
      name: "Main Distribution Center",
      location: "New York, NY",
      capacity: 50000,
      utilized: 42500,
      zones: 12,
      staff: 45,
      status: "Active",
      manager: "John Smith",
    },
    {
      id: "WH-002",
      name: "West Coast Facility",
      location: "Los Angeles, CA",
      capacity: 35000,
      utilized: 28000,
      zones: 8,
      staff: 32,
      status: "Active",
      manager: "Sarah Johnson",
    },
    {
      id: "WH-003",
      name: "Regional Hub",
      location: "Chicago, IL",
      capacity: 25000,
      utilized: 18500,
      zones: 6,
      staff: 24,
      status: "Active",
      manager: "Mike Davis",
    },
  ]

  const zones = [
    {
      id: "A-01",
      warehouse: "Main Distribution Center",
      type: "Receiving",
      capacity: 5000,
      utilized: 3200,
      items: 450,
      temperature: "Ambient",
      status: "Active",
    },
    {
      id: "A-02",
      warehouse: "Main Distribution Center",
      type: "Storage",
      capacity: 15000,
      utilized: 12800,
      items: 2100,
      temperature: "Ambient",
      status: "Active",
    },
    {
      id: "B-01",
      warehouse: "Main Distribution Center",
      type: "Cold Storage",
      capacity: 3000,
      utilized: 2400,
      items: 180,
      temperature: "2-8°C",
      status: "Active",
    },
    {
      id: "C-01",
      warehouse: "Main Distribution Center",
      type: "Shipping",
      capacity: 4000,
      utilized: 2100,
      items: 320,
      temperature: "Ambient",
      status: "Active",
    },
  ]

  const movements = [
    {
      id: "MOV-001",
      type: "Inbound",
      item: "Wireless Headphones",
      quantity: 500,
      from: "Supplier Dock",
      to: "Zone A-02",
      timestamp: "2024-01-15 09:30",
      operator: "John Doe",
      status: "Completed",
    },
    {
      id: "MOV-002",
      type: "Transfer",
      item: "Bluetooth Speaker",
      quantity: 200,
      from: "Zone A-02",
      to: "Zone C-01",
      timestamp: "2024-01-15 10:15",
      operator: "Jane Smith",
      status: "In Progress",
    },
    {
      id: "MOV-003",
      type: "Outbound",
      item: "USB Cable",
      quantity: 1000,
      from: "Zone C-01",
      to: "Shipping Dock",
      timestamp: "2024-01-15 11:00",
      operator: "Bob Wilson",
      status: "Completed",
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default" as const
      case "Inactive":
        return "secondary" as const
      case "Maintenance":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  const getMovementStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default" as const
      case "In Progress":
        return "secondary" as const
      case "Pending":
        return "outline" as const
      case "Failed":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warehouse Management</h1>
          <p className="text-muted-foreground">Multi-location with bin/zone tracking and pick/pack optimization</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Warehouse
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Warehouses</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Across 3 regions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">110K</div>
            <p className="text-xs text-muted-foreground">Square feet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81%</div>
            <p className="text-xs text-muted-foreground">89K sq ft utilized</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Zones</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26</div>
            <p className="text-xs text-muted-foreground">Storage zones</p>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Warehouse Facilities</CardTitle>
          <CardDescription>Multi-location warehouse capacity and utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Warehouse ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Zones</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell className="font-medium">{warehouse.id}</TableCell>
                  <TableCell>{warehouse.name}</TableCell>
                  <TableCell>{warehouse.location}</TableCell>
                  <TableCell>{warehouse.capacity.toLocaleString()} sq ft</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {((warehouse.utilized / warehouse.capacity) * 100).toFixed(1)}%
                      </div>
                      <Progress value={(warehouse.utilized / warehouse.capacity) * 100} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{warehouse.zones}</TableCell>
                  <TableCell>{warehouse.staff}</TableCell>
                  <TableCell>{warehouse.manager}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(warehouse.status)}>{warehouse.status}</Badge>
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

      {/* Zone Management */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Management</CardTitle>
          <CardDescription>Warehouse zones with bin tracking and temperature control</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search zones..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                <SelectItem value="wh-001">Main Distribution</SelectItem>
                <SelectItem value="wh-002">West Coast</SelectItem>
                <SelectItem value="wh-003">Regional Hub</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Zone Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="receiving">Receiving</SelectItem>
                <SelectItem value="storage">Storage</SelectItem>
                <SelectItem value="cold">Cold Storage</SelectItem>
                <SelectItem value="shipping">Shipping</SelectItem>
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
                <TableHead>Zone ID</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell className="font-medium">{zone.id}</TableCell>
                  <TableCell>{zone.warehouse}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{zone.type}</Badge>
                  </TableCell>
                  <TableCell>{zone.capacity.toLocaleString()} sq ft</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{((zone.utilized / zone.capacity) * 100).toFixed(1)}%</div>
                      <Progress value={(zone.utilized / zone.capacity) * 100} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{zone.items}</TableCell>
                  <TableCell>
                    <Badge variant={zone.temperature === "Ambient" ? "secondary" : "outline"}>{zone.temperature}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(zone.status)}>{zone.status}</Badge>
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

      {/* Recent Movements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Inventory Movements</CardTitle>
          <CardDescription>Real-time tracking of inventory transfers and movements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Movement ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell className="font-medium">{movement.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{movement.type}</Badge>
                  </TableCell>
                  <TableCell>{movement.item}</TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.from}</TableCell>
                  <TableCell>{movement.to}</TableCell>
                  <TableCell>{movement.timestamp}</TableCell>
                  <TableCell>{movement.operator}</TableCell>
                  <TableCell>
                    <Badge variant={getMovementStatusVariant(movement.status)}>{movement.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
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
