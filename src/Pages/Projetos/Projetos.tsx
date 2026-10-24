import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import BossStage from '../../components/BossStage/BossStage'
import Footer from '../../components/Footer/Footer'
import PixelBox from '../../components/arcade/PixelBox'
import PixelButton from '../../components/arcade/PixelButton'
import ScreenTitle from '../../components/arcade/ScreenTitle'
import StageCard from '../../components/StageCard/StageCard'
import StageDetail from '../../components/StageDetail/StageDetail'
import { useGithubRepos } from '../../services/github'
import { toStage } from '../../lib/stages'
import { arcade } from '../../theme/theme'

export default function Projetos() {
  const { repos, status, retry } = useGithubRepos()
  const [searchParams] = useSearchParams()
  const [selectedId, setSelectedId] = useState<number | null>(() => {
    const fase = searchParams.get('fase')
    return fase ? Number(fase) : null
  })
  const [activations, setActivations] = useState(0)
  const detailHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (activations === 0) return
    const heading = detailHeadingRef.current
    if (!heading) return
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    heading.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' })
    heading.focus({ preventScroll: true })
  }, [activations])

  const activate = (id: number) => {
    setSelectedId(id)
    setActivations((n) => n + 1)
  }

  const stages = repos.map(toStage)
  const landed = useRef(false)
  const faseMatches = status === 'ok' && selectedId !== null && stages.some((s) => s.id === selectedId)
  const hasFase = searchParams.get('fase') !== null

  useEffect(() => {
    if (landed.current || !hasFase || !faseMatches) return
    landed.current = true
    setActivations((n) => n + 1)
  }, [hasFase, faseMatches])

  const selected = stages.find((s) => s.id === selectedId) ?? stages[0]

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <ScreenTitle title="SELECIONE A FASE" subtitle="Repositórios carregados direto do GitHub" />

        <BossStage />

        <Box
          component="h2"
          sx={{ fontFamily: arcade.pixelFont, fontSize: '0.9rem', color: arcade.textMuted, textAlign: 'center', mb: 3 }}
        >
          FASES DO GITHUB
        </Box>

        {status === 'loading' && (
          <Box
            className="blink"
            sx={{ textAlign: 'center', fontFamily: arcade.pixelFont, color: arcade.yellow, py: 6 }}
          >
            CARREGANDO...
          </Box>
        )}

        {status === 'error' && (
          <PixelBox sx={{ p: 4, textAlign: 'center' }}>
            <Box sx={{ fontFamily: arcade.pixelFont, color: arcade.redText, fontSize: '1.25rem', mb: 2 }}>GAME OVER</Box>
            <Box sx={{ mb: 3 }}>Não consegui carregar os projetos do GitHub agora.</Box>
            <PixelButton onClick={retry}>TENTAR DE NOVO</PixelButton>
          </PixelBox>
        )}

        {status === 'ok' && stages.length === 0 && (
          <Box sx={{ textAlign: 'center', fontFamily: arcade.pixelFont, color: arcade.textMuted, py: 6 }}>
            Nenhuma fase encontrada
          </Box>
        )}

        {status === 'ok' && selected && (
          <>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {stages.map((stage) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  selected={stage.id === selected.id}
                  onSelect={() => activate(stage.id)}
                />
              ))}
            </Box>
            <Box aria-live="polite">
              <StageDetail stage={selected} headingRef={detailHeadingRef} />
            </Box>
          </>
        )}

        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <PixelButton variant="secondary" href="https://github.com/darckrow">
            VER TODOS NO GITHUB
          </PixelButton>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}
