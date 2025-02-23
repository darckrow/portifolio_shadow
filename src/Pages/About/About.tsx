import { Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import Footer from '../../componets/Footer/Footer';

interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
}

interface Education {
  period: string;
  degree: string;
  institution: string;
  description: string;
}

const experiences: Experience[] = [
  {
    period: "nov de 2024 - o momento",
    role: "TECNICO DE APOIO E SUPORTE I",
    company: "TECHCERT",
    description: "Atendimento de chamados técnicos de usuários internos e externos;Diagnóstico e resolução de problemas. Auxílio na automação de processos simples utilizando scripts ou linguagens de programação básicas. Registro e documentação de incidentes e soluções."
  },
  {
    period: "jun de 2024 - out de 2024",
    role: "técnico de apoio ao usuário de informática",
    company: "ZAK Desde 1969",
    description: "Presto assessoria e suporte aos usuários de tecnologia, gerenciar acessos, configuração e ajustes de perfil, resolução de problemas técnicos, além de instalação, configuração e manutenção preventiva e corretiva nas estações de trabalho, periféricos e sistemas de infraestrutura. Manutenção de computadores, impressoras, cabeamento, internet, Hardware e Software, Suporte remoto e presencial, Controle de estoque, inventário de TI."
  },
  {
    period: "mar de 2023 - jun de 2024",
    role: "Estagiario de TI",
    company:"ZAK Desde 1969",
    description:"Presto assessoria e suporte aos usuários de tecnologia, gerenciar acessos, configuração e ajustes de perfil, resolução de problemas técnicos, além de instalação, configuração e manutenção preventiva e corretiva nas estações de trabalho, periféricos e sistemas de infraestrutura. Manutenção de computadores, impressoras, cabeamento, internet, Hardware e Software, Suporte remoto e presencial, Controle de estoque, inventário de TI." 
  },
  {
    period: "ago de 2023 - o momento",
    role: "Desenvolvedor freelancer",
    company: "-",
    description: "Atuação com desenvolvedor freelance"
  }
];

const education: Education[] = [
  {
    period: "jan 2025 - Ago 2027",
    degree: "Curso Superior de Tecnologia (CST), Analise e desenvolvimento de sistemas",
    institution: "Anhanguera",
    description: "Formar profissionais capacitados para projetar, desenvolver e gerenciar sistemas computacionais. Com uma grade curricular focada em programação, banco de dados, engenharia de software e segurança da informação, o curso proporciona uma formação prática e alinhada às demandas do mercado. Os alunos aprendem linguagens como Python, Java e C#, além de metodologias ágeis e computação em nuvem. Ideal para quem deseja atuar como desenvolvedor, analista de sistemas ou especialista em tecnologia da informação."
  }
];

const skills = [
  "Bancos de Dados Relacionais com MySQL",
  "Fundamentos do Desenvolvimento Backend",
  "Princípios de Arquitetura de Software",
  "Aplicação funcional com consumo de API",
  "Introdução à Python",
  "Versionamento de Código Git",
  "Desenvolvimento Front-End",
  "Introdução à Front-end com React.JS",
  "Javascript Avançado",
  "Princípios de Design de Interface",
  "Introdução ao Desenvolvimento Web",
  "Introdução a Lógica de Programação e Fundamentos JavaScript",
  "Desenvolvimento Web com HTML e CSS",
];

export default function About() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{ flex: 1 }}>
        {/* Seção Principal */}
        <Box sx={{ 
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
            <Box sx={{ display: 'flex', p: 3, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
              <CardMedia
                component="img"
                sx={{ 
                  width: { xs: '150px', md: '200px' },
                  height: { xs: '150px', md: '200px' },
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '3px solid #ff0000',
                  mb: { xs: 2, md: 0 }
                }}
                image="https://media.licdn.com/dms/image/v2/D4E03AQH7L9GvxoDdaw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731615022146?e=1746057600&v=beta&t=1_xqnTkR0PAKRvexCxJOdXzxSKF9JdB8BS_2M1QzlBc"
                alt="Foto de Perfil"
              />
              <CardContent sx={{ flex: 1, pl: { md: 4 } }}>
                <Typography variant="h4" color="error" gutterBottom>
                  Sobre Mim
                </Typography>
                <Typography variant="body1" paragraph>
                Sou um profissional com experiência como Assistente de TI e conhecimento em HTML, CSS, JavaScript, ReactJS e Vue.js. 
                Gosto de trabalhar em equipe, resolver problemas e buscar soluções inovadoras—já implementei automações para otimizar 
                processos.
                </Typography>
                <Typography variant="body1">
                Atualmente, estou em transição para a área de desenvolvimento backend e banco de dados, focando em Python, C# e SQL. 
                Tenho boas habilidades de comunicação e atendimento, além de ser resiliente, flexível e criativo. Busco oportunidades
                 para aplicar minha paixão por programação e contribuir com soluções escaláveis e eficientes.
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Box>

        {/* Seção de Experiência */}
        <Box sx={{ padding: '20px' }}>
          <Typography variant="h4" color="error" sx={{ mb: 4, textAlign: 'center' }}>
            Experiência Profissional
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {experiences.map((exp, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{
                  backgroundColor: '#111',
                  color: 'white',
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}>
                  <CardContent>
                    <Typography color="error" gutterBottom>
                      {exp.period}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {exp.role}
                    </Typography>
                    <Typography variant="subtitle1" color="gray" gutterBottom>
                      {exp.company}
                    </Typography>
                    <Typography variant="body2">
                      {exp.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Seção de Educação */}
        <Box sx={{ padding: '20px' }}>
          <Typography variant="h4" color="error" sx={{ mb: 4, textAlign: 'center' }}>
            Educação
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {education.map((edu, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{
                  backgroundColor: '#111',
                  color: 'white',
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}>
                  <CardContent>
                    <Typography color="error" gutterBottom>
                      {edu.period}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {edu.degree}
                    </Typography>
                    <Typography variant="subtitle1" color="gray" gutterBottom>
                      {edu.institution}
                    </Typography>
                    <Typography variant="body2">
                      {edu.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Seção de Habilidades */}
        <Box sx={{ padding: '20px' }}>
          <Typography variant="h4" color="error" sx={{ mb: 4, textAlign: 'center' }}>
          Licenças e certificados
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {skills.map((skill, index) => (
              <Grid item key={index}>
                <Card sx={{
                  backgroundColor: '#111',
                  color: 'white',
                  padding: '10px 20px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#ff0000',
                    transform: 'translateY(-3px)'
                  }
                }}>
                  <Typography variant="body2">
                    {skill}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      
      <Footer />
    </Box>
  );
}