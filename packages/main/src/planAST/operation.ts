import type { Node } from './node'

export interface Operation {
  (): Promise<void>
}

export interface OperationSet {
  before: Array<Operation>
  after: Array<Operation>
}

export interface OperationBuilder {
  (node: Node): OperationSet
}
