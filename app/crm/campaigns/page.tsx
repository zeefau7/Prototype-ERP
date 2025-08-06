"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Mail, Users, TrendingUp, Target, Calendar, Filter, Send, Eye, MousePointer } from 'lucide-react'

const campaigns = [
  {
    id: "CAMP-001",
    name: "Q1 Product Launch",
    type: "Email",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    targetAudience: 2500,
    sent: 2350,
    delivered: 2280,
    opened: 1140,
    clicked: 342,
    converted: 68,
    budget: 15000,
    spent: 8750,
    manager: "Sarah Johnson",
    channel: "Email + Social"
  },
  {
    id: "CAMP-002",
    name: "Customer Retention Drive",
    type: "Multi-channel",
    status: "Completed",
    startDate: "2023-12-01",
    endDate: "2024-01-31",
    targetAudience: 1800,
    sent: 1800,
    delivered: 1750,
    opened: 875,
    clicked: 245,
    converted: 89,
    budget: 12000,
    spent: 11200,
    manager: "Mike Wilson",
    channel: "Email + SMS + Direct Mail"
  },
  {
    id: "CAMP-003",
    name: "Summer Sale 2024",
    type: "Promotional",
    status: "Scheduled",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    targetAudience: 5000,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    budget: 25000,
    spent: 0,
    manager: "Lisa Chen",
    channel: "Email + Social + Web"
  },
  {
    id: "CAMP-004",
    name: "New Customer Welcome",
    type: "Automated",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    targetAudience: 0, // Ongoing
    sent: 450,
    delivered: 445,
    opened: 312,
    clicked: 89,
    converted: 34,
    budget: 8000,
    spent: 2100,
    manager: "David Brown",
    channel: "Email Automation"
  }
]

const audienceSegments = [
  {
    id: "SEG-001",
    name: "High-Value Customers",
    criteria: "Total Orders > $10,000",
    size: 1250,
    growthRate: 8.5,
    avgOrderValue: 2850,
    lastUpdated: "2024-01-28"
  },
  {
    id: "SEG-002",
    name: "New Customers (90 days)",
    criteria: "Registration Date < 90 days",
    size: 890,
    growthRate: 15.2,
    avgOrderValue: 450,
    lastUpdated: "2024-01-29"
  },
  {
    id: "SEG-003",
    name: "Inactive Customers",
    criteria: "No orders in 6 months",
    size: 2100,
    growthRate: -5.8,
    avgOrderValue: 0,
    lastUpdated: "2024-01-27"
  },
  {
    id: "SEG-004",
    name: "Enterprise Clients",
    criteria: "Customer Type = Enterprise",
    size: 156,
    growthRate: 12.3,
    avgOrderValue: 15600,
    lastUpdated: "2024-01-30"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-800"
    case "Completed": return "bg-blue-100 text-blue-800"
    case "Scheduled": return "bg-yellow-100 text-yellow-800"
    case "Paused": return "bg-gray-100 text-gray-800"
    case "Draft": return "bg-gray-100 text-gray-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Email": return "bg-blue-100 text-blue-800"
    case "Multi-channel": return "bg-purple-100 text-purple-800"
    case "Promotional": return "bg-orange-100 text-orange-800"
    case "Automated": return "bg-green-100 text-green-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const calculateMetrics = (campaign: any) => {
  const openRate = campaign.delivered > 0 ? (campaign.opened / campaign.delivered) * 100 : 0
  const clickRate = campaign.opened > 0 ? (campaign.clicked / campaign.opened) * 100 : 0
  const conversionRate = campaign.clicked > 0 ? (campaign.converted / campaign.clicked) * 100 : 0
  const deliveryRate = campaign.sent > 0 ? (campaign.delivered / campaign.sent) * 100 : 0
  
  return { openRate, clickRate, conversionRate, deliveryRate }
}

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    const matchesType = typeFilter === "all" || campaign.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalCampaigns = filteredCampaigns.length
  const activeCampaigns = filteredCampaigns.filter(c => c.status === "Active").length
  const totalSent = filteredCampaigns.reduce((sum, c) => sum + c.sent, 0)
  const totalConverted = filteredCampaigns.reduce((sum, c) => sum + c.converted, 0)
  const avgConversionRate = totalSent > 0 ? (totalConverted / totalSent) * 100 : 0

  const selectedCampaignData = selectedCampaign ? campaigns.find(c => c.id === selectedCampaign) : null

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Marketing Campaigns</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{totalCampaigns}</div>
            <p className="text-xs text-muted-foreground">All campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{totalSent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Messages sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{avgConversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Average conversion</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
          <CardDescription>Manage marketing campaigns and audience segments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="segments">Audience Segments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="campaigns" className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full lg:w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Multi-channel">Multi-channel</SelectItem>
                    <SelectItem value="Promotional">Promotional</SelectItem>
                    <SelectItem value="Automated">Automated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Card View */}
              <div className="block lg:hidden space-y-4">
                {filteredCampaigns.map((campaign) => {
                  const metrics = calculateMetrics(campaign)
                  return (
                    <Card key={campaign.id} className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{campaign.name}</h3>
                            <p className="text-sm text-muted-foreground">{campaign.id}</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                            <Badge className={getTypeColor(campaign.type)}>{campaign.type}</Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Target:</span>
                            <span className="text-sm">{campaign.targetAudience.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Sent:</span>
                            <span className="text-sm font-medium">{campaign.sent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Open Rate:</span>
                            <span className="text-sm">{metrics.openRate.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Conversions:</span>
                            <span className="text-sm font-medium">{campaign.converted}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Open Rate</TableHead>
                      <TableHead>Click Rate</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead>Manager</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => {
                      const metrics = calculateMetrics(campaign)
                      return (
                        <TableRow key={campaign.id} className="cursor-pointer hover:bg-muted/50"
                                 onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{campaign.name}</div>
                              <div className="text-sm text-muted-foreground">{campaign.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(campaign.type)}>{campaign.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                          </TableCell>
                          <TableCell>{campaign.targetAudience.toLocaleString()}</TableCell>
                          <TableCell className="font-medium">{campaign.sent.toLocaleString()}</TableCell>
                          <TableCell>{metrics.openRate.toFixed(1)}%</TableCell>
                          <TableCell>{metrics.clickRate.toFixed(1)}%</TableCell>
                          <TableCell className="font-medium">{campaign.converted}</TableCell>
                          <TableCell>{campaign.manager}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="segments" className="space-y-4">
              <div className="grid gap-4">
                {audienceSegments.map((segment) => (
                  <Card key={segment.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{segment.name}</h4>
                          <p className="text-sm text-muted-foreground">{segment.criteria}</p>
                          <p className="text-xs text-muted-foreground">Last updated: {segment.lastUpdated}</p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Size</div>
                            <div className="font-medium">{segment.size.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Growth Rate</div>
                            <div className={`font-medium ${segment.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {segment.growthRate >= 0 ? '+' : ''}{segment.growthRate}%
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Avg Order Value</div>
                            <div className="font-medium">${segment.avgOrderValue.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button size="sm">Create Campaign</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Engagement Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredCampaigns.filter(c => c.sent > 0).map((campaign) => {
                        const metrics = calculateMetrics(campaign)
                        return (
                          <div key={campaign.id} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{campaign.name}</span>
                              <span className="text-sm text-muted-foreground">{metrics.openRate.toFixed(1)}%</span>
                            </div>
                            <Progress value={metrics.openRate} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MousePointer className="h-5 w-5" />
                      Conversion Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredCampaigns.filter(c => c.sent > 0).map((campaign) => {
                        const metrics = calculateMetrics(campaign)
                        return (
                          <div key={campaign.id} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{campaign.name}</span>
                              <span className="text-sm text-muted-foreground">{metrics.conversionRate.toFixed(1)}%</span>
                            </div>
                            <Progress value={metrics.conversionRate} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Campaign Details */}
      {selectedCampaignData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Campaign Details - {selectedCampaignData.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Campaign Info</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="text-muted-foreground">Type:</span> {selectedCampaignData.type}</div>
                  <div><span className="text-muted-foreground">Channel:</span> {selectedCampaignData.channel}</div>
                  <div><span className="text-muted-foreground">Manager:</span> {selectedCampaignData.manager}</div>
                  <div><span className="text-muted-foreground">Duration:</span> {selectedCampaignData.startDate} - {selectedCampaignData.endDate}</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Performance</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="text-muted-foreground">Sent:</span> {selectedCampaignData.sent.toLocaleString()}</div>
                  <div><span className="text-muted-foreground">Delivered:</span> {selectedCampaignData.delivered.toLocaleString()}</div>
                  <div><span className="text-muted-foreground">Opened:</span> {selectedCampaignData.opened.toLocaleString()}</div>
                  <div><span className="text-muted-foreground">Clicked:</span> {selectedCampaignData.clicked.toLocaleString()}</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Conversion</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="text-muted-foreground">Conversions:</span> {selectedCampaignData.converted}</div>
                  <div><span className="text-muted-foreground">Conversion Rate:</span> {calculateMetrics(selectedCampaignData).conversionRate.toFixed(1)}%</div>
                  <div><span className="text-muted-foreground">Open Rate:</span> {calculateMetrics(selectedCampaignData).openRate.toFixed(1)}%</div>
                  <div><span className="text-muted-foreground">Click Rate:</span> {calculateMetrics(selectedCampaignData).clickRate.toFixed(1)}%</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Budget</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="text-muted-foreground">Budget:</span> ${selectedCampaignData.budget.toLocaleString()}</div>
                  <div><span className="text-muted-foreground">Spent:</span> ${selectedCampaignData.spent.toLocaleString()}</div>
                  <div><span className="text-muted-foreground">Remaining:</span> ${(selectedCampaignData.budget - selectedCampaignData.spent).toLocaleString()}</div>
                  <div className="mt-2">
                    <Progress value={(selectedCampaignData.spent / selectedCampaignData.budget) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
