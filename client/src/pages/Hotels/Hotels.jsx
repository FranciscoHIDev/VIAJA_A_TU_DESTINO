import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import {
  FaArrowRight,
  FaBed,
  FaCalendarCheck,
  FaCheckCircle,
  FaCreditCard,
  FaHeadset,
  FaHotel,
  FaMapMarkerAlt,
  FaPlane,
  FaSearch,
  FaShieldAlt,
  FaStar,
  FaUmbrellaBeach,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";

import CardsHotels from "../../components/CardsHotels/CardsHotels";
import PriceResWidget from "../../components/PriceRes/PriceResWidget";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const destinations = [
  {
    name: "Cancún",
    description: "Playas, resorts y hoteles Todo Incluido.",
    image:
      "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Riviera Maya",
    description: "Naturaleza, cenotes y hospedajes frente al mar.",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Los Cabos",
    description: "Paisajes, descanso y hoteles de gran nivel.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Puerto Vallarta",
    description: "Playas, gastronomía y ambiente tradicional.",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Huatulco",
    description: "Bahías tranquilas y vacaciones familiares.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Riviera Nayarit",
    description: "Resorts, naturaleza y atardeceres increíbles.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  },
];

const hotelTypes = [
  {
    title: "Todo Incluido",
    description:
      "Hospedaje, alimentos, bebidas y entretenimiento en un solo precio.",
    icon: FaUmbrellaBeach,
  },
  {
    title: "Hoteles familiares",
    description:
      "Espacios, albercas y actividades para disfrutar con toda la familia.",
    icon: FaUsers,
  },
  {
    title: "Escapadas en pareja",
    description:
      "Hoteles especiales para descansar y compartir momentos inolvidables.",
    icon: FaBed,
  },
];

const benefits = [
  {
    title: "Tarifas competitivas",
    description:
      "Comparamos opciones para ayudarte a encontrar precios convenientes.",
    icon: FaStar,
  },
  {
    title: "Pagos flexibles",
    description:
      "Encuentra promociones con meses sin intereses cuando estén disponibles.",
    icon: FaCreditCard,
  },
  {
    title: "Reservación confiable",
    description:
      "Trabajamos con plataformas y proveedores turísticos reconocidos.",
    icon: FaShieldAlt,
  },
  {
    title: "Atención personalizada",
    description:
      "Recibe orientación para elegir el hotel adecuado para tu viaje.",
    icon: FaHeadset,
  },
];

function Hotels() {
  const scrollToSearch = () => {
    document.getElementById("buscar-hotel")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const scrollToHotels = () => {
    document.getElementById("hoteles-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <React.Fragment>
      <SEO
        title="Hoteles en Cancún, Riviera Maya y México"
        description="Encuentra hoteles en Cancún, Riviera Maya, Playa del Carmen, Huatulco y otros destinos de México. Consulta promociones y hoteles todo incluido."
        image="https://www.viajaatudestino.com/IMAGEN-HOTELES.jpg"
        url="https://www.viajaatudestino.com/hoteles"
      />

      <div className="flex min-h-screen flex-col bg-[#f4f8ff]">
        <NavBar />

        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden bg-[#023e73]">
            <div className="absolute inset-0">
              <img
                src="https://res.cloudinary.com/duaysiozi/image/upload/v1784166872/ycojgupbhfq8cplu0lzg.png"
                alt="Hoteles para tus próximas vacaciones"
                className="h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#012f58]/95 via-[#023e73]/75 to-[#0260fe]/25" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#023e73]/80 via-transparent to-transparent" />
            </div>

            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0260fe]/30 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#ff6600]/20 blur-3xl" />

            <div className="relative mx-auto flex min-h-[540px] max-w-7xl items-center px-5 pb-32 pt-16 sm:px-6 md:min-h-[620px] md:pb-40 lg:px-8">
              <div className="max-w-3xl text-white">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
                  <FaHotel className="text-[#ff9b4a]" />
                  Hospedaje para cada viaje
                </span>

                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Encuentra el hotel perfecto para tus vacaciones
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                  Explora hoteles Todo Incluido, resorts frente al mar y
                  opciones para parejas, familias o grupos en destinos
                  nacionales e internacionales.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={scrollToSearch}
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-xl"
                  >
                    <FaSearch />
                    Buscar hoteles
                  </button>

                  <a
                    href="https://wa.me/529984954637?text=Hola,%20quiero%20cotizar%20un%20hotel.%0A%0ADestino:%20%0AFechas:%20%0ANúmero%20de%20adultos:%20%0ANúmero%20de%20menores:%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#023e73]"
                  >
                    <FaWhatsapp className="text-lg" />
                    Solicitar cotización
                  </a>
                </div>

                <div className="mt-8 flex flex-col gap-3 text-sm font-semibold text-white/75 sm:flex-row sm:flex-wrap sm:gap-x-7">
                  <span className="flex items-center gap-2">
                    <FaCheckCircle className="text-[#ff8a33]" />
                    Hoteles seleccionados
                  </span>

                  <span className="flex items-center gap-2">
                    <FaCheckCircle className="text-[#ff8a33]" />
                    Atención personalizada
                  </span>

                  <span className="flex items-center gap-2">
                    <FaCheckCircle className="text-[#ff8a33]" />
                    Pagos flexibles
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* TIPOS DE HOSPEDAJE */}
          <section className="px-4 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                  Encuentra tu estilo de hospedaje
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                  Una opción para cada tipo de viajero
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  Descubre alternativas para vacaciones familiares, viajes en
                  pareja o estancias con todos los servicios incluidos.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {hotelTypes.map((type) => {
                  const Icon = type.icon;

                  return (
                    <button
                      key={type.title}
                      type="button"
                      onClick={scrollToHotels}
                      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/30 hover:shadow-xl sm:p-8"
                    >
                      <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#0260fe]/5 transition duration-500 group-hover:scale-125 group-hover:bg-[#0260fe]/10" />

                      <div className="relative">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe] transition group-hover:bg-[#0260fe] group-hover:text-white">
                          <Icon className="text-2xl" />
                        </div>

                        <h3 className="mt-6 text-2xl font-black text-[#023e73]">
                          {type.title}
                        </h3>

                        <p className="mt-3 leading-7 text-slate-600">
                          {type.description}
                        </p>

                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0260fe]">
                          Explorar hoteles
                          <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* DESTINOS POPULARES */}
          <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6600]">
                    Destinos populares
                  </span>

                  <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                    Inspírate para tu próximo viaje
                  </h2>

                  <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                    Descubre algunos de los destinos preferidos para disfrutar
                    hoteles de playa, resorts y experiencias inolvidables.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToHotels}
                  className="inline-flex w-fit items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-6 py-3.5 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white"
                >
                  Ver hoteles
                  <FaArrowRight className="text-xs" />
                </button>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((destination, index) => (
                  <button
                    key={destination.name}
                    type="button"
                    onClick={scrollToSearch}
                    className={`group relative overflow-hidden rounded-3xl text-left shadow-lg ${
                      index === 0 || index === 3
                        ? "min-h-[370px]"
                        : "min-h-[310px]"
                    }`}
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#001b34]/95 via-[#001b34]/25 to-transparent" />

                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur">
                      <FaMapMarkerAlt />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <h3 className="text-2xl font-black text-white sm:text-3xl">
                        {destination.name}
                      </h3>

                      <p className="mt-2 leading-7 text-white/75">
                        {destination.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-white">
                        Buscar hospedaje
                        <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* HOTELES DISPONIBLES */}
          <section
            id="hoteles-disponibles"
            className="scroll-mt-24 bg-[#f4f8ff] px-4 py-16 sm:px-6 md:py-24 lg:px-8"
          >
            <div className="mx-auto max-w-[1500px]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0260fe]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                    <FaHotel />
                    Hoteles recomendados
                  </span>

                  <h2 className="mt-5 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                    Encuentra hospedaje para tus próximas vacaciones
                  </h2>

                  <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                    Consulta las opciones disponibles y revisa sus precios,
                    servicios, fechas y condiciones antes de reservar.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="inline-flex w-fit items-center justify-center gap-3 rounded-2xl bg-[#0260fe] px-6 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#014fd3] hover:shadow-xl"
                >
                  <FaSearch />
                  Nueva búsqueda
                </button>
              </div>

              <div className="mt-10">
                <CardsHotels />
              </div>

              <div className="mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-6 text-center sm:p-8">
                <p className="font-bold leading-7 text-[#86420f]">
                  Las tarifas están sujetas a disponibilidad y pueden cambiar
                  sin previo aviso. El precio final dependerá del destino, las
                  fechas, el número de huéspedes y el tipo de habitación
                  seleccionado.
                </p>
              </div>
            </div>
          </section>

          {/* PROMOCIÓN */}
          <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1800&auto=format&fit=crop"
                  alt="Habitación de hotel"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#001b34]/95 via-[#023e73]/80 to-[#0260fe]/35" />

                <div className="relative flex min-h-[420px] items-center px-7 py-14 sm:px-10 lg:px-16">
                  <div className="max-w-2xl text-white">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#ff6600] px-5 py-2 text-xs font-black uppercase tracking-[0.16em]">
                      <FaCreditCard />
                      Facilidades de pago
                    </span>

                    <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                      Reserva hoy y paga con mayor flexibilidad
                    </h2>

                    <p className="mt-5 max-w-xl text-base leading-8 text-white/75 md:text-lg">
                      Algunas promociones permiten pagar hasta 12, 18 o 24 meses
                      sin intereses, dependiendo del banco, proveedor y servicio
                      seleccionado.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={scrollToSearch}
                        className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00]"
                      >
                        <FaCalendarCheck />
                        Buscar disponibilidad
                      </button>

                      <a
                        href="https://wa.me/529984954637?text=Hola,%20quiero%20información%20sobre%20hoteles%20con%20meses%20sin%20intereses."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#023e73]"
                      >
                        <FaWhatsapp />
                        Consultar promociones
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BENEFICIOS */}
          <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                  Reserva con mayor confianza
                </span>

                <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                  ¿Por qué buscar tu hotel con nosotros?
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  Te ayudamos a comparar opciones y conocer las condiciones de
                  tu hospedaje antes de realizar la reservación.
                </p>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <article
                      key={benefit.title}
                      className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/30 hover:shadow-xl"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe] transition group-hover:bg-[#0260fe] group-hover:text-white">
                        <Icon className="text-2xl" />
                      </div>

                      <h3 className="mt-6 text-xl font-black text-[#023e73]">
                        {benefit.title}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-600">
                        {benefit.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA FINAL */}
          <section className="bg-white px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-gradient-to-r from-[#023e73] via-[#0260fe] to-[#3794ff] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
              <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

              <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#ff6600]/25 blur-3xl" />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/65">
                    Cotización personalizada
                  </span>

                  <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                    ¿Aún no encuentras el hotel ideal?
                  </h2>

                  <p className="mt-5 text-base leading-8 text-white/75 md:text-lg">
                    Envíanos el destino, las fechas y el número de viajeros.
                    Buscaremos opciones que se adapten a tus necesidades.
                  </p>
                </div>

                <a
                  href="https://wa.me/529984954637?text=Hola,%20quiero%20una%20cotización%20personalizada%20de%20hotel.%0A%0ADestino:%20%0AFechas:%20%0AAdultos:%20%0AMenores:%20%0APresupuesto:%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-5 text-base font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-2xl"
                >
                  <FaWhatsapp className="text-2xl" />
                  Cotizar un hotel
                </a>
              </div>
            </div>
          </section>

          {/* ENLACE ADICIONAL */}
          <section className="border-t border-slate-200 bg-[#f4f8ff] px-4 py-8 text-center">
            <p className="text-sm text-slate-500">
              ¿Buscas vuelo y hotel juntos?{" "}
              <Link
                to="/paquetes"
                className="inline-flex items-center gap-1 font-black text-[#0260fe] hover:text-[#ff6600]"
              >
                Consulta nuestros paquetes
                <FaPlane className="text-xs" />
              </Link>
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Hotels;
