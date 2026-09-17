import React from "react";
import { Link } from "react-router-dom";
import { StethoscopeIcon, MapPinIcon, CheckIcon, CalendarIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/businessData";

export const AboutDoctor = () => {
  return (
    <section className="section section-alt" id="atencion">
      <div className="container about-grid">
        {/* Doctor Card Badge */}
        <div className="about-card-badge">
          <div className="about-avatar-large">
            <StethoscopeIcon size={46} />
          </div>
          <h3 className="about-doc-name">{initialBusinessData.doctorName}</h3>
          <p className="about-doc-spec">{initialBusinessData.specialty}</p>
          <div className="about-doc-location">
            <MapPinIcon size={16} />
            <span>{initialBusinessData.locationName} • Reynosa</span>
          </div>
        </div>

        {/* Narrative & Care Philosophy */}
        <div className="about-content">
          <span className="section-tag">Atención Médica en Reynosa</span>
          <h2 className="about-content-title">Atención médica cercana y profesional</h2>
          
          <p className="about-content-text">
            El consultorio del <strong>{initialBusinessData.doctorName}</strong> está enfocado en brindar una atención clínica accesible, respetuosa y orientada a la salud integral de pacientes y sus familias.
          </p>
          <p className="about-content-text">
            Creemos que una buena consulta comienza con una escucha atenta, un espacio de confianza y una orientación clara sobre prevención y tratamiento.
          </p>

          <div className="about-points-list">
            <div className="about-point-item">
              <CheckIcon size={18} className="about-point-icon" />
              <span><strong>Consulta cercana:</strong> Trato humano y tiempo dedicado a cada paciente para comprender sus inquietudes.</span>
            </div>
            <div className="about-point-item">
              <CheckIcon size={18} className="about-point-icon" />
              <span><strong>Enfoque preventivo:</strong> Valoración oportuna y seguimiento de la salud general y hábitos de vida.</span>
            </div>
            <div className="about-point-item">
              <CheckIcon size={18} className="about-point-icon" />
              <span><strong>Organización eficiente:</strong> Agendamiento en línea para planificar tu visita con orden y puntualidad.</span>
            </div>
          </div>

          <Link to="/agendar" className="btn btn-primary">
            <CalendarIcon size={18} />
            <span>Solicitar cita de valoración</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
