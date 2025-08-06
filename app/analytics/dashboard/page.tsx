"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  PieChartIcon,
} from "lucide-react"

export default function ExecutiveDashboard() {
  const revenueData = [
    { month: "Jan", revenue: 185000, profit: 45000, expenses: 140000 },
    { month: "Feb", revenue: 195000, profit: 52000, expenses: 143000 },
    { month: "Mar", revenue: 210000, profit: 58000, expenses: 152000 },
    { month: "Apr", revenue: 225000, profit: 65000, expenses: 160000 },
    { month: "May", revenue: 240000, profit: 72000, expenses: 168000 },
    { month: "Jun", revenue: 255000, profit: 78000, expenses: 177000 },
  ]

  const departmentData = [
    { name: "Sales", value: 35, color: "#0088FE" },
    { name: "Marketing", value: 20, color: "#00C49F" },
    { name: "Engineering", value: 25, color: "#FFBB28" },
    { name: "Operations", value: 15, color: "#FF8042" },
    { name: "Support", value: 5, color: "#8884D8" },
  ]

  const inventoryTrends = [
    { month: "Jan", inStock: 8500, lowStock: 150, outOfStock: 25 },
    { month: "Feb", inStock: 8650, lowStock: 120, outOfStock: 18 },
    { month: "Mar", inStock: 8800, lowStock: 95, outOfStock: 12 },
    { month: "Apr", inStock: 8900, lowStock: 85, outOfStock: 8 },
    { month: "May", inStock: 8950, lowStock: 75, outOfStock: 5 },
    { month: "Jun", inStock: 9000, lowStock: 65, outOfStock: 3 },
  ]

  const salesPerformance = [
    { region: "North", target: 100000, actual: 125000, growth: 25 },
    { region: "South", target: 80000, actual: 85000, growth: 6.25 },
    { region: "East", target: 120000, actual: 110000, growth: -8.33 },
    { region: "West", target: 90000, actual: 105000, growth: 16.67 },
  ]

  const kpiMetrics = [
    {
      title: "Total Revenue",
      value: "$2.45M",
      change: "+15.2%",
      trend: "up",
      icon: DollarSign,
      description: "vs last quarter",
    },
    {
      title: "Active Customers",
      value: "1,234",
      change: "+8.5%",
      trend: "up",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Inventory Turnover",
      value: "4.2x",
      change: "+12.3%",
      trend: "up",
      icon: Package,
      description: "vs last quarter",
    },
    {
      title: "Order Fulfillment",
      value: "94.8%",
      change: "-2.1%",
      trend: "down",
      icon: ShoppingCart,
      description: "vs last month",
    },
  ]

  const topProducts = [
    { name: "Wireless Headphones", revenue: "$125,000", units: 2500, growth: "+18%" },
    { name: "Bluetooth Speaker", revenue: "$98,000", units: 1960, growth: "+12%" },
    { name: "USB Cable", revenue: "$45,000", units: 4500, growth: "+8%" },
    { name: "Phone Case", revenue: "$67,000", units: 3350, growth: "+15%" },
    { name: "Laptop Stand", revenue: "$89,000", units: 1780, growth: "+22%" },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-muted-foreground">
            Drill-down capability to transaction level with consolidated reporting
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric) => {
          const IconComponent = metric.icon
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="inline h-3 w-3 mr-1" />
                    )}
                    {metric.change}
                  </span>{" "}
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Revenue and Profit Trends */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Profit Trends</CardTitle>
            <CardDescription>Monthly financial performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="profit" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee allocation across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Inventory and Sales Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Health Trends</CardTitle>
            <CardDescription>Stock level monitoring over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={inventoryTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="inStock" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="lowStock" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="outOfStock" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Sales Performance</CardTitle>
            <CardDescription>Target vs actual performance by region</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                <Bar dataKey="target" fill="#8884d8" name="Target" />
                <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Revenue and unit sales by product category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.units} units sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{product.revenue}</div>
                  <div className="text-sm text-green-600">{product.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used reports and analytics tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span className="text-xs">Sales Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <PieChartIcon className="h-6 w-6 mb-2" />
              <span className="text-xs">P&L Statement</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Package className="h-6 w-6 mb-2" />
              <span className="text-xs">Inventory Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-xs">HR Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <ShoppingCart className="h-6 w-6 mb-2" />
              <span className="text-xs">Order Analysis</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span className="text-xs">Trend Analysis</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
