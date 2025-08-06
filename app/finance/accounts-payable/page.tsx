"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, Banknote, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export default function AccountsPayable() {
  const bills = [
    {
      id: "BILL-2024-001",
      vendor: "Tech Components Ltd",
      amount: "$12,500.00",
      dueDate: "2024-01-22",
      status: "Approved",
      paymentMethod: "ACH",
      purchaseOrder: "PO-2024-001",
      approver: "John Smith",
    },
    {
      id: "BILL-2024-002",
      vendor: "Office Supplies Co",
      amount: "$850.00",
      dueDate: "2024-01-25",
      status: "Pending Approval",
      paymentMethod: "Check",
      purchaseOrder: "PO-2024-002",
      approver: "Sarah Johnson",
    },
    {
      id: "BILL-2024-003",
      vendor: "Utility Company",
      amount: "$2,300.00",
      dueDate: "2024-01-28",
      status: "Scheduled",
      paymentMethod: "ACH",
      purchaseOrder: "-",
      approver: "Mike Davis",
    },
    {
      id: "BILL-2024-004",
      vendor: "Legal Services Inc",
      amount: "$5,000.00",
      dueDate: "2024-01-30",
      status: "Paid",
      paymentMethod: "Wire",
      purchaseOrder: "-",
      approver: "Emily Brown",
    },
  ]

  const paymentSchedule = [
    { date: "2024-01-22", amount: "$15,750", count: 3, method: "ACH" },
    { date: "2024-01-25", amount: "$8,200", count: 2, method: "Check" },
    { date: "2024-01-28", amount: "$12,300", count: 4, method: "ACH" },
    { date: "2024-01-30", amount: "$6,500", count: 2, method: "Wire" },
  ]

  const vendorSummary = [
    { vendor: "Tech Components Ltd", outstanding: "$25,000", overdue: "$0", nextPayment: "2024-01-22" },
    { vendor: "Office Supplies Co", outstanding: "$3,200", overdue: "$850", nextPayment: "2024-01-25" },
    { vendor: "Utility Company", outstanding: "$2,300", overdue: "$0", nextPayment: "2024-01-28" },
    { vendor: "Legal Services Inc", outstanding: "$0", overdue: "$0", nextPayment: "-" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Paid":
        return "default" as const
      case "Approved":
        return "secondary" as const
      case "Scheduled":
        return "outline" as const
      case "Pending Approval":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts Payable</h1>
          <p className="text-muted-foreground">Vendor bill processing with 3-way matching and payment scheduling</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Bill
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payable</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$156,750</div>
            <p className="text-xs text-muted-foreground">Across 45 vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,750</div>
            <p className="text-xs text-muted-foreground">11 payments scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Bills</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$850</div>
            <p className="text-xs text-muted-foreground">1 vendor affected</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">3-way matching rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payment Schedule</CardTitle>
          <CardDescription>Scheduled payments for the next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentSchedule.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{payment.date}</div>
                  <div className="text-sm text-muted-foreground">{payment.count} payments</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{payment.amount}</div>
                  <Badge variant="outline">{payment.method}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Outstanding Bills */}
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Bills</CardTitle>
          <CardDescription>Vendor bills pending payment</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bills..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
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
                <TableHead>Bill #</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>PO Reference</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.id}</TableCell>
                  <TableCell>{bill.vendor}</TableCell>
                  <TableCell className="font-medium">{bill.amount}</TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{bill.paymentMethod}</Badge>
                  </TableCell>
                  <TableCell>{bill.purchaseOrder}</TableCell>
                  <TableCell>{bill.approver}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(bill.status)}>{bill.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Pay
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Vendor Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Payment Summary</CardTitle>
          <CardDescription>Outstanding balances by vendor</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Overdue</TableHead>
                <TableHead>Next Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorSummary.map((vendor, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{vendor.vendor}</TableCell>
                  <TableCell>{vendor.outstanding}</TableCell>
                  <TableCell className={vendor.overdue !== "$0" ? "text-red-600 font-medium" : ""}>
                    {vendor.overdue}
                  </TableCell>
                  <TableCell>{vendor.nextPayment}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
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
