import { Box, Grid, Typography, useTheme, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';

const features = [
  {
    icon: <CalendarMonthIcon fontSize="large" />,
    title: 'Agenda Inteligente',
    description: 'Evita inasistencias con recordatorios automáticos. Tus clientes reservan 24/7 sin interrumpirte.',
  },
  {
    icon: <PointOfSaleIcon fontSize="large" />,
    title: 'Control de Caja',
    description: 'Monitorea el efectivo, tarjeta y transferencias. Cierra caja al final del día sin errores.',
  },
  {
    icon: <GroupIcon fontSize="large" />,
    title: 'Gestión de Equipo',
    description: 'Calcula comisiones automáticamente y mide el rendimiento de cada barbero individualmente.',
  },
  {
    icon: <BarChartIcon fontSize="large" />,
    title: 'Reportes Visuales',
    description: 'Entiende tus números con gráficos claros. Conoce tus horas pico y servicios más rentables.',
  },
  {
    icon: <ContentCutIcon fontSize="large" />,
    title: 'Gestión de Servicios',
    description: 'Personaliza tu menú de servicios, duraciones y precios por barbero si es necesario.',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Features() {
  const theme = useTheme();

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          align="center"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}
        >
          Características
        </Typography>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: 8, color: '#fff' }}
        >
          Todo lo que necesitas para crecer
        </Typography>

        <Grid
          container
          spacing={{ xs: 4, lg: 6 }}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <motion.div variants={itemVariants} style={{ height: '100%' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 4, lg: 5 },
                    height: '100%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 4,
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.06)',
                      transform: { xs: 'translateY(-8px)', lg: 'translateY(-12px) scale(1.02)' },
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 20px 40px -10px rgba(0,0,0,0.6)`
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 60, lg: 70 },
                      height: { xs: 60, lg: 70 },
                      borderRadius: '50%',
                      bgcolor: 'rgba(212, 175, 55, 0.1)',
                      color: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}