import React, { useState } from "react";
import { useClinicData } from "../../hooks/useClinicData";
import { SearchIcon, ClockIcon, StethoscopeIcon } from "../../components/common/Icons";

export const AdminServicesPage = () => {
  const { services } = useClinicData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter((service) => {
    const term = searchTerm.toLowerCase();
    return (
      service.name.toLowerCase().includes(term) ||
      service.description.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Catálogo de Servicios y Consultas</h2>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>
              Tipos de consulta disponibles para agendar en línea con el Dr. Luis Armando Rosado.
            </p>
          </div>
          <div style={{ fontSize: "0.86rem", color: "var(--color-text-secondary)" }}>
            Total servicios: <strong>{filteredServices.length}</strong>
          </div>
        </div>

        {/* Search */}
        <div className="filter-bar">
          <div className="search-input-wrap">
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder="Buscar servicio por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Services Table */}
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre del Servicio</th>
                <th>Descripción</th>
                <th>Duración Estimada</th>
                <th>Precio Demo</th>
                <th>Etiqueta</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                      <div style={{ 
                        width: "36px", 
                        height: "36px", 
                        borderRadius: "8px", 
                        backgroundColor: "var(--color-primary-soft)", 
                        color: "var(--color-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <StethoscopeIcon size={18} />
                      </div>
                      <strong style={{ color: "var(--color-primary)" }}>{service.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.86rem", color: "var(--color-text-secondary)", maxWidth: "380px", display: "inline-block" }}>
                      {service.description}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      <ClockIcon size={14} />
                      <span>{service.duration}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <strong style={{ color: "var(--color-primary)" }}>{service.price}</strong>
                      <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>{service.priceNote}</div>
                    </div>
                  </td>
                  <td>
                    <span className="service-badge">{service.badge}</span>
                  </td>
                  <td>
                    <span className="status-badge status-Confirmada">
                      <span className="status-dot"></span>
                      {service.status || "Activo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#F8FAFC", borderRadius: "10px", border: "1px dashed #CBD5E1", fontSize: "0.84rem", color: "var(--color-text-secondary)" }}>
          ℹ️ <strong>Nota comercial de la demo:</strong> En la implementación real para el consultorio, los servicios, tiempos de consulta y precios se adaptan a la atención médica oficial del Dr. Luis Armando Rosado.
        </div>
      </div>
    </div>
  );
};
