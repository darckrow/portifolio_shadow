import Box from '@mui/material/Box'
import { arcade } from '../../theme/theme'

interface StatBarProps {
  label: string
  value: number
}

export default function StatBar({ label, value }: StatBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ width: 110, fontFamily: arcade.pixelFont, fontSize: '0.65rem', color: arcade.text }}>{label}</Box>
      <Box
        role="meter"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        sx={{ flex: 1, height: 14, border: `2px solid ${arcade.border}`, backgroundColor: arcade.bg }}
      >
        <Box sx={{ width: `${clamped}%`, height: '100%', backgroundColor: arcade.red }} />
      </Box>
      <Box sx={{ width: 36, textAlign: 'right', fontFamily: arcade.pixelFont, fontSize: '0.65rem', color: arcade.yellow }}>
        {clamped}
      </Box>
    </Box>
  )
}
