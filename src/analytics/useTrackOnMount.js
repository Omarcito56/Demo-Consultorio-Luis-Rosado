import { useEffect, useRef } from "react";
import { trackEvent } from "./analytics";

/**
 * Hook para registrar eventos de apertura de página o módulo al montar un componente.
 * 
 * Protegido contra ejecuciones dobles en React StrictMode (desarrollo):
 * - Durante el montaje en StrictMode, React ejecuta Effect -> Cleanup -> Effect en la misma instancia.
 * - Al conservar `hasTrackedRef.current = true` entre las ejecuciones del efecto de la misma instancia,
 *   se ignora la segunda invocación.
 * - Al navegar a otra ruta y volver más tarde, React desmonta el componente anterior y crea una
 *   NUEVA instancia con su propio `hasTrackedRef` en false, permitiendo registrar legítimamente
 *   la nueva visita.
 * 
 * @param {string} eventName Nombre del evento (ej. 'admin_dashboard_opened')
 * @param {object} properties Propiedades adicionales seguras (cero PII)
 */
export const useTrackOnMount = (eventName, properties = {}) => {
  const hasTrackedRef = useRef(false);
  const propsRef = useRef(properties);
  propsRef.current = properties;

  useEffect(() => {
    if (hasTrackedRef.current) {
      return;
    }
    hasTrackedRef.current = true;
    trackEvent(eventName, propsRef.current);
  }, [eventName]);
};
