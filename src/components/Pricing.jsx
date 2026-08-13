import { useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import site, { formatPrice, monthlyPriceFor } from '../config/site';
import { openWhatsApp, whatsappPlanMessage } from '../helpers';
import SectionHeading from './common/SectionHeading';

/** Interruptor mensual / anual (solo si hay descuento anual configurado). */
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

/** Fila de garantías bajo el precio (sin contratos, precio único...). */
function Guarantees() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { guarantees } = site.pricing;

  if (guarantees.length === 0) return null;

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1.2, sm: 3 }}
      justifyContent="center"
      alignItems={{ xs: 'center', sm: 'center' }}
      sx={{ mt: { xs: 3.5, md: 5 } }}
      flexWrap="wrap"
      useFlexGap
    >
      {guarantees.map((item) => (
        <Stack key={item} direction="row" spacing={1} alignItems="center">
          <CheckRoundedIcon sx={{ fontSize: 18, color: green }} />
          <Typography sx={{ fontSize: '0.92rem', fontWeight: 600, color: alpha('#FFFFFF', 0.85) }}>
            {item}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

/**
 * Tarjeta protagonista cuando hay UN solo plan:
 * precio y botón a la izquierda, todo lo que incluye a la derecha.
 * En móvil se apila en una columna.
 */
function SinglePlanCard({ plan, billing }) {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { pricing, freeTrial } = site;

  const price = monthlyPriceFor(plan.price, billing);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55 }}
      sx={{
        position: 'relative',
        maxWidth: 900,
        mx: 'auto',
        borderRadius: { xs: 4, md: 6 },
        p: { xs: 3, sm: 4, md: 5.5 },
        pt: { xs: 5, md: 5.5 },
        bgcolor: alpha(green, 0.06),
        border: `1px solid ${alpha(green, 0.45)}`,
        boxShadow: `0 40px 90px -40px ${alpha(green, 0.7)}`,
        background: `
          radial-gradient(circle at 12% 0%, ${alpha(green, 0.14)}, transparent 55%),
          ${alpha(site.colors.surface, 0.55)}
        `,
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
            px: 2.4,
            py: 0.8,
            borderRadius: 999,
            bgcolor: green,
            color: '#04241A',
            fontWeight: 900,
            fontSize: { xs: '0.8rem', md: '0.9rem' },
            whiteSpace: 'nowrap',
            boxShadow: `0 12px 30px -12px ${alpha(green, 0.9)}`,
          }}
        >
          <CardGiftcardRoundedIcon sx={{ fontSize: 17 }} />
          {plan.badge}
        </Stack>
      )}

      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
        {/* Precio + botón */}
        <Grid size={{ xs: 12, md: 5.5 }}>
          <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h5" sx={{ fontSize: '1.3rem' }}>
              {plan.name}
            </Typography>

            {plan.description && (
              <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360 }}>
                {plan.description}
              </Typography>
            )}

            {/* Primer mes gratis, luego el precio */}
            <Box>
              {freeTrial.enabled && (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="baseline"
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                >
                  <Typography
                    sx={{
                      fontFamily: theme.typography.h1.fontFamily,
                      fontWeight: 900,
                      fontSize: { xs: '2.6rem', md: '3rem' },
                      color: green,
                      lineHeight: 1.05,
                    }}
                  >
                    Mes 1: $0
                  </Typography>
                </Stack>
              )}
              <Stack
                direction="row"
                spacing={0.8}
                alignItems="baseline"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                sx={{ mt: freeTrial.enabled ? 0.5 : 0 }}
              >
                <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '1rem' }}>
                  luego
                </Typography>
                <Typography
                  sx={{
                    fontFamily: theme.typography.h1.fontFamily,
                    fontWeight: 900,
                    fontSize: { xs: '1.9rem', md: '2.2rem' },
                    lineHeight: 1.1,
                  }}
                >
                  {formatPrice(price)}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {pricing.period}
                </Typography>
              </Stack>
            </Box>

            <Button
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              startIcon={<WhatsAppIcon />}
              onClick={() => openWhatsApp(whatsappPlanMessage(plan.name))}
              sx={{ fontWeight: 800, maxWidth: 360, fontSize: { xs: '1rem', md: '1.05rem' } }}
            >
              {pricing.buttonLabel}
            </Button>

            {pricing.freeTrialNote && (
              <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                {pricing.freeTrialNote}
              </Typography>
            )}
          </Stack>
        </Grid>

        {/* Todo lo que incluye */}
        <Grid size={{ xs: 12, md: 6.5 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: green,
              mb: 2,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Todo incluido en tu mensualidad
          </Typography>
          <Stack component="ul" spacing={1.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {plan.features.map((feature) => (
              <Stack key={feature} component="li" direction="row" spacing={1.4} alignItems="flex-start">
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    mt: '1px',
                    flexShrink: 0,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: alpha(green, 0.16),
                  }}
                >
                  <CheckRoundedIcon sx={{ fontSize: 14, color: green }} />
                </Box>
                <Typography sx={{ fontSize: '0.98rem', color: alpha('#FFFFFF', 0.88), fontWeight: 500 }}>
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

/** Tarjeta estándar para cuando hay varios planes. */
function PlanCard({ plan, billing, index }) {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { pricing, freeTrial } = site;

  const price = monthlyPriceFor(plan.price, billing);
  const before = billing === 'annual' && plan.price !== price ? plan.price : plan.priceBefore;

  return (
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
        boxShadow: plan.highlight ? `0 30px 70px -35px ${alpha(green, 0.85)}` : 'none',
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
              <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
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
        </Box>
      </Box>

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
  );
}

export default function Pricing() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { pricing } = site;
  const [billing, setBilling] = useState('monthly');

  if (pricing.plans.length === 0) return null;

  const isSingle = pricing.plans.length === 1;
  const columns = Math.min(pricing.plans.length, 3);

  return (
    <Box
      component="section"
      id="pricing"
      sx={{
        position: 'relative',
        py: { xs: 7, md: 12 },
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
          sx={{ mb: { xs: 4, md: 6 } }}
        />

        {pricing.showBillingToggle && <BillingToggle billing={billing} onChange={setBilling} />}

        {isSingle ? (
          <SinglePlanCard plan={pricing.plans[0]} billing={billing} />
        ) : (
          <Grid container spacing={{ xs: 3, md: 3.5 }} alignItems="stretch" justifyContent="center">
            {pricing.plans.map((plan, index) => (
              <Grid key={plan.id} size={{ xs: 12, sm: 10, md: 12 / columns }}>
                <PlanCard plan={plan} billing={billing} index={index} />
              </Grid>
            ))}
          </Grid>
        )}

        <Guarantees />

        {pricing.footnote && (
          <Typography
            sx={{
              mt: 3,
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
