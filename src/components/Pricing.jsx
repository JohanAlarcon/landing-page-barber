import { Box, Grid, Typography, Button, useTheme, Container, Paper, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import { handleDemoClick } from '../helpers';

const plans = [
    {
        title: 'Gestión de Cortes',
        price: '$80.000',
        period: '/mes',
        description: 'Ideal para quienes solo necesitan control administrativo en el salón.',
        features: [
            'Control de Caja y Gastos',
            'Gestión de Barberos y Comisiones',
            'Inventario de Productos',
            'Reportes de Ventas'
        ],
        highlight: false,
    },
    {
        title: 'Plan Completo 2026',
        price: '$110.000',
        period: '/mes',
        prevPrice: '$170.000',
        description: 'La solución definitiva. Ahorra y ten control total de tu negocio.',
        features: [
            'TODO lo de Gestión de Cortes',
            'TODO lo de Gestión de Citas',
            'Soporte Prioritario',
            'Copias de Seguridad Diarias'
        ],
        highlight: true,
        tag: 'Ahorra $60.000/mes'
    },
    {
        title: 'Gestión de Citas',
        price: '$80.000',
        period: '/mes',
        description: 'Perfecto para organizar tu agenda y evitar huecos vacíos.',
        features: [
            'Reservas Online 24/7',
            'Recordatorios Automáticos',
            'Base de Datos de Clientes',
            'Link Personalizado'
        ],
        highlight: false,
    }
];

export default function Pricing() {
    const theme = useTheme();

    return (
        <Box id="pricing" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#1a1a1a' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h6"
                    align="center"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}
                >
                    Precios Transparentes
                </Typography>
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{ mb: 2, color: '#fff' }}
                >
                    Ofertas Especiales 2026
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mb: 8, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
                >
                    Sin contratos forzosos. Cancela cuando quieras. Potencia tu barbería hoy.
                </Typography>

                <Grid container spacing={4} alignItems="flex-end">
                    {plans.map((plan, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Paper
                                    elevation={plan.highlight ? 24 : 1}
                                    sx={{
                                        p: 4,
                                        pt: plan.highlight ? 6 : 4,
                                        pb: plan.highlight ? 6 : 4,
                                        borderRadius: 4,
                                        position: 'relative',
                                        bgcolor: plan.highlight ? 'rgba(212, 175, 55, 0.05)' : 'rgba(255,255,255,0.03)',
                                        border: plan.highlight
                                            ? `2px solid ${theme.palette.primary.main}`
                                            : '1px solid rgba(255,255,255,0.05)',
                                        transform: plan.highlight ? { md: 'scale(1.05)' } : 'none',
                                        zIndex: plan.highlight ? 2 : 1,
                                        maxWidth: '360px',
                                        mx: 'auto',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    {plan.highlight && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -16,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                zIndex: 3
                                            }}
                                        >
                                            <Chip
                                                label={plan.tag}
                                                color="primary"
                                                icon={<StarIcon sx={{ fontSize: '16px !important' }} />}
                                                sx={{ fontWeight: 'bold', px: 1 }}
                                            />
                                        </Box>
                                    )}

                                    <Typography variant="h5" align="center" gutterBottom sx={{ color: '#fff', fontWeight: 600 }}>
                                        {plan.title}
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 1 }}>
                                        <Typography component="h3" variant="h3" sx={{ color: plan.highlight ? 'primary.main' : '#fff' }}>
                                            {plan.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            {plan.period}
                                        </Typography>
                                    </Box>

                                    {plan.prevPrice && (
                                        <Typography variant="body2" align="center" sx={{ textDecoration: 'line-through', color: 'text.secondary', mb: 2 }}>
                                            Antes {plan.prevPrice}
                                        </Typography>
                                    )}
                                    {!plan.prevPrice && <Box sx={{ mb: 4 }} />}

                                    <Typography variant="body2" align="center" sx={{ mb: 4, color: 'text.secondary', minHeight: 40 }}>
                                        {plan.description}
                                    </Typography>

                                    <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', mb: 4 }}>
                                        {plan.features.map((line) => (
                                            <Box component="li" key={line} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                                <CheckCircleIcon sx={{ color: 'primary.main', mr: 2, fontSize: 20 }} />
                                                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>{line}</Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    <Button
                                        fullWidth
                                        variant={plan.highlight ? 'contained' : 'outlined'}
                                        color="primary"
                                        size="large"
                                        onClick={() => {
                                            const message = `Hola! Estoy interesado en el plan *${plan.title}* del sistema StyleCloudBarber.`;
                                            window.open(`https://wa.me/573176824754?text=${encodeURIComponent(message)}`, '_blank');
                                        }}
                                        sx={{
                                            py: 1.5,
                                            borderColor: plan.highlight ? 'transparent' : 'rgba(255,255,255,0.2)',
                                            color: plan.highlight ? '#000' : '#fff'
                                        }}
                                    >
                                        Elegir Plan
                                    </Button>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
