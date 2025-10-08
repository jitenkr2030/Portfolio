'use client'

import { useState, useEffect } from 'react'
import { PricingResult, TimelineResult, FormData, AIRecommendation, OptimizationSuggestion } from '@/types/calculator'
import { calculatePricing, calculateTimeline, getAllFeatures } from '@/utils/pricing'

export const usePricingEngine = (formData: FormData) => {
  const [pricing, setPricing] = useState<PricingResult | null>(null)
  const [timeline, setTimeline] = useState<TimelineResult | null>(null)
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [optimizations, setOptimizations] = useState<OptimizationSuggestion[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    if (formData.projectType && formData.features.length > 0) {
      calculateEstimate()
    }
  }, [formData])

  const calculateEstimate = async () => {
    setIsCalculating(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const pricingResult = calculatePricing(formData)
      const timelineResult = calculateTimeline(formData)
      
      setPricing(pricingResult)
      setTimeline(timelineResult)
      
      // Generate AI recommendations
      const aiRecommendations = generateRecommendations(formData)
      setRecommendations(aiRecommendations)
      
      // Generate optimization suggestions
      const optimizationSuggestions = generateOptimizations(formData, pricingResult)
      setOptimizations(optimizationSuggestions)
    } catch (error) {
      console.error('Error calculating estimate:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const generateRecommendations = (formData: FormData): AIRecommendation[] => {
    const recommendations: AIRecommendation[] = []
    const allFeatures = getAllFeatures()
    
    // Analyze current features and suggest improvements
    const selectedFeatures = allFeatures.filter(f => formData.features.includes(f.id))
    
    // Recommend PWA if not selected and project is web app
    if (!formData.features.includes('progressive-web-app') && 
        (formData.projectType === 'web-application' || formData.projectType === 'ecommerce-platform')) {
      recommendations.push({
        type: 'feature',
        title: 'Add Progressive Web App',
        description: 'Based on your project type, PWA will improve user experience and engagement',
        impact: {
          cost: 1200,
          time: 2,
          quality: 0.8
        },
        confidence: 0.85,
        reasoning: 'Mobile-first approach with offline capabilities and app-like experience'
      })
    }
    
    // Recommend user authentication if not selected and project is not simple website
    if (!formData.features.includes('user-authentication') && 
        formData.projectType !== 'simple-website') {
      recommendations.push({
        type: 'feature',
        title: 'Add User Authentication',
        description: 'Secure user management is essential for most web applications',
        impact: {
          cost: 1500,
          time: 2,
          quality: 0.9
        },
        confidence: 0.95,
        reasoning: 'Security and user management are fundamental requirements'
      })
    }
    
    // Recommend premium design if current is basic and project is important
    if (formData.designComplexity === 'basic' && 
        (formData.projectType === 'ecommerce-platform' || formData.projectType === 'saas-platform')) {
      recommendations.push({
        type: 'design',
        title: 'Upgrade to Premium Design',
        description: 'Premium design will significantly improve user engagement and conversion rates',
        impact: {
          cost: 2500,
          time: 3,
          quality: 0.9
        },
        confidence: 0.8,
        reasoning: 'Higher design quality leads to better user experience and business results'
      })
    }
    
    // Recommend analytics dashboard if not selected and project is SaaS
    if (!formData.features.includes('analytics-dashboard') && 
        formData.projectType === 'saas-platform') {
      recommendations.push({
        type: 'feature',
        title: 'Add Analytics Dashboard',
        description: 'Data insights are crucial for SaaS platform success',
        impact: {
          cost: 2000,
          time: 2,
          quality: 0.85
        },
        confidence: 0.9,
        reasoning: 'Analytics provide valuable insights for business decisions'
      })
    }
    
    return recommendations
  }

  const generateOptimizations = (formData: FormData, pricing: PricingResult): OptimizationSuggestion[] => {
    const optimizations: OptimizationSuggestion[] = []
    
    // Suggest reducing design complexity if premium
    if (formData.designComplexity === 'premium') {
      optimizations.push({
        area: 'Design Complexity',
        current: 'Premium',
        suggested: 'Custom',
        savings: pricing.design * 0.25, // 25% savings
        tradeoffs: ['Fewer animations', 'Simpler interactions', 'Reduced visual effects']
      })
    }
    
    // Suggest extending timeline if urgent
    if (formData.timeline.urgency === 'super-urgent') {
      const normalPricing = calculatePricing({
        ...formData,
        timeline: { ...formData.timeline, urgency: 'normal' }
      })
      const savings = pricing.total - normalPricing.total
      
      optimizations.push({
        area: 'Timeline Urgency',
        current: 'Super Urgent',
        suggested: 'Normal',
        savings: savings,
        tradeoffs: ['Longer development time', 'Better quality assurance', 'Reduced stress']
      })
    }
    
    // Suggest removing expensive features
    const expensiveFeatures = formData.features.filter(featureId => {
      const feature = getAllFeatures().find(f => f.id === featureId)
      return feature && feature.costImpact > 0.5
    })
    
    if (expensiveFeatures.length > 0) {
      const feature = getAllFeatures().find(f => f.id === expensiveFeatures[0])
      if (feature) {
        optimizations.push({
          area: 'Feature Selection',
          current: feature.name,
          suggested: 'Remove or simplify',
          savings: pricing.total * 0.1, // 10% savings
          tradeoffs: ['Reduced functionality', 'Faster development', 'Lower maintenance']
        })
      }
    }
    
    return optimizations
  }

  const getEstimatedRange = () => {
    if (!pricing) return { min: 0, max: 0, avg: 0 }
    
    const variance = pricing.total * 0.2 // 20% variance
    return {
      min: Math.round(pricing.total - variance),
      max: Math.round(pricing.total + variance),
      avg: Math.round(pricing.total)
    }
  }

  const getTimelineRange = () => {
    if (!timeline) return { min: 0, max: 0, avg: 0 }
    
    const variance = Math.ceil(timeline.total * 0.15) // 15% variance
    return {
      min: Math.max(1, timeline.total - variance),
      max: timeline.total + variance,
      avg: timeline.total
    }
  }

  return {
    pricing,
    timeline,
    recommendations,
    optimizations,
    isCalculating,
    calculateEstimate,
    getEstimatedRange,
    getTimelineRange
  }
}