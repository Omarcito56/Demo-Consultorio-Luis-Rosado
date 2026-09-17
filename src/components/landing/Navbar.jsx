import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { StethoscopeIcon, CalendarIcon, MenuIcon, XIcon, UserIcon } from "../common/Icons";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (id) => {
    closeMenu();
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="navbar-logo-icon">
            <StethoscopeIcon size={22} />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-brand-title">Dr. Luis Armando Rosado</span>
            <span className="navbar-brand-subtitle">Medicina Familiar • Reynosa</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="navbar-nav">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === "/" && !location.hash ? "active" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Inicio
              </Link>
            </li>
            <li>
              <button className="nav-link" onClick={() => scrollToSection("servicios")}>
                Consulta
              </button>
            </li>
            <li>
              <Link to="/agendar" className={`nav-link ${location.pathname === "/agendar" ? "active" : ""}`}>
                Agenda
              </Link>
            </li>
            <li>
              <button className="nav-link" onClick={() => scrollToSection("ubicacion")}>
                Ubicación
              </button>
            </li>
            <li>
              <button className="nav-link" onClick={() => scrollToSection("contacto")}>
                Contacto
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <Link to="/admin/login" className="admin-quicklink" title="Acceso al panel demo de recepción">
            <UserIcon size={14} />
            <span>Recepción</span>
          </Link>
          <Link to="/agendar" className="btn btn-primary btn-sm">
            <CalendarIcon size={16} />
            <span>Agendar consulta</span>
          </Link>
          <button 
            className="mobile-toggle-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú móvil"
          >
            {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <Link to="/" className="mobile-nav-link" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Inicio
            </Link>
            <button className="mobile-nav-link" onClick={() => scrollToSection("servicios")}>
              Consulta y Servicios
            </button>
            <Link to="/agendar" className="mobile-nav-link" onClick={closeMenu}>
              Agendar en línea
            </Link>
            <button className="mobile-nav-link" onClick={() => scrollToSection("ubicacion")}>
              Ubicación y Consultorio
            </button>
            <button className="mobile-nav-link" onClick={() => scrollToSection("contacto")}>
              Contacto
            </button>
            <div className="mobile-menu-actions">
              <Link to="/agendar" className="btn btn-primary" onClick={closeMenu}>
                <CalendarIcon size={18} />
                <span>Agendar consulta</span>
              </Link>
              <Link to="/admin/login" className="btn btn-secondary" onClick={closeMenu}>
                <UserIcon size={16} />
                <span>Acceso Recepción (Demo)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
