import type { Ref } from 'react'
import Box from '@mui/material/Box'
import PixelBox from '../arcade/PixelBox'
import PixelButton from '../arcade/PixelButton'
import { arcade } from '../../theme/theme'
import type { Stage } from '../../lib/stages'

interface StageDetailProps {
  stage: Stage
  headingRef?: Ref<HTMLHeadingElement>
}

export default function StageDetail({ stage, headingRef }: StageDetailProps) {
  return (
    <PixelBox sx={{ p: 3, mt: 4 }}>
      <Box
        component="h2"
        ref={headingRef}
        tabIndex={-1}
        sx={{
          m: 0,
          mb: 2,
          fontFamily: arcade.pixelFont,
          fontSize: '1rem',
          color: arcade.yellow,
          overflowWrap: 'anywhere',
          scrollMarginTop: 16,
        }}
      >
        {`${stage.code} · ${stage.name}`}
      </Box>
      <Box sx={{ color: arcade.text, mb: 2 }}>{stage.description}</Box>
      {stage.tags.length > 0 && (
        <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, listStyle: 'none', p: 0, m: 0, mb: 3 }}>
          {stage.tags.map((tag) => (
            <Box
              component="li"
              key={tag}
              sx={{ px: 1, py: 0.5, border: `2px solid ${arcade.textDim}`, color: arcade.textMuted, fontSize: '0.8rem' }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {stage.demoUrl && (
          <PixelButton variant="primary" href={stage.demoUrl}>
            <span aria-hidden="true">▶ </span>JOGAR
          </PixelButton>
        )}
        <PixelButton variant="secondary" href={stage.codeUrl}>
          CÓDIGO
        </PixelButton>
      </Box>
    </PixelBox>
  )
}
