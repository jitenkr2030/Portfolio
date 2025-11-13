'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Exploring the latest trends in web development including AI integration, serverless architecture, and progressive web apps.",
    content: "Full content about web development trends...",
    author: "Alex Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["AI", "Web Development", "Trends", "2024"],
    featured: true,
    image: "/api/placeholder/800/400"
  },
  {
    id: 2,
    title: "Building Scalable React Applications: Best Practices",
    excerpt: "Learn how to structure your React applications for scalability, performance, and maintainability.",
    content: "Full content about React best practices...",
    author: "Sarah Chen",
    date: "March 10, 2024",
    readTime: "12 min read",
    category: "React",
    tags: ["React", "JavaScript", "Best Practices", "Performance"],
    featured: true,
    image: "/api/placeholder/800/400"
  },
  {
    id: 3,
    title: "Mastering TypeScript: Advanced Patterns and Techniques",
    excerpt: "Deep dive into advanced TypeScript patterns that will level up your development workflow.",
    content: "Full content about TypeScript patterns...",
    author: "Mike Davis",
    date: "March 5, 2024",
    readTime: "10 min read",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Patterns", "Advanced"],
    featured: false,
    image: "/api/placeholder/800/400"
  },
  {
    id: 4,
    title: "The Power of Next.js 14: Server Components and Beyond",
    excerpt: "Discover how Next.js 14 is revolutionizing web development with server components and enhanced performance.",
    content: "Full content about Next.js 14...",
    author: "Emily Rodriguez",
    date: "February 28, 2024",
    readTime: "15 min read",
    category: "Next.js",
    tags: ["Next.js", "React", "Server Components", "Performance"],
    featured: true,
    image: "/api/placeholder/800/400"
  },
  {
    id: 5,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "A comprehensive guide to understanding when to use CSS Grid versus Flexbox for your layouts.",
    content: "Full content about CSS Grid vs Flexbox...",
    author: "David Kim",
    date: "February 20, 2024",
    readTime: "7 min read",
    category: "CSS",
    tags: ["CSS", "Layout", "Flexbox", "Grid"],
    featured: false,
    image: "/api/placeholder/800/400"
  },
  {
    id: 6,
    title: "Building Accessible Web Applications: A Complete Guide",
    excerpt: "Learn the fundamentals of web accessibility and how to create inclusive digital experiences.",
    content: "Full content about web accessibility...",
    author: "Lisa Thompson",
    date: "February 15, 2024",
    readTime: "11 min read",
    category: "Accessibility",
    tags: ["Accessibility", "WCAG", "Inclusive Design", "UX"],
    featured: false,
    image: "/api/placeholder/800/400"
  }
]

const categories = ["All", "Web Development", "React", "TypeScript", "Next.js", "CSS", "Accessibility"]
const popularTags = ["JavaScript", "React", "TypeScript", "Next.js", "CSS", "Performance", "Accessibility", "AI"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 3)

  const filterPosts = (category: string, search: string) => {
    let filtered = blogPosts
    
    if (category !== "All") {
      filtered = filtered.filter(post => post.category === category)
    }
    
    if (search) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    }
    
    setFilteredPosts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterPosts(category, searchTerm)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    setSearchTerm(search)
    filterPosts(selectedCategory, search)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Insights & Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stay updated with the latest trends, best practices, and insights in web development, 
            design, and technology. Expert articles to help you grow.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles, topics, or tags..."
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">Featured Image</span>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 cursor-pointer transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Read Article <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 bg-gray-50">
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

      {/* All Posts */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-40 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">Article Image</span>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg hover:text-blue-600 cursor-pointer transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" variant="outline" size="sm">
                    Read More <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sidebar with Recent Posts and Popular Tags */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="h-3 w-3 mr-1" />
                        {post.author} • {post.date}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest insights and updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="Your email address"
                    className="text-sm"
                  />
                  <Button className="w-full" size="sm">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Want to Stay Updated?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter and never miss an update on the latest web development trends and insights.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}