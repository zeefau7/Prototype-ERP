"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Filter, Download, Users, Building, Phone, Mail } from "lucide-react"

export default function ContactManagement() {
  const contacts = [
    {
      id: "CON-001",
      name: "Sarah Johnson",
      title: "CEO",
      company: "Tech Innovations Inc",
      email: "sarah@techinnovations.com",
      phone: "+1 (555) 123-4567",
      type: "Customer",
      status: "Active",
      lastContact: "2024-01-15",
      assignedTo: "John Smith",
      tags: ["VIP", "Decision Maker"],
    },
    {
      id: "CON-002",
      name: "Michael Chen",
      title: "Procurement Manager",
      company: "Global Solutions Ltd",
      email: "m.chen@globalsolutions.com",
      phone: "+1 (555) 234-5678",
      type: "Prospect",
      status: "Active",
      lastContact: "2024-01-14",
      assignedTo: "Emily Davis",
      tags: ["Hot Lead"],
    },
    {
      id: "CON-003",
      name: "Lisa Rodriguez",
      title: "Marketing Director",
      company: "StartUp Co",
      email: "lisa@startup.com",
      phone: "+1 (555) 345-6789",
      type: "Partner",
      status: "Active",
      lastContact: "2024-01-13",
      assignedTo: "Mike Wilson",
      tags: ["Strategic Partner"],
    },
    {
      id: "CON-004",
      name: "David Thompson",
      title: "IT Manager",
      company: "Enterprise Corp",
      email: "d.thompson@enterprise.com",
      phone: "+1 (555) 456-7890",
      type: "Customer",
      status: "Inactive",
      lastContact: "2024-01-05",
      assignedTo: "Sarah Brown",
      tags: ["Dormant"],
    },
  ]

  const contactStats = [
    { type: "Customers", count: 1234, growth: "+8.5%" },
    { type: "Prospects", count: 567, growth: "+15.2%" },
    { type: "Partners", count: 89, growth: "+5.1%" },
    { type: "Vendors", count: 156, growth: "+3.8%" },
  ]

  const recentActivities = [
    {
      contact: "Sarah Johnson",
      activity: "Email sent",
      description: "Follow-up on proposal discussion",
      timestamp: "2 hours ago",
      type: "email",
    },
    {
      contact: "Michael Chen",
      activity: "Meeting scheduled",
      description: "Product demo next Tuesday",
      timestamp: "4 hours ago",
      type: "meeting",
    },
    {
      contact: "Lisa Rodriguez",
      activity: "Phone call",
      description: "Partnership agreement review",
      timestamp: "1 day ago",
      type: "call",
    },
    {
      contact: "David Thompson",
      activity: "Note added",
      description: "Customer expressed interest in upgrade",
      timestamp: "2 days ago",
      type: "note",
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default" as const
      case "Inactive":
        return "secondary" as const
      case "Blocked":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "Customer":
        return "default" as const
      case "Prospect":
        return "secondary" as const
      case "Partner":
        return "outline" as const
      case "Vendor":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "call":
        return <Phone className="h-4 w-4" />
      case "meeting":
        return <Users className="h-4 w-4" />
      default:
        return <Building className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Management</h1>
          <p className="text-muted-foreground">360-degree customer view with interaction history and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {contactStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.type}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.growth}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest interactions and communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{activity.contact}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm font-medium">{activity.activity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Directory</CardTitle>
          <CardDescription>Complete contact database with relationship tracking</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
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
                <TableHead>Contact</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
                        <AvatarFallback>
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{contact.title}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{contact.email}</div>
                      <div className="text-sm text-muted-foreground">{contact.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(contact.type)}>{contact.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(contact.status)}>{contact.status}</Badge>
                  </TableCell>
                  <TableCell>{contact.lastContact}</TableCell>
                  <TableCell>{contact.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
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
    </div>
  )
}
