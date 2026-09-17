import React, { useState } from "react";
import { useClinicData } from "../../hooks/useClinicData";
import { CheckIcon, RefreshIcon, AlertCircleIcon, ShieldIcon } from "../../components/common/Icons";

export const AdminSettingsPage = () => {
  const { business, updateBusiness, resetDemoData } = useClinicData();
  const [formData, setFormData] = useState({ ...business });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSavedSuccess(false);
    setResetSuccess(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateBusiness(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleReset = () => {
    if (window.confirm("¿Seguro que deseas restablecer todos los datos demo a los valores iniciales de fábrica? Esto volverá a cargar las citas y pacientes de muestra.")) {
      resetDemoData();
      setResetSuccess(true);
      setSavedSuccess(false);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div>
      <div className="admin-card" style={{ maxWidth: "800px" }}>
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Configuración General del Consultorio</h2>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>
              Personaliza los datos visibles del consultorio del Dr. Luis Armando Rosado.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="alert-banner alert-info" style={{ marginBottom: "1.5rem" }}>
            <div className="alert-content-left">
              <CheckIcon size={18} />
              <span>¡Configuración actualizada y guardada en localStorage correctamente!</span>
            </div>
          </div>
        )}

        {resetSuccess && (
          <div className="alert-banner alert-warning" style={{ marginBottom: "1.5rem" }}>
            <div className="alert-content-left">
              <RefreshIcon size={18} />
              <span>Restableciendo datos demo iniciales...</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="form-grid">
            <div>
              <label className="form-label" htmlFor="clinicName">Nombre del Consultorio</label>
              <input
                type="text"
                id="clinicName"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="form-label" htmlFor="doctorName">Nombre del Médico</label>
              <input
                type="text"
                id="doctorName"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="form-label" htmlFor="phone">Teléfono del Consultorio</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="form-label" htmlFor="whatsapp">WhatsApp de Recepción</label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="form-label" htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="form-label" htmlFor="primaryColor">Color Principal</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="color"
                  id="primaryColorPicker"
                  name="primaryColor"
                  value={formData.primaryColor || "#123C69"}
                  onChange={handleChange}
                  style={{ width: "45px", height: "42px", padding: "2px", cursor: "pointer" }}
                />
                <input
                  type="text"
                  id="primaryColor"
                  name="primaryColor"
                  value={formData.primaryColor || "#123C69"}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group-full">
              <label className="form-label" htmlFor="address">Dirección Física (Reynosa, Tamps.)</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-full">
              <label className="form-label" htmlFor="schedule">Horario de Atención</label>
              <input
                type="text"
                id="schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-full">
              <label className="form-label" htmlFor="confirmationMessage">Mensaje de Confirmación para Pacientes</label>
              <textarea
                id="confirmationMessage"
                name="confirmationMessage"
                rows="3"
                value={formData.confirmationMessage}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            paddingTop: "1.5rem", 
            borderTop: "1px solid #E2E8F0",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleReset}
              style={{ color: "#DC2626", borderColor: "#FCA5A5" }}
            >
              <RefreshIcon size={16} />
              <span>Restablecer datos demo</span>
            </button>

            <button type="submit" className="btn btn-primary">
              <CheckIcon size={18} />
              <span>Guardar configuración</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
