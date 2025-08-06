"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Download, Target, TrendingUp, Users, DollarSign } from "lucide-react"

export default function LeadTracking() {
  const leads = [
    {
      id: "LEAD-001",
      name: "Sarah Johnson",
      company: "Tech Innovations",
      email: "sarah@techinnovations.com",
      phone: "+1 (555) 123-4567",
      source: "Website",
      score: 85,
      value: "$25,000",
      status: "Qualified",
      assignedTo: "John Smith",
      lastContact: "2024-01-15",
    },
    {
      id: "LEAD-002",
      name: "Michael Chen",
      company: "Global Solutions",
      email: "m.chen@globalsolutions.com",
      phone: "+1 (555) 234-5678",
      source: "Referral",
      score: 92,
      value: "$45,000",
      status: "Hot",
      assignedTo: "Emily Davis",
      lastContact: "2024-01-14",
    },
    {
      id: "LEAD-003",
      name: "Lisa Rodriguez",
      company: "StartUp Inc",
      email: "lisa@startup.com",
      phone: "+1 (555) 345-6789",
      source: "Social Media",
      score: 65,
      value: "$15,000",
      status: "Warm",
      assignedTo: "Mike Wilson",
      lastContact: "2024-01-13",
    },
    {
      id: "LEAD-004",
      name: "David Thompson",
      company: "Enterprise Corp",
      email: "d.thompson@enterprise.com",
      phone: "+1 (555) 456-7890",
      source: "Trade Show",
      score: 45,
      value: "$8,000",
      status: "Cold",
      assignedTo: "Sarah Brown",
      lastContact: "2024-01-10",
    },
    {
      id: "LEAD-005",
      name: "Jennifer White",
      company: "Future Tech",
      email: "j.white@futuretech.com",
      phone: "+1 (555) 567-8901",
      source: "Email Campaign",
      score: 78,
      value: "$32,000",
      status: "Qualified",
      assignedTo: "John Smith",
      lastContact: "2024-01-12",
    },
  ]

  const leadSources = [
    { source: "Website", count: 145, conversion: "12%" },
    { source: "Referral", count: 89, conversion: "28%" },
    { source: "Social Media", count: 67, conversion: "8%" },
    { source: "Trade Show", count: 34, conversion: "22%" },
    { source: "Email Campaign", count: 123, conversion: "15%" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Hot":
        return "destructive" as const
      case "Warm":
        return "secondary" as const
      case "Qualified":
        return "default" as const
      case "Cold":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Tracking</h1>
          <p className="text-muted-foreground">Behavioral and demographic scoring model for lead management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,890</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+22%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">24.1% qualification rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.8M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lead Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Sources</CardTitle>
          <CardDescription>Performance metrics by lead acquisition channel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {leadSources.map((source) => (
              <div key={source.source} className="space-y-2 p-4 border rounded-lg">
                <h3 className="font-semibold">{source.source}</h3>
                <div className="text-2xl font-bold">{source.count}</div>
                <p className="text-sm text-muted-foreground">
                  Conversion: <span className="font-medium text-green-600">{source.conversion}</span>
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Pipeline</CardTitle>
          <CardDescription>Complete lead database with scoring and tracking</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search leads..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="tradeshow">Trade Show</SelectItem>
                <SelectItem value="email">Email Campaign</SelectItem>
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
                <TableHead>Lead ID</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className={`font-medium ${getScoreColor(lead.score)}`}>{lead.score}/100</div>
                      <Progress value={lead.score} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{lead.value}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell>{lead.lastContact}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Convert
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
