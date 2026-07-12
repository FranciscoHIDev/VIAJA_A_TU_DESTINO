import CardsPackages from "../../components/CardsPackages/CardsPackages";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Packages() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />

      <main>
        {/* ==========================================
                    HERO
        ========================================== */}

        <section className="relative h-[450px]">
          <img
            src="https://res.cloudinary.com/duaysiozi/image/upload/v1783823970/e5dyhj4smanvwqq7prkp.png"
            alt="Paquetes vacacionales"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#001233]/50 via-[#001233]/70 to-transparent"></div> */}
        </section>

        {/* ==========================================
                  WIDGET PAQUETES
        ========================================== */}

        {/* <section id="buscar" className="-mt-20 relative z-20 px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-black text-center text-[#253777]">
              Encuentra tu paquete ideal
            </h2>

            <p className="text-center text-gray-500 mt-3">
              Combina vuelos, hoteles y experiencias en un solo lugar.
            </p>

            <div className="mt-10 h-32 border-2 border-dashed border-[#0260fe] rounded-2xl flex items-center justify-center">
              <span className="font-bold text-[#0260fe]">
                <div id="ptw-container" class="ptw-horizontal-search"></div>
              </span>
            </div>
          </div>
        </section> */}
        {/* ==========================================
                DESTINOS POPULARES
        ========================================== */}

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[#ff6600] font-bold uppercase tracking-widest">
                Destinos favoritos
              </span>

              <h2 className="text-5xl font-black text-[#253777] mt-4">
                Paquetes para viajar
                <br />
                por México y el mundo
              </h2>

              <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
                Escoge tu próximo destino con paquetes diseñados para disfrutar
                más y preocuparte menos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cancún */}

              <div className="group relative rounded-3xl overflow-hidden h-80 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1600&auto=format&fit=crop"
                  alt="Cancún"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-black">Cancún</h3>

                  <p className="text-blue-100 mt-2">Vuelo + Hotel + Playa</p>
                </div>
              </div>

              {/* Riviera Maya */}

              <div className="group relative rounded-3xl overflow-hidden h-80 cursor-pointer text-white">
                <img
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop"
                  alt="Riviera Maya"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-black">Riviera Maya</h3>

                  <p className="text-blue-100 mt-2">
                    Resorts • Experiencias • All Inclusive
                  </p>
                </div>
              </div>

              {/* Los Cabos */}

              <div className="group relative rounded-3xl overflow-hidden h-80 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop"
                  alt="Los Cabos"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-black">Los Cabos</h3>

                  <p className="text-blue-100 mt-2">Lujo • Romance • Relax</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
                PAQUETES DESTACADOS
        ========================================== */}

        <section className="py-24 bg-slate-50">
          <div className="max-w-8xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
              <div>
                <span className="text-[#ff6600] font-bold uppercase tracking-wider">
                  Ofertas especiales
                </span>

                <h2 className="text-5xl font-black text-[#253777] mt-4">
                  Paquetes destacados
                </h2>

                <p className="text-gray-500 mt-5 text-lg max-w-2xl">
                  Encuentra viajes completos con vuelos, hospedaje y
                  experiencias incluidas.
                </p>
              </div>

              <button className="mt-8 lg:mt-0 border border-[#0260fe] text-[#0260fe] px-7 py-3 rounded-full hover:bg-[#0260fe] hover:text-white transition font-semibold">
                Ver todos
              </button>
            </div>

            <div className="flex flex-col">
              <CardsPackages />
            </div>
          </div>
        </section>
        {/* ==========================================
                BANNER PROMOCIONAL
        ========================================== */}

        <section className="py-24">
          <div className="max-w-8xl mx-auto px-6">
            <div className="rounded-[40px] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1800&auto=format&fit=crop"
                className="w-full h-[340px] object-cover"
                alt="Viajes"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#001233]/90 to-[#0260fe]/60"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="px-14 max-w-xl">
                  <span className="bg-[#ff6600] text-white px-5 py-2 rounded-full font-bold">
                    Promoción exclusiva
                  </span>

                  <h2 className="text-white text-5xl font-black mt-6">
                    Hasta 18 Meses Sin Intereses
                  </h2>

                  <p className="text-blue-100 mt-6 text-lg">
                    Reserva tu paquete vacacional hoy y aprovecha promociones
                    con tarjetas participantes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
                PAQUETES NACIONALES
        ========================================== */}

        <section className="py-24 bg-white">
          <div className="max-w-8xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
              <div>
                <span className="text-[#ff6600] font-bold uppercase tracking-wider">
                  México
                </span>

                <h2 className="text-5xl font-black text-[#253777] mt-4">
                  Viaja por México
                </h2>

                <p className="text-gray-500 mt-5 text-lg max-w-2xl">
                  Descubre playas, pueblos mágicos y destinos increíbles con
                  paquetes completos.
                </p>
              </div>

              <button className="mt-8 lg:mt-0 border border-[#0260fe] text-[#0260fe] px-7 py-3 rounded-full hover:bg-[#0260fe] hover:text-white transition font-semibold">
                Explorar México
              </button>
            </div>

            <div className="flex- flex-col">
              <CardsPackages />
            </div>
          </div>
        </section>

        {/* ==========================================
                PAQUETES INTERNACIONALES
        ========================================== */}

        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
              <div>
                <span className="text-[#ff6600] font-bold uppercase tracking-wider">
                  Internacional
                </span>

                <h2 className="text-5xl font-black text-[#253777] mt-4">
                  Descubre el mundo
                </h2>

                <p className="text-gray-500 mt-5 text-lg max-w-2xl">
                  Paquetes a destinos internacionales con vuelos, hoteles y
                  experiencias inolvidables.
                </p>
              </div>

              <button className="mt-8 lg:mt-0 border border-[#0260fe] text-[#0260fe] px-7 py-3 rounded-full hover:bg-[#0260fe] hover:text-white transition font-semibold">
                Ver destinos
              </button>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
              <CardsPackages />
            </div>
          </div>
        </section>

        {/* ==========================================
                CTA FINAL
        ========================================== */}

        <section className="pb-24 px-6">
          <div className="max-w-8xl mx-auto">
            <div className="relative rounded-[40px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000&auto=format&fit=crop"
                alt="Viajes"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#001233]/90 via-[#001233]/80 to-[#0260fe]/70"></div>

              <div className="relative px-10 lg:px-20 py-24 text-center">
                <span className="inline-flex bg-[#ff6600] text-white px-5 py-2 rounded-full font-semibold">
                  Tu próxima aventura comienza aquí
                </span>

                <h2 className="text-white text-5xl lg:text-6xl font-black mt-8 leading-tight">
                  Reserva tu paquete
                  <br />
                  al mejor precio
                </h2>

                <p className="text-blue-100 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
                  Encuentra vuelos, hoteles y experiencias en un solo lugar con
                  atención personalizada para ayudarte a planear tu viaje.
                </p>

                <div className="flex flex-wrap justify-center gap-5 mt-12">
                  <button
                    href="#buscar"
                    className="bg-[#ff6600] hover:bg-orange-600 transition px-8 py-4 rounded-full text-white font-bold"
                  >
                    Buscar Paquetes
                  </button>

                  <button
                    href="https://api.whatsapp.com/send/?phone=5219984954637"
                    className="border border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#001233] transition"
                  >
                    Contactar asesor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Packages;
