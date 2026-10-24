import type { ReactNode } from 'react'
import { arcade } from '../theme/theme'

const KEYWORDS = new Set(
  'WITH AS SELECT FROM WHERE NOT EXISTS OVER PARTITION BY ORDER CASE WHEN THEN ELSE END GROUP'.split(' '),
)
const FUNCTIONS = new Set(['DATEDIFF', 'GETDATE', 'ROW_NUMBER', 'COUNT', 'SUM'])

export function highlightSql(sql: string): ReactNode[] {
  const nodes: ReactNode[] = []
  sql.split('\n').forEach((line, i, lines) => {
    const eol = i < lines.length - 1 ? '\n' : ''
    if (line.trimStart().startsWith('--')) {
      nodes.push(
        <span key={`l${i}`} style={{ color: arcade.textDim }}>
          {line}
        </span>,
        eol,
      )
      return
    }
    line.split(/([A-Za-z_][A-Za-z0-9_]*)/).forEach((part, j) => {
      if (KEYWORDS.has(part)) {
        nodes.push(
          <span key={`l${i}-${j}`} style={{ color: arcade.redText }}>
            {part}
          </span>,
        )
      } else if (FUNCTIONS.has(part)) {
        nodes.push(
          <span key={`l${i}-${j}`} style={{ color: arcade.yellow }}>
            {part}
          </span>,
        )
      } else if (part) {
        nodes.push(part)
      }
    })
    if (eol) nodes.push(eol)
  })
  return nodes
}
