import React from "react";
import { Link } from "react-router-dom";
import { MapPinIcon, PhoneIcon, WhatsAppIcon, MailIcon, ClockIcon, StethoscopeIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/businessData";

export const Footer = () => {
  return (
    <footer className="footer" id="contacto">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Doctor info */}
          <div className="footer-col-brand">
            <h3 className="footer-brand-title">Dr. Luis Armando Rosado</h3>
            <p className="footer-brand-subtitle">Medicina Familiar / Atención Médica</p>
            <p className="footer-desc">
              Atención médica integral orientada al cuidado de la salud de pacientes y familias en Reynosa, Tamaulipas.
            </p>
            <div className="footer-demo-tag">
              Propuesta Demo • BS ClinicFlow
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="footer-heading">Navegación</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Inicio</Link></li>
              <li><a href="#servicios" className="footer-link">Tipos de consulta</a></li>
              <li><Link to="/agendar" className="footer-link">Agendar cita</Link></li>
              <li><a href="#como-funciona" className="footer-link">Cómo funciona</a></li>
              <li><a href="#ubicacion" className="footer-link">Ubicación</a></li>
              <li><Link to="/admin/login" className="footer-link">Acceso Recepción</Link></li>
            </ul>
          </div>

          {/* Ubicación y Horarios */}
          <div>
            <h4 className="footer-heading">Ubicación</h4>
            <div className="footer-contact-item">
              <MapPinIcon size={18} className="footer-contact-icon" />
              <span>
                <strong>{initialBusinessData.locationName}</strong><br />
                {initialBusinessData.address}
              </span>
            </div>
            <div className="footer-contact-item">
              <ClockIcon size={18} className="footer-contact-icon" />
              <span>
                <strong>Horarios de consulta:</strong><br />
                {initialBusinessData.schedule}
              </span>
            </div>
          </div>

          {/* Contacto directo */}
          <div>
            <h4 className="footer-heading">Contacto</h4>
            <div className="footer-contact-item">
              <PhoneIcon size={18} className="footer-contact-icon" />
              <span>{initialBusinessData.phone}</span>
            </div>
            <div className="footer-contact-item">
              <WhatsAppIcon size={18} className="footer-contact-icon" />
              <span>WhatsApp: {initialBusinessData.whatsapp}</span>
            </div>
            <div className="footer-contact-item">
              <MailIcon size={18} className="footer-contact-icon" />
              <span>{initialBusinessData.email}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Consultorio Dr. Luis Armando Rosado. Todos los derechos reservados.</p>
          <p>
            Desarrollado como demo interactiva por <strong>BS Code</strong> (Soluciones web para negocios de Reynosa, Tamps).
          </p>
        </div>
      </div>
    </footer>
  );
};
