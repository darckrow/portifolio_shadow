import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, CircularProgress, Button } from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';
import CardProjetos from '../../componets/CardProjetos/CardProjetos';
import Footer from '../../componets/Footer/Footer';
import { fetchGithubRepos } from '../../services/github';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
}

export default function Projetos() {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await fetchGithubRepos('darckrow');
      setProjects(data);
    } catch (err) {
      setError('Erro ao carregar projetos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Função para obter a URL da imagem do projeto
  const getProjectImage = (name: string) => {
    // Por enquanto, vamos usar uma imagem padrão para todos os projetos
    return "https://avatars.githubusercontent.com/u/32041971?v=4";
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Box sx={{ 
          mb: 6, 
          textAlign: 'center',
          backgroundColor: '#111',
          borderRadius: '15px',
          boxShadow: '0 8px 16px rgba(255,0,0,0.1)',
          border: '3px solid black',
          p: 4,
        }}>
          <Typography variant="h3" color="error" gutterBottom>
            Meus Projetos
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, color: '#fff' }}>
            Bem-vindo à minha galeria de projetos! Aqui você encontrará uma seleção dos meus trabalhos mais relevantes,
            onde cada projeto representa uma jornada única de aprendizado e desenvolvimento.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress color="error" />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Box sx={{ 
            width: '100%', 
            px: { xs: 2, sm: 3, md: 4 },
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '3px',
              height: '100%',
              backgroundColor: '#ff0000',
              opacity: 0.3,
              zIndex: 1
            }
          }}>
            {projects.map((project, index) => (
              <Box
                key={project.id}
                sx={{
                  display: 'flex',
                  justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                  mb: 4,
                  position: 'relative',
                  '@media (max-width: 600px)': {
                    justifyContent: 'center',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    [index % 2 === 0 ? 'right' : 'left']: { xs: '0%', sm: '40%' },
                    width: { xs: '0%', sm: '10%' },
                    height: '3px',
                    backgroundColor: '#ff0000',
                    opacity: 0.3,
                    zIndex: 1,
                    display: { xs: 'none', sm: 'block' }
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: '#ff0000',
                    border: '3px solid #111',
                    boxShadow: '0 0 0 3px rgba(255,0,0,0.3)',
                    zIndex: 2,
                    display: { xs: 'none', sm: 'block' }
                  }
                }}
              >
                <Box
                  sx={{
                    width: { xs: '95%', sm: '70%', md: '45%' },
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: '15px',
                    backgroundColor: '#111',
                    boxShadow: '0 8px 16px rgba(255,0,0,0.1)',
                    border: '3px solid black',
                    color: '#fff',
                    transition: 'transform 0.3s ease-in-out',
                    position: 'relative',
                    zIndex: 3,
                    '&:hover': {
                      transform: 'scale(1.02)',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={getProjectImage(project.name)}
                    alt={project.name}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'contain',
                      borderRadius: '12px',
                      mb: 2,
                      p: 2
                    }}
                  />
                  
                  <Typography variant="h5" color="error" gutterBottom>
                    {project.name}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 3, color: '#fff' }}>
                    {project.description || 'Sem descrição disponível'}
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="error" gutterBottom>
                      Tecnologias Utilizadas:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {[project.language, ...(project.topics || [])].filter(Boolean).map((tech, index) => (
                        <Box
                          key={index}
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: '8px',
                            backgroundColor: 'rgba(255,0,0,0.1)',
                            border: '1px solid #ff0000',
                            color: '#fff',
                          }}
                        >
                          {tech}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {project.html_url && (
                      <Button
                        variant="contained"
                        color="error"
                        href={project.html_url}
                        target="_blank"
                        startIcon={<GitHub />}
                        sx={{
                          borderRadius: '8px',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: 'rgba(255,0,0,0.8)',
                          }
                        }}
                      >
                        Ver no GitHub
                      </Button>
                    )}
                    {project.homepage && (
                      <Button
                        variant="outlined"
                        color="error"
                        href={project.homepage}
                        target="_blank"
                        startIcon={<Launch />}
                        sx={{
                          borderRadius: '8px',
                          textTransform: 'none',
                          borderColor: '#ff0000',
                          color: '#fff',
                          '&:hover': {
                            borderColor: '#ff0000',
                            backgroundColor: 'rgba(255,0,0,0.1)',
                          }
                        }}
                      >
                       
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 6, 
          mb: 4 
        }}>
          <Button
            variant="contained"
            color="error"
            href="https://github.com/darckrow"
            target="_blank"
            startIcon={<GitHub />}
            sx={{
              py: 2,
              px: 4,
              borderRadius: '12px',
              fontSize: '1.1rem',
              textTransform: 'none',
              backgroundColor: '#111',
              border: '3px solid #ff0000',
              boxShadow: '0 4px 12px rgba(255,0,0,0.2)',
              '&:hover': {
                backgroundColor: '#ff0000',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(255,0,0,0.3)',
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            Ver todos os projetos no GitHub
          </Button>
        </Box>

      </Container>
      <Footer />
    </Box>
  );
}
