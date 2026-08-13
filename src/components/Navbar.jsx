import { useState } from 'react';
import {
  AppBar, Box, Button, Collapse, Container, Divider, Drawer, IconButton,
  List, ListItemButton, ListItemText, Stack, Toolbar, Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import site from '../config/site';
import { openWhatsApp, scrollToId } from '../helpers';
import Logo from './common/Logo';
import PromoBar from './PromoBar';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 40));

  const go = (href) => {
    scrollToId(href);
    setDrawerOpen(false);
  };

  const ctaLabel = site.freeTrial.enabled ? site.cta.navLabel : site.cta.primaryLabel;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? alpha(site.colors.backgroundDeep, 0.88) : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? `1px solid ${alpha('#FFFFFF', 0.08)}` : '1px solid transparent',
          transition: 'background-color .3s ease, border-color .3s ease',
          backgroundImage: 'none',
        }}
      >
        {/* La cinta promocional se recoge al hacer scroll para ganar espacio */}
        <Collapse in={!scrolled} timeout={300}>
          <PromoBar />
        </Collapse>

        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ minHeight: { xs: 62, md: 76 }, gap: 2, transition: 'min-height .3s ease' }}
          >
            <Logo onClick={() => go('#hero')} />

            <Box sx={{ flexGrow: 1 }} />

            {/* Enlaces de escritorio */}
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}
            >
              {site.navLinks.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => go(item.href)}
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    px: 2,
                    '&:hover': { color: 'text.primary', bgcolor: alpha('#FFFFFF', 0.05), transform: 'none' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <Button
              variant="contained"
              color="primary"
              startIcon={<WhatsAppIcon />}
              onClick={() => openWhatsApp()}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                ml: { lg: 2 },
                fontSize: { sm: '0.9rem', md: '0.95rem' },
                px: { sm: 2.2, md: 3 },
              }}
            >
              {ctaLabel}
            </Button>

            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menú"
              sx={{
                display: { xs: 'inline-flex', lg: 'none' },
                color: 'text.primary',
                border: `1px solid ${alpha('#FFFFFF', 0.12)}`,
                borderRadius: 2,
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Menú móvil */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: { xs: '85%', sm: 340 },
            bgcolor: site.colors.backgroundDeep,
            backgroundImage: 'none',
            borderLeft: `1px solid ${alpha('#FFFFFF', 0.08)}`,
            p: 2.5,
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Logo />
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="Cerrar menú" sx={{ color: 'text.primary' }}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ borderColor: alpha('#FFFFFF', 0.08) }} />

        <List sx={{ py: 2 }}>
          {site.navLinks.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => go(item.href)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600, fontSize: '1.05rem' }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ mt: 'auto', pt: 2 }}>
          {site.freeTrial.enabled && (
            <Typography
              variant="body2"
              sx={{ color: 'primary.main', fontWeight: 700, mb: 1.5, textAlign: 'center' }}
            >
              {site.freeTrial.badge}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            startIcon={<WhatsAppIcon />}
            onClick={() => {
              setDrawerOpen(false);
              openWhatsApp();
            }}
          >
            {site.cta.primaryLabel}
          </Button>
          {site.contact.whatsappDisplay && (
            <Typography
              variant="body2"
              sx={{ mt: 1.5, textAlign: 'center', color: 'text.secondary' }}
            >
              {site.contact.whatsappDisplay}
            </Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
}
