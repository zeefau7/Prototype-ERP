"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, Landmark, CheckCircle, AlertTriangle, Clock } from "lucide-react"

export default function BankReconciliation() {
  const bankAccounts = [
    {
      id: "ACC-001",
      name: "Operating Account",
      bank: "First National Bank",
      accountNumber: "****1234",
      bookBalance: "$125,450.00",
      bankBalance: "$123,890.00",
      difference: "$1,560.00",
      lastReconciled: "2024-01-10",
      status: "Pending",
    },
    {
      id: "ACC-002",
      name: "Payroll Account",
      bank: "Business Bank",
      accountNumber: "****5678",
      bookBalance: "$85,200.00",
      bankBalance: "$85,200.00",
      difference: "$0.00",
      lastReconciled: "2024-01-15",
      status: "Reconciled",
    },
    {
      id: "ACC-003",
      name: "Savings Account",
      bank: "Credit Union",
      accountNumber: "****9012",
      bookBalance: "$250,000.00",
      bankBalance: "$250,125.00",
      difference: "-$125.00",
      lastReconciled: "2024-01-12",
      status: "Variance",
    },
  ]

  const unreconciledItems = [
    {
      id: "UR-001",
      type: "Outstanding Check",
      reference: "CHK-1001",
      description: "Vendor Payment - Tech Components",
      amount: "-$2,500.00",
      date: "2024-01-08",
      age: 7,
      status: "Outstanding",
    },
    {
      id: "UR-002",
      type: "Deposit in Transit",
      reference: "DEP-2001",
      description: "Customer Payment - Acme Corp",
      amount: "$3,200.00",
      date: "2024-01-14",
      age: 1,
      status: "In Transit",
    },
    {
      id: "UR-003",
      type: "Bank Charge",
      reference: "BC-3001",
      description: "Monthly Service Fee",
      amount: "-$25.00",
      date: "2024-01-15",
      age: 0,
      status: "Unrecorded",
    },
    {
      id: "UR-004",
      type: "Interest Earned",
      reference: "INT-4001",
      description: "Savings Account Interest",
      amount: "$125.00",
      date: "2024-01-15",
      age: 0,
      status: "Unrecorded",
    },
  ]

  const reconciliationHistory = [
    {
      date: "2024-01-15",
      account: "Payroll Account",
      reconciler: "John Smith",
      items: 12,
      adjustments: 2,
      status: "Completed",
      variance: "$0.00",
    },
    {
      date: "2024-01-12",
      account: "Savings Account",
      reconciler: "Sarah Johnson",
      items: 8,
      adjustments: 1,
      status: "Completed",
      variance: "-$125.00",
    },
    {
      date: "2024-01-10",
      account: "Operating Account",
      reconciler: "Mike Davis",
      items: 25,
      adjustments: 5,
      status: "In Progress",
      variance: "$1,560.00",
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Reconciled":
        return "default" as const
      case "Pending":
        return "secondary" as const
      case "Variance":
        return "destructive" as const
      case "In Progress":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  const getItemStatusVariant = (status: string) => {
    switch (status) {
      case "Outstanding":
        return "secondary" as const
      case "In Transit":
        return "outline" as const
      case "Unrecorded":
        return "destructive" as const
      case "Cleared":
        return "default" as const
      default:
        return "outline" as const
    }
  }

  const getReconciliationStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default" as const
      case "In Progress":
        return "secondary" as const
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
          <h1 className="text-3xl font-bold tracking-tight">Bank Reconciliation</h1>
          <p className="text-muted-foreground">Automated matching with exception handling and audit trails</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Start Reconciliation
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bank Accounts</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reconciled</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Items</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Variance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,435</div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Bank Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Account Status</CardTitle>
          <CardDescription>Current reconciliation status for all bank accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Book Balance</TableHead>
                <TableHead>Bank Balance</TableHead>
                <TableHead>Difference</TableHead>
                <TableHead>Last Reconciled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{account.bank}</TableCell>
                  <TableCell>{account.accountNumber}</TableCell>
                  <TableCell className="font-medium">{account.bookBalance}</TableCell>
                  <TableCell className="font-medium">{account.bankBalance}</TableCell>
                  <TableCell className={account.difference === "$0.00" ? "" : "text-red-600 font-medium"}>
                    {account.difference}
                  </TableCell>
                  <TableCell>{account.lastReconciled}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(account.status)}>{account.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Reconcile
                    </Button>
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

      {/* Unreconciled Items */}
      <Card>
        <CardHeader>
          <CardTitle>Unreconciled Items</CardTitle>
          <CardDescription>Outstanding transactions requiring reconciliation</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search items..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="check">Outstanding Check</SelectItem>
                <SelectItem value="deposit">Deposit in Transit</SelectItem>
                <SelectItem value="charge">Bank Charge</SelectItem>
                <SelectItem value="interest">Interest</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="outstanding">Outstanding</SelectItem>
                <SelectItem value="transit">In Transit</SelectItem>
                <SelectItem value="unrecorded">Unrecorded</SelectItem>
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
                <TableHead>Type</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Age (Days)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unreconciledItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.reference}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell
                    className={`font-medium ${item.amount.startsWith("-") ? "text-red-600" : "text-green-600"}`}
                  >
                    {item.amount}
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>
                    <Badge variant={getItemStatusVariant(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Match
                    </Button>
                    <Button variant="ghost" size="sm">
                      Adjust
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reconciliation History */}
      <Card>
        <CardHeader>
          <CardTitle>Reconciliation History</CardTitle>
          <CardDescription>Recent reconciliation activities and results</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Reconciler</TableHead>
                <TableHead>Items Processed</TableHead>
                <TableHead>Adjustments</TableHead>
                <TableHead>Final Variance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reconciliationHistory.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>{history.date}</TableCell>
                  <TableCell className="font-medium">{history.account}</TableCell>
                  <TableCell>{history.reconciler}</TableCell>
                  <TableCell>{history.items}</TableCell>
                  <TableCell>{history.adjustments}</TableCell>
                  <TableCell className={history.variance === "$0.00" ? "" : "text-red-600 font-medium"}>
                    {history.variance}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getReconciliationStatusVariant(history.status)}>{history.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Report
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
