import { Box, Container, IconButton, Typography, Link } from '@mui/material';

// Importando as imagens
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
        backgroundColor: '#111',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}
        >
          {/* Social Links */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center'
            }}
          >
            {socialLinks.map((social) => (
              <IconButton
                key={social.name}
                component={Link}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: '#333',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#ff0000',
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                <img
                  src={social.icon}
                  alt={`${social.name} icon`}
                  style={{
                    width: '24px',
                    height: '24px',
                    filter: 'brightness(0) invert(1)'
                  }}
                />
              </IconButton>
            ))}
          </Box>

          {/* Contact Info */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" color="white" gutterBottom>
              Vamos trabalhar juntos?
            </Typography>
            <Typography variant="body2" color="gray">
              Entre em contato através das redes sociais ou email
            </Typography>
          </Box>

          {/* Copyright */}
          <Typography variant="body2" color="gray">
            {currentYear} Ramon Matheus. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
