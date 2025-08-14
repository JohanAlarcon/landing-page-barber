import {Box,Container,Grid,Typography,Link,IconButton,TextField,Button,useTheme} from '@mui/material';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

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
            <Typography variant="body2">info@barberflow.com</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              +1 234 567 890
            </Typography>
          </Grid>

          {/* Redes sociales */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Síguenos
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <IconButton
                color="inherit"
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener"
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: { xs: 4, md: 6 }, opacity: 0.7 }}
        >
          © {year} BarberFlow. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}