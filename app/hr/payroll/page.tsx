"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, DollarSign, Users, Calculator, FileText } from "lucide-react"

export default function PayrollProcessing() {
  const payrollRuns = [
    {
      id: "PR-2024-001",
      period: "January 2024",
      employees: 456,
      grossPay: "$2,850,000",
      netPay: "$2,185,000",
      taxes: "$485,000",
      deductions: "$180,000",
      status: "Completed",
      processedDate: "2024-01-31",
    },
    {
      id: "PR-2024-002",
      period: "February 2024",
      employees: 458,
      grossPay: "$2,890,000",
      netPay: "$2,210,000",
      taxes: "$495,000",
      deductions: "$185,000",
      status: "In Progress",
      processedDate: "-",
    },
  ]

  const employeePayroll = [
    {
      id: "EMP001",
      name: "John Smith",
      department: "Engineering",
      position: "Senior Developer",
      grossPay: "$8,500",
      taxes: "$1,785",
      deductions: "$425",
      netPay: "$6,290",
      hoursWorked: 160,
      overtimeHours: 8,
    },
    {
      id: "EMP002",
      name: "Sarah Johnson",
      department: "Marketing",
      position: "Marketing Manager",
      grossPay: "$7,500",
      taxes: "$1,575",
      deductions: "$375",
      netPay: "$5,550",
      hoursWorked: 160,
      overtimeHours: 0,
    },
    {
      id: "EMP003",
      name: "Mike Davis",
      department: "Sales",
      position: "Sales Representative",
      grossPay: "$6,200",
      taxes: "$1,302",
      deductions: "$310",
      netPay: "$4,588",
      hoursWorked: 160,
      overtimeHours: 4,
    },
  ]

  const taxSummary = [
    { type: "Federal Income Tax", amount: "$285,000", rate: "22%" },
    { type: "State Income Tax", amount: "$95,000", rate: "7.5%" },
    { type: "Social Security", amount: "$65,000", rate: "6.2%" },
    { type: "Medicare", amount: "$25,000", rate: "1.45%" },
    { type: "Unemployment Tax", amount: "$15,000", rate: "0.6%" },
  ]

  const deductionTypes = [
    { type: "Health Insurance", amount: "$125,000", employees: 380 },
    { type: "Dental Insurance", amount: "$25,000", employees: 320 },
    { type: "401(k) Contribution", amount: "$85,000", employees: 290 },
    { type: "Life Insurance", amount: "$15,000", employees: 456 },
  ]

  const getStatusVariant = (status: string) => {
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
          <h1 className="text-3xl font-bold tracking-tight">Payroll Processing</h1>
          <p className="text-muted-foreground">Multi-state tax compliance with direct deposit and check printing</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Run Payroll
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gross Pay</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.89M</div>
            <p className="text-xs text-muted-foreground">Current pay period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees Paid</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">458</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Taxes</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$495K</div>
            <p className="text-xs text-muted-foreground">17.1% of gross pay</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Pay</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.21M</div>
            <p className="text-xs text-muted-foreground">76.5% of gross pay</p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Runs */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Runs</CardTitle>
          <CardDescription>Historical and current payroll processing</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Run ID</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Gross Pay</TableHead>
                <TableHead>Taxes</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Processed</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollRuns.map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-medium">{run.id}</TableCell>
                  <TableCell>{run.period}</TableCell>
                  <TableCell>{run.employees}</TableCell>
                  <TableCell className="font-medium">{run.grossPay}</TableCell>
                  <TableCell>{run.taxes}</TableCell>
                  <TableCell>{run.deductions}</TableCell>
                  <TableCell className="font-medium">{run.netPay}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(run.status)}>{run.status}</Badge>
                  </TableCell>
                  <TableCell>{run.processedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reports
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tax and Deduction Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tax Breakdown</CardTitle>
            <CardDescription>Current period tax withholdings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taxSummary.map((tax, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{tax.type}</div>
                    <div className="text-sm text-muted-foreground">Rate: {tax.rate}</div>
                  </div>
                  <div className="font-medium">{tax.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deduction Summary</CardTitle>
            <CardDescription>Employee benefit deductions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deductionTypes.map((deduction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{deduction.type}</div>
                    <div className="text-sm text-muted-foreground">{deduction.employees} employees</div>
                  </div>
                  <div className="font-medium">{deduction.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Payroll Details */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Payroll Details</CardTitle>
          <CardDescription>Individual employee pay breakdown</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
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
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Gross Pay</TableHead>
                <TableHead>Taxes</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeePayroll.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.hoursWorked}</TableCell>
                  <TableCell>{employee.overtimeHours}</TableCell>
                  <TableCell className="font-medium">{employee.grossPay}</TableCell>
                  <TableCell>{employee.taxes}</TableCell>
                  <TableCell>{employee.deductions}</TableCell>
                  <TableCell className="font-medium">{employee.netPay}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Paystub
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
