import { Box, Container, Typography } from '@mui/material';
import { arcade } from '../../theme/theme';

import linkedinIcon from '../../assets/social/linkedin.svg';
import githubIcon from '../../assets/tech/github.svg';
import emailIcon from '../../assets/social/email.svg';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: linkedinIcon,
    url: 'https://www.linkedin.com/in/ramon-matheus-3344041b1/'
  },
  {
    name: 'GitHub',
    icon: githubIcon,
    url: 'https://github.com/darckrow'
  },
  {
    name: 'Email',
    icon: emailIcon,
    url: 'mailto:ramonmateus30@gmail.com'
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: arcade.bg,
        borderTop: `3px solid ${arcade.redDark}`,
        color: arcade.text,
        py: 5,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {socialLinks.map((social) => (
              <Box
                key={social.name}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  backgroundColor: arcade.surface,
                  border: `3px solid ${arcade.border}`,
                  borderRadius: 0,
                  '&:hover': { borderColor: arcade.red }
                }}
              >
                <img
                  src={social.icon}
                  alt=""
                  style={{ width: '24px', height: '24px', filter: 'brightness(0) invert(1)' }}
                />
              </Box>
            ))}
          </Box>

          <Typography sx={{ fontFamily: arcade.pixelFont, fontSize: '10px', color: arcade.text }}>
            Vamos trabalhar juntos?
          </Typography>

          <Typography sx={{ fontFamily: arcade.bodyFont, fontSize: '0.8rem', color: arcade.textMuted }}>
            © {currentYear} Ramon Matheus
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
