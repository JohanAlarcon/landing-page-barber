import { Fab, Tooltip, useTheme, Box } from '@mui/material';
import { motion } from 'framer-motion';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const MotionFab = motion(Fab);
const MotionBox = motion(Box);

export default function WhatsAppButton() {
  const theme = useTheme();
  const phoneNumber = '3176824754'; 
  const message = '¡Hola! Estoy interesado en StyleCloud.';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Tooltip title="Contáctanos por WhatsApp" arrow placement="left">
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 16, md: 32 },
          right: { xs: 16, md: 32 },
          zIndex: theme.zIndex.tooltip + 1,
        }}
      >
        {/** Anillo pulsante detrás del botón **/}
        <MotionBox
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: { xs: 55, md: 65 },
            height: { xs: 55, md: 65 },
            borderRadius: '50%',
            border: `2px solid ${theme.palette.success.main}`,
            pointerEvents: 'none',
          }}
          animate={{
            scale: [1.1, 1.4, 1.4],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
        />

        {/** Botón flotante **/}
        <MotionFab
          component="a"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          size="medium"
          sx={{
            width: { xs: 56, md: 64 },
            height: { xs: 56, md: 64 },
            bgcolor: theme.palette.success.main,
            color: '#fff',
            boxShadow: theme.shadows[4],
            '&:hover': {
              bgcolor: theme.palette.success.dark,
            },
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <WhatsAppIcon sx={{ fontSize: { xs: 32, md: 40 } }} />
        </MotionFab>
      </Box>
    </Tooltip>
  );
}