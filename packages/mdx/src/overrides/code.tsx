import * as React from 'react'
import { cn } from '@explainer/ui'

export function Pre({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={cn(
        'my-4 overflow-x-auto rounded-lg border bg-muted p-4 text-sm leading-relaxed',
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  )
}

export function Code({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  const isInline = typeof children === 'string' && !className?.includes('astro-code')
  if (isInline) {
    return (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
          className,
        )}
        {...props}
      >
        {children}
      </code>
    )
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}
