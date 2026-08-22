import React, { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaUserPlus,
  FaSearch,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaChevronRight,
  FaFilter,
  FaDollarSign,
  FaArrowUp,
  FaEllipsisH,
  FaPlus,
} from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const STATUS_CONFIG = {
  Nuevo: {
    badge: "bg-blue-50 text-blue-700 border-blue-100",
    dot: "bg-blue-500",
  },
  Contactado: {
    badge: "bg-cyan-50 text-cyan-700 border-cyan-100",
    dot: "bg-cyan-500",
  },
  Cotizando: {
    badge: "bg-violet-50 text-violet-700 border-violet-100",
    dot: "bg-violet-500",
  },
  "Cotización enviada": {
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    dot: "bg-amber-500",
  },
  Seguimiento: {
    badge: "bg-orange-50 text-orange-700 border-orange-100",
    dot: "bg-orange-500",
  },
  Reservado: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    dot: "bg-emerald-500",
  },
  Pagado: {
    badge: "bg-green-50 text-green-700 border-green-100",
    dot: "bg-green-500",
  },
  Perdido: {
    badge: "bg-red-50 text-red-700 border-red-100",
    dot: "bg-red-500",
  },
};

const initialClients = [
  {
    id: 1,
    name: "María López",
    phone: "998 321 4567",
    email: "maria@email.com",
    source: "Facebook",
    departureCity: "CDMX",
    destination: "Cancún",
    travelDate: "15 Sep 2026",
    travelers: "2 adultos + 1 menor",
    status: "Cotización enviada",
    lastContact: "Hoy, 11:35",
    nextFollowUp: "22 Ago, 10:00",
    quote: 20700,
  },
  {
    id: 2,
    name: "Juan Pérez",
    phone: "55 4567 8901",
    email: "juan@email.com",
    source: "WhatsApp",
    departureCity: "CDMX",
    destination: "Huatulco",
    travelDate: "20 Oct 2026",
    travelers: "2 adultos",
    status: "Seguimiento",
    lastContact: "Ayer, 17:20",
    nextFollowUp: "Hoy, 17:00",
    quote: 24900,
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    phone: "81 2345 6789",
    email: "carlos@email.com",
    source: "Instagram",
    departureCity: "Monterrey",
    destination: "Riviera Maya",
    travelDate: "10 Nov 2026",
    travelers: "2 adultos + 2 menores",
    status: "Reservado",
    lastContact: "18 Ago, 13:10",
    nextFollowUp: "—",
    quote: 31500,
  },
  {
    id: 4,
    name: "Fernanda Torres",
    phone: "33 6543 2109",
    email: "fernanda@email.com",
    source: "Web",
    departureCity: "Guadalajara",
    destination: "Puerto Vallarta",
    travelDate: "05 Dic 2026",
    travelers: "2 adultos",
    status: "Nuevo",
    lastContact: "Hoy, 15:42",
    nextFollowUp: "Hoy, 18:00",
    quote: 0,
  },
];

const money = (value) =>
  Number(value || 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

function normalizePhone(phone = "") {
  const digits = String(phone).replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("52") ? digits : `52${digits}`;
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Nuevo;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-bold ${config.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}

function MetricCard({ icon, label, value, helper, iconClass, trend }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-400">{label}</p>

          <p className="mt-2 truncate text-2xl font-black tracking-tight text-[#12304a]">
            {value}
          </p>

          <div className="mt-2 flex items-center gap-1.5">
            {trend ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                <FaArrowUp className="text-[8px]" />
                {trend}
              </span>
            ) : null}

            <p className="text-[10px] font-medium text-slate-400">{helper}</p>
          </div>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </article>
  );
}

function EmptyState({ onCreate }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl text-[#0260fe]">
        <FaSearch />
      </div>

      <h3 className="mt-4 text-lg font-black text-[#12304a]">
        No encontramos prospectos
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400">
        Cambia los filtros o registra un nuevo prospecto para comenzar.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0260fe] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        <FaPlus />
        Nuevo prospecto
      </button>
    </div>
  );
}

function AdminCRM() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [sourceFilter, setSourceFilter] = useState("Todas");
  const [showNewClient, setShowNewClient] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "WhatsApp",
    departureCity: "",
    destination: "",
    travelDate: "",
    travelers: "",
    notes: "",
  });

  /*
   * Permite abrir el modal desde:
   * /auth/crm?new=1
   *
   * Esto conecta con el botón "Añadir → Nuevo prospecto"
   * del Header.
   */
  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setShowNewClient(true);
    }
  }, [searchParams]);

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch =
        !term ||
        client.name.toLowerCase().includes(term) ||
        client.phone.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.destination.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "Todos" || client.status === statusFilter;

      const matchesSource =
        sourceFilter === "Todas" || client.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [clients, search, statusFilter, sourceFilter]);

  const metrics = useMemo(() => {
    const quoted = clients.filter((client) => client.quote > 0).length;

    const followUps = clients.filter(
      (client) => client.status === "Seguimiento",
    ).length;

    const reservations = clients.filter(
      (client) => client.status === "Reservado" || client.status === "Pagado",
    ).length;

    const totalQuoted = clients.reduce(
      (sum, client) => sum + Number(client.quote || 0),
      0,
    );

    return {
      leads: clients.length,
      quoted,
      followUps,
      reservations,
      totalQuoted,
    };
  }, [clients]);

  const statusOptions = [
    "Todos",
    "Nuevo",
    "Contactado",
    "Cotizando",
    "Cotización enviada",
    "Seguimiento",
    "Reservado",
    "Pagado",
    "Perdido",
  ];

  const handleInput = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeNewClientModal = () => {
    setShowNewClient(false);

    if (searchParams.has("new")) {
      const next = new URLSearchParams(searchParams);
      next.delete("new");
      setSearchParams(next, { replace: true });
    }
  };

  const handleCreateClient = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      return;
    }

    const newClient = {
      id: Date.now(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || "Sin correo",
      source: form.source,
      departureCity: form.departureCity.trim() || "Por definir",
      destination: form.destination.trim() || "Por definir",
      travelDate: form.travelDate || "Por definir",
      travelers: form.travelers.trim() || "Por definir",
      status: "Nuevo",
      lastContact: "Ahora",
      nextFollowUp: "Pendiente",
      quote: 0,
      notes: form.notes.trim(),
    };

    setClients((prev) => [newClient, ...prev]);

    setForm({
      name: "",
      phone: "",
      email: "",
      source: "WhatsApp",
      departureCity: "",
      destination: "",
      travelDate: "",
      travelers: "",
      notes: "",
    });

    closeNewClientModal();
  };

  return (
    <div className="space-y-5">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-[#12304a]">
              CRM
            </h1>

            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#0260fe]">
              Gestión comercial
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Administra prospectos, cotizaciones, seguimientos y ventas.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            to="/auth/cotizador"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#ff6600]"
          >
            <FaFileInvoiceDollar />
            Nueva cotización
          </Link>

          <button
            type="button"
            onClick={() => setShowNewClient(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0260fe] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            <FaUserPlus />
            Nuevo prospecto
          </button>
        </div>
      </section>

      {/* =====================================================
          METRICS
      ===================================================== */}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          icon={<FaUsers />}
          label="Prospectos"
          value={metrics.leads}
          helper="registrados"
          trend="+12%"
          iconClass="bg-blue-50 text-[#0260fe]"
        />

        <MetricCard
          icon={<FaFileInvoiceDollar />}
          label="Cotizados"
          value={metrics.quoted}
          helper="con propuesta"
          iconClass="bg-violet-50 text-violet-600"
        />

        <MetricCard
          icon={<FaClock />}
          label="Seguimientos"
          value={metrics.followUps}
          helper="pendientes"
          iconClass="bg-orange-50 text-[#ff6600]"
        />

        <MetricCard
          icon={<FaCheckCircle />}
          label="Reservaciones"
          value={metrics.reservations}
          helper="cerradas"
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <MetricCard
          icon={<FaDollarSign />}
          label="Valor cotizado"
          value={money(metrics.totalQuoted)}
          helper="acumulado"
          iconClass="bg-slate-100 text-[#12304a]"
        />
      </section>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por cliente, teléfono, correo o destino..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div className="relative lg:w-[210px]">
            <FaFilter className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

            <select
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-200"
            >
              <option value="Todas">Todos los canales</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Web">Web</option>
              <option value="Referido">Referido</option>
            </select>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto px-4 py-3">
          {statusOptions.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold transition ${
                statusFilter === status
                  ? "bg-[#12304a] text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-[#12304a]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================
          CLIENTS
      ===================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-black text-[#12304a]">
              Clientes y prospectos
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {filteredClients.length} resultado
              {filteredClients.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:text-[#0260fe]"
          >
            <FaEllipsisH />
          </button>
        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1060px]">
            <thead>
              <tr className="bg-slate-50/70 text-left">
                {[
                  "Cliente",
                  "Viaje",
                  "Estado",
                  "Seguimiento",
                  "Cotización",
                  "",
                ].map((title, index) => (
                  <th
                    key={`${title}-${index}`}
                    className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 last:text-right"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="group transition hover:bg-blue-50/30"
                >
                  <td className="px-5 py-4">
                    <Link
                      to={`/auth/crm/${client.id}`}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12304a] text-xs font-black text-white">
                        {client.name
                          .split(" ")
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")}
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#12304a] group-hover:text-[#0260fe]">
                          {client.name}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          {client.phone} · {client.source}
                        </p>
                      </div>
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-700">
                      {client.destination}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {client.travelDate} · {client.travelers}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Desde {client.departureCity}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={client.status} />
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-xs font-bold text-slate-600">
                      {client.nextFollowUp}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Último: {client.lastContact}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    {client.quote > 0 ? (
                      <>
                        <p className="text-sm font-black text-[#0260fe]">
                          {money(client.quote)}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Cotización activa
                        </p>
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        Sin cotizar
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://wa.me/${normalizePhone(client.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Abrir WhatsApp"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
                      >
                        <FaWhatsapp />
                      </a>

                      <Link
                        to={`/auth/cotizador?client=${client.id}`}
                        title="Nueva cotización"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-[#ff6600] transition hover:bg-[#ff6600] hover:text-white"
                      >
                        <FaFileInvoiceDollar />
                      </Link>

                      <Link
                        to={`/auth/crm/${client.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#12304a] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#0260fe]"
                      >
                        Ver
                        <FaChevronRight className="text-[9px]" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE */}

        <div className="divide-y divide-slate-100 lg:hidden">
          {filteredClients.map((client) => (
            <article key={client.id} className="p-4">
              <div className="flex items-start gap-3">
                <Link
                  to={`/auth/crm/${client.id}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12304a] text-xs font-black text-white"
                >
                  {client.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")}
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to={`/auth/crm/${client.id}`}
                        className="font-black text-[#12304a]"
                      >
                        {client.name}
                      </Link>

                      <p className="mt-1 text-xs text-slate-400">
                        {client.phone} · {client.source}
                      </p>
                    </div>

                    <StatusBadge status={client.status} />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Destino
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-700">
                    {client.destination}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {client.travelDate}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Cotización
                  </p>

                  <p className="mt-1 text-sm font-black text-[#0260fe]">
                    {client.quote > 0 ? money(client.quote) : "Sin cotizar"}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Seguimiento: {client.nextFollowUp}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <a
                  href={`https://wa.me/${normalizePhone(client.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-green-50 px-3 py-2.5 text-xs font-bold text-[#25D366]"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>

                <Link
                  to={`/auth/cotizador?client=${client.id}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-orange-50 px-3 py-2.5 text-xs font-bold text-[#ff6600]"
                >
                  <FaFileInvoiceDollar />
                  Cotizar
                </Link>

                <Link
                  to={`/auth/crm/${client.id}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#12304a] px-3 py-2.5 text-xs font-bold text-white"
                >
                  Ver
                  <FaChevronRight className="text-[9px]" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <EmptyState onCreate={() => setShowNewClient(true)} />
        )}
      </section>

      {/* =====================================================
          NEW CLIENT MODAL
      ===================================================== */}

      {showNewClient && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#071727]/60 p-0 backdrop-blur-sm sm:items-center sm:p-5">
          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] bg-white shadow-2xl sm:max-w-3xl sm:rounded-[24px]">
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0260fe]">
                  CRM
                </p>

                <h2 className="mt-1 text-xl font-black text-[#12304a]">
                  Nuevo prospecto
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Registra los datos iniciales del cliente.
                </p>
              </div>

              <button
                type="button"
                onClick={closeNewClientModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
              >
                <FaTimes />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleCreateClient} className="p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* NAME */}

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Nombre completo *
                  </label>

                  <div className="relative mt-1.5">
                    <FaUsers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleInput}
                      required
                      placeholder="Ej. María López"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* PHONE */}

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    WhatsApp *
                  </label>

                  <div className="relative mt-1.5">
                    <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleInput}
                      required
                      placeholder="998 495 4637"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* EMAIL */}

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Correo
                  </label>

                  <div className="relative mt-1.5">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleInput}
                      placeholder="cliente@email.com"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* SOURCE */}

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Canal de entrada
                  </label>

                  <select
                    name="source"
                    value={form.source}
                    onChange={handleInput}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                  >
                    <option>WhatsApp</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                    <option>Web</option>
                    <option>Referido</option>
                    <option>Otro</option>
                  </select>
                </div>

                {/* DEPARTURE */}

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Ciudad de salida
                  </label>

                  <div className="relative mt-1.5">
                    <FaPlaneDeparture className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                    <input
                      name="departureCity"
                      value={form.departureCity}
                      onChange={handleInput}
                      placeholder="CDMX"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* DESTINATION */}

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Destino de interés
                  </label>

                  <div className="relative mt-1.5">
                    <FaMapMarkerAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                    <input
                      name="destination"
                      value={form.destination}
                      onChange={handleInput}
                      placeholder="Cancún"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* DATE */}

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Fecha tentativa
                  </label>

                  <div className="relative mt-1.5">
                    <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                    <input
                      name="travelDate"
                      type="date"
                      value={form.travelDate}
                      onChange={handleInput}
                      className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* TRAVELERS */}

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Viajeros
                  </label>

                  <input
                    name="travelers"
                    value={form.travelers}
                    onChange={handleInput}
                    placeholder="2 adultos + 1 menor"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* NOTES */}

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600">
                    Notas
                  </label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleInput}
                    rows={3}
                    placeholder="Presupuesto, hotel de interés, preferencias, observaciones..."
                    className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* FOOTER */}

              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeNewClientModal}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0260fe] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <FaUserPlus />
                  Guardar prospecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCRM;
