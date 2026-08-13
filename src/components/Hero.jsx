import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';

import site from '../config/site';
import { openWhatsApp, scrollToId } from '../helpers';
import GlowBackground from './common/GlowBackground';
import ChatMockup from './ChatMockup';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/** Pastilla pequeña reutilizable del hero. */
function Pill({ children, color, filled = false }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.9,
        px: 1.9,
        py: 0.75,
        borderRadius: 999,
        bgcolor: filled ? color : alpha(color, 0.13),
        color: filled ? '#04241A' : color,
        border: `1px solid ${alpha(color, filled ? 0 : 0.35)}`,
        fontWeight: 800,
        fontSize: { xs: '0.7rem', md: '0.76rem' },
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        lineHeight: 1.5,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Box>
  );
}

export default function Hero() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { hero, freeTrial, cta, stats, contact } = site;

  const useChat = hero.visual !== 'image' && hero.chat.messages.length > 0;

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        // Deja sitio a la barra fija (cinta promocional + navegación)
        pt: { xs: 16, sm: 17, md: 19, lg: 21 },
        pb: { xs: 8, md: 12 },
        // Misma luz fuera de eje que el resto de la página, no un foco centrado
        background: `
          radial-gradient(ellipse 90% 65% at 22% -10%, ${alpha(green, 0.1)}, transparent 62%),
          linear-gradient(180deg, ${site.colors.background} 0%, ${site.colors.backgroundDeep} 100%)
        `,
      }}
    >
      <GlowBackground colors={[green, site.colors.secondary]} intensity={0.16} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 5, lg: 8 }} alignItems="center">
          {/* ----------------------------- Texto ----------------------------- */}
          <Grid size={{ xs: 12, md: 7, lg: 6.5 }}>
            <Stack
              component={motion.div}
              variants={container}
              initial="hidden"
              animate="visible"
              spacing={{ xs: 2.5, md: 3 }}
              sx={{ textAlign: { xs: 'center', md: 'left' }, alignItems: { xs: 'center', md: 'flex-start' } }}
            >
              {/* Etiquetas */}
              <Stack
                component={motion.div}
                variants={item}
                direction="row"
                spacing={1.2}
                flexWrap="wrap"
                useFlexGap
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                {hero.eyebrow && <Pill color={green}>{hero.eyebrow}</Pill>}
                {freeTrial.enabled && freeTrial.badge && (
                  <Pill color={green} filled>
                    <CardGiftcardRoundedIcon sx={{ fontSize: 15 }} />
                    {freeTrial.badge}
                  </Pill>
                )}
              </Stack>

              {/* Titular */}
              <Typography
                component={motion.h1}
                variants={item}
                variant="h1"
                sx={{
                  fontSize: { xs: '2.7rem', sm: '3.6rem', md: '3.7rem', lg: '4.6rem', xl: '5.1rem' },
                  fontWeight: 900,
                  m: 0,
                }}
              >
                {hero.title}
                {hero.titleHighlight && (
                  <>
                    <br />
                    <Box
                      component="span"
                      sx={{
                        color: green,
                        textShadow: `0 0 60px ${alpha(green, 0.45)}`,
                      }}
                    >
                      {hero.titleHighlight}
                    </Box>
                  </>
                )}
              </Typography>

              {hero.subtitle && (
                <Typography
                  component={motion.p}
                  variants={item}
                  sx={{
                    m: 0,
                    color: 'text.secondary',
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontWeight: 500,
                    maxWidth: 560,
                  }}
                >
                  {hero.subtitle}
                </Typography>
              )}

              {/* Beneficios rápidos */}
              {hero.bullets.length > 0 && (
                <Stack component={motion.div} variants={item} spacing={1.2} sx={{ width: '100%', maxWidth: 520 }}>
                  {hero.bullets.map((text) => (
                    <Stack
                      key={text}
                      direction="row"
                      spacing={1.4}
                      alignItems="center"
                      justifyContent={{ xs: 'center', md: 'flex-start' }}
                    >
                      <CheckCircleRoundedIcon sx={{ color: green, fontSize: 22, flexShrink: 0 }} />
                      <Typography sx={{ fontWeight: 600, fontSize: { xs: '1rem', md: '1.05rem' } }}>
                        {text}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              )}

              {/* Indicadores */}
              {stats.length > 0 && (
                <Stack
                  component={motion.div}
                  variants={item}
                  direction="row"
                  spacing={{ xs: 2.5, sm: 4 }}
                  flexWrap="wrap"
                  useFlexGap
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                  sx={{ pt: 0.5 }}
                >
                  {stats.slice(0, 3).map((stat) => (
                    <Box key={stat.label} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                      <Typography
                        sx={{
                          fontFamily: theme.typography.h1.fontFamily,
                          fontWeight: 900,
                          color: green,
                          fontSize: { xs: '1.5rem', md: '1.8rem' },
                          lineHeight: 1.1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.09em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Llamados a la acción */}
              <Stack
                component={motion.div}
                variants={item}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems="center"
                sx={{ pt: 1, width: { xs: '100%', sm: 'auto' } }}
              >
                <Button
                  size="large"
                  onClick={() => openWhatsApp()}
                  startIcon={<WhatsAppIcon />}
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    bgcolor: '#FFFFFF',
                    color: site.colors.backgroundDeep,
                    fontWeight: 800,
                    fontSize: { xs: '1rem', md: '1.08rem' },
                    boxShadow: `0 18px 45px -18px ${alpha('#FFFFFF', 0.55)}`,
                    '&:hover': { bgcolor: '#FFFFFF', boxShadow: `0 22px 55px -18px ${alpha('#FFFFFF', 0.7)}` },
                  }}
                >
                  {cta.primaryLabel}
                </Button>

                <Button
                  size="large"
                  onClick={() => scrollToId('#demos')}
                  startIcon={<PlayCircleFilledRoundedIcon />}
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    color: 'text.primary',
                    fontWeight: 700,
                    border: `1px solid ${alpha('#FFFFFF', 0.18)}`,
                    '&:hover': { bgcolor: alpha('#FFFFFF', 0.06), borderColor: alpha('#FFFFFF', 0.32) },
                  }}
                >
                  {cta.secondaryLabel}
                </Button>
              </Stack>

              {contact.whatsappDisplay && (
                <Typography
                  component={motion.div}
                  variants={item}
                  sx={{ color: 'text.secondary', fontSize: '0.95rem' }}
                >
                  o escríbenos al{' '}
                  <Box
                    component="span"
                    onClick={() => openWhatsApp()}
                    sx={{
                      color: green,
                      fontWeight: 800,
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {contact.whatsappDisplay}
                  </Box>
                </Typography>
              )}
            </Stack>
          </Grid>

          {/* ----------------------------- Visual ---------------------------- */}
          <Grid size={{ xs: 12, md: 5, lg: 5.5 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              sx={{ position: 'relative', px: { xs: 0, sm: 4, md: 0 } }}
            >
              {/* El halo circular se retiró: competía con la luz de la sección
                  y era el típico glow decorativo de plantilla. */}
              <Box sx={{ position: 'relative' }}>
                {useChat && <ChatMockup />}
                {/* Sin conversación configurada se usa la imagen; si tampoco
                    hay imagen no se dibuja nada, en vez de un icono roto. */}
                {!useChat && hero.image && (
                  <Box
                    component="img"
                    src={hero.image}
                    alt={hero.imageAlt}
                    sx={{
                      width: '100%',
                      display: 'block',
                      borderRadius: 4,
                      border: `1px solid ${alpha('#FFFFFF', 0.1)}`,
                      boxShadow: '0 40px 90px -30px rgba(0,0,0,.9)',
                    }}
                  />
                )}
              </Box>

              {/* Tarjetas flotantes (solo en pantallas grandes) */}
              {hero.floats.map((float, index) => (
                <Box
                  key={float.title}
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.35, duration: 0.5, ease: 'easeOut' }}
                  sx={{
                    display: { xs: 'none', lg: 'flex' },
                    alignItems: 'center',
                    gap: 1.3,
                    position: 'absolute',
                    ...(index === 0
                      ? { top: '12%', left: -56 }
                      : { bottom: '10%', right: -48 }),
                    px: 2,
                    py: 1.4,
                    maxWidth: 250,
                    borderRadius: 3,
                    bgcolor: alpha(site.colors.surface, 0.9),
                    border: `1px solid ${alpha(green, 0.28)}`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 24px 50px -24px rgba(0,0,0,.85)',
                  }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      bgcolor: alpha(green, 0.18),
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircleRoundedIcon sx={{ color: green, fontSize: 19 }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '0.82rem', lineHeight: 1.3 }}>
                      {float.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.35 }}>
                      {float.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
