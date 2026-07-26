// import React from "react";
// import { FaFacebook, FaInstagram } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

// function Footer() {
//   return (
//     <React.Fragment>
//       <footer className="bg-[#f8f9fa]">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-20 md:px-6 px-10">
//           {/* Sobre nosotros */}
//           <section>
//             <h2 className="text-[18px] uppercase text-[#333] font-medium mb-4">
//               Sobre nosotros
//             </h2>
//             <p className="text-[18px] text-[#555] ">
//               Cazamos las mejores ofertas de viaje para ti, desde hoteles,
//               vuelos y paquetes con promociones exclusivas, pagos flexibles y
//               meses sin intereses.
//             </p>
//           </section>

//           {/* Legales */}
//           <nav>
//             <h2 className="text-[18px]  uppercase text-[#333]  font-medium mb-4">
//               Legales
//             </h2>
//             <NavLink to="/aviso-de-privacidad">
//               <p className="text-[18px] text-[#555]  hover:text-[#FF6600]">
//                 Aviso de privacidad
//               </p>
//             </NavLink>
//             <NavLink to="/politica-de-privacidad">
//               <p className="text-[18px] text-[#555]  hover:text-[#FF6600]">
//                 Política de privacidad
//               </p>
//             </NavLink>
//             <NavLink to="/terminos-y-condiciones">
//               <p className="text-[18px] text-[#555]  hover:text-[#FF6600]">
//                 Términos y condiciones
//               </p>
//             </NavLink>
//           </nav>

//           {/* Contacto */}
//           <address className="not-italic">
//             <h2 className="text-[18px]  uppercase text-[#333] font-medium mb-4">
//               Contacto
//             </h2>
//             <p className="text-[18px] text-[#555]  mb-3">
//               Email: contacto@viajaatudestino.com
//             </p>
//             <p className="text-[18px] text-[#555]  mb-3">
//               WhatsApp: 998 495 4637
//             </p>
//             <div className="flex items-center gap-3">
//               <span className="text-[18px] text-[#555] ">Síguenos</span>
//               <a
//                 href="https://www.facebook.com/viajaatudestinoMx"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {" "}
//                 <FaFacebook className="mr-2 text-2xl text-[#555]  hover:text-[#FF6600]" />{" "}
//               </a>{" "}
//               <a
//                 href="https://www.instagram.com/viajaatudestinomx/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {" "}
//                 <FaInstagram className="text-2xl text-black  hover:text-[#FF6600]" />{" "}
//               </a>{" "}
//             </div>
//           </address>
//         </div>

//         {/* Footer bottom */}
//         <div className="bg-[#f0f0f0] flex flex-col md:flex-row justify-between items-center py-4 text-[15px] md:px-20">
//           <p className="text-[#555]  text-center font-medium">
//             © 2026 viajaatudestino.com. Todos los derechos reservados.
//           </p>

//           <span className="text-[#555]  font-medium">
//             ✈️ Cazamos las mejores ofertas de viaje para ti
//           </span>
//         </div>
//       </footer>
//     </React.Fragment>
//   );
// }

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";

import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaArrowRight,
  FaSuitcaseRolling,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-[#012f5f] text-white">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#0260fe]/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[#ff6600]/20 blur-3xl" />

      {/* ====================================================== */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-12 lg:pt-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.1fr]">
          {/* MARCA */}

          <div>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
              Cazamos las mejores ofertas de viaje para ti. Encuentra hoteles,
              vuelos, paquetes y experiencias con promociones exclusivas y
              opciones de pago flexibles.
            </p>

            {/* Redes */}

            <div className="mt-7">
              <p className="text-sm font-bold text-white">
                Síguenos en redes sociales
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://www.facebook.com/viajaatudestinomx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-lg transition hover:-translate-y-1 hover:border-white/30 hover:bg-[#0260fe]"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://www.instagram.com/viajaatudestinomx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-lg transition hover:-translate-y-1 hover:border-white/30 hover:bg-gradient-to-br hover:from-purple-600 hover:to-orange-500"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://wa.me/529984954637"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-lg transition hover:-translate-y-1 hover:border-white/30 hover:bg-[#25D366]"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* VIAJES */}

          <div>
            <h3 className="text-base font-black uppercase tracking-wider text-orange-300">
              Encuentra tu viaje
            </h3>

            <nav className="mt-6 flex flex-col gap-4">
              {[
                { name: "Ofertas", path: "/ofertas" },
                { name: "Paquetes", path: "/paquetes" },
                { name: "Hoteles", path: "/hoteles" },
                { name: "Tours", path: "/tours" },
                { name: "Blog de viajes", path: "/blog" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff6600] transition group-hover:scale-150" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* LEGALES */}

          <div>
            <h3 className="text-base font-black uppercase tracking-wider text-orange-300">
              Información
            </h3>

            <nav className="mt-6 flex flex-col gap-4">
              {[
                {
                  name: "Aviso de privacidad",
                  path: "/aviso-de-privacidad",
                },
                {
                  name: "Política de privacidad",
                  path: "/politica-de-privacidad",
                },
                {
                  name: "Términos y condiciones",
                  path: "/terminos-y-condiciones",
                },
                {
                  name: "Preguntas frecuentes",
                  path: "/preguntas-frecuentes",
                },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff6600] transition group-hover:scale-150" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* CONTACTO */}

          <div>
            <h3 className="text-base font-black uppercase tracking-wider text-orange-300">
              Contacto
            </h3>

            <div className="mt-6 space-y-5">
              <a
                href="tel:+529984954637"
                className="group flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-300 transition group-hover:bg-[#ff6600] group-hover:text-white">
                  <FaPhoneAlt />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                    Teléfono
                  </p>

                  <p className="mt-1 break-words text-sm font-bold text-white/80 transition group-hover:text-white">
                    998 495 4637
                  </p>
                </div>
              </a>

              <a
                href="mailto:contacto@viajaatudestino.com"
                className="group flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-300 transition group-hover:bg-[#ff6600] group-hover:text-white">
                  <FaEnvelope />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                    Correo
                  </p>

                  <p className="mt-1 break-all text-sm font-bold text-white/80 transition group-hover:text-white">
                    contacto@viajaatudestino.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-300">
                  <FaMapMarkerAlt />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                    Ubicación
                  </p>

                  <p className="mt-1 text-sm font-bold leading-relaxed text-white/80">
                    Cancún, Quintana Roo, México
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* ELEMENTOS DE CONFIANZA */}
        {/* ====================================================== */}

        <div className="mt-14 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:grid-cols-3 sm:p-5">
          <div className="flex items-center gap-4 rounded-2xl p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-400/15 text-blue-300">
              <FaShieldAlt />
            </div>

            <div>
              <p className="text-sm font-black">Compra protegida</p>
              <p className="mt-1 text-xs text-white/50">
                Reserva con proveedores autorizados
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-400/15 text-orange-300">
              <FaCreditCard />
            </div>

            <div>
              <p className="text-sm font-black">Pagos flexibles</p>
              <p className="mt-1 text-xs text-white/50">
                Promociones y meses sin intereses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-400/15 text-green-300">
              <FaHeadset />
            </div>

            <div>
              <p className="text-sm font-black">Atención personalizada</p>
              <p className="mt-1 text-xs text-white/50">
                Acompañamiento antes y durante tu viaje
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* BARRA INFERIOR */}
      {/* ====================================================== */}

      <div className="relative border-t border-white/10 bg-black/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-center text-xs text-white/50 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p>
            © {currentYear} viajaatudestino.com. Todos los derechos reservados.
          </p>

          <p className="font-semibold text-white/60">
            ✈️ Cazamos las mejores ofertas de viaje para ti
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
