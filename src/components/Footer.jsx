import { Box, Container, Grid, Typography, Link, IconButton, useTheme } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: '#0a0a0a',
        color: 'text.secondary',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 700 }}>
              StyleCloud<Box component="span" sx={{ color: 'primary.main' }}>Barber</Box>
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              El sistema de gestión líder para barberías y salones de belleza.
              Simplificamos tu administración para que tú te enfoques en el arte.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" href="https://wa.me/573176824754" target="_blank">
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Producto
            </Typography>
            <Link href="#features" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Características</Link>
            <Link href="#pricing" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Precios</Link>
            <Link href="#faq" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Preguntas</Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Privacidad</Link>
            <Link href="#" color="inherit" display="block" underline="hover" sx={{ mb: 1 }}>Términos</Link>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Soporte: johandarioalarcon@gmail.com
            </Typography>
            <Typography variant="body2">
              WhatsApp: +57 317 682 4754
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} StyleCloudBarber. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}