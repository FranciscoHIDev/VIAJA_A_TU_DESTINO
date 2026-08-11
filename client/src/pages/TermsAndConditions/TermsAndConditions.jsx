import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO/SEO";

const termsSections = [
  {
    id: "aceptacion",
    number: "01",
    title: "Aceptación de los términos",
    content: (
      <>
        <p>
          Los presentes Términos y Condiciones regulan el acceso, navegación y
          uso del sitio web <strong>viajaatudestino.com</strong>, así como las
          solicitudes de información, cotización y servicios turísticos
          realizadas a través de nuestros medios de contacto.
        </p>

        <p>
          Al ingresar, navegar, solicitar una cotización o utilizar cualquiera
          de nuestros servicios, el usuario reconoce haber leído y comprendido
          estos Términos y Condiciones.
        </p>

        <p>
          Si el usuario no está de acuerdo con su contenido, deberá abstenerse
          de utilizar el sitio web y sus servicios.
        </p>
      </>
    ),
  },
  {
    id: "responsable",
    number: "02",
    title: "Identidad del responsable",
    content: (
      <>
        <p>
          El sitio web es operado por{" "}
          <strong>VIAJA A TU DESTINO, S.A.S. DE C.V.</strong>, en adelante{" "}
          <strong>“Viaja a tu Destino”</strong>.
        </p>

        <p>
          El domicilio fiscal se encuentra en Mallorca Norte E-A D-209,
          Supermanzana 260, Manzana 73, Lote 2, Privada Talaia, Real Valencia,
          Cancún, Quintana Roo, C.P. 77539.
        </p>

        <p>
          Para aclaraciones relacionadas con el sitio, las cotizaciones o los
          servicios ofrecidos, el usuario podrá comunicarse mediante el correo:
        </p>

        <a
          href="mailto:contacto@viajaatudestino.com"
          className="inline-flex break-all font-bold text-[#0260fe] underline decoration-[#0260fe]/30 underline-offset-4 transition hover:text-[#ff6600]"
        >
          contacto@viajaatudestino.com
        </a>
      </>
    ),
  },
  {
    id: "servicios",
    number: "03",
    title: "Naturaleza de nuestros servicios",
    content: (
      <>
        <p>
          Viaja a tu Destino proporciona información, promociones,
          recomendaciones, asistencia, cotizaciones y acceso a servicios
          turísticos, entre los que pueden encontrarse:
        </p>

        <ul>
          <li>Hospedaje.</li>
          <li>Vuelos.</li>
          <li>Paquetes de vuelo y hotel.</li>
          <li>Tours y actividades.</li>
          <li>Traslados.</li>
          <li>Seguros y otros servicios relacionados con viajes.</li>
        </ul>

        <p>
          Algunos servicios podrán ser cotizados o gestionados directamente por
          Viaja a tu Destino, mientras que otros podrán contratarse mediante
          enlaces, motores de reservación, plataformas o proveedores externos.
        </p>

        <p>
          Cuando la operación se complete en una plataforma externa, el usuario
          estará sujeto también a los términos, políticas y condiciones del
          proveedor que procese la reservación o el pago.
        </p>
      </>
    ),
  },
  {
    id: "ofertas",
    number: "04",
    title: "Ofertas, precios y disponibilidad",
    content: (
      <>
        <p>
          Las tarifas, promociones y ofertas publicadas están sujetas a
          disponibilidad al momento de realizar la cotización o reservación.
        </p>

        <p>
          Salvo que se indique expresamente algo distinto, los precios pueden
          variar por factores como:
        </p>

        <ul>
          <li>Destino y temporada de viaje.</li>
          <li>Fechas seleccionadas.</li>
          <li>Número y edad de los viajeros.</li>
          <li>Tipo de habitación.</li>
          <li>Ciudad o aeropuerto de salida.</li>
          <li>Disponibilidad del proveedor.</li>
          <li>Impuestos, tarifas aeroportuarias o cargos adicionales.</li>
          <li>Tipo de cambio aplicable.</li>
        </ul>

        <p>
          Las imágenes de hoteles, habitaciones, destinos y servicios son
          ilustrativas. La distribución, decoración, amenidades o
          características reales pueden variar conforme al proveedor
          seleccionado.
        </p>

        <p>
          Una publicación, anuncio o cotización preliminar no garantiza el
          precio ni la disponibilidad hasta que la reservación haya sido
          confirmada.
        </p>
      </>
    ),
  },
  {
    id: "reservaciones",
    number: "05",
    title: "Cotizaciones y confirmación de reservaciones",
    content: (
      <>
        <p>
          Las cotizaciones se elaboran con la información proporcionada por el
          usuario y con la disponibilidad existente al momento de la consulta.
        </p>

        <p>
          El usuario deberá verificar cuidadosamente antes de realizar cualquier
          pago:
        </p>

        <ul>
          <li>Nombres completos de los viajeros.</li>
          <li>Destino y fechas de viaje.</li>
          <li>Hotel, vuelo, habitación o servicio seleccionado.</li>
          <li>Régimen de alimentos.</li>
          <li>Políticas para menores.</li>
          <li>Servicios incluidos y no incluidos.</li>
          <li>Precio total y forma de pago.</li>
          <li>Políticas de cambios y cancelaciones.</li>
        </ul>

        <p>
          Una reservación se considerará confirmada únicamente cuando se haya
          procesado el pago requerido y el usuario reciba un número de
          confirmación, clave de reservación, cupón, boleto o documento
          equivalente.
        </p>

        <p>
          Los mensajes, capturas de pantalla o publicaciones promocionales no
          sustituyen la confirmación formal emitida para cada servicio.
        </p>
      </>
    ),
  },
  {
    id: "pagos",
    number: "06",
    title: "Pagos y comprobantes",
    content: (
      <>
        <p>
          Los pagos podrán procesarse mediante Viaja a tu Destino, instituciones
          financieras, plataformas de pago, motores de reservación o proveedores
          turísticos autorizados.
        </p>

        <p>
          Antes de realizar el pago, el usuario deberá confirmar que el medio,
          enlace, cuenta o plataforma utilizada haya sido proporcionada por un
          canal oficial.
        </p>

        <p>
          Viaja a tu Destino no será responsable por depósitos realizados en
          cuentas, perfiles, números telefónicos o enlaces no autorizados o
          ajenos a sus canales oficiales.
        </p>

        <p>
          Cuando corresponda, el comprobante fiscal será emitido por la persona
          o empresa que haya recibido el pago y prestado o comercializado el
          servicio.
        </p>

        <p>
          Para solicitar facturación, el cliente deberá proporcionar información
          fiscal correcta dentro del periodo y conforme a los requisitos
          comunicados para la operación.
        </p>
      </>
    ),
  },
  {
    id: "cancelaciones",
    number: "07",
    title: "Cambios, cancelaciones y reembolsos",
    content: (
      <>
        <p>
          Las políticas de cambios, cancelaciones, penalizaciones y reembolsos
          dependen del hotel, aerolínea, operador, tarifa o proveedor
          contratado.
        </p>

        <p>
          Antes de confirmar una reservación, el usuario deberá revisar si la
          tarifa es:
        </p>

        <ul>
          <li>Reembolsable.</li>
          <li>No reembolsable.</li>
          <li>Modificable con penalización.</li>
          <li>Sujeta a fechas límite de cancelación.</li>
          <li>Sujeta a diferencias tarifarias.</li>
        </ul>

        <p>
          La solicitud de cancelación no garantiza la devolución total o parcial
          del importe pagado. Su procedencia dependerá de las condiciones
          aceptadas al momento de contratar.
        </p>

        <p>
          Cuando exista un reembolso autorizado, el plazo de procesamiento podrá
          depender del proveedor turístico, banco, plataforma o método de pago
          utilizado.
        </p>

        <p>
          Viaja a tu Destino brindará acompañamiento para presentar la
          solicitud, pero no podrá modificar unilateralmente las políticas
          establecidas por el proveedor.
        </p>
      </>
    ),
  },
  {
    id: "viajero",
    number: "08",
    title: "Obligaciones del viajero",
    content: (
      <>
        <p>
          Es responsabilidad del viajero proporcionar información completa,
          actualizada y verdadera para elaborar la cotización y efectuar la
          reservación.
        </p>

        <p>Asimismo, deberá:</p>

        <ul>
          <li>
            Verificar que sus nombres coincidan con su identificación oficial.
          </li>
          <li>
            Contar con identificaciones y documentos vigentes para viajar.
          </li>
          <li>
            Verificar requisitos migratorios, sanitarios y de entrada al
            destino.
          </li>
          <li>
            Presentarse oportunamente en aeropuertos, terminales y puntos de
            encuentro.
          </li>
          <li>Cumplir los reglamentos de hoteles, aerolíneas y operadores.</li>
          <li>
            Revisar horarios, terminales, políticas de equipaje y documentación.
          </li>
          <li>
            Informar con anticipación sobre necesidades especiales o movilidad
            reducida.
          </li>
        </ul>

        <p>
          Viaja a tu Destino no será responsable por servicios perdidos como
          consecuencia de documentación incorrecta, vencida o insuficiente,
          retrasos del viajero o incumplimiento de requisitos aplicables.
        </p>
      </>
    ),
  },
  {
    id: "proveedores",
    number: "09",
    title: "Proveedores turísticos y sitios externos",
    content: (
      <>
        <p>
          Los servicios contratados pueden ser prestados directamente por
          hoteles, aerolíneas, operadores, empresas de transportación,
          plataformas de reservación y otros proveedores independientes.
        </p>

        <p>
          Dichos proveedores son responsables de la correcta prestación de los
          servicios que operan directamente, conforme a las condiciones
          contratadas y a la legislación aplicable.
        </p>

        <p>
          El sitio puede contener enlaces a páginas administradas por terceros.
          Viaja a tu Destino no controla permanentemente su contenido,
          disponibilidad, seguridad o políticas.
        </p>

        <p>
          Antes de contratar en un sitio externo, el usuario deberá revisar su
          identidad, precio final, políticas de privacidad, condiciones de
          compra, cancelación y medios de atención.
        </p>
      </>
    ),
  },
  {
    id: "uso-sitio",
    number: "10",
    title: "Uso permitido del sitio",
    content: (
      <>
        <p>
          El usuario se compromete a utilizar el sitio web y sus canales
          únicamente para fines lícitos y relacionados con la consulta o
          contratación de servicios turísticos.
        </p>

        <p>Queda prohibido:</p>

        <ul>
          <li>Proporcionar información falsa o suplantar identidades.</li>
          <li>Realizar reservaciones fraudulentas o sin intención de pago.</li>
          <li>Alterar comprobantes, confirmaciones o documentos.</li>
          <li>Intentar vulnerar la seguridad del sitio.</li>
          <li>Introducir código malicioso, virus o sistemas automatizados.</li>
          <li>Copiar o extraer masivamente información del sitio.</li>
          <li>Utilizar el contenido para actividades ilícitas.</li>
          <li>
            Realizar acciones que afecten el funcionamiento de la plataforma.
          </li>
        </ul>

        <p>
          Viaja a tu Destino podrá restringir el acceso o rechazar operaciones
          cuando existan indicios razonables de fraude, suplantación, uso
          indebido o incumplimiento de estos términos.
        </p>
      </>
    ),
  },
  {
    id: "propiedad",
    number: "11",
    title: "Propiedad intelectual",
    content: (
      <>
        <p>
          Los nombres comerciales, logotipos, diseños, textos, fotografías,
          gráficos, elementos visuales y contenido original perteneciente a
          Viaja a tu Destino se encuentran protegidos por la legislación
          aplicable.
        </p>

        <p>
          El acceso al sitio no concede al usuario licencias, autorizaciones o
          derechos para reproducir, modificar, distribuir o explotar
          comercialmente dichos elementos.
        </p>

        <p>
          Algunas marcas, fotografías y contenidos pertenecen a hoteles,
          aerolíneas, destinos, operadores o proveedores externos y se muestran
          únicamente con fines informativos y comerciales relacionados con sus
          servicios.
        </p>
      </>
    ),
  },
  {
    id: "privacidad",
    number: "12",
    title: "Privacidad y datos personales",
    content: (
      <>
        <p>
          Los datos personales proporcionados por el usuario serán tratados
          conforme a nuestro Aviso y Política de Privacidad.
        </p>

        <p>
          La información podrá utilizarse para elaborar cotizaciones, gestionar
          reservaciones, brindar atención, cumplir obligaciones contractuales y,
          cuando proceda, enviar comunicaciones promocionales.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="/aviso-de-privacidad"
            className="inline-flex items-center justify-center rounded-xl bg-[#0260fe]/10 px-5 py-3 text-sm font-bold text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white"
          >
            Consultar aviso de privacidad
          </a>

          <a
            href="/politica-de-privacidad"
            className="inline-flex items-center justify-center rounded-xl bg-[#ff6600]/10 px-5 py-3 text-sm font-bold text-[#e85d00] transition hover:bg-[#ff6600] hover:text-white"
          >
            Consultar política de privacidad
          </a>
        </div>
      </>
    ),
  },
  {
    id: "comunicaciones",
    number: "13",
    title: "Comunicaciones electrónicas",
    content: (
      <>
        <p>
          El usuario acepta que las comunicaciones relacionadas con
          cotizaciones, reservaciones y solicitudes puedan realizarse mediante
          correo electrónico, teléfono, WhatsApp u otros medios electrónicos
          proporcionados por el propio usuario.
        </p>

        <p>
          Los mensajes y documentos electrónicos podrán utilizarse como
          constancia de las solicitudes, autorizaciones, cotizaciones,
          confirmaciones y comunicaciones realizadas entre las partes.
        </p>

        <p>
          El usuario deberá conservar sus comprobantes, confirmaciones y
          documentos de viaje hasta la conclusión del servicio.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidad",
    number: "14",
    title: "Alcance de responsabilidad",
    content: (
      <>
        <p>
          Viaja a tu Destino procurará proporcionar información clara y brindar
          asistencia razonable durante la cotización y gestión de los servicios.
        </p>

        <p>
          Cuando los servicios sean prestados por proveedores independientes,
          cada proveedor será responsable por los actos, omisiones y condiciones
          relacionadas directamente con su operación.
        </p>

        <p>
          Viaja a tu Destino no será responsable por afectaciones ocasionadas
          por circunstancias ajenas a su control, entre ellas:
        </p>

        <ul>
          <li>Cancelaciones o modificaciones realizadas por proveedores.</li>
          <li>Retrasos o cambios de itinerario.</li>
          <li>Sobreventa de vuelos u hospedaje.</li>
          <li>Pérdida o demora de equipaje.</li>
          <li>Condiciones climáticas.</li>
          <li>Restricciones migratorias o sanitarias.</li>
          <li>Huelgas, manifestaciones o conflictos sociales.</li>
          <li>Suspensión de actividades o cierre de instalaciones.</li>
          <li>Fallas de plataformas, bancos o sistemas externos.</li>
        </ul>

        <p>
          Ninguna disposición de estos términos deberá interpretarse como una
          renuncia o limitación de los derechos que la legislación aplicable
          reconoce al consumidor.
        </p>
      </>
    ),
  },
  {
    id: "fuerza-mayor",
    number: "15",
    title: "Caso fortuito y fuerza mayor",
    content: (
      <>
        <p>
          Cuando un servicio no pueda prestarse por acontecimientos
          imprevisibles, inevitables o ajenos al control de las partes, se
          aplicarán las alternativas, reprogramaciones, créditos, penalizaciones
          o reembolsos establecidos por el proveedor y la legislación
          correspondiente.
        </p>

        <p>
          Viaja a tu Destino podrá asistir al usuario en la comunicación y
          gestión con el proveedor, sin garantizar una resolución distinta de
          las políticas aplicables a la reservación.
        </p>
      </>
    ),
  },
  {
    id: "modificaciones",
    number: "16",
    title: "Modificaciones de los términos",
    content: (
      <>
        <p>
          Viaja a tu Destino podrá actualizar estos Términos y Condiciones para
          reflejar cambios legales, comerciales, técnicos u operativos.
        </p>

        <p>
          La versión actualizada será publicada en el sitio web e indicará la
          fecha de su última modificación.
        </p>

        <p>
          Los cambios no alterarán retroactivamente las condiciones particulares
          de reservaciones previamente confirmadas, salvo cuando sean necesarios
          por disposición legal o resulten favorables para el consumidor.
        </p>
      </>
    ),
  },
  {
    id: "legislacion",
    number: "17",
    title: "Legislación aplicable y controversias",
    content: (
      <>
        <p>
          Estos Términos y Condiciones se interpretarán conforme a la
          legislación aplicable en los Estados Unidos Mexicanos.
        </p>

        <p>
          En caso de inconformidad, el usuario podrá contactar inicialmente a
          Viaja a tu Destino para solicitar una aclaración y buscar una
          solución.
        </p>

        <p>
          Lo anterior no limita el derecho del consumidor de acudir a la
          legislación aplicable en los Estados Unidos Mexicanos.
        </p>

        <p>
          En caso de inconformidad, el usuario podrá contactar inicialmente a
          Viaja a tu Destino para solicitar una aclaración y buscar una
          solución. ante la Procuraduría Federal del Consumidor o ante las
          autoridades competentes.
        </p>

        <p>
          Cuando legalmente proceda y no exista una disposición de protección al
          consumidor que establezca algo diferente, las controversias podrán
          someterse ante las autoridades competentes de Cancún, Quintana Roo.
        </p>
      </>
    ),
  },
];

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-8 w-8">
      <path
        d="M7 3H14L19 8V21H7V3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M14 3V8H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M10 12H16M10 16H16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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

function TermsAndConditions() {
  return (
    <React.Fragment>
      <SEO
        title="Términos y Condiciones"
        description="Consulta los Términos y Condiciones de Viaja a tu Destino aplicables al uso del sitio, promociones, cotizaciones y servicios de viaje."
        url="https://www.viajaatudestino.com/terminos-y-condiciones"
      />

      <div className="flex min-h-screen flex-col bg-[#f4f8ff]">
        <header className="relative z-50">
          <NavBar />
        </header>

        <main className="flex-1">
          {/* Hero */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#023e73] via-[#0260fe] to-[#3794ff] px-5 py-16 text-white md:py-24">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[#ff6600]/20 blur-3xl" />
            <div className="absolute right-[12%] top-12 h-24 w-24 rounded-full border border-white/10" />

            <div className="relative mx-auto max-w-6xl">
              <div className="max-w-3xl">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur">
                  <DocumentIcon />
                </div>

                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur">
                  Información legal del servicio
                </span>

                <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                  Términos y condiciones
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                  Conoce las condiciones aplicables al uso de nuestra página,
                  las cotizaciones y la contratación de servicios turísticos.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/80">
                  <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                    Precios y disponibilidad
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                    Reservaciones
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                    Cambios y cancelaciones
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Contenido */}
          <section className="px-4 py-10 sm:px-6 md:py-16 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
              {/* Índice */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                    Contenido
                  </p>

                  <nav aria-label="Secciones de los términos y condiciones">
                    <ul className="space-y-1.5">
                      {termsSections.map((section) => (
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
                        <DocumentIcon />
                      </div>

                      <div>
                        <h2 className="text-xl font-black text-[#023e73] sm:text-2xl">
                          Lee antes de reservar
                        </h2>

                        <p className="mt-3 text-base leading-8 text-slate-600">
                          Antes de realizar un pago, verifica el precio total,
                          los servicios incluidos, las fechas, los nombres de
                          los viajeros y las políticas de cambios, cancelaciones
                          y reembolsos.
                        </p>

                        <p className="mt-3 text-sm font-semibold text-slate-500">
                          Última actualización: 26 de julio de 2026.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aviso importante */}
                <div className="mb-8 rounded-3xl border border-orange-200 bg-orange-50 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#ff6600] text-lg font-black text-white">
                      !
                    </span>

                    <div>
                      <h2 className="font-black text-[#9a3c00]">
                        Condiciones particulares de cada reservación
                      </h2>

                      <p className="mt-2 leading-7 text-[#804000]">
                        Además de estos términos generales, cada hotel, vuelo,
                        paquete, tour o traslado puede tener políticas
                        específicas. Las condiciones mostradas antes del pago
                        forman parte de la contratación.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Secciones */}
                <div className="space-y-6">
                  {termsSections.map((section) => (
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
                        Atención al cliente
                      </p>

                      <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                        ¿Tienes dudas sobre una reservación?
                      </h2>

                      <p className="mt-3 max-w-2xl leading-7 text-white/75">
                        Escríbenos indicando tu nombre, número de reservación y
                        una descripción clara de tu solicitud.
                      </p>
                    </div>

                    <a
                      href="mailto:contacto@viajaatudestino.com?subject=Aclaración sobre términos o reservación"
                      className="inline-flex flex-none items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-6 py-4 text-center text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-xl"
                    >
                      <MailIcon />
                      Solicitar aclaración
                    </a>
                  </div>
                </section>
              </article>
            </div>
          </section>
        </main>

        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default TermsAndConditions;
