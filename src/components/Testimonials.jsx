import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';

import site from '../config/site';
import { initialsOf } from '../helpers';
import SectionHeading from './common/SectionHeading';

export default function Testimonials() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { testimonials } = site;

  if (!testimonials.enabled || testimonials.items.length === 0) return null;

  const columns = Math.min(testimonials.items.length, 3);

  return (
    <Box
      component="section"
      id="testimonials"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: site.colors.background }}
    >
      <Container maxWidth="lg">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />

        <Grid container spacing={{ xs: 3, md: 3.5 }} justifyContent="center">
          {testimonials.items.map((testimonial, index) => (
            <Grid key={testimonial.name || index} size={{ xs: 12, sm: 6, md: 12 / columns }}>
              <Stack
                component={motion.div}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  position: 'relative',
                  height: '100%',
                  p: { xs: 3, md: 3.5 },
                  borderRadius: 4,
                  bgcolor: alpha('#FFFFFF', 0.035),
                  border: `1px solid ${alpha('#FFFFFF', 0.07)}`,
                  transition: 'border-color .3s ease, transform .3s ease',
                  '&:hover': { borderColor: alpha(green, 0.35), transform: 'translateY(-5px)' },
                }}
              >
                <FormatQuoteRoundedIcon
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    top: 14,
                    right: 16,
                    fontSize: 54,
                    color: alpha(green, 0.12),
                  }}
                />

                {testimonial.rating > 0 && (
                  <Stack direction="row" spacing={0.2} sx={{ mb: 1.8 }}>
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <StarRoundedIcon key={starIndex} sx={{ fontSize: 19, color: green }} />
                    ))}
                  </Stack>
                )}

                <Typography sx={{ fontSize: '0.98rem', lineHeight: 1.7, mb: 3, flexGrow: 1 }}>
                  “{testimonial.text}”
                </Typography>

                <Stack direction="row" spacing={1.6} alignItems="center">
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: '50%',
                      flexShrink: 0,
                      display: 'grid',
                      placeItems: 'center',
                      overflow: 'hidden',
                      bgcolor: alpha(green, 0.16),
                      color: green,
                      fontWeight: 800,
                      fontFamily: theme.typography.h1.fontFamily,
                      border: `1px solid ${alpha(green, 0.3)}`,
                    }}
                  >
                    {testimonial.avatar ? (
                      <Box
                        component="img"
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        loading="lazy"
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      initialsOf(testimonial.name)
                    )}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.98rem' }}>
                      {testimonial.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.83rem' }}>
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
