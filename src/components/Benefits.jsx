import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { motion } from 'framer-motion';

const benefits = [
    {
        icon: <TrendingUpIcon sx={{ fontSize: 50 }} />,
        title: 'Crecimiento Real',
        description: 'Deja de perder dinero en "gastos hormiga" y cortes no registrados. Aumenta tus ingresos un 30% en los primeros 3 meses.'
    },
    {
        icon: <SecurityIcon sx={{ fontSize: 50 }} />,
        title: 'Control Total',
        description: 'Siente la paz mental de saber exactamente cuánto entra de tu negocio, incluso cuando no estás presente en el local.'
    },
    {
        icon: <EmojiEmotionsIcon sx={{ fontSize: 50 }} />,
        title: 'Profesionalismo',
        description: 'Sorprende a tus clientes con un sistema moderno. Fideliza más clientes ofreciendo una experiencia de reserva premium.'
    }
];

export default function Benefits() {
    const theme = useTheme();

    return (
        <Box id="benefits" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#1a1a1a' }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Box
                                component="img"
                                src={`${process.env.PUBLIC_URL}/images/barber-action.webp`}
                                alt="Barbero profesional trabajando"
                                sx={{
                                    width: '100%',
                                    maxHeight: { md: 400 },
                                    objectFit: 'cover',
                                    borderRadius: 4,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    filter: 'grayscale(20%) contrast(1.1)'
                                }}

                            />
                            {/* Fallback block if image missing */}
                            <Box sx={{
                                width: '100%',
                                height: 400,
                                bgcolor: '#333',
                                borderRadius: 4,
                                display: 'none', // Only show if img fails logic added properly, but simple fallback here
                            }} />
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        p: 3,
                                        mb: 3,
                                        bgcolor: 'transparent',
                                        borderLeft: `4px solid ${theme.palette.primary.main}`,
                                        borderRadius: '0 8px 8px 0',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }
                                    }}
                                >
                                    <Box sx={{ mr: 3, color: 'primary.main' }}>
                                        {benefit.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 600 }}>
                                            {benefit.title}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                            {benefit.description}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </motion.div>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
