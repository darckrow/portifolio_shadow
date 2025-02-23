import { Box, Card, Typography, Grid } from '@mui/material';

const techLogos = {
  "React": "/src/assets/tech/react.svg",
  "TypeScript": "/src/assets/tech/typescript.svg",
  "Material-UI": "/src/assets/tech/mui.svg",
  "React Router": "/src/assets/tech/react-router.svg",
  "GitHub API": "/src/assets/tech/github.svg",
  "Axios": "/src/assets/tech/axios.png"
};

const technologies = [
  {
    category: "Frontend",
    techs: [
      "React",
      "TypeScript",
      "Material-UI",
      "React Router"
    ]
  },
  {
    category: "Integração",
    techs: [
      "GitHub API",
      "Axios"
    ]
  }
];

const TechSection = ({ category, techs }: { category: string; techs: string[] }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" color="error" gutterBottom>
      {category}
    </Typography>
    <Grid container spacing={1}>
      {techs.map((tech, index) => (
        <Grid item key={index}>
          <Box
            sx={{
              backgroundColor: '#333',
              padding: '4px 12px',
              borderRadius: '4px',
              color: '#fff',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                backgroundColor: '#ff0000',
                transform: 'translateY(-2px)'
              }
            }}
          >
            {techLogos[tech] && (
              <img 
                src={techLogos[tech]} 
                alt={`${tech} logo`}
                style={{
                  width: '20px',
                  height: '20px',
                  objectFit: 'contain'
                }}
              />
            )}
            <Typography variant="body2">
              {tech}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default function Resumo() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" color="error" sx={{ mb: 2, textAlign: 'center' }}>
        Tecnologias Utilizadas
      </Typography>
      
      <Card sx={{
        backgroundColor: '#111',
        padding: 2,
        border: '2px solid #333',
        borderRadius: '10px',
        transition: 'transform 0.3s ease-in-out, border-color 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.01)',
          borderColor: '#ff0000'
        }
      }}>
        {technologies.map((section, index) => (
          <TechSection 
            key={index}
            category={section.category} 
            techs={section.techs} 
          />
        ))}
      </Card>
    </Box>
  );
}