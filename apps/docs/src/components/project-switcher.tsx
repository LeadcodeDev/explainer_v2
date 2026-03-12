import * as React from 'react'
import { Icon } from '@iconify/react'
import { cn } from '@explainer/ui'
import type { ProjectInfo } from '../lib/docs'

interface ProjectSwitcherProps {
  projects: ProjectInfo[]
  currentProject: string
  switchUrls: Record<string, string>
}

export function ProjectSwitcher({ projects, currentProject, switchUrls }: ProjectSwitcherProps) {
  const [open, setOpen] = React.useState(false)

  if (projects.length <= 1) return null

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
      >
        {currentProject}
        <Icon icon="lucide:chevrons-up-down" className="size-4 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-md border bg-popover p-1 shadow-md">
            {projects.map((project) => (
              <a
                key={project.name}
                href={switchUrls[project.name] ?? '#'}
                className={cn(
                  'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors',
                  project.name === currentProject
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
                onClick={() => setOpen(false)}
              >
                {project.name === currentProject && (
                  <Icon icon="lucide:check" className="size-3" />
                )}
                {project.name}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
