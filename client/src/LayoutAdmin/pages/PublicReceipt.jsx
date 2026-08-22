import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaClock,
  FaCopy,
  FaEnvelope,
  FaPrint,
  FaShareAlt,
  FaShieldAlt,
  FaWhatsapp,
} from "react-icons/fa";

const LOGO =
  "https://res.cloudinary.com/duaysiozi/image/upload/v1785018355/i6jhddqaqz1ijctzrw42.webp";

const RECEIPT_MOCK = {
  receiptNumber: "REC-2026-0019",
  slug: "rec-2026-0019-maria-lopez",

  // Apartado | Abono | Liquidación | Pago total
  type: "Apartado",

  status: "Aplicado",

  client: {
    name: "María López",
  },

  sale: {
    saleNumber: "VTA-2026-0018",
    quoteNumber: "COT-2026-0042",
    destination: "Cancún",
    serviceType: "Vuelo + Hotel",
    travelDates: "15 al 19 de septiembre de 2026",
    total: 20700,
  },

  payment: {
    amount: 500,
    method: "Transferencia bancaria",
    reference: "SPEI 92837462",
    date: "2026-08-21",
    time: "21:45",
  },

  totals: {
    paidBefore: 0,
    paidWithThisPayment: 500,
    totalPaid: 500,
    balance: 20200,
  },

  nextPayment: {
    amount: 2000,
    date: "2026-08-30",
  },

  advisor: {
    name: "Isidoro Francisco",
    phone: "998 495 4637",
    email: "ventas@viajaatudestino.com",
  },

  note: "Este comprobante confirma la recepción del pago indicado y su aplicación a la reservación señalada. No constituye un CFDI ni comprobante fiscal.",
};

const TYPE_CONFIG = {
  Apartado: {
    title: "Comprobante de apartado",
    badge: "Reservación apartada",
    tone: "orange",
  },
  Abono: {
    title: "Comprobante de abono",
    badge: "Pago aplicado",
    tone: "blue",
  },
  Liquidación: {
    title: "Comprobante de liquidación",
    badge: "Pagado en su totalidad",
    tone: "green",
  },
  "Pago total": {
    title: "Comprobante de pago",
    badge: "Pagado en su totalidad",
    tone: "green",
  },
};

const money = (value) =>
  Number(value || 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

const formatDate = (value) =>
  new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));

const normalizePhone = (phone = "") => {
  const digits = String(phone).replace(/\D/g, "");
  return digits.startsWith("52") ? digits : `52${digits}`;
};

function PublicReceipt() {
  const { slug } = useParams();

  const receipt = RECEIPT_MOCK;
  const config = TYPE_CONFIG[receipt.type] || TYPE_CONFIG.Apartado;

  const isPaid = receipt.totals.balance <= 0;

  const toneClasses = {
    orange: {
      soft: "border-orange-200 bg-orange-50 text-[#ff6600]",
      badge: "bg-orange-50 text-[#ff6600]",
      panel: "from-[#ff7a1a] to-[#ff6600]",
    },
    blue: {
      soft: "border-blue-200 bg-blue-50 text-[#0260fe]",
      badge: "bg-blue-50 text-[#0260fe]",
      panel: "from-[#0260fe] to-[#12304a]",
    },
    green: {
      soft: "border-emerald-200 bg-emerald-50 text-emerald-700",
      badge: "bg-emerald-50 text-emerald-700",
      panel: "from-emerald-600 to-emerald-800",
    },
  };

  const tone = toneClasses[config.tone];

  const whatsappMessage = useMemo(
    () =>
      [
        `Hola ${receipt.client.name.split(" ")[0]},`,
        "",
        `Hemos registrado correctamente tu ${receipt.type.toLowerCase()}.`,
        `Comprobante: ${receipt.receiptNumber}`,
        `Pago recibido: ${money(receipt.payment.amount)} MXN`,
        `Total pagado: ${money(receipt.totals.totalPaid)} MXN`,
        `Saldo pendiente: ${money(receipt.totals.balance)} MXN`,
        "",
        "Gracias por viajar con Viaja a tu Destino.",
      ].join("\n"),
    [receipt],
  );

  const whatsappUrl = `https://api.whatsapp.com/send?${new URLSearchParams({
    phone: normalizePhone(receipt.advisor.phone),
    text: whatsappMessage,
  }).toString()}`;

  const shareReceipt = async () => {
    const data = {
      title: `${config.title} ${receipt.receiptNumber}`,
      text: `${receipt.payment.amount} MXN aplicados a ${receipt.sale.destination}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Enlace copiado.");
      }
    } catch {
      // compartir cancelado
    }
  };

  return (
    <>
      <style>{`
        .receipt-print {
          display: none;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden !important;
          }

          .receipt-screen {
            display: none !important;
          }

          .receipt-print,
          .receipt-print * {
            visibility: visible !important;
          }

          .receipt-print {
            display: block !important;
            position: absolute;
            inset: 0;
            width: 190mm;
            min-height: 270mm;
            max-height: 270mm;
            overflow: hidden;
            margin: 0 auto;
            font-family: Arial, Helvetica, sans-serif;
            color: #334155;
          }

          .rp-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 5mm;
            border-bottom: 1px solid #e2e8f0;
          }

          .rp-logo {
            width: 50mm;
            max-height: 14mm;
            object-fit: contain;
            object-position: left center;
          }

          .rp-number {
            text-align: right;
          }

          .rp-number span {
            display: block;
            font-size: 7pt;
            font-weight: 800;
            letter-spacing: 1pt;
            color: #94a3b8;
          }

          .rp-number strong {
            display: block;
            margin-top: 1mm;
            font-size: 11pt;
            color: #12304a;
          }

          .rp-hero {
            display: grid;
            grid-template-columns: 1fr 62mm;
            gap: 8mm;
            align-items: center;
            margin-top: 6mm;
            padding: 7mm;
            border-radius: 4mm;
            background: linear-gradient(135deg, #12304a 0%, #0260fe 100%);
            color: #fff;
          }

          .rp-hero h1 {
            margin: 0;
            font-size: 19pt;
            line-height: 1.1;
          }

          .rp-hero p {
            margin: 2mm 0 0;
            font-size: 8pt;
            color: #dbeafe;
          }

          .rp-amount {
            padding: 5mm;
            border-radius: 3mm;
            background: #fff;
            color: #12304a;
          }

          .rp-amount span {
            display: block;
            font-size: 6.8pt;
            font-weight: 900;
            color: #ff6600;
          }

          .rp-amount strong {
            display: block;
            margin-top: 2mm;
            font-size: 22pt;
            line-height: 1;
          }

          .rp-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 4mm;
            margin-top: 5mm;
          }

          .rp-card {
            padding: 4mm;
            border: 1px solid #e2e8f0;
            border-radius: 3mm;
          }

          .rp-card span,
          .rp-summary span {
            display: block;
            font-size: 6.5pt;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: .5pt;
            color: #94a3b8;
          }

          .rp-card strong {
            display: block;
            margin-top: 1.5mm;
            font-size: 9pt;
            color: #12304a;
          }

          .rp-section {
            margin-top: 5mm;
            padding: 5mm;
            border: 1px solid #e2e8f0;
            border-radius: 3mm;
          }

          .rp-section h2 {
            margin: 0 0 3mm;
            font-size: 10pt;
            color: #12304a;
          }

          .rp-row {
            display: grid;
            grid-template-columns: 48mm 1fr;
            gap: 5mm;
            padding: 2.3mm 0;
            border-top: 1px solid #f1f5f9;
          }

          .rp-row:first-child {
            border-top: 0;
          }

          .rp-row span {
            font-size: 7pt;
            color: #94a3b8;
          }

          .rp-row strong {
            font-size: 7.8pt;
            color: #334155;
          }

          .rp-summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3mm;
            margin-top: 5mm;
          }

          .rp-summary > div {
            padding: 4mm;
            border-radius: 3mm;
            background: #f8fafc;
          }

          .rp-summary strong {
            display: block;
            margin-top: 1.5mm;
            font-size: 11pt;
            color: #12304a;
          }

          .rp-summary .rp-balance {
            background: #fff7ed;
          }

          .rp-summary .rp-balance strong {
            color: #ff6600;
          }

          .rp-note {
            margin-top: 5mm;
            padding: 4mm;
            border-radius: 3mm;
            background: #f8fafc;
            font-size: 7pt;
            line-height: 1.5;
            color: #64748b;
          }

          .rp-signature {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12mm;
            margin-top: 11mm;
          }

          .rp-signature > div {
            padding-top: 3mm;
            border-top: 1px solid #cbd5e1;
            text-align: center;
            font-size: 7pt;
            color: #64748b;
          }

          .rp-footer {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            padding-top: 3mm;
            border-top: 1px solid #e2e8f0;
            font-size: 6.5pt;
            color: #94a3b8;
          }
        }
      `}</style>

      <div className="receipt-screen min-h-screen bg-[#f5f7fb] pb-24 text-slate-700 lg:pb-0">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
            <a href="/">
              <img
                src={LOGO}
                alt="Viaja a tu Destino"
                className="h-9 w-auto max-w-[180px] object-contain sm:h-11"
              />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 sm:flex"
              >
                <FaCopy />
              </button>

              <button
                type="button"
                onClick={shareReceipt}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-slate-600"
              >
                <FaShareAlt />
                Compartir
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[960px] px-4 py-6 sm:px-6 sm:py-8">
          <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#12304a] via-[#073d79] to-[#0260fe] p-5 text-white shadow-xl sm:p-7">
            <div className="grid gap-6 md:grid-cols-[1fr_300px] md:items-end">
              <div>
                <span className="inline-flex rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-blue-100">
                  {config.title}
                </span>

                <h1 className="mt-4 text-3xl font-black sm:text-4xl">
                  Pago recibido
                </h1>

                <p className="mt-2 text-sm leading-6 text-blue-100/80">
                  Hemos aplicado correctamente este movimiento a la reservación
                  de{" "}
                  <strong className="text-white">{receipt.client.name}</strong>.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold">
                    {receipt.receiptNumber}
                  </span>

                  <span className="rounded-lg bg-emerald-400/15 px-3 py-2 text-xs font-black text-emerald-200">
                    ✓ {receipt.status}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 text-[#12304a]">
                <p className="text-[9px] font-black uppercase tracking-wider text-[#ff6600]">
                  Importe recibido
                </p>
                <p className="mt-2 text-4xl font-black">
                  {money(receipt.payment.amount)}
                </p>
                <p className="mt-1 text-[10px] font-bold text-slate-400">MXN</p>

                <div
                  className={`mt-4 rounded-xl border px-3 py-2 text-xs font-black ${tone.soft}`}
                >
                  {config.badge}
                </div>
              </div>
            </div>
          </section>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-5">
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0260fe]">
                  Reservación
                </p>
                <h2 className="mt-1 text-xl font-black text-[#12304a]">
                  {receipt.sale.destination}
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Cliente", receipt.client.name],
                    ["Venta", receipt.sale.saleNumber],
                    ["Cotización", receipt.sale.quoteNumber],
                    ["Servicio", receipt.sale.serviceType],
                    ["Fechas", receipt.sale.travelDates],
                    ["Total del viaje", `${money(receipt.sale.total)} MXN`],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-slate-50 p-3.5">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-black text-[#12304a]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0260fe]">
                  Pago registrado
                </p>

                <div className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200">
                  {[
                    ["Tipo de movimiento", receipt.type],
                    ["Método de pago", receipt.payment.method],
                    ["Referencia", receipt.payment.reference],
                    [
                      "Fecha y hora",
                      `${formatDate(receipt.payment.date)} · ${receipt.payment.time}`,
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="grid gap-1 px-4 py-3.5 sm:grid-cols-[170px_1fr]"
                    >
                      <span className="text-xs font-bold text-slate-400">
                        {label}
                      </span>
                      <strong className="text-sm text-[#12304a]">
                        {value}
                      </strong>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0260fe]">
                  Estado de cuenta
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[9px] font-black uppercase text-slate-400">
                      Total viaje
                    </p>
                    <p className="mt-2 text-lg font-black text-[#12304a]">
                      {money(receipt.sale.total)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="text-[9px] font-black uppercase text-emerald-600">
                      Total pagado
                    </p>
                    <p className="mt-2 text-lg font-black text-emerald-700">
                      {money(receipt.totals.totalPaid)}
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl p-4 ${
                      isPaid ? "bg-emerald-50" : "bg-orange-50"
                    }`}
                  >
                    <p
                      className={`text-[9px] font-black uppercase ${
                        isPaid ? "text-emerald-600" : "text-[#ff6600]"
                      }`}
                    >
                      Saldo pendiente
                    </p>
                    <p
                      className={`mt-2 text-lg font-black ${
                        isPaid ? "text-emerald-700" : "text-[#ff6600]"
                      }`}
                    >
                      {money(receipt.totals.balance)}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              {!isPaid && receipt.nextPayment ? (
                <section className="rounded-3xl border border-orange-200 bg-orange-50 p-5">
                  <FaClock className="text-xl text-[#ff6600]" />
                  <p className="mt-3 text-[9px] font-black uppercase tracking-wider text-[#ff6600]">
                    Próximo pago sugerido
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#12304a]">
                    {money(receipt.nextPayment.amount)}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Antes del {formatDate(receipt.nextPayment.date)}
                  </p>
                </section>
              ) : (
                <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                  <FaCheck className="text-xl text-emerald-600" />
                  <p className="mt-3 text-lg font-black text-emerald-800">
                    Reservación liquidada
                  </p>
                  <p className="mt-1 text-xs text-emerald-700">
                    No existe saldo pendiente.
                  </p>
                </section>
              )}

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-[9px] font-black uppercase tracking-wider text-[#0260fe]">
                  Tu asesor
                </p>
                <p className="mt-2 font-black text-[#12304a]">
                  {receipt.advisor.name}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Viaja a tu Destino
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-xs font-black text-[#25D366]"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>

                <a
                  href={`mailto:${receipt.advisor.email}`}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs font-black text-slate-600"
                >
                  <FaEnvelope className="text-[#0260fe]" />
                  Correo
                </a>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                  <FaShieldAlt className="mt-0.5 shrink-0 text-[#0260fe]" />
                  <p className="text-xs leading-5 text-slate-500">
                    {receipt.note}
                  </p>
                </div>
              </section>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-500"
              >
                <FaPrint />
                Imprimir / Guardar PDF
              </button>
            </aside>
          </div>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-black uppercase tracking-wider text-emerald-600">
                Pago registrado
              </p>
              <p className="truncate text-base font-black text-[#12304a]">
                {money(receipt.payment.amount)} MXN
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0260fe] px-4 py-3 text-xs font-black text-white"
            >
              Contactar
              <FaArrowRight />
            </a>
          </div>
        </div>
      </div>

      <section className="receipt-print">
        <div className="rp-header">
          <img className="rp-logo" src={LOGO} alt="Viaja a tu Destino" />

          <div className="rp-number">
            <span>{config.title.toUpperCase()}</span>
            <strong>{receipt.receiptNumber}</strong>
          </div>
        </div>

        <div className="rp-hero">
          <div>
            <h1>{config.title}</h1>
            <p>
              Pago aplicado a la reservación de{" "}
              <strong>{receipt.client.name}</strong>
            </p>
          </div>

          <div className="rp-amount">
            <span>IMPORTE RECIBIDO</span>
            <strong>{money(receipt.payment.amount)}</strong>
          </div>
        </div>

        <div className="rp-grid">
          <div className="rp-card">
            <span>Cliente</span>
            <strong>{receipt.client.name}</strong>
          </div>
          <div className="rp-card">
            <span>Destino</span>
            <strong>{receipt.sale.destination}</strong>
          </div>
          <div className="rp-card">
            <span>Venta</span>
            <strong>{receipt.sale.saleNumber}</strong>
          </div>
          <div className="rp-card">
            <span>Cotización</span>
            <strong>{receipt.sale.quoteNumber}</strong>
          </div>
        </div>

        <div className="rp-section">
          <h2>Detalle del movimiento</h2>

          {[
            ["Tipo", receipt.type],
            ["Servicio", receipt.sale.serviceType],
            ["Fechas de viaje", receipt.sale.travelDates],
            ["Método de pago", receipt.payment.method],
            ["Referencia", receipt.payment.reference],
            [
              "Fecha y hora",
              `${formatDate(receipt.payment.date)} · ${receipt.payment.time}`,
            ],
          ].map(([label, value]) => (
            <div className="rp-row" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="rp-summary">
          <div>
            <span>Total del viaje</span>
            <strong>{money(receipt.sale.total)}</strong>
          </div>

          <div>
            <span>Total pagado</span>
            <strong>{money(receipt.totals.totalPaid)}</strong>
          </div>

          <div className="rp-balance">
            <span>Saldo pendiente</span>
            <strong>{money(receipt.totals.balance)}</strong>
          </div>
        </div>

        {!isPaid && receipt.nextPayment ? (
          <div className="rp-section">
            <h2>Próximo pago</h2>
            <div className="rp-row">
              <span>Importe sugerido</span>
              <strong>{money(receipt.nextPayment.amount)}</strong>
            </div>
            <div className="rp-row">
              <span>Fecha recomendada</span>
              <strong>{formatDate(receipt.nextPayment.date)}</strong>
            </div>
          </div>
        ) : null}

        <div className="rp-note">{receipt.note}</div>

        <div className="rp-signature">
          <div>
            <strong>{receipt.advisor.name}</strong>
            <br />
            Asesor de viajes
          </div>
          <div>
            <strong>Viaja a tu Destino</strong>
            <br />
            Comprobante emitido digitalmente
          </div>
        </div>

        <div className="rp-footer">
          <span>Viaja a tu Destino</span>
          <span>
            {receipt.advisor.phone} · {receipt.advisor.email}
          </span>
          <span>{receipt.receiptNumber}</span>
        </div>
      </section>
    </>
  );
}

export default PublicReceipt;
