import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const policySections = [
  {
    id: "responsable",
    number: "01",
    title: "Responsable del tratamiento",
    content: (
      <>
        <p>
          <strong>VIAJA A TU DESTINO, S.A.S. DE C.V.</strong>, en adelante{" "}
          <strong>“Viaja a tu Destino”</strong>, es responsable del tratamiento,
          protección y resguardo de los datos personales proporcionados por sus
          clientes, usuarios y visitantes.
        </p>

        <p>
          El domicilio fiscal del responsable se encuentra en Mallorca Norte E-A
          D-209, Supermanzana 260, Manzana 73, Lote 2, Privada Talaia, Real
          Valencia, Cancún, Quintana Roo, C.P. 77539.
        </p>

        <p>
          Esta Política de Privacidad describe la forma en que obtenemos,
          utilizamos, almacenamos, protegemos y, cuando resulte necesario,
          compartimos la información personal relacionada con nuestros servicios
          turísticos.
        </p>
      </>
    ),
  },
  {
    id: "datos-recabados",
    number: "02",
    title: "Datos personales que recabamos",
    content: (
      <>
        <p>
          Para proporcionar nuestros servicios, elaborar cotizaciones y
          gestionar solicitudes de viaje, podemos recabar los siguientes datos:
        </p>

        <ul>
          <li>Nombre y apellidos.</li>
          <li>Correo electrónico.</li>
          <li>Número telefónico.</li>
          <li>Ciudad o aeropuerto de origen.</li>
          <li>Destino de interés.</li>
          <li>Fechas previstas de viaje.</li>
          <li>Número de adultos, menores o viajeros.</li>
          <li>Preferencias de hospedaje y servicios turísticos.</li>
          <li>
            Información necesaria para elaborar o gestionar una reservación.
          </li>
        </ul>

        <p>
          Cuando sea indispensable para formalizar una reservación, también
          podremos solicitar información adicional relacionada con los
          pasajeros, siempre que resulte necesaria para prestar el servicio
          solicitado.
        </p>
      </>
    ),
  },
  {
    id: "obtencion",
    number: "03",
    title: "Medios de obtención de los datos",
    content: (
      <>
        <p>
          Los datos personales pueden ser recabados directamente cuando el
          usuario se comunica con Viaja a tu Destino o utiliza alguno de
          nuestros canales de atención.
        </p>

        <p>La información podrá obtenerse mediante:</p>

        <ul>
          <li>Formularios disponibles en nuestro sitio web.</li>
          <li>Conversaciones por WhatsApp o servicios de mensajería.</li>
          <li>Correo electrónico.</li>
          <li>Llamadas telefónicas.</li>
          <li>Redes sociales.</li>
          <li>Solicitudes de cotización.</li>
          <li>Procesos de reservación.</li>
          <li>
            Fuentes de acceso público permitidas por la legislación aplicable.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "finalidades",
    number: "04",
    title: "Finalidades del tratamiento",
    content: (
      <>
        <p>
          Los datos personales proporcionados serán utilizados principalmente
          para atender solicitudes relacionadas con nuestros productos y
          servicios turísticos.
        </p>

        <p className="font-bold text-slate-800">Finalidades necesarias:</p>

        <ul>
          <li>Elaborar cotizaciones de hoteles, vuelos, tours y paquetes.</li>
          <li>Contactar al usuario para dar seguimiento a su solicitud.</li>
          <li>Confirmar disponibilidad, precios y condiciones del servicio.</li>
          <li>Gestionar reservaciones con proveedores turísticos.</li>
          <li>Procesar solicitudes de cambios o cancelaciones.</li>
          <li>Brindar atención antes, durante y después del viaje.</li>
          <li>
            Cumplir las obligaciones derivadas de los servicios contratados.
          </li>
          <li>Atender aclaraciones, dudas, comentarios o reclamaciones.</li>
          <li>Cumplir requerimientos de autoridades competentes.</li>
        </ul>

        <p className="font-bold text-slate-800">Finalidades secundarias:</p>

        <ul>
          <li>Enviar promociones, ofertas y descuentos.</li>
          <li>Informar sobre nuevos productos o servicios.</li>
          <li>Realizar encuestas de satisfacción.</li>
          <li>Evaluar y mejorar la calidad de nuestros servicios.</li>
          <li>Realizar análisis estadísticos y estudios de mercado.</li>
          <li>Mostrar publicidad relacionada con intereses de viaje.</li>
        </ul>

        <p>
          El usuario podrá solicitar en cualquier momento que sus datos no sean
          utilizados para las finalidades secundarias.
        </p>
      </>
    ),
  },
  {
    id: "pagos",
    number: "05",
    title: "Información relacionada con pagos",
    content: (
      <>
        <p>
          Cuando sea necesario procesar el pago de una reservación, podrán
          solicitarse datos financieros o bancarios indispensables para
          completar la operación.
        </p>

        <p>
          En determinados casos, los pagos podrán ser procesados directamente
          por instituciones bancarias, plataformas de pago o proveedores
          turísticos externos. El tratamiento realizado por dichos terceros
          estará sujeto a sus propios avisos y políticas de privacidad.
        </p>

        <p>
          Viaja a tu Destino únicamente utilizará la información relacionada con
          el pago para gestionar la operación solicitada, verificarla, atender
          aclaraciones y cumplir las obligaciones legales aplicables.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    number: "06",
    title: "Cookies y tecnologías de seguimiento",
    content: (
      <>
        <p>
          Nuestro sitio web puede utilizar cookies y tecnologías similares para
          reconocer el dispositivo del usuario, recordar preferencias, analizar
          el funcionamiento del sitio y mejorar la experiencia de navegación.
        </p>

        <p>Estas tecnologías podrán utilizarse para:</p>

        <ul>
          <li>Conocer el número de visitas a nuestro sitio.</li>
          <li>Analizar las páginas y ofertas consultadas.</li>
          <li>Medir el rendimiento de campañas publicitarias.</li>
          <li>Recordar determinadas preferencias del usuario.</li>
          <li>Mejorar la navegación y funcionamiento de la página.</li>
          <li>Mostrar anuncios relacionados con viajes y turismo.</li>
          <li>Realizar mediciones estadísticas y de audiencia.</li>
        </ul>

        <p>
          Podremos utilizar servicios de análisis y publicidad proporcionados
          por terceros, incluyendo herramientas de Google y plataformas de redes
          sociales, las cuales podrían instalar sus propias cookies.
        </p>

        <p>
          El usuario puede bloquear, restringir o eliminar las cookies desde la
          configuración de su navegador. La desactivación de determinadas
          cookies podría afectar algunas funciones del sitio web.
        </p>
      </>
    ),
  },
  {
    id: "transferencias",
    number: "07",
    title: "Transferencia de datos personales",
    content: (
      <>
        <p>
          Para gestionar una cotización o reservación, los datos personales
          podrán ser compartidos dentro o fuera de México con terceros que
          participen en la prestación del servicio solicitado.
        </p>

        <p>Entre dichos terceros pueden encontrarse:</p>

        <ul>
          <li>Hoteles y establecimientos de hospedaje.</li>
          <li>Aerolíneas.</li>
          <li>Operadores de tours y actividades.</li>
          <li>Empresas de transportación y traslados.</li>
          <li>Mayoristas y consolidadores turísticos.</li>
          <li>Plataformas y motores de reservaciones.</li>
          <li>Instituciones bancarias y procesadores de pago.</li>
          <li>Compañías aseguradoras.</li>
          <li>Autoridades competentes cuando exista una obligación legal.</li>
        </ul>

        <p>
          Los terceros que reciban los datos deberán utilizarlos únicamente para
          cumplir las finalidades relacionadas con la contratación, operación o
          prestación de los servicios correspondientes.
        </p>
      </>
    ),
  },
  {
    id: "derechos-arco",
    number: "08",
    title: "Derechos ARCO",
    content: (
      <>
        <p>
          El titular podrá ejercer en cualquier momento sus derechos de{" "}
          <strong>Acceso, Rectificación, Cancelación y Oposición</strong>,
          conocidos como derechos ARCO.
        </p>

        <ul>
          <li>
            <strong>Acceso:</strong> conocer qué datos personales conservamos y
            cómo son utilizados.
          </li>

          <li>
            <strong>Rectificación:</strong> solicitar la corrección o
            actualización de datos incorrectos o incompletos.
          </li>

          <li>
            <strong>Cancelación:</strong> solicitar la eliminación de los datos
            cuando considere que ya no son necesarios.
          </li>

          <li>
            <strong>Oposición:</strong> solicitar que sus datos no sean tratados
            para determinadas finalidades.
          </li>
        </ul>

        <p>La solicitud deberá incluir:</p>

        <ul>
          <li>Nombre completo del titular.</li>
          <li>Domicilio o medio para recibir notificaciones.</li>
          <li>Documento que acredite su identidad.</li>
          <li>
            En su caso, documento que acredite la representación del titular.
          </li>
          <li>
            Descripción clara de los datos personales relacionados con la
            solicitud.
          </li>
          <li>Descripción del derecho que desea ejercer.</li>
          <li>
            Cualquier documento que facilite la localización de la información.
          </li>
        </ul>

        <p>
          Viaja a tu Destino comunicará la determinación adoptada dentro del
          plazo establecido por la legislación aplicable. Cuando la solicitud
          resulte procedente, se implementarán las acciones correspondientes
          dentro del plazo legal.
        </p>
      </>
    ),
  },
  {
    id: "revocacion",
    number: "09",
    title: "Revocación y limitación del consentimiento",
    content: (
      <>
        <p>
          El titular podrá revocar el consentimiento otorgado para el
          tratamiento de sus datos personales o solicitar que se limite su uso y
          divulgación.
        </p>

        <p>
          También podrá cancelar su suscripción a promociones, publicidad,
          ofertas y comunicaciones comerciales enviando una solicitud al correo:
        </p>

        <a
          href="mailto:contacto@viajaatudestino.com?subject=Limitación del uso de datos personales"
          className="inline-flex break-all font-bold text-[#0260fe] underline decoration-[#0260fe]/30 underline-offset-4 transition hover:text-[#ff6600]"
        >
          contacto@viajaatudestino.com
        </a>

        <p>
          La revocación no tendrá efectos retroactivos ni impedirá el
          cumplimiento de obligaciones legales, contractuales o administrativas
          previamente adquiridas.
        </p>
      </>
    ),
  },
  {
    id: "seguridad",
    number: "10",
    title: "Protección y seguridad de la información",
    content: (
      <>
        <p>
          Viaja a tu Destino implementa medidas administrativas, técnicas y
          organizacionales razonables para proteger los datos personales contra
          daño, pérdida, alteración, destrucción, acceso, uso o divulgación no
          autorizados.
        </p>

        <p>
          El acceso a la información se limita al personal, proveedores y
          colaboradores que necesitan conocerla para cumplir las finalidades
          descritas en esta Política de Privacidad.
        </p>

        <p>
          Ninguna transmisión o sistema de almacenamiento electrónico puede
          considerarse completamente infalible. Por ello, revisamos y mejoramos
          periódicamente nuestras medidas de protección.
        </p>
      </>
    ),
  },
  {
    id: "terceros",
    number: "11",
    title: "Enlaces y servicios de terceros",
    content: (
      <>
        <p>
          Nuestro sitio web puede contener enlaces a páginas, plataformas,
          motores de reservación o servicios administrados por terceros.
        </p>

        <p>
          Al abandonar nuestro sitio web, la información proporcionada al
          tercero estará sujeta a sus propios términos, condiciones, avisos y
          políticas de privacidad.
        </p>

        <p>
          Viaja a tu Destino no controla las prácticas de privacidad de sitios
          externos. Recomendamos revisar sus políticas antes de proporcionar
          información personal o realizar una reservación.
        </p>
      </>
    ),
  },
  {
    id: "cambios",
    number: "12",
    title: "Cambios a esta Política de Privacidad",
    content: (
      <>
        <p>
          Viaja a tu Destino podrá modificar o actualizar esta Política de
          Privacidad como consecuencia de cambios legales, operativos,
          comerciales, tecnológicos o relacionados con nuestros servicios.
        </p>

        <p>
          Las modificaciones estarán disponibles en nuestro sitio web. Cuando el
          cambio sea relevante, también podremos comunicarlo mediante correo
          electrónico, redes sociales u otros medios de contacto disponibles.
        </p>

        <p>
          Se recomienda consultar periódicamente esta sección para conocer la
          versión más reciente de la Política de Privacidad.
        </p>
      </>
    ),
  },
];

function PrivacyIcon() {
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
        d="M9 11V9.5C9 7.84 10.34 6.5 12 6.5C13.66 6.5 15 7.84 15 9.5V11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <rect
        x="8"
        y="11"
        width="8"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M4 6H20V18H4V6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M4 7L12 13L20 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrivacyPolicy() {
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
          <div className="absolute right-[15%] top-10 h-24 w-24 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur">
                <PrivacyIcon />
              </div>

              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur">
                Seguridad y confidencialidad
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Política de privacidad
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Conoce cómo recopilamos, utilizamos y protegemos la información
                personal que compartes con Viaja a tu Destino.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/80">
                <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                  Información protegida
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                  Derechos ARCO
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                  Uso responsable
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido */}
        <section className="px-4 py-10 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[290px_minmax(0,1fr)]">
            {/* Índice lateral */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                  Contenido
                </p>

                <nav aria-label="Secciones de la política de privacidad">
                  <ul className="space-y-1.5">
                    {policySections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="group flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-[#0260fe]/5 hover:text-[#0260fe]"
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

            <article>
              {/* Introducción */}
              <div className="mb-8 overflow-hidden rounded-3xl border border-[#0260fe]/10 bg-white shadow-sm">
                <div className="h-1.5 bg-gradient-to-r from-[#0260fe] to-[#ff6600]" />

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe]">
                      <PrivacyIcon />
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-[#023e73] sm:text-2xl">
                        Tu privacidad es importante
                      </h2>

                      <p className="mt-3 text-base leading-8 text-slate-600">
                        Viaja a tu Destino está comprometida con la
                        confidencialidad, seguridad y tratamiento responsable de
                        la información proporcionada por sus clientes y
                        usuarios.
                      </p>

                      <p className="mt-3 text-sm font-semibold text-slate-500">
                        Última actualización: 26 de julio de 2026.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secciones */}
              <div className="space-y-6">
                {policySections.map((section) => (
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
                        [&_strong]:font-bold
                        [&_strong]:text-slate-800
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
              <section className="relative mt-8 overflow-hidden rounded-3xl bg-[#023e73] p-7 text-white shadow-xl sm:p-10">
                <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#0260fe]/40 blur-3xl" />
                <div className="absolute -bottom-24 -left-12 h-48 w-48 rounded-full bg-[#ff6600]/20 blur-3xl" />

                <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#79b5ff]">
                      Contacto de privacidad
                    </p>

                    <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                      ¿Necesitas ejercer tus derechos?
                    </h2>

                    <p className="mt-3 max-w-2xl leading-7 text-white/75">
                      Envíanos tu solicitud para acceder, rectificar, cancelar,
                      limitar u oponerte al tratamiento de tus datos personales.
                    </p>

                    <p className="mt-3 text-sm text-white/60">
                      Mallorca Norte E-A D-209, Real Valencia, Cancún, Quintana
                      Roo, C.P. 77539.
                    </p>
                  </div>

                  <a
                    href="mailto:contacto@viajaatudestino.com?subject=Solicitud relacionada con datos personales"
                    className="inline-flex flex-none items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-6 py-4 text-center text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-xl"
                  >
                    <MailIcon />
                    Enviar solicitud
                  </a>
                </div>
              </section>

              <p className="mt-8 text-center text-sm leading-6 text-slate-500">
                Al utilizar nuestros canales y servicios, reconoces haber
                consultado esta Política de Privacidad.
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

export default PrivacyPolicy;
