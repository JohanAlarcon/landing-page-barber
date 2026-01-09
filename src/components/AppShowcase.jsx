import { useState, useEffect } from 'react';
import { Box, Container, Typography, IconButton, useTheme, Card, CardMedia } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [
    { src: `${process.env.PUBLIC_URL}/images/software/imagen_ia_2.webp`, alt: 'Panel de Control Principal' },
    { src: `${process.env.PUBLIC_URL}/images/software/imagen_ia_3.webp`, alt: 'Panel de Control Principal' },
    { src: `${process.env.PUBLIC_URL}/images/software/imagen1.webp`, alt: 'Panel de Control Principal' },
    { src: `${process.env.PUBLIC_URL}/images/software/imagen2.webp`, alt: 'Gestión de Citas' },
    { src: `${process.env.PUBLIC_URL}/images/software/imagen3.webp`, alt: 'Calendario Interactivo' },
    { src: `${process.env.PUBLIC_URL}/images/software/imagen4.webp`, alt: 'Reportes Financieros' },
    { src: `${process.env.PUBLIC_URL}/images/software/imagen5.webp`, alt: 'Base de Datos de Clientes' },
    { src: `${process.env.PUBLIC_URL}/images/software/imagen6.webp`, alt: 'Configuración de Servicios' },
];

export default function AppShowcase() {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#121212', overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h6"
                    align="center"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}
                >
                    Interfaz Intuitiva
                </Typography>
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{ mb: 6, color: '#fff' }}
                >
                    Diseñado para ser fácil de usar
                </Typography>

                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    {/* Navigation Buttons (Desktop) */}
                    <IconButton
                        onClick={handlePrev}
                        sx={{
                            position: 'absolute',
                            left: { md: 20 },
                            zIndex: 2,
                            display: { xs: 'none', md: 'flex' },
                            bgcolor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { bgcolor: theme.palette.primary.main }
                        }}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            right: { md: 20 },
                            zIndex: 2,
                            display: { xs: 'none', md: 'flex' },
                            bgcolor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { bgcolor: theme.palette.primary.main }
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>

                    {/* Carousel Container */}
                    <Box sx={{
                        width: '100%',
                        maxWidth: 900,
                        height: { xs: 300, sm: 450, md: 550 },
                        position: 'relative',
                        perspective: '1000px'
                    }}>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute'
                                }}
                            >
                                <Card
                                    elevation={10}
                                    sx={{
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        height: '100%',
                                        border: `1px solid rgba(255,255,255,0.1)`,
                                        boxShadow: `0 0 40px rgba(212, 175, 55, 0.1)`
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={images[activeIndex].src}
                                        alt={images[activeIndex].alt}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain', // Changed to contain to show full UI
                                            bgcolor: '#252525'
                                        }}
                                    />
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </Box>
                </Box>

                {/* Dots Navigation */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
                    {images.map((_, idx) => (
                        <Box
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: activeIndex === idx ? 'primary.main' : 'rgba(255,255,255,0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
