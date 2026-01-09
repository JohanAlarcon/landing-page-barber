import { Box, Grid, Typography, Button, useTheme, Container, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { handleDemoClick } from '../helpers';
import VideoModal from './VideoModal';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.2, duration: 0.8 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const theme = useTheme();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <Box
      component={motion.section}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        pt: { xs: 12, md: 0 }, // Mobile padding for fixed navbar
        background: `linear-gradient(180deg, rgba(18,18,18,0.7) 0%, rgba(18,18,18,1) 100%), 
                     url('${process.env.PUBLIC_URL}/images/hero-bg.webp') center/cover no-repeat`,
        // Fallback color if image fails
        backgroundColor: '#121212'
      }}
    >
      {/* Overlay Oscuro Adicional para asegurar legibilidad */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.6)' }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7} lg={6}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 2,
                  mb: 2,
                  textTransform: 'uppercase',
                  fontSize: { md: '1.1rem', lg: '1.25rem' }
                }}
              >
                Sistema de Gestión Profesional
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem', xl: '6.5rem' },
                  lineHeight: 1.1,
                  fontWeight: 700,
                  mb: 3,
                  color: '#fff',
                  maxWidth: { lg: '800px' }
                }}
              >
                DOMINA TU NEGOCIO CON{' '}
                <Box component="span" sx={{ color: theme.palette.primary.main }}>
                  STYLECLOUD
                </Box>
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  mb: 5,
                  maxWidth: 600,
                  color: 'text.secondary',
                  fontWeight: 400,
                  fontSize: { xs: '1rem', md: '1.25rem', lg: '1.4rem' },
                  lineHeight: 1.6
                }}
              >
                Controla cortes diarios, citas online y caja desde una sola plataforma.
                Optimiza el tiempo de tus barberos y ofrécele a tus clientes una experiencia premium.
              </Typography>
            </motion.div>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              component={motion.div}
              variants={itemVariants}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={handleDemoClick}
                sx={{ py: 1.8, px: 5, fontSize: { md: '1.1rem', lg: '1.2rem' } }}
              >
                Ver Demo Online
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={() => setVideoModalOpen(true)}
                sx={{ py: 1.8, px: 5, fontSize: { md: '1.1rem', lg: '1.2rem' }, color: '#fff', borderColor: '#fff' }}
              >
                Ver Video
              </Button>
            </Stack>
          </Grid>

          {/* Empty column for spacing or image if we want one on the right */}
          <Grid item xs={12} md={5} lg={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {/* Optional: Add a floating UI mockup image here later */}
            <motion.img
              src={`${process.env.PUBLIC_URL}/images/software/imagen_ia_1.webp`}
              alt="Dashboard Mockup"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                width: '100%',
                maxWidth: '550px',
                height: 'auto',
                borderRadius: '16px',
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <VideoModal
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </Box>
  );
}