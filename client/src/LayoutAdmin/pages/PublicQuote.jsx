import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaClock,
  FaCopy,
  FaCreditCard,
  FaEnvelope,
  FaHotel,
  FaMapMarkerAlt,
  FaPlane,
  FaPrint,
  FaShareAlt,
  FaShieldAlt,
  FaShuttleVan,
  FaSuitcase,
  FaTicketAlt,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";

const LOGO =
  "https://res.cloudinary.com/duaysiozi/image/upload/v1785018355/i6jhddqaqz1ijctzrw42.webp";

/*
  ============================================================
  MOCK TEMPORAL
  Después este objeto llegará desde:
  GET /api/quotes/public/:slug

  Cambia serviceType para probar:
  - "Paquete"
  - "Hotel"
  - "Vuelo"
  - "Traslado"
  - "Tour"
  ============================================================
*/

const quoteMock = {
  id: "COT-2026-0042",
  slug: "cot-2026-0042-maria-lopez-cancun",
  status: "Enviada",

  // Paquete | Hotel | Vuelo | Traslado | Tour
  serviceType: "Paquete",

  client: {
    name: "María López",
  },

  destination: "Cancún",
  departureCity: "CDMX",
  departureDate: "2026-09-15",
  returnDate: "2026-09-19",

  adults: 2,
  children: 1,
  childAges: [8],

  hotel: {
    name: "Occidental Tucancún",
    room: "Habitación Estándar",
    mealPlan: "Todo Incluido",
    nights: 4,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
  },

  flight: {
    airline: "Viva",
    fareType: "Light",
    baggage: "Artículo personal + equipaje de mano de 10 kg",
    outbound: {
      number: "VB 1012",
      origin: "CDMX",
      destination: "Cancún",
      date: "2026-09-15",
      departureTime: "08:20",
      arrivalTime: "11:35",
    },
    return: {
      number: "VB 1013",
      origin: "Cancún",
      destination: "CDMX",
      date: "2026-09-19",
      departureTime: "18:10",
      arrivalTime: "19:45",
    },
  },

  transfer: {
    provider: "Caribe Shuttle",
    transferType: "Redondo",
    vehicle: "Compartido",
    pickupPoint: "Aeropuerto Internacional de Cancún",
    dropoffPoint: "Occidental Tucancún",
    arrivalDate: "2026-09-15",
    arrivalTime: "12:30",
    returnDate: "2026-09-19",
    returnTime: "15:30",
  },

  tour: {
    name: "Xcaret México Espectacular",
    provider: "Grupo Xcaret",
    date: "2026-09-17",
    time: "08:00",
    duration: "12 horas",
    meetingPoint: "Lobby del hotel",
    image:
      "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1400&q=85",
  },

  includes: [
    "Vuelo redondo",
    "4 noches de hospedaje",
    "Plan Todo Incluido",
    "Impuestos incluidos",
    "Asistencia durante tu viaje",
  ],

  paymentOptions: [
    "Pago de contado",
    "6 meses sin intereses",
    "12 meses sin intereses",
  ],

  price: {
    total: 20700,
    perPerson: 6900,
    currency: "MXN",
  },

  validUntil: "2026-08-22",
  validUntilTime: "18:00",

  conditions:
    "Tarifa sujeta a disponibilidad y cambios sin previo aviso hasta confirmar la reservación. Los servicios quedan confirmados únicamente después de recibir el pago correspondiente y emitir la confirmación de reserva.",

  advisor: {
    name: "Isidoro Francisco",
    phone: "998 495 4637",
    email: "ventas@viajaatudestino.com",
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

const formatDate = (value, options = {}) => {
  if (!value) return "Por definir";

  const date = new Date(`${value}T12:00:00`);

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: options.short ? "short" : "long",
    year: "numeric",
  }).format(date);
};

const normalizePhone = (phone = "") => {
  const digits = String(phone).replace(/\D/g, "");

  if (!digits) return "";

  return digits.startsWith("52") ? digits : `52${digits}`;
};

const truncateText = (value = "", max = 260) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trim()}…`;
};

/* ============================================================
   SERVICE CONFIG
============================================================ */

const SERVICE_CONFIG = {
  Paquete: {
    label: "Vuelo + Hotel",
    eyebrow: "Paquete de viaje",
    icon: FaSuitcase,
  },
  Hotel: {
    label: "Hotel",
    eyebrow: "Hospedaje",
    icon: FaHotel,
  },
  Vuelo: {
    label: "Vuelo",
    eyebrow: "Servicio aéreo",
    icon: FaPlane,
  },
  Traslado: {
    label: "Traslado",
    eyebrow: "Transportación",
    icon: FaShuttleVan,
  },
  Tour: {
    label: "Tour",
    eyebrow: "Experiencia",
    icon: FaTicketAlt,
  },
};

/* ============================================================
   UI COMPONENTS
============================================================ */

function InfoPill({ icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-3.5 py-3 backdrop-blur">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-sm text-white">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.12em] text-blue-100/70">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-bold text-white sm:text-sm">
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({ icon, eyebrow, title, description }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0260fe]">
        {icon}
      </div>

      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#0260fe]">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-0.5 text-lg font-black text-[#12304a] sm:text-xl">
          {title}
        </h2>

        {description ? (
          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function FlightRow({
  type,
  accent = "blue",
  number,
  origin,
  destination,
  date,
  departureTime,
  arrivalTime,
}) {
  const accentClass =
    accent === "orange"
      ? "bg-orange-50 text-[#ff6600]"
      : "bg-blue-50 text-[#0260fe]";

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-[85px_minmax(0,1fr)_150px] sm:items-center sm:p-5">
      <div>
        <span
          className={`inline-flex rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${accentClass}`}
        >
          {type}
        </span>

        <p className="mt-2 text-xs font-bold text-slate-400">{number}</p>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm font-black text-[#12304a] sm:text-base">
          <span>{origin}</span>
          <FaArrowRight className="text-[9px] text-slate-300" />
          <span>{destination}</span>
        </div>

        <p className="mt-1 text-xs text-slate-400">{formatDate(date)}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 sm:bg-transparent sm:p-0">
        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Sale
          </p>
          <p className="mt-1 text-sm font-black text-[#12304a]">
            {departureTime || "--:--"}
          </p>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Llega
          </p>
          <p className="mt-1 text-sm font-black text-[#12304a]">
            {arrivalTime || "--:--"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SERVICE SECTIONS
============================================================ */

function HotelSection({ quote }) {
  if (!quote.hotel) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-[210px] overflow-hidden sm:h-[300px]">
        <img
          src={quote.hotel.image}
          alt={quote.hotel.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#071c30]/90 via-[#071c30]/15 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-100">
            Hospedaje
          </p>

          <h2 className="mt-1 text-2xl font-black sm:text-3xl">
            {quote.hotel.name}
          </h2>

          <p className="mt-2 text-xs text-white/80 sm:text-sm">
            {quote.hotel.room} · {quote.hotel.mealPlan}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 sm:p-6">
        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Plan
          </p>
          <p className="mt-1 text-sm font-black text-[#12304a]">
            {quote.hotel.mealPlan}
          </p>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Habitación
          </p>
          <p className="mt-1 text-sm font-black text-[#12304a]">
            {quote.hotel.room}
          </p>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Estancia
          </p>
          <p className="mt-1 text-sm font-black text-[#12304a]">
            {quote.hotel.nights} noches
          </p>
        </div>
      </div>
    </section>
  );
}

function FlightSection({ quote }) {
  if (!quote.flight) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="p-5 sm:p-6">
        <SectionTitle
          icon={<FaPlane />}
          eyebrow="Itinerario"
          title="Vuelos"
          description={`${quote.flight.airline} · Tarifa ${quote.flight.fareType} · ${quote.flight.baggage}`}
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <FlightRow
            type="Ida"
            number={quote.flight.outbound.number}
            origin={quote.flight.outbound.origin}
            destination={quote.flight.outbound.destination}
            date={quote.flight.outbound.date}
            departureTime={quote.flight.outbound.departureTime}
            arrivalTime={quote.flight.outbound.arrivalTime}
          />

          <div className="h-px bg-slate-100" />

          <FlightRow
            type="Regreso"
            accent="orange"
            number={quote.flight.return.number}
            origin={quote.flight.return.origin}
            destination={quote.flight.return.destination}
            date={quote.flight.return.date}
            departureTime={quote.flight.return.departureTime}
            arrivalTime={quote.flight.return.arrivalTime}
          />
        </div>
      </div>
    </section>
  );
}

function TransferSection({ quote }) {
  if (!quote.transfer) return null;

  const transfer = quote.transfer;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionTitle
        icon={<FaShuttleVan />}
        eyebrow="Transportación"
        title={`${transfer.transferType} · ${transfer.vehicle}`}
        description={
          transfer.provider ? `Operado por ${transfer.provider}` : null
        }
      />

      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
        <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Recogida
            </p>
            <p className="mt-1 text-sm font-black text-[#12304a]">
              {transfer.pickupPoint}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {formatDate(transfer.arrivalDate)} · {transfer.arrivalTime}
            </p>
          </div>

          <div className="hidden h-px w-10 bg-slate-300 sm:block" />

          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Destino
            </p>
            <p className="mt-1 text-sm font-black text-[#12304a]">
              {transfer.dropoffPoint}
            </p>

            {transfer.transferType === "Redondo" ? (
              <p className="mt-2 text-xs text-slate-500">
                Regreso: {formatDate(transfer.returnDate)} ·{" "}
                {transfer.returnTime}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function TourSection({ quote }) {
  if (!quote.tour) return null;

  const tour = quote.tour;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {tour.image ? (
        <div className="relative h-[190px] overflow-hidden sm:h-[270px]">
          <img
            src={tour.image}
            alt={tour.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#071c30]/85 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-100">
              Experiencia
            </p>

            <h2 className="mt-1 text-2xl font-black">{tour.name}</h2>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 sm:p-6">
        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Fecha
          </p>
          <p className="mt-1 text-sm font-black text-[#12304a]">
            {formatDate(tour.date)}
          </p>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Hora
          </p>
          <p className="mt-1 text-sm font-black text-[#12304a]">{tour.time}</p>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Duración
          </p>
          <p className="mt-1 text-sm font-black text-[#12304a]">
            {tour.duration}
          </p>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Encuentro
          </p>
          <p className="mt-1 text-sm font-black text-[#12304a]">
            {tour.meetingPoint}
          </p>
        </div>
      </div>
    </section>
  );
}

function ServiceContent({ quote }) {
  switch (quote.serviceType) {
    case "Paquete":
      return (
        <>
          <HotelSection quote={quote} />
          <FlightSection quote={quote} />
        </>
      );

    case "Hotel":
      return <HotelSection quote={quote} />;

    case "Vuelo":
      return <FlightSection quote={quote} />;

    case "Traslado":
      return <TransferSection quote={quote} />;

    case "Tour":
      return <TourSection quote={quote} />;

    default:
      return null;
  }
}

/* ============================================================
   PRINT-ONLY A4 ONE-PAGE VERSION
============================================================ */

function PrintQuoteOnePage({ quote, config, travelerText }) {
  const Icon = config.icon;

  const serviceRows = [];

  if (
    (quote.serviceType === "Paquete" || quote.serviceType === "Hotel") &&
    quote.hotel
  ) {
    serviceRows.push({
      label: "Hotel",
      value: quote.hotel.name,
    });

    serviceRows.push({
      label: "Habitación / plan",
      value: `${quote.hotel.room} · ${quote.hotel.mealPlan} · ${quote.hotel.nights} noches`,
    });
  }

  if (
    (quote.serviceType === "Paquete" || quote.serviceType === "Vuelo") &&
    quote.flight
  ) {
    serviceRows.push({
      label: "Vuelo de ida",
      value: `${quote.flight.outbound.origin} → ${quote.flight.outbound.destination} · ${formatDate(
        quote.flight.outbound.date,
        { short: true },
      )} · ${quote.flight.outbound.departureTime} - ${
        quote.flight.outbound.arrivalTime
      } · ${quote.flight.outbound.number}`,
    });

    serviceRows.push({
      label: "Vuelo de regreso",
      value: `${quote.flight.return.origin} → ${quote.flight.return.destination} · ${formatDate(
        quote.flight.return.date,
        { short: true },
      )} · ${quote.flight.return.departureTime} - ${
        quote.flight.return.arrivalTime
      } · ${quote.flight.return.number}`,
    });
  }

  if (quote.serviceType === "Traslado" && quote.transfer) {
    serviceRows.push({
      label: "Traslado",
      value: `${quote.transfer.transferType} · ${quote.transfer.vehicle}`,
    });

    serviceRows.push({
      label: "Ruta",
      value: `${quote.transfer.pickupPoint} → ${quote.transfer.dropoffPoint}`,
    });

    serviceRows.push({
      label: "Fecha",
      value: `${formatDate(quote.transfer.arrivalDate, {
        short: true,
      })} · ${quote.transfer.arrivalTime}`,
    });
  }

  if (quote.serviceType === "Tour" && quote.tour) {
    serviceRows.push({
      label: "Tour",
      value: quote.tour.name,
    });

    serviceRows.push({
      label: "Fecha / duración",
      value: `${formatDate(quote.tour.date, {
        short: true,
      })} · ${quote.tour.time} · ${quote.tour.duration}`,
    });

    serviceRows.push({
      label: "Punto de encuentro",
      value: quote.tour.meetingPoint,
    });
  }

  return (
    <section className="print-only print-sheet">
      <div className="print-header">
        <img src={LOGO} alt="Viaja a tu Destino" className="print-logo" />

        <div className="print-header-right">
          <p className="print-small-label">COTIZACIÓN</p>
          <p className="print-quote-number">{quote.id}</p>
        </div>
      </div>

      <div className="print-hero">
        <div>
          <div className="print-service">
            <Icon />
            <span>{config.label}</span>
          </div>

          <h1>{quote.destination}</h1>

          <p>
            Propuesta personalizada para <strong>{quote.client.name}</strong>
          </p>
        </div>

        <div className="print-price">
          <span>PRECIO ESPECIAL</span>
          <strong>{money(quote.price.total)} MXN</strong>
          <small>Desde {money(quote.price.perPerson)} MXN por persona</small>
        </div>
      </div>

      <div className="print-summary-grid">
        <div>
          <span>Fechas</span>
          <strong>
            {formatDate(quote.departureDate, { short: true })} -{" "}
            {formatDate(quote.returnDate, { short: true })}
          </strong>
        </div>

        <div>
          <span>Viajeros</span>
          <strong>{travelerText}</strong>
        </div>

        <div>
          <span>Salida</span>
          <strong>{quote.departureCity}</strong>
        </div>

        <div>
          <span>Servicio</span>
          <strong>{config.label}</strong>
        </div>
      </div>

      <div className="print-section">
        <h2>Detalles de la propuesta</h2>

        <div className="print-detail-table">
          {serviceRows.map((row) => (
            <div className="print-detail-row" key={`${row.label}-${row.value}`}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="print-two-cols">
        <div className="print-section print-compact">
          <h2>Incluye</h2>

          <ul>
            {quote.includes.slice(0, 6).map((item) => (
              <li key={item}>
                <span>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="print-section print-compact">
          <h2>Opciones de pago</h2>

          <ul>
            {quote.paymentOptions.slice(0, 5).map((item) => (
              <li key={item}>
                <span>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="print-validity">
        <div>
          <span>VIGENCIA DE LA TARIFA</span>
          <strong>
            {formatDate(quote.validUntil)} · {quote.validUntilTime} hrs.
          </strong>
        </div>

        <div className="print-advisor">
          <span>TU ASESOR</span>
          <strong>{quote.advisor.name}</strong>
          <small>
            {quote.advisor.phone} · {quote.advisor.email}
          </small>
        </div>
      </div>

      <div className="print-conditions">
        <strong>Información importante:</strong>{" "}
        {truncateText(quote.conditions, 290)}
      </div>

      <div className="print-footer">
        <span>Viaja a tu Destino</span>
        <span>Cazamos las mejores ofertas de viaje para ti.</span>
        <span>{quote.id}</span>
      </div>
    </section>
  );
}

/* ============================================================
   MAIN
============================================================ */

function PublicQuote() {
  const { slug } = useParams();

  /*
    En producción:
    const [quote, setQuote] = useState(null);

    useEffect(() => {
      api.get(`/quotes/public/${slug}`).then(...)
    }, [slug]);
  */

  const quote = quoteMock;

  const config = SERVICE_CONFIG[quote.serviceType] || SERVICE_CONFIG.Paquete;

  const ServiceIcon = config.icon;

  const travelers = Number(quote.adults || 0) + Number(quote.children || 0);

  const travelerText = `${quote.adults} adulto${
    Number(quote.adults) !== 1 ? "s" : ""
  }${
    Number(quote.children) > 0
      ? ` + ${quote.children} menor${Number(quote.children) !== 1 ? "es" : ""}`
      : ""
  }`;

  const whatsappMessage = useMemo(
    () =>
      [
        `Hola, soy ${quote.client.name}.`,
        "",
        `Me interesa la cotización ${quote.id} para ${quote.destination}.`,
        `Servicio: ${config.label}.`,
        `Total: ${money(quote.price.total)} MXN.`,
        "",
        "Quisiera confirmar disponibilidad y continuar con la reservación.",
      ].join("\n"),
    [quote, config.label],
  );

  const whatsappUrl = `https://api.whatsapp.com/send?${new URLSearchParams({
    phone: normalizePhone(quote.advisor.phone),
    text: whatsappMessage,
  }).toString()}`;

  const handleShare = async () => {
    const shareData = {
      title: `Cotización ${quote.id} | Viaja a tu Destino`,
      text: `${config.label} para ${quote.destination} - ${money(
        quote.price.total,
      )} MXN`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado.");
    } catch {
      // El usuario pudo cancelar el share.
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Enlace de la cotización copiado.");
    } catch {
      alert("No fue posible copiar el enlace.");
    }
  };

  return (
    <>
      {/* =====================================================
          PRINT CSS
      ===================================================== */}

      <style>{`
        .print-only {
          display: none;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 7mm;
          }

          html,
          body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden !important;
          }

          .screen-only {
            display: none !important;
          }

          .print-only,
          .print-only * {
            visibility: visible !important;
          }

          .print-only {
            display: block !important;
          }

          .print-sheet {
            position: absolute;
            inset: 0;
            width: 196mm;
            min-height: 275mm;
            max-height: 275mm;
            overflow: hidden;
            margin: 0 auto;
            background: white;
            color: #334155;
            font-family: Arial, Helvetica, sans-serif;
          }

          .print-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 20mm;
            border-bottom: 1px solid #e2e8f0;
          }

          .print-logo {
            width: 48mm;
            max-height: 14mm;
            object-fit: contain;
            object-position: left center;
          }

          .print-header-right {
            text-align: right;
          }

          .print-small-label {
            margin: 0;
            font-size: 7pt;
            font-weight: 700;
            letter-spacing: 1.2pt;
            color: #94a3b8;
          }

          .print-quote-number {
            margin: 2mm 0 0;
            font-size: 10pt;
            font-weight: 800;
            color: #12304a;
          }

          .print-hero {
            display: grid;
            grid-template-columns: 1fr 62mm;
            gap: 8mm;
            align-items: center;
            margin-top: 5mm;
            padding: 6mm;
            border-radius: 4mm;
            background: linear-gradient(135deg, #12304a 0%, #0260fe 100%);
            color: white;
          }

          .print-service {
            display: inline-flex;
            align-items: center;
            gap: 2mm;
            font-size: 7pt;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.8pt;
            color: #bfdbfe;
          }

          .print-service svg {
            width: 3.5mm;
            height: 3.5mm;
          }

          .print-hero h1 {
            margin: 2mm 0 0;
            font-size: 22pt;
            line-height: 1;
            font-weight: 900;
          }

          .print-hero p {
            margin: 2mm 0 0;
            font-size: 8pt;
            color: #dbeafe;
          }

          .print-price {
            padding: 4mm;
            border-radius: 3mm;
            background: white;
            color: #12304a;
          }

          .print-price span {
            display: block;
            font-size: 7pt;
            font-weight: 900;
            letter-spacing: 0.7pt;
            color: #ff6600;
          }

          .print-price strong {
            display: block;
            margin-top: 1.5mm;
            font-size: 20pt;
            line-height: 1;
            font-weight: 900;
          }

          .print-price small {
            display: block;
            margin-top: 2mm;
            font-size: 7pt;
            font-weight: 700;
            color: #64748b;
          }

          .print-summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2.5mm;
            margin-top: 4mm;
          }

          .print-summary-grid > div {
            min-height: 13mm;
            padding: 3mm;
            border: 1px solid #e2e8f0;
            border-radius: 2.5mm;
          }

          .print-summary-grid span,
          .print-validity span {
            display: block;
            font-size: 6.5pt;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5pt;
            color: #94a3b8;
          }

          .print-summary-grid strong {
            display: block;
            margin-top: 1.3mm;
            font-size: 8pt;
            line-height: 1.3;
            color: #12304a;
          }

          .print-section {
            margin-top: 4mm;
            padding: 4mm;
            border: 1px solid #e2e8f0;
            border-radius: 3mm;
            break-inside: avoid;
          }

          .print-section h2 {
            margin: 0 0 3mm;
            font-size: 10pt;
            font-weight: 900;
            color: #12304a;
          }

          .print-detail-table {
            display: grid;
          }

          .print-detail-row {
            display: grid;
            grid-template-columns: 37mm 1fr;
            gap: 4mm;
            padding: 2.2mm 0;
            border-top: 1px solid #f1f5f9;
          }

          .print-detail-row:first-child {
            border-top: 0;
            padding-top: 0;
          }

          .print-detail-row span {
            font-size: 7pt;
            font-weight: 800;
            color: #94a3b8;
          }

          .print-detail-row strong {
            font-size: 7.5pt;
            line-height: 1.35;
            color: #334155;
          }

          .print-two-cols {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4mm;
          }

          .print-compact {
            min-height: 32mm;
          }

          .print-compact ul {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2mm 4mm;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .print-compact li {
            display: flex;
            gap: 2mm;
            font-size: 7.2pt;
            line-height: 1.3;
            color: #475569;
          }

          .print-compact li span {
            color: #16a34a;
            font-weight: 900;
          }

          .print-validity {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5mm;
            margin-top: 4mm;
            padding: 4mm;
            border-radius: 3mm;
            background: #fff7ed;
          }

          .print-validity strong {
            display: block;
            margin-top: 1.5mm;
            font-size: 8.5pt;
            color: #12304a;
          }

          .print-advisor {
            text-align: right;
          }

          .print-advisor small {
            display: block;
            margin-top: 1mm;
            font-size: 6.5pt;
            color: #64748b;
          }

          .print-conditions {
            margin-top: 4mm;
            padding: 3mm 4mm;
            border-radius: 2.5mm;
            background: #f8fafc;
            font-size: 6.5pt;
            line-height: 1.4;
            color: #64748b;
          }

          .print-conditions strong {
            color: #334155;
          }

          .print-footer {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            padding-top: 3mm;
            border-top: 1px solid #e2e8f0;
            font-size: 6.2pt;
            color: #94a3b8;
          }
        }
      `}</style>

      {/* =====================================================
          SCREEN VERSION
      ===================================================== */}

      <div className="screen-only min-h-screen bg-[#f5f7fb] text-slate-700">
        {/* TOP BAR */}

        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
            <a href="/" className="block min-w-0">
              <img
                src={LOGO}
                alt="Viaja a tu Destino"
                className="h-9 w-auto max-w-[170px] object-contain sm:h-11 sm:max-w-[210px]"
              />
            </a>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                title="Copiar enlace"
                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-blue-200 hover:text-[#0260fe] sm:flex"
              >
                <FaCopy />
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0260fe] sm:px-3.5 sm:text-sm"
              >
                <FaShareAlt />
                <span className="hidden xs:inline">Compartir</span>
              </button>
            </div>
          </div>
        </header>

        {/* HERO */}

        <section className="bg-gradient-to-br from-[#102f4b] via-[#073d79] to-[#0260fe] text-white">
          <div className="mx-auto max-w-[1180px] px-4 py-7 sm:px-6 sm:py-10 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_330px] lg:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-blue-100">
                    <ServiceIcon />
                    {config.label}
                  </span>

                  <span className="rounded-lg bg-emerald-400/15 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-emerald-200">
                    Cotización personalizada
                  </span>
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200">
                  {config.eyebrow}
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                  {quote.destination}
                </h1>

                <p className="mt-3 max-w-2xl text-xs leading-5 text-blue-100/80 sm:text-base sm:leading-6">
                  Preparamos esta propuesta especialmente para{" "}
                  <strong className="text-white">{quote.client.name}</strong>.
                </p>

                <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoPill
                    icon={<FaCalendarAlt />}
                    label="Fechas"
                    value={`${formatDate(quote.departureDate, {
                      short: true,
                    })} - ${formatDate(quote.returnDate, {
                      short: true,
                    })}`}
                  />

                  <InfoPill
                    icon={<FaUsers />}
                    label="Viajeros"
                    value={travelerText}
                  />

                  <InfoPill
                    icon={<FaMapMarkerAlt />}
                    label="Salida"
                    value={quote.departureCity}
                  />
                </div>
              </div>

              {/* PRICE CARD */}

              <div className="rounded-[22px] border border-white/15 bg-white p-5 text-slate-700 shadow-2xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#ff6600]">
                      ★ Precio especial
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-slate-400">
                      Total de la propuesta
                    </p>
                  </div>

                  <span className="rounded-lg bg-orange-50 px-2.5 py-1 text-[9px] font-black text-[#ff6600]">
                    {quote.id}
                  </span>
                </div>

                <p className="mt-4 text-3xl font-black tracking-tight text-[#12304a] sm:text-4xl">
                  {money(quote.price.total)}
                </p>

                <p className="mt-1 text-[10px] font-bold text-slate-400">
                  MXN total
                </p>

                {travelers > 0 ? (
                  <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3">
                    <p className="text-[9px] font-black uppercase tracking-wider text-[#0260fe]">
                      Desde
                    </p>

                    <p className="mt-1 text-sm font-black text-[#0260fe] sm:text-base">
                      {money(quote.price.perPerson)} MXN por persona
                    </p>
                  </div>
                ) : null}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-orange-600"
                >
                  Quiero reservar
                  <FaArrowRight className="text-[9px]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN */}

        <main className="mx-auto grid max-w-[1180px] gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <ServiceContent quote={quote} />

            {/* INCLUDES */}

            {quote.includes?.length ? (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <SectionTitle
                  icon={<FaSuitcase />}
                  eyebrow="Beneficios"
                  title="Tu viaje incluye"
                  description="Servicios contemplados dentro de esta propuesta."
                />

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {quote.includes.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[9px] text-emerald-600">
                        <FaCheck />
                      </span>

                      <span className="text-xs font-bold text-slate-600 sm:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* PAYMENT */}

            {quote.paymentOptions?.length ? (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <SectionTitle
                  icon={<FaCreditCard />}
                  eyebrow="Flexibilidad"
                  title="Opciones de pago"
                  description="Elige la alternativa que mejor se adapte a tu viaje."
                />

                <div className="grid gap-3 sm:grid-cols-3">
                  {quote.paymentOptions.map((option, index) => (
                    <div
                      key={option}
                      className={`rounded-2xl border p-4 ${
                        index === 1
                          ? "border-orange-200 bg-orange-50/60"
                          : "border-slate-200"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm ${
                          index === 1
                            ? "bg-orange-100 text-[#ff6600]"
                            : "bg-blue-50 text-[#0260fe]"
                        }`}
                      >
                        <FaCreditCard />
                      </div>

                      <p className="mt-3 text-xs font-black text-[#12304a] sm:text-sm">
                        {option}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* CONDITIONS */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionTitle
                icon={<FaShieldAlt />}
                eyebrow="Información importante"
                title="Condiciones de la cotización"
              />

              <p className="text-xs leading-6 text-slate-500 sm:text-sm sm:leading-7">
                {quote.conditions}
              </p>
            </section>
          </div>

          {/* SIDEBAR */}

          <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
            <section className="rounded-3xl border border-orange-200 bg-orange-50/70 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#ff6600] shadow-sm">
                  <FaClock />
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#ff6600]">
                    Vigencia de la tarifa
                  </p>

                  <p className="mt-2 text-base font-black text-[#12304a]">
                    {formatDate(quote.validUntil)}
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Hasta las {quote.validUntilTime} hrs.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#0260fe]">
                Tu asesor de viaje
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#12304a] text-xs font-black text-white">
                  IF
                </div>

                <div className="min-w-0">
                  <p className="font-black text-[#12304a]">
                    {quote.advisor.name}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Viaja a tu Destino
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3 text-xs font-bold text-[#25D366] transition hover:bg-green-100 sm:text-sm"
                >
                  <FaWhatsapp />
                  {quote.advisor.phone}
                </a>

                <a
                  href={`mailto:${quote.advisor.email}`}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-100 sm:text-sm"
                >
                  <FaEnvelope className="text-[#0260fe]" />
                  <span className="truncate">{quote.advisor.email}</span>
                </a>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl bg-[#12304a] p-5 text-white shadow-xl">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-200">
                ¿Te gustó esta propuesta?
              </p>

              <h3 className="mt-2 text-lg font-black">Da el siguiente paso</h3>

              <p className="mt-2 text-xs leading-5 text-white/65">
                Escríbenos para confirmar disponibilidad antes de realizar
                cualquier pago.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-4 py-3 text-xs font-black text-white transition hover:bg-orange-600 sm:text-sm"
              >
                <FaWhatsapp />
                Quiero reservar
              </a>
            </section>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-500 transition hover:border-blue-200 hover:text-[#0260fe]"
            >
              <FaPrint />
              Imprimir / Guardar PDF
            </button>
          </aside>
        </main>

        {/* FOOTER */}

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-4 py-6 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <p className="text-sm font-black text-[#12304a]">
                Viaja a tu Destino
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Cazamos las mejores ofertas de viaje para ti.
              </p>
            </div>

            <p className="text-[10px] leading-5 text-slate-400">
              Cotización {quote.id} · Uso exclusivo del cliente.
            </p>
          </div>
        </footer>

        {/* MOBILE STICKY CTA */}

        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-black uppercase tracking-wider text-[#ff6600]">
                ★ Precio especial
              </p>

              <p className="truncate text-base font-black text-[#12304a]">
                {money(quote.price.total)} MXN
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#ff6600] px-4 py-3 text-xs font-black text-white"
            >
              Reservar
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className="h-20 lg:hidden" />
      </div>

      {/* =====================================================
          PRINT-ONLY VERSION
      ===================================================== */}

      <PrintQuoteOnePage
        quote={quote}
        config={config}
        travelerText={travelerText}
      />
    </>
  );
}

export default PublicQuote;
