'use client'

import React from 'react'
import { PricingResult } from '@/types/calculator'
import { formatCurrency, formatPricingBreakdown } from '@/utils/formatters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  Zap,
  PieChart,
  BarChart3
} from 'lucide-react'

interface CostBreakdownProps {
  pricing: PricingResult
  showDetails?: boolean
}

export function CostBreakdown({ pricing, showDetails = true }: CostBreakdownProps) {
  const breakdown = formatPricingBreakdown(pricing)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Development</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(pricing.development)}
                </p>
              </div>
              <CodeIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Design</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(pricing.design)}
                </p>
              </div>
              <PaletteIcon className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Testing</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(pricing.testing)}
                </p>
              </div>
              <TestIcon className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(pricing.total)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      {showDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {breakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded ${item.color}`} />
                      <span className="font-medium">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{item.amount}</span>
                      <span className="text-sm text-gray-500 ml-2">{item.percentage}</span>
                    </div>
                  </div>
                  <Progress 
                    value={parseFloat(item.percentage)} 
                    className="h-2"
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">Total Cost</span>
                  <span className="font-bold text-xl text-purple-600">
                    {formatCurrency(pricing.total)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cost Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Cost Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Development Focus</h4>
              <p className="text-sm text-gray-600">
                The majority of your budget (60%) is allocated to development, ensuring robust functionality and performance.
              </p>
              <Badge variant="secondary">High Priority</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Design Investment</h4>
              <p className="text-sm text-gray-600">
                25% of your budget is dedicated to design, creating an engaging and user-friendly interface.
              </p>
              <Badge variant="outline">Medium Priority</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Quality Assurance</h4>
              <p className="text-sm text-gray-600">
                10% allocated to testing ensures your application is reliable and bug-free.
              </p>
              <Badge variant="outline">Essential</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Deployment & Support</h4>
              <p className="text-sm text-gray-600">
                5% covers deployment and initial support to ensure a smooth launch.
              </p>
              <Badge variant="secondary">Launch Ready</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Custom icons for the cards
function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  )
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  )
}

function TestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}