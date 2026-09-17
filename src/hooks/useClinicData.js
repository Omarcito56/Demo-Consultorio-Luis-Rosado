import { useState, useEffect, useCallback } from "react";
import { initialBusinessData } from "../data/businessData";
import { initialServicesData } from "../data/servicesData";
import { initialPatientsData } from "../data/patientsData";
import { initialAppointmentsData } from "../data/appointmentsData";

const STORAGE_KEYS = {
  BUSINESS: "clinicflow_business",
  SERVICES: "clinicflow_services",
  PATIENTS: "clinicflow_patients",
  APPOINTMENTS: "clinicflow_appointments",
  AUTH: "clinicflow_auth"
};

// Safe JSON loader
const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("clinicflow_storage_updated"));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
};

export const useClinicData = () => {
  const [business, setBusiness] = useState(() => getStored(STORAGE_KEYS.BUSINESS, initialBusinessData));
  const [services, setServices] = useState(() => getStored(STORAGE_KEYS.SERVICES, initialServicesData));
  const [patients, setPatients] = useState(() => getStored(STORAGE_KEYS.PATIENTS, initialPatientsData));
  const [appointments, setAppointments] = useState(() => getStored(STORAGE_KEYS.APPOINTMENTS, initialAppointmentsData));

  // Sync state on mount and ensure localStorage is seeded
  const refreshFromStorage = useCallback(() => {
    // Seed if empty
    if (!localStorage.getItem(STORAGE_KEYS.BUSINESS)) {
      localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(initialBusinessData));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialServicesData));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(initialPatientsData));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(initialAppointmentsData));
    }

    setBusiness(getStored(STORAGE_KEYS.BUSINESS, initialBusinessData));
    setServices(getStored(STORAGE_KEYS.SERVICES, initialServicesData));
    setPatients(getStored(STORAGE_KEYS.PATIENTS, initialPatientsData));
    setAppointments(getStored(STORAGE_KEYS.APPOINTMENTS, initialAppointmentsData));
  }, []);

  useEffect(() => {
    refreshFromStorage();

    const handleStorageChange = () => {
      refreshFromStorage();
    };

    window.addEventListener("clinicflow_storage_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("clinicflow_storage_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refreshFromStorage]);

  // Create new appointment
  const createAppointment = (formData) => {
    const currentApts = getStored(STORAGE_KEYS.APPOINTMENTS, initialAppointmentsData);
    const currentPats = getStored(STORAGE_KEYS.PATIENTS, initialPatientsData);

    // Compute next sequential folio: MED-000128 etc.
    let nextNum = 126;
    currentApts.forEach((apt) => {
      if (apt.folio && apt.folio.startsWith("MED-")) {
        const numPart = parseInt(apt.folio.replace("MED-", ""), 10);
        if (!isNaN(numPart) && numPart >= nextNum) {
          nextNum = numPart + 1;
        }
      }
    });

    const paddedNum = String(nextNum).padStart(6, "0");
    const folio = `MED-${paddedNum}`;

    const newAppointment = {
      id: `apt-${Date.now()}`,
      folio,
      patientName: formData.patientName || "Paciente",
      patientPhone: formData.patientPhone || "",
      patientEmail: formData.patientEmail || "",
      birthDate: formData.birthDate || "",
      isFirstTime: Boolean(formData.isFirstTime),
      serviceId: formData.serviceId,
      serviceName: formData.serviceName || "Consulta médica",
      date: formData.date,
      time: formData.time,
      reason: formData.reason || "Consulta médica",
      comments: formData.comments || "",
      status: "Pendiente",
      createdAt: new Date().toISOString()
    };

    const updatedApts = [newAppointment, ...currentApts];
    setStored(STORAGE_KEYS.APPOINTMENTS, updatedApts);

    // Check if patient exists in patients list by phone or email
    const patientIndex = currentPats.findIndex(
      (p) =>
        (formData.patientPhone && p.phone === formData.patientPhone) ||
        (formData.patientEmail && p.email.toLowerCase() === formData.patientEmail.toLowerCase())
    );

    let updatedPats = [...currentPats];
    if (patientIndex >= 0) {
      // Update existing patient
      updatedPats[patientIndex] = {
        ...updatedPats[patientIndex],
        lastAppointmentDate: formData.date,
        totalAppointments: (updatedPats[patientIndex].totalAppointments || 1) + 1,
        status: "Activo"
      };
    } else {
      // Create new patient
      const newPatient = {
        id: `pat-${Date.now()}`,
        name: formData.patientName,
        phone: formData.patientPhone,
        email: formData.patientEmail,
        birthDate: formData.birthDate || "",
        lastAppointmentDate: formData.date,
        totalAppointments: 1,
        status: "Activo"
      };
      updatedPats = [newPatient, ...updatedPats];
    }
    setStored(STORAGE_KEYS.PATIENTS, updatedPats);

    return newAppointment;
  };

  // Update appointment status
  const updateAppointmentStatus = (id, newStatus) => {
    const currentApts = getStored(STORAGE_KEYS.APPOINTMENTS, initialAppointmentsData);
    const updatedApts = currentApts.map((apt) =>
      apt.id === id ? { ...apt, status: newStatus } : apt
    );
    setStored(STORAGE_KEYS.APPOINTMENTS, updatedApts);
  };

  // Reschedule appointment
  const rescheduleAppointment = (id, newDate, newTime) => {
    const currentApts = getStored(STORAGE_KEYS.APPOINTMENTS, initialAppointmentsData);
    const updatedApts = currentApts.map((apt) =>
      apt.id === id
        ? {
            ...apt,
            date: newDate,
            time: newTime,
            status: "Reagendada"
          }
        : apt
    );
    setStored(STORAGE_KEYS.APPOINTMENTS, updatedApts);
  };

  // Update business configuration
  const updateBusiness = (updatedData) => {
    setStored(STORAGE_KEYS.BUSINESS, { ...business, ...updatedData });
  };

  // Reset demo data to factory defaults
  const resetDemoData = () => {
    localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(initialBusinessData));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialServicesData));
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(initialPatientsData));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(initialAppointmentsData));
    refreshFromStorage();
  };

  // Helper metrics for Admin Dashboard
  const getTodayISO = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayISO();

  const metrics = {
    total: appointments.length,
    today: appointments.filter((a) => a.date === todayStr && a.status !== "Cancelada").length,
    pending: appointments.filter((a) => a.status === "Pendiente").length,
    confirmed: appointments.filter((a) => a.status === "Confirmada").length,
    attended: appointments.filter((a) => a.status === "Atendida").length,
    rescheduled: appointments.filter((a) => a.status === "Reagendada").length,
    cancelled: appointments.filter((a) => a.status === "Cancelada").length,
    newPatientsToday: appointments.filter((a) => a.date === todayStr && a.isFirstTime).length
  };

  return {
    business,
    services,
    patients,
    appointments,
    metrics,
    createAppointment,
    updateAppointmentStatus,
    rescheduleAppointment,
    updateBusiness,
    resetDemoData,
    refreshFromStorage
  };
};
