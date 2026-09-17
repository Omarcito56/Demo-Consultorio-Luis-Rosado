import React from "react";
import { UserIcon, ClockIcon } from "../common/Icons";

export const AdminHeader = ({ title = "Panel de Recepción" }) => {
  const todayFormatted = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date());

  return (
    <header className="admin-header">
      <h1 className="admin-header-title">{title}</h1>

      <div className="admin-header-right">
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.86rem", color: "var(--color-text-secondary)" }}>
          <ClockIcon size={16} />
          <span style={{ textTransform: "capitalize" }}>{todayFormatted}</span>
        </div>

        <div className="admin-reception-pill">
          <span className="status-dot" style={{ backgroundColor: "var(--color-accent)", width: "8px", height: "8px" }}></span>
          <span>Recepción Activa</span>
        </div>
      </div>
    </header>
  );
};
