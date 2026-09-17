import posthog from "posthog-js";
import { ANALYTICS_CONFIG } from "./analyticsConfig";

let isInitialized = false;

// Lista de campos sensibles bloqueados por privacidad médica
const FORBIDDEN_PROPERTY_KEYS = new Set([
  "name",
  "patientName",
  "patient_name",
  "phone",
  "patientPhone",
  "patient_phone",
  "whatsapp",
  "email",
  "patientEmail",
  "patient_email",
  "password",
  "birthDate",
  "birth_date",
  "reason",
  "comments",
  "medical_info",
  "diagnosis",
  "folio",
  "message"
]);

/**
 * Filtro de seguridad para garantizar que nunca se envíen datos personales a Analytics.
 */
const sanitizeProperties = (props = {}) => {
  if (!props || typeof props !== "object") return {};
  
  const clean = {};
  for (const [key, value] of Object.entries(props)) {
    if (!FORBIDDEN_PROPERTY_KEYS.has(key)) {
      clean[key] = value;
    }
  }
  return clean;
};

/**
 * Inicializa PostHog de forma segura y con Session Replay enmascarado.
 * Falla de forma silenciosa y segura si no existen variables de entorno.
 */
export const initAnalytics = () => {
  if (isInitialized) return true;

  const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
  const posthogHost = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!posthogKey) {
    // Si no hay key configurada, la app sigue funcionando con normalidad
    return false;
  }

  try {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      // Desactivamos autocapture para evitar capturar DOM o texto accidental
      autocapture: false,
      // Desactivamos captura automática de pageviews para controlarlo con React Router SPA
      capture_pageview: false,
      capture_pageleave: false,
      // Mantener visitantes anónimos sin crear perfiles identificados
      person_profiles: "identified_only",
      // Session Replay con enmascaramiento estricto de inputs y textareas
      disable_session_recording: false,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: ".ph-mask, [data-ph-mask]",
        maskInputOptions: {
          password: true,
          color: true,
          date: true,
          datetime: true,
          "datetime-local": true,
          email: true,
          month: true,
          number: true,
          range: true,
          search: true,
          tel: true,
          text: true,
          time: true,
          url: true,
          week: true,
          textarea: true,
          select: true
        }
      },
      loaded: (ph) => {
        // Registrar super properties globales para que TODOS los eventos y pageviews las incluyan
        ph.register({
          demo_id: ANALYTICS_CONFIG.demoId,
          prospect_id: ANALYTICS_CONFIG.prospectId,
          project_type: ANALYTICS_CONFIG.projectType
        });
      }
    });

    // Registrar también directamente en la instancia
    if (typeof posthog.register === "function") {
      posthog.register({
        demo_id: ANALYTICS_CONFIG.demoId,
        prospect_id: ANALYTICS_CONFIG.prospectId,
        project_type: ANALYTICS_CONFIG.projectType
      });
    }

    isInitialized = true;
    return true;
  } catch (error) {
    console.warn("[Analytics] Error al inicializar PostHog:", error);
    return false;
  }
};
// Registro de eventos recientes para deduplicar llamadas idénticas inmediatas (< 300ms)
// Protege contra dobles ejecuciones de React StrictMode y double-clicks rápidos
const recentEvents = new Map();
const DEDUPLICATION_WINDOW_MS = 300;

const isRapidDuplicate = (eventName, properties) => {
  const now = Date.now();
  const serialized = JSON.stringify(properties || {});
  const eventKey = `${eventName}::${serialized}`;
  const lastTime = recentEvents.get(eventKey);

  if (lastTime && now - lastTime < DEDUPLICATION_WINDOW_MS) {
    return true;
  }

  recentEvents.set(eventKey, now);

  // Limpieza periódica para mantener bajo consumo de memoria
  if (recentEvents.size > 50) {
    for (const [key, timestamp] of recentEvents.entries()) {
      if (now - timestamp > 5000) {
        recentEvents.delete(key);
      }
    }
  }

  return false;
};

// Registro para deduplicación de pageviews rápidos
let lastTrackedPageKey = "";
let lastTrackedPageTime = 0;

/**
 * Registra un evento personalizado en PostHog con super properties automáticas,
 * sanitización de privacidad y filtro anti-duplicados inmediatos.
 */
export const trackEvent = (eventName, properties = {}) => {
  if (!isInitialized) {
    // Intentar inicializar si las variables existen
    const initialized = initAnalytics();
    if (!initialized) return;
  }

  // Descartar llamadas idénticas que ocurran en el mismo ciclo (< 300ms)
  if (isRapidDuplicate(eventName, properties)) {
    return;
  }

  try {
    const cleanProps = sanitizeProperties(properties);
    
    // Inyectar propiedades constantes de la demo
    const finalProps = {
      demo_id: ANALYTICS_CONFIG.demoId,
      prospect_id: ANALYTICS_CONFIG.prospectId,
      project_type: ANALYTICS_CONFIG.projectType,
      ...cleanProps
    };

    posthog.capture(eventName, finalProps);
  } catch (error) {
    console.warn(`[Analytics] Error al registrar evento ${eventName}:`, error);
  }
};

/**
 * Registra un pageview en PostHog para SPAs con React Router.
 * Protegido contra duplicados ante StrictMode y re-renders consecutivos.
 */
export const trackPageView = (path, properties = {}) => {
  if (!isInitialized) {
    const initialized = initAnalytics();
    if (!initialized) return;
  }

  const now = Date.now();
  const targetPath = path || window.location.pathname;
  const pageKey = `${targetPath}::${JSON.stringify(properties || {})}`;

  if (lastTrackedPageKey === pageKey && now - lastTrackedPageTime < 300) {
    return;
  }

  lastTrackedPageKey = pageKey;
  lastTrackedPageTime = now;

  try {
    const cleanProps = sanitizeProperties(properties);
    const finalProps = {
      $current_url: window.location.href,
      path: targetPath,
      demo_id: ANALYTICS_CONFIG.demoId,
      prospect_id: ANALYTICS_CONFIG.prospectId,
      project_type: ANALYTICS_CONFIG.projectType,
      ...cleanProps
    };

    posthog.capture("$pageview", finalProps);
  } catch (error) {
    console.warn("[Analytics] Error al registrar pageview:", error);
  }
};

export { useTrackOnMount } from "./useTrackOnMount";

/**
 * Registra el evento 'demo_viewed' una única vez por sesión real de usuario.
 * Deduplica visitas ante re-renders o StrictMode mediante sessionStorage.
 */
export const trackDemoViewed = (source = "direct") => {
  try {
    const hasViewed = sessionStorage.getItem(`bs_demo_viewed_${ANALYTICS_CONFIG.demoId}`);
    if (!hasViewed) {
      sessionStorage.setItem(`bs_demo_viewed_${ANALYTICS_CONFIG.demoId}`, "true");
      trackEvent("demo_viewed", {
        source,
        entry_route: window.location.pathname
      });
    }
  } catch (e) {
    // sessionStorage puede fallar en iframes privados, fallback seguro
    trackEvent("demo_viewed", {
      source,
      entry_route: window.location.pathname
    });
  }
};
