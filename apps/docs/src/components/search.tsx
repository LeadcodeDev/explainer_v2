import * as React from 'react'
import { cn } from '@explainer/ui'
import { Icon } from '@iconify/react'

interface PagefindResult {
  url: string
  meta: { title: string }
  excerpt: string
}

let pagefindInstance: any = null
let pagefindFailed = false

async function getPagefind() {
  if (pagefindInstance) return pagefindInstance
  if (pagefindFailed) return null
  try {
    const module = await new Function("return import('/pagefind/pagefind.js')")()
    await module.init()
    pagefindInstance = module
    return pagefindInstance
  } catch {
    pagefindFailed = true
    return null
  }
}

export function Search() {
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<PagefindResult[]>([])
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [unavailable, setUnavailable] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setOpen(false)
      return
    }

    const timeout = setTimeout(async () => {
      setLoading(true)
      const pagefind = await getPagefind()
      if (!pagefind) {
        setLoading(false)
        setUnavailable(true)
        setOpen(true)
        return
      }

      const search = await pagefind.search(query)
      const data = await Promise.all(search.results.slice(0, 8).map((r: any) => r.data()))
      setResults(data)
      setOpen(true)
      setLoading(false)
    }, 200)

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <div ref={containerRef} className="relative px-3">
      <div className="relative">
        <Icon
          icon="lucide:search"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          className={cn(
            'w-full rounded-md border bg-background px-3 py-2 pl-9 text-sm',
            'placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
          )}
        />
        {loading && (
          <Icon
            icon="lucide:loader-2"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin"
          />
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-3 right-3 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-md border bg-popover p-1 shadow-md">
          {results.map((result, i) => (
            <a
              key={i}
              href={result.url}
              className="block rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              <div className="font-medium">{result.meta.title}</div>
              {result.excerpt && (
                <div
                  className="text-xs text-muted-foreground mt-0.5 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: result.excerpt }}
                />
              )}
            </a>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && !loading && (
        <div className="absolute left-3 right-3 top-full z-50 mt-1 rounded-md border bg-popover p-3 shadow-md">
          <p className="text-sm text-muted-foreground text-center">
            {unavailable ? 'Search is available after building the site' : 'No results found'}
          </p>
        </div>
      )}
    </div>
  )
}
