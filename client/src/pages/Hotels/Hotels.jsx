import CardsHotels from "../../components/CardsHotels/CardsHotels";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Hotels() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />

      <main>
        {/* ==========================================
                    HERO
        ========================================== */}

        <section className="relative h-[450px]">
          <img
            src="https://res.cloudinary.com/duaysiozi/image/upload/v1784166872/ycojgupbhfq8cplu0lzg.png"
            alt="Hoteles"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </section>

        {/* ==========================================
                  WIDGET BOOKING
        ========================================== */}

        {/* <section id="buscar" className="-mt-20 relative z-20 px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-black text-center text-[#253777]">
              Encuentra tu hospedaje
            </h2>

            <p className="text-center text-gray-500 mt-3">
              Busca hoteles al mejor precio para cualquier destino.
            </p>

            <div className="mt-8  border-2 border-dashed border-[#0260fe] rounded-2xl flex items-center justify-center">
              <div
                id="ptw-container"
                class="ptw-horizontal-search-brookerContainer"
              ></div>
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
                Destinos Populares
              </span>

              <h2 className="text-5xl font-black text-[#253777] mt-4">
                Inspírate para tu próximo viaje
              </h2>

              <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
                Descubre algunos de los destinos favoritos de nuestros viajeros.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cancún */}

              <div className="group relative rounded-3xl overflow-hidden h-80 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1600&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  alt="Cancún"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-black">Cancún</h3>

                  <p className="text-blue-100 mt-2">
                    Playas • Resorts • Todo Incluido
                  </p>
                </div>
              </div>

              {/* Riviera Maya */}

              <div className="group relative rounded-3xl overflow-hidden h-80 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  alt="Riviera Maya"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-black">Riviera Maya</h3>

                  <p className="text-blue-100 mt-2">
                    Naturaleza • Cenotes • Lujo
                  </p>
                </div>
              </div>

              {/* Los Cabos */}

              <div className="group relative rounded-3xl overflow-hidden h-80 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  alt="Los Cabos"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-black">Los Cabos</h3>

                  <p className="text-blue-100 mt-2">Mar • Golf • Luxury</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
                HOTELES EN MÉXICO
        ========================================== */}

        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
              <div>
                <span className="text-[#ff6600] font-bold uppercase tracking-wider">
                  México
                </span>

                <h2 className="text-5xl font-black text-[#253777] mt-4">
                  Hoteles en México
                </h2>

                <p className="text-gray-500 mt-5 text-lg max-w-2xl">
                  Encuentra hoteles en Cancún, Riviera Maya, Puerto Vallarta,
                  Los Cabos y muchos destinos más.
                </p>
              </div>

              <button className="mt-8 lg:mt-0 border border-[#0260fe] text-[#0260fe] px-7 py-3 rounded-full hover:bg-[#0260fe] hover:text-white transition font-semibold">
                Ver todos
              </button>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
              <CardsHotels />
            </div>
          </div>
        </section>

        {/* ==========================================
                BANNER
        ========================================== */}

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-[40px] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1800&auto=format&fit=crop"
                className="w-full h-[340px] object-cover"
                alt=""
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#001233]/90 to-[#0260fe]/60"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="px-14 max-w-xl">
                  <span className="bg-[#ff6600] text-white px-5 py-2 rounded-full font-bold">
                    Promoción Especial
                  </span>

                  <h2 className="text-white text-5xl font-black mt-6">
                    Hasta 18 Meses Sin Intereses
                  </h2>

                  <p className="text-blue-100 mt-6 text-lg">
                    Reserva hoy y aprovecha promociones exclusivas para tus
                    próximas vacaciones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ==========================================
                HOTELES INTERNACIONALES
        ========================================== */}

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
              <div>
                <span className="text-[#ff6600] font-bold uppercase tracking-wider">
                  Internacional
                </span>

                <h2 className="text-5xl font-black text-[#253777] mt-4">
                  Hoteles Internacionales
                </h2>

                <p className="text-gray-500 mt-5 text-lg max-w-2xl">
                  Descubre hoteles en Estados Unidos, Caribe, Europa y los
                  destinos favoritos alrededor del mundo.
                </p>
              </div>

              <button className="mt-8 lg:mt-0 border border-[#0260fe] text-[#0260fe] px-7 py-3 rounded-full hover:bg-[#0260fe] hover:text-white transition font-semibold">
                Explorar destinos
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
              <CardsHotels />
            </div>
          </div>
        </section>

        {/* ==========================================
                CTA FINAL
        ========================================== */}

        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-[40px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#001233]/90 via-[#001233]/80 to-[#0260fe]/70"></div>

              <div className="relative px-10 lg:px-20 py-24 text-center">
                <span className="inline-flex bg-[#ff6600] text-white px-5 py-2 rounded-full font-semibold">
                  Tu próxima aventura comienza aquí
                </span>

                <h2 className="text-white text-5xl lg:text-6xl font-black mt-8 leading-tight">
                  Reserva hoy
                  <br />
                  al mejor precio
                </h2>

                <p className="text-blue-100 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
                  Miles de hoteles disponibles, promociones exclusivas y
                  atención personalizada para ayudarte a encontrar el hospedaje
                  perfecto.
                </p>

                <div className="flex flex-wrap justify-center gap-5 mt-12">
                  <button
                    href="#buscar"
                    className="bg-[#ff6600] hover:bg-orange-600 transition px-8 py-4 rounded-full text-white font-bold"
                  >
                    Buscar Hoteles
                  </button>

                  <button
                    href="https://api.whatsapp.com/send/?phone=5219984954637"
                    className="border border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#001233] transition"
                  >
                    Contactar un asesor
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

export default Hotels;
