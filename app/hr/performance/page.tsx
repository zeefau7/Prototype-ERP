"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Download, Award, Target, TrendingUp, Users } from "lucide-react"

export default function PerformanceManagement() {
  const performanceReviews = [
    {
      id: "REV-001",
      employee: "Alice Johnson",
      department: "Engineering",
      position: "Senior Developer",
      reviewer: "John Smith",
      period: "Q4 2023",
      overallScore: 4.2,
      goals: 5,
      goalsCompleted: 4,
      status: "Completed",
      reviewDate: "2024-01-10",
    },
    {
      id: "REV-002",
      employee: "Bob Smith",
      department: "Sales",
      position: "Sales Manager",
      reviewer: "Sarah Johnson",
      period: "Q4 2023",
      overallScore: 3.8,
      goals: 6,
      goalsCompleted: 5,
      status: "Completed",
      reviewDate: "2024-01-08",
    },
    {
      id: "REV-003",
      employee: "Carol Davis",
      department: "Marketing",
      position: "Marketing Specialist",
      reviewer: "Mike Wilson",
      period: "Q4 2023",
      overallScore: 4.5,
      goals: 4,
      goalsCompleted: 4,
      status: "In Progress",
      reviewDate: "2024-01-15",
    },
    {
      id: "REV-004",
      employee: "David Wilson",
      department: "HR",
      position: "HR Specialist",
      reviewer: "Emily Brown",
      period: "Q4 2023",
      overallScore: 0,
      goals: 5,
      goalsCompleted: 0,
      status: "Pending",
      reviewDate: "2024-01-20",
    },
  ]

  const goalTracking = [
    {
      id: "GOAL-001",
      employee: "Alice Johnson",
      goal: "Complete React certification",
      category: "Professional Development",
      target: "2024-03-31",
      progress: 75,
      status: "On Track",
      priority: "High",
    },
    {
      id: "GOAL-002",
      employee: "Bob Smith",
      goal: "Increase sales by 20%",
      category: "Performance",
      target: "2024-12-31",
      progress: 45,
      status: "Behind",
      priority: "High",
    },
    {
      id: "GOAL-003",
      employee: "Carol Davis",
      goal: "Launch new marketing campaign",
      category: "Project",
      target: "2024-02-28",
      progress: 90,
      status: "On Track",
      priority: "Medium",
    },
    {
      id: "GOAL-004",
      employee: "David Wilson",
      goal: "Implement new HR system",
      category: "Process Improvement",
      target: "2024-06-30",
      progress: 25,
      status: "At Risk",
      priority: "High",
    },
  ]

  const performanceMetrics = [
    { metric: "Overall Satisfaction", score: 4.1, target: 4.0, trend: "up" },
    { metric: "Goal Achievement", score: 78, target: 80, trend: "down" },
    { metric: "Review Completion", score: 92, target: 95, trend: "up" },
    { metric: "Development Plans", score: 85, target: 90, trend: "stable" },
  ]

  const topPerformers = [
    { name: "Carol Davis", department: "Marketing", score: 4.5, improvement: "+0.3" },
    { name: "Alice Johnson", department: "Engineering", score: 4.2, improvement: "+0.1" },
    { name: "Mike Wilson", department: "Operations", score: 4.1, improvement: "+0.2" },
    { name: "Sarah Brown", department: "Finance", score: 4.0, improvement: "+0.4" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default" as const
      case "In Progress":
        return "secondary" as const
      case "Pending":
        return "outline" as const
      case "Overdue":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  const getGoalStatusVariant = (status: string) => {
    switch (status) {
      case "On Track":
        return "default" as const
      case "Behind":
        return "destructive" as const
      case "At Risk":
        return "outline" as const
      case "Completed":
        return "default" as const
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

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(score) ? "text-yellow-400" : "text-gray-300"}`}>
        ★
      </span>
    ))
  }

  const getMetricColor = (score: number, target: number) => {
    if (score >= target) return "text-green-600"
    if (score >= target * 0.9) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Management</h1>
          <p className="text-muted-foreground">360-degree feedback with goal tracking and development planning</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Review
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">This review cycle</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.1</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2</span> from last cycle
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Achieved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Of all set goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Exceeding expectations</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators across the organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <div className="font-medium">{metric.metric}</div>
                <div className={`text-2xl font-bold ${getMetricColor(metric.score, metric.target)}`}>
                  {metric.metric.includes("Score") ? metric.score.toFixed(1) : `${metric.score}%`}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Target: {metric.metric.includes("Score") ? metric.target.toFixed(1) : `${metric.target}%`}
                  </span>
                  <Badge
                    variant={metric.trend === "up" ? "default" : metric.trend === "down" ? "destructive" : "secondary"}
                  >
                    {metric.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Reviews</CardTitle>
          <CardDescription>Employee performance review tracking and management</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search reviews..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
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
                <TableHead>Reviewer</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Overall Score</TableHead>
                <TableHead>Goals</TableHead>
                <TableHead>Review Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.employee}</TableCell>
                  <TableCell>{review.department}</TableCell>
                  <TableCell>{review.position}</TableCell>
                  <TableCell>{review.reviewer}</TableCell>
                  <TableCell>{review.period}</TableCell>
                  <TableCell>
                    {review.overallScore > 0 ? (
                      <div className="flex items-center space-x-1">
                        {renderStars(review.overallScore)}
                        <span className="text-sm ml-1">{review.overallScore}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {review.goalsCompleted}/{review.goals}
                      <div className="text-xs text-muted-foreground">
                        {review.goals > 0 ? Math.round((review.goalsCompleted / review.goals) * 100) : 0}% complete
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{review.reviewDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(review.status)}>{review.status}</Badge>
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

      {/* Goal Tracking and Top Performers */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Goal Tracking</CardTitle>
            <CardDescription>Individual and team goal progress monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goalTracking.map((goal) => (
                  <TableRow key={goal.id}>
                    <TableCell className="font-medium">{goal.employee}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium">{goal.goal}</div>
                        <div className="text-xs text-muted-foreground">{goal.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{goal.progress}%</div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityVariant(goal.priority)}>{goal.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getGoalStatusVariant(goal.status)}>{goal.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Highest performing employees this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{performer.name}</div>
                      <div className="text-sm text-muted-foreground">{performer.department}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {renderStars(performer.score)}
                      <span className="text-sm ml-1">{performer.score}</span>
                    </div>
                    <div className="text-xs text-green-600">{performer.improvement}</div>
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
