'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Code,
  Palette,
  Smartphone,
  Globe,
  Filter,
  ArrowRight
} from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  category: string
  type: string
  technologies: string[]
  image: string
  liveUrl: string
  githubUrl: string
  client: string
  date: string
  duration: string
  teamSize: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with advanced features",
    longDescription: "A comprehensive e-commerce platform built with Next.js and Stripe integration, featuring real-time inventory management, advanced search functionality, and a seamless checkout experience.",
    category: "Web Development",
    type: "Commercial",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "PostgreSQL"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    client: "RetailCorp Inc.",
    date: "March 2024",
    duration: "3 months",
    teamSize: "4 developers",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    longDescription: "A real-time task management application with drag-and-drop functionality, team collaboration features, and advanced analytics dashboard.",
    category: "Web Development",
    type: "SaaS",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    client: "Productivity Co.",
    date: "February 2024",
    duration: "2 months",
    teamSize: "3 developers",
    featured: true
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description: "Secure mobile banking application",
    longDescription: "A secure and user-friendly mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.",
    category: "Mobile Development",
    type: "Financial",
    technologies: ["React Native", "TypeScript", "Firebase", "Redux", "Node.js"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    client: "FinTech Solutions",
    date: "January 2024",
    duration: "4 months",
    teamSize: "5 developers",
    featured: false
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio with modern design",
    longDescription: "A stunning personal portfolio website showcasing projects and skills with smooth animations, responsive design, and optimized performance.",
    category: "Web Design",
    type: "Personal",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    client: "Creative Agency",
    date: "December 2023",
    duration: "1 month",
    teamSize: "1 developer",
    featured: false
  },
  {
    id: 5,
    title: "Dashboard Analytics",
    description: "Business intelligence dashboard",
    longDescription: "A comprehensive business intelligence dashboard with real-time data visualization, custom reports, and advanced filtering capabilities.",
    category: "Web Development",
    type: "Enterprise",
    technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL", "Docker"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    client: "DataCorp",
    date: "November 2023",
    duration: "5 months",
    teamSize: "6 developers",
    featured: true
  },
  {
    id: 6,
    title: "Social Media Platform",
    description: "Modern social networking application",
    longDescription: "A feature-rich social media platform with real-time messaging, content sharing, and advanced privacy controls.",
    category: "Web Development",
    type: "Social",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "AWS"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    client: "SocialTech Inc.",
    date: "October 2023",
    duration: "6 months",
    teamSize: "8 developers",
    featured: false
  },
  {
    id: 7,
    title: "Learning Management System",
    description: "Educational platform with video streaming",
    longDescription: "A comprehensive learning management system with video streaming, progress tracking, and interactive course materials.",
    category: "Web Development",
    type: "Education",
    technologies: ["Next.js", "TypeScript", "AWS S3", "PostgreSQL", "WebRTC"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    client: "EduTech Solutions",
    date: "September 2023",
    duration: "4 months",
    teamSize: "5 developers",
    featured: false
  },
  {
    id: 8,
    title: "Restaurant Booking System",
    description: "Online reservation management platform",
    longDescription: "A restaurant booking system with real-time availability, table management, and customer relationship management features.",
    category: "Web Development",
    type: "Hospitality",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Google Maps API"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    client: "RestaurantChain",
    date: "August 2023",
    duration: "3 months",
    teamSize: "4 developers",
    featured: false
  },
  {
    id: 9,
    title: "Fitness Tracking App",
    description: "Health and fitness monitoring application",
    longDescription: "A comprehensive fitness tracking app with workout planning, progress monitoring, and social features for motivation.",
    category: "Mobile Development",
    type: "Health",
    technologies: ["React Native", "TypeScript", "Firebase", "HealthKit", "Google Fit"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    client: "FitTech Co.",
    date: "July 2023",
    duration: "3 months",
    teamSize: "3 developers",
    featured: false
  }
]

const categories = ["All", "Web Development", "Mobile Development", "Web Design"]
const types = ["All", "Commercial", "SaaS", "Financial", "Personal", "Enterprise", "Social", "Education", "Hospitality", "Health"]
const technologies = ["All", "React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB", "PostgreSQL", "AWS", "Firebase"]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedTech, setSelectedTech] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const featuredProjects = projects.filter(project => project.featured)

  const filterProjects = () => {
    let filtered = projects
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }
    
    if (selectedType !== "All") {
      filtered = filtered.filter(project => project.type === selectedType)
    }
    
    if (selectedTech !== "All") {
      filtered = filtered.filter(project => project.technologies.includes(selectedTech))
    }
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    setFilteredProjects(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setTimeout(filterProjects, 100)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setTimeout(filterProjects, 100)
  }

  const handleTechChange = (tech: string) => {
    setSelectedTech(tech)
    setTimeout(filterProjects, 100)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    setSearchTerm(search)
    setTimeout(() => {
      if (search) {
        const filtered = projects.filter(project => 
          project.title.toLowerCase().includes(search.toLowerCase()) ||
          project.description.toLowerCase().includes(search.toLowerCase()) ||
          project.technologies.some(tech => tech.toLowerCase().includes(search.toLowerCase()))
        )
        setFilteredProjects(filtered)
      } else {
        filterProjects()
      }
    }, 300)
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedType("All")
    setSelectedTech("All")
    setSearchTerm("")
    setFilteredProjects(projects)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My Portfolio
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            A collection of my recent work showcasing expertise in web development, 
            mobile applications, and design solutions.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search projects by name, technology, or description..."
                className="pl-12 pr-4 py-3 text-lg border-0 bg-white/20 text-white placeholder-blue-200 rounded-full focus:bg-white/30 focus:outline-none"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                  <span className="text-white text-lg font-semibold">Project Preview</span>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <a href={project.liveUrl} className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <a href={project.githubUrl} className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{project.category}</Badge>
                    <Badge variant="outline">{project.type}</Badge>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 cursor-pointer transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.date}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {project.teamSize}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filter Projects</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters}
                className="text-sm"
              >
                Clear Filters
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {types.slice(0, 5).map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTypeChange(type)}
                    className="text-xs"
                  >
                    {type}
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {technologies.slice(0, 5).map((tech) => (
                  <Button
                    key={tech}
                    variant={selectedTech === tech ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTechChange(tech)}
                    className="text-xs"
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              All Projects ({filteredProjects.length})
            </h2>
            <div className="text-sm text-gray-500">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="h-40 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center relative overflow-hidden">
                  <span className="text-white text-lg font-semibold">Project Image</span>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <a href={project.liveUrl} className="bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <a href={project.githubUrl} className="bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                    <Badge variant="outline" className="text-xs">{project.type}</Badge>
                  </div>
                  <CardTitle className="text-lg hover:text-blue-600 cursor-pointer transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.date}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {project.teamSize}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Code className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            I'm always excited to work on new and challenging projects. 
            Let's discuss how we can bring your ideas to life!
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Start a Project <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}