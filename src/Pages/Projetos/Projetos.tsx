import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
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
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const stages = repos.map(toStage)
  const selected = stages.find((s) => s.id === selectedId) ?? stages[0]

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <ScreenTitle title="SELECIONE A FASE" subtitle="Repositórios carregados direto do GitHub" />

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
            <Box sx={{ fontFamily: arcade.pixelFont, color: arcade.red, fontSize: '1.25rem', mb: 2 }}>GAME OVER</Box>
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
                  onSelect={() => setSelectedId(stage.id)}
                />
              ))}
            </Box>
            <StageDetail stage={selected} />
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
