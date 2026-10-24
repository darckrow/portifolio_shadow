import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme/theme'
import About from './About'

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
    expect(
      screen.getByLabelText(/Conquista bloqueada: Análise e Desenvolvimento de Sistemas/),
    ).toBeInTheDocument()
  })

  it('atributos', () => {
    renderAbout()
    expect(screen.getAllByRole('meter')).toHaveLength(4)
  })
})
