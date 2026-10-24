import { describe, it, expect } from 'vitest'
import theme, { arcade } from './theme'

describe('theme', () => {
  it('usa a paleta arcade', () => {
    expect(theme.palette.mode).toBe('dark')
    expect(theme.palette.primary.main).toBe('#dc2626')
    expect(theme.palette.secondary.main).toBe('#facc15')
    expect(theme.palette.background.default).toBe('#050505')
    expect(theme.palette.background.paper).toBe('#0d0d0d')
    expect(theme.shape.borderRadius).toBe(0)
  })
  it('separa fonte pixel e fonte de leitura', () => {
    expect(theme.typography.fontFamily).toBe(arcade.bodyFont)
    expect(theme.typography.h1.fontFamily).toBe(arcade.pixelFont)
    expect(theme.typography.button.fontFamily).toBe(arcade.pixelFont)
    expect(theme.typography.button.textTransform).toBe('none')
  })
})
