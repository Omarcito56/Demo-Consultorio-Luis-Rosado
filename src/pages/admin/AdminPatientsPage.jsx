import React, { useState } from "react";
import { useClinicData } from "../../hooks/useClinicData";
import { SearchIcon, UserIcon, PhoneIcon, MailIcon, CalendarIcon, WhatsAppIcon } from "../../components/common/Icons";

export const AdminPatientsPage = () => {
  const { patients, appointments } = useClinicData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter((patient) => {
    const term = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(term) ||
      patient.phone.includes(term) ||
      patient.email.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Directorio de Pacientes</h2>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>
              Pacientes registrados en el consultorio mediante la web y recepción.
            </p>
          </div>

          <div style={{ fontSize: "0.86rem", color: "var(--color-text-secondary)" }}>
            Total pacientes: <strong>{filteredPatients.length}</strong>
          </div>
        </div>

        {/* Search */}
        <div className="filter-bar">
          <div className="search-input-wrap">
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder="Buscar paciente por nombre, teléfono o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre del Paciente</th>
                <th>Teléfono / WhatsApp</th>
                <th>Correo Electrónico</th>
                <th>Última Consulta</th>
                <th>Total Citas</th>
                <th>Estado</th>
                <th>Contacto</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-secondary)" }}>
                    No se encontraron pacientes con los criterios de búsqueda.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                        <div style={{ 
                          width: "34px", 
                          height: "34px", 
                          borderRadius: "50%", 
                          backgroundColor: "var(--color-primary-soft)", 
                          color: "var(--color-primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.85rem"
                        }}>
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <div className="table-patient-name">{patient.name}</div>
                          {patient.birthDate && (
                            <div style={{ fontSize: "0.74rem", color: "var(--color-text-muted)" }}>
                              Nacimiento: {patient.birthDate}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{patient.phone}</span>
                    </td>
                    <td>
                      <span style={{ color: "var(--color-text-secondary)" }}>{patient.email || "—"}</span>
                    </td>
                    <td>
                      <span style={{ color: "var(--color-primary)", fontWeight: 500 }}>
                        {patient.lastAppointmentDate || "Pendiente"}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        backgroundColor: "#F1F5F9", 
                        padding: "0.2rem 0.55rem", 
                        borderRadius: "var(--radius-full)", 
                        fontSize: "0.8rem",
                        fontWeight: 700 
                      }}>
                        {patient.totalAppointments || 1} cita(s)
                      </span>
                    </td>
                    <td>
                      <span className="status-badge status-Confirmada">
                        <span className="status-dot"></span>
                        {patient.status || "Activo"}
                      </span>
                    </td>
                    <td>
                      <a 
                        href={`https://wa.me/52${patient.phone}?text=${encodeURIComponent(`Hola ${patient.name}, te contactamos del consultorio del Dr. Luis Armando Rosado.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-action-wa"
                        title="Enviar mensaje por WhatsApp"
                      >
                        <WhatsAppIcon size={14} />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
