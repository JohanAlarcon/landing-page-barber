import { Box, Container, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

import site from '../config/site';
import SectionHeading from './common/SectionHeading';

export default function HowItWorks() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { steps } = site;

  if (steps.items.length === 0) return null;

  return (
    <Box
      component="section"
      id="how"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: site.colors.background }}
    >
      <Container maxWidth="lg">
        <SectionHeading eyebrow={steps.eyebrow} title={steps.title} />

        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ position: 'relative' }}>
          {/* Línea que conecta los pasos en escritorio */}
          <Box
            aria-hidden
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 46,
              left: '12%',
              right: '12%',
              height: 2,
              background: `linear-gradient(90deg, transparent, ${alpha(green, 0.4)}, transparent)`,
            }}
          />

          {steps.items.map((step, index) => (
            <Grid key={step.title} size={{ xs: 12, md: 12 / Math.min(steps.items.length, 4) }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
              >
                <Box
                  sx={{
                    width: 62,
                    height: 62,
                    mx: 'auto',
                    mb: 2.5,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontFamily: theme.typography.h1.fontFamily,
                    fontWeight: 900,
                    fontSize: '1.5rem',
                    color: '#04241A',
                    bgcolor: green,
                    boxShadow: `0 0 0 10px ${alpha(green, 0.1)}, 0 18px 40px -18px ${alpha(green, 0.9)}`,
                  }}
                >
                  {index + 1}
                </Box>

                <Typography variant="h6" sx={{ mb: 1, fontSize: '1.15rem' }}>
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', maxWidth: 320, mx: 'auto' }}
                >
                  {step.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
