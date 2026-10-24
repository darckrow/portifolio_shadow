import Box from '@mui/material/Box'
import Footer from '../../components/Footer/Footer'
import PixelBox from '../../components/arcade/PixelBox'
import ScreenTitle from '../../components/arcade/ScreenTitle'
import StatBar from '../../components/arcade/StatBar'
import { arcade } from '../../theme/theme'
import icon2 from '../../assets/icon2.gif'
import { characterClass, summary, stats, experiences, certificates, education } from '../../data/profile'

const sectionLabel = {
  fontFamily: arcade.pixelFont,
  fontSize: '0.8rem',
  color: arcade.yellow,
  mb: 2,
}

const twoColumns = { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }

const badgeBase = {
  display: 'inline-block',
  px: 1.5,
  py: 0.75,
  fontFamily: arcade.bodyFont,
  fontSize: '0.8rem',
  backgroundColor: arcade.surface,
}

export default function About() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <ScreenTitle title="FICHA DO PERSONAGEM" subtitle="Player 1" />

        <Box sx={twoColumns}>
          <PixelBox sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src={icon2}
              alt="Sprite do Shadow"
              className="pixelated"
              sx={{ width: 128, height: 128, objectFit: 'contain' }}
            />
            <Box sx={{ fontFamily: arcade.pixelFont, fontSize: '1rem', color: arcade.text }}>RAMON</Box>
            <Box sx={{ fontSize: '0.85rem', color: arcade.textMuted }}>Classe: {characterClass.current}</Box>
            <Box sx={{ fontSize: '0.85rem', color: arcade.textMuted }}>Próx. evolução: {characterClass.next}</Box>
          </PixelBox>

          <PixelBox sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={sectionLabel}>ATRIBUTOS</Box>
            {stats.map((stat) => (
              <StatBar key={stat.label} label={stat.label} value={stat.value} />
            ))}
            <Box sx={{ mt: 1, fontFamily: arcade.bodyFont, fontSize: '0.9rem', lineHeight: 1.7, color: arcade.text }}>
              {summary}
            </Box>
          </PixelBox>
        </Box>

        <Box component="section">
          <Box sx={sectionLabel}>MISSÕES CONCLUÍDAS</Box>
          <Box sx={twoColumns}>
            {experiences.map((exp) => (
              <PixelBox key={`${exp.period}-${exp.role}`} sx={{ p: 3 }}>
                <Box sx={{ fontFamily: arcade.pixelFont, fontSize: '0.65rem', color: arcade.yellow, mb: 1 }}>
                  {exp.period}
                </Box>
                <Box sx={{ fontWeight: 700, color: arcade.text, mb: 1 }}>
                  {exp.role} · {exp.company}
                </Box>
                <Box sx={{ fontSize: '0.85rem', lineHeight: 1.6, color: arcade.textMuted }}>{exp.description}</Box>
              </PixelBox>
            ))}
          </Box>
        </Box>

        <Box component="section">
          <Box sx={sectionLabel}>
            CONQUISTAS {certificates.length}/{certificates.length}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {certificates.map((cert) => (
              <Box key={cert} sx={{ ...badgeBase, border: `2px solid ${arcade.yellow}`, color: arcade.text }}>
                ★ {cert}
              </Box>
            ))}
            <Box
              aria-label={education.ariaLabel}
              sx={{ ...badgeBase, border: '2px solid #444', color: arcade.textDim }}
            >
              🔒 {education.label}
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}
