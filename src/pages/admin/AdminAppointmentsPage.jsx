import React, { useState, useEffect } from "react";
import { useClinicData } from "../../hooks/useClinicData";
import { 
  SearchIcon, FilterIcon, EyeIcon, CheckIcon, CheckCircleIcon, 
  RefreshIcon, XIcon, WhatsAppIcon, AlertCircleIcon 
} from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { AppointmentDetailModal } from "../../components/admin/AppointmentDetailModal";
import { RescheduleModal } from "../../components/admin/RescheduleModal";
import { trackEvent, useTrackOnMount } from "../../analytics/analytics";

export const AdminAppointmentsPage = () => {
  const { appointments, updateAppointmentStatus, rescheduleAppointment } = useClinicData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("TODOS");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduleApt, setRescheduleApt] = useState(null);

  // Registrar apertura protegida contra duplicados de StrictMode
  useTrackOnMount("admin_requests_opened", { module: "appointments" });


  // Filter in real time by search and status
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientPhone.includes(searchTerm) ||
      apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "TODOS" || apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Reminder via wa.me:
  // "Hola [Paciente], te recordamos tu consulta con el Dr. Luis Armando Rosado el día [Fecha] a las [Hora]. Te esperamos."
  const sendWhatsAppReminder = (apt) => {
    // Evento de analytics: clic en recordatorio (sin datos personales del paciente)
    trackEvent("whatsapp_reminder_clicked", {
      module: "appointments",
      record_type: "appointment"
    });

    const text = `Hola ${apt.patientName}, te recordamos tu consulta con el Dr. Luis Armando Rosado el día ${apt.date} a las ${apt.time}. Te esperamos.`;
    const url = `https://wa.me/52${apt.patientPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Listado General de Citas</h2>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>
              Administra todas las solicitudes, confirma turnos y mantén actualizada la asistencia.
            </p>
          </div>

          <div style={{ fontSize: "0.86rem", color: "var(--color-text-secondary)" }}>
            Total registros: <strong>{filteredAppointments.length}</strong>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="filter-bar">
          <div className="search-input-wrap">
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder="Buscar por folio, paciente, teléfono o consulta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FilterIcon size={16} style={{ color: "var(--color-text-secondary)" }} />
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="TODOS">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Atendida">Atendida</option>
              <option value="Reagendada">Reagendada</option>
              <option value="Cancelada">Cancelada</option>
              <option value="No asistió">No asistió</option>
            </select>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Paciente</th>
                <th>Tipo de Consulta</th>
                <th>Fecha / Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-secondary)" }}>
                    No se encontraron citas que coincidan con los criterios de búsqueda.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <span className="table-folio-link ph-mask">{apt.folio}</span>
                    </td>
                    <td>
                      <div className="table-patient-name ph-mask">{apt.patientName}</div>
                      <div className="table-patient-contact ph-mask">{apt.patientPhone}</div>
                    </td>
                    <td>
                      <div>{apt.serviceName}</div>
                      {apt.isFirstTime && (
                        <span style={{ fontSize: "0.72rem", color: "var(--color-accent)", fontWeight: 600 }}>
                          Paciente nuevo
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--color-primary)" }}>{apt.date}</div>
                      <div style={{ fontSize: "0.82rem", color: "var(--color-accent-hover)", fontWeight: 700 }}>
                        {apt.time}
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={apt.status} />
                    </td>
                    <td>
                      <div className="table-actions-cell">
                        {/* 1. Ver detalle */}
                        <button
                          type="button"
                          className="btn btn-sm btn-action-view"
                          onClick={() => {
                            trackEvent("record_detail_opened", {
                              record_type: "appointment",
                              status: apt.status
                            });
                            setSelectedAppointment(apt);
                          }}
                          title="Ver detalle completo"
                        >
                          <EyeIcon size={14} />
                          <span>Detalle</span>
                        </button>

                        {/* 2. Confirmar */}
                        {apt.status !== "Confirmada" && apt.status !== "Atendida" && apt.status !== "Cancelada" && (
                          <button
                            type="button"
                            className="btn btn-sm btn-action-confirm"
                            onClick={() => updateAppointmentStatus(apt.id, "Confirmada")}
                            title="Confirmar cita"
                          >
                            <CheckIcon size={14} />
                            <span>Confirmar</span>
                          </button>
                        )}

                        {/* 3. Atender */}
                        {apt.status !== "Atendida" && apt.status !== "Cancelada" && (
                          <button
                            type="button"
                            className="btn btn-sm btn-action-attend"
                            onClick={() => updateAppointmentStatus(apt.id, "Atendida")}
                            title="Marcar consulta atendida"
                          >
                            <CheckCircleIcon size={14} />
                            <span>Atender</span>
                          </button>
                        )}

                        {/* 4. Reagendar */}
                        {apt.status !== "Cancelada" && (
                          <button
                            type="button"
                            className="btn btn-sm btn-action-reschedule"
                            onClick={() => setRescheduleApt(apt)}
                            title="Reagendar cita"
                          >
                            <RefreshIcon size={14} />
                            <span>Reagendar</span>
                          </button>
                        )}

                        {/* 5. Cancelar */}
                        {apt.status !== "Cancelada" && (
                          <button
                            type="button"
                            className="btn btn-sm btn-action-cancel"
                            onClick={() => updateAppointmentStatus(apt.id, "Cancelada")}
                            title="Cancelar cita"
                          >
                            <XIcon size={14} />
                            <span>Cancelar</span>
                          </button>
                        )}

                        {/* 6. Recordatorio por WhatsApp */}
                        <button
                          type="button"
                          className="btn btn-sm btn-action-wa"
                          onClick={() => sendWhatsAppReminder(apt)}
                          title="Enviar recordatorio por WhatsApp"
                        >
                          <WhatsAppIcon size={14} />
                          <span>Recordatorio</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AppointmentDetailModal
        isOpen={Boolean(selectedAppointment)}
        onClose={() => setSelectedAppointment(null)}
        appointment={selectedAppointment}
      />

      <RescheduleModal
        isOpen={Boolean(rescheduleApt)}
        onClose={() => setRescheduleApt(null)}
        appointment={rescheduleApt}
        onConfirm={rescheduleAppointment}
      />
    </div>
  );
};
