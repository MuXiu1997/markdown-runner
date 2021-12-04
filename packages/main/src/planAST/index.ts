import { readFileSync } from 'fs'
import { unified } from 'unified'
import markdown from 'remark-parse'
import { VFile } from 'vfile'
import { join } from 'path'
import { execSync } from 'child_process'
import { Plan } from '/@/plan'
import type { Operation, OperationSet } from './operation'
import type { Node } from './node'
import operationBuilderMap from './operationBuilderMap'

export class PlanAST extends Plan {
  private step: number
  private readonly operationList: Array<Operation>

  constructor(markdownTemplate: string, skipSteps: number) {
    super(markdownTemplate, skipSteps)
    this.step = skipSteps

    const templateContent = readFileSync(this.markdownTemplate).toString()

    const root: Node = unified().use(markdown).parse(new VFile(templateContent))
    if (import.meta.env.MODE === 'development')
      console.log(JSON.stringify(root, undefined, 2))
    this.operationList = []
    this.walk(root)
    this.openTypora()
  }

  openTypora(): void {
    const APPLICATIONS = '/Applications'
    const APP = 'Typora.app'
    execSync(`open ${join(APPLICATIONS, APP)} --new`)
  }

  walk(node: Node): void {
    const { before, after } = this.parse(node)
    this.operationList.push(...before)
    if (node.children) {
      for (const child of node.children) {
        this.walk(child)
      }
    }
    this.operationList.push(...after)
  }

  parse(node: Node): OperationSet {
    return (
      operationBuilderMap.get(node.type)?.(node) ?? { before: [], after: [] }
    )
  }

  async next(): Promise<boolean> {
    const operation = this.operationList[this.step]
    await operation()
    this.step++
    return this.operationList.length > this.step
  }

  getStepsNumber(): number {
    return this.step
  }
}
