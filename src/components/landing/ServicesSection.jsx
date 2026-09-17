import React from "react";
import { Link } from "react-router-dom";
import { initialServicesData, servicesDisclaimer } from "../../data/servicesData";
import { ClockIcon, CalendarIcon, StethoscopeIcon, RefreshIcon, HeartIcon, ShieldIcon, ChatIcon } from "../common/Icons";

export const ServicesSection = () => {
  const getIcon = (type) => {
    switch (type) {
      case "stethoscope": return <StethoscopeIcon size={22} />;
      case "refresh": return <RefreshIcon size={22} />;
      case "heart": return <HeartIcon size={22} />;
      case "shield": return <ShieldIcon size={22} />;
      case "chat": return <ChatIcon size={22} />;
      default: return <StethoscopeIcon size={22} />;
    }
  };

  return (
    <section className="section" id="servicios">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Servicios del Consultorio</span>
          <h2 className="section-title">Tipos de Consulta Médica</h2>
          <p className="section-desc">
            Selecciona la opción que mejor se adapte a tu necesidad de atención y reserva tu fecha y horario en línea.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {initialServicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div>
                <div className="service-card-top">
                  <div className="service-icon-box">
                    {getIcon(service.iconType)}
                  </div>
                  <span className="service-badge">{service.badge}</span>
                </div>

                <h3 className="service-name">{service.name}</h3>
                <p className="service-desc">{service.description}</p>
              </div>

              <div>
                <div className="service-card-meta">
                  <div className="service-duration">
                    <ClockIcon size={16} />
                    <span>{service.duration} aprox.</span>
                  </div>
                  <div className="service-price-block">
                    <div className="service-price">{service.price}</div>
                    <div className="service-price-note">{service.priceNote}</div>
                  </div>
                </div>

                <Link 
                  to={`/agendar?service=${service.id}`} 
                  className="btn btn-secondary" 
                  style={{ width: "100%" }}
                >
                  <CalendarIcon size={16} />
                  <span>Agendar {service.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Notice */}
        <div className="services-disclaimer-box">
          ℹ️ <strong>Nota demostrativa:</strong> {servicesDisclaimer}
        </div>
      </div>
    </section>
  );
};
