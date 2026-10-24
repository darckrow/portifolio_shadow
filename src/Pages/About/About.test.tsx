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
  it('mostra as 4 missões', () => {
    renderAbout()
    expect(screen.getByText('TECHCERT', { exact: false })).toBeInTheDocument()
    expect(screen.getAllByText(/ZAK/)).toHaveLength(2)
    expect(screen.getByText(/Desenvolvedor Freelancer/)).toBeInTheDocument()
  })

  it('mostra 13 conquistas', () => {
    renderAbout()
    expect(screen.getByText('CONQUISTAS 13/13')).toBeInTheDocument()
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
    for (const name of ['ATRIBUTOS', 'MISSÕES CONCLUÍDAS', 'CONQUISTAS 13/13']) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
    }
  })

  it('atributos', () => {
    renderAbout()
    expect(screen.getAllByRole('meter')).toHaveLength(4)
  })
})
