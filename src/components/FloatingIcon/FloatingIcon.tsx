import { Box, Tooltip } from '@mui/material';
import PixelBox from '../arcade/PixelBox';
import { arcade } from '../../theme/theme';
import floatingGif from '../../assets/flutuante.gif';

export default function FloatingIcon() {
  return (
    <Tooltip
      title={
        <PixelBox highlight sx={{ px: 2, py: 1, fontSize: '0.85rem', color: arcade.yellow }}>
          Vamos pro meu GitHub?
        </PixelBox>
      }
      placement="left"
      slotProps={{
        tooltip: { sx: { backgroundColor: 'transparent', p: 0, maxWidth: 'none' } },
      }}
    >
      <Box
        component="a"
        href="https://github.com/darckrow"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          display: { xs: 'none', sm: 'block' },
          bottom: { xs: '10px', sm: '20px' },
          right: { xs: '10px', sm: '20px' },
          width: { xs: '80px', sm: '100px' },
          height: { xs: '80px', sm: '100px' },
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': { transform: 'scale(1.1)' },
        }}
      >
        <Box
          component="img"
          src={floatingGif}
          alt="Shadow — ir para o GitHub"
          className="pixelated"
          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>
    </Tooltip>
  );
}
