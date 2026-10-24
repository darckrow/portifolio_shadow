import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import PixelBox from '../arcade/PixelBox'
import { arcade } from '../../theme/theme'
import logo from '../../assets/logo.png'

const links = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'SOBRE' },
  { to: '/projetos', label: 'PROJETOS' },
  { to: '/contatos', label: 'CONTATO' },
]

const MENU_ID = 'menu-mobile'

export default function NavBar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const linkSx = (active: boolean) => ({
    fontFamily: arcade.pixelFont,
    fontSize: '10px',
    color: active ? arcade.yellow : arcade.textDim,
    textDecoration: 'none',
    '&:hover': { color: arcade.red },
  })

  return (
    <Box
      component="nav"
      aria-label="Navegação principal"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2.5,
        py: 1,
        backgroundColor: arcade.bg,
        borderBottom: `3px solid ${arcade.redDark}`,
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Logo Ramon Matheus"
        className="pixelated"
        sx={{ height: '36px', width: 'auto' }}
      />

      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
        {links.map(({ to, label }) => {
          const active = pathname === to
          return (
            <Box
              key={to}
              component={RouterLink}
              to={to}
              aria-current={active ? 'page' : undefined}
              sx={linkSx(active)}
            >
              {active ? `▶ ${label}` : label}
            </Box>
          )
        })}
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box
          component="button"
          type="button"
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen((o) => !o)}
          sx={{
            fontFamily: arcade.pixelFont,
            fontSize: '10px',
            color: arcade.text,
            backgroundColor: arcade.surface,
            border: `3px solid ${arcade.border}`,
            borderRadius: 0,
            px: 1.5,
            py: 1,
            cursor: 'pointer',
          }}
        >
          MENU
        </Box>
        {open && (
          <PixelBox
            sx={{
              position: 'absolute',
              top: '100%',
              right: 16,
              mt: 1,
              zIndex: 1100,
              minWidth: 200,
              p: 2,
            }}
          >
            <Box
              id={MENU_ID}
              component="ul"
              sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              {links.map(({ to, label }) => {
                const active = pathname === to
                return (
                  <li key={to}>
                    <Box
                      component={RouterLink}
                      to={to}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                      sx={[linkSx(active), { fontSize: '12px', display: 'block' }]}
                    >
                      {active ? `▶ ${label}` : label}
                    </Box>
                  </li>
                )
              })}
            </Box>
          </PixelBox>
        )}
      </Box>
    </Box>
  )
}
