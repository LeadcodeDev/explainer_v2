import * as React from 'react'
import { cn } from '@explainer/ui'
import { Icon } from '@iconify/react'

type CalloutVariant = 'info' | 'warning' | 'danger' | 'success' | 'note'

const variantStyles: Record<CalloutVariant, string> = {
  info: 'border-blue-500/30 bg-blue-500/10 text-blue-700 [&_svg]:text-blue-500',
  warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-700 [&_svg]:text-yellow-500',
  danger: 'border-red-500/30 bg-red-500/10 text-red-700 [&_svg]:text-red-500',
  success: 'border-green-500/30 bg-green-500/10 text-green-700 [&_svg]:text-green-500',
  note: 'border-purple-500/30 bg-purple-500/10 text-purple-700 [&_svg]:text-purple-500',
}

const variantIcons: Record<CalloutVariant, string> = {
  info: 'lucide:info',
  warning: 'lucide:triangle-alert',
  danger: 'lucide:circle-alert',
  success: 'lucide:circle-check',
  note: 'lucide:flame',
}

export interface CalloutProps {
  variant?: CalloutVariant
  title?: string
  children: React.ReactNode
  className?: string
}

export function Callout({ variant = 'info', title, children, className }: CalloutProps) {
  return (
    <div className={cn('my-4 rounded-lg border p-4', variantStyles[variant], className)}>
      <div className="flex items-start gap-3">
        <Icon icon={variantIcons[variant]} className="mt-0.5 size-5 shrink-0" />
        <div className="min-w-0">
          {title && <p className="mb-1 font-semibold">{title}</p>}
          <div className="text-sm [&_p]:mt-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
