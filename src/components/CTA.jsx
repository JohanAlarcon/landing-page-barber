import { Box, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { handleDemoClick, handleVideoClick } from '../helpers';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.2, duration: 0.8 },
  },
};
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function CTA() {
  const theme = useTheme();

  return (
    <Box
      component={motion.section}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        py: { xs: 10, md: 14 },
        px: { xs: 2, sm: 4, md: 6 },
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: theme.palette.primary.contrastText,
      }}
    >
      {/* Forma decorativa superior */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          left: '-20%',
          width: '140%',
          height: 200,
          bgcolor: theme.palette.primary.light,
          borderRadius: '50%',
          opacity: 0.12,
        }}
      />

      {/* Texto */}
      <motion.div variants={textVariants}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
        >
          ¿Listo para llevar tu salón al siguiente nivel?
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            maxWidth: 600,
            mx: 'auto',
            mb: { xs: 4, md: 6 },
            opacity: 0.9,
          }}
        >
          Prueba la demo pública de citas desde la web y conoce el flujo real de reservas. ¿Quieres ver ventas y reportes en el panel administrativo? Solicita credenciales y te habilitamos un acceso de prueba para explorar todo sin instalar nada.
        </Typography>
      </motion.div>

      {/* Botones */}
      <Box
        component={motion.div}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          color="warning"
          size="large"
          sx={{ px: 4 }}
          onClick={handleDemoClick}
        >
          Ver demo de citas
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{ px: 4, borderWidth: 2 }}
          onClick={handleVideoClick}
        >
          Ver video de presentación
        </Button>
      </Box>

      {/* Forma decorativa inferior */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -60,
          right: '-10%',
          width: 180,
          height: 180,
          bgcolor: theme.palette.warning.main,
          borderRadius: '50%',
          opacity: 0.12,
        }}
      />
    </Box>
  );
}