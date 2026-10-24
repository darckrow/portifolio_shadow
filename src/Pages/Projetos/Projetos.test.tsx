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

function renderProjetos(initialEntries: string[] = ['/projetos']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <ThemeProvider theme={theme}>
        <Projetos />
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('Projetos', () => {
  beforeEach(() => {
    mockedUseGithubRepos.mockReset()
    Element.prototype.scrollIntoView = vi.fn()
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

    // o chefe vem antes da grade: bloco de SQL rolável e link VAMOS CONVERSAR
    await userEvent.tab()
    expect(screen.getByLabelText(/consulta SQL/)).toHaveFocus()
    await userEvent.tab()
    expect(screen.getByRole('link', { name: 'VAMOS CONVERSAR' })).toHaveFocus()
    await userEvent.tab()
    await userEvent.tab()
    expect(screen.getAllByTestId('stage-card')[1]).toHaveFocus()
    expect(screen.getByText('FASE 1-1 · alfa')).toBeInTheDocument()
    await userEvent.keyboard('{Enter}')

    const heading = screen.getByRole('heading', { level: 2, name: 'FASE 1-2 · beta' })
    expect(document.activeElement).toBe(heading)
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ block: 'start', behavior: 'smooth' })

    await userEvent.tab()
    const jogar = screen.getByRole('link', { name: 'JOGAR' })
    expect(jogar).toHaveAttribute('href', 'https://x.dev')
    expect(document.activeElement).toBe(jogar)
  })

  it('hover não troca a fase', async () => {
    mockedUseGithubRepos.mockReturnValue({
      repos: [repo(1, 'alfa', null), repo(2, 'beta', null)],
      status: 'ok',
      retry: vi.fn(),
    })
    renderProjetos()
    await userEvent.hover(screen.getAllByTestId('stage-card')[1])
    expect(screen.getByRole('heading', { level: 2, name: 'FASE 1-1 · alfa' })).toBeInTheDocument()
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled()
  })

  it('abre na fase indicada por ?fase=', () => {
    mockedUseGithubRepos.mockReturnValue({
      repos: [repo(11, 'alfa', null), repo(22, 'beta', null)],
      status: 'ok',
      retry: vi.fn(),
    })
    renderProjetos(['/projetos?fase=22'])
    const heading = screen.getByRole('heading', { level: 2, name: 'FASE 1-2 · beta' })
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1)
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ block: 'start', behavior: 'smooth' })
    expect(document.activeElement).toBe(heading)
  })

  it('sem ?fase= não rola ao carregar', () => {
    mockedUseGithubRepos.mockReturnValue({
      repos: [repo(11, 'alfa', null), repo(22, 'beta', null)],
      status: 'ok',
      retry: vi.fn(),
    })
    renderProjetos()
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled()
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

  it('chefe aparece mesmo com GAME OVER', () => {
    mockedUseGithubRepos.mockReturnValue({ repos: [], status: 'error', retry: vi.fn() })
    renderProjetos()
    expect(screen.getByText('GAME OVER')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'PAINEL DE GESTÃO MODULAR' })).toBeInTheDocument()
  })

  it('chefe vem antes das fases', () => {
    mockedUseGithubRepos.mockReturnValue({
      repos: [repo(1, 'alfa', null)],
      status: 'ok',
      retry: vi.fn(),
    })
    renderProjetos()
    const boss = screen.getByRole('heading', { name: 'PAINEL DE GESTÃO MODULAR' })
    const first = screen.getAllByTestId('stage-card')[0]
    expect(boss.compareDocumentPosition(first) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})
