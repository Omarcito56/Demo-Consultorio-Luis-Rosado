// Helper to format ISO date relative to current date (e.g. YYYY-MM-DD)
const getTodayString = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const initialAppointmentsData = [
  {
    id: "apt-121",
    folio: "MED-000121",
    patientName: "Ana Martínez",
    patientPhone: "8991456789",
    patientEmail: "ana.martinez@email.com",
    birthDate: "1991-05-14",
    isFirstTime: false,
    serviceId: "consulta-medica",
    serviceName: "Consulta médica",
    date: getTodayString(0), // Hoy
    time: "9:00 a.m.",
    reason: "Dolor recurrente en articulaciones y fatiga leve.",
    comments: "Paciente refiere que empeora por las mañanas.",
    status: "Confirmada",
    createdAt: new Date().toISOString()
  },
  {
    id: "apt-122",
    folio: "MED-000122",
    patientName: "Carlos Rivera",
    patientPhone: "8992345678",
    patientEmail: "carlos.rivera@email.com",
    birthDate: "1985-11-22",
    isFirstTime: false,
    serviceId: "consulta-seguimiento",
    serviceName: "Consulta de seguimiento",
    date: getTodayString(0), // Hoy
    time: "11:30 a.m.",
    reason: "Revisión de presión arterial y ajuste de dosis indicada.",
    comments: "Trae bitácora de presión de los últimos 7 días.",
    status: "Pendiente",
    createdAt: new Date().toISOString()
  },
  {
    id: "apt-123",
    folio: "MED-000123",
    patientName: "Brenda López",
    patientPhone: "8993456789",
    patientEmail: "brenda.lopez@email.com",
    birthDate: "1994-03-08",
    isFirstTime: true,
    serviceId: "valoracion-general",
    serviceName: "Valoración general",
    date: getTodayString(1), // Mañana
    time: "10:00 a.m.",
    reason: "Chequeo médico preventivo general para ingreso laboral.",
    comments: "Primera vez en el consultorio.",
    status: "Pendiente",
    createdAt: new Date().toISOString()
  },
  {
    id: "apt-124",
    folio: "MED-000124",
    patientName: "Miguel Hernández",
    patientPhone: "8994567890",
    patientEmail: "miguel.hernandez@email.com",
    birthDate: "1978-08-30",
    isFirstTime: false,
    serviceId: "control-preventivo",
    serviceName: "Control preventivo",
    date: getTodayString(0), // Hoy
    time: "4:00 p.m.",
    reason: "Control mensual de glucosa y hábitos nutricionales.",
    comments: "Acude puntualmente por la tarde.",
    status: "Atendida",
    createdAt: new Date().toISOString()
  },
  {
    id: "apt-125",
    folio: "MED-000125",
    patientName: "Fernanda Castillo",
    patientPhone: "8995678901",
    patientEmail: "fernanda.castillo@email.com",
    birthDate: "1998-12-05",
    isFirstTime: true,
    serviceId: "orientacion-medica",
    serviceName: "Orientación médica",
    date: getTodayString(2), // Pasado mañana
    time: "5:30 p.m.",
    reason: "Orientación respecto a síntomas digestivos tras viaje.",
    comments: "Solicitó reagendar por horario de trabajo.",
    status: "Reagendada",
    createdAt: new Date().toISOString()
  }
];
