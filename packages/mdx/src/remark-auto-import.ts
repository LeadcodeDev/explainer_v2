import { parse } from 'acorn'

const importStatement = `import { Callout, Tabs, Tab, Steps, Step, CodeGroup } from '@explainer/mdx'`

const estree = parse(importStatement, {
  ecmaVersion: 'latest',
  sourceType: 'module',
})

export function remarkAutoImport() {
  return (tree: any) => {
    tree.children.unshift({
      type: 'mdxjsEsm',
      value: importStatement,
      data: { estree },
    })
  }
}
