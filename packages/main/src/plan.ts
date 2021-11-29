export abstract class Plan {
  protected markdownTemplate: string
  protected skipSteps: number

  protected constructor(markdownTemplate: string, skipSteps: number) {
    this.markdownTemplate = markdownTemplate
    this.skipSteps = skipSteps
  }

  public abstract next(): Promise<boolean>

  public abstract getStepsNumber(): number
}
