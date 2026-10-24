import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { Link } from 'react-router-dom'
import { arcade } from '../../theme/theme'
import type { Stage } from '../../lib/stages'

interface StageCardProps {
  stage: Stage
  selected?: boolean
  onSelect?: () => void
  to?: string
}

export default function StageCard({ stage, selected = false, onSelect, to }: StageCardProps) {
  const sx = {
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
    border: `3px solid ${selected ? arcade.yellow : arcade.border}`,
    borderRadius: 0,
    boxShadow: `4px 4px 0 ${arcade.redDark}`,
    transition: 'transform 0.1s, box-shadow 0.1s',
    '&:hover, &:focus-visible': {
      transform: 'translate(-2px, -2px)',
      boxShadow: `6px 6px 0 ${arcade.redDark}`,
    },
    '&:focus-visible': { outline: `3px solid ${arcade.yellow}`, outlineOffset: '2px' },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&:hover, &:focus-visible': { transform: 'none' },
    },
  } as const

  const content = (
    <>
      <Box
        sx={{
          fontFamily: arcade.pixelFont,
          fontSize: '0.7rem',
          color: selected ? arcade.yellow : arcade.textMuted,
        }}
      >
        {selected && <span aria-hidden="true">▶ </span>}
        {stage.code}
      </Box>
      <Box sx={{ fontFamily: arcade.pixelFont, fontSize: '0.75rem', color: '#fff', overflowWrap: 'anywhere' }}>
        {stage.name}
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
        {stage.language ?? '???'}
      </Box>
    </>
  )

  if (to) {
    return (
      <ButtonBase component={Link} to={to} data-testid="stage-card" sx={sx}>
        {content}
      </ButtonBase>
    )
  }
  return (
    <ButtonBase
      type="button"
      data-testid="stage-card"
      aria-pressed={selected}
      onClick={onSelect}
      sx={sx}
    >
      {content}
    </ButtonBase>
  )
}
