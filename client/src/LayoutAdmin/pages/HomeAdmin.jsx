import {
  FaArrowRight,
  FaCheckCircle,
  FaHotel,
  FaMapMarkedAlt,
  FaPlane,
  FaPlus,
  FaSuitcase,
  FaTag,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const quickActions = [
  {
    title: "Nuevo paquete",
    description: "Crea una oferta de vuelo + hotel.",
    to: "/auth/new-package",
    icon: FaSuitcase,
    color: "bg-blue-50 text-[#0260fe]",
  },
  {
    title: "Nuevo hotel",
    description: "Agrega una opción de hospedaje.",
    to: "/auth/new-hotel",
    icon: FaHotel,
    color: "bg-orange-50 text-[#ff6600]",
  },
  {
    title: "Nuevo vuelo",
    description: "Registra una nueva opción de vuelo.",
    to: "/auth/new-flight",
    icon: FaPlane,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Nuevo tour",
    description: "Publica una experiencia para viajeros.",
    to: "/auth/new-tour",
    icon: FaMapMarkedAlt,
    color: "bg-emerald-50 text-emerald-600",
  },
];

function HomeAdmin() {
  const today = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0260fe] to-[#253777] px-6 py-8 text-white shadow-xl shadow-blue-500/20 sm:px-8 sm:py-10">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 right-20 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-100">
            {today}
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            Bienvenido al panel de administración
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Administra las ofertas de Viaja a tu Destino y mantén actualizado el
            contenido para ayudar a más personas a viajar.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/auth/new-package"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-[#0260fe] shadow-lg transition hover:-translate-y-0.5"
            >
              <FaPlus />
              Crear nueva oferta
            </Link>

            <Link
              to="/auth/ofertas"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Ver ofertas
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#0260fe]">
            Accesos rápidos
          </p>
          <h2 className="mt-1 text-2xl font-black text-[#253777]">
            ¿Qué deseas publicar?
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map(({ title, description, to, icon: Icon, color }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${color}`}
              >
                <Icon />
              </div>

              <h3 className="mt-5 font-black text-[#253777]">{title}</h3>
              <p className="mt-2 text-sm leading-5 text-gray-500">
                {description}
              </p>

              <span className="mt-5 flex items-center gap-2 text-sm font-bold text-[#0260fe]">
                Crear ahora
                <FaArrowRight className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Link
          to="/auth/ofertas"
          className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#0260fe]">
                <FaTag />
              </div>

              <h2 className="mt-4 text-xl font-black text-[#253777]">
                Gestionar ofertas publicadas
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Consulta, actualiza o elimina las ofertas disponibles en tu
                sitio web.
              </p>
            </div>

            <FaArrowRight className="mt-2 text-[#0260fe] transition group-hover:translate-x-1" />
          </div>
        </Link>

        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
          <p className="text-sm font-bold text-[#0260fe]">Antes de publicar</p>

          <ul className="mt-4 space-y-3 text-sm text-[#253777]">
            <li className="flex gap-3">
              <FaCheckCircle className="mt-0.5 shrink-0 text-[#0260fe]" />
              Confirma el precio y la disponibilidad.
            </li>

            <li className="flex gap-3">
              <FaCheckCircle className="mt-0.5 shrink-0 text-[#0260fe]" />
              Revisa que las imágenes se vean correctamente.
            </li>

            <li className="flex gap-3">
              <FaCheckCircle className="mt-0.5 shrink-0 text-[#0260fe]" />
              Verifica que incluya la información importante.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HomeAdmin;
