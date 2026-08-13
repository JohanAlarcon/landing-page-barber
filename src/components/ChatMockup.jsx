import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';

import site from '../config/site';

const TYPING_MS = 850;
const READ_MS = 1250;
const RESTART_MS = 3200;

/** Tres puntos animados mientras "escribe" el bot. */
function TypingDots({ color }) {
  return (
    <Stack direction="row" spacing={0.6} sx={{ px: 0.5, py: 0.25 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          component={motion.span}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
          sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color }}
        />
      ))}
    </Stack>
  );
}

/**
 * Simulación de una conversación de WhatsApp donde ReservaBot agenda
 * una cita. Los mensajes salen uno a uno y la secuencia se reinicia
 * en bucle. El contenido se define en el .env (REACT_APP_HERO_CHAT_*).
 */
export default function ChatMockup() {
  const theme = useTheme();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { header, status, messages } = site.hero.chat;

  const [visible, setVisible] = useState(reduceMotion ? messages.length : 0);
  const [typing, setTyping] = useState(false);
  const timers = useRef([]);

  const green = theme.palette.primary.main;

  useEffect(() => {
    if (reduceMotion || messages.length === 0) return undefined;

    const schedule = (fn, delay) => {
      timers.current.push(setTimeout(fn, delay));
    };

    const step = (index) => {
      if (index >= messages.length) {
        schedule(() => {
          setVisible(0);
          step(0);
        }, RESTART_MS);
        return;
      }

      setTyping(true);
      schedule(() => {
        setTyping(false);
        setVisible(index + 1);
        schedule(() => step(index + 1), READ_MS);
      }, TYPING_MS);
    };

    step(0);

    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      timers.current = [];
    };
    // Se ejecuta una sola vez: los mensajes vienen de la configuración estática.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const shown = useMemo(() => messages.slice(0, visible), [messages, visible]);
  const nextIsBot = typing && messages[visible] && messages[visible].from === 'bot';

  if (messages.length === 0) return null;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: 360, sm: 400 },
        mx: 'auto',
        borderRadius: 5,
        overflow: 'hidden',
        bgcolor: alpha('#0A1826', 0.96),
        border: `1px solid ${alpha('#FFFFFF', 0.1)}`,
        boxShadow: `0 40px 90px -30px rgba(0,0,0,.9), 0 0 0 1px ${alpha(green, 0.12)}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Cabecera del chat */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          px: 2,
          py: 1.6,
          background: `linear-gradient(135deg, ${alpha(green, 0.22)}, ${alpha(green, 0.08)})`,
          borderBottom: `1px solid ${alpha('#FFFFFF', 0.07)}`,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            bgcolor: green,
            display: 'grid',
            placeItems: 'center',
            color: '#04241A',
            flexShrink: 0,
          }}
        >
          <SmartToyRoundedIcon sx={{ fontSize: 22 }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.98rem', lineHeight: 1.2 }} noWrap>
            {header}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.6}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: green }} />
            <Typography variant="caption" sx={{ color: alpha('#FFFFFF', 0.6) }}>
              {status}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      {/* Cuerpo de la conversación */}
      <Stack
        spacing={1.1}
        sx={{
          p: 2,
          minHeight: { xs: 330, sm: 375 },
          justifyContent: 'flex-end',
          background:
            `radial-gradient(circle at 15% 10%, ${alpha(green, 0.05)}, transparent 55%), ${alpha('#081420', 0.9)}`,
        }}
      >
        <AnimatePresence initial={false}>
          {shown.map((message, index) => {
            const isBot = message.from === 'bot';
            return (
              <Box
                key={`${index}-${message.text}`}
                component={motion.div}
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                sx={{ display: 'flex', justifyContent: isBot ? 'flex-end' : 'flex-start' }}
              >
                <Box
                  sx={{
                    maxWidth: '82%',
                    px: 1.7,
                    py: 1.1,
                    borderRadius: 2.5,
                    borderTopLeftRadius: isBot ? 20 : 6,
                    borderTopRightRadius: isBot ? 6 : 20,
                    bgcolor: isBot ? theme.palette.primary.dark : alpha('#FFFFFF', 0.08),
                    color: isBot ? '#EAFFF4' : alpha('#FFFFFF', 0.92),
                    border: `1px solid ${alpha('#FFFFFF', isBot ? 0.12 : 0.06)}`,
                    boxShadow: isBot ? `0 8px 24px -14px ${alpha(green, 0.9)}` : 'none',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.86rem', sm: '0.9rem' },
                      lineHeight: 1.45,
                      fontWeight: 500,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {message.text}
                  </Typography>
                  {isBot && (
                    <Stack direction="row" justifyContent="flex-end" sx={{ mt: 0.3 }}>
                      <DoneAllRoundedIcon sx={{ fontSize: 14, color: alpha('#FFFFFF', 0.55) }} />
                    </Stack>
                  )}
                </Box>
              </Box>
            );
          })}
        </AnimatePresence>

        {typing && (
          <Box sx={{ display: 'flex', justifyContent: nextIsBot ? 'flex-end' : 'flex-start' }}>
            <Box
              sx={{
                px: 1.5,
                py: 0.9,
                borderRadius: 2.5,
                bgcolor: nextIsBot ? theme.palette.primary.dark : alpha('#FFFFFF', 0.08),
              }}
            >
              <TypingDots color={nextIsBot ? '#EAFFF4' : alpha('#FFFFFF', 0.7)} />
            </Box>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
