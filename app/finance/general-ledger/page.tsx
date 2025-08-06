"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download } from "lucide-react"

export default function GeneralLedger() {
  const accounts = [
    { code: "1000", name: "Cash", type: "Asset", balance: "$125,000", status: "Active" },
    { code: "1100", name: "Accounts Receivable", type: "Asset", balance: "$85,000", status: "Active" },
    { code: "1200", name: "Inventory", type: "Asset", balance: "$150,000", status: "Active" },
    { code: "2000", name: "Accounts Payable", type: "Liability", balance: "$45,000", status: "Active" },
    { code: "3000", name: "Owner's Equity", type: "Equity", balance: "$315,000", status: "Active" },
    { code: "4000", name: "Sales Revenue", type: "Revenue", balance: "$250,000", status: "Active" },
    { code: "5000", name: "Cost of Goods Sold", type: "Expense", balance: "$100,000", status: "Active" },
    { code: "6000", name: "Operating Expenses", type: "Expense", balance: "$75,000", status: "Active" },
  ]

  const recentTransactions = [
    {
      date: "2024-01-15",
      ref: "JE-001",
      description: "Sales Invoice #INV-001",
      debit: "$5,000",
      credit: "",
      account: "Accounts Receivable",
    },
    {
      date: "2024-01-15",
      ref: "JE-001",
      description: "Sales Invoice #INV-001",
      debit: "",
      credit: "$5,000",
      account: "Sales Revenue",
    },
    { date: "2024-01-14", ref: "JE-002", description: "Cash Payment", debit: "$3,000", credit: "", account: "Cash" },
    {
      date: "2024-01-14",
      ref: "JE-002",
      description: "Cash Payment",
      debit: "",
      credit: "$3,000",
      account: "Accounts Receivable",
    },
    {
      date: "2024-01-13",
      ref: "JE-003",
      description: "Inventory Purchase",
      debit: "$2,500",
      credit: "",
      account: "Inventory",
    },
    {
      date: "2024-01-13",
      ref: "JE-003",
      description: "Inventory Purchase",
      debit: "",
      credit: "$2,500",
      account: "Accounts Payable",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">General Ledger</h1>
          <p className="text-muted-foreground">Manage your chart of accounts and view transaction details</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Account
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$360,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$315,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+7.3%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$75,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart of Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Chart of Accounts</CardTitle>
          <CardDescription>5-level hierarchy account structure</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search accounts..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Account Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="asset">Asset</SelectItem>
                <SelectItem value="liability">Liability</SelectItem>
                <SelectItem value="equity">Equity</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
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
                <TableHead>Account Code</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.code}>
                  <TableCell className="font-medium">{account.code}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{account.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{account.balance}</TableCell>
                  <TableCell>
                    <Badge variant={account.status === "Active" ? "default" : "secondary"}>{account.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
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

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Journal Entries</CardTitle>
          <CardDescription>Latest double-entry accounting transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">{transaction.ref}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">{transaction.debit}</TableCell>
                  <TableCell className="text-right font-medium text-red-600">{transaction.credit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
