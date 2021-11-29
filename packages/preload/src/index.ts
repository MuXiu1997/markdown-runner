import { contextBridge, ipcRenderer } from 'electron'
import { Channel } from '/@/channel'

const apiKey = 'electron'
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api = {
  versions: process.versions,

  run: (markdownTemplate: string, skipSteps: number) =>
    ipcRenderer.invoke(Channel.RUN, markdownTemplate, skipSteps),
  abort: () => ipcRenderer.invoke(Channel.ABORT),
  showStep: () => ipcRenderer.invoke(Channel.SHOW_STEPS),
} as const

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api)
