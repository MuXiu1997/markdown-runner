import { execSync } from 'child_process'

export function insertTextByTyping(str: string) {
  str.split('\n').forEach((line, idx) => {
    if (idx !== 0) {
      lineBreak()
    }
    doKeyboardMaestroScript('Insert Text by Typing', line)
  })
}

export function insertTextByPasting(str: string) {
  doKeyboardMaestroScript('Insert Text by Pasting', str)
}

export function lineBreak() {
  doKeyboardMaestroScript('Line break')
}

export function setKeyboardLayoutToABC() {
  doKeyboardMaestroScript('Set Keyboard Layout to ABC')
}

export function typeKey(key: string) {
  doKeyboardMaestroScript('Type Key', key)
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function doKeyboardMaestroScript(name: string, parameter?: string) {
  const hasParameter = typeof parameter !== 'undefined'
  if (hasParameter) parameter = parameter?.replaceAll('"', '\\"')
  const cmd = `osascript -e 'tell application "Keyboard Maestro Engine" to do script "${name}"${
    hasParameter ? ` with parameter "${parameter}"` : ''
  }'`
  execSync(cmd)
}
