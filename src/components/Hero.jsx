import { Box, Grid, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { handleDemoClick } from '../helpers';
import VideoModal from './VideoModal';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.3, duration: 0.8 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  const theme = useTheme();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleVideoClick = () => {
    setVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setVideoModalOpen(false);
  };

  return (
    <Box
      component={motion.section}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}CC 0%, ${theme.palette.secondary.main}CC 50%), 
                     url('${process.env.PUBLIC_URL}/images/hero-bg.jpg') center/cover no-repeat`,
        color: '#fff'
      }}
    >
      <Box
        component={motion.div}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        sx={{ position: 'absolute', height: { xs: 80, md: 120 }, bgcolor: theme.palette.background.default, clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0% 100%)', border: 'none', boxShadow: '0 -2px 10px rgba(0,0,0,0.2)' }}
      />

      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
                p: 4
              }}
            >
              Administra tu salón con {' '}
              <Box component="span" sx={{ color: theme.palette.warning.main }}>
                StyleCloud
              </Box>
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: 500, opacity: 0.85, fontWeight: 400, p: 4 }}>
              Citas, ventas y reportes en un solo lugar para hacer crecer tu barbería, peluquería o salón de belleza.
            </Typography>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', gap: theme.spacing(2), padding: theme.spacing(0, 4), flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="warning"
                size="large"
                sx={{ px: 4 }}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoClick}
              >
                Ver Demo de Citas
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ px: 4, borderWidth: 2 }}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVideoClick}
              >
                Ver Video de Presentación
              </Button>
            </Box>

            {/* Notas contextuales */}
            <Box sx={{ mt: 2, opacity: 0.8 }}>
              <Typography variant="caption" sx={{ display: 'block', fontSize: { xs: '0.95rem', md: '0.875rem' } }}>
                • Demo pública: gestión de citas
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', fontSize: { xs: '0.95rem', md: '0.875rem' } }}>
                • Panel completo: solicita credenciales
              </Typography>
            </Box>
          </motion.div>
        </Grid>

        {/* ILUSTRACIÓN */}
        <Grid item size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.img
            src={`${process.env.PUBLIC_URL}/images/illustration-barber.png`}
            alt="Ilustración StyleCloud - Sistema de gestión para salones"
            variants={itemVariants}
            style={{
              width: '50%',
              maxWidth: 500,
              height: 'auto',
            }}
          />
        </Grid>
      </Grid>

      <Box
        component={motion.div}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        sx={{
          position: 'relative',
          bottom: { xs: 16, md: 32 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        <ArrowDownwardIcon sx={{ fontSize: 36, opacity: 0.7 }} />
      </Box>
      <VideoModal
        open={videoModalOpen}
        onClose={handleCloseVideo}
      />
    </Box>

  );
}