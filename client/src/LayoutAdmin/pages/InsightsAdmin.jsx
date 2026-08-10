import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  FaUsers,
  FaEye,
  FaChartLine,
  FaSearch,
  FaMousePointer,
  FaSyncAlt,
  FaGlobe,
} from "react-icons/fa";

const EMPTY_DATA = {
  analytics: {
    totals: {
      activeUsers: 0,
      sessions: 0,
      screenPageViews: 0,
      engagementRate: 0,
    },
    daily: [],
    topPages: [],
  },

  searchConsole: {
    totals: {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
    },
    daily: [],
    queries: [],
  },

  updatedAt: null,
};

const RANGE_OPTIONS = [
  { label: "7 días", value: "7d" },
  { label: "28 días", value: "28d" },
  { label: "90 días", value: "90d" },
];

const numberFormatter = new Intl.NumberFormat("es-MX");

function formatNumber(value) {
  return numberFormatter.format(Number(value || 0));
}

function formatPercent(value) {
  return `${(Number(value || 0) * 100).toFixed(1)}%`;
}

function formatPosition(value) {
  return Number(value || 0).toFixed(1);
}

function formatChartDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

function formatUpdatedDate(date) {
  if (!date) return "Sin actualizar";

  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
  decorationClass,
}) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-10 transition duration-300 group-hover:scale-125 ${decorationClass}`}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>

          <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-xs font-medium text-slate-400">{subtitle}</p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl ${iconClass}`}
        >
          <Icon />
        </div>
      </div>
    </article>
  );
}

function ChartSkeleton() {
  return <div className="h-[320px] animate-pulse rounded-3xl bg-slate-100" />;
}

function EmptyState({ message }) {
  return (
    <div className="flex min-h-[230px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
      <div>
        <FaChartLine className="mx-auto mb-3 text-3xl text-slate-300" />

        <p className="font-semibold text-slate-600">{message}</p>
      </div>
    </div>
  );
}

export default function InsightsAdmin() {
  const [range, setRange] = useState("28d");
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadInsights = useCallback(
    async (signal, isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await axios.get("/api/insights", {
          params: { range },
          withCredentials: true,
          signal,
        });

        setData(response.data);
      } catch (requestError) {
        if (
          requestError?.code === "ERR_CANCELED" ||
          requestError?.name === "CanceledError"
        ) {
          return;
        }

        console.error("Error al cargar Insights:", requestError);

        setError(
          requestError.response?.data?.message ||
            "No fue posible cargar la información de Analytics.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [range],
  );

  useEffect(() => {
    const controller = new AbortController();

    loadInsights(controller.signal);

    return () => controller.abort();
  }, [loadInsights]);

  const analytics = data.analytics || EMPTY_DATA.analytics;

  const searchConsole = data.searchConsole || EMPTY_DATA.searchConsole;

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Encabezado */}

        <header className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#023e73] via-[#0260fe] to-[#3794ff] px-6 py-8 text-white shadow-xl sm:px-8">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10" />

          <div className="relative flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-blue-100">
                <FaChartLine />
                Centro de rendimiento
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Insights del sitio
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-100 sm:text-base">
                Consulta el comportamiento de los visitantes y el rendimiento de
                Viaja a tu Destino en los resultados de Google.
              </p>

              <p className="mt-4 text-xs font-medium text-blue-100/80">
                Última actualización: {formatUpdatedDate(data.updatedAt)}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex rounded-2xl bg-white/10 p-1 backdrop-blur">
                {RANGE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRange(option.value)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      range === option.value
                        ? "bg-white text-[#0260fe] shadow-md"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => loadInsights(undefined, true)}
                disabled={refreshing}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#ff6600] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e65c00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaSyncAlt className={refreshing ? "animate-spin" : ""} />

                {refreshing ? "Actualizando..." : "Actualizar"}
              </button>
            </div>
          </div>
        </header>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {/* Google Analytics */}

        <section className="mt-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-xl text-orange-600">
              <FaChartLine />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Google Analytics
              </h2>

              <p className="text-sm text-slate-500">
                Actividad y comportamiento dentro del sitio.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Usuarios activos"
              value={formatNumber(analytics.totals.activeUsers)}
              subtitle="Personas que interactuaron"
              icon={FaUsers}
              iconClass="bg-blue-100 text-[#0260fe]"
              decorationClass="bg-[#0260fe]"
            />

            <MetricCard
              title="Sesiones"
              value={formatNumber(analytics.totals.sessions)}
              subtitle="Visitas iniciadas"
              icon={FaGlobe}
              iconClass="bg-cyan-100 text-cyan-600"
              decorationClass="bg-cyan-500"
            />

            <MetricCard
              title="Vistas de página"
              value={formatNumber(analytics.totals.screenPageViews)}
              subtitle="Contenido visualizado"
              icon={FaEye}
              iconClass="bg-violet-100 text-violet-600"
              decorationClass="bg-violet-500"
            />

            <MetricCard
              title="Interacción"
              value={formatPercent(analytics.totals.engagementRate)}
              subtitle="Porcentaje de sesiones interesadas"
              icon={FaChartLine}
              iconClass="bg-emerald-100 text-emerald-600"
              decorationClass="bg-emerald-500"
            />
          </div>
        </section>

        {/* Gráfica Analytics */}

        <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-900">
              Actividad diaria
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Usuarios, sesiones y vistas registradas diariamente.
            </p>
          </div>

          {loading ? (
            <ChartSkeleton />
          ) : analytics.daily.length === 0 ? (
            <EmptyState message="Todavía no hay datos de Analytics disponibles." />
          ) : (
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={analytics.daily}
                  margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#e2e8f0"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="date"
                    tickFormatter={formatChartDate}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    labelFormatter={(value) => formatChartDate(value)}
                    formatter={(value, name) => [formatNumber(value), name]}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                    }}
                  />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="activeUsers"
                    name="Usuarios"
                    stroke="#0260fe"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="sessions"
                    name="Sesiones"
                    stroke="#ff6600"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="screenPageViews"
                    name="Vistas"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        {/* Search Console */}

        <section className="mt-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-xl text-[#0260fe]">
              <FaSearch />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Google Search Console
              </h2>

              <p className="text-sm text-slate-500">
                Rendimiento orgánico en los resultados de búsqueda.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Clics orgánicos"
              value={formatNumber(searchConsole.totals.clicks)}
              subtitle="Visitas provenientes de Google"
              icon={FaMousePointer}
              iconClass="bg-blue-100 text-[#0260fe]"
              decorationClass="bg-[#0260fe]"
            />

            <MetricCard
              title="Impresiones"
              value={formatNumber(searchConsole.totals.impressions)}
              subtitle="Apariciones en resultados"
              icon={FaEye}
              iconClass="bg-purple-100 text-purple-600"
              decorationClass="bg-purple-500"
            />

            <MetricCard
              title="CTR promedio"
              value={formatPercent(searchConsole.totals.ctr)}
              subtitle="Impresiones que generaron clic"
              icon={FaChartLine}
              iconClass="bg-emerald-100 text-emerald-600"
              decorationClass="bg-emerald-500"
            />

            <MetricCard
              title="Posición promedio"
              value={formatPosition(searchConsole.totals.position)}
              subtitle="Lugar promedio en Google"
              icon={FaSearch}
              iconClass="bg-orange-100 text-orange-600"
              decorationClass="bg-orange-500"
            />
          </div>
        </section>

        {/* Gráfica Search Console */}

        <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-900">
              Rendimiento en Google
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Comparación diaria de clics e impresiones.
            </p>
          </div>

          {loading ? (
            <ChartSkeleton />
          ) : searchConsole.daily.length === 0 ? (
            <EmptyState message="Todavía no hay datos de Search Console disponibles." />
          ) : (
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={searchConsole.daily}
                  margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#e2e8f0"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="date"
                    tickFormatter={formatChartDate}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    yAxisId="clicks"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    yAxisId="impressions"
                    orientation="right"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    labelFormatter={(value) => formatChartDate(value)}
                    formatter={(value, name) => [formatNumber(value), name]}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                    }}
                  />

                  <Legend />

                  <Line
                    yAxisId="clicks"
                    type="monotone"
                    dataKey="clicks"
                    name="Clics"
                    stroke="#0260fe"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />

                  <Line
                    yAxisId="impressions"
                    type="monotone"
                    dataKey="impressions"
                    name="Impresiones"
                    stroke="#ff6600"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        {/* Tablas */}

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          {/* Páginas populares */}

          <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h3 className="font-black text-slate-900">
                Páginas más visitadas
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Contenido con mayor cantidad de vistas.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[550px]">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-black">Página</th>
                    <th className="px-4 py-4 text-right font-black">
                      Usuarios
                    </th>
                    <th className="px-6 py-4 text-right font-black">Vistas</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {analytics.topPages.length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-10 text-center text-sm text-slate-500"
                      >
                        No hay información disponible.
                      </td>
                    </tr>
                  ) : (
                    analytics.topPages.map((page, index) => (
                      <tr
                        key={`${page.path}-${index}`}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <p className="max-w-[330px] truncate text-sm font-bold text-slate-800">
                            {page.title || page.path}
                          </p>

                          <p className="mt-1 max-w-[330px] truncate text-xs text-slate-400">
                            {page.path}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-bold text-slate-600">
                          {formatNumber(page.activeUsers)}
                        </td>

                        <td className="px-6 py-4 text-right text-sm font-black text-[#0260fe]">
                          {formatNumber(page.screenPageViews)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>

          {/* Consultas de Google */}

          <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h3 className="font-black text-slate-900">
                Búsquedas principales
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Palabras utilizadas para encontrar tu página.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[550px]">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-black">Consulta</th>
                    <th className="px-4 py-4 text-right font-black">Clics</th>
                    <th className="px-4 py-4 text-right font-black">
                      Impresiones
                    </th>
                    <th className="px-6 py-4 text-right font-black">
                      Posición
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {searchConsole.queries.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-10 text-center text-sm text-slate-500"
                      >
                        No hay consultas disponibles.
                      </td>
                    </tr>
                  ) : (
                    searchConsole.queries.map((query, index) => (
                      <tr
                        key={`${query.query}-${index}`}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <p className="max-w-[260px] truncate text-sm font-bold text-slate-800">
                            {query.query}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-black text-[#0260fe]">
                          {formatNumber(query.clicks)}
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-bold text-slate-600">
                          {formatNumber(query.impressions)}
                        </td>

                        <td className="px-6 py-4 text-right text-sm font-bold text-orange-600">
                          {formatPosition(query.position)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
