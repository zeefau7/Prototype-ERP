"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Target, DollarSign, Calendar, TrendingUp, Filter, Users } from 'lucide-react'

const opportunities = [
  {
    id: "OPP-001",
    name: "Enterprise Software License",
    company: "Acme Corp",
    value: 125000,
    stage: "proposal",
    probability: 75,
    closeDate: "2024-03-15",
    owner: "John Smith",
    source: "Website",
    lastActivity: "2024-01-28"
  },
  {
    id: "OPP-002",
    name: "Cloud Migration Project",
    company: "Tech Solutions Inc",
    value: 89000,
    stage: "negotiation",
    probability: 85,
    closeDate: "2024-02-28",
    owner: "Sarah Johnson",
    source: "Referral",
    lastActivity: "2024-01-29"
  },
  {
    id: "OPP-003",
    name: "Digital Transformation",
    company: "Global Industries",
    value: 250000,
    stage: "qualification",
    probability: 45,
    closeDate: "2024-04-30",
    owner: "Mike Wilson",
    source: "Cold Call",
    lastActivity: "2024-01-27"
  },
  {
    id: "OPP-004",
    name: "Security Audit Services",
    company: "StartUp Ventures",
    value: 35000,
    stage: "closed-won",
    probability: 100,
    closeDate: "2024-01-30",
    owner: "Lisa Chen",
    source: "LinkedIn",
    lastActivity: "2024-01-30"
  },
  {
    id: "OPP-005",
    name: "Custom Development",
    company: "Enterprise Solutions",
    value: 180000,
    stage: "discovery",
    probability: 25,
    closeDate: "2024-05-15",
    owner: "David Brown",
    source: "Trade Show",
    lastActivity: "2024-01-26"
  }
]

const stages = [
  { name: "discovery", label: "Discovery", color: "bg-blue-100 text-blue-800" },
  { name: "qualification", label: "Qualification", color: "bg-yellow-100 text-yellow-800" },
  { name: "proposal", label: "Proposal", color: "bg-orange-100 text-orange-800" },
  { name: "negotiation", label: "Negotiation", color: "bg-purple-100 text-purple-800" },
  { name: "closed-won", label: "Closed Won", color: "bg-green-100 text-green-800" },
  { name: "closed-lost", label: "Closed Lost", color: "bg-red-100 text-red-800" }
]

const getStageColor = (stage: string) => {
  const stageObj = stages.find(s => s.name === stage)
  return stageObj?.color || "bg-gray-100 text-gray-800"
}

const getStageLabel = (stage: string) => {
  const stageObj = stages.find(s => s.name === stage)
  return stageObj?.label || stage
}

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState("all")

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = stageFilter === "all" || opp.stage === stageFilter
    return matchesSearch && matchesStage
  })

  const totalValue = filteredOpportunities.reduce((sum, opp) => sum + opp.value, 0)
  const weightedValue = filteredOpportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0)
  const avgProbability = filteredOpportunities.reduce((sum, opp) => sum + opp.probability, 0) / filteredOpportunities.length || 0

  // Pipeline distribution
  const pipelineData = stages.map(stage => ({
    ...stage,
    count: opportunities.filter(opp => opp.stage === stage.name).length,
    value: opportunities.filter(opp => opp.stage === stage.name).reduce((sum, opp) => sum + opp.value, 0)
  }))

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Sales Opportunities</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Opportunity
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{filteredOpportunities.length}</div>
            <p className="text-xs text-muted-foreground">Active opportunities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total pipeline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weighted Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">${weightedValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Probability adjusted</p>
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
      </div>

      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Overview</CardTitle>
          <CardDescription>Distribution of opportunities by stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pipelineData.map((stage) => (
              <div key={stage.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Badge className={stage.color}>{stage.label}</Badge>
                  <span className="text-sm font-medium">{stage.count}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ${stage.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opportunities List */}
      <Card>
        <CardHeader>
          <CardTitle>Opportunity Management</CardTitle>
          <CardDescription>Track and manage your sales opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map((stage) => (
                  <SelectItem key={stage.name} value={stage.name}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {filteredOpportunities.map((opp) => (
              <Card key={opp.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{opp.name}</h3>
                      <p className="text-sm text-muted-foreground">{opp.company}</p>
                    </div>
                    <Badge className={getStageColor(opp.stage)}>
                      {getStageLabel(opp.stage)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Value:</span>
                      <span className="font-medium">${opp.value.toLocaleString()}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Probability:</span>
                        <span className="text-sm font-medium">{opp.probability}%</span>
                      </div>
                      <Progress value={opp.probability} className="h-2" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Close Date:</span>
                      <span className="text-sm">{opp.closeDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Owner:</span>
                      <span className="text-sm">{opp.owner}</span>
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
                  <TableHead>Opportunity</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Close Date</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOpportunities.map((opp) => (
                  <TableRow key={opp.id}>
                    <TableCell className="font-medium">{opp.name}</TableCell>
                    <TableCell>{opp.company}</TableCell>
                    <TableCell>${opp.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStageColor(opp.stage)}>
                        {getStageLabel(opp.stage)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={opp.probability} className="w-16 h-2" />
                        <span className="text-sm">{opp.probability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{opp.closeDate}</TableCell>
                    <TableCell>{opp.owner}</TableCell>
                    <TableCell>{opp.source}</TableCell>
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
