import { Box, Container, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

import site from '../config/site';
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
        py: { xs: 8, md: 13 },
        bgcolor: site.colors.backgroundDeep,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow={features.eyebrow}
          title={features.title}
          subtitle={features.subtitle}
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
                  bgcolor: alpha('#FFFFFF', 0.035),
                  border: `1px solid ${alpha('#FFFFFF', 0.07)}`,
                  transition: 'transform .35s ease, border-color .35s ease, background-color .35s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: alpha(green, 0.45),
                    bgcolor: alpha(green, 0.05),
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2.5,
                    display: 'grid',
                    placeItems: 'center',
                    mb: 2.2,
                    color: green,
                    bgcolor: alpha(green, 0.12),
                    border: `1px solid ${alpha(green, 0.22)}`,
                  }}
                >
                  <Icon name={feature.icon} sx={{ fontSize: 27 }} />
                </Box>

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
