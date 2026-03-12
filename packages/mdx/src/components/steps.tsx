import * as React from 'react'
import { cn } from '@explainer/ui'

interface StepsProps {
  children: React.ReactNode
  className?: string
}

interface StepProps {
  title: string
  children: React.ReactNode
}

export function Steps({ children, className }: StepsProps) {
  return (
    <div className={cn('my-4 ml-4 border-l-2 border-border pl-6 [counter-reset:step]', className)}>
      {children}
    </div>
  )
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="relative pb-8 last:pb-0 [counter-increment:step]">
      <div className="absolute -left-[calc(1.5rem+1px)] flex size-8 items-center justify-center rounded-full border-2 bg-background text-sm font-semibold before:content-[counter(step)]" />
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  )
}
