'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Code, 
  Palette, 
  Globe, 
  Smartphone, 
  Database,
  Cloud,
  Zap,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react'

export default function AboutPage() {
  const skills = [
    { name: "React/Next.js", level: 95, icon: Code },
    { name: "TypeScript", level: 90, icon: Code },
    { name: "UI/UX Design", level: 85, icon: Palette },
    { name: "Node.js", level: 88, icon: Globe },
    { name: "Mobile Development", level: 80, icon: Smartphone },
    { name: "Database Design", level: 85, icon: Database },
    { name: "Cloud Services", level: 82, icon: Cloud },
    { name: "Performance Optimization", level: 90, icon: Zap }
  ]

  const experience = [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCorp Solutions",
      period: "2021 - Present",
      description: "Leading development of enterprise web applications and mentoring junior developers."
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      period: "2019 - 2021",
      description: "Developed responsive web applications for high-profile clients across various industries."
    },
    {
      title: "UI/UX Designer & Developer",
      company: "Startup Innovations",
      period: "2017 - 2019",
      description: "Designed and implemented user interfaces for multiple startup products."
    },
    {
      title: "Junior Web Developer",
      company: "WebDev Studio",
      period: "2016 - 2017",
      description: "Started professional career building websites and learning modern development practices."
    }
  ]

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      period: "2012 - 2016",
      description: "Graduated with honors, focusing on web technologies and software engineering."
    },
    {
      degree: "UX Design Certification",
      institution: "Design Academy",
      period: "2018",
      description: "Professional certification in user experience design and interface prototyping."
    }
  ]

  const certifications = [
    { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2022" },
    { name: "Google UX Design Certificate", issuer: "Google", year: "2021" },
    { name: "React Developer Certification", issuer: "Meta", year: "2020" },
    { name: "Scrum Master Certification", issuer: "Scrum Alliance", year: "2019" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-6">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Me
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Passionate full-stack developer and UI/UX designer with 8+ years of experience 
              creating beautiful, functional digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">My Story</h2>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">
                  Hello! I'm a passionate full-stack developer and UI/UX designer with a love for creating 
                  beautiful, functional digital experiences. With over 8 years of experience in the industry, 
                  I've had the privilege of working with amazing companies and clients to bring their visions to life.
                </p>
                <p className="text-lg leading-relaxed">
                  My journey began with a curiosity about how websites work and evolved into a deep expertise 
                  in modern web technologies. I specialize in React, Next.js, and TypeScript, but I'm always 
                  eager to learn new technologies and stay up-to-date with the latest trends in web development.
                </p>
                <p className="text-lg leading-relaxed">
                  What drives me is the opportunity to solve complex problems and create solutions that not only 
                  meet technical requirements but also provide exceptional user experiences. I believe that great 
                  design and great code go hand in hand.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-blue-600" />
                    <span>hello@jitenderkumar.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-blue-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3 text-blue-600" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-3 text-blue-600" />
                    <span>Available for projects</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3">Connect with me</h4>
                    <div className="flex space-x-3">
                      <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
            <p className="text-xl text-gray-600">Technologies and skills I specialize in</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <skill.icon className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="font-semibold">{skill.name}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Work Experience</h2>
            <p className="text-xl text-gray-600">My professional journey</p>
          </div>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-lg text-blue-600">{exp.company}</p>
                    </div>
                    <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                      <Calendar className="h-4 w-4 mr-2" />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-lg text-blue-600">{edu.institution}</p>
                        </div>
                        <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                          <Calendar className="h-4 w-4 mr-2" />
                          {edu.period}
                        </div>
                      </div>
                      <p className="text-gray-600">{edu.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-yellow-500 mr-3" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{cert.year}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            I'm always interested in hearing about new projects and opportunities. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Get In Touch
          </Button>
        </div>
      </section>
    </div>
  )
}