'use client'

import React from 'react'
import { CalculatorField, Option } from '@/types/calculator'
import { useFormField } from '@/hooks/useCalculator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, AlertCircle } from 'lucide-react'

interface FormFieldProps {
  field: CalculatorField
  className?: string
}

export function FormField({ field, className = '' }: FormFieldProps) {
  const { value, onChange, error } = useFormField(field.name)

  const renderField = () => {
    switch (field.type) {
      case 'select':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: Option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex flex-col">
                    <span>{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-gray-500">{option.description}</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'multiselect':
        return (
          <MultiSelectField
            field={field}
            value={value || []}
            onChange={onChange}
            error={error}
          />
        )

      case 'range':
        return (
          <RangeField
            field={field}
            value={value || field.range?.min || 0}
            onChange={onChange}
            error={error}
          />
        )

      case 'checkbox':
        return (
          <CheckboxField
            field={field}
            checked={value || false}
            onCheckedChange={onChange}
            error={error}
          />
        )

      case 'radio':
        return (
          <RadioField
            field={field}
            value={value || ''}
            onValueChange={onChange}
            error={error}
          />
        )

      case 'input':
      default:
        return (
          <Input
            type={field.name.includes('budget') || field.name.includes('duration') ? 'number' : 'text'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={error ? 'border-red-500' : ''}
          />
        )
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={field.name} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {field.description && (
          <Info className="w-4 h-4 text-gray-400" />
        )}
      </div>
      
      {field.description && (
        <p className="text-xs text-gray-500">{field.description}</p>
      )}
      
      {renderField()}
      
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

interface MultiSelectFieldProps {
  field: CalculatorField
  value: string[]
  onChange: (value: string[]) => void
  error?: string
}

function MultiSelectField({ field, value, onChange, error }: MultiSelectFieldProps) {
  const handleOptionChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue])
    } else {
      onChange(value.filter(v => v !== optionValue))
    }
  }

  return (
    <div className="space-y-2">
      {field.options?.map((option: Option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={`${field.name}-${option.value}`}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) => handleOptionChange(option.value, checked as boolean)}
          />
          <Label htmlFor={`${field.name}-${option.value}`} className="flex-1 cursor-pointer">
            <div className="flex flex-col">
              <span className="font-medium">{option.label}</span>
              {option.description && (
                <span className="text-xs text-gray-500">{option.description}</span>
              )}
              {option.costImpact && (
                <Badge variant="secondary" className="text-xs mt-1">
                  +{Math.round(option.costImpact * 100)}% cost
                </Badge>
              )}
            </div>
          </Label>
        </div>
      ))}
    </div>
  )
}

interface RangeFieldProps {
  field: CalculatorField
  value: number
  onChange: (value: number) => void
  error?: string
}

function RangeField({ field, value, onChange, error }: RangeFieldProps) {
  const min = field.range?.min || 0
  const max = field.range?.max || 100
  const step = field.range?.step || 1

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {field.name.includes('budget') ? `$${value.toLocaleString()}` : value}
        </span>
        <div className="flex space-x-2 text-xs text-gray-500">
          <span>{field.name.includes('budget') ? `$${min.toLocaleString()}` : min}</span>
          <span>-</span>
          <span>{field.name.includes('budget') ? `$${max.toLocaleString()}` : max}</span>
        </div>
      </div>
      
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={max}
        min={min}
        step={step}
        className={error ? '[&>span]:bg-red-500' : ''}
      />
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Minimum</span>
        <span>Maximum</span>
      </div>
    </div>
  )
}

interface CheckboxFieldProps {
  field: CalculatorField
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  error?: string
}

function CheckboxField({ field, checked, onCheckedChange, error }: CheckboxFieldProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={field.name}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={error ? 'border-red-500' : ''}
      />
      <Label htmlFor={field.name} className="flex-1 cursor-pointer">
        {field.label}
      </Label>
    </div>
  )
}

interface RadioFieldProps {
  field: CalculatorField
  value: string
  onValueChange: (value: string) => void
  error?: string
}

function RadioField({ field, value, onValueChange, error }: RadioFieldProps) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange} className={error ? 'space-y-2' : 'space-y-2'}>
      {field.options?.map((option: Option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem
            value={option.value}
            id={`${field.name}-${option.value}`}
            className={error ? 'border-red-500' : ''}
          />
          <Label htmlFor={`${field.name}-${option.value}`} className="flex-1 cursor-pointer">
            <div className="flex flex-col">
              <span className="font-medium">{option.label}</span>
              {option.description && (
                <span className="text-xs text-gray-500">{option.description}</span>
              )}
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}