'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  Users, 
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle,
  Play,
  Calculator
} from 'lucide-react'

export default function HomePage() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern technologies",
      features: ["React/Next.js", "TypeScript", "Responsive Design", "Performance Optimization"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that delight users",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Cross-platform mobile applications",
      features: ["React Native", "iOS/Android", "App Store Optimization", "Performance"]
    },
    {
      icon: Globe,
      title: "Digital Strategy",
      description: "Comprehensive digital transformation solutions",
      features: ["Technology Consulting", "Process Optimization", "Training", "Support"]
    }
  ]

  const stats = [
    { label: "Happy Clients", value: "150+", icon: Users },
    { label: "Projects Completed", value: "200+", icon: CheckCircle },
    { label: "Years Experience", value: "8+", icon: TrendingUp },
    { label: "Team Members", value: "12", icon: Star }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content: "Working with JitenderKumar was transformative. They delivered a stunning web application that exceeded our expectations.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager, InnovateCo",
      content: "The attention to detail and technical expertise is outstanding. Highly recommend for any development project.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, GrowthHub",
      content: "From concept to launch, the process was seamless. The final product perfectly captures our brand vision.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Welcome to My Portfolio
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Building Digital
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Experiences
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Full-stack developer and UI/UX designer creating beautiful, functional digital solutions 
                that drive results and delight users.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-3 text-lg">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What I Do</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activeService === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveService(index)}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Promotion Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Instant Project Estimates</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Use our AI-powered calculator to get accurate cost and timeline estimates for your project
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <Calculator className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Cost Calculator</h3>
                      <p className="text-gray-600">Get accurate estimates in minutes</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">5-Step Smart Wizard</h4>
                        <p className="text-sm text-gray-600">Guided process with intelligent recommendations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Real-Time Pricing</h4>
                        <p className="text-sm text-gray-600">Instant cost breakdown with detailed analysis</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Timeline Estimation</h4>
                        <p className="text-sm text-gray-600">Project duration with phase-by-phase breakdown</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">AI Recommendations</h4>
                        <p className="text-sm text-gray-600">Smart suggestions to optimize your project</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6" size="lg">
                    Try Calculator Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Simple Website</h4>
                    <Badge variant="secondary">Popular</Badge>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">₹1,60,000 - ₹6,40,000</div>
                  <p className="text-sm text-gray-600 mb-4">Basic informational website with minimal functionality</p>
                  <div className="text-xs text-gray-500">Timeline: 2-4 weeks</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Web Application</h4>
                    <Badge variant="default">Recommended</Badge>
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">₹6,40,000 - ₹20,00,000</div>
                  <p className="text-sm text-gray-600 mb-4">Interactive web app with user accounts and database</p>
                  <div className="text-xs text-gray-500">Timeline: 6-12 weeks</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">E-commerce Platform</h4>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">₹12,00,000 - ₹40,00,000</div>
                  <p className="text-sm text-gray-600 mb-4">Online store with payment processing and inventory</p>
                  <div className="text-xs text-gray-500">Timeline: 10-16 weeks</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What my clients say about working with me
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's collaborate to bring your vision to life. Get in touch today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3 text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}