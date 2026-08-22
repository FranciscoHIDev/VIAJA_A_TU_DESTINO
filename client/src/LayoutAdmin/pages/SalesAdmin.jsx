import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaEye,
  FaFilter,
  FaPlus,
  FaSearch,
  FaTimes,
  FaWallet,
  FaWhatsapp,
} from "react-icons/fa";

const INITIAL_SALES = [
  {
    _id: "sale-0018",
    saleNumber: "VTA-2026-0018",
    client: {
      _id: "client-maria",
      name: "María López",
      phone: "998 111 2233",
    },
    quoteNumber: "COT-2026-0042",
    destination: "Cancún",
    serviceType: "Vuelo + Hotel",
    total: 20700,
    paid: 500,
    balance: 20200,
    status: "Apartada",
    nextPaymentDate: "2026-08-30",
    createdAt: "2026-08-21T18:40:00",
    lastReceiptSlug: "rec-2026-0019-maria-lopez",
  },
  {
    _id: "sale-0017",
    saleNumber: "VTA-2026-0017",
    client: {
      _id: "client-juan",
      name: "Juan Pérez",
      phone: "998 222 3344",
    },
    quoteNumber: "COT-2026-0041",
    destination: "Huatulco",
    serviceType: "Hotel",
    total: 24900,
    paid: 24900,
    balance: 0,
    status: "Pagada",
    nextPaymentDate: "",
    createdAt: "2026-08-20T12:10:00",
    lastReceiptSlug: "rec-2026-0018-juan-perez",
  },
  {
    _id: "sale-0016",
    saleNumber: "VTA-2026-0016",
    client: {
      _id: "client-ana",
      name: "Ana García",
      phone: "998 444 5566",
    },
    quoteNumber: "COT-2026-0039",
    destination: "Isla Mujeres",
    serviceType: "Tour",
    total: 6800,
    paid: 3000,
    balance: 3800,
    status: "Abonando",
    nextPaymentDate: "2026-08-28",
    createdAt: "2026-08-19T09:15:00",
    lastReceiptSlug: "rec-2026-0017-ana-garcia",
  },
  {
    _id: "sale-0015",
    saleNumber: "VTA-2026-0015",
    client: {
      _id: "client-carlos",
      name: "Carlos Ruiz",
      phone: "998 333 4455",
    },
    quoteNumber: "COT-2026-0040",
    destination: "Riviera Maya",
    serviceType: "Vuelo + Hotel",
    total: 31500,
    paid: 18000,
    balance: 13500,
    status: "Abonando",
    nextPaymentDate: "2026-08-27",
    createdAt: "2026-08-18T16:45:00",
    lastReceiptSlug: "rec-2026-0016-carlos-ruiz",
  },
];

const STATUS_OPTIONS = ["Todos", "Apartada", "Abonando", "Pagada", "Cancelada"];

const STATUS_STYLE = {
  Apartada: "border-orange-200 bg-orange-50 text-[#ff6600]",
  Abonando: "border-blue-200 bg-blue-50 text-[#0260fe]",
  Pagada: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Cancelada: "border-red-200 bg-red-50 text-red-600",
};

const money = (value) =>
  Number(value || 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

const formatDate = (value) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
};

const normalizePhone = (phone = "") => {
  const digits = String(phone).replace(/\D/g, "");
  return digits.startsWith("52") ? digits : `52${digits}`;
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-lg border px-2.5 py-1 text-[10px] font-black ${
        STATUS_STYLE[status] || STATUS_STYLE.Apartada
      }`}
    >
      {status}
    </span>
  );
}

function MetricCard({ label, value, detail, icon, accent = "blue" }) {
  const accents = {
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
          <p className="mt-1 text-xs text-slate-400">{detail}</p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            accents[accent] || accents.blue
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ paid, total }) {
  const percent =
    total > 0
      ? Math.min(100, Math.round((Number(paid) / Number(total)) * 100))
      : 0;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[9px] font-bold text-slate-400">
        <span>{percent}% pagado</span>
        <span>{money(paid)}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[#0260fe]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function SalesAdmin() {
  const navigate = useNavigate();

  const [sales] = useState(INITIAL_SALES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const filteredSales = useMemo(() => {
    const term = search.trim().toLowerCase();

    return sales.filter((sale) => {
      const matchesSearch =
        !term ||
        sale.saleNumber.toLowerCase().includes(term) ||
        sale.quoteNumber.toLowerCase().includes(term) ||
        sale.client.name.toLowerCase().includes(term) ||
        sale.destination.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "Todos" || sale.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [sales, search, statusFilter]);

  const metrics = useMemo(() => {
    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const received = sales.reduce((sum, sale) => sum + sale.paid, 0);
    const pending = sales.reduce((sum, sale) => sum + sale.balance, 0);
    const paidSales = sales.filter((sale) => sale.status === "Pagada").length;

    return {
      count: sales.length,
      totalSales,
      received,
      pending,
      paidSales,
    };
  }, [sales]);

  const getWhatsappUrl = (sale) => {
    const text = [
      `Hola ${sale.client.name.split(" ")[0]},`,
      "",
      `Te comparto el estado de tu viaje a ${sale.destination}.`,
      `Venta: ${sale.saleNumber}`,
      `Total: ${money(sale.total)} MXN`,
      `Pagado: ${money(sale.paid)} MXN`,
      `Saldo: ${money(sale.balance)} MXN`,
      "",
      sale.lastReceiptSlug
        ? `${window.location.origin}/recibo/${sale.lastReceiptSlug}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    return `https://api.whatsapp.com/send?${new URLSearchParams({
      phone: normalizePhone(sale.client.phone),
      text,
    }).toString()}`;
  };

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0260fe]">
              Control comercial
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-[#12304a] sm:text-3xl">
              Ventas
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Controla apartados, abonos, liquidaciones y saldos pendientes de
              cada reservación.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/auth/cotizaciones")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-orange-600"
          >
            <FaPlus />
            Convertir cotización
          </button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Ventas"
          value={metrics.count}
          detail={`${metrics.paidSales} liquidadas`}
          icon={<FaCheckCircle />}
        />

        <MetricCard
          label="Vendido"
          value={money(metrics.totalSales)}
          detail="Valor total de ventas"
          icon={<FaDollarSign />}
          accent="orange"
        />

        <MetricCard
          label="Cobrado"
          value={money(metrics.received)}
          detail="Pagos recibidos"
          icon={<FaWallet />}
          accent="green"
        />

        <MetricCard
          label="Por cobrar"
          value={money(metrics.pending)}
          detail="Saldo pendiente"
          icon={<FaClock />}
          accent="slate"
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_210px_auto]">
          <label className="relative block">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-300" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar venta, cliente, cotización o destino..."
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

          {(search || statusFilter !== "Todos") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("Todos");
              }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-black text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              <FaTimes />
              Limpiar
            </button>
          )}
        </div>
      </section>

      <section className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                {[
                  "Venta / cliente",
                  "Viaje",
                  "Total",
                  "Pagado",
                  "Saldo",
                  "Estado",
                  "Acciones",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredSales.map((sale) => (
                <tr
                  key={sale._id}
                  className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="px-5 py-4">
                    <Link
                      to={`/auth/ventas/${sale._id}`}
                      className="text-sm font-black text-[#12304a] transition hover:text-[#0260fe]"
                    >
                      {sale.saleNumber}
                    </Link>
                    <p className="mt-1 text-xs font-bold text-slate-600">
                      {sale.client.name}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {sale.quoteNumber}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-black text-slate-700">
                      {sale.destination}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {sale.serviceType}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm font-black text-[#12304a]">
                    {money(sale.total)}
                  </td>

                  <td className="min-w-[190px] px-5 py-4">
                    <ProgressBar paid={sale.paid} total={sale.total} />
                  </td>

                  <td className="px-5 py-4">
                    <p
                      className={`text-sm font-black ${
                        sale.balance > 0 ? "text-[#ff6600]" : "text-emerald-600"
                      }`}
                    >
                      {money(sale.balance)}
                    </p>

                    {sale.nextPaymentDate ? (
                      <p className="mt-1 text-[9px] text-slate-400">
                        Próximo: {formatDate(sale.nextPaymentDate)}
                      </p>
                    ) : null}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={sale.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/auth/ventas/${sale._id}`}
                        title="Abrir venta"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0260fe]"
                      >
                        <FaEye />
                      </Link>

                      <a
                        href={getWhatsappUrl(sale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-green-200 hover:bg-green-50 hover:text-[#25D366]"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-3 lg:hidden">
        {filteredSales.map((sale) => {
          const percent =
            sale.total > 0
              ? Math.min(100, Math.round((sale.paid / sale.total) * 100))
              : 0;

          return (
            <article
              key={sale._id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <StatusBadge status={sale.status} />

                  <p className="mt-3 text-xs font-black text-[#0260fe]">
                    {sale.saleNumber}
                  </p>

                  <h2 className="mt-1 truncate text-lg font-black text-[#12304a]">
                    {sale.destination}
                  </h2>

                  <p className="mt-1 truncate text-sm font-bold text-slate-500">
                    {sale.client.name}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-lg font-black text-[#12304a]">
                    {money(sale.total)}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Total
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <ProgressBar paid={sale.paid} total={sale.total} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-emerald-50 p-3">
                  <p className="text-[9px] font-black uppercase text-emerald-600">
                    Pagado
                  </p>
                  <p className="mt-1 text-sm font-black text-emerald-700">
                    {money(sale.paid)}
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-3">
                  <p className="text-[9px] font-black uppercase text-[#ff6600]">
                    Saldo
                  </p>
                  <p className="mt-1 text-sm font-black text-[#ff6600]">
                    {money(sale.balance)}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  to={`/auth/ventas/${sale._id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#12304a] px-4 py-3 text-xs font-black text-white"
                >
                  <FaEye />
                  Abrir
                </Link>

                <a
                  href={getWhatsappUrl(sale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-xs font-black text-[#25D366]"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default SalesAdmin;
