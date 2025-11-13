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

interface Category {
  name: string
  repositories: Repository[]
  count: number
}

interface CategorizationResult {
  byLanguage: Category[]
  byTopic: Category[]
  bySize: {
    small: Repository[]
    medium: Repository[]
    large: Repository[]
  }
  byPopularity: {
    popular: Repository[]
    moderate: Repository[]
    new: Repository[]
  }
  allLanguages: string[]
  allTopics: string[]
}

export function categorizeRepositories(repositories: Repository[]): CategorizationResult {
  // Group by primary language
  const languageMap = new Map<string, Repository[]>()
  const allLanguages = new Set<string>()

  repositories.forEach(repo => {
    const language = repo.language || 'Other'
    allLanguages.add(language)
    
    if (!languageMap.has(language)) {
      languageMap.set(language, [])
    }
    languageMap.get(language)?.push(repo)
  })

  const byLanguage: Category[] = Array.from(languageMap.entries())
    .map(([name, repos]) => ({
      name,
      repositories: repos,
      count: repos.length
    }))
    .sort((a, b) => b.count - a.count)

  // Group by topics
  const topicMap = new Map<string, Repository[]>()
  const allTopics = new Set<string>()

  repositories.forEach(repo => {
    repo.topics.forEach(topic => {
      allTopics.add(topic)
      
      if (!topicMap.has(topic)) {
        topicMap.set(topic, [])
      }
      topicMap.get(topic)?.push(repo)
    })
  })

  const byTopic: Category[] = Array.from(topicMap.entries())
    .map(([name, repos]) => ({
      name,
      repositories: repos,
      count: repos.length
    }))
    .sort((a, b) => b.count - a.count)

  // Group by size
  const bySize = {
    small: repositories.filter(repo => repo.size < 100),
    medium: repositories.filter(repo => repo.size >= 100 && repo.size < 1000),
    large: repositories.filter(repo => repo.size >= 1000)
  }

  // Group by popularity (stars and forks)
  const byPopularity = {
    popular: repositories.filter(repo => repo.stargazers_count > 10 || repo.forks_count > 5),
    moderate: repositories.filter(repo => 
      (repo.stargazers_count > 0 && repo.stargazers_count <= 10) || 
      (repo.forks_count > 0 && repo.forks_count <= 5)
    ),
    new: repositories.filter(repo => repo.stargazers_count === 0 && repo.forks_count === 0)
  }

  return {
    byLanguage,
    byTopic,
    bySize,
    byPopularity,
    allLanguages: Array.from(allLanguages).sort(),
    allTopics: Array.from(allTopics).sort()
  }
}

export function filterRepositories(
  repositories: Repository[],
  filters: {
    search?: string
    language?: string
    topic?: string
    size?: 'small' | 'medium' | 'large'
    popularity?: 'popular' | 'moderate' | 'new'
  }
): Repository[] {
  return repositories.filter(repo => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const matchesSearch = 
        repo.name.toLowerCase().includes(searchTerm) ||
        repo.description?.toLowerCase().includes(searchTerm) ||
        repo.topics.some(topic => topic.toLowerCase().includes(searchTerm)) ||
        Object.keys(repo.languages).some(lang => lang.toLowerCase().includes(searchTerm))
      
      if (!matchesSearch) return false
    }

    // Language filter
    if (filters.language && filters.language !== 'All') {
      if (repo.language !== filters.language) return false
    }

    // Topic filter
    if (filters.topic && filters.topic !== 'All') {
      if (!repo.topics.includes(filters.topic)) return false
    }

    // Size filter
    if (filters.size) {
      const size = repo.size
      switch (filters.size) {
        case 'small':
          if (size >= 100) return false
          break
        case 'medium':
          if (size < 100 || size >= 1000) return false
          break
        case 'large':
          if (size < 1000) return false
          break
      }
    }

    // Popularity filter
    if (filters.popularity) {
      const stars = repo.stargazers_count
      const forks = repo.forks_count
      
      switch (filters.popularity) {
        case 'popular':
          if (!(stars > 10 || forks > 5)) return false
          break
        case 'moderate':
          if (!((stars > 0 && stars <= 10) || (forks > 0 && forks <= 5))) return false
          break
        case 'new':
          if (!(stars === 0 && forks === 0)) return false
          break
      }
    }

    return true
  })
}

export function getRepositoryStats(repositories: Repository[]) {
  const totalRepos = repositories.length
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0)
  const totalSize = repositories.reduce((sum, repo) => sum + repo.size, 0)
  
  const languages = new Set(repositories.map(repo => repo.language).filter(Boolean))
  const topics = new Set(repositories.flatMap(repo => repo.topics))
  
  const mostPopularRepo = repositories.reduce((prev, current) => 
    (prev.stargazers_count > current.stargazers_count) ? prev : current
  )
  
  const mostForkedRepo = repositories.reduce((prev, current) => 
    (prev.forks_count > current.forks_count) ? prev : current
  )

  const recentlyUpdated = repositories
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5)

  return {
    totalRepos,
    totalStars,
    totalForks,
    totalSize,
    uniqueLanguages: languages.size,
    uniqueTopics: topics.size,
    mostPopularRepo,
    mostForkedRepo,
    recentlyUpdated
  }
}