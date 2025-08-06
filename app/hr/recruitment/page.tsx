"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Download, UserPlus, Users, Clock, CheckCircle } from "lucide-react"

export default function Recruitment() {
  const jobOpenings = [
    {
      id: "JOB-001",
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      posted: "2024-01-10",
      applications: 45,
      interviews: 8,
      offers: 2,
      status: "Active",
      priority: "High",
    },
    {
      id: "JOB-002",
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      posted: "2024-01-08",
      applications: 32,
      interviews: 5,
      offers: 1,
      status: "Active",
      priority: "Medium",
    },
    {
      id: "JOB-003",
      title: "Sales Representative",
      department: "Sales",
      location: "Chicago, IL",
      type: "Full-time",
      posted: "2024-01-05",
      applications: 28,
      interviews: 12,
      offers: 3,
      status: "Filled",
      priority: "High",
    },
    {
      id: "JOB-004",
      title: "HR Specialist",
      department: "HR",
      location: "Los Angeles, CA",
      type: "Contract",
      posted: "2024-01-12",
      applications: 18,
      interviews: 3,
      offers: 0,
      status: "Active",
      priority: "Low",
    },
  ]

  const candidates = [
    {
      id: "CAN-001",
      name: "Alice Johnson",
      position: "Senior Software Engineer",
      email: "alice@email.com",
      phone: "+1 (555) 123-4567",
      source: "LinkedIn",
      stage: "Technical Interview",
      score: 85,
      appliedDate: "2024-01-12",
      status: "Active",
    },
    {
      id: "CAN-002",
      name: "Bob Smith",
      position: "Marketing Manager",
      email: "bob@email.com",
      phone: "+1 (555) 234-5678",
      source: "Company Website",
      stage: "HR Screening",
      score: 78,
      appliedDate: "2024-01-11",
      status: "Active",
    },
    {
      id: "CAN-003",
      name: "Carol Davis",
      position: "Sales Representative",
      email: "carol@email.com",
      phone: "+1 (555) 345-6789",
      source: "Referral",
      stage: "Offer Extended",
      score: 92,
      appliedDate: "2024-01-09",
      status: "Offer Pending",
    },
    {
      id: "CAN-004",
      name: "David Wilson",
      position: "HR Specialist",
      email: "david@email.com",
      phone: "+1 (555) 456-7890",
      source: "Job Board",
      stage: "Application Review",
      score: 65,
      appliedDate: "2024-01-13",
      status: "Active",
    },
  ]

  const recruitmentMetrics = [
    { metric: "Time to Fill", value: "28 days", target: "30 days", trend: "improving" },
    { metric: "Cost per Hire", value: "$3,200", target: "$3,500", trend: "improving" },
    { metric: "Offer Acceptance Rate", value: "85%", target: "80%", trend: "improving" },
    { metric: "Quality of Hire", value: "4.2/5", target: "4.0/5", trend: "stable" },
  ]

  const interviewSchedule = [
    {
      time: "09:00 AM",
      candidate: "Alice Johnson",
      position: "Senior Software Engineer",
      interviewer: "John Smith",
      type: "Technical",
      status: "Scheduled",
    },
    {
      time: "11:00 AM",
      candidate: "Bob Smith",
      position: "Marketing Manager",
      interviewer: "Sarah Johnson",
      type: "HR Screening",
      status: "Scheduled",
    },
    {
      time: "02:00 PM",
      candidate: "Emily Brown",
      position: "Sales Representative",
      interviewer: "Mike Davis",
      type: "Final",
      status: "Completed",
    },
    {
      time: "04:00 PM",
      candidate: "David Wilson",
      position: "HR Specialist",
      interviewer: "Lisa Rodriguez",
      type: "Phone Screen",
      status: "Scheduled",
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default" as const
      case "Filled":
        return "secondary" as const
      case "On Hold":
        return "outline" as const
      case "Cancelled":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive" as const
      case "Medium":
        return "secondary" as const
      case "Low":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  const getCandidateStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default" as const
      case "Offer Pending":
        return "secondary" as const
      case "Hired":
        return "default" as const
      case "Rejected":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  const getInterviewStatusVariant = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "default" as const
      case "Completed":
        return "secondary" as const
      case "Cancelled":
        return "destructive" as const
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
          <h1 className="text-3xl font-bold tracking-tight">Recruitment</h1>
          <p className="text-muted-foreground">Applicant tracking with interview scheduling and candidate scoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post Job
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">123</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers Extended</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Pending acceptance</p>
          </CardContent>
        </Card>
      </div>

      {/* Recruitment Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Metrics</CardTitle>
          <CardDescription>Key performance indicators for hiring process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {recruitmentMetrics.map((metric, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <div className="font-medium">{metric.metric}</div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Target: {metric.target}</span>
                  <Badge variant={metric.trend === "improving" ? "default" : "secondary"}>{metric.trend}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Openings */}
      <Card>
        <CardHeader>
          <CardTitle>Job Openings</CardTitle>
          <CardDescription>Active job postings and application tracking</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search jobs..." className="pl-8" />
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
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="filled">Filled</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
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
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Interviews</TableHead>
                <TableHead>Offers</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobOpenings.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.type}</Badge>
                  </TableCell>
                  <TableCell>{job.posted}</TableCell>
                  <TableCell>{job.applications}</TableCell>
                  <TableCell>{job.interviews}</TableCell>
                  <TableCell>{job.offers}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(job.priority)}>{job.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
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

      {/* Candidates and Interview Schedule */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Candidates</CardTitle>
            <CardDescription>Candidates in the recruitment pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.slice(0, 4).map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-muted-foreground">{candidate.source}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{candidate.position}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{candidate.stage}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className={`font-medium ${getScoreColor(candidate.score)}`}>{candidate.score}/100</div>
                        <Progress value={candidate.score} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getCandidateStatusVariant(candidate.status)}>{candidate.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Interview Schedule</CardTitle>
            <CardDescription>Scheduled interviews for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interviewSchedule.map((interview, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{interview.time}</div>
                    <div className="text-sm">{interview.candidate}</div>
                    <div className="text-xs text-muted-foreground">{interview.position}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{interview.interviewer}</div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{interview.type}</Badge>
                      <Badge variant={getInterviewStatusVariant(interview.status)}>{interview.status}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
