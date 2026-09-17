import React, { useState } from "react";
import { useClinicData } from "../../hooks/useClinicData";
import { 
  CalendarIcon, ClockIcon, EyeIcon, CheckIcon, CheckCircleIcon, 
  WhatsAppIcon, RefreshIcon 
} from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { AppointmentDetailModal } from "../../components/admin/AppointmentDetailModal";
import { RescheduleModal } from "../../components/admin/RescheduleModal";

export const AdminAgendaPage = () => {
  const { appointments, updateAppointmentStatus, rescheduleAppointment } = useClinicData();
  const [activeTab, setActiveTab] = useState("hoy"); // "hoy" | "manana" | "semana"
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduleApt, setRescheduleApt] = useState(null);

  // Helper date calculators
  const getISODate = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayStr = getISODate(0);
  const tomorrowStr = getISODate(1);

  // Helper for "Esta semana" (within next 7 days)
  const isWithinThisWeek = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date(todayStr);
    const in7Days = new Date();
    in7Days.setDate(today.getDate() + 7);
    return d >= today && d <= in7Days;
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === "hoy") {
      return apt.date === todayStr;
    } else if (activeTab === "manana") {
      return apt.date === tomorrowStr;
    } else if (activeTab === "semana") {
      return isWithinThisWeek(apt.date);
    }
    return true;
  });

  // Open WhatsApp reminder
  const sendWhatsAppReminder = (apt) => {
    const text = `Hola ${apt.patientName}, te recordamos tu consulta con el Dr. Luis Armando Rosado el día ${apt.date} a las ${apt.time}. Te esperamos.`;
    const url = `https://wa.me/52${apt.patientPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Agenda Diaria de Consultas</h2>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>
              Visualiza los turnos ordenados por franja horaria para el consultorio.
            </p>
          </div>

          {/* Agenda Tabs: Hoy, Mañana, Esta semana */}
          <div className="agenda-tabs" style={{ marginBottom: 0 }}>
            <button
              type="button"
              className={`agenda-tab-btn ${activeTab === "hoy" ? "active" : ""}`}
              onClick={() => setActiveTab("hoy")}
            >
              📅 Hoy ({appointments.filter((a) => a.date === todayStr).length})
            </button>
            <button
              type="button"
              className={`agenda-tab-btn ${activeTab === "manana" ? "active" : ""}`}
              onClick={() => setActiveTab("manana")}
            >
              🗓️ Mañana ({appointments.filter((a) => a.date === tomorrowStr).length})
            </button>
            <button
              type="button"
              className={`agenda-tab-btn ${activeTab === "semana" ? "active" : ""}`}
              onClick={() => setActiveTab("semana")}
            >
              📆 Esta semana ({appointments.filter((a) => isWithinThisWeek(a.date)).length})
            </button>
          </div>
        </div>

        {/* Table of appointments */}
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Paciente</th>
                <th>Consulta</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones de Recepción</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-secondary)" }}>
                    No hay citas programadas para este periodo en la agenda.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: "var(--color-primary)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <ClockIcon size={14} style={{ color: "var(--color-accent-hover)" }} />
                        <span>{apt.time}</span>
                      </div>
                    </td>
                    <td>
                      <div className="table-patient-name">{apt.patientName}</div>
                      <div className="table-patient-contact">
                        {apt.patientPhone} {apt.isFirstTime && <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>• Primera vez</span>}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{apt.serviceName}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{apt.folio}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>{apt.date}</span>
                    </td>
                    <td>
                      <StatusBadge status={apt.status} />
                    </td>
                    <td>
                      <div className="table-actions-cell">
                        <button
                          type="button"
                          className="btn btn-sm btn-action-view"
                          onClick={() => setSelectedAppointment(apt)}
                          title="Ver detalle completo"
                        >
                          <EyeIcon size={14} />
                          <span>Ver</span>
                        </button>

                        {apt.status === "Pendiente" && (
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

                        {apt.status === "Confirmada" && (
                          <button
                            type="button"
                            className="btn btn-sm btn-action-attend"
                            onClick={() => updateAppointmentStatus(apt.id, "Atendida")}
                            title="Marcar como atendida"
                          >
                            <CheckCircleIcon size={14} />
                            <span>Atender</span>
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn btn-sm btn-action-reschedule"
                          onClick={() => setRescheduleApt(apt)}
                          title="Reagendar horario"
                        >
                          <RefreshIcon size={14} />
                          <span>Reagendar</span>
                        </button>

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
