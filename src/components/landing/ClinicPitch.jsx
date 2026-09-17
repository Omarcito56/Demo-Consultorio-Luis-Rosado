import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheckIcon, UsersIcon, CheckCircleIcon, WhatsAppIcon, ClockIcon, ArrowRightIcon, EyeIcon } from "../common/Icons";
import { Modal } from "../common/Modal";

export const ClinicPitch = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="clinic-pitch-section">
      <div className="container">
        <div className="clinic-pitch-inner">
          {/* Left Column: Pitch Message */}
          <div>
            <span className="pitch-tag">Solución Digital BS ClinicFlow</span>
            <h2 className="pitch-title">Una agenda más organizada para el consultorio</h2>
            <p className="pitch-desc">
              Consulta citas próximas, pacientes registrados y solicitudes pendientes desde un panel sencillo diseñado para facilitar el trabajo diario de recepción.
            </p>
            
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button 
                className="btn btn-accent" 
                onClick={() => setModalOpen(true)}
              >
                <EyeIcon size={18} />
                <span>Ver cómo funciona</span>
              </button>
              <Link to="/admin/login" className="btn btn-secondary">
                <span>Probar acceso de recepción</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: 5 Feature Cards */}
          <div className="pitch-features-grid">
            <div className="pitch-feature-card">
              <div className="pitch-card-title">
                <CalendarCheckIcon size={18} style={{ color: "var(--color-accent)" }} />
                <span>Agenda organizada</span>
              </div>
              <p className="pitch-card-desc">
                Visualización clara de turnos de hoy, mañana y la semana sin cruces de horario.
              </p>
            </div>

            <div className="pitch-feature-card">
              <div className="pitch-card-title">
                <UsersIcon size={18} style={{ color: "var(--color-accent)" }} />
                <span>Pacientes registrados</span>
              </div>
              <p className="pitch-card-desc">
                Directorio automático de pacientes que se alimenta de cada cita solicitada.
              </p>
            </div>

            <div className="pitch-feature-card">
              <div className="pitch-card-title">
                <CheckCircleIcon size={18} style={{ color: "var(--color-accent)" }} />
                <span>Confirmaciones ágiles</span>
              </div>
              <p className="pitch-card-desc">
                Recepción valida solicitudes pendientes en 1 clic y mantiene informado al médico.
              </p>
            </div>

            <div className="pitch-feature-card">
              <div className="pitch-card-title">
                <WhatsAppIcon size={18} style={{ color: "var(--color-accent)" }} />
                <span>Recordatorios directos</span>
              </div>
              <p className="pitch-card-desc">
                Envío de mensaje de confirmación por WhatsApp en un clic para reducir inasistencias.
              </p>
            </div>

            <div className="pitch-feature-card" style={{ gridColumn: "1 / -1" }}>
              <div className="pitch-card-title">
                <ClockIcon size={18} style={{ color: "var(--color-accent)" }} />
                <span>Seguimiento de estados de citas</span>
              </div>
              <p className="pitch-card-desc">
                Control de citas Pendientes, Confirmadas, Atendidas, Reagendadas o Canceladas con registro en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory Modal "Ver cómo funciona" */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title="¿Cómo apoya el panel digital a la recepción del consultorio?"
        maxWidth="640px"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>
            El objetivo de esta solución para el <strong>Dr. Luis Armando Rosado</strong> es optimizar la atención de los pacientes sin complejidades de sistemas hospitalarios costosos:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ background: "var(--color-accent-soft)", color: "var(--color-accent-hover)", padding: "0.4rem", borderRadius: "8px", marginTop: "2px" }}>
                <CheckCircleIcon size={18} />
              </div>
              <div>
                <strong style={{ color: "var(--color-primary)", display: "block" }}>1. Reducción de mensajes repetitivos en WhatsApp</strong>
                <span style={{ color: "var(--color-text-secondary)", fontSize: "0.88rem" }}>
                  Los pacientes consultan directamente los turnos y servicios disponibles sin saturar la línea de recepción con preguntas de disponibilidad.
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ background: "var(--color-primary-soft)", color: "var(--color-primary)", padding: "0.4rem", borderRadius: "8px", marginTop: "2px" }}>
                <CheckCircleIcon size={18} />
              </div>
              <div>
                <strong style={{ color: "var(--color-primary)", display: "block" }}>2. Preregistro ordenado antes de que llegue el paciente</strong>
                <span style={{ color: "var(--color-text-secondary)", fontSize: "0.88rem" }}>
                  Al solicitar la cita, el paciente ingresa su nombre, WhatsApp, motivo general y si es primera consulta, ahorrando minutos valiosos en recepción.
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ background: "#EDE9FE", color: "#6D28D9", padding: "0.4rem", borderRadius: "8px", marginTop: "2px" }}>
                <CheckCircleIcon size={18} />
              </div>
              <div>
                <strong style={{ color: "var(--color-primary)", display: "block" }}>3. Menos pacientes que faltan o no avisan</strong>
                <span style={{ color: "var(--color-text-secondary)", fontSize: "0.88rem" }}>
                  Recepción tiene un botón para disparar el recordatorio por WhatsApp con el mensaje prearmado con folio, fecha y hora de la consulta.
                </span>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: "#F8FAFC", 
            border: "1px solid #E2E8F0", 
            borderRadius: "12px", 
            padding: "1rem", 
            textAlign: "center",
            marginTop: "0.5rem"
          }}>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", marginBottom: "0.75rem" }}>
              Puedes ingresar a explorar el panel de administración con las credenciales demo precargadas:
            </p>
            <Link 
              to="/admin/login" 
              className="btn btn-primary btn-sm"
              onClick={() => setModalOpen(false)}
            >
              <span>Ir al Panel de Recepción Demo</span>
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </Modal>
    </section>
  );
};
