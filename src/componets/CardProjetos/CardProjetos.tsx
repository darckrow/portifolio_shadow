import { Card, CardContent, CardMedia, Typography, Box, Button, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

interface CardProjetosProps {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
  technologies: string[];
}

export default function CardProjetos({ 
  title, 
  description, 
  imageUrl, 
  githubUrl, 
  demoUrl,
  technologies 
}: CardProjetosProps) {
  return (
    <Card sx={{
      width: '100%',
      height: '450px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#111',
      color: 'white',
      border: '2px solid #333',
      borderRadius: '15px',
      transition: 'transform 0.3s ease-in-out, border-color 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.02)',
        borderColor: '#ff0000'
      }
    }}>
      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt={title}
        sx={{
          objectFit: 'cover',
          borderBottom: '1px solid #333'
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="error">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#fff', mb: 2 }}>
          {description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="error" sx={{ mb: 1 }}>
            Tecnologias:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {technologies.map((tech, index) => (
              <Typography
                key={index}
                variant="caption"
                sx={{
                  backgroundColor: '#333',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  color: '#fff'
                }}
              >
                {tech}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<GitHubIcon />}
            href={githubUrl}
            target="_blank"
            fullWidth
          >
            GitHub
          </Button>
          {demoUrl && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<LaunchIcon />}
              href={demoUrl}
              target="_blank"
              fullWidth
            >
              Demo
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
