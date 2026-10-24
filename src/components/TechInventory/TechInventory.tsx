import Box from '@mui/material/Box'
import PixelBox from '../arcade/PixelBox'
import { arcade } from '../../theme/theme'

import reactLogo from '../../assets/tech/react.svg'
import typescriptLogo from '../../assets/tech/typescript.svg'
import githubLogo from '../../assets/tech/github.svg'
import postgresqlLogo from '../../assets/tech/postgresql.svg'
import supabaseLogo from '../../assets/tech/supabase.svg'
import nodeLogo from '../../assets/tech/nodedotjs.svg'
import expressLogo from '../../assets/tech/express.svg'
import vueLogo from '../../assets/tech/vuedotjs.svg'
import gitLogo from '../../assets/tech/git.svg'

// Ícones coloridos já vêm prontos; os monocromáticos (Simple Icons) são invertidos para branco.
const techLogos: Record<string, { src: string; invert?: boolean }> = {
  PostgreSQL: { src: postgresqlLogo, invert: true },
  Supabase: { src: supabaseLogo, invert: true },
  'Node.js': { src: nodeLogo, invert: true },
  Express: { src: expressLogo, invert: true },
  Vue: { src: vueLogo, invert: true },
  React: { src: reactLogo },
  TypeScript: { src: typescriptLogo },
  Git: { src: gitLogo, invert: true },
  'GitHub API': { src: githubLogo, invert: true },
}

// Sem ícone no Simple Icons: chip de texto no mesmo slot.
const textChips: Record<string, string> = { 'SQL Server': 'SQL', 'C#': 'C#' }

const technologies = [
  { category: 'Dados', techs: ['SQL Server', 'PostgreSQL', 'Supabase'] },
  { category: 'Backend', techs: ['Node.js', 'Express', 'C#'] },
  { category: 'Front-end', techs: ['Vue', 'React', 'TypeScript'] },
  { category: 'Ferramentas', techs: ['Git', 'GitHub API'] },
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
                  {textChips[tech] || !techLogos[tech] ? (
                    <Box
                      aria-hidden="true"
                      sx={{
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        fontFamily: arcade.pixelFont,
                        fontSize: '0.85rem',
                        color: arcade.yellow,
                      }}
                    >
                      {textChips[tech] ?? tech.slice(0, 3)}
                    </Box>
                  ) : (
                    <img
                      className="pixelated"
                      src={techLogos[tech].src}
                      alt=""
                      style={{
                        width: 32,
                        height: 32,
                        objectFit: 'contain',
                        filter: techLogos[tech].invert ? 'invert(1)' : undefined,
                      }}
                    />
                  )}
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
