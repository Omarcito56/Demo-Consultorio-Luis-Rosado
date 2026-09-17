import React from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, UserIcon, CheckCircleIcon, ClockIcon, StethoscopeIcon, ShieldIcon } from "../common/Icons";

export const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        {/* Left Column: Text & CTAs */}
        <div className="hero-content">
          <div className="hero-pill-badge">
            <StethoscopeIcon size={16} />
            <span>Consultorio Médico • Reynosa, Tamps.</span>
          </div>

          <h1 className="hero-title">
            Tu consulta médica, ahora más <span className="hero-title-highlight">fácil de agendar</span>
          </h1>

          <p className="hero-subtitle">
            Consulta horarios disponibles, registra tus datos y solicita tu cita en línea de forma rápida y sencilla con el <strong>Dr. Luis Armando Rosado</strong>.
          </p>

          <div className="hero-actions">
            <Link to="/agendar" className="btn btn-primary">
              <CalendarIcon size={18} />
              <span>Agendar consulta</span>
            </Link>
            <a href="#atencion" className="btn btn-secondary">
              <span>Conocer atención</span>
            </a>
          </div>

          {/* Indicators row */}
          <div className="hero-indicators">
            <div className="indicator-item">
              <div className="indicator-icon-wrap">
                <UserIcon size={16} />
              </div>
              <span>Atención personalizada</span>
            </div>

            <div className="indicator-item">
              <div className="indicator-icon-wrap">
                <CalendarIcon size={16} />
              </div>
              <span>Agenda en línea</span>
            </div>

            <div className="indicator-item">
              <div className="indicator-icon-wrap">
                <CheckCircleIcon size={16} />
              </div>
              <span>Confirmación de cita</span>
            </div>

            <div className="indicator-item">
              <div className="indicator-icon-wrap">
                <ClockIcon size={16} />
              </div>
              <span>Recordatorios prácticos</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Preview Card */}
        <div className="hero-visual">
          <div className="hero-card-preview">
            <div className="preview-doctor-header">
              <div className="preview-avatar">
                DR
              </div>
              <div>
                <h4 className="preview-doc-name">Dr. Luis Armando Rosado</h4>
                <p className="preview-doc-sub">Medicina Familiar • Centro de Especialidades Médicas</p>
              </div>
            </div>

            <div className="preview-sample-appointment">
              <div className="preview-apt-title">Ejemplo de solicitud en línea</div>
              <div className="preview-apt-detail">
                <span style={{ color: "var(--color-text-secondary)" }}>Tipo de consulta:</span>
                <strong>Consulta médica</strong>
              </div>
              <div className="preview-apt-detail">
                <span style={{ color: "var(--color-text-secondary)" }}>Horario disponible:</span>
                <span style={{ color: "var(--color-accent-hover)", fontWeight: 700 }}>10:00 a.m. (Hoy / Mañana)</span>
              </div>
              <div className="preview-apt-detail">
                <span style={{ color: "var(--color-text-secondary)" }}>Estado inicial:</span>
                <span className="status-badge status-Pendiente">
                  <span className="status-dot"></span>
                  Pendiente de confirmación
                </span>
              </div>
            </div>

            <div className="preview-features-list">
              <div className="preview-feature-row">
                <CheckCircleIcon size={16} style={{ color: "var(--color-accent)" }} />
                <span>Sin filas ni esperas telefónicas prolongadas</span>
              </div>
              <div className="preview-feature-row">
                <CheckCircleIcon size={16} style={{ color: "var(--color-accent)" }} />
                <span>Recepción recibe la solicitud y confirma el horario</span>
              </div>
              <div className="preview-feature-row">
                <CheckCircleIcon size={16} style={{ color: "var(--color-accent)" }} />
                <span>Recordatorio directo por WhatsApp para el paciente</span>
              </div>
            </div>
          </div>

          <div className="hero-floating-badge">
            <ShieldIcon size={24} style={{ color: "var(--color-accent)" }} />
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)" }}>Preregistro seguro</div>
              <div style={{ fontSize: "0.74rem", color: "var(--color-text-secondary)" }}>Datos organizados en recepción</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
