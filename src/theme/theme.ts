import { createTheme } from '@mui/material/styles'

export const arcade = {
  bg: '#050505',
  surface: '#0d0d0d',
  red: '#dc2626',
  redDark: '#b91c1c',
  yellow: '#facc15',
  text: '#ddd',
  textMuted: '#aaa',
  textDim: '#888',
  border: '#fff',
  pixelFont: '"Press Start 2P", monospace',
  bodyFont: '"JetBrains Mono", monospace',
}

const heading = (fontSize: string) => ({
  fontFamily: arcade.pixelFont,
  fontWeight: 400,
  fontSize,
  lineHeight: 1.6,
})

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: arcade.red, dark: arcade.redDark },
    secondary: { main: arcade.yellow },
    background: { default: arcade.bg, paper: arcade.surface },
    text: { primary: arcade.text, secondary: arcade.textMuted, disabled: arcade.textDim },
    divider: arcade.border,
  },
  shape: { borderRadius: 0 },
  typography: {
    fontFamily: arcade.bodyFont,
    h1: heading('1.6rem'),
    h2: heading('1.4rem'),
    h3: heading('1.2rem'),
    h4: heading('1rem'),
    h5: heading('0.875rem'),
    h6: heading('0.75rem'),
    body1: { fontFamily: arcade.bodyFont },
    body2: { fontFamily: arcade.bodyFont },
    button: { fontFamily: arcade.pixelFont, textTransform: 'none' },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: arcade.bodyFont,
          color: arcade.textMuted,
          '&.Mui-focused': { color: arcade.yellow },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: arcade.bodyFont,
          color: arcade.text,
          '&::before': { borderBottom: '2px dashed #555' },
          '&:hover:not(.Mui-disabled, .Mui-error)::before': { borderBottom: `2px dashed ${arcade.textDim}` },
          '&::after': { borderBottom: `2px solid ${arcade.yellow}` },
        },
      },
    },
  },
})

export default theme
