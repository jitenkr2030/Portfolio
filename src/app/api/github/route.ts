import { NextRequest, NextResponse } from 'next/server'

interface GitHubRepo {
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
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username') || 'jitenkr2030'
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('per_page') || '100')

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated&direction=desc`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-GitHub-Dashboard'
        }
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'GitHub API rate limit exceeded' },
          { status: 403 }
        )
      }
      throw new Error('Failed to fetch repositories')
    }

    const repos: GitHubRepo[] = await response.json()

    // Get languages for each repository
    const reposWithLanguages = await Promise.all(
      repos.map(async (repo) => {
        try {
          const langResponse = await fetch(
            `https://api.github.com/repos/${repo.full_name}/languages`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-GitHub-Dashboard'
              }
            }
          )
          
          if (langResponse.ok) {
            const languages = await langResponse.json()
            return {
              ...repo,
              languages: languages
            }
          }
          return {
            ...repo,
            languages: {}
          }
        } catch (error) {
          return {
            ...repo,
            languages: {}
          }
        }
      })
    )

    return NextResponse.json(reposWithLanguages)
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}