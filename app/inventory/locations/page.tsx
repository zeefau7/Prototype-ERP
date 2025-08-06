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
import { MapPin, Package, AlertTriangle, Plus, Search, Filter, Building, Warehouse } from "lucide-react"

// Mock data for locations
const locations = [
  {
    id: "LOC001",
    name: "Main Warehouse",
    type: "warehouse",
    address: "123 Industrial Blvd, City, State 12345",
    capacity: 10000,
    utilized: 7500,
    zones: 12,
    status: "active",
    manager: "John Smith",
  },
  {
    id: "LOC002",
    name: "Distribution Center A",
    type: "distribution",
    address: "456 Commerce St, City, State 12346",
    capacity: 5000,
    utilized: 3200,
    zones: 8,
    status: "active",
    manager: "Sarah Johnson",
  },
  {
    id: "LOC003",
    name: "Retail Store - Downtown",
    type: "retail",
    address: "789 Main St, City, State 12347",
    capacity: 500,
    utilized: 450,
    zones: 3,
    status: "active",
    manager: "Mike Davis",
  },
  {
    id: "LOC004",
    name: "Cold Storage Facility",
    type: "cold-storage",
    address: "321 Freezer Rd, City, State 12348",
    capacity: 2000,
    utilized: 1800,
    zones: 6,
    status: "maintenance",
    manager: "Lisa Wilson",
  },
]

const zones = [
  { id: "Z001", locationId: "LOC001", name: "Receiving", type: "receiving", capacity: 1000, utilized: 800, items: 45 },
  { id: "Z002", locationId: "LOC001", name: "Storage A1", type: "storage", capacity: 2000, utilized: 1500, items: 120 },
  { id: "Z003", locationId: "LOC001", name: "Storage A2", type: "storage", capacity: 2000, utilized: 1800, items: 95 },
  { id: "Z004", locationId: "LOC001", name: "Picking Zone", type: "picking", capacity: 500, utilized: 400, items: 30 },
  { id: "Z005", locationId: "LOC001", name: "Shipping", type: "shipping", capacity: 800, utilized: 600, items: 25 },
]

const locationTypes = [
  { value: "warehouse", label: "Warehouse", icon: Warehouse },
  { value: "distribution", label: "Distribution Center", icon: Building },
  { value: "retail", label: "Retail Store", icon: MapPin },
  { value: "cold-storage", label: "Cold Storage", icon: Package },
]

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false)

  const filteredLocations = locations.filter(
    (location) =>
      (selectedLocation === "all" || location.type === selectedLocation) &&
      (location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      maintenance: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getTypeIcon = (type: string) => {
    const typeConfig = locationTypes.find((t) => t.value === type)
    const IconComponent = typeConfig?.icon || MapPin
    return <IconComponent className="h-4 w-4" />
  }

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Locations</h1>
          <p className="text-muted-foreground">Manage warehouses, distribution centers, and storage locations</p>
        </div>
        <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>Create a new inventory location</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input id="address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity
                </Label>
                <Input id="capacity" type="number" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddLocationOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddLocationOpen(false)}>Create Location</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
            <p className="text-xs text-muted-foreground">Across all types</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {locations.reduce((sum, loc) => sum + loc.capacity, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Square feet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (locations.reduce((sum, loc) => sum + loc.utilized, 0) /
                  locations.reduce((sum, loc) => sum + loc.capacity, 0)) *
                  100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Overall utilization</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Zones</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.reduce((sum, loc) => sum + loc.zones, 0)}</div>
            <p className="text-xs text-muted-foreground">Total zones</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {locationTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="locations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location Management</CardTitle>
              <CardDescription>Overview of all inventory locations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Zones</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocations.map((location) => {
                    const utilizationPercentage = Math.round((location.utilized / location.capacity) * 100)
                    return (
                      <TableRow key={location.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{location.name}</div>
                            <div className="text-sm text-muted-foreground">{location.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(location.type)}
                            <span className="capitalize">{location.type.replace("-", " ")}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{location.address}</TableCell>
                        <TableCell>{location.capacity.toLocaleString()} sq ft</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={utilizationPercentage} className="w-16" />
                            <span className={`text-sm ${getUtilizationColor(utilizationPercentage)}`}>
                              {utilizationPercentage}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{location.zones}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(location.status)}>{location.status}</Badge>
                        </TableCell>
                        <TableCell>{location.manager}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zone Management</CardTitle>
              <CardDescription>Detailed view of storage zones within locations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zone ID</TableHead>
                    <TableHead>Zone Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zones.map((zone) => {
                    const utilizationPercentage = Math.round((zone.utilized / zone.capacity) * 100)
                    return (
                      <TableRow key={zone.id}>
                        <TableCell className="font-medium">{zone.id}</TableCell>
                        <TableCell>{zone.name}</TableCell>
                        <TableCell className="capitalize">{zone.type}</TableCell>
                        <TableCell>{zone.capacity.toLocaleString()} sq ft</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={utilizationPercentage} className="w-16" />
                            <span className={`text-sm ${getUtilizationColor(utilizationPercentage)}`}>
                              {utilizationPercentage}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{zone.items} items</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location Map</CardTitle>
              <CardDescription>Geographic view of all inventory locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-muted-foreground">Map integration would be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
