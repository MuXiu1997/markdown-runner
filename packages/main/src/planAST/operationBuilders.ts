import type { OperationBuilder } from './operation'
import {
  lineBreak,
  typeKey,
  insertTextByTyping,
  insertTextByPasting,
} from '/@/utils'

export const root: OperationBuilder = () => {
  return { before: [], after: [] }
}

export const heading: OperationBuilder = (node) => {
  const heading = node as unknown as { depth: number }
  return {
    before: [
      () => {
        typeKey(`command+${heading.depth}`)
        return Promise.resolve()
      },
    ],
    after: [
      () => {
        typeKey('enter')
        return Promise.resolve()
      },
    ],
  }
}

export const text: OperationBuilder = (node) => {
  const text = node as unknown as { value: string }
  if (/{{贴图\d+}}/.test(text.value)) {
    return { before: [], after: [] }
  }
  return {
    before: [
      () => {
        insertTextByTyping(text.value)
        return Promise.resolve()
      },
    ],
    after: [],
  }
}

export const inlineCode: OperationBuilder = (node) => {
  return {
    before: [
      async () => {
        const inlineCode = node as unknown as { value: string }
        insertTextByTyping('`')
        insertTextByTyping(inlineCode.value)
        insertTextByTyping('`')
      },
    ],
    after: [],
  }
}

export const code: OperationBuilder = (node) => {
  const code = node as unknown as { lang: string; value: string }
  const before = [
    () => {
      insertTextByTyping('```')
      insertTextByTyping(code.lang)
      typeKey('enter')
      return Promise.resolve()
    },
  ]
  if (code?.lang?.toLowerCase() === 'markdown') {
    before.push(
      ...code.value.split('\n').map((row, idx) => {
        return () => {
          if (idx !== 0) {
            lineBreak()
          }
          insertTextByTyping(row)
          return Promise.resolve()
        }
      })
    )
  } else {
    before.push(async () => {
      insertTextByPasting(code.value)
    })
  }
  const after = [
    () => {
      typeKey('down')
      typeKey('down')
      return Promise.resolve()
    },
  ]
  return { before, after }
}

export const paragraph: OperationBuilder = () => {
  return {
    before: [],
    after: [
      () => {
        typeKey('command+enter')
        return Promise.resolve()
      },
    ],
  }
}

export const list: OperationBuilder = (node) => {
  const list = node as unknown as { ordered: boolean; start: number }
  let hotkey = 'u'
  if (list.ordered) {
    hotkey = 'o'
  }
  return {
    before: [
      () => {
        typeKey(`alt+command+${hotkey}`)
        return Promise.resolve()
      },
    ],
    after: [
      () => {
        typeKey('enter')
        return Promise.resolve()
      },
    ],
  }
}

export const listItem: OperationBuilder = () => {
  return {
    before: [],
    after: [
      () => {
        typeKey('enter')
        return Promise.resolve()
      },
    ],
  }
}

export const blockquote: OperationBuilder = () => {
  return {
    before: [
      () => {
        typeKey(`alt+command+q`)
        return Promise.resolve()
      },
    ],
    after: [
      () => {
        typeKey('enter')
        return Promise.resolve()
      },
    ],
  }
}

export const html: OperationBuilder = (node) => {
  const html = node as unknown as { value: string }
  return {
    before: [
      async () => {
        insertTextByPasting(html.value)
      },
    ],
    after: [
      () => {
        typeKey('down')
        return Promise.resolve()
      },
    ],
  }
}

export const strong: OperationBuilder = () => {
  return {
    before: [
      () => {
        insertTextByTyping('**')
        return Promise.resolve()
      },
    ],
    after: [
      () => {
        insertTextByTyping('**')
        return Promise.resolve()
      },
    ],
  }
}

export const thematicBreak: OperationBuilder = () => {
  return {
    before: [
      () => {
        insertTextByTyping('---')
        typeKey('enter')
        return Promise.resolve()
      },
    ],
    after: [],
  }
}
