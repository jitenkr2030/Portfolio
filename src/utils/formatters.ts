import { PricingResult, TimelineResult } from '@/types/calculator'
import { getFeatureById } from './pricing'

// Currency formatting
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Format currency with compact notation for large numbers
export function formatCompactCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`
  }
  return formatCurrency(amount)
}

// Format duration in weeks
export function formatDuration(weeks: number): string {
  if (weeks === 1) {
    return '1 week'
  } else if (weeks < 4) {
    return `${weeks} weeks`
  } else if (weeks === 4) {
    return '1 month'
  } else {
    const months = Math.floor(weeks / 4)
    const remainingWeeks = weeks % 4
    if (remainingWeeks === 0) {
      return `${months} month${months > 1 ? 's' : ''}`
    } else {
      return `${months} month${months > 1 ? 's' : ''} ${remainingWeeks} week${remainingWeeks > 1 ? 's' : ''}`
    }
  }
}

// Format percentage
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Format file size
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 Bytes'
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

// Format phone number
export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phoneNumber
}

// Format complexity level
export function formatComplexity(complexity: string): string {
  const complexityMap: Record<string, string> = {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High',
    'basic': 'Basic',
    'custom': 'Custom',
    'premium': 'Premium',
    'enterprise': 'Enterprise'
  }
  
  return complexityMap[complexity] || complexity
}

// Format project type
export function formatProjectType(projectType: string): string {
  const typeMap: Record<string, string> = {
    'simple-website': 'Simple Website',
    'web-application': 'Web Application',
    'ecommerce-platform': 'E-commerce Platform',
    'saas-platform': 'SaaS Platform',
    'enterprise-solution': 'Enterprise Solution'
  }
  
  return typeMap[projectType] || projectType
}

// Format timeline urgency
export function formatUrgency(urgency: string): string {
  const urgencyMap: Record<string, string> = {
    'normal': 'Normal',
    'urgent': 'Urgent',
    'super-urgent': 'Super Urgent'
  }
  
  return urgencyMap[urgency] || urgency
}

// Format support level
export function formatSupport(support: string): string {
  const supportMap: Record<string, string> = {
    'basic': 'Basic Support',
    'standard': 'Standard Support',
    'premium': 'Premium Support',
    'enterprise': 'Enterprise Support'
  }
  
  return supportMap[support] || support
}

// Format pricing breakdown for display
export function formatPricingBreakdown(pricing: PricingResult): Array<{
  category: string
  amount: string
  percentage: string
  color: string
}> {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500'
  ]
  
  return pricing.breakdown.map((item, index) => ({
    category: item.category,
    amount: formatCurrency(item.amount),
    percentage: formatPercentage(item.percentage),
    color: colors[index] || 'bg-gray-500'
  }))
}

// Format timeline phases for display
export function formatTimelinePhases(timeline: TimelineResult): Array<{
  name: string
  duration: string
  description: string
  progress: number
}> {
  const totalDuration = timeline.total
  return timeline.phases.map(phase => ({
    name: phase.name,
    duration: `${phase.duration} week${phase.duration > 1 ? 's' : ''}`,
    description: phase.description,
    progress: (phase.duration / totalDuration) * 100
  }))
}

// Format feature list with impact indicators
export function formatFeatureImpact(features: string[]): Array<{
  id: string
  name: string
  costImpact: string
  timeImpact: string
  complexity: string
}> {
  return features.map(featureId => {
    const feature = getFeatureById(featureId)
    if (!feature) return null
    
    return {
      id: feature.id,
      name: feature.name,
      costImpact: `+${formatPercentage(feature.costImpact * 100)}`,
      timeImpact: `+${feature.timeImpact} week${feature.timeImpact > 1 ? 's' : ''}`,
      complexity: formatComplexity(feature.complexity)
    }
  }).filter(Boolean)
}

// Format number with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

// Format time ago
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  let interval = seconds / 31536000
  if (interval > 1) {
    return Math.floor(interval) + ' year' + (Math.floor(interval) > 1 ? 's' : '') + ' ago'
  }
  
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' month' + (Math.floor(interval) > 1 ? 's' : '') + ' ago'
  }
  
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' day' + (Math.floor(interval) > 1 ? 's' : '') + ' ago'
  }
  
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hour' + (Math.floor(interval) > 1 ? 's' : '') + ' ago'
  }
  
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minute' + (Math.floor(interval) > 1 ? 's' : '') + ' ago'
  }
  
  return Math.floor(seconds) + ' second' + (Math.floor(seconds) > 1 ? 's' : '') + ' ago'
}

// Format file type
export function formatFileType(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase() || ''
  const typeMap: Record<string, string> = {
    'pdf': 'PDF Document',
    'doc': 'Word Document',
    'docx': 'Word Document',
    'xls': 'Excel Spreadsheet',
    'xlsx': 'Excel Spreadsheet',
    'ppt': 'PowerPoint Presentation',
    'pptx': 'PowerPoint Presentation',
    'jpg': 'JPEG Image',
    'jpeg': 'JPEG Image',
    'png': 'PNG Image',
    'gif': 'GIF Image',
    'svg': 'SVG Image',
    'mp4': 'MP4 Video',
    'avi': 'AVI Video',
    'mov': 'MOV Video',
    'mp3': 'MP3 Audio',
    'wav': 'WAV Audio',
    'zip': 'ZIP Archive',
    'rar': 'RAR Archive'
  }
  
  return typeMap[extension] || `${extension.toUpperCase()} File`
}