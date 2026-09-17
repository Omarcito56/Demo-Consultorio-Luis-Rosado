import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useClinicData } from "../../hooks/useClinicData";
import { 
  CalendarIcon, ClockIcon, UserIcon, CheckCircleIcon, 
  AlertCircleIcon, FileTextIcon, ArrowRightIcon, EyeIcon 
} from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { AppointmentDetailModal } from "../../components/admin/AppointmentDetailModal";

export const AdminDashboardPage = () => {
  const { metrics, appointments } = useClinicData();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Filter upcoming active appointments (today and forward)
  const upcomingAppointments = appointments
    .filter((a) => a.status !== "Cancelada")
    .slice(0, 5);

  return (
    <div>
      {/* Top Metrics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-val">{metrics.today}</div>
            <div className="stat-label">Citas para hoy</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "var(--color-primary-soft)", color: "var(--color-primary)" }}>
            <CalendarIcon size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "#D97706" }}>{metrics.pending}</div>
            <div className="stat-label">Pendientes de confirmar</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}>
            <ClockIcon size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "var(--color-accent)" }}>{metrics.newPatientsToday || 1}</div>
            <div className="stat-label">Pacientes nuevos hoy</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)" }}>
            <UserIcon size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "#059669" }}>{metrics.confirmed}</div>
            <div className="stat-label">Citas confirmadas</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "#E6F8F4", color: "#059669" }}>
            <CheckCircleIcon size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "var(--color-primary)" }}>{metrics.attended}</div>
            <div className="stat-label">Citas atendidas</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "#EAF4FB", color: "var(--color-primary)" }}>
            <FileTextIcon size={22} />
          </div>
        </div>
      </div>

      {/* Reception Dynamic Alerts */}
      <div className="alerts-list">
        {metrics.pending > 0 && (
          <div className="alert-banner alert-warning">
            <div className="alert-content-left">
              <AlertCircleIcon size={18} />
              <span>
                Hay <strong>{metrics.pending} cita{metrics.pending > 1 ? "s" : ""} pendiente{metrics.pending > 1 ? "s" : ""} de confirmar</strong> en recepción.
              </span>
            </div>
            <Link to="/admin/citas" className="btn btn-sm btn-secondary">
              <span>Revisar y confirmar</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        )}

        <div className="alert-banner alert-info">
          <div className="alert-content-left">
            <UserIcon size={18} />
            <span>
              <strong>1 paciente nuevo</strong> registrado el día de hoy mediante la agenda web.
            </span>
          </div>
          <Link to="/admin/pacientes" className="btn btn-sm btn-secondary">
            <span>Ver directorio</span>
          </Link>
        </div>
      </div>

      {/* Grid: Upcoming Appointments and Recent Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "1.5rem" }}>
        {/* Upcoming Appointments Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Próximas Citas en Consulta</h3>
            <Link to="/admin/citas" style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--color-primary)" }}>
              Ver todas ({appointments.length}) →
            </Link>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Paciente</th>
                  <th>Consulta</th>
                  <th>Fecha / Hora</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <span className="table-folio-link">{apt.folio}</span>
                    </td>
                    <td>
                      <div className="table-patient-name">{apt.patientName}</div>
                      <div className="table-patient-contact">{apt.patientPhone}</div>
                    </td>
                    <td>{apt.serviceName}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--color-primary)" }}>{apt.time}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)" }}>{apt.date}</div>
                    </td>
                    <td>
                      <StatusBadge status={apt.status} />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-action-view"
                        onClick={() => setSelectedAppointment(apt)}
                        title="Ver detalle completo"
                      >
                        <EyeIcon size={14} />
                        <span>Detalle</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Actividad Reciente</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", fontSize: "0.88rem" }}>
              <span className="status-dot" style={{ backgroundColor: "var(--color-accent)", marginTop: "6px" }}></span>
              <div>
                <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>Nueva solicitud registrada:</span>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
                  Folio {appointments[0]?.folio || "MED-000125"} por {appointments[0]?.patientName || "Paciente"}.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", fontSize: "0.88rem" }}>
              <span className="status-dot" style={{ backgroundColor: "#059669", marginTop: "6px" }}></span>
              <div>
                <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>Cita confirmada por recepción:</span>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
                  Ana Martínez (9:00 a.m. - Consulta médica).
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", fontSize: "0.88rem" }}>
              <span className="status-dot" style={{ backgroundColor: "var(--color-primary)", marginTop: "6px" }}></span>
              <div>
                <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>Consulta atendida:</span>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
                  Miguel Hernández completó valoración de control.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", fontSize: "0.88rem" }}>
              <span className="status-dot" style={{ backgroundColor: "#7C3AED", marginTop: "6px" }}></span>
              <div>
                <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>Cita reagendada:</span>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
                  Fernanda Castillo cambió su horario a 5:30 p.m.
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1.75rem", paddingTop: "1rem", borderTop: "1px solid #F1F5F9", textAlign: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              Datos sincronizados localmente con localStorage
            </span>
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      <AppointmentDetailModal
        isOpen={Boolean(selectedAppointment)}
        onClose={() => setSelectedAppointment(null)}
        appointment={selectedAppointment}
      />
    </div>
  );
};
