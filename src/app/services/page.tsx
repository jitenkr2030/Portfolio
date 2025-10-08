'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
  Clock,
  DollarSign,
  Zap,
  Shield,
  Headphones,
  Award,
  Calendar,
  CreditCard
} from 'lucide-react'

interface Service {
  id: number
  title: string
  description: string
  icon: any
  features: string[]
  popular: boolean
  color: string
}

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular: boolean
  cta: string
  color: string
}

const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom web applications built with modern technologies and best practices",
    icon: Code,
    features: [
      "Responsive Design",
      "Performance Optimization",
      "SEO Friendly",
      "Cross-browser Compatibility",
      "Modern Frameworks (React, Next.js)",
      "API Integration"
    ],
    popular: true,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that delight users and drive engagement",
    icon: Palette,
    features: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Visual Design",
      "Design Systems",
      "Usability Testing",
      "Accessibility Compliance"
    ],
    popular: true,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 3,
    title: "Mobile Development",
    description: "Cross-platform mobile applications with native performance and feel",
    icon: Smartphone,
    features: [
      "iOS & Android Development",
      "React Native",
      "Native Performance",
      "App Store Optimization",
      "Push Notifications",
      "Offline Functionality"
    ],
    popular: false,
    color: "from-green-500 to-green-600"
  },
  {
    id: 4,
    title: "Digital Strategy",
    description: "Comprehensive digital transformation solutions and consulting",
    icon: Globe,
    features: [
      "Technology Consulting",
      "Digital Transformation",
      "Process Optimization",
      "Training & Support",
      "Project Management",
      "Ongoing Maintenance"
    ],
    popular: false,
    color: "from-orange-500 to-orange-600"
  }
]

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$2,999",
    period: "project",
    description: "Perfect for small businesses and startups",
    features: [
      "Up to 10 pages website",
      "Responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "3 months support",
      "1 revision round"
    ],
    popular: false,
    cta: "Get Started",
    color: "from-gray-500 to-gray-600"
  },
  {
    name: "Professional",
    price: "$5,999",
    period: "project",
    description: "Ideal for growing businesses",
    features: [
      "Up to 25 pages website",
      "Advanced responsive design",
      "Advanced SEO optimization",
      "CMS integration",
      "E-commerce functionality",
      "6 months support",
      "3 revision rounds",
      "Performance optimization"
    ],
    popular: true,
    cta: "Most Popular",
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "project",
    description: "For large organizations and complex projects",
    features: [
      "Unlimited pages",
      "Custom design & development",
      "Advanced SEO & Analytics",
      "Custom CMS/CRM",
      "Advanced e-commerce",
      "12 months support",
      "Unlimited revisions",
      "Dedicated project manager",
      "Priority support",
      "Custom integrations"
    ],
    popular: false,
    cta: "Contact Us",
    color: "from-purple-500 to-purple-600"
  }
]

const processSteps = [
  {
    title: "Discovery",
    description: "Understanding your goals, requirements, and vision",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    title: "Planning",
    description: "Creating detailed project plan and timeline",
    icon: Calendar,
    color: "bg-purple-500"
  },
  {
    title: "Design",
    description: "Developing wireframes and visual designs",
    icon: Palette,
    color: "bg-green-500"
  },
  {
    title: "Development",
    description: "Building your solution with modern technologies",
    icon: Code,
    color: "bg-orange-500"
  },
  {
    title: "Testing",
    description: "Quality assurance and user testing",
    icon: Shield,
    color: "bg-red-500"
  },
  {
    title: "Launch",
    description: "Deploying your project and providing support",
    icon: Zap,
    color: "bg-indigo-500"
  }
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Comprehensive digital solutions tailored to your business needs. 
            From concept to launch, I deliver exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              View Pricing
              <DollarSign className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Book Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What I Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional services designed to help your business succeed in the digital world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedService === index ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
                onClick={() => setSelectedService(index)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">
                      Popular
                    </Badge>
                  )}
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
                  <Button className="w-full mt-4" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. Choose the plan that fits your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2">
                    <span className="text-sm font-semibold">Most Popular</span>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Need a custom solution? Let's discuss your specific requirements.
            </p>
            <Button variant="outline" size="lg">
              Get Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              My proven 6-step process ensures your project is delivered on time and exceeds expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-500 mb-2">Step {index + 1}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Me</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What sets me apart from other developers and designers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expertise</h3>
                <p className="text-gray-600 text-sm">8+ years of experience in web development and design</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Timely Delivery</h3>
                <p className="text-gray-600 text-sm">Projects delivered on time, every time</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Round-the-clock support for all your needs</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Results-Driven</h3>
                <p className="text-gray-600 text-sm">Focused on delivering measurable results</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your project requirements and how I can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book a Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              View Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}