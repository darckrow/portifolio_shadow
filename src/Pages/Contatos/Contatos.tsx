import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Box, Container, TextField, Typography } from '@mui/material'
import Footer from '../../components/Footer/Footer'
import PixelBox from '../../components/arcade/PixelBox'
import PixelButton from '../../components/arcade/PixelButton'
import { arcade } from '../../theme/theme'
import { buildMailto, buildWhatsAppUrl, type ContactForm } from '../../lib/contact'
import flutuante from '../../assets/flutuante.gif'

type Method = 'email' | 'whatsapp'

const METHODS: { id: Method; label: string }[] = [
  { id: 'email', label: 'E-MAIL' },
  { id: 'whatsapp', label: 'WHATSAPP' },
]

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

export default function Contatos() {
  const [method, setMethod] = useState<Method>('email')
  const [count, setCount] = useState(9)
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', subject: '', message: '' })

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setCount((c) => Math.max(0, c - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (method === 'whatsapp') {
      window.open(buildWhatsAppUrl(form), '_blank', 'noopener')
    } else {
      window.location.href = buildMailto(form)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="md" sx={{ flex: 1, py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: '#fff',
              fontSize: { xs: '1.6rem', sm: '2.4rem', md: '3rem' },
              textShadow: `4px 4px 0 ${arcade.redDark}`,
            }}
          >
            CONTINUE?
          </Typography>
          <Typography
            aria-hidden="true"
            sx={{ mt: 2, fontFamily: arcade.pixelFont, fontSize: '2rem', color: arcade.yellow }}
          >
            {count}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          {METHODS.map(({ id, label }) => {
            const active = method === id
            return (
              <Box
                key={id}
                component="button"
                type="button"
                aria-pressed={active}
                onClick={() => setMethod(id)}
                sx={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  p: 1,
                  fontFamily: arcade.pixelFont,
                  fontSize: '0.85rem',
                  color: active ? arcade.yellow : arcade.textMuted,
                }}
              >
                {active ? '▶ ' : ''}
                {label}
              </Box>
            )
          })}
        </Box>

        <PixelBox sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '160px 1fr' },
              gap: 3,
              alignItems: 'start',
            }}
          >
            <Box
              sx={{
                border: `3px solid ${arcade.border}`,
                p: 1,
                justifySelf: { xs: 'center', sm: 'stretch' },
                maxWidth: 160,
                lineHeight: 0,
              }}
            >
              <Box
                component="img"
                src={flutuante}
                alt="Shadow flutuando"
                className="pixelated"
                sx={{ width: '100%', imageRendering: 'pixelated' }}
              />
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Typography sx={{ fontFamily: arcade.pixelFont, fontSize: '0.75rem', color: arcade.yellow, mb: 1 }}>
                SHADOW:
              </Typography>
              <Typography sx={{ mb: 3 }}>Quer trocar uma ideia? Deixa sua mensagem.</Typography>

              <TextField
                variant="standard"
                fullWidth
                required
                label="Nome"
                name="name"
                value={form.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              {method === 'email' ? (
                <TextField
                  variant="standard"
                  fullWidth
                  required
                  label="E-mail"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              ) : (
                <TextField
                  variant="standard"
                  fullWidth
                  required
                  label="Telefone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              )}
              <TextField
                variant="standard"
                fullWidth
                required
                label="Assunto"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="standard"
                fullWidth
                required
                multiline
                minRows={3}
                label="Mensagem"
                name="message"
                value={form.message}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <PixelButton variant="primary" type="submit">
                {method === 'email' ? 'ENVIAR ▶' : 'ENVIAR NO WHATSAPP ▶'}
              </PixelButton>
            </Box>
          </Box>
        </PixelBox>
      </Container>
      <Footer />
    </Box>
  )
}
