import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { arcade } from '../../theme/theme'

interface ScreenTitleProps {
  title: string
  subtitle?: string
}

export default function ScreenTitle({ title, subtitle }: ScreenTitleProps) {
  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontFamily: arcade.pixelFont,
          color: '#fff',
          textShadow: `2px 2px 0 ${arcade.redDark}`,
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ mt: 2, color: arcade.textDim, fontFamily: arcade.bodyFont }}>{subtitle}</Typography>
      )}
    </Box>
  )
}
