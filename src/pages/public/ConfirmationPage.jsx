import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircleIcon, WhatsAppIcon, CalendarIcon, ArrowLeftIcon, MapPinIcon, ClockIcon } from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { initialBusinessData } from "../../data/businessData";

export const ConfirmationPage = () => {
  const location = useLocation();
  const appointment = location.state?.appointment || {
    folio: "MED-000128",
    patientName: "Paciente Demo",
    serviceName: "Consulta médica",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 a.m.",
    patientPhone: "8991234567",
    status: "Pendiente"
  };

  const whatsappMessage = encodeURIComponent(
    `Hola, registré mi solicitud de cita médica (Folio: ${appointment.folio}) con el Dr. Luis Armando Rosado para el día ${appointment.date} a las ${appointment.time}. Mi nombre es ${appointment.patientName}.`
  );

  return (
    <div className="booking-page-wrap">
      <div className="container">
        <div className="confirmation-card animate-fade-in">
          {/* Success Badge */}
          <div className="confirmation-check-badge">
            <CheckCircleIcon size={42} />
          </div>

          <span className="confirmation-folio-pill ph-mask">
            FOLIO: {appointment.folio}
          </span>

          <h1 className="confirmation-title">¡Solicitud registrada con éxito!</h1>
          
          <p className="confirmation-subtext">
            {initialBusinessData.confirmationMessage}
          </p>

          {/* Details Box */}
          <div className="confirmation-details-box">
            <div className="conf-detail-row">
              <span className="conf-detail-label">Paciente:</span>
              <span className="conf-detail-val ph-mask">{appointment.patientName}</span>
            </div>
            <div className="conf-detail-row">
              <span className="conf-detail-label">Tipo de consulta:</span>
              <span className="conf-detail-val">{appointment.serviceName}</span>
            </div>
            <div className="conf-detail-row">
              <span className="conf-detail-label">Fecha y horario:</span>
              <span className="conf-detail-val" style={{ color: "var(--color-primary)" }}>
                {appointment.date} — {appointment.time}
              </span>
            </div>
            <div className="conf-detail-row">
              <span className="conf-detail-label">Teléfono registrado:</span>
              <span className="conf-detail-val ph-mask">{appointment.patientPhone}</span>
            </div>
            <div className="conf-detail-row">
              <span className="conf-detail-label">Ubicación:</span>
              <span className="conf-detail-val">{initialBusinessData.locationName}</span>
            </div>
            <div className="conf-detail-row">
              <span className="conf-detail-label">Estado actual:</span>
              <StatusBadge status="Pendiente" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="confirmation-actions">
            <a 
              href={`https://wa.me/52${initialBusinessData.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon size={18} />
              <span>Confirmar o contactar por WhatsApp</span>
            </a>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.5rem" }}>
              <Link to="/agendar" className="btn btn-secondary">
                <CalendarIcon size={16} />
                <span>Agendar otra cita</span>
              </Link>
              <Link to="/" className="btn btn-outline">
                <ArrowLeftIcon size={16} />
                <span>Volver al inicio</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
