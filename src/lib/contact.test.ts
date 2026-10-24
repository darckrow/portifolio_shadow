import { describe, it, expect } from 'vitest'
import { buildMailto, buildWhatsAppUrl, type ContactForm } from './contact'

const form: ContactForm = {
  name: 'João & Cia',
  subject: 'Orçamento #1?',
  message: 'linha1\nlinha2',
  email: '',
  phone: '',
}
const expectedText = 'Nome: João & Cia\nAssunto: Orçamento #1?\nMensagem: linha1\nlinha2'

describe('contact', () => {
  it('codifica caracteres especiais no WhatsApp', () => {
    const url = buildWhatsAppUrl(form)
    expect(url.startsWith('https://wa.me/5531973102866?text=')).toBe(true)
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(expectedText)
    expect(new URL(url).searchParams.get('text')).toBe(expectedText)
  })

  it('mailto com assunto e corpo', () => {
    const url = new URL(buildMailto(form))
    expect(url.searchParams.get('subject')).toBe('Orçamento #1?')
    expect(url.searchParams.get('body')?.startsWith('Nome: João & Cia\n\n')).toBe(true)
  })
})
