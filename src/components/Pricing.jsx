import { useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';

import site, { formatPrice, monthlyPriceFor } from '../config/site';
import { openWhatsApp, whatsappPlanMessage } from '../helpers';
import SectionHeading from './common/SectionHeading';

/** Interruptor mensual / anual. */
function BillingToggle({ billing, onChange }) {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { monthlyLabel, annualLabel, annualDiscount } = site.pricing;

  const options = [
    { id: 'monthly', label: monthlyLabel },
    { id: 'annual', label: annualLabel },
  ];

  return (
    <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ mb: { xs: 4, md: 6 } }}>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          p: 0.6,
          borderRadius: 999,
          bgcolor: alpha('#FFFFFF', 0.05),
          border: `1px solid ${alpha('#FFFFFF', 0.1)}`,
        }}
      >
        {options.map((option) => {
          const isActive = billing === option.id;
          return (
            <Box
              key={option.id}
              component="button"
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={isActive}
              sx={{
                position: 'relative',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                px: { xs: 2.2, sm: 3 },
                py: 1,
                borderRadius: 999,
                fontFamily: 'inherit',
                fontWeight: 800,
                fontSize: '0.92rem',
                color: isActive ? '#04241A' : 'text.secondary',
                transition: 'color .3s ease',
              }}
            >
              {isActive && (
                <Box
                  component={motion.span}
                  layoutId="billing-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  sx={{ position: 'absolute', inset: 0, borderRadius: 999, bgcolor: green, zIndex: 0 }}
                />
              )}
              <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>{option.label}</Box>
            </Box>
          );
        })}
      </Stack>

      <Box
        sx={{
          px: 1.4,
          py: 0.5,
          borderRadius: 999,
          bgcolor: alpha(green, 0.14),
          border: `1px solid ${alpha(green, 0.35)}`,
          color: green,
          fontWeight: 800,
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
        }}
      >
        −{annualDiscount}%
      </Box>
    </Stack>
  );
}

export default function Pricing() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { pricing, freeTrial } = site;
  const [billing, setBilling] = useState('monthly');

  if (pricing.plans.length === 0) return null;

  const columns = Math.min(pricing.plans.length, 3);

  return (
    <Box
      component="section"
      id="pricing"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 13 },
        bgcolor: site.colors.backgroundDeep,
        background: `
          radial-gradient(ellipse 60% 45% at 50% 0%, ${alpha(green, 0.09)}, transparent 65%),
          ${site.colors.backgroundDeep}
        `,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          subtitle={pricing.subtitle}
          sx={{ mb: { xs: 3.5, md: 5 } }}
        />

        {pricing.showBillingToggle && <BillingToggle billing={billing} onChange={setBilling} />}

        <Grid container spacing={{ xs: 3, md: 3.5 }} alignItems="stretch" justifyContent="center">
          {pricing.plans.map((plan, index) => {
            const price = monthlyPriceFor(plan.price, billing);
            const before = billing === 'annual' && plan.price !== price
              ? plan.price
              : plan.priceBefore;

            return (
              <Grid key={plan.id} size={{ xs: 12, sm: 10, md: 12 / columns }}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 3, md: 3.8 },
                    pt: plan.badge ? { xs: 4.5, md: 5 } : { xs: 3, md: 3.8 },
                    borderRadius: 5,
                    bgcolor: plan.highlight ? alpha(green, 0.07) : alpha('#FFFFFF', 0.035),
                    border: `1px solid ${plan.highlight ? alpha(green, 0.55) : alpha('#FFFFFF', 0.08)}`,
                    boxShadow: plan.highlight
                      ? `0 30px 70px -35px ${alpha(green, 0.85)}`
                      : 'none',
                    transition: 'transform .35s ease, border-color .35s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      borderColor: alpha(green, plan.highlight ? 0.75 : 0.35),
                    },
                  }}
                >
                  {plan.badge && (
                    <Stack
                      direction="row"
                      spacing={0.6}
                      alignItems="center"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        px: 2,
                        py: 0.7,
                        borderRadius: 999,
                        bgcolor: green,
                        color: '#04241A',
                        fontWeight: 900,
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        boxShadow: `0 12px 30px -12px ${alpha(green, 0.9)}`,
                      }}
                    >
                      <StarRoundedIcon sx={{ fontSize: 15 }} />
                      {plan.badge}
                    </Stack>
                  )}

                  <Typography variant="h5" sx={{ mb: 0.8, fontSize: '1.35rem' }}>
                    {plan.name}
                  </Typography>

                  {plan.description && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, minHeight: { md: 46 } }}>
                      {plan.description}
                    </Typography>
                  )}

                  {/* Precio */}
                  <Box sx={{ mb: 1 }}>
                    <Stack direction="row" alignItems="baseline" spacing={0.7} flexWrap="wrap">
                      <Typography
                        sx={{
                          fontFamily: theme.typography.h1.fontFamily,
                          fontWeight: 900,
                          fontSize: { xs: '2.4rem', md: '2.7rem' },
                          color: plan.highlight ? green : 'text.primary',
                          lineHeight: 1.05,
                        }}
                      >
                        {formatPrice(price)}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {pricing.period}
                      </Typography>
                    </Stack>

                    <Box sx={{ minHeight: 24, mt: 0.4 }}>
                      {before > 0 && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography
                            variant="body2"
                            sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                          >
                            {formatPrice(before)}
                          </Typography>
                          <Box
                            sx={{
                              px: 1,
                              py: 0.15,
                              borderRadius: 999,
                              bgcolor: alpha(green, 0.15),
                              color: green,
                              fontSize: '0.7rem',
                              fontWeight: 800,
                            }}
                          >
                            Ahorras {formatPrice(before - price)}
                          </Box>
                        </Stack>
                      )}
                      {billing === 'annual' && !before && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {pricing.annualNote}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {/* Sello del mes gratis */}
                  {freeTrial.enabled && pricing.freeTrialNote && (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        my: 2,
                        px: 1.6,
                        py: 1,
                        borderRadius: 2,
                        bgcolor: alpha(green, 0.1),
                        border: `1px dashed ${alpha(green, 0.4)}`,
                      }}
                    >
                      <CardGiftcardRoundedIcon sx={{ fontSize: 18, color: green }} />
                      <Typography sx={{ fontSize: '0.83rem', fontWeight: 700, color: green }}>
                        {pricing.freeTrialNote}
                      </Typography>
                    </Stack>
                  )}

                  {/* Incluye */}
                  <Stack component="ul" spacing={1.3} sx={{ listStyle: 'none', p: 0, m: 0, mb: 3, flexGrow: 1 }}>
                    {plan.features.map((feature) => (
                      <Stack key={feature} component="li" direction="row" spacing={1.3} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            mt: '2px',
                            flexShrink: 0,
                            borderRadius: '50%',
                            display: 'grid',
                            placeItems: 'center',
                            bgcolor: alpha(green, 0.16),
                          }}
                        >
                          <CheckRoundedIcon sx={{ fontSize: 13, color: green }} />
                        </Box>
                        <Typography variant="body2" sx={{ color: alpha('#FFFFFF', 0.85) }}>
                          {feature}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Button
                    fullWidth
                    size="large"
                    variant={plan.highlight ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => openWhatsApp(whatsappPlanMessage(plan.name))}
                    sx={{ fontWeight: 800, ...(plan.highlight ? {} : { color: 'text.primary' }) }}
                  >
                    {pricing.buttonLabel}
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {pricing.footnote && (
          <Typography
            sx={{
              mt: 5,
              textAlign: 'center',
              color: 'text.secondary',
              fontSize: '0.88rem',
              maxWidth: 620,
              mx: 'auto',
            }}
          >
            {pricing.footnote}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
