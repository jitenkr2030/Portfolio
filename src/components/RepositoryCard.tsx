'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ExternalLink, 
  Github, 
  Star, 
  GitFork, 
  Calendar,
  Code,
  Users
} from 'lucide-react'

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

interface RepositoryCardProps {
  repository: Repository
}

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-400',
      'TypeScript': 'bg-blue-600',
      'Python': 'bg-green-500',
      'Java': 'bg-red-600',
      'C++': 'bg-purple-600',
      'C#': 'bg-purple-500',
      'PHP': 'bg-indigo-600',
      'Ruby': 'bg-red-500',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-600',
      'Swift': 'bg-orange-500',
      'Kotlin': 'bg-purple-700',
      'Dart': 'bg-blue-500',
      'Shell': 'bg-gray-600',
      'HTML': 'bg-orange-400',
      'CSS': 'bg-blue-400',
      'Vue': 'bg-green-600',
      'Angular': 'bg-red-700',
      'Svelte': 'bg-orange-600',
      'Next.js': 'bg-black',
      'React': 'bg-cyan-400',
      'Node.js': 'bg-green-600',
    }
    return colors[language || ''] || 'bg-gray-500'
  }

  const topLanguages = Object.entries(repository.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold hover:text-blue-600 cursor-pointer transition-colors mb-2">
              {repository.name}
            </CardTitle>
            {repository.description && (
              <CardDescription className="text-sm text-gray-600 line-clamp-2">
                {repository.description}
              </CardDescription>
            )}
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              className="p-2"
              asChild
            >
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        
        {/* Topics */}
        {repository.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {repository.topics.slice(0, 3).map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {topic}
              </Badge>
            ))}
            {repository.topics.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs"
              >
                +{repository.topics.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Languages */}
        <div className="space-y-3">
          {repository.language && (
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getLanguageColor(repository.language)}`} />
              <span className="text-sm font-medium text-gray-700">
                {repository.language}
              </span>
            </div>
          )}

          {/* Top Languages by bytes */}
          {topLanguages.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium">Top Languages:</p>
              <div className="flex flex-wrap gap-1">
                {topLanguages.map(([lang, bytes]) => (
                  <Badge
                    key={lang}
                    variant="outline"
                    className="text-xs"
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>{repository.stargazers_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitFork className="h-4 w-4" />
                <span>{repository.forks_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Code className="h-4 w-4" />
                <span>{repository.size} KB</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">
                {formatDate(repository.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}