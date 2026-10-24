import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme/theme'
import Contatos from './Contatos'

function renderPage() {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Contatos />
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('Contatos', () => {
  it('alterna campos', () => {
    renderPage()
    expect(screen.getByLabelText(/E-mail/)).toBeInTheDocument()
    expect(screen.queryByLabelText(/Telefone/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'WHATSAPP' }))
    expect(screen.getByLabelText(/Telefone/)).toBeInTheDocument()
    expect(screen.queryByLabelText(/E-mail/)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'WHATSAPP' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('envia pelo WhatsApp', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: 'WHATSAPP' }))
    fireEvent.change(screen.getByLabelText(/Nome/), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText(/Telefone/), { target: { value: '31999999999' } })
    fireEvent.change(screen.getByLabelText(/Assunto/), { target: { value: 'Oi' } })
    fireEvent.change(screen.getByLabelText(/Mensagem/), { target: { value: 'Olá' } })
    fireEvent.submit(screen.getByRole('button', { name: /ENVIAR NO WHATSAPP/ }).closest('form')!)
    expect(open).toHaveBeenCalledTimes(1)
    expect(open.mock.calls[0][0]).toMatch(/^https:\/\/wa\.me\/5531973102866\?text=/)
    open.mockRestore()
  })
})
