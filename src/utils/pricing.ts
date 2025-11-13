import { PricingEngine, FormData, PricingResult, TimelineResult, Feature } from '@/types/calculator'

// Base pricing structure
export const BASE_RATES: PricingEngine['baseRates'] = {
  'simple-website': { min: 160000, max: 640000, avg: 400000 },
  'web-application': { min: 640000, max: 2000000, avg: 1320000 },
  'ecommerce-platform': { min: 1200000, max: 4000000, avg: 2600000 },
  'saas-platform': { min: 2000000, max: 8000000, avg: 5000000 },
  'enterprise-solution': { min: 4000000, max: 16000000, avg: 10000000 }
}

// Feature complexity multipliers
export const FEATURE_MULTIPLIERS: PricingEngine['featureMultipliers'] = {
  // Frontend Features
  'responsive-design': 1.2,
  'progressive-web-app': 1.4,
  'real-time-updates': 1.6,
  'multi-language': 1.3,
  'dark-mode': 1.1,
  
  // Backend Features
  'user-authentication': 1.3,
  'payment-processing': 1.5,
  'database-integration': 1.4,
  'api-development': 1.6,
  'file-upload': 1.2,
  'content-management': 1.4,
  'email-notifications': 1.2,
  'search-functionality': 1.3,
  
  // Advanced Features
  'ai-integration': 2.0,
  'machine-learning': 2.5,
  'blockchain': 2.2,
  'ar-vr': 2.8,
  'iot-integration': 2.3,
  'analytics-dashboard': 1.4,
  'third-party-integrations': 1.5
}

// Design complexity factors
export const DESIGN_COMPLEXITY: PricingEngine['designComplexity'] = {
  'basic': { multiplier: 1.0, description: 'Template-based, minimal custom design' },
  'custom': { multiplier: 1.5, description: 'Custom design with brand guidelines' },
  'premium': { multiplier: 2.0, description: 'Advanced animations, micro-interactions' },
  'enterprise': { multiplier: 2.5, description: 'Multiple themes, design system' }
}

// Technical stack adjustments
export const TECHNICAL_FACTORS: PricingEngine['technicalFactors'] = {
  'frontend': {
    'react': 1.0,
    'nextjs': 1.1,
    'vue': 1.0,
    'angular': 1.2,
    'svelte': 0.9
  },
  'backend': {
    'nodejs': 1.0,
    'python': 1.1,
    'ruby': 1.0,
    'php': 0.9,
    'java': 1.3
  },
  'database': {
    'postgresql': 1.0,
    'mongodb': 1.1,
    'mysql': 0.9,
    'redis': 1.2
  }
}

// Timeline adjustments
export const TIMELINE_ADJUSTMENTS: PricingEngine['timelineAdjustments'] = {
  'normal': 1.0,
  'urgent': 1.3,
  'super-urgent': 1.6
}

// Feature definitions
export const FEATURES: Feature[] = [
  // Frontend Features
  {
    id: 'responsive-design',
    name: 'Responsive Design',
    category: 'Frontend',
    description: 'Mobile-friendly design that works on all devices',
    costImpact: 0.2,
    timeImpact: 1,
    complexity: 'low'
  },
  {
    id: 'progressive-web-app',
    name: 'Progressive Web App',
    category: 'Frontend',
    description: 'Installable app with offline capabilities',
    costImpact: 0.4,
    timeImpact: 2,
    complexity: 'medium'
  },
  {
    id: 'real-time-updates',
    name: 'Real-time Updates',
    category: 'Frontend',
    description: 'Live data updates using WebSockets',
    costImpact: 0.6,
    timeImpact: 3,
    complexity: 'high'
  },
  {
    id: 'multi-language',
    name: 'Multi-language Support',
    category: 'Frontend',
    description: 'Support for multiple languages',
    costImpact: 0.3,
    timeImpact: 2,
    complexity: 'medium'
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    category: 'Frontend',
    description: 'Dark theme option for users',
    costImpact: 0.1,
    timeImpact: 1,
    complexity: 'low'
  },
  
  // Backend Features
  {
    id: 'user-authentication',
    name: 'User Authentication',
    category: 'Backend',
    description: 'Secure user login and registration',
    costImpact: 0.3,
    timeImpact: 2,
    complexity: 'medium'
  },
  {
    id: 'payment-processing',
    name: 'Payment Processing',
    category: 'Backend',
    description: 'Integration with payment gateways',
    costImpact: 0.5,
    timeImpact: 3,
    complexity: 'high'
  },
  {
    id: 'database-integration',
    name: 'Database Integration',
    category: 'Backend',
    description: 'Custom database setup and integration',
    costImpact: 0.4,
    timeImpact: 2,
    complexity: 'medium'
  },
  {
    id: 'api-development',
    name: 'API Development',
    category: 'Backend',
    description: 'RESTful or GraphQL API development',
    costImpact: 0.6,
    timeImpact: 3,
    complexity: 'high'
  },
  {
    id: 'file-upload',
    name: 'File Upload',
    category: 'Backend',
    description: 'Secure file upload and storage',
    costImpact: 0.2,
    timeImpact: 1,
    complexity: 'low'
  },
  {
    id: 'content-management',
    name: 'Content Management',
    category: 'Backend',
    description: 'CMS for managing website content',
    costImpact: 0.4,
    timeImpact: 2,
    complexity: 'medium'
  },
  {
    id: 'email-notifications',
    name: 'Email Notifications',
    category: 'Backend',
    description: 'Automated email system',
    costImpact: 0.2,
    timeImpact: 1,
    complexity: 'low'
  },
  {
    id: 'search-functionality',
    name: 'Search Functionality',
    category: 'Backend',
    description: 'Advanced search capabilities',
    costImpact: 0.3,
    timeImpact: 2,
    complexity: 'medium'
  },
  
  // Advanced Features
  {
    id: 'ai-integration',
    name: 'AI Integration',
    category: 'Advanced',
    description: 'Artificial intelligence features',
    costImpact: 1.0,
    timeImpact: 4,
    complexity: 'high'
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'Advanced',
    description: 'ML models and predictions',
    costImpact: 1.5,
    timeImpact: 6,
    complexity: 'high'
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    category: 'Advanced',
    description: 'Blockchain technology integration',
    costImpact: 1.2,
    timeImpact: 5,
    complexity: 'high'
  },
  {
    id: 'ar-vr',
    name: 'AR/VR Features',
    category: 'Advanced',
    description: 'Augmented/Virtual Reality',
    costImpact: 1.8,
    timeImpact: 8,
    complexity: 'high'
  },
  {
    id: 'iot-integration',
    name: 'IoT Integration',
    category: 'Advanced',
    description: 'Internet of Things connectivity',
    costImpact: 1.3,
    timeImpact: 5,
    complexity: 'high'
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    category: 'Advanced',
    description: 'Data visualization and reporting',
    costImpact: 0.4,
    timeImpact: 2,
    complexity: 'medium'
  },
  {
    id: 'third-party-integrations',
    name: 'Third-party Integrations',
    category: 'Advanced',
    description: 'External service connections',
    costImpact: 0.5,
    timeImpact: 3,
    complexity: 'medium'
  }
]

// Calculate pricing based on form data
export function calculatePricing(formData: FormData): PricingResult {
  const baseRate = BASE_RATES[formData.projectType] || BASE_RATES['web-application']
  let basePrice = baseRate.avg
  
  // Apply feature multipliers
  let featureMultiplier = 1
  formData.features.forEach(featureId => {
    const multiplier = FEATURE_MULTIPLIERS[featureId]
    if (multiplier) {
      featureMultiplier += (multiplier - 1) * 0.5 // Reduce impact to prevent exponential growth
    }
  })
  
  // Apply design complexity
  const designMultiplier = DESIGN_COMPLEXITY[formData.designComplexity]?.multiplier || 1.0
  
  // Apply technical stack adjustments
  const frontendFactor = TECHNICAL_FACTORS.frontend[formData.technicalStack.frontend] || 1.0
  const backendFactor = TECHNICAL_FACTORS.backend[formData.technicalStack.backend] || 1.0
  const databaseFactor = TECHNICAL_FACTORS.database[formData.technicalStack.database] || 1.0
  const technicalMultiplier = (frontendFactor + backendFactor + databaseFactor) / 3
  
  // Apply timeline adjustments
  const timelineMultiplier = TIMELINE_ADJUSTMENTS[formData.timeline.urgency] || 1.0
  
  // Calculate final price
  const totalPrice = basePrice * featureMultiplier * designMultiplier * technicalMultiplier * timelineMultiplier
  
  // Create breakdown
  const developmentCost = totalPrice * 0.6
  const designCost = totalPrice * 0.25
  const testingCost = totalPrice * 0.1
  const deploymentCost = totalPrice * 0.03
  const supportCost = totalPrice * 0.02
  
  const breakdown = [
    { category: 'Development', amount: developmentCost, percentage: 60 },
    { category: 'Design', amount: designCost, percentage: 25 },
    { category: 'Testing', amount: testingCost, percentage: 10 },
    { category: 'Deployment', amount: deploymentCost, percentage: 3 },
    { category: 'Support', amount: supportCost, percentage: 2 }
  ]
  
  return {
    development: developmentCost,
    design: designCost,
    testing: testingCost,
    deployment: deploymentCost,
    support: supportCost,
    total: totalPrice,
    breakdown
  }
}

// Calculate timeline based on form data
export function calculateTimeline(formData: FormData): TimelineResult {
  const baseTimeline = {
    'simple-website': 4,
    'web-application': 8,
    'ecommerce-platform': 12,
    'saas-platform': 16,
    'enterprise-solution': 24
  }
  
  let totalWeeks = baseTimeline[formData.projectType] || 8
  
  // Adjust for features
  const featureCount = formData.features.length
  totalWeeks += featureCount * 0.5
  
  // Adjust for design complexity
  const designAdjustment = {
    'basic': 0,
    'custom': 2,
    'premium': 4,
    'enterprise': 6
  }
  totalWeeks += designAdjustment[formData.designComplexity] || 0
  
  // Adjust for timeline urgency
  if (formData.timeline.urgency === 'urgent') {
    totalWeeks = Math.max(2, totalWeeks * 0.8)
  } else if (formData.timeline.urgency === 'super-urgent') {
    totalWeeks = Math.max(1, totalWeeks * 0.6)
  }
  
  // Create phases
  const planningWeeks = Math.max(1, Math.round(totalWeeks * 0.15))
  const designWeeks = Math.max(1, Math.round(totalWeeks * 0.25))
  const developmentWeeks = Math.max(2, Math.round(totalWeeks * 0.45))
  const testingWeeks = Math.max(1, Math.round(totalWeeks * 0.1))
  const deploymentWeeks = Math.max(1, Math.round(totalWeeks * 0.05))
  
  const phases = [
    { name: 'Planning', duration: planningWeeks, description: 'Requirements gathering and project planning' },
    { name: 'Design', duration: designWeeks, description: 'UI/UX design and prototyping' },
    { name: 'Development', duration: developmentWeeks, description: 'Core development and implementation' },
    { name: 'Testing', duration: testingWeeks, description: 'Quality assurance and bug fixing' },
    { name: 'Deployment', duration: deploymentWeeks, description: 'Launch and deployment' }
  ]
  
  return {
    planning: planningWeeks,
    design: designWeeks,
    development: developmentWeeks,
    testing: testingWeeks,
    deployment: deploymentWeeks,
    total: Math.round(totalWeeks),
    phases
  }
}

// Get features by category
export function getFeaturesByCategory(category: string): Feature[] {
  return FEATURES.filter(feature => feature.category === category)
}

// Get all features
export function getAllFeatures(): Feature[] {
  return FEATURES
}

// Get feature by ID
export function getFeatureById(id: string): Feature | undefined {
  return FEATURES.find(feature => feature.id === id)
}