"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Download, CreditCard, AlertTriangle, Clock, CheckCircle } from "lucide-react"

export default function AccountsReceivable() {
  const invoices = [
    {
      id: "INV-2024-001",
      customer: "Acme Corp",
      amount: "$5,250.00",
      dueDate: "2024-01-25",
      status: "Overdue",
      daysOverdue: 5,
      paymentTerms: "Net 30",
      salesRep: "John Smith",
    },
    {
      id: "INV-2024-002",
      customer: "Tech Solutions Inc",
      amount: "$3,750.00",
      dueDate: "2024-01-28",
      status: "Due Soon",
      daysOverdue: 0,
      paymentTerms: "Net 15",
      salesRep: "Sarah Johnson",
    },
    {
      id: "INV-2024-003",
      customer: "Global Enterprises",
      amount: "$8,900.00",
      dueDate: "2024-02-05",
      status: "Current",
      daysOverdue: 0,
      paymentTerms: "Net 45",
      salesRep: "Mike Davis",
    },
    {
      id: "INV-2024-004",
      customer: "StartUp Co",
      amount: "$1,200.00",
      dueDate: "2024-01-20",
      status: "Paid",
      daysOverdue: 0,
      paymentTerms: "Net 30",
      salesRep: "Emily Brown",
    },
  ]

  const agingBuckets = [
    { period: "Current", amount: "$125,000", count: 45, percentage: 62 },
    { period: "1-30 Days", amount: "$45,000", count: 18, percentage: 22 },
    { period: "31-60 Days", amount: "$25,000", count: 12, percentage: 12 },
    { period: "61-90 Days", amount: "$6,000", count: 4, percentage: 3 },
    { period: "90+ Days", amount: "$2,000", count: 2, percentage: 1 },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Paid":
        return "default" as const
      case "Current":
        return "secondary" as const
      case "Due Soon":
        return "outline" as const
      case "Overdue":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts Receivable</h1>
          <p className="text-muted-foreground">Customer invoicing with aging analysis and collection management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$203,000</div>
            <p className="text-xs text-muted-foreground">Across 81 invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$33,000</div>
            <p className="text-xs text-muted-foreground">16.2% of total AR</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Days Outstanding</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5</div>
            <p className="text-xs text-muted-foreground">Days sales outstanding</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Aging Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Aging Analysis</CardTitle>
          <CardDescription>Accounts receivable aging buckets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agingBuckets.map((bucket) => (
              <div key={bucket.period} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{bucket.period}</div>
                  <div className="text-sm text-muted-foreground">
                    {bucket.amount} ({bucket.count} invoices)
                  </div>
                </div>
                <Progress value={bucket.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Outstanding Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Invoices</CardTitle>
          <CardDescription>Customer invoices pending payment</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search invoices..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="due-soon">Due Soon</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
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
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead>Sales Rep</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell className="font-medium">{invoice.amount}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell className={invoice.daysOverdue > 0 ? "text-red-600 font-medium" : ""}>
                    {invoice.daysOverdue > 0 ? invoice.daysOverdue : "-"}
                  </TableCell>
                  <TableCell>{invoice.paymentTerms}</TableCell>
                  <TableCell>{invoice.salesRep}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(invoice.status)}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Collect
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
