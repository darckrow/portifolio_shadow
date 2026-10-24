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
    expect(screen.getByRole('link', { name: /PRESS START/ })).toHaveAttribute('href', '/projetos')
  })

  it('mostra no máximo 3 fases', () => {
    mockedUseGithubRepos.mockReturnValue({
      repos: Array.from({ length: 9 }, (_, i) => repo(i + 1)),
      status: 'ok',
      retry: vi.fn(),
    })
    renderHome()
    expect(screen.getAllByTestId('stage-card')).toHaveLength(3)
    screen.getAllByTestId('stage-card').forEach((card) => expect(card).toHaveAttribute('href', '/projetos'))
  })

  it('erro não quebra a home', () => {
    mockedUseGithubRepos.mockReturnValue({ repos: [], status: 'error', retry: vi.fn() })
    renderHome()
    expect(screen.getByText('Fases indisponíveis no momento.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'RAMON MATHEUS' })).toBeInTheDocument()
  })
})
