import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Email, WhatsApp } from '@mui/icons-material';
import Footer from '../../componets/Footer/Footer';

export default function Contatos() {
  const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleMethodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMethod: 'email' | 'whatsapp' | null,
  ) => {
    if (newMethod !== null) {
      setContactMethod(newMethod);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (contactMethod === 'whatsapp') {
      // Formatar mensagem para WhatsApp
      const message = `Nome: ${formData.name}%0A
Assunto: ${formData.subject}%0A
Mensagem: ${formData.message}`;
      
      window.open(`https://wa.me/31973102866?text=${message}`, '_blank');
    } else {
      // Formatar para email
      const mailtoLink = `mailto:ramonmateus30@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nome: ${formData.name}\n\n${formData.message}`)}`;
      window.location.href = mailtoLink;
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',

    }}>
      <Container maxWidth="md" sx={{ flex: 1, py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{
          backgroundColor: '#111',
          borderRadius: '15px',
          boxShadow: '0 8px 16px rgba(255,0,0,0.1)',
          border: '3px solid black',
          p: { xs: 2, sm: 3, md: 4 },
          mb: 4
        }}>
          <Typography variant="h3" color="error" gutterBottom align="center" sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}>
            Entre em Contato
          </Typography>
          <Typography variant="h6" sx={{ 
            color: '#fff', 
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
          }} align="center">
            Escolha como prefere falar comigo
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <ToggleButtonGroup
              value={contactMethod}
              exclusive
              onChange={handleMethodChange}
              orientation={window.innerWidth < 400 ? 'vertical' : 'horizontal'}
              aria-label="contact method"
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                '& .MuiToggleButton-root': {
                  color: '#fff',
                  borderColor: '#ff0000',
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.5 },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255,0,0,0.2)',
                    color: '#ff0000',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255,0,0,0.1)',
                  },
                },
              }}
            >
              <ToggleButton value="email" aria-label="email">
                <Email sx={{ mr: 1 }} /> Email
              </ToggleButton>
              <ToggleButton value="whatsapp" aria-label="whatsapp">
                <WhatsApp sx={{ mr: 1 }} /> WhatsApp
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(255,0,0,0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff0000',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#fff',
                },
              }}
            />

            {contactMethod === 'email' && (
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255,0,0,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff0000',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                  },
                }}
              />
            )}

            {contactMethod === 'whatsapp' && (
              <TextField
                fullWidth
                label="Telefone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255,0,0,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff0000',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                  },
                }}
              />
            )}

            <TextField
              fullWidth
              label="Assunto"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(255,0,0,0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff0000',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#fff',
                },
              }}
            />

            <TextField
              fullWidth
              label="Mensagem"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(255,0,0,0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff0000',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#fff',
                },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="error"
                size="large"
                startIcon={contactMethod === 'email' ? <Email /> : <WhatsApp />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  backgroundColor: '#111',
                  border: '2px solid #ff0000',
                  '&:hover': {
                    backgroundColor: '#ff0000',
                  },
                }}
              >
                {contactMethod === 'email' ? 'Enviar Email' : 'Enviar Mensagem'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
