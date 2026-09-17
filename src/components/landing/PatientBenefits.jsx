import React from "react";
import { CalendarIcon, PhoneIcon, ClockIcon, CheckCircleIcon, WhatsAppIcon, ShieldIcon } from "../common/Icons";

export const PatientBenefits = () => {
  const benefits = [
    {
      icon: <CalendarIcon size={22} />,
      title: "Solicitud de cita en línea",
      description: "Agenda a cualquier hora y desde cualquier dispositivo sin necesidad de esperar a que el consultorio abra."
    },
    {
      icon: <PhoneIcon size={22} />,
      title: "Menos llamadas y esperas",
      description: "Olvídate de líneas ocupadas o mensajes de WhatsApp sin responder al momento de pedir tu cita."
    },
    {
      icon: <ClockIcon size={22} />,
      title: "Horarios disponibles claros",
      description: "Visualiza de forma transparente los días y turnos disponibles para tu consulta médica."
    },
    {
      icon: <CheckCircleIcon size={22} />,
      title: "Confirmación con folio",
      description: "Recibe un número único de seguimiento y la certeza de que tu espacio fue registrado para revisión."
    },
    {
      icon: <WhatsAppIcon size={22} />,
      title: "Recordatorio oportuno",
      description: "Recepción te envía recordatorio directo por WhatsApp para que no olvides tu fecha y hora asignada."
    },
    {
      icon: <ShieldIcon size={22} />,
      title: "Información centralizada",
      description: "Tus datos de contacto y motivo general de atención listos para agilizar tu recepción al llegar."
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Ventajas para ti</span>
          <h2 className="section-title">Beneficios para el Paciente</h2>
          <p className="section-desc">
            Diseñamos una experiencia ágil y sin complicaciones para que cuidar de tu salud sea más fácil.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon-wrap">
                {benefit.icon}
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
