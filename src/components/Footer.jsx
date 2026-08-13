import { Box, Container, Divider, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';

import site from '../config/site';
import { openWhatsApp, scrollToId } from '../helpers';
import Logo from './common/Logo';

const SOCIAL_ICONS = {
  facebook: FacebookRoundedIcon,
  instagram: InstagramIcon,
  tiktok: MusicNoteRoundedIcon,
};

/** Columna de enlaces del pie. */
function LinkColumn({ title, links }) {
  if (!links || links.length === 0) return null;
  return (
    <>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        {title}
      </Typography>
      <Stack spacing={1.2}>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            underline="none"
            onClick={(event) => {
              if (link.href && link.href.startsWith('#')) {
                event.preventDefault();
                scrollToId(link.href);
              }
            }}
            sx={{
              color: 'text.secondary',
              fontSize: '0.92rem',
              width: 'fit-content',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {link.label}
          </Link>
        ))}
      </Stack>
    </>
  );
}

export default function Footer() {
  const { brand, contact, footer } = site;
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        pt: { xs: 6, md: 8 },
        // En celulares deja espacio para la barra de CTA fija inferior,
        // sumando la zona segura de los iPhone con home-indicator
        pb: { xs: 'calc(128px + env(safe-area-inset-bottom))', sm: 4 },
        bgcolor: site.colors.backgroundDeep,
        borderTop: `1px solid ${alpha('#FFFFFF', 0.07)}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* Marca */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Logo onClick={() => scrollToId('#hero')} />
            {brand.slogan && (
              <Typography sx={{ mt: 1.5, color: 'primary.main', fontWeight: 700, fontSize: '0.95rem' }}>
                {brand.slogan}
              </Typography>
            )}
            {footer.about && (
              <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary', maxWidth: 380 }}>
                {footer.about}
              </Typography>
            )}

            <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
              {contact.whatsappNumber && (
                <IconButton
                  onClick={() => openWhatsApp()}
                  aria-label="WhatsApp"
                  sx={{
                    color: 'primary.main',
                    border: `1px solid ${alpha('#FFFFFF', 0.12)}`,
                    '&:hover': { bgcolor: alpha(site.colors.primary, 0.12) },
                  }}
                >
                  <WhatsAppIcon />
                </IconButton>
              )}
              {contact.social.map((social) => {
                const SocialIcon = SOCIAL_ICONS[social.key];
                if (!SocialIcon) return null;
                return (
                  <IconButton
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.key}
                    sx={{
                      color: 'text.secondary',
                      border: `1px solid ${alpha('#FFFFFF', 0.12)}`,
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    <SocialIcon />
                  </IconButton>
                );
              })}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <LinkColumn title="Producto" links={footer.product} />
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <LinkColumn title="Legal" links={footer.legal} />
          </Grid>

          {/* Contacto */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
              Contacto
            </Typography>
            <Stack spacing={1.4}>
              {contact.whatsappDisplay && (
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <WhatsAppIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Link
                    component="button"
                    type="button"
                    onClick={() => openWhatsApp()}
                    underline="none"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.92rem',
                      textAlign: 'left',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {contact.whatsappDisplay}
                  </Link>
                </Stack>
              )}
              {contact.email && (
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <EmailRoundedIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Link
                    href={`mailto:${contact.email}`}
                    underline="none"
                    sx={{ color: 'text.secondary', fontSize: '0.92rem', wordBreak: 'break-all', '&:hover': { color: 'primary.main' } }}
                  >
                    {contact.email}
                  </Link>
                </Stack>
              )}
              {contact.location && (
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <PlaceRoundedIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.92rem' }}>
                    {contact.location}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: alpha('#FFFFFF', 0.07) }} />

        <Typography sx={{ textAlign: 'center', color: 'text.secondary', fontSize: '0.85rem' }}>
          © {year} {brand.legalName}. {footer.copyright}
        </Typography>
      </Container>
    </Box>
  );
}
