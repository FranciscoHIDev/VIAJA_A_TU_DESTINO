import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const privacySections = [
  {
    id: "responsable",
    number: "01",
    title: "Identidad y domicilio del responsable",
    content: (
      <>
        <p>
          Para efectos del presente Aviso de Privacidad,{" "}
          <strong>VIAJA A TU DESTINO, S.A.S. DE C.V.</strong>, en adelante{" "}
          <strong>“LA RESPONSABLE”</strong>, es responsable de la obtención,
          divulgación, almacenamiento, uso, acceso, manejo, aprovechamiento,
          transferencia o disposición de sus datos personales, actividades que
          en conjunto se denominarán el <strong>“Tratamiento”</strong>.
        </p>

        <p>
          LA RESPONSABLE tiene su domicilio fiscal en Mallorca Norte E-A D-209,
          Supermanzana 260, Manzana 73, Lote 2, Privada Talaia, Real Valencia,
          Cancún, Quintana Roo, C.P. 77539.
        </p>
      </>
    ),
  },
  {
    id: "informacion",
    number: "02",
    title: "Información que recabamos",
    content: (
      <>
        <p>
          LA RESPONSABLE recaba información proporcionada voluntariamente por
          sus clientes, usuarios o cualquier tercero que tenga acceso a sus
          productos y servicios, ya sea a través de sus canales de atención,
          formularios, medios electrónicos o sitio web.
        </p>

        <p>La información que se puede solicitar incluye:</p>

        <ul>
          <li>Nombre y apellidos.</li>
          <li>Correo electrónico.</li>
          <li>Número telefónico.</li>
          <li>Información relacionada con solicitudes de viaje.</li>
          <li>Destino, fechas y número de viajeros.</li>
        </ul>

        <p>
          Esta información permite contactar a los usuarios cuando sea
          necesario. Los usuarios podrán ser contactados por teléfono, correo
          electrónico o medios de mensajería para solicitar información
          adicional, elaborar una cotización o completar alguna transacción.
        </p>
      </>
    ),
  },
  {
    id: "finalidades",
    number: "03",
    title: "Finalidades del tratamiento de datos personales",
    content: (
      <>
        <p>
          El tratamiento de los datos personales del titular tendrá como
          finalidad principal prestar los servicios solicitados y mantener la
          comunicación necesaria durante el proceso de cotización, reservación y
          atención al cliente.
        </p>

        <p>Sus datos personales podrán utilizarse para:</p>

        <ul>
          <li>Elaborar cotizaciones y paquetes de viaje.</li>
          <li>Gestionar solicitudes de hoteles, vuelos, tours y traslados.</li>
          <li>Contactar al usuario para dar seguimiento a su solicitud.</li>
          <li>Procesar reservaciones y solicitudes de servicio.</li>
          <li>
            Proporcionar productos o servicios acordes con sus necesidades.
          </li>
          <li>Atender requerimientos legales de autoridades competentes.</li>
          <li>
            Informar sobre productos, promociones, beneficios, descuentos,
            concursos o novedades.
          </li>
          <li>
            Realizar estudios de mercado y análisis de nuestros servicios.
          </li>
          <li>
            Dar cumplimiento a los términos y condiciones aplicables a la
            prestación de nuestros servicios.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "limitacion",
    number: "04",
    title: "Limitación del uso o divulgación de los datos",
    content: (
      <>
        <p>
          Los datos personales del titular serán mantenidos bajo estricta
          confidencialidad, de conformidad con las medidas de seguridad
          administrativas, técnicas y físicas implementadas por LA RESPONSABLE.
        </p>

        <p>
          Queda prohibida su divulgación ilícita y se limitará su uso o
          transferencia a terceros únicamente en los casos necesarios para la
          prestación de los servicios contratados o conforme a lo previsto en
          este Aviso de Privacidad y en la legislación aplicable.
        </p>
      </>
    ),
  },
  {
    id: "derechos-arco",
    number: "05",
    title: "Ejercicio de los derechos ARCO",
    content: (
      <>
        <p>
          El titular de los datos personales podrá ejercer sus derechos de
          acceso, rectificación, cancelación y oposición, así como solicitar la
          limitación de su uso, divulgación o revocación del consentimiento.
        </p>

        <p>
          La solicitud podrá enviarse al correo electrónico{" "}
          <a
            href="mailto:contacto@viajaatudestino.com"
            className="font-bold text-[#0260fe] underline decoration-[#0260fe]/30 underline-offset-4 transition hover:text-[#ff6600]"
          >
            contacto@viajaatudestino.com
          </a>{" "}
          o presentarse por escrito en el domicilio de LA RESPONSABLE.
        </p>

        <p>La solicitud deberá contener:</p>

        <ul>
          <li>Nombre completo del titular.</li>
          <li>Domicilio o correo electrónico para recibir una respuesta.</li>
          <li>Documentos que acrediten su identidad o representación legal.</li>
          <li>
            Descripción clara de los datos personales sobre los que desea
            ejercer algún derecho.
          </li>
          <li>
            Descripción del derecho que desea ejercer o de la solicitud que
            presenta.
          </li>
          <li>
            Cualquier documento que facilite la localización de sus datos.
          </li>
        </ul>

        <p>
          En las solicitudes de rectificación, el titular deberá indicar las
          modificaciones solicitadas y proporcionar la documentación que
          sustente su petición.
        </p>
      </>
    ),
  },
  {
    id: "transferencias",
    number: "06",
    title: "Uso y transferencia de datos personales",
    content: (
      <>
        <p>
          LA RESPONSABLE podrá compartir datos personales con proveedores,
          agentes, operadores, patrocinadores o terceros con los que mantenga
          una relación comercial, cuando sea necesario para administrar,
          gestionar o proporcionar eficazmente los servicios solicitados.
        </p>

        <p>Los datos personales podrán utilizarse para:</p>

        <ul>
          <li>Ofrecer servicios adecuados a las necesidades del usuario.</li>
          <li>Brindar una mejor atención.</li>
          <li>Gestionar reservaciones y servicios turísticos.</li>
          <li>Mejorar nuestros servicios y procesos internos.</li>
          <li>
            Prevenir, detectar y reportar actos u operaciones contrarias a la
            legislación aplicable.
          </li>
        </ul>

        <p>
          Fuera de los supuestos señalados, LA RESPONSABLE únicamente revelará
          datos personales cuando exista una obligación legal, una solicitud de
          autoridad competente o cualquiera de los casos permitidos por la
          legislación aplicable.
        </p>
      </>
    ),
  },
];

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-8 w-8">
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
  );
}

function NoticeOfPrivacy() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f8ff]">
      <header className="relative z-50">
        <NavBar />
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#023e73] via-[#0260fe] to-[#3794ff] px-5 py-16 text-white md:py-24">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[#ff6600]/20 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <div className="flex max-w-3xl flex-col items-start">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur">
                <ShieldIcon />
              </div>

              <span className="mb-4 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur">
                Protección de datos personales
              </span>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Aviso de privacidad
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Conoce cómo Viaja a tu Destino obtiene, utiliza, protege y
                administra la información personal proporcionada por sus
                clientes y usuarios.
              </p>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <section className="px-4 py-10 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Índice */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                  Contenido
                </p>

                <nav aria-label="Secciones del aviso de privacidad">
                  <ul className="space-y-2">
                    {privacySections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="group flex items-start gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-[#0260fe]/5 hover:text-[#0260fe]"
                        >
                          <span className="mt-0.5 text-xs font-black text-[#ff6600]">
                            {section.number}
                          </span>

                          <span>{section.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Aviso */}
            <article>
              <div className="mb-8 rounded-3xl border border-[#0260fe]/10 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-1 flex-none rounded-full bg-[#ff6600]" />

                  <p className="text-base leading-8 text-slate-700 md:text-lg">
                    De conformidad con lo dispuesto por la legislación aplicable
                    en materia de protección de datos personales en posesión de
                    particulares, se emite el presente Aviso de Privacidad.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {privacySections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-8 md:p-10"
                  >
                    <div className="mb-7 flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start">
                      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[#0260fe]/10 text-sm font-black text-[#0260fe]">
                        {section.number}
                      </span>

                      <h2 className="text-xl font-black leading-tight text-[#023e73] sm:text-2xl">
                        {section.title}
                      </h2>
                    </div>

                    <div
                      className="
                        space-y-5 text-base leading-8 text-slate-600
                        [&_strong]:font-bold [&_strong]:text-slate-800
                        [&_ul]:space-y-3
                        [&_ul]:pl-1
                        [&_li]:relative
                        [&_li]:pl-7
                        [&_li]:before:absolute
                        [&_li]:before:left-0
                        [&_li]:before:top-[11px]
                        [&_li]:before:h-2
                        [&_li]:before:w-2
                        [&_li]:before:rounded-full
                        [&_li]:before:bg-[#ff6600]
                      "
                    >
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>

              {/* Contacto */}
              <section className="mt-8 overflow-hidden rounded-3xl bg-[#023e73] p-7 text-white shadow-xl sm:p-10">
                <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#79b5ff]">
                      Atención de datos personales
                    </p>

                    <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                      ¿Tienes alguna solicitud?
                    </h2>

                    <p className="mt-3 max-w-2xl leading-7 text-white/75">
                      Puedes comunicarte con nosotros para ejercer tus derechos
                      relacionados con el acceso, rectificación, cancelación u
                      oposición de tus datos personales.
                    </p>
                  </div>

                  <a
                    href="mailto:contacto@viajaatudestino.com?subject=Solicitud relacionada con datos personales"
                    className="inline-flex flex-none items-center justify-center rounded-2xl bg-[#ff6600] px-6 py-4 text-center text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-xl"
                  >
                    Enviar solicitud
                  </a>
                </div>
              </section>

              <p className="mt-8 text-center text-sm leading-6 text-slate-500">
                Viaja a tu Destino protege la información proporcionada por sus
                clientes y usuarios.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default NoticeOfPrivacy;
