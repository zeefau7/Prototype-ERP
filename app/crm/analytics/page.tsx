"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
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
import { TrendingUp, TrendingDown, Users, Target, DollarSign, Calendar, Download, Filter } from 'lucide-react'

const salesFunnelData = [
  { stage: "Leads", count: 2500, value: 0, conversion: 100 },
  { stage: "Qualified", count: 1250, value: 0, conversion: 50 },
  { stage: "Proposal", count: 625, value: 1875000, conversion: 25 },
  { stage: "Negotiation", count: 312, value: 1560000, conversion: 12.5 },
  { stage: "Closed Won", count: 156, value: 1248000, conversion: 6.25 }
]

const customerLifecycleData = [
  { month: "Jan", newCustomers: 45, churnedCustomers: 12, netGrowth: 33 },
  { month: "Feb", newCustomers: 52, churnedCustomers: 15, netGrowth: 37 },
  { month: "Mar", newCustomers: 48, churnedCustomers: 8, netGrowth: 40 },
  { month: "Apr", newCustomers: 61, churnedCustomers: 18, netGrowth: 43 },
  { month: "May", newCustomers: 55, churnedCustomers: 14, netGrowth: 41 },
  { month: "Jun", newCustomers: 67, churnedCustomers: 11, netGrowth: 56 }
]

const revenueBySourceData = [
  { name: "Website", value: 35, revenue: 875000, color: "#0088FE" },
  { name: "Referrals", value: 25, revenue: 625000, color: "#00C49F" },
  { name: "Social Media", value: 20, revenue: 500000, color: "#FFBB28" },
  { name: "Email", value: 15, revenue: 375000, color: "#FF8042" },
  { name: "Direct", value: 5, revenue: 125000, color: "#8884D8" }
]

const customerSegmentData = [
  {
    segment: "Enterprise",
    customers: 156,
    revenue: 1248000,
    avgOrderValue: 8000,
    churnRate: 2.5,
    growthRate: 12.3
  },
  {
    segment: "Mid-Market",
    customers: 342,
    revenue: 855000,
    avgOrderValue: 2500,
    churnRate: 5.8,
    growthRate: 8.7
  },
  {
    segment: "Small Business",
    customers: 1250,
    revenue: 625000,
    avgOrderValue: 500,
    churnRate: 12.4,
    growthRate: 15.2
  },
  {
    segment: "Startup",
    customers: 890,
    revenue: 267000,
    avgOrderValue: 300,
    churnRate: 18.9,
    growthRate: 22.1
  }
]

const performanceMetrics = [
  {
    metric: "Customer Acquisition Cost (CAC)",
    value: 245,
    unit: "$",
    change: -8.5,
    target: 200,
    status: "warning"
  },
  {
    metric: "Customer Lifetime Value (CLV)",
    value: 2850,
    unit: "$",
    change: 12.3,
    target: 3000,
    status: "good"
  },
  {
    metric: "CLV/CAC Ratio",
    value: 11.6,
    unit: ":1",
    change: 15.8,
    target: 10,
    status: "excellent"
  },
  {
    metric: "Average Sales Cycle",
    value: 45,
    unit: " days",
    change: -12.5,
    target: 40,
    status: "good"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent": return "text-green-600"
    case "good": return "text-blue-600"
    case "warning": return "text-yellow-600"
    case "critical": return "text-red-600"
    default: return "text-gray-600"
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "excellent": return "bg-green-100 text-green-800"
    case "good": return "bg-blue-100 text-blue-800"
    case "warning": return "bg-yellow-100 text-yellow-800"
    case "critical": return "bg-red-100 text-red-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export default function CRMAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  const totalRevenue = revenueBySourceData.reduce((sum, item) => sum + item.revenue, 0)
  const totalCustomers = customerSegmentData.reduce((sum, segment) => sum + segment.customers, 0)
  const avgChurnRate = customerSegmentData.reduce((sum, segment) => sum + segment.churnRate, 0) / customerSegmentData.length

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">CRM Analytics</h2>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <Badge className={getStatusBadge(metric.status)}>{metric.status}</Badge>
            </CardHeader>
            <CardContent>
              <div className={`text-xl md:text-2xl font-bold ${getStatusColor(metric.status)}`}>
                {metric.unit === "$" ? "$" : ""}{metric.value.toLocaleString()}{metric.unit !== "$" ? metric.unit : ""}
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  Target: {metric.unit === "$" ? "$" : ""}{metric.target.toLocaleString()}{metric.unit !== "$" ? metric.unit : ""}
                </p>
                <div className={`flex items-center text-xs ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(metric.change)}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>CRM Analytics Dashboard</CardTitle>
          <CardDescription>Comprehensive customer relationship insights and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="funnel" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="funnel">Sales Funnel</TabsTrigger>
              <TabsTrigger value="lifecycle">Customer Lifecycle</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
              <TabsTrigger value="segments">Customer Segments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="funnel" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sales Funnel Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={salesFunnelData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="stage" />
                        <YAxis />
                        <Tooltip formatter={(value) => [value.toLocaleString(), ""]} />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Conversion Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {salesFunnelData.map((stage, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{stage.stage}</span>
                            <span className="text-sm text-muted-foreground">{stage.conversion}%</span>
                          </div>
                          <Progress value={stage.conversion} className="h-2" />
                          <div className="text-sm text-muted-foreground">
                            {stage.count.toLocaleString()} {stage.value > 0 && `(${stage.value.toLocaleString()} value)`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="lifecycle" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Acquisition vs Churn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={customerLifecycleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="newCustomers" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="churnedCustomers" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="netGrowth" stackId="3" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue by Source</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={revenueBySourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {revenueBySourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {revenueBySourceData.map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: source.color }}
                            />
                            <span className="font-medium">{source.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${source.revenue.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">{source.value}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="segments" className="space-y-4">
              <div className="grid gap-4">
                {customerSegmentData.map((segment, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-lg">{segment.segment}</h4>
                          <p className="text-sm text-muted-foreground">{segment.customers.toLocaleString()} customers</p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Revenue</div>
                            <div className="font-medium">${segment.revenue.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Avg Order Value</div>
                            <div className="font-medium">${segment.avgOrderValue.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Churn Rate</div>
                            <div className={`font-medium ${segment.churnRate > 10 ? 'text-red-600' : 'text-green-600'}`}>
                              {segment.churnRate}%
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Growth Rate</div>
                            <div className="font-medium text-green-600">+{segment.growthRate}%</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all sources</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Churn Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgChurnRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Across all segments</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
