import { Box, Typography, Button, useTheme, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { handleDemoClick } from '../helpers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CTA() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        textAlign: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #B8860B 100%)`, // Gold Gradient
        color: '#000',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Pattern Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(#000 10%, transparent 11%)`,
          backgroundSize: '20px 20px'
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 800, mb: 3 }}
          >
            ¿Listo para Transformar tu Barbería?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 6, opacity: 0.9, fontWeight: 500 }}
          >
            Únete a la nueva era de barberías digitales. Deja el papel y lápiz en el pasado.
            Prueba StyleCloudBarber hoy mismo sin compromisos.
          </Typography>

          <Button
            variant="contained"
            color="secondary" // White button on Gold background
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={handleDemoClick}
            sx={{
              py: 2,
              px: 6,
              fontSize: '1.2rem',
              color: theme.palette.primary.main,
              bgcolor: '#000', // Black button for contrast
              '&:hover': {
                bgcolor: '#222',
                scale: 1.05
              }
            }}
          >
            Obtener Acceso Ahora
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}