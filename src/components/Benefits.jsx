import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

import site from '../config/site';
import SectionHeading from './common/SectionHeading';
import Icon from './common/Icon';

export default function Benefits() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { benefits, rating } = site;

  if (benefits.items.length === 0) return null;

  return (
    <Box
      component="section"
      id="benefits"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: site.colors.background }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          {/* Imagen */}
          {benefits.image && (
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                sx={{ position: 'relative' }}
              >
                <Box
                  component="img"
                  src={benefits.image}
                  alt={benefits.title || site.brand.name}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    display: 'block',
                    borderRadius: 4,
                    border: `1px solid ${alpha('#FFFFFF', 0.09)}`,
                    boxShadow: '0 40px 90px -45px #000',
                  }}
                />

                {/* Sello de valoración sobre la imagen */}
                {rating.value && (
                  <Stack
                    spacing={0.2}
                    sx={{
                      position: 'absolute',
                      right: { xs: 12, md: -22 },
                      bottom: { xs: -18, md: 28 },
                      px: 2.5,
                      py: 1.6,
                      borderRadius: 3,
                      textAlign: 'center',
                      bgcolor: alpha(site.colors.surface, 0.95),
                      border: `1px solid ${alpha(green, 0.3)}`,
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 24px 50px -24px #000',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: theme.typography.h1.fontFamily,
                        fontWeight: 900,
                        color: green,
                        fontSize: '1.6rem',
                        lineHeight: 1,
                      }}
                    >
                      ★ {rating.value}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', maxWidth: 130 }}>
                      {rating.count && `+${rating.count} `}
                      {rating.label}
                    </Typography>
                  </Stack>
                )}
              </Box>
            </Grid>
          )}

          {/* Lista de beneficios */}
          <Grid size={{ xs: 12, md: benefits.image ? 7 : 12 }}>
            <SectionHeading
              eyebrow={benefits.eyebrow}
              title={benefits.title}
              align="left"
              maxWidth="100%"
              sx={{ mb: { xs: 3, md: 4 } }}
            />

            <Stack spacing={2}>
              {benefits.items.map((benefit, index) => (
                <Stack
                  key={benefit.title}
                  component={motion.div}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  direction="row"
                  spacing={2.2}
                  sx={{
                    p: { xs: 2.2, md: 2.6 },
                    borderRadius: 3,
                    bgcolor: alpha('#FFFFFF', 0.03),
                    border: `1px solid ${alpha('#FFFFFF', 0.06)}`,
                    borderLeft: `3px solid ${green}`,
                    transition: 'background-color .3s ease',
                    '&:hover': { bgcolor: alpha(green, 0.06) },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      flexShrink: 0,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      color: green,
                      bgcolor: alpha(green, 0.12),
                    }}
                  >
                    <Icon name={benefit.icon} sx={{ fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '1.08rem', mb: 0.5 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {benefit.text}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
