import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import site from '../../config/site';

/**
 * Logo de la marca.
 * Usa la imagen definida en REACT_APP_LOGO_URL y, si no existe o falla
 * la carga, cae automáticamente al nombre en texto (prefijo + sufijo).
 */
export default function Logo({ onClick, height, variant = 'full' }) {
  const { brand } = site;
  const [imageFailed, setImageFailed] = useState(false);

  const src = variant === 'icon' ? brand.logoIcon : brand.logo;
  const useImage = brand.showLogoImage && src && !imageFailed;

  const resolvedHeight = height || {
    xs: brand.logoHeightMobile,
    md: brand.logoHeightDesktop,
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
      aria-label={brand.name}
    >
      {useImage ? (
        <Box
          component="img"
          src={src}
          alt={brand.name}
          onError={() => setImageFailed(true)}
          sx={{ height: resolvedHeight, width: 'auto', display: 'block' }}
        />
      ) : (
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.02em',
            fontSize: { xs: '1.35rem', md: '1.6rem' },
            color: 'text.primary',
            lineHeight: 1,
          }}
        >
          {brand.prefix}
          <Box component="span" sx={{ color: 'primary.main' }}>
            {brand.suffix}
          </Box>
        </Typography>
      )}
    </Box>
  );
}
