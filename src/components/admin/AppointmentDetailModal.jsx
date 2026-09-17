import React from "react";
import { Modal } from "../common/Modal";
import { StatusBadge } from "../common/StatusBadge";
import { WhatsAppIcon, PhoneIcon, MailIcon, CalendarIcon, ClockIcon, UserIcon } from "../common/Icons";

export const AppointmentDetailModal = ({ isOpen, onClose, appointment }) => {
  if (!appointment) return null;

  const whatsappMessage = encodeURIComponent(
    `Hola ${appointment.patientName}, te contactamos del consultorio del Dr. Luis Armando Rosado respecto a tu consulta (${appointment.folio}) para el día ${appointment.date} a las ${appointment.time}.`
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Detalle de Cita: ${appointment.folio}`} maxWidth="620px">
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Top summary row */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          padding: "1rem", 
          background: "var(--color-primary-soft)", 
          borderRadius: "12px",
          border: "1px solid var(--color-primary-soft-border)"
        }}>
          <div>
            <span style={{ fontSize: "0.78rem", color: "var(--color-primary)", fontWeight: 700, textTransform: "uppercase" }}>
              FOLIO ASIGNADO
            </span>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--color-primary)", fontFamily: "monospace" }}>
              {appointment.folio}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", fontWeight: 600, display: "block", marginBottom: "4px" }}>
              ESTADO ACTUAL
            </span>
            <StatusBadge status={appointment.status} />
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="detail-grid">
          <div>
            <div className="detail-lbl">Paciente</div>
            <div className="detail-val">{appointment.patientName}</div>
          </div>

          <div>
            <div className="detail-lbl">Tipo de Paciente</div>
            <div className="detail-val">
              {appointment.isFirstTime ? "Primera vez (Nuevo)" : "Paciente subsecuente"}
            </div>
          </div>

          <div>
            <div className="detail-lbl">Teléfono / WhatsApp</div>
            <div className="detail-val" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>{appointment.patientPhone}</span>
              <a 
                href={`https://wa.me/52${appointment.patientPhone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#16A34A", display: "inline-flex" }}
                title="Abrir WhatsApp"
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          <div>
            <div className="detail-lbl">Correo Electrónico</div>
            <div className="detail-val">{appointment.patientEmail || "No registrado"}</div>
          </div>

          <div>
            <div className="detail-lbl">Fecha de Nacimiento</div>
            <div className="detail-val">{appointment.birthDate || "No especificada"}</div>
          </div>

          <div>
            <div className="detail-lbl">Tipo de Consulta</div>
            <div className="detail-val">{appointment.serviceName}</div>
          </div>

          <div>
            <div className="detail-lbl">Fecha Programada</div>
            <div className="detail-val" style={{ color: "var(--color-primary)" }}>{appointment.date}</div>
          </div>

          <div>
            <div className="detail-lbl">Horario Programado</div>
            <div className="detail-val" style={{ color: "var(--color-accent-hover)" }}>{appointment.time}</div>
          </div>

          <div className="detail-item-full">
            <div className="detail-lbl">Motivo General de Consulta</div>
            <div style={{ 
              background: "#F8FAFC", 
              padding: "0.85rem", 
              borderRadius: "8px", 
              border: "1px solid #E2E8F0",
              fontSize: "0.92rem",
              color: "var(--color-text-primary)"
            }}>
              {appointment.reason || "Sin motivo registrado"}
            </div>
          </div>

          {appointment.comments && (
            <div className="detail-item-full">
              <div className="detail-lbl">Comentarios Adicionales</div>
              <div style={{ 
                background: "#F8FAFC", 
                padding: "0.75rem", 
                borderRadius: "8px", 
                border: "1px solid #E2E8F0",
                fontSize: "0.88rem",
                color: "var(--color-text-secondary)"
              }}>
                {appointment.comments}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid #E2E8F0" }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Cerrar
          </button>
          <a 
            href={`https://wa.me/52${appointment.patientPhone}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
          >
            <WhatsAppIcon size={16} />
            <span>Contactar por WhatsApp</span>
          </a>
        </div>
      </div>
    </Modal>
  );
};
