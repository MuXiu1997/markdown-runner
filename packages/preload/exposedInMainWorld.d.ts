interface Window {
  /**
   * The "Main World" is the JavaScript context that your main renderer code runs in.
   * By default, the page you load in your renderer executes code in this world.
   *
   * @see https://www.electronjs.org/docs/api/context-bridge
   */
  readonly electron: {
    readonly versions: NodeJS.ProcessVersions

    readonly run: (
      markdownTemplate: string,
      skipSteps: number
    ) => Promise<unknown>
    readonly showStep: () => Promise<unknown>
    readonly abort: () => Promise<unknown>
  }
}
