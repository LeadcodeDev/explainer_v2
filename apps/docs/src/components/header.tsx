import { ThemeToggle, cn } from '@explainer/ui'
import type { ProjectInfo } from '../lib/docs'
import { VersionSwitcher } from './version-switcher'
import { LocaleSwitcher } from './locale-switcher'
import { SearchCommand } from './search-command'
import { ProjectTabs } from './project-tabs'

interface HeaderProps {
  title?: string
  projects: ProjectInfo[]
  currentProject: string
  currentVersion: string
  currentLocale: string
  locales: string[]
  projectSwitchUrls: Record<string, string>
  versionSwitchUrls: Record<string, string>
  localeSwitchUrls: Record<string, string>
}

export function Header({
  title = 'Explainer',
  projects,
  currentProject,
  currentVersion,
  currentLocale,
  locales,
  projectSwitchUrls,
  versionSwitchUrls,
  localeSwitchUrls,
}: HeaderProps) {
  const currentProjectInfo = projects.find((p) => p.name === currentProject)
  const showTabs = projects.length > 1

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Row 1: Main bar */}
      <div className={cn(!showTabs && 'border-b')}>
        <div className="flex h-14 items-center justify-between px-6 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 font-semibold text-lg">
              {title}
            </a>
            {currentProjectInfo && (
              <VersionSwitcher
                versions={currentProjectInfo.versions}
                currentVersion={currentVersion}
                hasVersioning={currentProjectInfo.hasVersioning}
                switchUrls={versionSwitchUrls}
              />
            )}
          </div>
          <div className="hidden md:block">
            <SearchCommand />
          </div>
          <div className="flex items-center gap-2">
            <LocaleSwitcher
              locales={locales}
              currentLocale={currentLocale}
              switchUrls={localeSwitchUrls}
            />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Row 2: Project tabs */}
      {showTabs && (
        <ProjectTabs
          projects={projects}
          currentProject={currentProject}
          switchUrls={projectSwitchUrls}
        />
      )}
    </header>
  )
}
