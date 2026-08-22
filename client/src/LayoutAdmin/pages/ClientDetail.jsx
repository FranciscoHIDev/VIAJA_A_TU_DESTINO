import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaCalendarAlt,
  FaUsers,
  FaFileInvoiceDollar,
  FaClock,
  FaPlus,
  FaEdit,
  FaChevronRight,
  FaStickyNote,
  FaHistory,
  FaDollarSign,
  FaSuitcaseRolling,
  FaCheck,
  FaPaperPlane,
  FaTag,
  FaUser,
} from "react-icons/fa";

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

const clientMock = {
  id: 1,
  name: "María López",
  phone: "998 321 4567",
  email: "maria@email.com",
  source: "Facebook",
  status: "Cotización enviada",
  createdAt: "21 Ago 2026",
  lastContact: "Hoy, 11:35",
  nextFollowUp: "22 Ago 2026 · 10:00",
  departureCity: "CDMX",
  destination: "Cancún",
  departureDate: "15 Sep 2026",
  returnDate: "19 Sep 2026",
  travelers: "2 adultos + 1 menor",
  budget: "$20,000 - $25,000",
  notes:
    "Busca hotel Todo Incluido, preferentemente frente al mar. Viajan por aniversario. Está interesada en meses sin intereses.",
};

const activitiesMock = [
  {
    id: 1,
    type: "quote",
    title: "Cotización COT-2026-0041 creada",
    description: "Occidental Tucancún · 5 días / 4 noches",
    date: "Hoy, 11:15",
    amount: 20700,
  },
  {
    id: 2,
    type: "message",
    title: "Cotización enviada por WhatsApp",
    description: "Cliente confirmó recepción de la propuesta.",
    date: "Hoy, 11:20",
  },
  {
    id: 3,
    type: "note",
    title: "Nota agregada",
    description:
      "Le interesa pagar con tarjeta y revisar opciones de 6 y 12 meses sin intereses.",
    date: "Hoy, 11:35",
  },
  {
    id: 4,
    type: "lead",
    title: "Prospecto registrado",
    description: "Origen: Facebook",
    date: "Hoy, 10:30",
  },
];

const quotesMock = [
  {
    id: 41,
    number: "COT-2026-0041",
    destination: "Cancún",
    hotel: "Occidental Tucancún",
    dates: "15 Sep - 19 Sep 2026",
    amount: 20700,
    status: "Enviada",
  },
  {
    id: 34,
    number: "COT-2026-0034",
    destination: "Cancún",
    hotel: "Krystal Cancún",
    dates: "15 Sep - 19 Sep 2026",
    amount: 18900,
    status: "Reemplazada",
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

function SectionHeader({ icon, title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm text-[#0260fe]">
          {icon}
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-black text-[#12304a]">{title}</h2>

          {subtitle ? (
            <p className="mt-0.5 truncate text-[11px] text-slate-400">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {action}
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xs text-[#0260fe]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-bold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function MiniMetric({ icon, label, value, helper, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold text-slate-400">{label}</p>
          <p className="mt-2 text-xl font-black text-[#12304a]">{value}</p>
          {helper ? (
            <p className="mt-1 text-[10px] text-slate-400">{helper}</p>
          ) : null}
        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function ClientDetail() {
  const { id } = useParams();

  const [client, setClient] = useState(clientMock);
  const [activities, setActivities] = useState(activitiesMock);
  const [quotes] = useState(quotesMock);

  const [note, setNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpTime, setFollowUpTime] = useState("");

  const totalQuoted = useMemo(
    () => quotes.reduce((sum, quote) => sum + Number(quote.amount || 0), 0),
    [quotes],
  );

  const initials = client.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const whatsappPhone = normalizePhone(client.phone);

  const whatsappText = encodeURIComponent(
    `Hola ${client.name.split(" ")[0]}, te escribo de Viaja a tu Destino para dar seguimiento a tu viaje a ${client.destination}.`,
  );

  const handleAddNote = (event) => {
    event.preventDefault();

    if (!note.trim()) return;

    setActivities((prev) => [
      {
        id: Date.now(),
        type: "note",
        title: "Nota agregada",
        description: note.trim(),
        date: "Ahora",
      },
      ...prev,
    ]);

    setNote("");
  };

  const handleScheduleFollowUp = (event) => {
    event.preventDefault();

    if (!followUpDate) return;

    const formatted = `${followUpDate}${
      followUpTime ? ` · ${followUpTime}` : ""
    }`;

    setClient((prev) => ({
      ...prev,
      nextFollowUp: formatted,
      status:
        prev.status === "Reservado" || prev.status === "Pagado"
          ? prev.status
          : "Seguimiento",
    }));

    setActivities((prev) => [
      {
        id: Date.now(),
        type: "followup",
        title: "Seguimiento programado",
        description: formatted,
        date: "Ahora",
      },
      ...prev,
    ]);

    setFollowUpDate("");
    setFollowUpTime("");
  };

  return (
    <div className="space-y-5">
      {/* =====================================================
          BREADCRUMB / BACK
      ===================================================== */}

      <div className="flex items-center justify-between gap-4">
        <Link
          to="/auth/crm"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-[#0260fe]"
        >
          <FaArrowLeft />
          Volver al CRM
        </Link>

        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
          Cliente #{id || client.id}
        </span>
      </div>

      {/* =====================================================
          CLIENT HEADER
      ===================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#12304a] text-base font-black text-white shadow-sm">
              {initials}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-black tracking-tight text-[#12304a]">
                  {client.name}
                </h1>

                <StatusBadge status={client.status} />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                <span>{client.source}</span>
                <span>•</span>
                <span>Registrado {client.createdAt}</span>
                <span>•</span>
                <span>Último contacto {client.lastContact}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`https://wa.me/${whatsappPhone}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-600"
            >
              <FaWhatsapp />
              WhatsApp
            </a>

            <Link
              to={`/auth/cotizador?client=${client.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0260fe] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              <FaFileInvoiceDollar />
              Nueva cotización
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          METRICS
      ===================================================== */}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MiniMetric
          icon={<FaFileInvoiceDollar />}
          label="Cotizaciones"
          value={quotes.length}
          helper="historial del cliente"
          iconClass="bg-violet-50 text-violet-600"
        />

        <MiniMetric
          icon={<FaDollarSign />}
          label="Valor cotizado"
          value={money(totalQuoted)}
          helper="acumulado"
          iconClass="bg-blue-50 text-[#0260fe]"
        />

        <MiniMetric
          icon={<FaClock />}
          label="Próximo seguimiento"
          value={client.nextFollowUp}
          helper="próxima acción"
          iconClass="bg-orange-50 text-[#ff6600]"
        />

        <MiniMetric
          icon={<FaSuitcaseRolling />}
          label="Destino"
          value={client.destination}
          helper="viaje actual"
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </section>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
        {/* ===================================================
            LEFT
        =================================================== */}

        <div className="space-y-5">
          {/* CLIENT DATA */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={<FaUser />}
              title="Datos del cliente"
              subtitle="Información comercial"
              action={
                <button
                  type="button"
                  title="Editar cliente"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-400 transition hover:border-blue-200 hover:text-[#0260fe]"
                >
                  <FaEdit />
                </button>
              }
            />

            <div className="grid gap-5 p-5">
              <InfoItem
                icon={<FaPhoneAlt />}
                label="WhatsApp"
                value={client.phone}
              />

              <InfoItem
                icon={<FaEnvelope />}
                label="Correo"
                value={client.email}
              />

              <InfoItem
                icon={<FaMapMarkerAlt />}
                label="Destino"
                value={client.destination}
              />

              <InfoItem
                icon={<FaPlaneDeparture />}
                label="Ciudad de salida"
                value={client.departureCity}
              />

              <InfoItem
                icon={<FaCalendarAlt />}
                label="Fechas"
                value={`${client.departureDate} - ${client.returnDate}`}
              />

              <InfoItem
                icon={<FaUsers />}
                label="Viajeros"
                value={client.travelers}
              />
            </div>

            <div className="border-t border-slate-100 bg-orange-50/60 px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#ff6600]">
                Presupuesto estimado
              </p>

              <p className="mt-1 text-lg font-black text-[#12304a]">
                {client.budget}
              </p>
            </div>
          </section>

          {/* PIPELINE */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={<FaTag />}
              title="Estado comercial"
              subtitle="Etapa actual del prospecto"
            />

            <div className="p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-500">
                  Pipeline
                </span>

                <StatusBadge status={client.status} />
              </div>

              <select
                value={client.status}
                onChange={(event) =>
                  setClient((prev) => ({
                    ...prev,
                    status: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
              >
                <option>Nuevo</option>
                <option>Contactado</option>
                <option>Cotizando</option>
                <option>Cotización enviada</option>
                <option>Seguimiento</option>
                <option>Reservado</option>
                <option>Pagado</option>
                <option>Perdido</option>
              </select>
            </div>
          </section>

          {/* FOLLOW UP */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={<FaClock />}
              title="Seguimiento"
              subtitle="Programa el próximo contacto"
            />

            <form onSubmit={handleScheduleFollowUp} className="space-y-4 p-5">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Fecha
                  </label>

                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(event) => setFollowUpDate(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600">
                    Hora
                  </label>

                  <input
                    type="time"
                    value={followUpTime}
                    onChange={(event) => setFollowUpTime(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                <FaCalendarAlt />
                Programar seguimiento
              </button>
            </form>
          </section>
        </div>

        {/* ===================================================
            RIGHT
        =================================================== */}

        <div className="space-y-5">
          {/* NOTES */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={<FaStickyNote />}
              title="Notas comerciales"
              subtitle="Preferencias y observaciones"
            />

            <div className="p-5">
              <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {client.notes}
              </div>

              <form onSubmit={handleAddNote} className="mt-4">
                <label className="text-xs font-bold text-slate-600">
                  Agregar nota
                </label>

                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Llamada, preferencia, actualización o comentario..."
                  className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                />

                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#12304a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0260fe]"
                  >
                    <FaPaperPlane />
                    Agregar al historial
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* QUOTES */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={<FaFileInvoiceDollar />}
              title="Cotizaciones"
              subtitle={`${quotes.length} propuestas registradas`}
              action={
                <Link
                  to={`/auth/cotizador?client=${client.id}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0260fe] px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                >
                  <FaPlus />
                  Nueva
                </Link>
              }
            />

            <div className="divide-y divide-slate-100">
              {quotes.map((quote) => (
                <article
                  key={quote.id}
                  className="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-black text-[#0260fe]">
                        {quote.number}
                      </span>

                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                        {quote.status}
                      </span>
                    </div>

                    <p className="mt-2 truncate text-sm font-black text-[#12304a]">
                      {quote.hotel}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {quote.destination} · {quote.dates}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Total
                      </p>

                      <p className="mt-1 text-base font-black text-[#0260fe]">
                        {money(quote.amount)}
                      </p>
                    </div>

                    <button
                      type="button"
                      title="Ver cotización"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-500 transition hover:bg-[#12304a] hover:text-white"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* TIMELINE */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={<FaHistory />}
              title="Actividad"
              subtitle="Historial comercial del cliente"
            />

            <div className="p-5">
              <div className="space-y-0">
                {activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="relative flex gap-3 pb-5 last:pb-0"
                  >
                    {index !== activities.length - 1 ? (
                      <div className="absolute left-[15px] top-8 h-[calc(100%-18px)] w-px bg-slate-200" />
                    ) : null}

                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#0260fe] text-[10px] text-white shadow-sm">
                      {activity.type === "quote" ? (
                        <FaFileInvoiceDollar />
                      ) : activity.type === "message" ? (
                        <FaWhatsapp />
                      ) : activity.type === "followup" ? (
                        <FaClock />
                      ) : activity.type === "lead" ? (
                        <FaUsers />
                      ) : (
                        <FaStickyNote />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 rounded-xl bg-slate-50 px-4 py-3">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-black text-[#12304a]">
                            {activity.title}
                          </p>

                          <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                            {activity.description}
                          </p>
                        </div>

                        <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                          {activity.date}
                        </span>
                      </div>

                      {activity.amount ? (
                        <p className="mt-2 text-sm font-black text-[#0260fe]">
                          {money(activity.amount)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;
