import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { StethoscopeIcon, UserIcon, ArrowLeftIcon, AlertCircleIcon, ArrowRightIcon } from "../../components/common/Icons";

export const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Demo credentials check
    if (email.trim() === "admin@clinicflow.com" && password === "demo123") {
      localStorage.setItem("clinicflow_auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Credenciales incorrectas. Utiliza el usuario demo indicado abajo.");
    }
  };

  const handleFillDemoCreds = () => {
    setEmail("admin@clinicflow.com");
    setPassword("demo123");
    setError("");
  };

  return (
    <div className="login-page-wrap">
      <div className="login-card animate-fade-in">
        <div className="login-brand-header">
          <div className="login-logo-circle">
            <StethoscopeIcon size={28} />
          </div>
          <span className="login-demo-pill">Acceso demo de recepción</span>
          <h1 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "0.35rem" }}>
            Consultorio Dr. Luis Armando Rosado
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)" }}>
            Ingreso al panel de gestión de citas y pacientes
          </p>
        </div>

        {error && (
          <div className="alert-banner alert-warning" style={{ marginBottom: "1.25rem" }}>
            <div className="alert-content-left">
              <AlertCircleIcon size={16} />
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div>
            <label className="form-label" htmlFor="admin-email">
              Correo electrónico demo
            </label>
            <input
              type="email"
              id="admin-email"
              value={email}
              placeholder="admin@clinicflow.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label" htmlFor="admin-pass">
              Contraseña demo
            </label>
            <input
              type="password"
              id="admin-pass"
              value={password}
              placeholder="demo123"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
            <span>Ingresar al panel</span>
            <ArrowRightIcon size={16} />
          </button>
        </form>

        {/* Quick demo credentials filler */}
        <div className="login-quick-creds">
          <p style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "0.35rem" }}>
            Credenciales de prueba:
          </p>
          <div style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "var(--color-text-primary)", marginBottom: "0.75rem" }}>
            Usuario: <strong>admin@clinicflow.com</strong><br />
            Contraseña: <strong>demo123</strong>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleFillDemoCreds}
            style={{ width: "100%" }}
          >
            Autocompletar credenciales demo
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/" style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <ArrowLeftIcon size={14} />
            <span>Volver al sitio público del consultorio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
