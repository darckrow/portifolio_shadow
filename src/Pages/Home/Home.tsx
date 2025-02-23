import { Card, CardContent, CardMedia, Typography, Box, Grid } from '@mui/material';
import CardProjetos from '../../componets/CardProjetos/CardProjetos';
import { useEffect, useState } from 'react';
import { fetchGithubRepos } from '../../services/github';
import Resumo from '../../componets/Resumo/Resumo';
import Footer from '../../componets/Footer/Footer';
import welcomeGif from '../../assets/icon2.gif';

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
}

export default function Home() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);

  useEffect(() => {
    const loadRepos = async () => {
      const githubRepos = await fetchGithubRepos('darckrow');
      setRepos(githubRepos);
    };

    loadRepos();
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ flex: 1 }}>
        <Box id='welcome' sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '20px',
        }}>
          <Card sx={{ 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '15px',
            boxShadow: '0 8px 16px rgba(255,0,0,0.1)',
            backgroundColor: '#111',
            color: 'white',
            border: '3px solid black'
          }}>
            <Box sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ 
                  width: '200px',
                  objectFit: 'contain',
                  padding: '20px',
                  backgroundColor: '#111'
                }}
                image={welcomeGif}
                alt="Portfolio"
              />
              <CardContent sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '40px'
              }}>
                <Typography gutterBottom variant="h4" component="div" color="error">
                  Bem-vindo ao Meu Portfólio
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff' }} paragraph>
                  Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais únicas.
                  Especializado em React, TypeScript, e desenvolvimento web moderno.
                </Typography>
              </CardContent>
            </Box>
            <Box sx={{ px: 4, pb: 4 }}>
              <Resumo />
            </Box>
          </Card>
        </Box>

        <Box id='cardProjetos' sx={{ padding: '20px' }}>
          <Typography variant="h4" color="error" sx={{ mb: 4, textAlign: 'center' }}>
            Meus Projetos
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {repos.map(repo => (
              <Grid item xs={12} sm={6} md={4} key={repo.id}>
                <CardProjetos
                  title={repo.name}
                  description={repo.description || 'No description available'}
                  imageUrl="/src/assets/logo.png" // You might want to use a default image or fetch repo image
                  githubUrl={repo.html_url}
                  demoUrl={repo.homepage}
                  technologies={[repo.language, ...(repo.topics || [])].filter(Boolean)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}