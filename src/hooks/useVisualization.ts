'use client'

import { useState, useEffect, useRef } from 'react'
import { PricingResult, TimelineResult } from '@/types/calculator'
import { getAllFeatures } from '@/utils/pricing'

interface UseVisualizationProps {
  pricing: PricingResult | null
  timeline: TimelineResult | null
}

export const useVisualization = ({ pricing, timeline }: UseVisualizationProps) => {
  const [chartData, setChartData] = useState<any[]>([])
  const [timelineData, setTimelineData] = useState<any[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (pricing) {
      updateChartData()
    }
  }, [pricing])

  useEffect(() => {
    if (timeline) {
      updateTimelineData()
    }
  }, [timeline])

  const updateChartData = () => {
    if (!pricing) return

    setIsAnimating(true)
    
    const data = pricing.breakdown.map((item, index) => ({
      name: item.category,
      value: item.amount,
      percentage: item.percentage,
      color: getChartColor(index),
      animatedValue: 0
    }))

    setChartData(data)

    // Animate chart values
    let startTime: number
    const duration = 1000 // 1 second animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const updatedData = data.map(item => ({
        ...item,
        animatedValue: item.value * progress
      }))
      
      setChartData(updatedData)
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const updateTimelineData = () => {
    if (!timeline) return

    const data = timeline.phases.map((phase, index) => ({
      name: phase.name,
      duration: phase.duration,
      description: phase.description,
      progress: (phase.duration / timeline.total) * 100,
      color: getTimelineColor(index),
      startWeek: timeline.phases.slice(0, index).reduce((sum, p) => sum + p.duration, 0),
      endWeek: timeline.phases.slice(0, index + 1).reduce((sum, p) => sum + p.duration, 0)
    }))

    setTimelineData(data)
  }

  const getChartColor = (index: number): string => {
    const colors = [
      '#3B82F6', // blue-500
      '#10B981', // green-500
      '#F59E0B', // yellow-500
      '#8B5CF6', // purple-500
      '#EC4899'  // pink-500
    ]
    return colors[index % colors.length]
  }

  const getTimelineColor = (index: number): string => {
    const colors = [
      '#EF4444', // red-500
      '#F59E0B', // yellow-500
      '#10B981', // green-500
      '#3B82F6', // blue-500
      '#8B5CF6'  // purple-500
    ]
    return colors[index % colors.length]
  }

  const getFeatureImpactData = (features: string[]) => {
    const allFeatures = getAllFeatures()
    
    return features.map(featureId => {
      const feature = allFeatures.find(f => f.id === featureId)
      return {
        id: featureId,
        name: feature?.name || 'Unknown Feature',
        costImpact: feature?.costImpact || 0,
        timeImpact: feature?.timeImpact || 0,
        complexity: feature?.complexity || 'medium'
      }
    }).filter(Boolean)
  }

  const getComparisonData = (currentPricing: PricingResult, suggestedPricing: PricingResult) => {
    return [
      {
        category: 'Development',
        current: currentPricing.development,
        suggested: suggestedPricing.development,
        savings: currentPricing.development - suggestedPricing.development
      },
      {
        category: 'Design',
        current: currentPricing.design,
        suggested: suggestedPricing.design,
        savings: currentPricing.design - suggestedPricing.design
      },
      {
        category: 'Testing',
        current: currentPricing.testing,
        suggested: suggestedPricing.testing,
        savings: currentPricing.testing - suggestedPricing.testing
      },
      {
        category: 'Deployment',
        current: currentPricing.deployment,
        suggested: suggestedPricing.deployment,
        savings: currentPricing.deployment - suggestedPricing.deployment
      },
      {
        category: 'Support',
        current: currentPricing.support,
        suggested: suggestedPricing.support,
        savings: currentPricing.support - suggestedPricing.support
      }
    ]
  }

  const generateChartData = (data: any[], type: 'pie' | 'bar' | 'line' = 'pie') => {
    switch (type) {
      case 'pie':
        return {
          labels: data.map(item => item.name),
          datasets: [{
            data: data.map(item => item.animatedValue || item.value),
            backgroundColor: data.map((_, index) => getChartColor(index)),
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        }
      
      case 'bar':
        return {
          labels: data.map(item => item.name),
          datasets: [{
            label: 'Amount ($)',
            data: data.map(item => item.animatedValue || item.value),
            backgroundColor: data.map((_, index) => getChartColor(index)),
            borderRadius: 8,
            borderSkipped: false
          }]
        }
      
      case 'line':
        return {
          labels: data.map(item => item.name),
          datasets: [{
            label: 'Trend',
            data: data.map(item => item.animatedValue || item.value),
            borderColor: getChartColor(0),
            backgroundColor: `${getChartColor(0)}20`,
            fill: true,
            tension: 0.4
          }]
        }
      
      default:
        return { labels: [], datasets: [] }
    }
  }

  const generateTimelineData = () => {
    if (!timelineData.length) return { labels: [], datasets: [] }

    return {
      labels: timelineData.map(item => item.name),
      datasets: [{
        label: 'Duration (weeks)',
        data: timelineData.map(item => item.duration),
        backgroundColor: timelineData.map((_, index) => getTimelineColor(index)),
        borderRadius: 8,
        borderSkipped: false
      }]
    }
  }

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    chartData,
    timelineData,
    isAnimating,
    getFeatureImpactData,
    getComparisonData,
    generateChartData,
    generateTimelineData,
    updateChartData,
    updateTimelineData
  }
}