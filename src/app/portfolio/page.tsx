'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Search, 
  Github, 
  Star, 
  GitFork, 
  Code,
  Calendar,
  Users,
  Filter,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Package,
  Globe
} from 'lucide-react'
import RepositoryCard from '@/components/RepositoryCard'
import { categorizeRepositories, filterRepositories, getRepositoryStats } from '@/utils/repositoryUtils'

interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  topics: string[]
  stargazers_count: number
  forks_count: number
  updated_at: string
  created_at: string
  size: number
  owner: {
    login: string
    avatar_url: string
  }
  languages: Record<string, number>
}

export default function PortfolioPage() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState('jitenkr2030')
  const [inputUsername, setInputUsername] = useState('jitenkr2030')
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [selectedPopularity, setSelectedPopularity] = useState('All')
  
  // Categorization data
  const [categories, setCategories] = useState<{
    byLanguage: { name: string; count: number }[]
    byTopic: { name: string; count: number }[]
    allLanguages: string[]
    allTopics: string[]
  }>({
    byLanguage: [],
    byTopic: [],
    allLanguages: [],
    allTopics: []
  })

  const [stats, setStats] = useState({
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    uniqueLanguages: 0,
    uniqueTopics: 0
  })

  const fetchRepositories = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/github?username=${username}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch repositories')
      }
      
      const data: Repository[] = await response.json()
      setRepositories(data)
      
      // Categorize repositories
      const categorization = categorizeRepositories(data)
      setCategories({
        byLanguage: categorization.byLanguage.map(cat => ({ name: cat.name, count: cat.count })),
        byTopic: categorization.byTopic.map(cat => ({ name: cat.name, count: cat.count })),
        allLanguages: ['All', ...categorization.allLanguages],
        allTopics: ['All', ...categorization.allTopics]
      })
      
      // Get stats
      const repositoryStats = getRepositoryStats(data)
      setStats({
        totalRepos: repositoryStats.totalRepos,
        totalStars: repositoryStats.totalStars,
        totalForks: repositoryStats.totalForks,
        uniqueLanguages: repositoryStats.uniqueLanguages,
        uniqueTopics: repositoryStats.uniqueTopics
      })
      
      // Apply current filters
      applyFilters(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = (repos: Repository[] = repositories) => {
    const filtered = filterRepositories(repos, {
      search: searchTerm,
      language: selectedLanguage !== 'All' ? selectedLanguage : undefined,
      topic: selectedTopic !== 'All' ? selectedTopic : undefined,
      size: selectedSize !== 'All' ? selectedSize as any : undefined,
      popularity: selectedPopularity !== 'All' ? selectedPopularity as any : undefined
    })
    setFilteredRepositories(filtered)
  }

  const handleUsernameSubmit = () => {
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim())
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedLanguage('All')
    setSelectedTopic('All')
    setSelectedSize('All')
    setSelectedPopularity('All')
  }

  useEffect(() => {
    fetchRepositories()
  }, [username])

  useEffect(() => {
    applyFilters()
  }, [searchTerm, selectedLanguage, selectedTopic, selectedSize, selectedPopularity, repositories])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Github className="h-12 w-12 text-white mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              GitHub Repository Dashboard
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore and analyze GitHub repositories with advanced filtering, categorization, and insights.
          </p>
          
          {/* Username Input */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter GitHub username..."
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit()}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20"
              />
              <Button 
                onClick={handleUsernameSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Currently viewing: <span className="font-semibold text-white">{username}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {!loading && !error && (
        <section className="py-12 px-4 bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{stats.totalRepos}</div>
                  <div className="text-sm text-gray-600">Total Repos</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold text-gray-900">{stats.totalStars}</div>
                  <div className="text-sm text-gray-600">Total Stars</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <GitFork className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900">{stats.totalForks}</div>
                  <div className="text-sm text-gray-600">Total Forks</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Code className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-gray-900">{stats.uniqueLanguages}</div>
                  <div className="text-sm text-gray-600">Languages</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold text-gray-900">{stats.uniqueTopics}</div>
                  <div className="text-sm text-gray-600">Topics</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search repositories by name, description, topics, or languages..."
                  className="pl-12 pr-4 py-3 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {categories.allLanguages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  {categories.allTopics.slice(0, 20).map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Sizes</SelectItem>
                  <SelectItem value="small">Small (&lt;100KB)</SelectItem>
                  <SelectItem value="medium">Medium (100KB-1MB)</SelectItem>
                  <SelectItem value="large">Large (&gt;1MB)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPopularity} onValueChange={setSelectedPopularity}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Popularity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters}
                className="text-sm"
              >
                Clear Filters
              </Button>

              <Button 
                variant="outline" 
                size="sm"
                onClick={fetchRepositories}
                disabled={loading}
                className="text-sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <Alert className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}. Please check the username and try again.
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Repository Grid */}
          {!loading && !error && (
            <>
              {filteredRepositories.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No repositories found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Repositories ({filteredRepositories.length})
                    </h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRepositories.map((repository) => (
                      <RepositoryCard key={repository.id} repository={repository} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}