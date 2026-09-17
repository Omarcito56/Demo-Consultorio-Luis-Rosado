import React from "react";

export const StatusBadge = ({ status = "Pendiente", className = "" }) => {
  // Normalize class name for safe CSS targeting
  const safeClass = status.replace(/\s+/g, "");
  
  return (
    <span className={`status-badge status-${safeClass} ${className}`}>
      <span className="status-dot"></span>
      <span>{status}</span>
    </span>
  );
};
