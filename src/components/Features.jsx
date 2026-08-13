import { Box, Container, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

import site from '../config/site';
import { litSurface, seam } from '../styles/surfaces';
import SectionHeading from './common/SectionHeading';
import Icon from './common/Icon';

export default function Features() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { features } = site;

  if (features.items.length === 0) return null;

  return (
    <Box
      component="section"
      id="features"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 14 },
        background: seam(site.colors.background, site.colors.backgroundDeep),
      }}
    >
      <Container maxWidth="lg">
        {/* Alineado a la izquierda: rompe el metrónomo de secciones centradas */}
        <SectionHeading
          eyebrow={features.eyebrow}
          title={features.title}
          subtitle={features.subtitle}
          align="left"
          maxWidth={640}
        />

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {features.items.map((feature, index) => (
            <Grid key={feature.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
                sx={{
                  height: '100%',
                  p: { xs: 3, md: 3.5 },
                  borderRadius: 4,
                  ...litSurface(),
                  transition: 'border-top-color .35s ease, background .35s ease',
                  // No se desplaza: la luz simplemente lo alcanza más
                  '&:hover': {
                    borderTopColor: alpha('#FFFFFF', 0.18),
                    background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.075)}, ${alpha('#FFFFFF', 0.02)})`,
                  },
                }}
              >
                {/* Icono desnudo, sin cuadrito teñido: se apoya en el aire */}
                <Icon name={feature.icon} sx={{ fontSize: 30, color: green, mb: 2.2 }} />

                <Typography variant="h6" sx={{ mb: 1, fontSize: '1.08rem' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {feature.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
