"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, Users, DollarSign, TrendingUp, MapPin, Phone, Mail, Calendar, Star, Filter } from 'lucide-react'

const customers = [
  {
    id: "CUST-001",
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, New York, NY 10001",
    type: "Enterprise",
    status: "Active",
    creditLimit: 100000,
    currentBalance: 15750,
    totalOrders: 45,
    totalRevenue: 285000,
    lastOrderDate: "2024-01-28",
    accountManager: "John Smith",
    industry: "Technology",
    rating: 5,
    paymentTerms: "Net 30",
    registrationDate: "2022-03-15"
  },
  {
    id: "CUST-002",
    name: "Global Solutions Inc",
    email: "info@globalsolutions.com",
    phone: "+1 (555) 234-5678",
    address: "456 Corporate Blvd, Los Angeles, CA 90210",
    type: "Mid-Market",
    status: "Active",
    creditLimit: 75000,
    currentBalance: 8900,
    totalOrders: 32,
    totalRevenue: 198000,
    lastOrderDate: "2024-01-25",
    accountManager: "Sarah Johnson",
    industry: "Manufacturing",
    rating: 4,
    paymentTerms: "Net 15",
    registrationDate: "2022-07-22"
  },
  {
    id: "CUST-003",
    name: "StartUp Ventures",
    email: "hello@startupventures.com",
    phone: "+1 (555) 345-6789",
    address: "789 Innovation St, Austin, TX 78701",
    type: "Small Business",
    status: "Prospect",
    creditLimit: 25000,
    currentBalance: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lastOrderDate: null,
    accountManager: "Mike Wilson",
    industry: "Software",
    rating: 3,
    paymentTerms: "Net 30",
    registrationDate: "2024-01-10"
  },
  {
    id: "CUST-004",
    name: "Enterprise Solutions Ltd",
    email: "sales@enterprisesolutions.com",
    phone: "+1 (555) 456-7890",
    address: "321 Executive Way, Chicago, IL 60601",
    type: "Enterprise",
    status: "Inactive",
    creditLimit: 150000,
    currentBalance: 25600,
    totalOrders: 67,
    totalRevenue: 456000,
    lastOrderDate: "2023-11-15",
    accountManager: "Lisa Chen",
    industry: "Finance",
    rating: 4,
    paymentTerms: "Net 45",
    registrationDate: "2021-09-08"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-800"
    case "Inactive": return "bg-red-100 text-red-800"
    case "Prospect": return "bg-blue-100 text-blue-800"
    case "Suspended": return "bg-yellow-100 text-yellow-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Enterprise": return "bg-purple-100 text-purple-800"
    case "Mid-Market": return "bg-orange-100 text-orange-800"
    case "Small Business": return "bg-blue-100 text-blue-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
    />
  ))
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    const matchesType = typeFilter === "all" || customer.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalCustomers = filteredCustomers.length
  const activeCustomers = filteredCustomers.filter(c => c.status === "Active").length
  const totalRevenue = filteredCustomers.reduce((sum, c) => sum + c.totalRevenue, 0)
  const avgOrderValue = totalRevenue / filteredCustomers.reduce((sum, c) => sum + c.totalOrders, 0) || 0

  const selectedCustomerData = selectedCustomer ? customers.find(c => c.id === selectedCustomer) : null

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Customer Management</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">All customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">{((activeCustomers/totalCustomers)*100).toFixed(0)}% active rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">${avgOrderValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
          <CardDescription>Manage customer information and relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
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
                <SelectItem value="Prospect">Prospect</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="Mid-Market">Mid-Market</SelectItem>
                <SelectItem value="Small Business">Small Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedCustomer(selectedCustomer === customer.id ? null : customer.id)}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{customer.id}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                      <Badge className={getTypeColor(customer.type)}>{customer.type}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Revenue:</span>
                      <span className="text-sm font-medium">${customer.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Orders:</span>
                      <span className="text-sm">{customer.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Balance:</span>
                      <span className="text-sm">${customer.currentBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Rating:</span>
                      <div className="flex">{renderStars(customer.rating)}</div>
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
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Manager</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50"
                           onClick={() => setSelectedCustomer(selectedCustomer === customer.id ? null : customer.id)}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-sm text-muted-foreground">{customer.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(customer.type)}>{customer.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${customer.totalRevenue.toLocaleString()}</TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>${customer.currentBalance.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex">{renderStars(customer.rating)}</div>
                    </TableCell>
                    <TableCell>{customer.accountManager}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details */}
      {selectedCustomerData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Details - {selectedCustomerData.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Company Information</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-muted-foreground">Industry:</span> {selectedCustomerData.industry}</div>
                      <div><span className="text-muted-foreground">Type:</span> {selectedCustomerData.type}</div>
                      <div><span className="text-muted-foreground">Status:</span> {selectedCustomerData.status}</div>
                      <div><span className="text-muted-foreground">Registration:</span> {selectedCustomerData.registrationDate}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Account Management</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-muted-foreground">Account Manager:</span> {selectedCustomerData.accountManager}</div>
                      <div><span className="text-muted-foreground">Payment Terms:</span> {selectedCustomerData.paymentTerms}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex">{renderStars(selectedCustomerData.rating)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="financial" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">${selectedCustomerData.totalRevenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Revenue</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">${selectedCustomerData.currentBalance.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Current Balance</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">${selectedCustomerData.creditLimit.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Credit Limit</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Credit Utilization</span>
                    <span>{((selectedCustomerData.currentBalance / selectedCustomerData.creditLimit) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(selectedCustomerData.currentBalance / selectedCustomerData.creditLimit) * 100} className="h-2" />
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{selectedCustomerData.totalOrders}</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">
                        ${selectedCustomerData.totalOrders > 0 ? (selectedCustomerData.totalRevenue / selectedCustomerData.totalOrders).toLocaleString() : '0'}
                      </div>
                      <div className="text-sm text-muted-foreground">Average Order Value</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Last Order:</span> {selectedCustomerData.lastOrderDate || 'No orders yet'}
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCustomerData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCustomerData.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{selectedCustomerData.address}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
