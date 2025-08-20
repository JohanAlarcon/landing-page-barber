import { Box, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import BuildIcon from '@mui/icons-material/Build';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const features = [
  {
    icon: <BuildIcon fontSize="large" />,
    title: 'Panel Administrativo',
    description:
      'Administra inventario, equipo, ventas y reportes desde un solo lugar.',
  },
  {
    icon: <ScheduleIcon fontSize="large" />,
    title: 'Gestión de citas',
    description:
      'Tus clientes reservan online, reciben confirmaciones.',
  },
  {
    icon: <BarChartIcon fontSize="large" />,
    title: 'Reportes Avanzados',
    description:
      'Visualiza ingresos, servicios y rendimiento para decidir con datos.',
  },
  {
    icon: <MonetizationOnIcon fontSize="large" />,
    title: 'Control de ventas',
    description: 'Registra servicios y productos y sigue tus ventas al instante.',
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { when: 'beforeChildren', staggerChildren: 0.2, duration: 0.6 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function Features() {
  const theme = useTheme();

  return (
    <Box
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      sx={{
        position: 'relative',
        py: { xs: 5, md: 9 },
        px: { xs: 2, sm: 4, md: 6 },
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
      }}
    >
      {/* Forma decorativa superior */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          left: -80,
          width: 200,
          height: 200,
          bgcolor: theme.palette.primary.light,
          borderRadius: '50%',
          opacity: 0.15,
        }}
      />
      {/* Forma decorativa inferior */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -40,
          right: -60,
          width: 160,
          height: 160,
          bgcolor: theme.palette.warning.main,
          borderRadius: '50%',
          opacity: 0.15,
        }}
      />

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600, mb: { xs: 4, md: 6 }, color: theme.palette.text.primary}}
      >
        Características destacadas
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 4, md: 6, xl: 3 }} justifyContent="center">
        {features.map((feature, idx) => (
          <Grid item xs={12} sm={4} md={4} key={idx} display="flex" justifyContent="center">
            <motion.div
              variants={itemVariants}
              whileHover={{ translateY: -8, boxShadow: theme.shadows[6], borderRadius: '50%' }}
              whileTap={{ scale: 0.97 }}
              style={{ width: '100%' }}
            >
              <Box
                sx={{
                  width: { xs: 350, sm: 400, md: 450, lg: 550, xl: 650 },
                  minHeight: 260,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2 ,
                  bgcolor: theme.palette.common.white,
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: 'all 0.3s ease',
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    display: 'inline-flex',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, minHeight: 64 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}