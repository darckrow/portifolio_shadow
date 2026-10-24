import type { ElementType, ReactNode } from 'react'
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { arcade } from '../../theme/theme'

interface PixelBoxProps {
  children?: ReactNode
  sx?: SxProps<Theme>
  highlight?: boolean
  component?: ElementType
}

export default function PixelBox({ children, sx, highlight = false, component = 'div' }: PixelBoxProps) {
  return (
    <Box
      component={component}
      sx={[
        {
          backgroundColor: arcade.surface,
          border: `3px solid ${highlight ? arcade.yellow : arcade.border}`,
          boxShadow: highlight ? `0 0 0 3px ${arcade.redDark}` : `4px 4px 0 ${arcade.redDark}`,
          borderRadius: 0,
          color: arcade.text,
          fontFamily: arcade.bodyFont,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  )
}
