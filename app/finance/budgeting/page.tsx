"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Plus, Download, TrendingUp, Target, DollarSign, AlertTriangle } from "lucide-react"

export default function BudgetingForecasting() {
  const budgetData = [
    { month: "Jan", budget: 185000, actual: 178000, forecast: 182000 },
    { month: "Feb", budget: 195000, actual: 201000, forecast: 198000 },
    { month: "Mar", budget: 210000, actual: 205000, forecast: 208000 },
    { month: "Apr", budget: 225000, actual: 232000, forecast: 228000 },
    { month: "May", budget: 240000, actual: 235000, forecast: 238000 },
    { month: "Jun", budget: 255000, actual: 0, forecast: 252000 },
  ]

  const departmentBudgets = [
    {
      department: "Sales & Marketing",
      budget: "$2,400,000",
      actual: "$2,156,000",
      remaining: "$244,000",
      utilization: 89.8,
      variance: "-10.2%",
      status: "On Track",
    },
    {
      department: "Engineering",
      budget: "$3,200,000",
      actual: "$3,456,000",
      remaining: "-$256,000",
      utilization: 108.0,
      variance: "+8.0%",
      status: "Over Budget",
    },
    {
      department: "Operations",
      budget: "$1,800,000",
      actual: "$1,620,000",
      remaining: "$180,000",
      utilization: 90.0,
      variance: "-10.0%",
      status: "Under Budget",
    },
    {
      department: "HR",
      budget: "$950,000",
      actual: "$892,000",
      remaining: "$58,000",
      utilization: 93.9,
      variance: "-6.1%",
      status: "On Track",
    },
  ]

  const budgetCategories = [
    { category: "Personnel", budget: "$4,200,000", actual: "$4,156,000", variance: "-1.0%" },
    { category: "Technology", budget: "$1,500,000", actual: "$1,680,000", variance: "+12.0%" },
    { category: "Marketing", budget: "$800,000", actual: "$745,000", variance: "-6.9%" },
    { category: "Operations", budget: "$1,200,000", actual: "$1,145,000", variance: "-4.6%" },
    { category: "Facilities", budget: "$650,000", actual: "$598,000", variance: "-8.0%" },
  ]

  const forecastScenarios = [
    { scenario: "Conservative", q1: "$2.1M", q2: "$2.3M", q3: "$2.5M", q4: "$2.7M", total: "$9.6M" },
    { scenario: "Realistic", q1: "$2.2M", q2: "$2.5M", q3: "$2.8M", q4: "$3.1M", total: "$10.6M" },
    { scenario: "Optimistic", q1: "$2.4M", q2: "$2.8M", q3: "$3.2M", q4: "$3.6M", total: "$12.0M" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "On Track":
        return "default" as const
      case "Under Budget":
        return "secondary" as const
      case "Over Budget":
        return "destructive" as const
      case "At Risk":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  const getVarianceColor = (variance: string) => {
    if (variance.startsWith("+")) return "text-red-600"
    if (variance.startsWith("-")) return "text-green-600"
    return "text-gray-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgeting & Forecasting</h1>
          <p className="text-muted-foreground">Multi-scenario planning with variance analysis and rolling forecasts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Budget
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8.35M</div>
            <p className="text-xs text-muted-foreground">FY 2024 approved budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Actual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8.12M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-2.8%</span> vs budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.5%</span> from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Variance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-$230K</div>
            <p className="text-xs text-muted-foreground">Under budget YTD</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget vs Actual Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Performance</CardTitle>
          <CardDescription>Monthly budget tracking with forecast projections</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
              <Bar dataKey="budget" fill="#8884d8" name="Budget" />
              <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
              <Bar dataKey="forecast" fill="#ffc658" name="Forecast" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department Budgets */}
      <Card>
        <CardHeader>
          <CardTitle>Department Budget Performance</CardTitle>
          <CardDescription>Budget utilization and variance by department</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentBudgets.map((dept, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{dept.department}</TableCell>
                  <TableCell>{dept.budget}</TableCell>
                  <TableCell className="font-medium">{dept.actual}</TableCell>
                  <TableCell className={dept.remaining.startsWith("-") ? "text-red-600" : "text-green-600"}>
                    {dept.remaining}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{dept.utilization}%</div>
                      <Progress value={dept.utilization} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell className={getVarianceColor(dept.variance)}>{dept.variance}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(dept.status)}>{dept.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
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

      {/* Budget Categories and Forecast Scenarios */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Spending breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{category.category}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.actual} / {category.budget}
                    </div>
                  </div>
                  <div className={`font-medium ${getVarianceColor(category.variance)}`}>{category.variance}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forecast Scenarios</CardTitle>
            <CardDescription>Multi-scenario revenue projections</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario</TableHead>
                  <TableHead>Q1</TableHead>
                  <TableHead>Q2</TableHead>
                  <TableHead>Q3</TableHead>
                  <TableHead>Q4</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forecastScenarios.map((scenario, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{scenario.scenario}</TableCell>
                    <TableCell>{scenario.q1}</TableCell>
                    <TableCell>{scenario.q2}</TableCell>
                    <TableCell>{scenario.q3}</TableCell>
                    <TableCell>{scenario.q4}</TableCell>
                    <TableCell className="font-medium">{scenario.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
