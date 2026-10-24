import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme/theme'
import BossStage from './BossStage'

function renderBoss(props: { compact?: boolean } = {}, entries: string[] = ['/projetos']) {
  return render(
    <MemoryRouter initialEntries={entries}>
      <ThemeProvider theme={theme}>
        <BossStage {...props} />
      </ThemeProvider>
    </MemoryRouter>,
  )
}

const originalScroll = Element.prototype.scrollIntoView

describe('BossStage', () => {
  afterEach(() => {
    Element.prototype.scrollIntoView = originalScroll
  })

  it('mostra título, status e placar', () => {
    renderBoss()
    expect(screen.getByRole('heading', { name: 'PAINEL DE GESTÃO MODULAR' })).toBeInTheDocument()
    expect(screen.getByText('EM PRODUÇÃO')).toBeInTheDocument()
    for (const v of ['~60', '9', '2', '200+']) expect(screen.getByText(v)).toBeInTheDocument()
  })

  it('mostra o SQL fictício', () => {
    const { container } = renderBoss()
    const text = container.textContent ?? ''
    expect(text).toContain('WITH abertos AS')
    expect(text).toContain('NOT EXISTS')
    expect(text).not.toContain('VW_')
    expect(text).toContain('SUM(CASE WHEN ordem = 1')
  })

  it('sem dados internos', () => {
    const { container } = renderBoss()
    expect(container.textContent).not.toMatch(/ZAK/)
  })

  it('rola até o chefe com #chefe', async () => {
    Element.prototype.scrollIntoView = vi.fn()
    renderBoss({}, ['/projetos#chefe'])
    await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1))
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ block: 'start', behavior: 'smooth' })
  })

  it('compact é link para o chefe', () => {
    renderBoss({ compact: true })
    expect(screen.getByTestId('stage-card')).toHaveAttribute('href', '/projetos#chefe')
  })
})
