"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, Download, GraduationCap, Users, Clock, Award } from "lucide-react"

export default function TrainingDevelopment() {
  const trainingPrograms = [
    {
      id: "TRN-001",
      title: "Leadership Development Program",
      category: "Leadership",
      duration: "8 weeks",
      format: "Blended",
      enrolled: 25,
      capacity: 30,
      completion: 68,
      rating: 4.5,
      instructor: "Sarah Johnson",
      startDate: "2024-01-15",
      status: "In Progress",
    },
    {
      id: "TRN-002",
      title: "Technical Skills Bootcamp",
      category: "Technical",
      duration: "12 weeks",
      format: "Online",
      enrolled: 40,
      capacity: 50,
      completion: 45,
      rating: 4.2,
      instructor: "Mike Davis",
      startDate: "2024-01-08",
      status: "In Progress",
    },
    {
      id: "TRN-003",
      title: "Customer Service Excellence",
      category: "Soft Skills",
      duration: "4 weeks",
      format: "In-Person",
      enrolled: 18,
      capacity: 20,
      completion: 100,
      rating: 4.8,
      instructor: "Emily Brown",
      startDate: "2023-12-01",
      status: "Completed",
    },
    {
      id: "TRN-004",
      title: "Project Management Certification",
      category: "Certification",
      duration: "16 weeks",
      format: "Hybrid",
      enrolled: 15,
      capacity: 25,
      completion: 25,
      rating: 4.3,
      instructor: "John Smith",
      startDate: "2024-01-22",
      status: "Starting Soon",
    },
  ]

  const employeeProgress = [
    {
      id: "EMP001",
      name: "Alice Johnson",
      department: "Engineering",
      program: "Leadership Development Program",
      progress: 75,
      completedModules: 6,
      totalModules: 8,
      lastActivity: "2024-01-14",
      status: "On Track",
    },
    {
      id: "EMP002",
      name: "Bob Smith",
      department: "Sales",
      program: "Customer Service Excellence",
      progress: 100,
      completedModules: 4,
      totalModules: 4,
      lastActivity: "2024-01-10",
      status: "Completed",
    },
    {
      id: "EMP003",
      name: "Carol Davis",
      department: "IT",
      program: "Technical Skills Bootcamp",
      progress: 40,
      completedModules: 5,
      totalModules: 12,
      lastActivity: "2024-01-13",
      status: "Behind",
    },
    {
      id: "EMP004",
      name: "David Wilson",
      department: "Marketing",
      program: "Project Management Certification",
      progress: 20,
      completedModules: 3,
      totalModules: 16,
      lastActivity: "2024-01-15",
      status: "On Track",
    },
  ]

  const skillsMatrix = [
    { skill: "Leadership", required: 85, current: 78, gap: -7 },
    { skill: "Technical Proficiency", required: 90, current: 92, gap: 2 },
    { skill: "Communication", required: 80, current: 75, gap: -5 },
    { skill: "Project Management", required: 75, current: 68, gap: -7 },
    { skill: "Customer Service", required: 85, current: 88, gap: 3 },
  ]

  const upcomingCertifications = [
    {
      certification: "PMP Certification",
      employees: 8,
      examDate: "2024-02-15",
      passRate: "85%",
      status: "Scheduled",
    },
    {
      certification: "AWS Cloud Practitioner",
      employees: 12,
      examDate: "2024-02-20",
      passRate: "78%",
      status: "Scheduled",
    },
    {
      certification: "Six Sigma Green Belt",
      employees: 6,
      examDate: "2024-03-01",
      passRate: "92%",
      status: "Preparing",
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default" as const
      case "In Progress":
        return "secondary" as const
      case "Starting Soon":
        return "outline" as const
      case "Cancelled":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  const getProgressStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default" as const
      case "On Track":
        return "secondary" as const
      case "Behind":
        return "destructive" as const
      case "At Risk":
        return "outline" as const
      default:
        return "outline" as const
    }
  }

  const getCertificationStatusVariant = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "default" as const
      case "Preparing":
        return "secondary" as const
      case "Completed":
        return "default" as const
      default:
        return "outline" as const
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}>
        ★
      </span>
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training & Development</h1>
          <p className="text-muted-foreground">Skills matrix with certification tracking and competency mapping</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Program
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Above industry average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26</div>
            <p className="text-xs text-muted-foreground">Earned this year</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Gap Analysis</CardTitle>
          <CardDescription>Current skill levels vs organizational requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillsMatrix.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{skill.skill}</div>
                  <div className="text-sm text-muted-foreground">
                    Current: {skill.current}% | Required: {skill.required}% | Gap: {skill.gap > 0 ? "+" : ""}
                    {skill.gap}%
                  </div>
                </div>
                <div className="relative">
                  <Progress value={skill.current} className="h-3" />
                  <div className="absolute top-0 h-3 w-1 bg-red-500" style={{ left: `${skill.required}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span className={skill.gap < 0 ? "text-red-600" : "text-green-600"}>
                    {skill.gap < 0 ? "Below Target" : "Above Target"}
                  </span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Programs */}
      <Card>
        <CardHeader>
          <CardTitle>Training Programs</CardTitle>
          <CardDescription>Active and upcoming training programs</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search programs..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="soft-skills">Soft Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="starting-soon">Starting Soon</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
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
                <TableHead>Program</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{program.category}</Badge>
                  </TableCell>
                  <TableCell>{program.duration}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{program.format}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {program.enrolled}/{program.capacity}
                      <div className="text-xs text-muted-foreground">
                        {Math.round((program.enrolled / program.capacity) * 100)}% full
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{program.completion}%</div>
                      <Progress value={program.completion} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(program.rating)}
                      <span className="text-sm ml-1">{program.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{program.instructor}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(program.status)}>{program.status}</Badge>
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

      {/* Employee Progress and Certifications */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Employee Progress</CardTitle>
            <CardDescription>Individual training progress tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeProgress.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.department}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{employee.program}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{employee.progress}%</div>
                        <Progress value={employee.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {employee.completedModules}/{employee.totalModules} modules
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getProgressStatusVariant(employee.status)}>{employee.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Certifications</CardTitle>
            <CardDescription>Scheduled certification exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingCertifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{cert.certification}</div>
                    <div className="text-sm text-muted-foreground">
                      {cert.employees} employees • Exam: {cert.examDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Pass Rate: {cert.passRate}</div>
                    <Badge variant={getCertificationStatusVariant(cert.status)}>{cert.status}</Badge>
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
