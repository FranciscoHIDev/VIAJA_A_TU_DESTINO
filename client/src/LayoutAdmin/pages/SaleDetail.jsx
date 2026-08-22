import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheck,
  FaClock,
  FaDollarSign,
  FaFileInvoiceDollar,
  FaPlus,
  FaTimes,
  FaWallet,
  FaWhatsapp,
} from "react-icons/fa";

const SALE_MOCK = {
  _id: "sale-0018",
  saleNumber: "VTA-2026-0018",
  quoteNumber: "COT-2026-0042",
  client: {
    _id: "client-maria",
    name: "María López",
    phone: "998 111 2233",
    email: "maria@email.com",
  },
  destination: "Cancún",
  serviceType: "Vuelo + Hotel",
  travelDates: "15 sep - 19 sep 2026",
  total: 20700,
  status: "Apartada",
  createdAt: "2026-08-21",
  payments: [
    {
      _id: "payment-0019",
      receiptNumber: "REC-2026-0019",
      receiptSlug: "rec-2026-0019-maria-lopez",
      type: "Apartado",
      amount: 500,
      method: "Transferencia",
      reference: "SPEI 92837462",
      date: "2026-08-21",
      time: "21:45",
    },
  ],
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

function SaleDetail() {
  const { id } = useParams();

  const [sale, setSale] = useState(SALE_MOCK);
  const [showPayment, setShowPayment] = useState(false);

  const [payment, setPayment] = useState({
    type: "Abono",
    amount: "",
    method: "Transferencia",
    reference: "",
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    nextPaymentDate: "",
  });

  const paid = useMemo(
    () =>
      sale.payments.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [sale.payments],
  );

  const balance = Math.max(0, sale.total - paid);
  const progress =
    sale.total > 0 ? Math.min(100, Math.round((paid / sale.total) * 100)) : 0;

  const registerPayment = (event) => {
    event.preventDefault();

    const amount = Number(payment.amount || 0);

    if (!amount || amount <= 0) {
      alert("Ingresa un importe válido.");
      return;
    }

    if (amount > balance) {
      alert("El pago no puede ser mayor al saldo pendiente.");
      return;
    }

    const nextNumber = 20 + sale.payments.length;

    const newPayment = {
      _id: `payment-${Date.now()}`,
      receiptNumber: `REC-2026-00${nextNumber}`,
      receiptSlug: `rec-2026-00${nextNumber}-${sale.client.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
      type:
        amount === balance
          ? paid === 0
            ? "Pago total"
            : "Liquidación"
          : paid === 0
            ? "Apartado"
            : payment.type,
      amount,
      method: payment.method,
      reference: payment.reference,
      date: payment.date,
      time: payment.time,
    };

    setSale((current) => ({
      ...current,
      status:
        amount === balance ? "Pagada" : paid === 0 ? "Apartada" : "Abonando",
      payments: [...current.payments, newPayment],
    }));

    setPayment({
      type: "Abono",
      amount: "",
      method: "Transferencia",
      reference: "",
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
      nextPaymentDate: "",
    });

    setShowPayment(false);
  };

  const whatsappText = [
    `Hola ${sale.client.name.split(" ")[0]},`,
    "",
    `Te comparto el estado de tu reservación ${sale.saleNumber}.`,
    `Destino: ${sale.destination}`,
    `Total: ${money(sale.total)} MXN`,
    `Pagado: ${money(paid)} MXN`,
    `Saldo pendiente: ${money(balance)} MXN`,
  ].join("\n");

  const whatsappUrl = `https://api.whatsapp.com/send?${new URLSearchParams({
    phone: normalizePhone(sale.client.phone),
    text: whatsappText,
  }).toString()}`;

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <Link
              to="/auth/ventas"
              className="inline-flex items-center gap-2 text-xs font-black text-slate-400 transition hover:text-[#0260fe]"
            >
              <FaArrowLeft />
              Volver a ventas
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-black text-[#0260fe]">
                {sale.saleNumber}
              </span>

              <span
                className={`rounded-lg px-2.5 py-1 text-[10px] font-black ${
                  balance === 0
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-orange-50 text-[#ff6600]"
                }`}
              >
                {balance === 0 ? "Pagada" : sale.status}
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-black text-[#12304a] sm:text-3xl">
              {sale.destination}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {sale.client.name} · {sale.serviceType} · {sale.travelDates}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-black text-[#25D366]"
            >
              <FaWhatsapp />
              WhatsApp
            </a>

            {balance > 0 ? (
              <button
                type="button"
                onClick={() => setShowPayment(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-4 py-3 text-sm font-black text-white"
              >
                <FaPlus />
                Registrar pago
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total del viaje",
            value: money(sale.total),
            icon: <FaDollarSign />,
            className: "bg-blue-50 text-[#0260fe]",
          },
          {
            label: "Total pagado",
            value: money(paid),
            icon: <FaWallet />,
            className: "bg-emerald-50 text-emerald-600",
          },
          {
            label: "Saldo pendiente",
            value: money(balance),
            icon: <FaClock />,
            className:
              balance > 0
                ? "bg-orange-50 text-[#ff6600]"
                : "bg-emerald-50 text-emerald-600",
          },
          {
            label: "Pagos registrados",
            value: sale.payments.length,
            icon: <FaFileInvoiceDollar />,
            className: "bg-slate-100 text-slate-600",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {card.label}
                </p>
                <p className="mt-2 text-xl font-black text-[#12304a]">
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.className}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-[#0260fe]">
              Avance de pago
            </p>
            <p className="mt-1 text-2xl font-black text-[#12304a]">
              {progress}%
            </p>
          </div>

          <p className="text-right text-xs font-bold text-slate-400">
            {money(paid)} de {money(sale.total)}
          </p>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${
              progress === 100 ? "bg-emerald-500" : "bg-[#0260fe]"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-wider text-[#0260fe]">
              Movimientos
            </p>
            <h2 className="mt-1 text-xl font-black text-[#12304a]">
              Historial de pagos
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {sale.payments.map((item) => (
              <div
                key={item._id}
                className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FaCheck />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-[#12304a]">{item.type}</p>
                      <span className="text-[10px] font-bold text-slate-400">
                        {item.receiptNumber}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(item.date)} · {item.time} · {item.method}
                    </p>

                    {item.reference ? (
                      <p className="mt-1 text-[10px] text-slate-400">
                        Ref. {item.reference}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
                  <p className="text-lg font-black text-emerald-600">
                    +{money(item.amount)}
                  </p>

                  <a
                    href={`/recibo/${item.receiptSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex text-[10px] font-black uppercase tracking-wider text-[#0260fe]"
                  >
                    Ver recibo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-wider text-[#0260fe]">
              Expediente
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400">
                  Cliente
                </p>
                <Link
                  to={`/auth/crm/${sale.client._id}`}
                  className="mt-1 block text-sm font-black text-[#12304a] hover:text-[#0260fe]"
                >
                  {sale.client.name}
                </Link>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase text-slate-400">
                  Cotización
                </p>
                <p className="mt-1 text-sm font-black text-[#12304a]">
                  {sale.quoteNumber}
                </p>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase text-slate-400">
                  Servicio
                </p>
                <p className="mt-1 text-sm font-black text-[#12304a]">
                  {sale.serviceType}
                </p>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase text-slate-400">
                  Venta creada
                </p>
                <p className="mt-1 text-sm font-black text-[#12304a]">
                  {formatDate(sale.createdAt)}
                </p>
              </div>
            </div>
          </section>

          {balance > 0 ? (
            <section className="rounded-3xl border border-orange-200 bg-orange-50 p-5">
              <p className="text-[10px] font-black uppercase tracking-wider text-[#ff6600]">
                Pendiente por cobrar
              </p>
              <p className="mt-2 text-3xl font-black text-[#12304a]">
                {money(balance)}
              </p>
              <button
                type="button"
                onClick={() => setShowPayment(true)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-4 py-3 text-sm font-black text-white"
              >
                <FaPlus />
                Registrar pago
              </button>
            </section>
          ) : (
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
              <FaCheck className="text-2xl text-emerald-600" />
              <p className="mt-3 text-lg font-black text-emerald-800">
                Venta liquidada
              </p>
              <p className="mt-1 text-xs leading-5 text-emerald-700">
                El cliente ha cubierto el total de la reservación.
              </p>
            </section>
          )}
        </aside>
      </div>

      {showPayment ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <form
            onSubmit={registerPayment}
            className="w-full max-w-xl rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0260fe]">
                  Cobranza
                </p>
                <h2 className="mt-1 text-xl font-black text-[#12304a]">
                  Registrar pago
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Saldo actual: {money(balance)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPayment(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label>
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Tipo de movimiento
                </span>
                <select
                  value={payment.type}
                  onChange={(event) =>
                    setPayment((current) => ({
                      ...current,
                      type: event.target.value,
                    }))
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  <option>Apartado</option>
                  <option>Abono</option>
                  <option>Liquidación</option>
                  <option>Pago total</option>
                </select>
              </label>

              <label>
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Importe
                </span>
                <input
                  type="number"
                  min="1"
                  max={balance}
                  value={payment.amount}
                  onChange={(event) =>
                    setPayment((current) => ({
                      ...current,
                      amount: event.target.value,
                    }))
                  }
                  placeholder="0.00"
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-bold outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </label>

              <label>
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Método de pago
                </span>
                <select
                  value={payment.method}
                  onChange={(event) =>
                    setPayment((current) => ({
                      ...current,
                      method: event.target.value,
                    }))
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  <option>Transferencia</option>
                  <option>Tarjeta</option>
                  <option>Efectivo</option>
                  <option>Depósito</option>
                  <option>Link de pago</option>
                </select>
              </label>

              <label>
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Referencia
                </span>
                <input
                  value={payment.reference}
                  onChange={(event) =>
                    setPayment((current) => ({
                      ...current,
                      reference: event.target.value,
                    }))
                  }
                  placeholder="SPEI, autorización..."
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </label>

              <label>
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Fecha
                </span>
                <input
                  type="date"
                  value={payment.date}
                  onChange={(event) =>
                    setPayment((current) => ({
                      ...current,
                      date: event.target.value,
                    }))
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </label>

              <label>
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Hora
                </span>
                <input
                  type="time"
                  value={payment.time}
                  onChange={(event) =>
                    setPayment((current) => ({
                      ...current,
                      time: event.target.value,
                    }))
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowPayment(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-500"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded-xl bg-[#ff6600] px-5 py-3 text-sm font-black text-white"
              >
                Registrar y generar recibo
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default SaleDetail;
