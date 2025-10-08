'use client'

import React from 'react'
import { TimelineResult } from '@/types/calculator'
import { formatDuration, formatTimelinePhases } from '@/utils/formatters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Calendar, 
  Clock, 
  Flag, 
  Play, 
  CheckCircle,
  GanttChart,
  History
} from 'lucide-react'

interface TimelineVisualizerProps {
  timeline: TimelineResult
  showDetails?: boolean
}

export function TimelineVisualizer({ timeline, showDetails = true }: TimelineVisualizerProps) {
  const phases = formatTimelinePhases(timeline)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Duration</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatDuration(timeline.total)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Development</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatDuration(timeline.development)}
                </p>
              </div>
              <CodeIcon className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Design</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatDuration(timeline.design)}
                </p>
              </div>
              <PaletteIcon className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gantt Chart */}
      {showDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GanttChart className="h-5 w-5 mr-2" />
              Project Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {phases.map((phase, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded ${getPhaseColor(index)}`} />
                      <span className="font-medium">{phase.name}</span>
                      <Badge variant="outline">{phase.duration}</Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round(phase.progress)}%
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Progress 
                      value={phase.progress} 
                      className="h-3"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {phase.duration}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{phase.description}</p>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">Total Timeline</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xl text-blue-600">
                      {formatDuration(timeline.total)}
                    </span>
                    <Badge variant="secondary">Estimated</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="h-5 w-5 mr-2" />
            Timeline Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Planning Phase</h4>
              <p className="text-sm text-gray-600">
                {formatDuration(timeline.planning)} dedicated to requirements gathering, research, and project planning.
              </p>
              <Badge variant="secondary">Foundation</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Design Phase</h4>
              <p className="text-sm text-gray-600">
                {formatDuration(timeline.design)} for UI/UX design, prototyping, and user experience optimization.
              </p>
              <Badge variant="outline">Creative Process</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Development Phase</h4>
              <p className="text-sm text-gray-600">
                {formatDuration(timeline.development)} - the longest phase, focusing on core functionality and features.
              </p>
              <Badge variant="secondary">Core Work</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Testing & Deployment</h4>
              <p className="text-sm text-gray-600">
                {formatDuration(timeline.testing + timeline.deployment)} for quality assurance and successful launch.
              </p>
              <Badge variant="outline">Quality Assurance</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestone Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flag className="h-5 w-5 mr-2" />
            Key Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {generateMilestones(timeline).map((milestone, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {milestone.completed ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{milestone.title}</h4>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
                <Badge variant={milestone.completed ? 'default' : 'secondary'}>
                  {milestone.week}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getPhaseColor(index: number): string {
  const colors = [
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-purple-500'
  ]
  return colors[index % colors.length]
}

// Custom icons
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

// Generate milestones based on timeline
function generateMilestones(timeline: TimelineResult) {
  const milestones = []
  let currentWeek = 0

  // Planning milestone
  currentWeek += timeline.planning
  milestones.push({
    title: 'Project Planning Complete',
    description: 'Requirements finalized and project plan approved',
    week: `Week ${currentWeek}`,
    completed: false
  })

  // Design milestone
  currentWeek += timeline.design
  milestones.push({
    title: 'Design Phase Complete',
    description: 'UI/UX designs approved and ready for development',
    week: `Week ${currentWeek}`,
    completed: false
  })

  // Development milestone (halfway)
  currentWeek += Math.floor(timeline.development / 2)
  milestones.push({
    title: 'Development Halfway',
    description: 'Core functionality implemented',
    week: `Week ${currentWeek}`,
    completed: false
  })

  // Development complete
  currentWeek += Math.ceil(timeline.development / 2)
  milestones.push({
    title: 'Development Complete',
    description: 'All features implemented and ready for testing',
    week: `Week ${currentWeek}`,
    completed: false
  })

  // Testing complete
  currentWeek += timeline.testing
  milestones.push({
    title: 'Testing Complete',
    description: 'Quality assurance finished and bugs resolved',
    week: `Week ${currentWeek}`,
    completed: false
  })

  // Deployment milestone
  currentWeek += timeline.deployment
  milestones.push({
    title: 'Project Launch',
    description: 'Project successfully deployed and live',
    week: `Week ${currentWeek}`,
    completed: false
  })

  return milestones
}