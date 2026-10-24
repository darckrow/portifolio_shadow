import Box from '@mui/material/Box'
import PixelBox from '../arcade/PixelBox'
import { arcade } from '../../theme/theme'

import reactLogo from '../../assets/tech/react.svg'
import typescriptLogo from '../../assets/tech/typescript.svg'
import muiLogo from '../../assets/tech/mui.svg'
import reactRouterLogo from '../../assets/tech/react-router.svg'
import githubLogo from '../../assets/tech/github.svg'

const techLogos: Record<string, string> = {
  React: reactLogo,
  TypeScript: typescriptLogo,
  'Material-UI': muiLogo,
  'React Router': reactRouterLogo,
  'GitHub API': githubLogo,
}

const technologies = [
  { category: 'Frontend', techs: ['React', 'TypeScript', 'Material-UI', 'React Router'] },
  { category: 'Integração', techs: ['GitHub API'] },
]

export default function TechInventory() {
  return (
    <Box component="section" aria-labelledby="inventario-titulo" sx={{ width: '100%' }}>
      <Box
        id="inventario-titulo"
        component="h2"
        sx={{ fontFamily: arcade.pixelFont, fontSize: '1rem', color: arcade.redText, textAlign: 'center', mb: 2 }}
      >
        INVENTÁRIO
      </Box>
      <PixelBox sx={{ p: 2 }}>
        {technologies.map(({ category, techs }) => (
          <Box key={category} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
            <Box sx={{ fontFamily: arcade.pixelFont, fontSize: '0.7rem', color: arcade.textMuted, mb: 1 }}>
              {category}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {techs.map((tech) => (
                <Box
                  key={tech}
                  sx={{
                    width: 96,
                    height: 96,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    p: 0.5,
                    textAlign: 'center',
                    backgroundColor: arcade.bg,
                    border: `3px solid ${arcade.border}`,
                    borderRadius: 0,
                    color: arcade.text,
                    transition: 'background-color 0.15s, border-color 0.15s',
                    '&:hover': { backgroundColor: arcade.redDark, borderColor: arcade.red },
                    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                  }}
                >
                  <img
                    className="pixelated"
                    src={techLogos[tech]}
                    alt=""
                    style={{
                      width: 32,
                      height: 32,
                      objectFit: 'contain',
                      filter: tech === 'GitHub API' ? 'invert(1)' : undefined,
                    }}
                  />
                  <Box sx={{ fontSize: '0.65rem', lineHeight: 1.2, wordBreak: 'break-word' }}>{tech}</Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </PixelBox>
    </Box>
  )
}
