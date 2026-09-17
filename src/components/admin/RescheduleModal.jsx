import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { CalendarIcon, ClockIcon, AlertCircleIcon } from "../common/Icons";

const DEMO_TIMES = [
  "9:00 a.m.",
  "10:00 a.m.",
  "11:30 a.m.",
  "1:00 p.m.",
  "4:00 p.m.",
  "5:30 p.m."
];

export const RescheduleModal = ({ isOpen, onClose, appointment, onConfirm }) => {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (appointment) {
      setNewDate(appointment.date || new Date().toISOString().split("T")[0]);
      setNewTime(appointment.time || "10:00 a.m.");
      setError("");
    }
  }, [appointment]);

  if (!appointment) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!newDate) {
      setError("Por favor selecciona una nueva fecha.");
      return;
    }
    if (!newTime) {
      setError("Por favor selecciona un horario.");
      return;
    }
    onConfirm(appointment.id, newDate, newTime);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reagendar Cita: ${appointment.folio}`} maxWidth="480px">
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {error && (
          <div className="alert-banner alert-warning">
            <div className="alert-content-left">
              <AlertCircleIcon size={16} />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div style={{ background: "#F8FAFC", padding: "0.85rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.84rem", color: "var(--color-text-secondary)" }}>Paciente:</div>
          <div style={{ fontWeight: 700, color: "var(--color-primary)" }}>{appointment.patientName}</div>
          <div style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>
            Fecha y hora actual: <strong>{appointment.date} — {appointment.time}</strong>
          </div>
        </div>

        <div>
          <label className="form-label" htmlFor="reschedule-date">
            <CalendarIcon size={16} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
            Nueva fecha:
          </label>
          <input
            type="date"
            id="reschedule-date"
            value={newDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>

        <div>
          <label className="form-label" htmlFor="reschedule-time">
            <ClockIcon size={16} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
            Nuevo horario:
          </label>
          <select
            id="reschedule-time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          >
            {DEMO_TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          gap: "0.75rem", 
          paddingTop: "1rem", 
          borderTop: "1px solid #E2E8F0" 
        }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            Guardar cambios
          </button>
        </div>
      </form>
    </Modal>
  );
};
