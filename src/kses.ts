import { allowedPostTags, AllowedPostTags } from './allowedPostTags'
import { traverseNode, validateArguments } from './utils'

export function kses(
  htmlString: string,
  allowedTags: AllowedPostTags = allowedPostTags,
  allowedProtocols: string[] = ['http', 'https']
): string {
  if (typeof window === 'undefined') {
    throw new Error('import { kses } from @codesync/kses/server')
  }
  if (!validateArguments(htmlString, allowedTags, allowedProtocols)) {
    return ''
  }

  const parser = new DOMParser()
  let htmlDoc = parser.parseFromString(htmlString, 'text/html')

  Array.from(htmlDoc.body.children).forEach((child) =>
    traverseNode(child as Element, allowedTags, allowedProtocols)
  )

  return htmlDoc.body.innerHTML
}
