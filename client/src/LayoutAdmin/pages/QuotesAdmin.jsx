import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaCopy,
  FaEdit,
  FaEye,
  FaFilter,
  FaHotel,
  FaPaperPlane,
  FaPlane,
  FaPlus,
  FaSearch,
  FaShuttleVan,
  FaSuitcase,
  FaTicketAlt,
  FaTimes,
  FaTrashAlt,
  FaWhatsapp,
} from "react-icons/fa";

/* ============================================================
   MOCK TEMPORAL
   Después vendrá de:
   GET /api/quotes
============================================================ */

const INITIAL_QUOTES = [
  {
    _id: "q-0042",
    quoteNumber: "COT-2026-0042",
    slug: "cot-2026-0042-maria-lopez-cancun",
    client: {
      _id: "client-maria",
      name: "María López",
      phone: "998 111 2233",
    },
    serviceType: "Paquete",
    destination: "Cancún",
    departureCity: "CDMX",
    departureDate: "2026-09-15",
    returnDate: "2026-09-19",
    total: 20700,
    status: "Enviada",
    createdAt: "2026-08-21T15:40:00",
    validUntil: "2026-08-22",
  },
  {
    _id: "q-0041",
    quoteNumber: "COT-2026-0041",
    slug: "cot-2026-0041-juan-perez-huatulco",
    client: {
      _id: "client-juan",
      name: "Juan Pérez",
      phone: "998 222 3344",
    },
    serviceType: "Hotel",
    destination: "Huatulco",
    departureCity: "",
    departureDate: "2026-09-28",
    returnDate: "2026-10-02",
    total: 24900,
    status: "Seguimiento",
    createdAt: "2026-08-20T12:10:00",
    validUntil: "2026-08-23",
  },
  {
    _id: "q-0040",
    quoteNumber: "COT-2026-0040",
    slug: "cot-2026-0040-carlos-ruiz-riviera-maya",
    client: {
      _id: "client-carlos",
      name: "Carlos Ruiz",
      phone: "998 333 4455",
    },
    serviceType: "Paquete",
    destination: "Riviera Maya",
    departureCity: "Monterrey",
    departureDate: "2026-10-08",
    returnDate: "2026-10-12",
    total: 31500,
    status: "Reservada",
    createdAt: "2026-08-19T09:35:00",
    validUntil: "2026-08-21",
  },
  {
    _id: "q-0039",
    quoteNumber: "COT-2026-0039",
    slug: "cot-2026-0039-ana-garcia-isla-mujeres",
    client: {
      _id: "client-ana",
      name: "Ana García",
      phone: "998 444 5566",
    },
    serviceType: "Tour",
    destination: "Isla Mujeres",
    departureCity: "",
    departureDate: "2026-09-05",
    returnDate: "2026-09-05",
    total: 4480,
    status: "Borrador",
    createdAt: "2026-08-18T17:05:00",
    validUntil: "2026-08-25",
  },
  {
    _id: "q-0038",
    quoteNumber: "COT-2026-0038",
    slug: "cot-2026-0038-luis-mendoza-cancun",
    client: {
      _id: "client-luis",
      name: "Luis Mendoza",
      phone: "998 555 6677",
    },
    serviceType: "Traslado",
    destination: "Cancún",
    departureCity: "",
    departureDate: "2026-09-11",
    returnDate: "2026-09-15",
    total: 1850,
    status: "Enviada",
    createdAt: "2026-08-17T11:20:00",
    validUntil: "2026-08-24",
  },
  {
    _id: "q-0037",
    quoteNumber: "COT-2026-0037",
    slug: "cot-2026-0037-sofia-torres-puerto-vallarta",
    client: {
      _id: "client-sofia",
      name: "Sofía Torres",
      phone: "998 666 7788",
    },
    serviceType: "Vuelo",
    destination: "Puerto Vallarta",
    departureCity: "CDMX",
    departureDate: "2026-11-03",
    returnDate: "2026-11-07",
    total: 11400,
    status: "Aceptada",
    createdAt: "2026-08-16T16:45:00",
    validUntil: "2026-08-22",
  },
];

const STATUS_OPTIONS = [
  "Todas",
  "Borrador",
  "Enviada",
  "Seguimiento",
  "Aceptada",
  "Reservada",
  "Pagada",
  "Cancelada",
];

const SERVICE_OPTIONS = [
  "Todos",
  "Paquete",
  "Hotel",
  "Vuelo",
  "Tour",
  "Traslado",
];

const STATUS_STYLES = {
  Borrador: "bg-slate-100 text-slate-600 border-slate-200",
  Enviada: "bg-blue-50 text-blue-700 border-blue-200",
  Seguimiento: "bg-amber-50 text-amber-700 border-amber-200",
  Aceptada: "bg-violet-50 text-violet-700 border-violet-200",
  Reservada: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pagada: "bg-green-50 text-green-700 border-green-200",
  Cancelada: "bg-red-50 text-red-600 border-red-200",
};

const SERVICE_CONFIG = {
  Paquete: {
    label: "Vuelo + Hotel",
    icon: FaSuitcase,
    className: "bg-blue-50 text-[#0260fe]",
  },
  Hotel: {
    label: "Hotel",
    icon: FaHotel,
    className: "bg-cyan-50 text-cyan-700",
  },
  Vuelo: {
    label: "Vuelo",
    icon: FaPlane,
    className: "bg-indigo-50 text-indigo-700",
  },
  Tour: {
    label: "Tour",
    icon: FaTicketAlt,
    className: "bg-violet-50 text-violet-700",
  },
  Traslado: {
    label: "Traslado",
    icon: FaShuttleVan,
    className: "bg-orange-50 text-[#ff6600]",
  },
};

/* ============================================================
   HELPERS
============================================================ */

const money = (value) =>
  Number(value || 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(`${value}T12:00:00`);

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatDateTime = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const normalizePhone = (phone = "") => {
  const digits = String(phone).replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("52") ? digits : `52${digits}`;
};

function MetricCard({ label, value, detail, icon, accent = "blue" }) {
  const accentStyles = {
    blue: "bg-blue-50 text-[#0260fe]",
    orange: "bg-orange-50 text-[#ff6600]",
    green: "bg-emerald-50 text-emerald-600",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-black text-[#12304a]">{value}</p>

          {detail ? (
            <p className="mt-1 text-xs font-medium text-slate-400">{detail}</p>
          ) : null}
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            accentStyles[accent] || accentStyles.blue
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${
        STATUS_STYLES[status] || STATUS_STYLES.Borrador
      }`}
    >
      {status}
    </span>
  );
}

function ServiceBadge({ type }) {
  const config = SERVICE_CONFIG[type] || SERVICE_CONFIG.Paquete;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-black ${config.className}`}
    >
      <Icon />
      {config.label}
    </span>
  );
}

/* ============================================================
   MAIN
============================================================ */

function QuotesAdmin() {
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState(INITIAL_QUOTES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [serviceFilter, setServiceFilter] = useState("Todos");

  const filteredQuotes = useMemo(() => {
    const term = search.trim().toLowerCase();

    return quotes.filter((quote) => {
      const matchesSearch =
        !term ||
        quote.quoteNumber.toLowerCase().includes(term) ||
        quote.client.name.toLowerCase().includes(term) ||
        quote.destination.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "Todas" || quote.status === statusFilter;

      const matchesService =
        serviceFilter === "Todos" || quote.serviceType === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [quotes, search, statusFilter, serviceFilter]);

  const metrics = useMemo(() => {
    const totalAmount = quotes.reduce(
      (sum, quote) => sum + Number(quote.total || 0),
      0,
    );

    const sent = quotes.filter((quote) =>
      ["Enviada", "Seguimiento"].includes(quote.status),
    ).length;

    const won = quotes.filter((quote) =>
      ["Aceptada", "Reservada", "Pagada"].includes(quote.status),
    ).length;

    return {
      total: quotes.length,
      amount: totalAmount,
      sent,
      won,
    };
  }, [quotes]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("Todas");
    setServiceFilter("Todos");
  };

  const handleDuplicate = (quote) => {
    const copy = {
      ...quote,
      _id: `${quote._id}-copy-${Date.now()}`,
      quoteNumber: `${quote.quoteNumber}-COPIA`,
      slug: `${quote.slug}-copia`,
      status: "Borrador",
      createdAt: new Date().toISOString(),
    };

    setQuotes((current) => [copy, ...current]);
  };

  const handleDelete = (quote) => {
    const confirmed = window.confirm(
      `¿Eliminar la cotización ${quote.quoteNumber}?`,
    );

    if (!confirmed) return;

    setQuotes((current) => current.filter((item) => item._id !== quote._id));
  };

  const getWhatsappUrl = (quote) => {
    const text = [
      `Hola ${quote.client.name.split(" ")[0]},`,
      "",
      `Te comparto tu cotización ${quote.quoteNumber} para ${quote.destination}.`,
      `Total: ${money(quote.total)} MXN.`,
      "",
      `${window.location.origin}/cotizacion/${quote.slug}`,
    ].join("\n");

    return `https://api.whatsapp.com/send?${new URLSearchParams({
      phone: normalizePhone(quote.client.phone),
      text,
    }).toString()}`;
  };

  const filtersActive =
    search || statusFilter !== "Todas" || serviceFilter !== "Todos";

  return (
    <div className="space-y-5">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0260fe]">
              Ventas
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-[#12304a] sm:text-3xl">
              Cotizaciones
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Administra propuestas, seguimiento, estados y enlaces públicos
              desde un solo lugar.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/auth/cotizador")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-orange-600"
          >
            <FaPlus />
            Nueva cotización
          </button>
        </div>
      </section>

      {/* =====================================================
          METRICS
      ===================================================== */}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Cotizaciones"
          value={metrics.total}
          detail="Total registradas"
          icon={<FaSuitcase />}
        />

        <MetricCard
          label="Valor cotizado"
          value={money(metrics.amount)}
          detail="MXN acumulado"
          icon={<FaPaperPlane />}
          accent="orange"
        />

        <MetricCard
          label="En seguimiento"
          value={metrics.sent}
          detail="Enviadas o por cerrar"
          icon={<FaClock />}
          accent="slate"
        />

        <MetricCard
          label="Convertidas"
          value={metrics.won}
          detail="Aceptadas o reservadas"
          icon={<FaCheckCircle />}
          accent="green"
        />
      </section>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px_190px_auto]">
          <label className="relative block">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-300" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por folio, cliente o destino..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </label>

          <label className="relative block">
            <FaFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-300" />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-bold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>

          <select
            value={serviceFilter}
            onChange={(event) => setServiceFilter(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
          >
            {SERVICE_OPTIONS.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>

          {filtersActive ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              <FaTimes />
              Limpiar
            </button>
          ) : (
            <div className="hidden lg:block" />
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-slate-400">
            Mostrando{" "}
            <strong className="text-slate-600">{filteredQuotes.length}</strong>{" "}
            de <strong className="text-slate-600">{quotes.length}</strong>{" "}
            cotizaciones
          </p>
        </div>
      </section>

      {/* =====================================================
          DESKTOP TABLE
      ===================================================== */}

      <section className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Cotización
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Cliente
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Servicio
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Destino / viaje
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Total
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Estado
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredQuotes.map((quote) => (
                <tr
                  key={quote._id}
                  className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-black text-[#12304a]">
                      {quote.quoteNumber}
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-slate-400">
                      Creada {formatDateTime(quote.createdAt)}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/auth/crm/${quote.client._id}`}
                      className="text-sm font-bold text-slate-700 transition hover:text-[#0260fe]"
                    >
                      {quote.client.name}
                    </Link>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {quote.client.phone}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <ServiceBadge type={quote.serviceType} />
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-black text-slate-700">
                      {quote.destination}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {formatDate(quote.departureDate)} →{" "}
                      {formatDate(quote.returnDate)}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <p className="text-sm font-black text-[#12304a]">
                      {money(quote.total)}
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      MXN
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={quote.status} />

                    <p className="mt-1.5 text-[9px] text-slate-400">
                      Vigencia {formatDate(quote.validUntil)}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      <a
                        href={`/cotizacion/${quote.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Ver cotización pública"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0260fe]"
                      >
                        <FaEye />
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/auth/cotizador?quote=${quote._id}`)
                        }
                        title="Editar"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0260fe]"
                      >
                        <FaEdit />
                      </button>

                      <a
                        href={getWhatsappUrl(quote)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Compartir por WhatsApp"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-green-200 hover:bg-green-50 hover:text-[#25D366]"
                      >
                        <FaWhatsapp />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(quote)}
                        title="Duplicar"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                      >
                        <FaCopy />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(quote)}
                        title="Eliminar"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">
                    <p className="text-base font-black text-[#12304a]">
                      No encontramos cotizaciones
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Prueba cambiando los filtros o crea una nueva propuesta.
                    </p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
          MOBILE / TABLET CARDS
      ===================================================== */}

      <section className="grid gap-3 lg:hidden">
        {filteredQuotes.map((quote) => {
          const service =
            SERVICE_CONFIG[quote.serviceType] || SERVICE_CONFIG.Paquete;
          const Icon = service.icon;

          return (
            <article
              key={quote._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${service.className}`}
                      >
                        <Icon className="text-xs" />
                      </span>

                      <StatusBadge status={quote.status} />
                    </div>

                    <p className="mt-3 text-xs font-black text-[#0260fe]">
                      {quote.quoteNumber}
                    </p>

                    <h2 className="mt-1 truncate text-lg font-black text-[#12304a]">
                      {quote.destination}
                    </h2>

                    <p className="mt-1 truncate text-sm font-bold text-slate-500">
                      {quote.client.name}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-lg font-black text-[#12304a]">
                      {money(quote.total)}
                    </p>

                    <p className="mt-1 text-[9px] font-black uppercase tracking-wider text-slate-400">
                      MXN
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Servicio
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-600">
                      {service.label}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Viaje
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-600">
                      {formatDate(quote.departureDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 border-t border-slate-100">
                <a
                  href={`/cotizacion/${quote.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 border-r border-slate-100 px-2 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400 transition hover:bg-blue-50 hover:text-[#0260fe]"
                >
                  <FaEye className="text-sm" />
                  Ver
                </a>

                <button
                  type="button"
                  onClick={() => navigate(`/auth/cotizador?quote=${quote._id}`)}
                  className="flex flex-col items-center justify-center gap-1 border-r border-slate-100 px-2 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400 transition hover:bg-blue-50 hover:text-[#0260fe]"
                >
                  <FaEdit className="text-sm" />
                  Editar
                </button>

                <a
                  href={getWhatsappUrl(quote)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 border-r border-slate-100 px-2 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400 transition hover:bg-green-50 hover:text-[#25D366]"
                >
                  <FaWhatsapp className="text-sm" />
                  WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => handleDuplicate(quote)}
                  className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
                >
                  <FaCopy className="text-sm" />
                  Duplicar
                </button>
              </div>
            </article>
          );
        })}

        {filteredQuotes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
            <p className="font-black text-[#12304a]">
              No encontramos cotizaciones
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Cambia los filtros o crea una nueva cotización.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default QuotesAdmin;
