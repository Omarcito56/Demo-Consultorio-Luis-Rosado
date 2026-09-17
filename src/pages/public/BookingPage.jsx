import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useClinicData } from "../../hooks/useClinicData";
import { 
  CalendarIcon, ClockIcon, UserIcon, ArrowRightIcon, ArrowLeftIcon, 
  CheckIcon, StethoscopeIcon, ShieldIcon, AlertCircleIcon 
} from "../../components/common/Icons";

const TIME_SLOTS = [
  "9:00 a.m.",
  "10:00 a.m.",
  "11:30 a.m.",
  "1:00 p.m.",
  "4:00 p.m.",
  "5:30 p.m."
];

export const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { services, createAppointment, appointments } = useClinicData();

  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState("");

  // Get minimum date (today) string in YYYY-MM-DD
  const getTodayISO = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const initialServiceId = searchParams.get("service") || (services[0]?.id || "consulta-medica");

  const [bookingData, setBookingData] = useState({
    serviceId: initialServiceId,
    serviceName: "",
    servicePrice: "",
    serviceDuration: "",
    date: getTodayISO(),
    time: "10:00 a.m.",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    birthDate: "",
    isFirstTime: true,
    reason: "",
    comments: "",
    privacyAccepted: false
  });

  // Keep service details in sync when serviceId changes
  useEffect(() => {
    const selected = services.find((s) => s.id === bookingData.serviceId) || services[0];
    if (selected) {
      setBookingData((prev) => ({
        ...prev,
        serviceId: selected.id,
        serviceName: selected.name,
        servicePrice: selected.price,
        serviceDuration: selected.duration
      }));
    }
  }, [bookingData.serviceId, services]);

  const handleServiceSelect = (service) => {
    setBookingData((prev) => ({
      ...prev,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      serviceDuration: service.duration
    }));
    setFormError("");
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setFormError("");
  };

  // Check if a time slot on the selected date is already booked
  const isSlotBooked = (time) => {
    return appointments.some(
      (apt) => apt.date === bookingData.date && apt.time === time && apt.status !== "Cancelada"
    );
  };

  // Step validations
  const validateStep = () => {
    setFormError("");
    if (currentStep === 1) {
      if (!bookingData.serviceId) {
        setFormError("Por favor selecciona un tipo de consulta.");
        return false;
      }
    } else if (currentStep === 2) {
      if (!bookingData.date) {
        setFormError("Por favor selecciona una fecha válida.");
        return false;
      }
      if (!bookingData.time) {
        setFormError("Por favor selecciona un horario de consulta.");
        return false;
      }
    } else if (currentStep === 3) {
      if (!bookingData.patientName.trim()) {
        setFormError("Por favor ingresa tu nombre completo.");
        return false;
      }
      if (!bookingData.patientPhone.trim()) {
        setFormError("Por favor ingresa tu teléfono o WhatsApp de contacto.");
        return false;
      }
      if (bookingData.patientPhone.replace(/\D/g, "").length < 10) {
        setFormError("El número de teléfono debe tener al menos 10 dígitos para contacto.");
        return false;
      }
      if (!bookingData.patientEmail.trim() || !bookingData.patientEmail.includes("@")) {
        setFormError("Por favor ingresa un correo electrónico válido.");
        return false;
      }
      if (!bookingData.reason.trim()) {
        setFormError("Por favor describe brevemente el motivo general de tu consulta.");
        return false;
      }
      if (!bookingData.privacyAccepted) {
        setFormError("Debes aceptar el aviso de privacidad para continuar.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 160, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setFormError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 160, behavior: "smooth" });
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    // Create appointment in localStorage
    const newAppointment = createAppointment(bookingData);

    // Redirect to confirmation page passing created data
    navigate("/confirmacion", { state: { appointment: newAppointment } });
  };

  return (
    <div className="booking-page-wrap">
      <div className="container">
        {/* Header */}
        <div className="booking-header">
          <h1 className="booking-header-title">Agenda tu Consulta Médica</h1>
          <p className="booking-header-sub">
            Dr. Luis Armando Rosado • Centro de Especialidades Médicas, Reynosa
          </p>
        </div>

        {/* Wizard Progress Bar */}
        <div className="wizard-steps-bar">
          <div className="wizard-connector-line"></div>

          <div 
            className={`wizard-step-node ${currentStep === 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}
            onClick={() => currentStep > 1 && setCurrentStep(1)}
          >
            <div className="wizard-step-circle">
              {currentStep > 1 ? <CheckIcon size={18} /> : "1"}
            </div>
            <span className="wizard-step-label">Consulta</span>
          </div>

          <div 
            className={`wizard-step-node ${currentStep === 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}
            onClick={() => currentStep > 2 && setCurrentStep(2)}
          >
            <div className="wizard-step-circle">
              {currentStep > 2 ? <CheckIcon size={18} /> : "2"}
            </div>
            <span className="wizard-step-label">Fecha y Hora</span>
          </div>

          <div 
            className={`wizard-step-node ${currentStep === 3 ? "active" : ""} ${currentStep > 3 ? "completed" : ""}`}
            onClick={() => currentStep > 3 && setCurrentStep(3)}
          >
            <div className="wizard-step-circle">
              {currentStep > 3 ? <CheckIcon size={18} /> : "3"}
            </div>
            <span className="wizard-step-label">Preregistro</span>
          </div>

          <div className={`wizard-step-node ${currentStep === 4 ? "active" : ""}`}>
            <div className="wizard-step-circle">4</div>
            <span className="wizard-step-label">Resumen</span>
          </div>
        </div>

        {/* Wizard Main Card */}
        <div className="wizard-card animate-fade-in">
          {formError && (
            <div className="alert-banner alert-warning" style={{ marginBottom: "1.5rem" }}>
              <div className="alert-content-left">
                <AlertCircleIcon size={18} />
                <span>{formError}</span>
              </div>
            </div>
          )}

          {/* STEP 1: Tipo de Consulta */}
          {currentStep === 1 && (
            <div>
              <h2 className="wizard-step-title">Paso 1: Selecciona el tipo de consulta</h2>
              <p className="wizard-step-desc">
                Escoge el servicio médico que requieres para revisar los tiempos de atención correspondientes.
              </p>

              <div className="service-select-list">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`service-select-item ${bookingData.serviceId === service.id ? "selected" : ""}`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="service-select-left">
                      <div className="service-radio-custom">
                        {bookingData.serviceId === service.id && <div className="service-radio-dot"></div>}
                      </div>
                      <div className="service-select-info">
                        <h4>{service.name}</h4>
                        <p>{service.description}</p>
                      </div>
                    </div>

                    <div className="service-select-right">
                      <div className="service-select-price">{service.price}</div>
                      <div className="service-select-time">{service.duration} aprox.</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="wizard-nav-btns" style={{ justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  <span>Continuar a Fecha y Hora</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Fecha y Hora */}
          {currentStep === 2 && (
            <div>
              <h2 className="wizard-step-title">Paso 2: Elige fecha y horario</h2>
              <p className="wizard-step-desc">
                Horarios de consulta disponibles para {bookingData.serviceName || "tu atención médica"}.
              </p>

              <div className="datetime-grid">
                {/* Date Picker */}
                <div className="date-picker-box">
                  <label htmlFor="date">
                    <CalendarIcon size={16} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
                    Selecciona la fecha:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    min={getTodayISO()}
                    value={bookingData.date}
                    onChange={handleFieldChange}
                  />
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: "0.85rem" }}>
                    ℹ️ El consultorio atiende de Lunes a Sábado en horarios matutinos y vespertinos.
                  </div>
                </div>

                {/* Time Slots */}
                <div className="time-slots-box">
                  <label>
                    <ClockIcon size={16} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
                    Horarios disponibles:
                  </label>

                  <div className="slots-grid">
                    {TIME_SLOTS.map((slot) => {
                      const booked = isSlotBooked(slot);
                      return (
                        <button
                          type="button"
                          key={slot}
                          className={`slot-btn ${bookingData.time === slot ? "selected" : ""}`}
                          onClick={() => {
                            if (!booked) {
                              setBookingData((prev) => ({ ...prev, time: slot }));
                              setFormError("");
                            }
                          }}
                          disabled={booked}
                          style={booked ? { opacity: 0.45, cursor: "not-allowed", textDecoration: "line-through" } : {}}
                          title={booked ? "Horario ocupado" : "Disponible"}
                        >
                          <ClockIcon size={14} />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="wizard-nav-btns">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  <ArrowLeftIcon size={16} />
                  <span>Atrás</span>
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  <span>Continuar a Preregistro</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Preregistro */}
          {currentStep === 3 && (
            <div>
              <h2 className="wizard-step-title">Paso 3: Preregistro del Paciente</h2>
              <p className="wizard-step-desc">
                Ingresa tus datos de contacto básicos. No solicitamos historial clínico complejo en este paso.
              </p>

              <div className="form-grid">
                <div>
                  <label className="form-label" htmlFor="patientName">
                    Nombre completo <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    placeholder="Ej. María Garza Peña"
                    value={bookingData.patientName}
                    onChange={handleFieldChange}
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="patientPhone">
                    Teléfono / WhatsApp (10 dígitos) <span className="required-star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="patientPhone"
                    name="patientPhone"
                    placeholder="Ej. 8991234567"
                    value={bookingData.patientPhone}
                    onChange={handleFieldChange}
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="patientEmail">
                    Correo electrónico <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="patientEmail"
                    name="patientEmail"
                    placeholder="correo@ejemplo.com"
                    value={bookingData.patientEmail}
                    onChange={handleFieldChange}
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="birthDate">
                    Fecha de nacimiento (opcional)
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={bookingData.birthDate}
                    onChange={handleFieldChange}
                  />
                </div>

                <div className="form-group-full">
                  <label className="form-label">¿Es tu primera consulta en el consultorio?</label>
                  <div className="form-radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="isFirstTime"
                        value="true"
                        checked={bookingData.isFirstTime === true}
                        onChange={() => setBookingData((prev) => ({ ...prev, isFirstTime: true }))}
                      />
                      <span>Sí, es mi primera consulta</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="isFirstTime"
                        value="false"
                        checked={bookingData.isFirstTime === false}
                        onChange={() => setBookingData((prev) => ({ ...prev, isFirstTime: false }))}
                      />
                      <span>No, ya soy paciente del consultorio</span>
                    </label>
                  </div>
                </div>

                <div className="form-group-full">
                  <label className="form-label" htmlFor="reason">
                    Motivo general de la consulta <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="2"
                    placeholder="Ej. Valoración general por malestar respiratorio leve, chequeo de presión, dolor muscular..."
                    value={bookingData.reason}
                    onChange={handleFieldChange}
                  ></textarea>
                </div>

                <div className="form-group-full">
                  <label className="form-label" htmlFor="comments">
                    Comentarios adicionales u observaciones (opcional)
                  </label>
                  <input
                    type="text"
                    id="comments"
                    name="comments"
                    placeholder="Ej. Prefiero horario exacto, vengo acompañado..."
                    value={bookingData.comments}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              {/* Privacy Notice Acceptance */}
              <div className="privacy-notice-box">
                <input
                  type="checkbox"
                  id="privacyAccepted"
                  name="privacyAccepted"
                  className="privacy-checkbox"
                  checked={bookingData.privacyAccepted}
                  onChange={handleFieldChange}
                />
                <label htmlFor="privacyAccepted" style={{ cursor: "pointer" }}>
                  Acepto el <strong>aviso de privacidad del consultorio</strong>. Entiendo que los datos registrados serán utilizados exclusivamente para coordinar mi cita médica y recibir confirmación directa por parte del personal de recepción.
                </label>
              </div>

              <div className="wizard-nav-btns">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  <ArrowLeftIcon size={16} />
                  <span>Atrás</span>
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  <span>Revisar Resumen</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Resumen */}
          {currentStep === 4 && (
            <div>
              <h2 className="wizard-step-title">Paso 4: Resumen de tu solicitud</h2>
              <p className="wizard-step-desc">
                Verifica los datos antes de enviar tu solicitud al consultorio.
              </p>

              <div className="summary-card">
                <div className="summary-row">
                  <span className="summary-label">Médico tratante:</span>
                  <span className="summary-value">Dr. Luis Armando Rosado</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Ubicación:</span>
                  <span className="summary-value">Centro de Especialidades Médicas (Reynosa, Tamps.)</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Tipo de consulta:</span>
                  <span className="summary-value">{bookingData.serviceName} ({bookingData.serviceDuration})</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Fecha y horario:</span>
                  <span className="summary-value" style={{ color: "var(--color-accent-hover)" }}>
                    {bookingData.date} a las {bookingData.time}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Precio demo estimado:</span>
                  <span className="summary-value">{bookingData.servicePrice}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Nombre del paciente:</span>
                  <span className="summary-value">{bookingData.patientName}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Teléfono / WhatsApp:</span>
                  <span className="summary-value">{bookingData.patientPhone}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Correo:</span>
                  <span className="summary-value">{bookingData.patientEmail}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Primera consulta:</span>
                  <span className="summary-value">{bookingData.isFirstTime ? "Sí (Paciente nuevo)" : "No (Seguimiento)"}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Motivo general:</span>
                  <span className="summary-value" style={{ maxWidth: "340px" }}>{bookingData.reason}</span>
                </div>
              </div>

              <div className="wizard-nav-btns">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  <ArrowLeftIcon size={16} />
                  <span>Modificar datos</span>
                </button>
                <button type="button" className="btn btn-accent" onClick={handleSubmitAppointment} style={{ padding: "0.85rem 1.75rem", fontSize: "1.05rem" }}>
                  <CheckIcon size={20} />
                  <span>Solicitar cita</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
