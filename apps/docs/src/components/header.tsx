import { ThemeToggle } from '@explainer/ui'
import type { ProjectInfo } from '../lib/docs'
import { ProjectSwitcher } from './project-switcher'
import { VersionSwitcher } from './version-switcher'
import { LocaleSwitcher } from './locale-switcher'

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 font-semibold text-lg">
            {title}
          </a>
          <div className="flex items-center gap-2">
            <ProjectSwitcher
              projects={projects}
              currentProject={currentProject}
              switchUrls={projectSwitchUrls}
            />
            {currentProjectInfo && (
              <VersionSwitcher
                versions={currentProjectInfo.versions}
                currentVersion={currentVersion}
                hasVersioning={currentProjectInfo.hasVersioning}
                switchUrls={versionSwitchUrls}
              />
            )}
          </div>
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
    </header>
  )
}
