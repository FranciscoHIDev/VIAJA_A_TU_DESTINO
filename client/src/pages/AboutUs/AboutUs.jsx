import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const values = [
  {
    title: "Atención personalizada",
    description:
      "Escuchamos tus necesidades y te acompañamos para encontrar una opción de viaje adecuada para ti.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          d="M16 21V19C16 16.79 14.21 15 12 15H6C3.79 15 2 16.79 2 19V21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M17 11L19 13L22 9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Ofertas seleccionadas",
    description:
      "Buscamos promociones, tarifas especiales y alternativas que te permitan viajar más y aprovechar mejor tu presupuesto.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          d="M20 13L13 20L4 11V4H11L20 13Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Servicio confiable",
    description:
      "Trabajamos con proveedores turísticos y plataformas reconocidas para ayudarte a reservar con mayor seguridad.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          d="M12 3L5 6V11C5 15.55 7.98 19.74 12 21C16.02 19.74 19 15.55 19 11V6L12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 12L11.2 13.7L14.8 10.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Experiencia digital",
    description:
      "Puedes consultar, cotizar y recibir atención desde cualquier lugar, de forma fácil, rápida y completamente en línea.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 21H16M12 17V21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const services = [
  "Hoteles y resorts",
  "Vuelos nacionales e internacionales",
  "Paquetes de vuelo y hotel",
  "Tours y actividades",
  "Traslados",
  "Viajes para parejas y familias",
];

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M5 12L10 17L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.52 2 2.03 6.48 2.03 12c0 1.76.46 3.47 1.33 4.98L2 22l5.16-1.35A9.97 9.97 0 0012.04 22C17.55 22 22 17.52 22 12S17.55 2 12.04 2zm0 18.17a8.13 8.13 0 01-4.15-1.14l-.3-.18-3.06.8.82-2.98-.2-.31A8.14 8.14 0 013.9 12c0-4.49 3.65-8.14 8.14-8.14 4.48 0 8.12 3.65 8.12 8.14s-3.64 8.17-8.12 8.17zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.46c-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.03 0 1.2.87 2.35.99 2.51.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

function AboutUs() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f8ff]">
      <header className="relative z-50">
        <NavBar />
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#023e73] via-[#0260fe] to-[#3794ff] px-5 py-16 text-white md:py-24">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#ff6600]/25 blur-3xl" />
          <div className="absolute right-[10%] top-14 h-28 w-28 rounded-full border border-white/10" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur">
                <PlaneIcon />
              </div>

              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur">
                Conoce Viaja a tu Destino
              </span>

              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Cazamos las mejores ofertas de viaje para ti
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Somos una agencia de viajes online comprometida con ayudarte a
                encontrar hoteles, vuelos, paquetes y experiencias para que
                puedas viajar de manera sencilla, segura y al mejor precio
                disponible.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/ofertas"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#ff6600] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-xl"
                >
                  Ver ofertas
                </a>

                <a
                  href="https://wa.me/529984954637?text=Hola,%20quiero%20recibir%20información%20para%20planear%20mi%20próximo%20viaje."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#023e73]"
                >
                  <WhatsAppIcon />
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>

            {/* Tarjeta visual */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-white/10 blur-xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <div className="rounded-[1.6rem] bg-white p-6 text-slate-800 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0260fe]">
                        Tu próximo viaje
                      </p>

                      <h2 className="mt-2 text-2xl font-black text-[#023e73]">
                        Más fácil de lo que imaginas
                      </h2>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff6600]/10 text-[#ff6600]">
                      <PlaneIcon />
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    {[
                      "Cuéntanos a dónde quieres viajar",
                      "Recibe opciones según tu presupuesto",
                      "Selecciona la oferta que más te convenga",
                      "Reserva y comienza a preparar tus maletas",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"
                      >
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#0260fe] text-sm font-black text-white">
                          {index + 1}
                        </span>

                        <p className="text-sm font-bold leading-6 text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Historia */}
        <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Imagen */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-3xl bg-[#ff6600]/15" />
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-[#0260fe]/10" />

              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0260fe] to-[#023e73] p-2 shadow-xl">
                <img
                  src="https://res.cloudinary.com/duaysiozi/image/upload/v1785118262/ywhrzdj9bzmyojgbmrb1.png"
                  alt="Viajeros disfrutando de sus vacaciones"
                  className="h-[350px] w-full rounded-[1.6rem] object-cover sm:h-[450px]"
                />
              </div>

              <div className="absolute -bottom-6 left-5 right-5 rounded-2xl bg-white p-5 shadow-xl sm:left-auto sm:right-6 sm:w-64">
                <p className="text-sm font-bold text-slate-500">
                  Nuestro propósito
                </p>

                <p className="mt-1 text-lg font-black text-[#023e73]">
                  Ayudarte a viajar más y pagar menos
                </p>
              </div>
            </div>

            <div className="pt-8 lg:pt-0">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6600]">
                Nuestra historia
              </span>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                Nacimos para acercarte a tu próximo destino
              </h2>

              <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  <strong className="font-bold text-slate-800">
                    Viaja a tu Destino
                  </strong>{" "}
                  es una agencia de viajes 100 % digital creada para facilitar
                  la búsqueda y contratación de experiencias turísticas.
                </p>

                <p>
                  Sabemos que organizar unas vacaciones puede generar dudas
                  sobre precios, fechas, hoteles, vuelos y formas de pago. Por
                  eso, nuestro objetivo es simplificar el proceso y presentarte
                  alternativas claras de acuerdo con tus necesidades.
                </p>

                <p>
                  Nos especializamos en buscar ofertas para destinos de playa,
                  hoteles Todo Incluido, viajes en pareja, vacaciones familiares
                  y escapadas dentro y fuera de México.
                </p>

                <p>
                  Desde Cancún, conectamos a viajeros con destinos, proveedores
                  y experiencias que pueden convertirse en recuerdos
                  inolvidables.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y visión */}
        <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                Lo que nos mueve
              </span>

              <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                Nuestra misión y visión
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <article className="relative overflow-hidden rounded-3xl bg-[#023e73] p-8 text-white shadow-lg sm:p-10">
                <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#0260fe]/50 blur-3xl" />

                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-black">
                    M
                  </span>

                  <h3 className="mt-6 text-2xl font-black">Nuestra misión</h3>

                  <p className="mt-4 leading-8 text-white/75">
                    Facilitar el acceso a experiencias de viaje mediante
                    atención personalizada, tecnología y ofertas seleccionadas,
                    ayudando a nuestros clientes a encontrar opciones que se
                    adapten a su presupuesto y forma de viajar.
                  </p>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0260fe] to-[#3794ff] p-8 text-white shadow-lg sm:p-10">
                <div className="absolute -bottom-20 -left-14 h-52 w-52 rounded-full bg-[#ff6600]/25 blur-3xl" />

                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-black">
                    V
                  </span>

                  <h3 className="mt-6 text-2xl font-black">Nuestra visión</h3>

                  <p className="mt-4 leading-8 text-white/80">
                    Convertirnos en una agencia de viajes digital reconocida por
                    su confianza, atención cercana y capacidad para conectar a
                    más personas con destinos y experiencias memorables.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6600]">
                Nuestra forma de trabajar
              </span>

              <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                Valores que nos acompañan en cada viaje
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Buscamos que cada cliente reciba información clara, atención
                cercana y alternativas que le ayuden a tomar una mejor decisión.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/30 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe] transition group-hover:bg-[#0260fe] group-hover:text-white">
                    {value.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-black text-[#023e73]">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section className="bg-[#023e73] px-4 py-14 text-white sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#79b5ff]">
                Lo que puedes encontrar
              </span>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                Todo lo que necesitas para comenzar tu viaje
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-white/75">
                Te ayudamos a consultar diferentes alternativas para que puedas
                organizar tu viaje desde un solo lugar.
              </p>

              <a
                href="/ofertas"
                className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[#ff6600] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00]"
              >
                Explorar ofertas
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#ff6600] text-white">
                    <CheckIcon />
                  </span>

                  <p className="font-bold text-white">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 rounded-[2rem] border border-slate-200 bg-[#f4f8ff] p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                  Viaja con confianza
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                  ¿Por qué elegir Viaja a tu Destino?
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  No solo compartimos promociones. También buscamos orientarte
                  durante el proceso para que conozcas las condiciones de tu
                  viaje antes de reservar.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Agencia de viajes completamente digital.",
                  "Atención personalizada por medios electrónicos.",
                  "Ofertas para diferentes presupuestos.",
                  "Opciones de hoteles, vuelos, paquetes y tours.",
                  "Acompañamiento antes y después de reservar.",
                  "Acceso a proveedores y plataformas turísticas.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm"
                  >
                    <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#0260fe]/10 text-[#0260fe]">
                      <CheckIcon />
                    </span>

                    <p className="font-semibold leading-7 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#0260fe] to-[#3794ff] p-8 text-white shadow-xl sm:p-12">
            <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[#ff6600]/25 blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                  Tu próxima aventura comienza aquí
                </p>

                <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                  Cuéntanos a dónde quieres viajar y buscaremos opciones para ti
                </h2>

                <p className="mt-4 max-w-2xl leading-8 text-white/80">
                  Indícanos tu destino, fechas, ciudad de salida y número de
                  viajeros para comenzar tu cotización.
                </p>
              </div>

              <a
                href="https://wa.me/529984954637?text=Hola,%20quiero%20cotizar%20un%20viaje.%20Mi%20destino%20es:%20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-xl"
              >
                <WhatsAppIcon />
                Comenzar cotización
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default AboutUs;
