import React, { useEffect } from "react";
import { Hero } from "../../components/landing/Hero";
import { AboutDoctor } from "../../components/landing/AboutDoctor";
import { ServicesSection } from "../../components/landing/ServicesSection";
import { HowItWorks } from "../../components/landing/HowItWorks";
import { PatientBenefits } from "../../components/landing/PatientBenefits";
import { ClinicPitch } from "../../components/landing/ClinicPitch";
import { LocationContact } from "../../components/landing/LocationContact";

export const HomePage = () => {
  useEffect(() => {
    // Handle hash scroll if arriving with hash like #servicios
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div>
      <Hero />
      <AboutDoctor />
      <ServicesSection />
      <HowItWorks />
      <PatientBenefits />
      <ClinicPitch />
      <LocationContact />
    </div>
  );
};
