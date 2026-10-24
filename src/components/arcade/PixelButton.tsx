import type { MouseEventHandler, ReactNode } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import { Link } from 'react-router-dom'
import { arcade } from '../../theme/theme'

interface PixelButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  to?: string
  href?: string
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLElement>
  startIcon?: ReactNode
  fullWidth?: boolean
}

export default function PixelButton({
  children,
  variant = 'primary',
  to,
  href,
  type = 'button',
  onClick,
  startIcon,
  fullWidth = false,
}: PixelButtonProps) {
  const primary = variant === 'primary'
  const sx = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    width: fullWidth ? '100%' : 'auto',
    px: 2.5,
    py: 1.5,
    fontFamily: arcade.pixelFont,
    fontSize: '0.75rem',
    lineHeight: 1.6,
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: primary ? arcade.red : 'transparent',
    border: `3px solid ${arcade.border}`,
    borderRadius: 0,
    boxShadow: `4px 4px 0 ${arcade.redDark}`,
    transition: 'transform 0.1s, box-shadow 0.1s',
    '&:hover': {
      transform: 'translate(-2px, -2px)',
      boxShadow: `6px 6px 0 ${arcade.redDark}`,
      backgroundColor: primary ? arcade.redDark : 'rgba(255,255,255,0.08)',
    },
    '&:focus-visible': { outline: `3px solid ${arcade.yellow}`, outlineOffset: '2px' },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&:hover': { transform: 'none' },
    },
  }

  if (to) {
    return (
      <ButtonBase component={Link} to={to} onClick={onClick} sx={sx}>
        {startIcon}
        {children}
      </ButtonBase>
    )
  }
  if (href) {
    return (
      <ButtonBase component="a" href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} sx={sx}>
        {startIcon}
        {children}
      </ButtonBase>
    )
  }
  return (
    <ButtonBase type={type} onClick={onClick} sx={sx}>
      {startIcon}
      {children}
    </ButtonBase>
  )
}
