import React from "react";

export const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Selecciona tu consulta",
      description: "Elige entre consulta general, seguimiento, valoración o control preventivo según tu necesidad."
    },
    {
      number: "2",
      title: "Elige fecha y horario",
      description: "Revisa los espacios disponibles del consultorio y escoge el horario que más te convenga."
    },
    {
      number: "3",
      title: "Completa tus datos",
      description: "Preregístrate con tu nombre, contacto y motivo general de consulta sin trámites complicados."
    },
    {
      number: "4",
      title: "Recibe confirmación",
      description: "Obtén tu folio de cita y confirmación con seguimiento directo por WhatsApp o llamada."
    }
  ];

  return (
    <section className="section section-alt" id="como-funciona">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Proceso Sencillo</span>
          <h2 className="section-title">¿Cómo funciona la agenda en línea?</h2>
          <p className="section-desc">
            En solo 4 pasos rápidos tendrás tu cita solicitada y organizada con el consultorio del Dr. Luis Armando Rosado.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-num-badge">{step.number}</div>
              <h3 className="step-card-title">{step.title}</h3>
              <p className="step-card-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
