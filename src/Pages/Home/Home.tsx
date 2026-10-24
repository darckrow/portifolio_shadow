import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import StageCard from '../../components/StageCard/StageCard'
import TechInventory from '../../components/TechInventory/TechInventory'
import { useGithubRepos } from '../../services/github'
import { toStage } from '../../lib/stages'
import { arcade } from '../../theme/theme'
import sprite from '../../assets/flutuante.gif'

const sectionTitleSx = {
  fontFamily: arcade.pixelFont,
  fontSize: '1rem',
  color: arcade.redText,
  textAlign: 'center',
  mb: 2,
} as const

export default function Home() {
  const { repos, status } = useGithubRepos()
  const stages = repos.slice(0, 3).map(toStage)

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 3, md: 6 },
            textAlign: { xs: 'center', md: 'left' },
            mb: 6,
          }}
        >
          <img
            className="pixelated"
            src={sprite}
            alt="Sprite do Shadow"
            style={{ width: 128, height: 'auto', filter: 'drop-shadow(0 0 18px #dc262688)' }}
          />
          <Box>
            <Box
              component="h1"
              sx={{
                m: 0,
                mb: 2,
                fontFamily: arcade.pixelFont,
                fontSize: { xs: '1.5rem', md: '2.25rem' },
                color: '#fff',
                textShadow: `3px 3px 0 ${arcade.redDark}`,
              }}
            >
              RAMON MATHEUS
            </Box>
            <Box sx={{ color: arcade.text, mb: 0.5 }}>&gt; Dev Front-end · React · TypeScript</Box>
            <Box sx={{ color: arcade.textMuted, mb: 2 }}>&gt; Próxima fase: Python · C# · SQL</Box>
            <Box aria-hidden="true" sx={{ mb: 3, maxWidth: 320, mx: { xs: 'auto', md: 0 } }}>
              <Box sx={{ fontFamily: arcade.pixelFont, fontSize: '0.65rem', color: arcade.textMuted, mb: 0.5 }}>
                XP — NÍVEL 03
              </Box>
              <Box sx={{ height: 12, border: `3px solid ${arcade.border}`, backgroundColor: arcade.bg }}>
                <Box sx={{ width: '72%', height: '100%', backgroundColor: arcade.red }} />
              </Box>
            </Box>
            <Box
              component={Link}
              to="/projetos"
              className="blink"
              sx={{
                fontFamily: arcade.pixelFont,
                fontSize: '0.85rem',
                color: arcade.yellow,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              PRESS START <span aria-hidden="true">▶</span> PROJETOS
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 6 }}>
          <TechInventory />
        </Box>

        <Box component="section" aria-labelledby="fases-recentes-titulo">
          <Box id="fases-recentes-titulo" component="h2" sx={sectionTitleSx}>
            FASES RECENTES
          </Box>
          {status === 'loading' && (
            <Box className="blink" sx={{ textAlign: 'center', fontFamily: arcade.pixelFont, color: arcade.yellow }}>
              CARREGANDO...
            </Box>
          )}
          {status === 'error' && (
            <Box sx={{ textAlign: 'center', color: arcade.textMuted }}>Fases indisponíveis no momento.</Box>
          )}
          {status === 'ok' && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {stages.map((stage) => (
                <StageCard key={stage.id} stage={stage} to={`/projetos?fase=${stage.id}`} />
              ))}
            </Box>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}
