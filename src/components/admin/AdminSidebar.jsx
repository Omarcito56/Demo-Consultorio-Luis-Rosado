import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboardIcon, CalendarIcon, FileTextIcon, UsersIcon, 
  SettingsIcon, StethoscopeIcon, LogOutIcon, ArrowLeftIcon 
} from "../common/Icons";
import { useClinicData } from "../../hooks/useClinicData";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const { metrics } = useClinicData();

  const handleLogout = () => {
    localStorage.removeItem("clinicflow_auth");
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      {/* Sidebar Brand */}
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">
          <StethoscopeIcon size={20} />
        </div>
        <div>
          <h2 className="sidebar-title">Dr. Luis A. Rosado</h2>
          <span className="sidebar-sub">PANEL RECEPCIÓN</span>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="sidebar-nav">
        <li>
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <LayoutDashboardIcon size={18} />
            <span>Resumen</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/agenda" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <CalendarIcon size={18} />
            <span>Agenda</span>
            {metrics.today > 0 && <span className="sidebar-badge" style={{ backgroundColor: "var(--color-primary-light)" }}>{metrics.today} hoy</span>}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/citas" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <FileTextIcon size={18} />
            <span>Citas</span>
            {metrics.pending > 0 && <span className="sidebar-badge">{metrics.pending}</span>}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/pacientes" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <UsersIcon size={18} />
            <span>Pacientes</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/servicios" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <StethoscopeIcon size={18} />
            <span>Servicios</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/configuracion" 
            className={({ isActive }) => `sidebar-item-link ${isActive ? "active" : ""}`}
          >
            <SettingsIcon size={18} />
            <span>Configuración</span>
          </NavLink>
        </li>
      </ul>

      {/* Footer / Exit */}
      <div className="sidebar-footer">
        <Link to="/" className="sidebar-btn-public">
          <ArrowLeftIcon size={14} />
          <span>Ver sitio del consultorio</span>
        </Link>
        <button type="button" className="sidebar-btn-logout" onClick={handleLogout}>
          <LogOutIcon size={14} />
          <span>Cerrar sesión demo</span>
        </button>
      </div>
    </aside>
  );
};
