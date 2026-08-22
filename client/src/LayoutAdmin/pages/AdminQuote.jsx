import React, { useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaUserTie,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaHotel,
  FaUsers,
  FaUtensils,
  FaCheck,
  FaPlus,
  FaTrash,
  FaDollarSign,
  FaPercentage,
  FaFilePdf,
  FaSave,
  FaWhatsapp,
  FaClock,
  FaCreditCard,
  FaPlane,
  FaShuttleVan,
  FaShieldAlt,
  FaTicketAlt,
  FaCar,
  FaArrowRight,
  FaImage,
  FaUpload,
  FaChevronDown,
} from "react-icons/fa";

const DEFAULT_LOGO =
  "https://res.cloudinary.com/duaysiozi/image/upload/v1785018355/i6jhddqaqz1ijctzrw42.webp";

const SERVICE_TYPES = [
  { id: "Hotel", label: "Hotel", icon: <FaHotel /> },
  { id: "Paquete", label: "Vuelo + Hotel", icon: <FaPlane /> },
  { id: "Traslado", label: "Traslado", icon: <FaShuttleVan /> },
  { id: "Tour", label: "Tour", icon: <FaTicketAlt /> },
  { id: "Vuelo", label: "Vuelo", icon: <FaPlaneDeparture /> },
];

const SERVICE_COMMISSION_DEFAULTS = {
  Hotel: 15,
  Paquete: 0,
  Traslado: 0,
  Tour: 0,
  Vuelo: 0,
};

const SYMBOL = {
  plane: "\u2708",
  hotel: "\u2302",
  calendar: "\u25A0",
  people: "\u25CF",
  payment: "\u25C6",
  check: "\u2713",
  clock: "\u231A",
  phone: "\u260E",
  email: "\u2709",
  location: "\u25B8",
  price: "\u2605",
  include: "\u2726",
  bullet: "\u2022",
  arrow: "\u2192",
};

const clientMock = {
  id: 1,
  name: "María López",
  phone: "998 321 4567",
  email: "maria@email.com",
  departureCity: "CDMX",
};

const advisorMock = {
  name: "Isidoro Francisco",
  email: "ventas@viajaatudestino.com",
  phone: "998 495 4637",
};

const paymentOptionsDefault = [
  { id: "cash", label: "Pago de contado", selected: true },
  { id: "deposit500", label: "Aparta desde $500 por persona", selected: false },
  {
    id: "deposit1000",
    label: "Aparta desde $1,000 por persona",
    selected: false,
  },
  { id: "msi3", label: "3 MSI", selected: false },
  { id: "msi6", label: "6 MSI", selected: true },
  { id: "msi12", label: "12 MSI", selected: true },
];

const extrasDefault = [
  { id: "taxes", label: "Impuestos incluidos", selected: true },
  { id: "support", label: "Asistencia durante tu viaje", selected: false },
];

const money = (value) =>
  Number(value || 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

const formatDateMx = (value) => {
  if (!value) return "";

  const parts = String(value).split("-");

  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }

  return value;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0260fe] focus:ring-4 focus:ring-blue-50";

const labelClass = "mb-1.5 block text-xs font-bold text-slate-600";

function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function Section({ title, subtitle, icon, children, action }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0260fe]">
            {icon}
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-black text-[#12304a] sm:text-lg">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {action}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

function BrandLogo({ src, compact = false }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex items-center gap-2.5">
        <div
          className={`flex items-center justify-center rounded-xl bg-[#0260fe] font-black text-white ${
            compact ? "h-9 w-9 text-xs" : "h-11 w-11 text-sm"
          }`}
        >
          VTD
        </div>
        <div>
          <p
            className={`font-black leading-none text-[#12304a] ${
              compact ? "text-sm" : "text-base"
            }`}
          >
            Viaja a tu Destino
          </p>
          {!compact ? (
            <p className="mt-1 text-[10px] font-semibold text-slate-400">
              Cazamos las mejores ofertas para ti
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="Viaja a tu Destino"
      onError={() => setFailed(true)}
      className={
        compact
          ? "h-10 max-w-[180px] object-contain"
          : "h-12 max-w-[220px] object-contain"
      }
    />
  );
}

function MiniInfo({ label, value, strong = false }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p
        className={`mt-1 ${
          strong
            ? "text-lg font-black text-[#12304a]"
            : "text-sm font-bold text-slate-700"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function AdminQuoteModern() {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("client");

  const logoInputRef = useRef(null);

  const [client] = useState(clientMock);
  const [advisor, setAdvisor] = useState(advisorMock);
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO);
  const [logoName, setLogoName] = useState("Logo actual");

  const [commissionByService, setCommissionByService] = useState(
    SERVICE_COMMISSION_DEFAULTS,
  );

  const [paymentOptions, setPaymentOptions] = useState(paymentOptionsDefault);
  const [extras, setExtras] = useState(extrasDefault);
  const [customExtra, setCustomExtra] = useState("");

  const [quote, setQuote] = useState({
    quoteNumber: "COT-2026-0042",
    serviceType: "Paquete",

    destination: "Cancún",
    departureCity: client.departureCity,
    departureDate: "2026-09-15",
    returnDate: "2026-09-19",

    adults: 2,
    children: 1,
    childAges: "8",

    hotel: "Occidental Tucancún",
    room: "Habitación estándar",
    mealPlan: "Todo Incluido",
    nights: 4,

    supplierPrice: 20000,
    supplierCommissionPercent: SERVICE_COMMISSION_DEFAULTS.Paquete,
    desiredCommissionPercent: SERVICE_COMMISSION_DEFAULTS.Paquete,
    fixedFee: 0,

    deposit: 500,
    validUntil: "2026-08-21",
    validUntilTime: "18:00",

    notes:
      "Tarifa sujeta a disponibilidad y cambios sin previo aviso hasta confirmar la reservación.",
  });

  const [flight, setFlight] = useState({
    airline: "",
    fareType: "",
    baggage: "",
    outboundFlightNumber: "",
    outboundOrigin: client.departureCity,
    outboundDestination: "Cancún",
    outboundDate: "2026-09-15",
    outboundDepartureTime: "",
    outboundArrivalTime: "",
    returnFlightNumber: "",
    returnOrigin: "Cancún",
    returnDestination: client.departureCity,
    returnDate: "2026-09-19",
    returnDepartureTime: "",
    returnArrivalTime: "",
    notes: "",
  });

  const [transfer, setTransfer] = useState({
    provider: "",
    transferType: "Redondo",
    vehicle: "Compartido",
    pickupPoint: "Aeropuerto",
    dropoffPoint: "Hotel",
    arrivalDate: "2026-09-15",
    arrivalTime: "",
    returnDate: "2026-09-19",
    returnTime: "",
    notes: "",
  });

  const [tour, setTour] = useState({
    name: "",
    provider: "",
    date: "2026-09-16",
    time: "",
    duration: "",
    meetingPoint: "",
    includes: "",
    notes: "",
  });

  const isHotel = quote.serviceType === "Hotel";
  const isPackage = quote.serviceType === "Paquete";
  const isTransfer = quote.serviceType === "Traslado";
  const isTour = quote.serviceType === "Tour";
  const isFlight = quote.serviceType === "Vuelo";
  const showHotel = isHotel || isPackage;
  const showFlight = isFlight || isPackage;

  const serviceLabel =
    SERVICE_TYPES.find((item) => item.id === quote.serviceType)?.label ||
    quote.serviceType;

  const travelers = Number(quote.adults || 0) + Number(quote.children || 0);

  const calculations = useMemo(() => {
    const supplierPrice = Math.max(Number(quote.supplierPrice || 0), 0);
    const supplierCommission = Math.min(
      Math.max(Number(quote.supplierCommissionPercent || 0), 0),
      95,
    );
    const desiredCommission = Math.min(
      Math.max(Number(quote.desiredCommissionPercent || 0), 0),
      95,
    );
    const fixedFee = Math.max(Number(quote.fixedFee || 0), 0);

    const netCost = supplierPrice * (1 - supplierCommission / 100);
    const saleBeforeFee =
      desiredCommission < 100
        ? netCost / (1 - desiredCommission / 100)
        : netCost;

    const commissionAmount = saleBeforeFee - netCost;
    const finalPrice = saleBeforeFee + fixedFee;
    const totalProfit = commissionAmount + fixedFee;
    const originalCommission = supplierPrice - netCost;
    const pricePerPerson = travelers > 0 ? finalPrice / travelers : finalPrice;

    return {
      supplierPrice,
      netCost,
      originalCommission,
      commissionAmount,
      finalPrice,
      totalProfit,
      fixedFee,
      pricePerPerson,
      difference: finalPrice - supplierPrice,
    };
  }, [
    quote.supplierPrice,
    quote.supplierCommissionPercent,
    quote.desiredCommissionPercent,
    quote.fixedFee,
    travelers,
  ]);

  const selectedPayments = paymentOptions.filter((item) => item.selected);
  const selectedExtras = extras.filter((item) => item.selected);

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Selecciona un archivo de imagen.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert("El logotipo debe pesar menos de 4 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setLogoUrl(reader.result);
      setLogoName(file.name);
    };

    reader.readAsDataURL(file);
  };

  const handleServiceChange = (serviceId) => {
    const baseCommission = Number(commissionByService[serviceId] || 0);

    setQuote((prev) => ({
      ...prev,
      serviceType: serviceId,
      supplierCommissionPercent: baseCommission,
      desiredCommissionPercent: baseCommission,
    }));
  };

  const handleQuoteInput = (event) => {
    const { name, value } = event.target;

    if (name === "supplierCommissionPercent") {
      setCommissionByService((prev) => ({
        ...prev,
        [quote.serviceType]: Number(value || 0),
      }));

      setQuote((prev) => {
        const usingBase =
          Number(prev.desiredCommissionPercent || 0) ===
          Number(prev.supplierCommissionPercent || 0);

        return {
          ...prev,
          supplierCommissionPercent: value,
          desiredCommissionPercent: usingBase
            ? value
            : prev.desiredCommissionPercent,
        };
      });

      return;
    }

    setQuote((prev) => ({ ...prev, [name]: value }));

    if (name === "departureCity") {
      setFlight((prev) => ({
        ...prev,
        outboundOrigin: value,
        returnDestination: value,
      }));
    }

    if (name === "destination") {
      setFlight((prev) => ({
        ...prev,
        outboundDestination: value,
        returnOrigin: value,
      }));
    }

    if (name === "departureDate") {
      setFlight((prev) => ({ ...prev, outboundDate: value }));
      setTransfer((prev) => ({ ...prev, arrivalDate: value }));
    }

    if (name === "returnDate") {
      setFlight((prev) => ({ ...prev, returnDate: value }));
      setTransfer((prev) => ({ ...prev, returnDate: value }));
    }
  };

  const handleAdvisorInput = (event) => {
    const { name, value } = event.target;
    setAdvisor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFlightInput = (event) => {
    const { name, value } = event.target;
    setFlight((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransferInput = (event) => {
    const { name, value } = event.target;
    setTransfer((prev) => ({ ...prev, [name]: value }));
  };

  const handleTourInput = (event) => {
    const { name, value } = event.target;
    setTour((prev) => ({ ...prev, [name]: value }));
  };

  const togglePayment = (id) => {
    setPaymentOptions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const toggleExtra = (id) => {
    setExtras((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const addExtra = () => {
    const label = customExtra.trim();
    if (!label) return;

    setExtras((prev) => [
      ...prev,
      { id: `custom-${Date.now()}`, label, selected: true },
    ]);
    setCustomExtra("");
  };

  const removeExtra = (id) => {
    setExtras((prev) => prev.filter((item) => item.id !== id));
  };

  const normalizePhone = (phone = "") => {
    const digits = String(phone).replace(/\D/g, "");
    if (!digits) return "";
    return digits.startsWith("52") ? digits : `52${digits}`;
  };

  const getWhatsAppDetails = () => {
    if (isPackage) {
      return [
        quote.hotel ? `${SYMBOL.hotel} Hotel: ${quote.hotel}` : null,
        quote.room ? `  ${SYMBOL.bullet} Habitación: ${quote.room}` : null,
        quote.mealPlan ? `  ${SYMBOL.bullet} Plan: ${quote.mealPlan}` : null,
        quote.nights ? `  ${SYMBOL.bullet} Noches: ${quote.nights}` : null,
        flight.airline ? `${SYMBOL.plane} Aerolínea: ${flight.airline}` : null,
        flight.fareType
          ? `  ${SYMBOL.bullet} Tarifa: ${flight.fareType}`
          : null,
        flight.baggage
          ? `  ${SYMBOL.bullet} Equipaje: ${flight.baggage}`
          : null,
        `${SYMBOL.calendar} Fechas: ${formatDateMx(
          quote.departureDate,
        )} al ${formatDateMx(quote.returnDate)}`,
      ];
    }

    if (isHotel) {
      return [
        quote.hotel ? `${SYMBOL.hotel} Hotel: ${quote.hotel}` : null,
        quote.room ? `  ${SYMBOL.bullet} Habitación: ${quote.room}` : null,
        quote.mealPlan ? `  ${SYMBOL.bullet} Plan: ${quote.mealPlan}` : null,
        quote.nights ? `  ${SYMBOL.bullet} Noches: ${quote.nights}` : null,
        `${SYMBOL.calendar} Fechas: ${formatDateMx(
          quote.departureDate,
        )} al ${formatDateMx(quote.returnDate)}`,
      ];
    }

    if (isFlight) {
      return [
        flight.airline ? `${SYMBOL.plane} Aerolínea: ${flight.airline}` : null,
        flight.fareType
          ? `  ${SYMBOL.bullet} Tarifa: ${flight.fareType}`
          : null,
        flight.baggage
          ? `  ${SYMBOL.bullet} Equipaje: ${flight.baggage}`
          : null,
        "",
        `IDA`,
        `${flight.outboundOrigin || "Origen"} ${SYMBOL.arrow} ${
          flight.outboundDestination || "Destino"
        }`,
        flight.outboundDate
          ? `${SYMBOL.calendar} ${formatDateMx(flight.outboundDate)}${
              flight.outboundDepartureTime
                ? ` · ${flight.outboundDepartureTime}`
                : ""
            }`
          : null,
        flight.outboundFlightNumber
          ? `${SYMBOL.bullet} Vuelo ${flight.outboundFlightNumber}`
          : null,
        "",
        `REGRESO`,
        `${flight.returnOrigin || "Origen"} ${SYMBOL.arrow} ${
          flight.returnDestination || "Destino"
        }`,
        flight.returnDate
          ? `${SYMBOL.calendar} ${formatDateMx(flight.returnDate)}${
              flight.returnDepartureTime
                ? ` · ${flight.returnDepartureTime}`
                : ""
            }`
          : null,
        flight.returnFlightNumber
          ? `${SYMBOL.bullet} Vuelo ${flight.returnFlightNumber}`
          : null,
      ];
    }

    if (isTransfer) {
      return [
        `Tipo: ${transfer.transferType}`,
        `${SYMBOL.bullet} Modalidad: ${transfer.vehicle}`,
        transfer.provider
          ? `${SYMBOL.bullet} Proveedor: ${transfer.provider}`
          : null,
        transfer.pickupPoint
          ? `${SYMBOL.location} Recogida: ${transfer.pickupPoint}`
          : null,
        transfer.dropoffPoint
          ? `${SYMBOL.location} Destino: ${transfer.dropoffPoint}`
          : null,
        transfer.arrivalDate
          ? `${SYMBOL.calendar} ${formatDateMx(transfer.arrivalDate)}${
              transfer.arrivalTime ? ` · ${transfer.arrivalTime}` : ""
            }`
          : null,
        transfer.transferType === "Redondo" && transfer.returnDate
          ? `Regreso: ${formatDateMx(transfer.returnDate)}${
              transfer.returnTime ? ` · ${transfer.returnTime}` : ""
            }`
          : null,
      ];
    }

    if (isTour) {
      return [
        tour.name ? `${SYMBOL.include} ${tour.name}` : null,
        tour.provider ? `${SYMBOL.bullet} Proveedor: ${tour.provider}` : null,
        tour.date
          ? `${SYMBOL.calendar} ${formatDateMx(tour.date)}${
              tour.time ? ` · ${tour.time}` : ""
            }`
          : null,
        tour.duration ? `${SYMBOL.bullet} Duración: ${tour.duration}` : null,
        tour.meetingPoint
          ? `${SYMBOL.location} Punto de encuentro: ${tour.meetingPoint}`
          : null,
      ];
    }

    return [];
  };

  const quotePdfUrl = "";

  const travelerText = `${quote.adults} adulto${
    Number(quote.adults) !== 1 ? "s" : ""
  }${
    Number(quote.children) > 0
      ? ` + ${quote.children} menor${Number(quote.children) !== 1 ? "es" : ""}`
      : ""
  }`;

  const whatsappMessage = [
    "*VIAJA A TU DESTINO*",
    `Cotización *${quote.quoteNumber}*`,
    "",
    `Hola ${client.name.split(" ")[0]},`,
    "",
    `Soy ${advisor.name}, tu asesor de Viaja a tu Destino. Preparé esta propuesta para tu próximo viaje.`,
    "",
    `*DETALLES DEL VIAJE*`,
    `${SYMBOL.location} Destino: ${quote.destination || "Por definir"}`,
    `${SYMBOL.bullet} Servicio: ${serviceLabel}`,
    ...getWhatsAppDetails(),
    `${SYMBOL.people} Viajeros: ${travelerText}`,
    "",
    `${SYMBOL.price} *PRECIO ESPECIAL*`,
    `*${money(calculations.finalPrice)} MXN*`,
    travelers > 0
      ? `Desde ${money(calculations.pricePerPerson)} MXN por persona`
      : null,
    "",
    selectedPayments.length > 0 ? `*FORMAS DE PAGO*` : null,
    ...selectedPayments.map((option) => `${SYMBOL.check} ${option.label}`),
    "",
    selectedExtras.length > 0 ? `*TU VIAJE INCLUYE*` : null,
    ...selectedExtras.map((option) => `${SYMBOL.check} ${option.label}`),
    "",
    quote.validUntil ? `*VIGENCIA DE LA TARIFA*` : null,
    quote.validUntil
      ? `${SYMBOL.clock} Hasta el ${formatDateMx(quote.validUntil)}${
          quote.validUntilTime ? ` a las ${quote.validUntilTime}` : ""
        }`
      : null,
    "",
    `${SYMBOL.phone} *ATENCIÓN PERSONALIZADA*`,
    `${advisor.name}`,
    advisor.phone ? `WhatsApp: ${advisor.phone}` : null,
    advisor.email ? `${SYMBOL.email} ${advisor.email}` : null,
    "",
    "¿Te gustaría reservar esta opción?",
    "Respóndeme por este mismo medio y con gusto te ayudo a confirmar disponibilidad.",
    "",
    "_Tarifa sujeta a disponibilidad y cambios hasta confirmar la reservación._",
  ]
    .filter((line) => line !== null && line !== undefined)
    .join("\n");

  const whatsappParams = new URLSearchParams({
    phone: normalizePhone(client.phone),
    text: whatsappMessage,
  });

  const whatsappUrl = `https://api.whatsapp.com/send?${whatsappParams.toString()}`;

  const handleSaveDraft = () => {
    console.log("Guardar borrador", {
      client,
      advisor,
      quote,
      flight: showFlight ? flight : null,
      transfer: isTransfer ? transfer : null,
      tour: isTour ? tour : null,
      calculations,
      extras: selectedExtras,
      paymentOptions: selectedPayments,
      logoUrl,
    });
  };

  const handleGeneratePdf = () => {
    console.log("PDF pendiente de conectar");
  };

  return (
    <div className="space-y-5 text-slate-700">
      {/* =====================================================
          ENCABEZADO DEL COTIZADOR
          LayoutAdmin ya proporciona Header + Sidebar.
      ===================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <Link
              to={clientId ? `/auth/crm/${clientId}` : "/auth/crm"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0260fe]"
              title="Volver al CRM"
            >
              <FaArrowLeft />
            </Link>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-[#12304a] sm:text-2xl">
                  Nueva cotización
                </h1>

                <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-black text-[#0260fe]">
                  {quote.quoteNumber}
                </span>

                <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-600">
                  Borrador
                </span>
              </div>

              <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
                {clientId
                  ? `Propuesta para ${client.name} · Cliente CRM #${clientId}`
                  : "Crea una propuesta comercial personalizada."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0260fe] sm:text-sm"
            >
              <FaSave />
              <span className="hidden sm:inline">Guardar</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-green-600 sm:text-sm"
            >
              <FaWhatsapp />
              <span className="hidden sm:inline">Compartir</span>
            </a>

            <button
              type="button"
              onClick={handleGeneratePdf}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0260fe] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 sm:text-sm"
            >
              <FaFilePdf />
              <span className="hidden sm:inline">Generar PDF</span>
            </button>
          </div>
        </div>

        {/* Selector de servicio */}
        <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="hidden shrink-0 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 md:block">
              Servicio
            </span>

            <div className="inline-flex min-w-max items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
              {SERVICE_TYPES.map((service) => {
                const active = quote.serviceType === service.id;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceChange(service.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition sm:px-3.5 sm:text-sm ${
                      active
                        ? "bg-[#0260fe] text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-[#12304a]"
                    }`}
                  >
                    <span className="text-xs">{service.icon}</span>
                    {service.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        {/* FORM */}
        <div className="space-y-5">
          {/* CUSTOMER + BRAND */}
          <div className="grid gap-5 lg:grid-cols-2">
            <Section
              title="Cliente"
              subtitle="Datos cargados desde el CRM"
              icon={<FaUser />}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <MiniInfo label="Nombre" value={client.name} />
                <MiniInfo label="WhatsApp" value={client.phone} />
                <MiniInfo label="Correo" value={client.email} />
                <MiniInfo
                  label="Registro CRM"
                  value={`#${clientId || client.id}`}
                />
              </div>
            </Section>

            <Section
              title="Marca y asesor"
              subtitle="Información visible para el cliente"
              icon={<FaUserTie />}
            >
              <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-3">
                <BrandLogo src={logoUrl} compact />

                <div className="text-right">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#0260fe] transition hover:border-blue-300"
                  >
                    <FaUpload />
                    Cargar logo
                  </button>

                  <p className="mt-1 max-w-[140px] truncate text-[10px] text-slate-400">
                    {logoName}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Field label="Asesor">
                  <input
                    name="name"
                    value={advisor.name}
                    onChange={handleAdvisorInput}
                    className={inputClass}
                  />
                </Field>
                <Field label="Correo">
                  <input
                    type="email"
                    name="email"
                    value={advisor.email}
                    onChange={handleAdvisorInput}
                    className={inputClass}
                  />
                </Field>
                <Field label="WhatsApp">
                  <input
                    name="phone"
                    value={advisor.phone}
                    onChange={handleAdvisorInput}
                    className={inputClass}
                  />
                </Field>
              </div>
            </Section>
          </div>

          {/* GENERAL */}
          <Section
            title="Datos del viaje"
            subtitle={`${serviceLabel} · información principal`}
            icon={<FaMapMarkerAlt />}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Destino" className="lg:col-span-2">
                <input
                  name="destination"
                  value={quote.destination}
                  onChange={handleQuoteInput}
                  className={inputClass}
                />
              </Field>

              {(showFlight || isTransfer) && (
                <Field label="Origen">
                  <input
                    name="departureCity"
                    value={quote.departureCity}
                    onChange={handleQuoteInput}
                    className={inputClass}
                  />
                </Field>
              )}

              {!isTour && (
                <>
                  <Field label="Salida">
                    <input
                      type="date"
                      name="departureDate"
                      value={quote.departureDate}
                      onChange={handleQuoteInput}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Regreso">
                    <input
                      type="date"
                      name="returnDate"
                      value={quote.returnDate}
                      onChange={handleQuoteInput}
                      className={inputClass}
                    />
                  </Field>
                </>
              )}

              <Field label="Adultos">
                <input
                  type="number"
                  min="1"
                  name="adults"
                  value={quote.adults}
                  onChange={handleQuoteInput}
                  className={inputClass}
                />
              </Field>

              <Field label="Menores">
                <input
                  type="number"
                  min="0"
                  name="children"
                  value={quote.children}
                  onChange={handleQuoteInput}
                  className={inputClass}
                />
              </Field>

              {Number(quote.children) > 0 && (
                <Field label="Edades menores">
                  <input
                    name="childAges"
                    value={quote.childAges}
                    onChange={handleQuoteInput}
                    placeholder="8, 12"
                    className={inputClass}
                  />
                </Field>
              )}
            </div>
          </Section>

          {/* HOTEL */}
          {showHotel && (
            <Section
              title="Hospedaje"
              subtitle={
                isPackage ? "Hotel incluido en el paquete" : "Datos del hotel"
              }
              icon={<FaHotel />}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Hotel" className="lg:col-span-2">
                  <input
                    name="hotel"
                    value={quote.hotel}
                    onChange={handleQuoteInput}
                    className={inputClass}
                  />
                </Field>

                <Field label="Habitación">
                  <input
                    name="room"
                    value={quote.room}
                    onChange={handleQuoteInput}
                    className={inputClass}
                  />
                </Field>

                <Field label="Plan">
                  <input
                    name="mealPlan"
                    value={quote.mealPlan}
                    onChange={handleQuoteInput}
                    className={inputClass}
                  />
                </Field>

                <Field label="Noches">
                  <input
                    type="number"
                    min="1"
                    name="nights"
                    value={quote.nights}
                    onChange={handleQuoteInput}
                    className={inputClass}
                  />
                </Field>
              </div>
            </Section>
          )}

          {/* FLIGHT */}
          {showFlight && (
            <Section
              title="Vuelos"
              subtitle={
                isPackage ? "Aéreo incluido en el paquete" : "Itinerario aéreo"
              }
              icon={<FaPlane />}
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Aerolínea">
                  <input
                    name="airline"
                    value={flight.airline}
                    onChange={handleFlightInput}
                    placeholder="Viva"
                    className={inputClass}
                  />
                </Field>
                <Field label="Tarifa">
                  <input
                    name="fareType"
                    value={flight.fareType}
                    onChange={handleFlightInput}
                    placeholder="Light"
                    className={inputClass}
                  />
                </Field>
                <Field label="Equipaje">
                  <input
                    name="baggage"
                    value={flight.baggage}
                    onChange={handleFlightInput}
                    placeholder="Artículo personal + 10 kg"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaPlaneDeparture className="text-[#0260fe]" />
                      <p className="text-sm font-black text-[#12304a]">Ida</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Trayecto 1
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Vuelo">
                      <input
                        name="outboundFlightNumber"
                        value={flight.outboundFlightNumber}
                        onChange={handleFlightInput}
                        placeholder="VB 1012"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Fecha">
                      <input
                        type="date"
                        name="outboundDate"
                        value={flight.outboundDate}
                        onChange={handleFlightInput}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Origen">
                      <input
                        name="outboundOrigin"
                        value={flight.outboundOrigin}
                        onChange={handleFlightInput}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Destino">
                      <input
                        name="outboundDestination"
                        value={flight.outboundDestination}
                        onChange={handleFlightInput}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Sale">
                      <input
                        type="time"
                        name="outboundDepartureTime"
                        value={flight.outboundDepartureTime}
                        onChange={handleFlightInput}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Llega">
                      <input
                        type="time"
                        name="outboundArrivalTime"
                        value={flight.outboundArrivalTime}
                        onChange={handleFlightInput}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaPlaneArrival className="text-[#ff6600]" />
                      <p className="text-sm font-black text-[#12304a]">
                        Regreso
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Trayecto 2
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Vuelo">
                      <input
                        name="returnFlightNumber"
                        value={flight.returnFlightNumber}
                        onChange={handleFlightInput}
                        placeholder="VB 1013"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Fecha">
                      <input
                        type="date"
                        name="returnDate"
                        value={flight.returnDate}
                        onChange={handleFlightInput}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Origen">
                      <input
                        name="returnOrigin"
                        value={flight.returnOrigin}
                        onChange={handleFlightInput}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Destino">
                      <input
                        name="returnDestination"
                        value={flight.returnDestination}
                        onChange={handleFlightInput}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Sale">
                      <input
                        type="time"
                        name="returnDepartureTime"
                        value={flight.returnDepartureTime}
                        onChange={handleFlightInput}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Llega">
                      <input
                        type="time"
                        name="returnArrivalTime"
                        value={flight.returnArrivalTime}
                        onChange={handleFlightInput}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Field label="Notas del vuelo">
                  <textarea
                    name="notes"
                    value={flight.notes}
                    onChange={handleFlightInput}
                    rows={2}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </div>
            </Section>
          )}

          {/* TRANSFER */}
          {isTransfer && (
            <Section
              title="Traslado"
              subtitle="Datos operativos del servicio"
              icon={<FaShuttleVan />}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Proveedor">
                  <input
                    name="provider"
                    value={transfer.provider}
                    onChange={handleTransferInput}
                    className={inputClass}
                  />
                </Field>
                <Field label="Tipo">
                  <select
                    name="transferType"
                    value={transfer.transferType}
                    onChange={handleTransferInput}
                    className={inputClass}
                  >
                    <option>Redondo</option>
                    <option>Sencillo llegada</option>
                    <option>Sencillo salida</option>
                  </select>
                </Field>
                <Field label="Modalidad">
                  <select
                    name="vehicle"
                    value={transfer.vehicle}
                    onChange={handleTransferInput}
                    className={inputClass}
                  >
                    <option>Compartido</option>
                    <option>Privado</option>
                    <option>VIP</option>
                  </select>
                </Field>
                <Field label="Recogida">
                  <input
                    name="pickupPoint"
                    value={transfer.pickupPoint}
                    onChange={handleTransferInput}
                    className={inputClass}
                  />
                </Field>
                <Field label="Destino">
                  <input
                    name="dropoffPoint"
                    value={transfer.dropoffPoint}
                    onChange={handleTransferInput}
                    className={inputClass}
                  />
                </Field>
                <Field label="Fecha llegada">
                  <input
                    type="date"
                    name="arrivalDate"
                    value={transfer.arrivalDate}
                    onChange={handleTransferInput}
                    className={inputClass}
                  />
                </Field>
                <Field label="Hora llegada">
                  <input
                    type="time"
                    name="arrivalTime"
                    value={transfer.arrivalTime}
                    onChange={handleTransferInput}
                    className={inputClass}
                  />
                </Field>

                {transfer.transferType === "Redondo" && (
                  <>
                    <Field label="Fecha regreso">
                      <input
                        type="date"
                        name="returnDate"
                        value={transfer.returnDate}
                        onChange={handleTransferInput}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Hora regreso">
                      <input
                        type="time"
                        name="returnTime"
                        value={transfer.returnTime}
                        onChange={handleTransferInput}
                        className={inputClass}
                      />
                    </Field>
                  </>
                )}
              </div>
            </Section>
          )}

          {/* TOUR */}
          {isTour && (
            <Section
              title="Tour o actividad"
              subtitle="Detalles de la experiencia"
              icon={<FaTicketAlt />}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Tour" className="lg:col-span-2">
                  <input
                    name="name"
                    value={tour.name}
                    onChange={handleTourInput}
                    placeholder="Xcaret México Espectacular"
                    className={inputClass}
                  />
                </Field>
                <Field label="Proveedor">
                  <input
                    name="provider"
                    value={tour.provider}
                    onChange={handleTourInput}
                    className={inputClass}
                  />
                </Field>
                <Field label="Fecha">
                  <input
                    type="date"
                    name="date"
                    value={tour.date}
                    onChange={handleTourInput}
                    className={inputClass}
                  />
                </Field>
                <Field label="Hora">
                  <input
                    type="time"
                    name="time"
                    value={tour.time}
                    onChange={handleTourInput}
                    className={inputClass}
                  />
                </Field>
                <Field label="Duración">
                  <input
                    name="duration"
                    value={tour.duration}
                    onChange={handleTourInput}
                    placeholder="8 horas"
                    className={inputClass}
                  />
                </Field>
                <Field label="Punto de encuentro" className="lg:col-span-2">
                  <input
                    name="meetingPoint"
                    value={tour.meetingPoint}
                    onChange={handleTourInput}
                    className={inputClass}
                  />
                </Field>
                <Field label="Incluye" className="sm:col-span-2 lg:col-span-4">
                  <textarea
                    name="includes"
                    value={tour.includes}
                    onChange={handleTourInput}
                    rows={2}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </div>
            </Section>
          )}

          {/* COMMISSION - COMPACT */}
          <Section
            title="Precio y utilidad"
            subtitle="Información interna · no aparece en la cotización"
            icon={<FaDollarSign />}
            action={
              <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500">
                {serviceLabel}
              </span>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Precio proveedor">
                <div className="relative">
                  <FaDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                  <input
                    type="number"
                    min="0"
                    name="supplierPrice"
                    value={quote.supplierPrice}
                    onChange={handleQuoteInput}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </Field>

              <Field label={`Comisión ${serviceLabel}`}>
                <div className="relative">
                  <FaPercentage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                  <input
                    type="number"
                    min="0"
                    max="95"
                    step="0.1"
                    name="supplierCommissionPercent"
                    value={quote.supplierCommissionPercent}
                    onChange={handleQuoteInput}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </Field>

              <Field label="Comisión a aplicar">
                <div className="relative">
                  <FaPercentage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                  <input
                    type="number"
                    min="0"
                    max="95"
                    step="0.1"
                    name="desiredCommissionPercent"
                    value={quote.desiredCommissionPercent}
                    onChange={handleQuoteInput}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </Field>

              <Field label="Cargo fijo">
                <div className="relative">
                  <FaDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                  <input
                    type="number"
                    min="0"
                    name="fixedFee"
                    value={quote.fixedFee}
                    onChange={handleQuoteInput}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </Field>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3 rounded-xl bg-[#f8fafc] px-4 py-3">
              <MiniInfo
                label="Costo neto"
                value={money(calculations.netCost)}
              />
              <MiniInfo
                label="Comisión original"
                value={money(calculations.originalCommission)}
              />
              <MiniInfo
                label="Utilidad"
                value={money(calculations.totalProfit)}
              />
              <div className="ml-auto">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0260fe]">
                  Precio cliente
                </p>
                <p className="mt-1 text-xl font-black text-[#0260fe]">
                  {money(calculations.finalPrice)}
                </p>
              </div>
            </div>

            {Number(quote.supplierCommissionPercent || 0) === 0 ? (
              <p className="mt-3 text-xs font-semibold text-amber-600">
                Define la comisión del proveedor para {serviceLabel}.
              </p>
            ) : null}
          </Section>

          {/* EXTRAS + PAYMENTS */}
          <div className="grid gap-5 lg:grid-cols-2">
            <Section
              title="Incluye"
              subtitle="Beneficios adicionales"
              icon={<FaCheck />}
            >
              <div className="flex flex-wrap gap-2">
                {extras.map((item) => (
                  <div
                    key={item.id}
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold transition ${
                      item.selected
                        ? "border-blue-200 bg-blue-50 text-[#0260fe]"
                        : "border-slate-200 bg-white text-slate-500"
                    }`}
                  >
                    <button type="button" onClick={() => toggleExtra(item.id)}>
                      {item.selected ? "✓" : "+"} {item.label}
                    </button>

                    {item.id.startsWith("custom-") && (
                      <button
                        type="button"
                        onClick={() => removeExtra(item.id)}
                        className="text-red-400"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  value={customExtra}
                  onChange={(event) => setCustomExtra(event.target.value)}
                  placeholder="Agregar beneficio"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={addExtra}
                  className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl bg-[#12304a] text-white"
                >
                  <FaPlus />
                </button>
              </div>
            </Section>

            <Section
              title="Formas de pago"
              subtitle="Opciones visibles para el cliente"
              icon={<FaCreditCard />}
            >
              <div className="flex flex-wrap gap-2">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => togglePayment(option.id)}
                    className={`rounded-lg border px-3 py-2 text-xs font-bold transition ${
                      option.selected
                        ? "border-orange-200 bg-orange-50 text-[#ff6600]"
                        : "border-slate-200 bg-white text-slate-500"
                    }`}
                  >
                    {option.selected ? "✓ " : ""}
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 max-w-xs">
                <Field label="Anticipo sugerido">
                  <input
                    type="number"
                    min="0"
                    name="deposit"
                    value={quote.deposit}
                    onChange={handleQuoteInput}
                    className={inputClass}
                  />
                </Field>
              </div>
            </Section>
          </div>

          {/* VALIDITY */}
          <Section
            title="Vigencia y condiciones"
            subtitle="Información que aparecerá en el documento"
            icon={<FaClock />}
          >
            <div className="grid gap-4 sm:grid-cols-[180px_140px_1fr]">
              <Field label="Válida hasta">
                <input
                  type="date"
                  name="validUntil"
                  value={quote.validUntil}
                  onChange={handleQuoteInput}
                  className={inputClass}
                />
              </Field>
              <Field label="Hora">
                <input
                  type="time"
                  name="validUntilTime"
                  value={quote.validUntilTime}
                  onChange={handleQuoteInput}
                  className={inputClass}
                />
              </Field>
              <Field label="Condiciones">
                <textarea
                  name="notes"
                  value={quote.notes}
                  onChange={handleQuoteInput}
                  rows={2}
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>
          </Section>
        </div>

        {/* PREVIEW */}
        <aside className="xl:sticky xl:top-[84px] xl:self-start">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.08)]">
            {/* document toolbar */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-xs font-black text-[#12304a]">
                  Vista previa
                </p>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  Documento del cliente
                </p>
              </div>

              <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-black text-slate-500">
                {quote.quoteNumber}
              </span>
            </div>

            {/* document */}
            <div className="bg-white">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
                <BrandLogo src={logoUrl} />
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Cotización
                  </p>
                  <p className="mt-1 text-sm font-black text-[#12304a]">
                    {serviceLabel}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#12304a] to-[#0260fe] px-6 py-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                  {quote.destination || "Tu próximo destino"}
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {showHotel
                    ? quote.hotel || "Tu próxima experiencia"
                    : isTour
                      ? tour.name || "Tu próxima experiencia"
                      : "Tu próxima experiencia"}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-white/65">
                  Propuesta personalizada para {client.name}
                </p>
              </div>

              <div className="space-y-5 p-6">
                {/* traveler */}
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
                  <MiniInfo label="Cliente" value={client.name} />
                  <MiniInfo
                    label="Viajeros"
                    value={`${quote.adults} adulto${
                      Number(quote.adults) !== 1 ? "s" : ""
                    }${
                      Number(quote.children) > 0
                        ? ` + ${quote.children} menor${
                            Number(quote.children) !== 1 ? "es" : ""
                          }`
                        : ""
                    }`}
                  />
                </div>

                {/* hotel */}
                {showHotel && (
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-[#0260fe]">
                      <FaHotel />
                      <p className="text-xs font-black uppercase tracking-[0.12em]">
                        Hospedaje
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="font-black text-[#12304a]">
                        {quote.hotel || "Hotel por definir"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {quote.room} · {quote.mealPlan} · {quote.nights} noches
                      </p>
                      <p className="mt-2 text-xs font-semibold text-slate-500">
                        {quote.departureDate} → {quote.returnDate}
                      </p>
                    </div>
                  </div>
                )}

                {/* flights */}
                {showFlight && (
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-[#0260fe]">
                      <FaPlane />
                      <p className="text-xs font-black uppercase tracking-[0.12em]">
                        Vuelos
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200">
                      <div className="grid grid-cols-[72px_1fr] border-b border-slate-100 p-3">
                        <div>
                          <p className="text-[10px] font-black uppercase text-[#0260fe]">
                            Ida
                          </p>
                          <p className="mt-1 text-xs font-bold text-slate-500">
                            {flight.outboundDepartureTime || "--:--"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#12304a]">
                            {flight.outboundOrigin || "Origen"}{" "}
                            <FaArrowRight className="mx-1 inline text-[9px]" />{" "}
                            {flight.outboundDestination || "Destino"}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400">
                            {flight.outboundDate}
                            {flight.airline ? ` · ${flight.airline}` : ""}
                            {flight.outboundFlightNumber
                              ? ` · ${flight.outboundFlightNumber}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-[72px_1fr] p-3">
                        <div>
                          <p className="text-[10px] font-black uppercase text-[#ff6600]">
                            Regreso
                          </p>
                          <p className="mt-1 text-xs font-bold text-slate-500">
                            {flight.returnDepartureTime || "--:--"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#12304a]">
                            {flight.returnOrigin || "Origen"}{" "}
                            <FaArrowRight className="mx-1 inline text-[9px]" />{" "}
                            {flight.returnDestination || "Destino"}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400">
                            {flight.returnDate}
                            {flight.airline ? ` · ${flight.airline}` : ""}
                            {flight.returnFlightNumber
                              ? ` · ${flight.returnFlightNumber}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {flight.baggage ? (
                      <p className="mt-2 text-[11px] text-slate-400">
                        Equipaje: {flight.baggage}
                      </p>
                    ) : null}
                  </div>
                )}

                {/* transfer */}
                {isTransfer && (
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-[#0260fe]">
                      <FaCar />
                      <p className="text-xs font-black uppercase tracking-[0.12em]">
                        Traslado
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="font-black text-[#12304a]">
                        {transfer.pickupPoint}{" "}
                        <FaArrowRight className="mx-1 inline text-[9px]" />{" "}
                        {transfer.dropoffPoint}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {transfer.transferType} · {transfer.vehicle}
                      </p>
                    </div>
                  </div>
                )}

                {/* tour */}
                {isTour && (
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-[#0260fe]">
                      <FaTicketAlt />
                      <p className="text-xs font-black uppercase tracking-[0.12em]">
                        Experiencia
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="font-black text-[#12304a]">
                        {tour.name || "Tour por definir"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {tour.date}
                        {tour.time ? ` · ${tour.time}` : ""}
                        {tour.duration ? ` · ${tour.duration}` : ""}
                      </p>
                      {tour.includes ? (
                        <p className="mt-2 text-xs leading-relaxed text-slate-500">
                          {tour.includes}
                        </p>
                      ) : null}
                    </div>
                  </div>
                )}

                {/* extras */}
                {selectedExtras.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                      Incluye
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedExtras.map((item) => (
                        <span
                          key={item.id}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700"
                        >
                          <FaCheck className="text-[9px]" />
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* price */}
                <div className="rounded-2xl bg-[#0260fe] p-5 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100">
                    Total de tu viaje
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-3xl font-black">
                        {money(calculations.finalPrice)}
                      </p>
                      <p className="mt-1 text-[11px] text-white/65">MXN</p>
                    </div>
                    {travelers > 0 && (
                      <div className="text-right">
                        <p className="text-[10px] text-white/60">Por persona</p>
                        <p className="mt-1 text-base font-black">
                          {money(calculations.pricePerPerson)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* payments */}
                {selectedPayments.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                      Opciones de pago
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedPayments.map((option) => (
                        <span
                          key={option.id}
                          className="rounded-lg bg-orange-50 px-2.5 py-1.5 text-[11px] font-bold text-[#ff6600]"
                        >
                          {option.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* advisor */}
                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#0260fe]">
                      <FaUserTie />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Tu asesor
                      </p>
                      <p className="mt-0.5 text-sm font-black text-[#12304a]">
                        {advisor.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {advisor.phone} · {advisor.email}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] leading-relaxed text-slate-400">
                  Vigencia: {quote.validUntil}
                  {quote.validUntilTime
                    ? ` · ${quote.validUntilTime}`
                    : ""}. {quote.notes}
                </p>
              </div>
            </div>

            {/* internal footer */}
            <div className="border-t border-slate-100 bg-[#f8fafc] px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Utilidad estimada
                  </p>
                  <p className="mt-1 text-base font-black text-emerald-600">
                    {money(calculations.totalProfit)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Comisión aplicada
                  </p>
                  <p className="mt-1 text-sm font-black text-[#12304a]">
                    {quote.desiredCommissionPercent || 0}%
                  </p>
                </div>
              </div>
            </div>

            {/* mobile actions */}
            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 p-4 xl:hidden">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-sm font-bold text-white"
              >
                <FaWhatsapp />
                WhatsApp
              </a>
              <button
                type="button"
                onClick={handleGeneratePdf}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0260fe] px-3 py-3 text-sm font-bold text-white"
              >
                <FaFilePdf />
                Generar PDF
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-semibold text-slate-400">
            <FaShieldAlt />
            Costos y utilidad son visibles solo para administración
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AdminQuoteModern;
