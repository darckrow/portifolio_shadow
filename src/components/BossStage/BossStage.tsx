import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import PixelBox from '../arcade/PixelBox'
import PixelButton from '../arcade/PixelButton'
import { highlightSql } from '../../lib/highlightSql'
import { bossProject } from '../../data/bossProject'
import { arcade } from '../../theme/theme'

const tag = {
  fontFamily: arcade.bodyFont,
  fontSize: '0.75rem',
  color: arcade.text,
  border: `1px solid ${arcade.border}`,
  px: 1,
  py: 0.5,
}

function CompactBoss() {
  return (
    <ButtonBase
      component={Link}
      to="/projetos#chefe"
      data-testid="stage-card"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 1,
        width: '100%',
        p: 1.5,
        textAlign: 'left',
        backgroundColor: arcade.surface,
        color: arcade.text,
        fontFamily: arcade.bodyFont,
        textDecoration: 'none',
        border: `3px solid ${arcade.yellow}`,
        borderRadius: 0,
        boxShadow: `0 0 0 3px ${arcade.redDark}`,
        transition: 'transform 0.1s, box-shadow 0.1s',
        '&:hover, &:focus-visible': {
          transform: 'translate(-2px, -2px)',
          boxShadow: `0 0 0 3px ${arcade.redDark}, 6px 6px 0 ${arcade.redDark}`,
        },
        '&:focus-visible': { outline: `3px solid ${arcade.yellow}`, outlineOffset: '5px' },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover, &:focus-visible': { transform: 'none' },
        },
      }}
    >
      <Box sx={{ fontFamily: arcade.pixelFont, fontSize: '0.7rem', color: arcade.yellow }}>
        <span aria-hidden="true">⚠ </span>CHEFE FINAL
      </Box>
      <Box sx={{ fontFamily: arcade.pixelFont, fontSize: '0.75rem', color: '#fff', overflowWrap: 'anywhere' }}>
        {bossProject.title}
      </Box>
      <Box
        sx={{
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'repeating-linear-gradient(45deg,#1a1a1a 0 6px,#111 6px 12px)',
          fontFamily: arcade.pixelFont,
          fontSize: '0.7rem',
          color: arcade.textDim,
        }}
      >
        SQL Server · PostgreSQL
      </Box>
    </ButtonBase>
  )
}

export default function BossStage({ compact = false }: { compact?: boolean }) {
  const { hash } = useLocation()

  useEffect(() => {
    if (compact || hash !== '#chefe') return
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    document.getElementById('chefe')?.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [compact, hash])

  if (compact) return <CompactBoss />

  const b = bossProject
  return (
    <Box component="section" id="chefe" aria-labelledby="chefe-titulo" sx={{ mb: 5, scrollMarginTop: 16 }}>
      <PixelBox
        sx={{
          borderColor: arcade.yellow,
          boxShadow: `0 0 0 3px ${arcade.redDark}, 8px 8px 0 ${arcade.redDark}`,
          p: { xs: 2, md: 3 },
        }}
      >
        <Box
          className="blink"
          sx={{ fontFamily: arcade.pixelFont, fontSize: '0.75rem', color: arcade.redText, textAlign: 'center', mb: 1 }}
        >
          <span aria-hidden="true">⚠ </span>CHEFE FINAL<span aria-hidden="true"> ⚠</span>
        </Box>
        <Box
          component="h2"
          id="chefe-titulo"
          sx={{
            m: 0,
            mb: 1,
            textAlign: 'center',
            fontFamily: arcade.pixelFont,
            fontSize: { xs: '1rem', md: '1.4rem' },
            color: '#fff',
            textShadow: `2px 2px 0 ${arcade.redDark}`,
          }}
        >
          {b.title}
        </Box>
        <Box sx={{ textAlign: 'center', color: arcade.textMuted, fontSize: '0.85rem', mb: 2 }}>
          {b.subtitle} · <span style={{ color: arcade.yellow }}>{b.status}</span> · projeto privado
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 1.5,
            mb: 2.5,
          }}
        >
          {b.stats.map((s) => (
            <Box key={s.label} sx={{ border: `2px solid ${arcade.border}`, p: 1, textAlign: 'center', background: '#000' }}>
              <Box component="b" sx={{ display: 'block', fontFamily: arcade.pixelFont, fontSize: '1.1rem', color: arcade.yellow }}>
                {s.value}
              </Box>
              <Box component="span" sx={{ fontSize: '0.7rem', color: arcade.textMuted }}>
                {s.label}
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, mb: 2.5 }}>
          <Box>
            <Box component="p" sx={{ m: 0, mb: 1.5, color: arcade.text, fontSize: '0.9rem' }}>
              {b.pitch}
            </Box>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {b.indicators.map((t) => (
                <Box component="li" key={t} sx={tag}>
                  {t}
                </Box>
              ))}
            </Box>
            <Box component="p" sx={{ m: 0, mt: 1.5, color: arcade.textMuted, fontSize: '0.8rem' }}>
              <span aria-hidden="true" style={{ color: arcade.yellow }}>
                ★{' '}
              </span>
              {b.highlight}
            </Box>
          </Box>
          <Box
            component="pre"
            tabIndex={0}
            role="region"
            aria-label="Exemplo de consulta SQL com dados fictícios"
            sx={{
              m: 0,
              p: 1.5,
              overflowX: 'auto',
              fontFamily: arcade.bodyFont,
              fontSize: '0.7rem',
              lineHeight: 1.5,
              background: '#000',
              border: '2px solid #333',
              color: arcade.text,
            }}
          >
            <code>{highlightSql(b.sqlSample)}</code>
          </Box>
        </Box>

        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 2.5, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {b.stack.map((t) => (
            <Box component="li" key={t} sx={{ ...tag, color: arcade.yellow, borderColor: arcade.yellow }}>
              {t}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ color: arcade.textMuted, fontSize: '0.85rem' }}>
            <span aria-hidden="true">🔒 </span>
            {b.privateNote}
          </Box>
          <PixelButton variant="secondary" to="/contatos">
            VAMOS CONVERSAR
          </PixelButton>
        </Box>
      </PixelBox>
    </Box>
  )
}
