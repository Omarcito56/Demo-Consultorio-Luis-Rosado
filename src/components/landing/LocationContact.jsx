import React from "react";
import { MapPinIcon, PhoneIcon, WhatsAppIcon, ClockIcon, MailIcon, CalendarIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/businessData";
import { Link } from "react-router-dom";

export const LocationContact = () => {
  return (
    <section className="section section-alt" id="ubicacion">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Ubicación y Atención</span>
          <h2 className="section-title">Encuéntranos en Reynosa</h2>
          <p className="section-desc">
            Instalaciones preparadas para brindarte comodidad, privacidad y atención médica con estacionamiento y fácil acceso.
          </p>
        </div>

        <div className="location-grid">
          {/* Card with details */}
          <div className="location-card">
            <div className="location-item">
              <div className="location-icon-box">
                <MapPinIcon size={22} />
              </div>
              <div>
                <h4 className="location-item-title">{initialBusinessData.locationName}</h4>
                <p className="location-item-text">{initialBusinessData.address}</p>
              </div>
            </div>

            <div className="location-item">
              <div className="location-icon-box">
                <ClockIcon size={22} />
              </div>
              <div>
                <h4 className="location-item-title">Horarios de consulta</h4>
                <p className="location-item-text">{initialBusinessData.schedule}</p>
              </div>
            </div>

            <div className="location-item">
              <div className="location-icon-box">
                <PhoneIcon size={22} />
              </div>
              <div>
                <h4 className="location-item-title">Teléfono del consultorio</h4>
                <p className="location-item-text">
                  <a href={`tel:${initialBusinessData.phone.replace(/\s+/g, "")}`} style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                    {initialBusinessData.phone}
                  </a>
                </p>
              </div>
            </div>

            <div className="location-item">
              <div className="location-icon-box" style={{ backgroundColor: "#DCFCE7", color: "#16A34A" }}>
                <WhatsAppIcon size={22} />
              </div>
              <div>
                <h4 className="location-item-title">WhatsApp de recepción</h4>
                <p className="location-item-text">
                  <a 
                    href={`https://wa.me/52${initialBusinessData.whatsapp}?text=${encodeURIComponent("Hola, me gustaría información sobre citas con el Dr. Luis Armando Rosado.")}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: "#16A34A", fontWeight: 600 }}
                  >
                    Enviar mensaje directo ({initialBusinessData.whatsapp})
                  </a>
                </p>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <Link to="/agendar" className="btn btn-primary" style={{ width: "100%" }}>
                <CalendarIcon size={18} />
                <span>Agendar consulta ahora</span>
              </Link>
            </div>
          </div>

          {/* Map Preview Representation */}
          <div className="map-placeholder-card">
            <div style={{ 
              width: "60px", 
              height: "60px", 
              borderRadius: "50%", 
              background: "var(--color-primary)", 
              color: "#FFFFFF", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              marginBottom: "1.25rem",
              boxShadow: "0 4px 12px rgba(18, 60, 105, 0.25)"
            }}>
              <MapPinIcon size={30} />
            </div>
            <h3 style={{ color: "var(--color-primary)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              Centro de Especialidades Médicas
            </h3>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", maxWidth: "340px", marginBottom: "1.5rem" }}>
              Zona céntrica y de fácil localización en Reynosa, Tamaulipas.
            </p>
            <div style={{ 
              backgroundColor: "#FFFFFF", 
              padding: "0.6rem 1.25rem", 
              borderRadius: "var(--radius-full)", 
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--color-primary)",
              border: "1px solid #CBD5E1"
            }}>
              📍 Reynosa, Tamaulipas • C.P. 88500
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
