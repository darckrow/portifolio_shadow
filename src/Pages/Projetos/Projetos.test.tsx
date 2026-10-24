import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme/theme'
import Projetos from './Projetos'
import { useGithubRepos, type GithubRepo } from '../../services/github'

vi.mock('../../services/github', () => ({
  useGithubRepos: vi.fn(),
}))

const mockedUseGithubRepos = vi.mocked(useGithubRepos)

function repo(id: number, name: string, homepage: string | null): GithubRepo {
  return {
    id,
    name,
    description: `Descrição ${name}`,
    html_url: `https://github.com/darckrow/${name}`,
    homepage,
    topics: [],
    language: 'TypeScript',
  }
}

function renderProjetos() {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Projetos />
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('Projetos', () => {
  beforeEach(() => {
    mockedUseGithubRepos.mockReset()
  })

  it('erro mostra GAME OVER e tenta de novo', async () => {
    const retry = vi.fn()
    mockedUseGithubRepos.mockReturnValue({ repos: [], status: 'error', retry })
    renderProjetos()
    expect(screen.getByText('GAME OVER')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'TENTAR DE NOVO' }))
    expect(retry).toHaveBeenCalledTimes(1)
  })

  it('seleção por teclado', async () => {
    mockedUseGithubRepos.mockReturnValue({
      repos: [repo(1, 'alfa', null), repo(2, 'beta', 'https://x.dev')],
      status: 'ok',
      retry: vi.fn(),
    })
    renderProjetos()
    expect(screen.getByText('FASE 1-1 · alfa')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /JOGAR/ })).not.toBeInTheDocument()

    await userEvent.tab()
    await userEvent.tab()

    expect(screen.getByText('FASE 1-2 · beta')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /JOGAR/ })).toHaveAttribute('href', 'https://x.dev')
  })

  it('fase selecionada é anunciada', () => {
    mockedUseGithubRepos.mockReturnValue({
      repos: [repo(1, 'alfa', null), repo(2, 'beta', null)],
      status: 'ok',
      retry: vi.fn(),
    })
    renderProjetos()
    const cards = screen.getAllByTestId('stage-card')
    expect(cards[0]).toHaveAttribute('aria-pressed', 'true')
    expect(cards[1]).toHaveAttribute('aria-pressed', 'false')
  })
})
