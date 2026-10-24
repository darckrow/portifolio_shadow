import { Box, Tooltip } from '@mui/material';
import floatingGif from '../../assets/flutuante.gif';

export default function FloatingIcon() {
  return (
    <Tooltip 
      title="Vamos pro meu GitHub?" 
      placement="left"
      sx={{
        '& .MuiTooltip-tooltip': {
          backgroundColor: '#111',
          color: '#fff',
          border: '2px solid #ff0000',
          fontSize: '1rem',
          padding: '8px 16px',
          borderRadius: '8px',
        }
      }}
    >
      <Box
        component="a"
        href="https://github.com/darckrow"
        target="_blank"
        sx={{
          position: 'fixed',
          bottom: { xs: '10px', sm: '20px' },
          right: { xs: '10px', sm: '20px' },
          width: { xs: '80px', sm: '100px' },
          height: { xs: '80px', sm: '100px' },
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        <Box
          component="img"
          src={floatingGif}
          alt="GitHub"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Tooltip>
  );
}
