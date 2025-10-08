'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  Users, 
  TrendingUp, 
  Award, 
  CheckCircle,
  Building,
  ShoppingCart,
  Smartphone,
  Globe,
  Quote,
  Calendar,
  MapPin,
  ArrowRight,
  Play
} from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  location: string
  content: string
  project: string
  rating: number
  date: string
  category: string
  avatar: string
  results: {
    metric: string
    value: string
    improvement: string
  }[]
}

interface CaseStudy {
  id: number
  title: string
  company: string
  category: string
  description: string
  results: string[]
  image: string
  link: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    location: "San Francisco, CA",
    content: "Working with JitenderKumar was transformative. They delivered a stunning web application that exceeded our expectations. The attention to detail and technical expertise is outstanding. Our conversion rates increased by 40% within the first month of launch.",
    project: "E-Commerce Platform",
    rating: 5,
    date: "March 2024",
    category: "Web Development",
    avatar: "/api/placeholder/100/100",
    results: [
      { metric: "Conversion Rate", value: "40%", improvement: "increase" },
      { metric: "Page Load Time", value: "60%", improvement: "decrease" },
      { metric: "User Engagement", value: "35%", improvement: "increase" }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCo",
    location: "New York, NY",
    content: "The team at JitenderKumar is exceptional. They took our complex requirements and turned them into a beautiful, functional product. The project was delivered on time and within budget. Highly recommend for any development project.",
    project: "Task Management App",
    rating: 5,
    date: "February 2024",
    category: "Web Development",
    avatar: "/api/placeholder/100/100",
    results: [
      { metric: "Team Productivity", value: "50%", improvement: "increase" },
      { metric: "Project Completion", value: "30%", improvement: "increase" },
      { metric: "User Satisfaction", value: "45%", improvement: "increase" }
    ]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthHub",
    location: "Austin, TX",
    content: "From concept to launch, the process was seamless. The final product perfectly captures our brand vision and has significantly improved our online presence. The ongoing support and maintenance have been excellent.",
    project: "Company Website",
    rating: 5,
    date: "January 2024",
    category: "Web Design",
    avatar: "/api/placeholder/100/100",
    results: [
      { metric: "Website Traffic", value: "70%", improvement: "increase" },
      { metric: "Lead Generation", value: "55%", improvement: "increase" },
      { metric: "Brand Recognition", value: "40%", improvement: "increase" }
    ]
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO",
    company: "FinTech Solutions",
    location: "Seattle, WA",
    content: "JitenderKumar delivered a secure and user-friendly mobile banking application that has been praised by our customers. The technical expertise and attention to security requirements were impressive throughout the project.",
    project: "Mobile Banking App",
    rating: 5,
    date: "December 2023",
    category: "Mobile Development",
    avatar: "/api/placeholder/100/100",
    results: [
      { metric: "App Downloads", value: "10K+", improvement: "in first month" },
      { metric: "User Retention", value: "85%", improvement: "retention rate" },
      { metric: "Transaction Volume", value: "25%", improvement: "increase" }
    ]
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Founder",
    company: "EduTech Startups",
    location: "Boston, MA",
    content: "The learning management system developed by JitenderKumar has revolutionized how we deliver educational content. The platform is intuitive, scalable, and has received excellent feedback from both instructors and students.",
    project: "LMS Platform",
    rating: 5,
    date: "November 2023",
    category: "Web Development",
    avatar: "/api/placeholder/100/100",
    results: [
      { metric: "Student Enrollment", value: "60%", improvement: "increase" },
      { metric: "Course Completion", value: "45%", improvement: "increase" },
      { metric: "Instructor Satisfaction", value: "90%", improvement: "satisfaction rate" }
    ]
  },
  {
    id: 6,
    name: "Robert Wilson",
    role: "Operations Manager",
    company: "RestaurantChain",
    location: "Chicago, IL",
    content: "The restaurant booking system has streamlined our operations and improved customer experience. The real-time availability and easy-to-use interface have made a significant difference to our business.",
    project: "Booking System",
    rating: 5,
    date: "October 2023",
    category: "Web Development",
    avatar: "/api/placeholder/100/100",
    results: [
      { metric: "Reservation Rate", value: "35%", improvement: "increase" },
      { metric: "No-show Rate", value: "50%", improvement: "decrease" },
      { metric: "Customer Satisfaction", value: "40%", improvement: "increase" }
    ]
  }
]

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "E-Commerce Transformation",
    company: "RetailCorp Inc.",
    category: "E-Commerce",
    description: "Complete redesign and development of a modern e-commerce platform with advanced features and seamless user experience.",
    results: [
      "40% increase in conversion rates",
      "60% faster page load times",
      "35% improvement in user engagement"
    ],
    image: "/api/placeholder/400/300",
    link: "/case-studies/ecommerce"
  },
  {
    id: 2,
    title: "Mobile Banking Revolution",
    company: "FinTech Solutions",
    category: "FinTech",
    description: "Development of a secure, user-friendly mobile banking application with biometric authentication and real-time transactions.",
    results: [
      "10,000+ downloads in first month",
      "85% user retention rate",
      "25% increase in transaction volume"
    ],
    image: "/api/placeholder/400/300",
    link: "/case-studies/mobile-banking"
  },
  {
    id: 3,
    title: "Educational Platform Success",
    company: "EduTech Startups",
    category: "Education",
    description: "Comprehensive learning management system with video streaming, progress tracking, and interactive course materials.",
    results: [
      "60% increase in student enrollment",
      "45% improvement in course completion",
      "90% instructor satisfaction rate"
    ],
    image: "/api/placeholder/400/300",
    link: "/case-studies/education"
  }
]

const stats = [
  { label: "Happy Clients", value: "150+", icon: Users },
  { label: "Projects Completed", value: "200+", icon: CheckCircle },
  { label: "Years Experience", value: "8+", icon: Award },
  { label: "Client Retention", value: "95%", icon: TrendingUp }
]

const categories = ["All", "Web Development", "Mobile Development", "Web Design", "E-Commerce", "FinTech", "Education"]

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials)

  const filterTestimonials = (category: string) => {
    if (category === "All") {
      setFilteredTestimonials(testimonials)
    } else {
      setFilteredTestimonials(testimonials.filter(testimonial => testimonial.category === category))
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterTestimonials(category)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client Testimonials
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Hear from my clients about their experiences working with me. 
            Their success stories are the best measure of my work.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className="px-6 py-2 rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-xs text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Quote className="h-6 w-6 text-blue-200 mb-2" />
                    <p className="text-gray-700 italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.project}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-900">Results:</h4>
                    {testimonial.results.map((result, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>{result.metric}: {result.value} {result.improvement}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {testimonial.date}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {testimonial.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Detailed case studies showcasing how I've helped businesses achieve their goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative">
                  <span className="text-white text-lg font-semibold">Case Study Image</span>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{study.category}</Badge>
                    <Badge variant="outline">{study.company}</Badge>
                  </div>
                  <CardTitle className="text-lg hover:text-blue-600 cursor-pointer transition-colors">
                    {study.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {study.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {study.results.map((result, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {result}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline">
                    View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Companies</h2>
            <p className="text-xl text-gray-600">
              I've had the privilege of working with amazing companies across various industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <Building className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Be My Next Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the growing list of satisfied clients who have achieved their digital goals with my help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule a Call
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}