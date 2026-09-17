import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { initAnalytics, trackPageView, trackDemoViewed } from "./analytics";

export const AnalyticsRouteTracker = () => {
  const location = useLocation();
  const lastPathnameRef = useRef(null);
  const isFirstMountRef = useRef(true);

  // Inicialización única al cargar la aplicación
  useEffect(() => {
    initAnalytics();
    trackDemoViewed("direct");
  }, []);

  // Seguimiento de cambios de ruta (Pageviews SPA sin duplicados)
  useEffect(() => {
    const fullPath = location.pathname + (location.search || "");

    // Evitar registrar la misma ruta consecutivamente ante doble render de React StrictMode
    if (lastPathnameRef.current === fullPath) {
      return;
    }

    lastPathnameRef.current = fullPath;

    // Registrar pageview en PostHog
    trackPageView(location.pathname, {
      search: location.search || undefined
    });
  }, [location.pathname, location.search]);

  return (
    <>
      {/* Vercel Web Analytics global único */}
      <VercelAnalytics />
    </>
  );
};
