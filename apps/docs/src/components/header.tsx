import { cn } from '@explainer/ui'

interface HeaderProps {
  title?: string
}

export function Header({ title = 'Explainer' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <a href="/" className="flex items-center gap-2 font-semibold text-lg">
          {title}
        </a>
      </div>
    </header>
  )
}
