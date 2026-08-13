import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import site from '../config/site';

/**
 * Estado compartido de la vertical activa (barbería / uñas).
 * Al cambiarla, las secciones que la consumen (demos, galería, CTA)
 * se re-tiñen con el color de esa vertical.
 */
const VerticalContext = createContext(null);

export function VerticalProvider({ children }) {
  const [activeId, setActiveId] = useState(site.defaultVertical);

  const verticals = site.verticals;

  const active = useMemo(
    () => verticals.find((v) => v.id === activeId) || verticals[0] || null,
    [verticals, activeId]
  );

  const setVertical = useCallback((id) => {
    if (verticals.some((v) => v.id === id)) setActiveId(id);
  }, [verticals]);

  const value = useMemo(
    () => ({
      verticals,
      active,
      activeId: active ? active.id : null,
      setVertical,
      // Color de acento actual, con respaldo al color de marca
      accent: (active && active.color) || site.colors.primary,
      accent2: (active && active.color2) || site.colors.primary,
      hasMultiple: verticals.length > 1,
    }),
    [verticals, active, setVertical]
  );

  return <VerticalContext.Provider value={value}>{children}</VerticalContext.Provider>;
}

export function useVertical() {
  const context = useContext(VerticalContext);
  if (!context) {
    throw new Error('useVertical debe usarse dentro de <VerticalProvider>');
  }
  return context;
}

export default VerticalContext;
