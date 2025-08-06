"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, FileText, DollarSign, Calendar, Users, TrendingUp, Filter, Clock, Award } from 'lucide-react'

const rfqs = [
  {
    id: "RFQ-001",
    title: "Office Supplies Q1 2024",
    category: "Office Supplies",
    status: "open",
    dueDate: "2024-02-15",
    vendorsInvited: 5,
    responsesReceived: 3,
    estimatedValue: 15000,
    createdDate: "2024-01-15",
    buyer: "Sarah Johnson"
  },
  {
    id: "RFQ-002",
    title: "IT Equipment Upgrade",
    category: "Technology",
    status: "awarded",
    dueDate: "2024-02-10",
    vendorsInvited: 8,
    responsesReceived: 6,
    estimatedValue: 125000,
    createdDate: "2024-01-10",
    buyer: "Mike Wilson"
  },
  {
    id: "RFQ-003",
    title: "Manufacturing Components",
    category: "Raw Materials",
    status: "evaluation",
    dueDate: "2024-02-20",
    vendorsInvited: 12,
    responsesReceived: 9,
    estimatedValue: 85000,
    createdDate: "2024-01-18",
    buyer: "Lisa Chen"
  },
  {
    id: "RFQ-004",
    title: "Facility Maintenance Services",
    category: "Services",
    status: "closed",
    dueDate: "2024-02-05",
    vendorsInvited: 6,
    responsesReceived: 4,
    estimatedValue: 45000,
    createdDate: "2024-01-08",
    buyer: "David Brown"
  },
  {
    id: "RFQ-005",
    title: "Marketing Materials",
    category: "Marketing",
    status: "draft",
    dueDate: "2024-02-25",
    vendorsInvited: 0,
    responsesReceived: 0,
    estimatedValue: 25000,
    createdDate: "2024-01-22",
    buyer: "Emma Davis"
  }
]

const vendors = [
  {
    rfqId: "RFQ-001",
    vendor: "ABC Supplies Co",
    quotedPrice: 14500,
    deliveryTime: "5 days",
    status: "submitted",
    score: 85
  },
  {
    rfqId: "RFQ-001",
    vendor: "Office Pro Ltd",
    quotedPrice: 15200,
    deliveryTime: "3 days",
    status: "submitted",
    score: 92
  },
  {
    rfqId: "RFQ-001",
    vendor: "Supply Chain Inc",
    quotedPrice: 13800,
    deliveryTime: "7 days",
    status: "submitted",
    score: 78
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "draft": return "bg-gray-100 text-gray-800"
    case "open": return "bg-blue-100 text-blue-800"
    case "evaluation": return "bg-yellow-100 text-yellow-800"
    case "awarded": return "bg-green-100 text-green-800"
    case "closed": return "bg-red-100 text-red-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getResponseRate = (invited: number, received: number) => {
  if (invited === 0) return 0
  return Math.round((received / invited) * 100)
}

export default function RFQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRFQ, setSelectedRFQ] = useState<string | null>(null)

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || rfq.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRFQs = filteredRFQs.length
  const activeRFQs = filteredRFQs.filter(rfq => rfq.status === "open" || rfq.status === "evaluation").length
  const totalValue = filteredRFQs.reduce((sum, rfq) => sum + rfq.estimatedValue, 0)
  const avgCycleTime = 12 // days

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">RFQ Management</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create RFQ
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total RFQs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{totalRFQs}</div>
            <p className="text-xs text-muted-foreground">All requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active RFQs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{activeRFQs}</div>
            <p className="text-xs text-muted-foreground">Awaiting responses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Estimated value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Cycle Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{avgCycleTime}</div>
            <p className="text-xs text-muted-foreground">Days to award</p>
          </CardContent>
        </Card>
      </div>

      {/* RFQ List */}
      <Card>
        <CardHeader>
          <CardTitle>Request for Quotations</CardTitle>
          <CardDescription>Manage and track your procurement requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search RFQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="evaluation">Evaluation</SelectItem>
                <SelectItem value="awarded">Awarded</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredRFQs.map((rfq) => (
              <Card key={rfq.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedRFQ(selectedRFQ === rfq.id ? null : rfq.id)}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{rfq.id}</h3>
                      <p className="text-sm text-muted-foreground">{rfq.title}</p>
                    </div>
                    <Badge className={getStatusColor(rfq.status)}>
                      {rfq.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <span className="text-sm font-medium">{rfq.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Est. Value:</span>
                      <span className="text-sm font-medium">${rfq.estimatedValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Response Rate:</span>
                      <span className="text-sm">{rfq.responsesReceived}/{rfq.vendorsInvited} ({getResponseRate(rfq.vendorsInvited, rfq.responsesReceived)}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Due Date:</span>
                      <span className="text-sm">{rfq.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Buyer:</span>
                      <span className="text-sm">{rfq.buyer}</span>
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
                  <TableHead>RFQ ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Est. Value</TableHead>
                  <TableHead>Responses</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Buyer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRFQs.map((rfq) => (
                  <TableRow key={rfq.id} className="cursor-pointer hover:bg-muted/50"
                           onClick={() => setSelectedRFQ(selectedRFQ === rfq.id ? null : rfq.id)}>
                    <TableCell className="font-medium">{rfq.id}</TableCell>
                    <TableCell>{rfq.title}</TableCell>
                    <TableCell>{rfq.category}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(rfq.status)}>
                        {rfq.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${rfq.estimatedValue.toLocaleString()}</TableCell>
                    <TableCell>
                      {rfq.responsesReceived}/{rfq.vendorsInvited} ({getResponseRate(rfq.vendorsInvited, rfq.responsesReceived)}%)
                    </TableCell>
                    <TableCell>{rfq.dueDate}</TableCell>
                    <TableCell>{rfq.buyer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Responses (shown when RFQ is selected) */}
      {selectedRFQ && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Vendor Responses - {selectedRFQ}
            </CardTitle>
            <CardDescription>Compare vendor quotations and proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendors.filter(v => v.rfqId === selectedRFQ).map((vendor, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{vendor.vendor}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Price: </span>
                        <span className="font-medium">${vendor.quotedPrice.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Delivery: </span>
                        <span className="font-medium">{vendor.deliveryTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Score: </span>
                        <span className="font-medium">{vendor.score}/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button size="sm">Award</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
