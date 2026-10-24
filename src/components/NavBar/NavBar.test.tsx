import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from './NavBar'

function renderNav() {
  return render(
    <MemoryRouter initialEntries={['/projetos']}>
      <NavBar />
    </MemoryRouter>,
  )
}

describe('NavBar', () => {
  it('marca a rota ativa', () => {
    renderNav()
    const projetos = screen.getAllByRole('link', { name: /PROJETOS/ })
    expect(projetos.some((l) => l.getAttribute('aria-current') === 'page')).toBe(true)
    for (const home of screen.getAllByRole('link', { name: /HOME/ })) {
      expect(home).not.toHaveAttribute('aria-current')
    }
  })

  it('menu mobile abre e fecha', () => {
    renderNav()
    const botao = screen.getByRole('button', { name: 'MENU' })
    expect(botao).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(botao)
    expect(botao).toHaveAttribute('aria-expanded', 'true')
    const menu = document.getElementById(botao.getAttribute('aria-controls') as string) as HTMLElement
    expect(menu).toBeVisible()
    const links = within(menu).getAllByRole('link')
    expect(links).toHaveLength(4)

    fireEvent.click(within(menu).getByRole('link', { name: /CONTATO/ }))
    expect(botao).toHaveAttribute('aria-expanded', 'false')
  })
})
