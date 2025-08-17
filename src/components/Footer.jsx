import {Box,Container,Grid,Typography,Link,IconButton,TextField,Button,useTheme} from '@mui/material';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { handleDemoClick, handleVideoClick } from '../helpers';

const footerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, when: 'beforeChildren', staggerChildren: 0.2 },
  },
};

export default function Footer() {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <Box
      component={motion.footer}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        pt: { xs: 6, md: 10 },
        pb: { xs: 4, md: 6 },
        overflow: 'hidden',
      }}
    >
      {/* Formas decorativas */}
      <Box
        sx={{
          position: 'absolute',
          top: -60,
          left: -90,
          width: 200,
          height: 200,
          bgcolor: theme.palette.primary.light,
          borderRadius: '50%',
          opacity: 0.1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -40,
          right: -60,
          width: 160,
          height: 160,
          bgcolor: theme.palette.warning.main,
          borderRadius: '50%',
          opacity: 0.1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Contacto */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contacto
            </Typography>
            <Typography variant="body2">hola@stylecloud.com</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              +1 234 567 890
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, fontSize: '0.75rem', opacity: 0.8 }}>
              ¿Quieres ver el panel? Solicita credenciales de acceso.
            </Typography>
          </Grid>

          {/* Redes sociales */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Síguenos
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, fontSize: '0.85rem', opacity: 0.9 }}>
              Novedades, tips y actualizaciones
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                color="inherit"
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                aria-label="Abrir Facebook de StyleCloud"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                aria-label="Abrir Instagram de StyleCloud"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                aria-label="Abrir LinkedIn de StyleCloud"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://wa.me/3176824754"
                target="_blank"
                rel="noopener"
                aria-label="Abrir WhatsApp de StyleCloud"
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Enlaces de acción */}
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Prueba StyleCloud
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component="button"
                variant="body2"
                onClick={handleDemoClick}
                sx={{ 
                  textAlign: 'left', 
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 }
                }}
              >
                → Ver demo de citas (acceso público)
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={handleVideoClick}
                sx={{ 
                  textAlign: 'left', 
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 }
                }}
              >
                → Ver video de presentación
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright y nota legal */}
        <Box sx={{ mt: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {year} StyleCloud. Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.6, fontSize: '0.7rem' }}>
            Demo pública disponible para gestión de citas. El panel completo requiere credenciales.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Link href="#" variant="caption" sx={{ opacity: 0.7, fontSize: '0.7rem' }}>
              Términos de servicio
            </Link>
            <Typography variant="caption" sx={{ opacity: 0.5 }}>·</Typography>
            <Link href="#" variant="caption" sx={{ opacity: 0.7, fontSize: '0.7rem' }}>
              Política de privacidad
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}