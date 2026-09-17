import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { AnalyticsRouteTracker } from "./analytics/AnalyticsRouteTracker";


export function App() {
  return (
    <BrowserRouter>
      <AnalyticsRouteTracker />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
