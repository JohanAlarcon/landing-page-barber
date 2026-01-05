import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const faqs = [
    {
        question: '¿Necesito instalar algún programa en mi computadora?',
        answer: 'No. StyleCloudBarber es 100% en la nube. Puedes acceder desde tu celular, tablet o computadora sin instalar nada, solo necesitas internet.'
    },
    {
        question: '¿Cómo funciona la gestión de citas?',
        answer: 'Te entregamos un link único para tu barbería. Tus clientes entran, eligen barbero, servicio y hora. Tú ves todo en tiempo real en tu calendario.'
    },
    {
        question: '¿Mis datos están seguros?',
        answer: 'Sí. Realizamos copias de seguridad diarias y utilizamos encriptación SSL para proteger toda la información de tu negocio y clientes.'
    },
    {
        question: '¿Puedo cambiar de plan más adelante?',
        answer: 'Por supuesto. Puedes empezar con el plan de Gestión de Cortes y luego agregar Citas, o viceversa. El cambio es inmediato.'
    }
];

export default function FAQ() {
    const theme = useTheme();

    return (
        <Box id="faq" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#121212' }}>
            <Container maxWidth="md">
                <Typography
                    variant="h6"
                    align="center"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}
                >
                    Dudas Comunes
                </Typography>
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{ mb: 6, color: '#fff' }}
                >
                    Preguntas Frecuentes
                </Typography>

                <Box component={motion.div} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    {faqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            disableGutters
                            elevation={0}
                            sx={{
                                bgcolor: 'transparent',
                                borderBottom: `1px solid rgba(255,255,255,0.1)`,
                                '&:before': { display: 'none' },
                                mb: 2
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                                sx={{ px: 0 }}
                            >
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 500 }}>
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 0, pb: 2 }}>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
