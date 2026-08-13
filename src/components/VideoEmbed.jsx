import { useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

import { toEmbedUrl, openWhatsApp } from '../helpers';
import site from '../config/site';

const FILE_EXTENSIONS = /\.(mp4|webm|ogg|ogv|mov|m4v)(\?.*)?$/i;

/**
 * Reproductor del video demo de cada vertical.
 *
 * - Si no hay URL configurada en el .env, muestra el ESPACIO RESERVADO
 *   listo para cuando se grabe el video.
 * - Con URL, primero pinta la carátula y solo carga el video al pulsar
 *   "reproducir": así la página abre rápido aunque el archivo pese.
 * - Soporta archivos locales (public/), YouTube, Vimeo e iframes genéricos.
 * - La proporción se toma del .env, de modo que un video vertical de
 *   celular no se recorta ni deja franjas negras.
 */
export default function VideoEmbed({ video, accent, placeholderText }) {
  const [playing, setPlaying] = useState(false);
  // buffering -> el archivo se está cargando | ready | failed
  const [state, setState] = useState('buffering');

  const hasVideo = Boolean(video && video.url);
  // Aunque el .env diga "iframe", una ruta .mp4 se trata como archivo
  const isFile = hasVideo && (video.type === 'mp4' || FILE_EXTENSIONS.test(video.url));
  const embedUrl = hasVideo ? toEmbedUrl(video.url, isFile ? 'mp4' : video.type) : '';
  const isPortrait = Boolean(video && video.isPortrait);

  const frame = {
    position: 'relative',
    width: '100%',
    // Los videos verticales se limitan para que no dominen la pantalla
    maxWidth: isPortrait ? { xs: 320, sm: 360, md: 380 } : 'none',
    mx: isPortrait ? 'auto' : 0,
    aspectRatio: (video && video.aspect) || '16 / 9',
    borderRadius: 4,
    overflow: 'hidden',
    bgcolor: '#000000',
    border: `1px solid ${alpha(accent, 0.3)}`,
    boxShadow: `0 40px 80px -40px ${alpha('#000000', 0.95)}, 0 0 0 1px ${alpha('#FFFFFF', 0.04)}`,
  };

  /* ---------------------- Espacio reservado ---------------------- */
  if (!hasVideo) {
    return (
      <Box
        sx={{
          ...frame,
          display: 'grid',
          placeItems: 'center',
          borderStyle: 'dashed',
          borderWidth: 2,
          background: video && video.poster
            ? `linear-gradient(${alpha('#050D16', 0.82)}, ${alpha('#050D16', 0.92)}), url(${video.poster}) center/cover`
            : `linear-gradient(135deg, ${alpha(accent, 0.09)}, ${alpha('#050D16', 0.9)})`,
        }}
      >
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', px: 3, py: 4 }}>
          <Box
            component={motion.div}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              bgcolor: alpha(accent, 0.15),
              border: `1px solid ${alpha(accent, 0.4)}`,
            }}
          >
            <MovieRoundedIcon sx={{ fontSize: 30, color: accent }} />
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: '1rem', md: '1.15rem' } }}>
              {(video && video.title) || 'Video demo'}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.92rem', mt: 0.5, maxWidth: 420 }}>
              {placeholderText || 'Estamos grabando este video. Mientras tanto, pídenos una demostración en vivo por WhatsApp.'}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<WhatsAppIcon />}
            onClick={() => openWhatsApp(`¡Hola! Quiero ver una demostración en vivo de ${site.brand.name}.`)}
            sx={{
              color: accent,
              borderColor: alpha(accent, 0.5),
              borderWidth: 2,
              '&:hover': { borderWidth: 2, borderColor: accent, bgcolor: alpha(accent, 0.08) },
            }}
          >
            Pedir demo en vivo
          </Button>
        </Stack>
      </Box>
    );
  }

  /* --------------------------- Con video -------------------------- */
  if (!playing) {
    return (
      <Box
        onClick={() => setPlaying(true)}
        role="button"
        tabIndex={0}
        aria-label={`Reproducir ${video.title}`}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setPlaying(true);
          }
        }}
        sx={{
          ...frame,
          cursor: 'pointer',
          display: 'grid',
          placeItems: 'center',
          background: video.poster
            ? `linear-gradient(${alpha('#050D16', 0.35)}, ${alpha('#050D16', 0.65)}), url(${video.poster}) center/cover`
            : `linear-gradient(135deg, ${alpha(accent, 0.16)}, ${alpha('#050D16', 0.92)})`,
          '&:hover .play-ring': { transform: 'scale(1.08)' },
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Box
            className="play-ring"
            sx={{
              width: { xs: 66, md: 78 },
              height: { xs: 66, md: 78 },
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              bgcolor: accent,
              color: '#04131F',
              boxShadow: `0 0 0 12px ${alpha(accent, 0.16)}, 0 20px 40px -14px ${alpha(accent, 0.8)}`,
              transition: 'transform .3s ease',
            }}
          >
            <PlayArrowRoundedIcon sx={{ fontSize: { xs: 38, md: 44 } }} />
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: '0.9rem', md: '1rem' },
              textShadow: '0 2px 12px rgba(0,0,0,.8)',
            }}
          >
            {video.title}
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={frame}>
      {isFile ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={embedUrl}
          poster={video.poster || undefined}
          aria-label={video.title}
          controls
          autoPlay
          playsInline
          preload="auto"
          onCanPlay={() => setState('ready')}
          onPlaying={() => setState('ready')}
          onError={() => setState('failed')}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <iframe
          src={embedUrl}
          title={video.title}
          onLoad={() => setState('ready')}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      )}

      {/* Mientras carga: indicador en vez de un rectángulo negro */}
      {state === 'buffering' && (
        <Stack
          spacing={1.5}
          alignItems="center"
          justifyContent="center"
          sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', bgcolor: alpha('#050D16', 0.55) }}
        >
          <CircularProgress size={38} sx={{ color: accent }} />
          <Typography sx={{ fontSize: '0.85rem', color: alpha('#FFFFFF', 0.8), fontWeight: 600 }}>
            Cargando video…
          </Typography>
        </Stack>
      )}

      {/* Si el archivo no se puede cargar, se dice por qué en vez de fallar en silencio */}
      {state === 'failed' && (
        <Stack
          spacing={1.5}
          alignItems="center"
          justifyContent="center"
          sx={{ position: 'absolute', inset: 0, px: 3, textAlign: 'center', bgcolor: alpha('#050D16', 0.92) }}
        >
          <ErrorOutlineRoundedIcon sx={{ fontSize: 38, color: accent }} />
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
            No pudimos cargar el video
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>
            Escríbenos y te hacemos la demostración en vivo.
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<WhatsAppIcon />}
            onClick={() => openWhatsApp(`¡Hola! Quiero ver una demostración en vivo de ${site.brand.name}.`)}
            sx={{
              color: accent,
              borderColor: alpha(accent, 0.5),
              borderWidth: 2,
              '&:hover': { borderWidth: 2, borderColor: accent, bgcolor: alpha(accent, 0.08) },
            }}
          >
            Pedir demo
          </Button>
        </Stack>
      )}
    </Box>
  );
}
