import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

describe('ScrollToTop', () => {
  it('rola ao topo na troca de rota, mas não com hash', async () => {
    const spy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <Link to="/projetos#chefe">ir</Link>
      </MemoryRouter>,
    )
    expect(spy).toHaveBeenCalledTimes(1)
    await userEvent.click(screen.getByRole('link', { name: 'ir' }))
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
