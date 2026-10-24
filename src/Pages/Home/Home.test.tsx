import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme/theme'
import Home from './Home'
import { useGithubRepos, type GithubRepo } from '../../services/github'

vi.mock('../../services/github', () => ({
  useGithubRepos: vi.fn(),
}))

const mockedUseGithubRepos = vi.mocked(useGithubRepos)

function repo(id: number): GithubRepo {
  return {
    id,
    name: `repo-${id}`,
    description: `Descrição ${id}`,
    html_url: `https://github.com/darckrow/repo-${id}`,
    homepage: null,
    topics: [],
    language: 'TypeScript',
  }
}

function renderHome() {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('Home', () => {
  beforeEach(() => {
    mockedUseGithubRepos.mockReset()
  })

  it('hero', () => {
    mockedUseGithubRepos.mockReturnValue({ repos: [], status: 'loading', retry: vi.fn() })
    renderHome()
    expect(screen.getByRole('heading', { level: 1, name: 'RAMON MATHEUS' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /PRESS START/ })).toHaveAttribute('href', '/projetos#chefe')
    expect(screen.getByText(/Analista de Dados & Sistemas · SQL/)).toBeInTheDocument()
  })

  it('mostra o chefe e 2 fases', () => {
    mockedUseGithubRepos.mockReturnValue({
      repos: Array.from({ length: 9 }, (_, i) => repo(i + 1)),
      status: 'ok',
      retry: vi.fn(),
    })
    renderHome()
    const cards = screen.getAllByTestId('stage-card')
    expect(cards).toHaveLength(3)
    expect(cards[0]).toHaveAttribute('href', '/projetos#chefe')
    cards.slice(1).forEach((card) => expect(card.getAttribute('href')).toMatch(/^\/projetos\?fase=\d+$/))
  })

  it('erro mantém o chefe', () => {
    mockedUseGithubRepos.mockReturnValue({ repos: [], status: 'error', retry: vi.fn() })
    renderHome()
    expect(screen.getByTestId('stage-card')).toHaveAttribute('href', '/projetos#chefe')
    expect(screen.getByText('Fases indisponíveis no momento.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'RAMON MATHEUS' })).toBeInTheDocument()
  })

  it('inventário de dados', () => {
    mockedUseGithubRepos.mockReturnValue({ repos: [], status: 'loading', retry: vi.fn() })
    renderHome()
    expect(screen.getByText('SQL Server')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })
})
