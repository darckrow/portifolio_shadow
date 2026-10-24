import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PixelButton from './PixelButton'
import ScreenTitle from './ScreenTitle'
import StatBar from './StatBar'

describe('primitivas arcade', () => {
  afterEach(cleanup)

  it('StatBar limita o valor', () => {
    const { unmount } = render(<StatBar label="Backend" value={140} />)
    expect(screen.getByRole('meter', { name: 'Backend' })).toHaveAttribute('aria-valuenow', '100')
    unmount()
    render(<StatBar label="Backend" value={-5} />)
    expect(screen.getByRole('meter', { name: 'Backend' })).toHaveAttribute('aria-valuenow', '0')
  })

  it('PixelButton com href abre em nova aba', () => {
    render(<PixelButton href="https://example.com">Ir</PixelButton>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('PixelButton com to navega internamente', () => {
    render(
      <MemoryRouter>
        <PixelButton to="/projetos">Projetos</PixelButton>
      </MemoryRouter>,
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/projetos')
    expect(link).not.toHaveAttribute('target')
  })

  it('ScreenTitle renderiza h1', () => {
    render(<ScreenTitle title="SELECIONE A FASE" />)
    expect(screen.getByRole('heading', { level: 1, name: 'SELECIONE A FASE' })).toBeInTheDocument()
  })
})
