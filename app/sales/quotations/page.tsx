"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, FileText, DollarSign, Calendar, User, TrendingUp, Filter } from 'lucide-react'

const quotations = [
  {
    id: "QUO-001",
    customer: "Acme Corp",
    amount: 15750.00,
    status: "pending",
    validUntil: "2024-02-15",
    salesRep: "John Smith",
    probability: 75,
    items: 5,
    createdDate: "2024-01-15"
  },
  {
    id: "QUO-002", 
    customer: "Tech Solutions Inc",
    amount: 28900.00,
    status: "approved",
    validUntil: "2024-02-20",
    salesRep: "Sarah Johnson",
    probability: 90,
    items: 8,
    createdDate: "2024-01-18"
  },
  {
    id: "QUO-003",
    customer: "Global Industries",
    amount: 42300.00,
    status: "draft",
    validUntil: "2024-02-25",
    salesRep: "Mike Wilson",
    probability: 60,
    items: 12,
    createdDate: "2024-01-20"
  },
  {
    id: "QUO-004",
    customer: "StartUp Ventures",
    amount: 8500.00,
    status: "rejected",
    validUntil: "2024-02-10",
    salesRep: "Lisa Chen",
    probability: 25,
    items: 3,
    createdDate: "2024-01-12"
  },
  {
    id: "QUO-005",
    customer: "Enterprise Solutions",
    amount: 67200.00,
    status: "converted",
    validUntil: "2024-02-28",
    salesRep: "David Brown",
    probability: 100,
    items: 15,
    createdDate: "2024-01-25"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-yellow-100 text-yellow-800"
    case "approved": return "bg-blue-100 text-blue-800"
    case "draft": return "bg-gray-100 text-gray-800"
    case "rejected": return "bg-red-100 text-red-800"
    case "converted": return "bg-green-100 text-green-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getProbabilityColor = (probability: number) => {
  if (probability >= 80) return "text-green-600"
  if (probability >= 60) return "text-yellow-600"
  return "text-red-600"
}

export default function QuotationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredQuotations = quotations.filter(quote => {
    const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalValue = filteredQuotations.reduce((sum, quote) => sum + quote.amount, 0)
  const avgProbability = filteredQuotations.reduce((sum, quote) => sum + quote.probability, 0) / filteredQuotations.length || 0

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Sales Quotations</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Quotation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotations</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{filteredQuotations.length}</div>
            <p className="text-xs text-muted-foreground">Active quotations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Combined quote value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Probability</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{avgProbability.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Win probability</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">
              {((quotations.filter(q => q.status === 'converted').length / quotations.length) * 100).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">Quotes to orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Quotation Management</CardTitle>
          <CardDescription>Manage and track your sales quotations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quotations..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {filteredQuotations.map((quote) => (
              <Card key={quote.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{quote.id}</h3>
                      <p className="text-sm text-muted-foreground">{quote.customer}</p>
                    </div>
                    <Badge className={getStatusColor(quote.status)}>
                      {quote.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="font-medium">${quote.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Probability:</span>
                      <span className={`font-medium ${getProbabilityColor(quote.probability)}`}>
                        {quote.probability}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Valid Until:</span>
                      <span className="text-sm">{quote.validUntil}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sales Rep:</span>
                      <span className="text-sm">{quote.salesRep}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Sales Rep</TableHead>
                  <TableHead>Items</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotations.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">{quote.id}</TableCell>
                    <TableCell>{quote.customer}</TableCell>
                    <TableCell>${quote.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(quote.status)}>
                        {quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={getProbabilityColor(quote.probability)}>
                        {quote.probability}%
                      </span>
                    </TableCell>
                    <TableCell>{quote.validUntil}</TableCell>
                    <TableCell>{quote.salesRep}</TableCell>
                    <TableCell>{quote.items}</TableCell>
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
