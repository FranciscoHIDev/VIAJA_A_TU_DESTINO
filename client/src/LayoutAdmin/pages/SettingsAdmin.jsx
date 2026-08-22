import React, { useMemo, useState } from "react";
import {
  FaBuilding,
  FaCheck,
  FaCog,
  FaCreditCard,
  FaDollarSign,
  FaFileAlt,
  FaGlobe,
  FaHotel,
  FaLink,
  FaPaperPlane,
  FaPlane,
  FaSave,
  FaShuttleVan,
  FaSuitcase,
  FaTicketAlt,
  FaUserTie,
  FaWhatsapp,
} from "react-icons/fa";

const DEFAULT_LOGO =
  "https://res.cloudinary.com/duaysiozi/image/upload/v1785018355/i6jhddqaqz1ijctzrw42.webp";

const INITIAL_SETTINGS = {
  agency: {
    name: "Viaja a tu Destino",
    slogan: "Cazamos las mejores ofertas de viaje para ti.",
    website: "https://www.viajaatudestino.com",
    whatsapp: "998 495 4637",
    phone: "998 495 4637",
    email: "ventas@viajaatudestino.com",
    currency: "MXN",
    country: "México",
    timezone: "America/Cancun",
    logo: DEFAULT_LOGO,
  },

  advisor: {
    name: "Isidoro Francisco",
    role: "Asesor de viajes",
    whatsapp: "998 495 4637",
    email: "ventas@viajaatudestino.com",
    initials: "IF",
  },

  quotes: {
    validityHours: 24,
    depositType: "Por persona",
    defaultDeposit: 500,
    showPricePerPerson: true,
    showTotalPrice: true,
    showAdvisor: true,
    showConditions: true,
    introText: "Preparamos esta propuesta especialmente para tu próximo viaje.",
    conditions:
      "Tarifas sujetas a disponibilidad y cambios sin previo aviso hasta confirmar la reservación.",
  },

  commissions: {
    Hotel: 15,
    Paquete: 0,
    Vuelo: 0,
    Tour: 0,
    Traslado: 0,
    allowManualOverride: true,
  },

  payments: {
    methods: {
      cash: true,
      transfer: true,
      card: true,
      paymentLink: true,
      deposit: true,
    },

    installments: {
      msi3: false,
      msi6: true,
      msi12: true,
      msi18: false,
      msi24: false,
    },

    deposits: {
      enabled: true,
      minimum: 500,
      type: "Por persona",
      allowPartialPayments: true,
      showBalance: true,
    },
  },

  sales: {
    firstPaymentCreatesSale: true,
    firstPaymentCreatesReceipt: true,
    firstPaymentMarksClient: true,
    zeroBalanceMarksPaid: true,
    zeroBalanceCreatesReceipt: true,
  },

  documents: {
    quotePrefix: "COT",
    salePrefix: "VTA",
    receiptPrefix: "REC",
    resetEveryYear: true,

    quote: {
      showAgencyLogo: true,
      showAdvisor: true,
      showPricePerPerson: true,
      showConditions: true,
      footer:
        "Viaja a tu Destino · Cazamos las mejores ofertas de viaje para ti.",
    },

    receipt: {
      showAdvisor: true,
      showReference: true,
      showNextPayment: true,
      showBalance: true,
      legalText:
        "Este comprobante confirma la recepción del pago indicado y su aplicación a la reservación señalada. No constituye un CFDI ni comprobante fiscal.",
    },
  },

  whatsapp: {
    quoteTemplate: `Hola {nombre},

Te comparto tu cotización para {destino}.

★ Precio especial:
{total}

Consulta todos los detalles:
{url_cotizacion}

Si deseas reservar, respóndeme por este medio.`,

    paymentTemplate: `Hola {nombre},

Hemos registrado correctamente tu pago.

Pago recibido: {pago}
Total pagado: {pagado}
Saldo pendiente: {saldo}

Comprobante:
{url_recibo}

Gracias por viajar con Viaja a tu Destino.`,
  },

  integrations: {
    whatsapp: {
      enabled: true,
      label: "WhatsApp",
      description: "Compartir cotizaciones, ventas y recibos.",
    },
    priceAgencies: {
      enabled: true,
      label: "PriceAgencies",
      description: "Motor de reservaciones y consulta de tarifas.",
    },
    analytics: {
      enabled: true,
      label: "Google Analytics",
      description: "Medición del sitio y comportamiento de usuarios.",
    },
    metaPixel: {
      enabled: false,
      label: "Meta Pixel",
      description: "Seguimiento de campañas y conversiones.",
    },
    email: {
      enabled: false,
      label: "Correo transaccional",
      description: "Envío automático de cotizaciones y recibos.",
    },
    n8n: {
      enabled: false,
      label: "n8n",
      description: "Automatizaciones y flujos externos.",
    },
  },
};

const TABS = [
  {
    id: "agency",
    label: "Agencia",
    icon: FaBuilding,
    description: "Datos generales y asesor.",
  },
  {
    id: "quotes",
    label: "Cotizaciones",
    icon: FaFileAlt,
    description: "Valores y textos predeterminados.",
  },
  {
    id: "commissions",
    label: "Comisiones",
    icon: FaDollarSign,
    description: "Porcentajes por servicio.",
  },
  {
    id: "payments",
    label: "Pagos",
    icon: FaCreditCard,
    description: "Métodos, MSI y apartados.",
  },
  {
    id: "sales",
    label: "Ventas",
    icon: FaSuitcase,
    description: "Automatización de estados.",
  },
  {
    id: "documents",
    label: "Documentos",
    icon: FaFileAlt,
    description: "Folios, recibos y textos.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: FaWhatsapp,
    description: "Plantillas de mensajes.",
  },
  {
    id: "integrations",
    label: "Integraciones",
    icon: FaLink,
    description: "Servicios externos.",
  },
];

const SERVICES = [
  {
    key: "Hotel",
    label: "Hotel",
    icon: FaHotel,
    description: "Hospedaje y planes de alimentos",
  },
  {
    key: "Paquete",
    label: "Vuelo + Hotel",
    icon: FaSuitcase,
    description: "Paquetes dinámicos",
  },
  {
    key: "Vuelo",
    label: "Vuelo",
    icon: FaPlane,
    description: "Boletos aéreos",
  },
  {
    key: "Tour",
    label: "Tour",
    icon: FaTicketAlt,
    description: "Tours y experiencias",
  },
  {
    key: "Traslado",
    label: "Traslado",
    icon: FaShuttleVan,
    description: "Transportación terrestre",
  },
];

function Toggle({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left transition hover:border-blue-200"
    >
      <div className="min-w-0">
        <p className="text-sm font-black text-[#12304a]">{label}</p>

        {description ? (
          <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
        ) : null}
      </div>

      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#0260fe]" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  helper = "",
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
      />

      {helper ? (
        <span className="mt-1.5 block text-[10px] leading-4 text-slate-400">
          {helper}
        </span>
      ) : null}
    </label>
  );
}

function SelectField({ label, value, onChange, children, helper = "" }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
      >
        {children}
      </select>

      {helper ? (
        <span className="mt-1.5 block text-[10px] leading-4 text-slate-400">
          {helper}
        </span>
      ) : null}
    </label>
  );
}

function TextareaField({ label, value, onChange, rows = 5, helper = "" }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>

      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
      />

      {helper ? (
        <span className="mt-1.5 block text-[10px] leading-4 text-slate-400">
          {helper}
        </span>
      ) : null}
    </label>
  );
}

function SectionCard({ eyebrow, title, description, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        {eyebrow ? (
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0260fe]">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-1 text-xl font-black text-[#12304a]">{title}</h2>

        {description ? (
          <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  );
}

function IntegrationCard({ item, onChange }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              item.enabled ? "bg-emerald-500" : "bg-slate-300"
            }`}
          />

          <p className="text-sm font-black text-[#12304a]">{item.label}</p>
        </div>

        <p className="mt-1.5 text-xs leading-5 text-slate-400">
          {item.description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!item.enabled)}
        className={`inline-flex shrink-0 items-center justify-center rounded-xl px-4 py-2.5 text-xs font-black transition ${
          item.enabled
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {item.enabled ? "Activo" : "Desactivado"}
      </button>
    </div>
  );
}

function SettingsAdmin() {
  const [activeTab, setActiveTab] = useState("agency");
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [saved, setSaved] = useState(false);

  const activeTabData = useMemo(
    () => TABS.find((tab) => tab.id === activeTab) || TABS[0],
    [activeTab],
  );

  const updateSection = (section, key, value) => {
    setSettings((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: value,
      },
    }));
  };

  const updateNested = (section, group, key, value) => {
    setSettings((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [group]: {
          ...current[section][group],
          [key]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    /*
      Después:
      await api.put("/settings", settings)
    */

    console.log("Configuración guardada:", settings);

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-5">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0260fe]">
              Administración
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-[#12304a] sm:text-3xl">
              Configuración
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Centraliza los datos de Viaja a tu Destino y define cómo deben
              funcionar cotizaciones, ventas, pagos, documentos y mensajes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-sm transition ${
              saved ? "bg-emerald-600" : "bg-[#0260fe] hover:bg-blue-700"
            }`}
          >
            {saved ? <FaCheck /> : <FaSave />}
            {saved ? "Cambios guardados" : "Guardar cambios"}
          </button>
        </div>
      </section>

      {/* =====================================================
          LAYOUT
      ===================================================== */}

      <div className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)]">
        {/* SIDEBAR TABS */}

        <aside className="xl:sticky xl:top-[84px] xl:self-start">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
            <div className="flex gap-2 overflow-x-auto p-1 xl:block xl:space-y-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex min-w-[170px] items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition xl:w-full xl:min-w-0 ${
                      active
                        ? "bg-[#12304a] text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-[#12304a]"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm ${
                        active
                          ? "bg-white/10 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-black">
                        {tab.label}
                      </span>

                      <span
                        className={`mt-0.5 hidden text-[10px] leading-4 xl:block ${
                          active ? "text-white/55" : "text-slate-400"
                        }`}
                      >
                        {tab.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* CONTENT */}

        <div className="min-w-0 space-y-5">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0260fe] shadow-sm">
                {React.createElement(activeTabData.icon)}
              </div>

              <div>
                <p className="text-sm font-black text-[#12304a]">
                  {activeTabData.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {activeTabData.description}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              AGENCY
          ================================================= */}

          {activeTab === "agency" ? (
            <>
              <SectionCard
                eyebrow="Identidad"
                title="Datos de la agencia"
                description="Esta información se mostrará en cotizaciones, recibos, mensajes y otras áreas del sistema."
              >
                <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
                  <div>
                    <div className="flex min-h-[130px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <img
                        src={settings.agency.logo || DEFAULT_LOGO}
                        alt={settings.agency.name}
                        className="max-h-20 w-full max-w-[190px] object-contain"
                      />
                    </div>

                    <Field
                      label="URL del logotipo"
                      value={settings.agency.logo}
                      onChange={(value) =>
                        updateSection("agency", "logo", value)
                      }
                      helper="Después podemos reemplazarlo por carga de archivo."
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Nombre comercial"
                      value={settings.agency.name}
                      onChange={(value) =>
                        updateSection("agency", "name", value)
                      }
                    />

                    <Field
                      label="Sitio web"
                      value={settings.agency.website}
                      onChange={(value) =>
                        updateSection("agency", "website", value)
                      }
                    />

                    <div className="sm:col-span-2">
                      <Field
                        label="Slogan"
                        value={settings.agency.slogan}
                        onChange={(value) =>
                          updateSection("agency", "slogan", value)
                        }
                      />
                    </div>

                    <Field
                      label="WhatsApp"
                      value={settings.agency.whatsapp}
                      onChange={(value) =>
                        updateSection("agency", "whatsapp", value)
                      }
                    />

                    <Field
                      label="Teléfono"
                      value={settings.agency.phone}
                      onChange={(value) =>
                        updateSection("agency", "phone", value)
                      }
                    />

                    <Field
                      label="Correo"
                      type="email"
                      value={settings.agency.email}
                      onChange={(value) =>
                        updateSection("agency", "email", value)
                      }
                    />

                    <SelectField
                      label="Moneda"
                      value={settings.agency.currency}
                      onChange={(value) =>
                        updateSection("agency", "currency", value)
                      }
                    >
                      <option value="MXN">MXN - Peso mexicano</option>
                      <option value="USD">USD - Dólar americano</option>
                    </SelectField>

                    <Field
                      label="País"
                      value={settings.agency.country}
                      onChange={(value) =>
                        updateSection("agency", "country", value)
                      }
                    />

                    <SelectField
                      label="Zona horaria"
                      value={settings.agency.timezone}
                      onChange={(value) =>
                        updateSection("agency", "timezone", value)
                      }
                    >
                      <option value="America/Cancun">America/Cancun</option>
                      <option value="America/Mexico_City">
                        America/Mexico_City
                      </option>
                    </SelectField>
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                eyebrow="Atención"
                title="Asesor principal"
                description="Datos que aparecerán por defecto en propuestas y comprobantes."
              >
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <Field
                    label="Nombre"
                    value={settings.advisor.name}
                    onChange={(value) =>
                      updateSection("advisor", "name", value)
                    }
                  />

                  <Field
                    label="Cargo"
                    value={settings.advisor.role}
                    onChange={(value) =>
                      updateSection("advisor", "role", value)
                    }
                  />

                  <Field
                    label="Iniciales"
                    value={settings.advisor.initials}
                    onChange={(value) =>
                      updateSection("advisor", "initials", value)
                    }
                  />

                  <Field
                    label="WhatsApp"
                    value={settings.advisor.whatsapp}
                    onChange={(value) =>
                      updateSection("advisor", "whatsapp", value)
                    }
                  />

                  <Field
                    label="Correo"
                    type="email"
                    value={settings.advisor.email}
                    onChange={(value) =>
                      updateSection("advisor", "email", value)
                    }
                  />
                </div>
              </SectionCard>
            </>
          ) : null}

          {/* =================================================
              QUOTES
          ================================================= */}

          {activeTab === "quotes" ? (
            <>
              <SectionCard
                eyebrow="Predeterminados"
                title="Configuración de cotizaciones"
                description="Estos valores se aplicarán automáticamente al crear una nueva cotización."
              >
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <Field
                    label="Vigencia"
                    type="number"
                    value={settings.quotes.validityHours}
                    onChange={(value) =>
                      updateSection("quotes", "validityHours", Number(value))
                    }
                    helper="Horas predeterminadas de vigencia."
                  />

                  <Field
                    label="Apartado sugerido"
                    type="number"
                    value={settings.quotes.defaultDeposit}
                    onChange={(value) =>
                      updateSection("quotes", "defaultDeposit", Number(value))
                    }
                  />

                  <SelectField
                    label="Tipo de apartado"
                    value={settings.quotes.depositType}
                    onChange={(value) =>
                      updateSection("quotes", "depositType", value)
                    }
                  >
                    <option>Por persona</option>
                    <option>Por reservación</option>
                  </SelectField>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Toggle
                    checked={settings.quotes.showPricePerPerson}
                    onChange={(value) =>
                      updateSection("quotes", "showPricePerPerson", value)
                    }
                    label="Mostrar precio por persona"
                  />

                  <Toggle
                    checked={settings.quotes.showTotalPrice}
                    onChange={(value) =>
                      updateSection("quotes", "showTotalPrice", value)
                    }
                    label="Mostrar precio total"
                  />

                  <Toggle
                    checked={settings.quotes.showAdvisor}
                    onChange={(value) =>
                      updateSection("quotes", "showAdvisor", value)
                    }
                    label="Mostrar asesor"
                  />

                  <Toggle
                    checked={settings.quotes.showConditions}
                    onChange={(value) =>
                      updateSection("quotes", "showConditions", value)
                    }
                    label="Mostrar condiciones"
                  />
                </div>
              </SectionCard>

              <SectionCard eyebrow="Textos" title="Mensajes predeterminados">
                <div className="grid gap-5">
                  <TextareaField
                    label="Texto introductorio"
                    value={settings.quotes.introText}
                    onChange={(value) =>
                      updateSection("quotes", "introText", value)
                    }
                    rows={3}
                  />

                  <TextareaField
                    label="Condiciones"
                    value={settings.quotes.conditions}
                    onChange={(value) =>
                      updateSection("quotes", "conditions", value)
                    }
                    rows={5}
                  />
                </div>
              </SectionCard>
            </>
          ) : null}

          {/* =================================================
              COMMISSIONS
          ================================================= */}

          {activeTab === "commissions" ? (
            <>
              <SectionCard
                eyebrow="Rentabilidad"
                title="Comisiones por servicio"
                description="Define los porcentajes predeterminados del proveedor. Podrás modificarlos por cotización cuando sea necesario."
              >
                <div className="grid gap-3 md:grid-cols-2">
                  {SERVICES.map((service) => {
                    const Icon = service.icon;

                    return (
                      <div
                        key={service.key}
                        className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0260fe]">
                          <Icon />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-black text-[#12304a]">
                            {service.label}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {service.description}
                          </p>
                        </div>

                        <div className="relative w-24 shrink-0">
                          <input
                            type="number"
                            min="0"
                            max="99"
                            step="0.1"
                            value={settings.commissions[service.key]}
                            onChange={(event) =>
                              updateSection(
                                "commissions",
                                service.key,
                                Number(event.target.value),
                              )
                            }
                            className="h-11 w-full rounded-xl border border-slate-200 pr-8 text-center text-sm font-black text-[#12304a] outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                          />

                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
                            %
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5">
                  <Toggle
                    checked={settings.commissions.allowManualOverride}
                    onChange={(value) =>
                      updateSection("commissions", "allowManualOverride", value)
                    }
                    label="Permitir modificar comisión en el cotizador"
                    description="Útil cuando una tarifa o proveedor ofrece un porcentaje diferente."
                  />
                </div>
              </SectionCard>
            </>
          ) : null}

          {/* =================================================
              PAYMENTS
          ================================================= */}

          {activeTab === "payments" ? (
            <>
              <SectionCard
                eyebrow="Cobranza"
                title="Métodos de pago"
                description="Activa únicamente las formas de pago que deseas mostrar al cliente."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["cash", "Pago de contado"],
                    ["transfer", "Transferencia bancaria"],
                    ["card", "Tarjeta"],
                    ["paymentLink", "Link de pago"],
                    ["deposit", "Depósito"],
                  ].map(([key, label]) => (
                    <Toggle
                      key={key}
                      checked={settings.payments.methods[key]}
                      onChange={(value) =>
                        updateNested("payments", "methods", key, value)
                      }
                      label={label}
                    />
                  ))}
                </div>
              </SectionCard>

              <SectionCard eyebrow="Financiamiento" title="Meses sin intereses">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  {[
                    ["msi3", "3 MSI"],
                    ["msi6", "6 MSI"],
                    ["msi12", "12 MSI"],
                    ["msi18", "18 MSI"],
                    ["msi24", "24 MSI"],
                  ].map(([key, label]) => (
                    <Toggle
                      key={key}
                      checked={settings.payments.installments[key]}
                      onChange={(value) =>
                        updateNested("payments", "installments", key, value)
                      }
                      label={label}
                    />
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                eyebrow="Apartados"
                title="Política de apartados y abonos"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Monto mínimo"
                    type="number"
                    value={settings.payments.deposits.minimum}
                    onChange={(value) =>
                      updateNested(
                        "payments",
                        "deposits",
                        "minimum",
                        Number(value),
                      )
                    }
                  />

                  <SelectField
                    label="Aplicar mínimo"
                    value={settings.payments.deposits.type}
                    onChange={(value) =>
                      updateNested("payments", "deposits", "type", value)
                    }
                  >
                    <option>Por persona</option>
                    <option>Por reservación</option>
                  </SelectField>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Toggle
                    checked={settings.payments.deposits.enabled}
                    onChange={(value) =>
                      updateNested("payments", "deposits", "enabled", value)
                    }
                    label="Permitir apartados"
                  />

                  <Toggle
                    checked={settings.payments.deposits.allowPartialPayments}
                    onChange={(value) =>
                      updateNested(
                        "payments",
                        "deposits",
                        "allowPartialPayments",
                        value,
                      )
                    }
                    label="Permitir abonos"
                  />

                  <Toggle
                    checked={settings.payments.deposits.showBalance}
                    onChange={(value) =>
                      updateNested("payments", "deposits", "showBalance", value)
                    }
                    label="Mostrar saldo pendiente"
                  />
                </div>
              </SectionCard>
            </>
          ) : null}

          {/* =================================================
              SALES
          ================================================= */}

          {activeTab === "sales" ? (
            <SectionCard
              eyebrow="Automatización"
              title="Reglas de ventas"
              description="Estas acciones se ejecutarán automáticamente al registrar pagos."
            >
              <div className="grid gap-3">
                <Toggle
                  checked={settings.sales.firstPaymentCreatesSale}
                  onChange={(value) =>
                    updateSection("sales", "firstPaymentCreatesSale", value)
                  }
                  label="Crear venta al registrar el primer pago"
                  description="La cotización pasa a formar parte del módulo de ventas."
                />

                <Toggle
                  checked={settings.sales.firstPaymentCreatesReceipt}
                  onChange={(value) =>
                    updateSection("sales", "firstPaymentCreatesReceipt", value)
                  }
                  label="Generar recibo automáticamente"
                />

                <Toggle
                  checked={settings.sales.firstPaymentMarksClient}
                  onChange={(value) =>
                    updateSection("sales", "firstPaymentMarksClient", value)
                  }
                  label="Cambiar prospecto a cliente"
                />

                <Toggle
                  checked={settings.sales.zeroBalanceMarksPaid}
                  onChange={(value) =>
                    updateSection("sales", "zeroBalanceMarksPaid", value)
                  }
                  label="Marcar venta como pagada cuando el saldo llegue a $0"
                />

                <Toggle
                  checked={settings.sales.zeroBalanceCreatesReceipt}
                  onChange={(value) =>
                    updateSection("sales", "zeroBalanceCreatesReceipt", value)
                  }
                  label="Generar comprobante de liquidación"
                />
              </div>
            </SectionCard>
          ) : null}

          {/* =================================================
              DOCUMENTS
          ================================================= */}

          {activeTab === "documents" ? (
            <>
              <SectionCard
                eyebrow="Numeración"
                title="Folios de documentos"
                description="Los consecutivos reales se generarán en el backend para evitar duplicados."
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Prefijo cotización"
                    value={settings.documents.quotePrefix}
                    onChange={(value) =>
                      updateSection(
                        "documents",
                        "quotePrefix",
                        value.toUpperCase(),
                      )
                    }
                    helper="Ejemplo: COT-2026-0001"
                  />

                  <Field
                    label="Prefijo venta"
                    value={settings.documents.salePrefix}
                    onChange={(value) =>
                      updateSection(
                        "documents",
                        "salePrefix",
                        value.toUpperCase(),
                      )
                    }
                    helper="Ejemplo: VTA-2026-0001"
                  />

                  <Field
                    label="Prefijo recibo"
                    value={settings.documents.receiptPrefix}
                    onChange={(value) =>
                      updateSection(
                        "documents",
                        "receiptPrefix",
                        value.toUpperCase(),
                      )
                    }
                    helper="Ejemplo: REC-2026-0001"
                  />
                </div>

                <div className="mt-5">
                  <Toggle
                    checked={settings.documents.resetEveryYear}
                    onChange={(value) =>
                      updateSection("documents", "resetEveryYear", value)
                    }
                    label="Reiniciar consecutivos cada año"
                    description="En enero comenzaría nuevamente desde 0001."
                  />
                </div>
              </SectionCard>

              <SectionCard
                eyebrow="Cotizaciones"
                title="Contenido del documento"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Toggle
                    checked={settings.documents.quote.showAgencyLogo}
                    onChange={(value) =>
                      updateNested(
                        "documents",
                        "quote",
                        "showAgencyLogo",
                        value,
                      )
                    }
                    label="Mostrar logotipo"
                  />

                  <Toggle
                    checked={settings.documents.quote.showAdvisor}
                    onChange={(value) =>
                      updateNested("documents", "quote", "showAdvisor", value)
                    }
                    label="Mostrar asesor"
                  />

                  <Toggle
                    checked={settings.documents.quote.showPricePerPerson}
                    onChange={(value) =>
                      updateNested(
                        "documents",
                        "quote",
                        "showPricePerPerson",
                        value,
                      )
                    }
                    label="Mostrar precio por persona"
                  />

                  <Toggle
                    checked={settings.documents.quote.showConditions}
                    onChange={(value) =>
                      updateNested(
                        "documents",
                        "quote",
                        "showConditions",
                        value,
                      )
                    }
                    label="Mostrar condiciones"
                  />
                </div>

                <div className="mt-5">
                  <TextareaField
                    label="Pie de cotización"
                    value={settings.documents.quote.footer}
                    onChange={(value) =>
                      updateNested("documents", "quote", "footer", value)
                    }
                    rows={3}
                  />
                </div>
              </SectionCard>

              <SectionCard eyebrow="Recibos" title="Comprobante de pago">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Toggle
                    checked={settings.documents.receipt.showAdvisor}
                    onChange={(value) =>
                      updateNested("documents", "receipt", "showAdvisor", value)
                    }
                    label="Mostrar asesor"
                  />

                  <Toggle
                    checked={settings.documents.receipt.showReference}
                    onChange={(value) =>
                      updateNested(
                        "documents",
                        "receipt",
                        "showReference",
                        value,
                      )
                    }
                    label="Mostrar referencia de pago"
                  />

                  <Toggle
                    checked={settings.documents.receipt.showNextPayment}
                    onChange={(value) =>
                      updateNested(
                        "documents",
                        "receipt",
                        "showNextPayment",
                        value,
                      )
                    }
                    label="Mostrar próximo pago"
                  />

                  <Toggle
                    checked={settings.documents.receipt.showBalance}
                    onChange={(value) =>
                      updateNested("documents", "receipt", "showBalance", value)
                    }
                    label="Mostrar saldo pendiente"
                  />
                </div>

                <div className="mt-5">
                  <TextareaField
                    label="Leyenda legal"
                    value={settings.documents.receipt.legalText}
                    onChange={(value) =>
                      updateNested("documents", "receipt", "legalText", value)
                    }
                    rows={4}
                  />
                </div>
              </SectionCard>
            </>
          ) : null}

          {/* =================================================
              WHATSAPP
          ================================================= */}

          {activeTab === "whatsapp" ? (
            <>
              <SectionCard
                eyebrow="Mensajes"
                title="Plantilla de cotización"
                description="Puedes utilizar variables que después serán reemplazadas automáticamente."
              >
                <TextareaField
                  label="Mensaje"
                  value={settings.whatsapp.quoteTemplate}
                  onChange={(value) =>
                    updateSection("whatsapp", "quoteTemplate", value)
                  }
                  rows={11}
                  helper="Variables: {nombre}, {destino}, {total}, {url_cotizacion}"
                />
              </SectionCard>

              <SectionCard eyebrow="Mensajes" title="Plantilla de pago">
                <TextareaField
                  label="Mensaje"
                  value={settings.whatsapp.paymentTemplate}
                  onChange={(value) =>
                    updateSection("whatsapp", "paymentTemplate", value)
                  }
                  rows={12}
                  helper="Variables: {nombre}, {pago}, {pagado}, {saldo}, {url_recibo}"
                />
              </SectionCard>
            </>
          ) : null}

          {/* =================================================
              INTEGRATIONS
          ================================================= */}

          {activeTab === "integrations" ? (
            <SectionCard
              eyebrow="Servicios externos"
              title="Integraciones"
              description="Esta pantalla prepara los estados. Las credenciales sensibles deberán almacenarse únicamente en el backend."
            >
              <div className="grid gap-3">
                {Object.entries(settings.integrations).map(([key, item]) => (
                  <IntegrationCard
                    key={key}
                    item={item}
                    onChange={(enabled) =>
                      updateNested("integrations", key, "enabled", enabled)
                    }
                  />
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-black text-amber-800">Seguridad</p>

                <p className="mt-1 text-xs leading-5 text-amber-700">
                  API keys, tokens y contraseñas no deben guardarse en React ni
                  mostrarse en esta página. Se configurarán desde variables de
                  entorno o almacenamiento seguro del servidor.
                </p>
              </div>
            </SectionCard>
          ) : null}

          {/* =================================================
              SAVE FOOTER
          ================================================= */}

          <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-[#12304a]">
                ¿Terminaste de configurar esta sección?
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Por ahora los cambios se mantienen en esta pantalla. Después los
                guardaremos en MongoDB.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white transition ${
                saved ? "bg-emerald-600" : "bg-[#0260fe] hover:bg-blue-700"
              }`}
            >
              {saved ? <FaCheck /> : <FaSave />}
              {saved ? "Guardado" : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsAdmin;
