import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPlaneDeparture,
  FaRegEnvelope,
  FaShieldAlt,
} from "react-icons/fa";
import api from "../../services/api";
import SEO from "../../components/SEO/SEO";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/login", {
        email,
        password,
      });

      setPassword("");
      navigate("/auth", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "No fue posible iniciar sesión. Intenta nuevamente.",
      );
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <SEO
        title="Iniciar sesión al administrador"
        description="Panel de inicio de sesión al administrador de viajes"
        url="https://www.viajaatudestino.com/auth/login"
        noindex
      />
      <main className="min-h-[100dvh] bg-[#edf4ff] lg:h-[100dvh] lg:overflow-hidden lg:p-4">
        <section className="grid min-h-[100dvh] overflow-hidden bg-white shadow-2xl shadow-blue-950/15 lg:h-full lg:min-h-0 lg:grid-cols-2 lg:rounded-[2rem]">
          {/* Lado visual */}
          <aside className="relative min-h-[330px] overflow-hidden bg-[#09265d] px-7 py-9 sm:px-12 lg:h-full lg:min-h-0 lg:px-16 lg:py-12">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#031a46]/95 via-[#0b3c94]/80 to-[#0260fe]/65" />

            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full border border-white/20 bg-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-80 w-80 rounded-full bg-[#ff6600]/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-24 right-10 h-24 w-24 rounded-full border border-white/20" />

            <div className="relative z-10 flex h-full flex-col text-white">
              <Link
                to="/"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
              >
                <FaArrowLeft />
                Volver al sitio
              </Link>

              <div className="mt-7 flex items-center gap-3 lg:mt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-[#0260fe] shadow-lg">
                  <FaPlaneDeparture />
                </div>

                <div>
                  <p className="text-lg font-black leading-none">
                    Viaja a tu Destino
                  </p>
                  <p className="mt-1 text-xs font-medium tracking-[0.16em] text-blue-100">
                    ADMINISTRACIÓN
                  </p>
                </div>
              </div>

              <div className="my-auto py-8 lg:py-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-50 backdrop-blur-sm">
                  <FaShieldAlt />
                  Panel privado
                </span>

                <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight sm:text-5xl">
                  Grandes experiencias comienzan con una gran oferta.
                </h1>

                <p className="mt-5 max-w-md text-base leading-7 text-blue-100 sm:text-lg">
                  Administra paquetes, hoteles, vuelos y tours desde un solo
                  espacio seguro.
                </p>
              </div>

              <div className="grid max-w-lg grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:p-4">
                  <p className="text-xl font-black sm:text-2xl">24/7</p>
                  <p className="mt-1 text-xs text-blue-100">Panel disponible</p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:p-4">
                  <p className="text-xl font-black sm:text-2xl">100%</p>
                  <p className="mt-1 text-xs text-blue-100">Acceso protegido</p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:p-4">
                  <p className="text-xl font-black sm:text-2xl">MX</p>
                  <p className="mt-1 text-xs text-blue-100">Tu agencia</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Lado del formulario */}
          <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:h-full lg:min-h-0 lg:px-16 lg:py-5 xl:px-24">
            <div className="w-full max-w-md">
              <div className="mb-7 lg:mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-[#0260fe]">
                  <FaLock />
                </div>

                <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#0260fe]">
                  Acceso administrativo
                </p>

                <h1 className="mt-2 text-3xl font-black text-[#172554] sm:text-4xl">
                  Bienvenido de nuevo
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Ingresa tus credenciales para continuar al panel de control.
                </p>
              </div>

              {error && (
                <div
                  className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-bold text-[#253777]"
                >
                  Correo electrónico
                </label>

                <div className="relative mt-2">
                  <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError("");
                    }}
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck="false"
                    required
                    maxLength={254}
                    placeholder="correo@ejemplo.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0260fe] focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <label
                  htmlFor="admin-password"
                  className="mt-4 block text-sm font-bold text-[#253777]"
                >
                  Contraseña
                </label>

                <div className="relative mt-2">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (error) setError("");
                    }}
                    autoComplete="current-password"
                    required
                    minLength={12}
                    maxLength={128}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0260fe] focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#0260fe]"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0260fe] to-[#1749b8] px-6 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Ingresar al panel
                </button>
              </form>

              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-xs leading-5 text-slate-500">
                <FaShieldAlt className="mt-0.5 shrink-0 text-base text-[#0260fe]" />
                <p>
                  Este acceso es exclusivo para personal autorizado. Tu sesión
                  se encuentra protegida mediante autenticación segura.
                </p>
              </div>
            </div>
          </section>
        </section>

        {/* Pantalla de carga */}
        {loading && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#031a46]/70 px-5 backdrop-blur-md"
            role="status"
            aria-live="polite"
          >
            <div className="w-full max-w-xs rounded-3xl border border-white/20 bg-white/15 p-8 text-center text-white shadow-2xl backdrop-blur-xl">
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/20" />

                <div
                  className="absolute inset-0 animate-spin"
                  style={{ animationDuration: "1.2s" }}
                >
                  <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-[#3794ff] shadow-lg shadow-blue-300/70" />
                  <span className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-lg shadow-white/60" />
                  <span className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#ff6600] shadow-lg shadow-orange-300/70" />
                </div>

                <div
                  className="absolute inset-3 rounded-full border-2 border-white/20 border-t-white animate-spin"
                  style={{ animationDuration: "0.8s" }}
                />

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-[#0260fe] shadow-lg">
                  <FaPlaneDeparture />
                </div>
              </div>

              <h2 className="mt-6 text-xl font-black">Ingresando al panel</h2>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Verificando tus credenciales de acceso...
              </p>
            </div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
}
