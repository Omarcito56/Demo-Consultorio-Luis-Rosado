# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

---

## Analytics

Este proyecto cuenta con una capa de analítica modular y reutilizable diseñada para las demos comerciales de **BS Code**.

### 1. Tecnologías utilizadas
- **Vercel Web Analytics** (`@vercel/analytics`): Mide tráfico global, visitantes únicos y páginas vistas de forma nativa en la infraestructura de Vercel.
- **PostHog** (`posthog-js`): Plataforma de Product Analytics para seguimiento de embudos comerciales, eventos de usuario y grabaciones de sesión (**Session Replay**).

### 2. Variables de entorno requeridas
Para conectar PostHog se requieren dos variables de entorno de Vite:

```env
VITE_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

- **En local**: Definir en un archivo `.env.local` (el cual está ignorado por `.gitignore`).
- **En producción (Vercel)**: Configurar en el panel de Vercel en **Project Settings > Environment Variables**.
- **Seguridad**: Las variables nunca deben subirse al repositorio Git. Si las variables no están configuradas, el sistema entra en modo silencioso sin generar errores ni afectar la navegación.

### 3. Identificación de Demo: `DEMO_ID` y `PROSPECT_ID`
Todas las demos comerciales de BS Code reportan a un único proyecto central en PostHog (**"BS Code Demos"**).

Para segmentar los análisis por cada prospecto o cliente, el sistema inyecta automáticamente super properties globales en cada evento y pageview:
- `demo_id`: Identificador del proyecto demo (`consultorio_luis_rosado`).
- `prospect_id`: Identificador del prospecto o cliente objetivo (`luis_rosado`).
- `project_type`: Tipo de solución (`bs_code_demo`).

#### ¿Cómo reutilizar este sistema en otra demo?
Para adaptar la analítica a una nueva demo de BS Code (por ejemplo, *Laboratorio Martínez* o *Hospital Las Fuentes*), **solo debes modificar un archivo**:

👉 `src/analytics/analyticsConfig.js`

```javascript
export const ANALYTICS_CONFIG = {
  // Cambiar únicamente estos valores en la nueva demo:
  demoId: "laboratorio_martinez",
  prospectId: "laboratorio_martinez",
  projectType: "bs_code_demo",
};
```
No es necesario cambiar nada en los componentes ni en las llamadas de tracking.

### 4. Privacidad y anonimato (Sector Salud)
Al tratarse de una solución para el sector médico, se aplican estrictas políticas de protección de datos:
1. **Visitantes anónimos**: No se utiliza `posthog.identify()` con nombres, correos o teléfonos. No se generan perfiles personales innecesarios (`person_profiles: 'identified_only'`).
2. **Zero PII**: No se transmiten nombres, teléfonos, correos, fechas de nacimiento, folios, motivos de consulta, notas clínicas ni contraseñas.
3. **Filtro sanitizador**: La función `sanitizeProperties()` en `src/analytics/analytics.js` descarta de forma preventiva cualquier campo que contenga información personal o sensible.
4. **Autocapture desactivado**: Se configuró `autocapture: false` para evitar que PostHog capture automáticamente textos o clics arbitrarios que pudieran contener datos de formularios.

### 5. Configuración de Session Replay
Session Replay está habilitado pero fuertemente protegido para garantizar privacidad:
- **`maskAllInputs: true`**: Enmascara todos los campos de texto, inputs, selects y textareas.
- **`maskTextSelector: '.ph-mask, [data-ph-mask]'`**: Oculta cualquier elemento visual con la clase `.ph-mask` (nombres de pacientes en tablas, folios, resúmenes de cita).
- Las contraseñas y datos del formulario de login demo quedan completamente ocultos.

### 6. Eventos instrumentados
| Evento | Descripción | Propiedades clave (Sin PII) |
| :--- | :--- | :--- |
| `demo_viewed` | Visita inicial a la demo (1 vez por sesión) | `entry_route`, `source` |
| `booking_started` | Apertura del flujo de solicitud de cita | `route`, `flow_type`, `step` |
| `booking_completed` | Solicitud completada exitosamente | `route`, `flow_type` |
| `admin_login_opened` | Visualización de la pantalla de login demo | `route` |
| `admin_login_success` | Acceso exitoso con credenciales demo | `route` |
| `admin_dashboard_opened` | Apertura del panel principal de recepción | `module` |
| `admin_requests_opened` | Apertura del catálogo de citas/solicitudes | `module: 'appointments'` |
| `record_detail_opened` | Clic en ver detalle de una cita/solicitud | `record_type`, `status` |
| `record_status_changed` | Modificación de estado (ej. Pendiente -> Confirmada) | `from_status`, `to_status`, `record_type` |
| `record_rescheduled` | Uso de la herramienta de reagendado | `record_type` |
| `whatsapp_reminder_clicked` | Clic en acción de enviar WhatsApp | `module`, `record_type` |
| `admin_patients_opened` | Apertura del directorio de pacientes | `module: 'patients'` |
| `admin_services_opened` | Apertura del catálogo de servicios médicos | `module: 'services'` |
| `demo_cta_clicked` | Clic en llamadas a la acción relevantes | `cta_label`, `route` |
| `$pageview` | Cambio de ruta en React Router (SPA) | `$current_url`, `path`, `demo_id`, `prospect_id` |

