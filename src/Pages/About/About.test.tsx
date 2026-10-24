import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme/theme'
import About from './About'
import { certificates, education } from '../../data/profile'

function renderAbout() {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <About />
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('About', () => {
  it('mostra as 5 missões', () => {
    renderAbout()
    expect(screen.getByText('TECHCERT', { exact: false })).toBeInTheDocument()
    expect(screen.getAllByText(/ZAK/)).toHaveLength(3)
    expect(screen.getByText(/Desenvolvedor Freelancer/)).toBeInTheDocument()
  })

  it('missão atual é a de analista', () => {
    renderAbout()
    const first = screen.getAllByText(/ — /)[0].closest('div')!.parentElement!
    expect(first).toHaveTextContent('SET 2025 — ATUAL')
    expect(first).toHaveTextContent('Analista de Desenvolvimento de Sistemas')
  })

  it('TECHCERT encerrada', () => {
    renderAbout()
    expect(screen.getByText('NOV 2024 — AGO 2025')).toBeInTheDocument()
  })

  it('classe de analista', () => {
    renderAbout()
    expect(screen.getByText('Classe: Analista de Dados')).toBeInTheDocument()
  })

  it('mostra 15 conquistas', () => {
    renderAbout()
    expect(screen.getByText('CONQUISTAS 15/15')).toBeInTheDocument()
  })

  it('ADS bloqueada é acessível', () => {
    renderAbout()
    const locked = screen.getByText(education.ariaLabel)
    expect(locked.closest('li')).not.toBeNull()
    expect(screen.getByText(education.label, { exact: false }).closest('[aria-hidden="true"]')).not.toBeNull()
    expect(screen.getAllByRole('listitem')).toHaveLength(certificates.length + 1)
  })

  it('rótulos de seção são títulos', () => {
    renderAbout()
    for (const name of ['ATRIBUTOS', 'MISSÕES CONCLUÍDAS', 'CONQUISTAS 15/15']) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
    }
  })

  it('atributos', () => {
    renderAbout()
    expect(screen.getAllByRole('meter')).toHaveLength(4)
  })
})
