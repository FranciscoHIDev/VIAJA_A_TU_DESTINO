import CardsTours from "../../components/CardsTours/CardsTours";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Tours() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />

      <main>
        {/* ==========================================
                    HERO
        ========================================== */}

        <section className="relative h-[450px]">
          <img
            src="https://res.cloudinary.com/duaysiozi/image/upload/v1783823834/do2zz7decguznmrmq5le.png"
            alt="Tours"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </section>

        {/* ==========================================
                BUSCADOR
        ========================================== */}

        {/* <section className="-mt-16 relative z-20 px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-black text-center text-[#253777]">
              Encuentra tu próxima aventura
            </h2>

            <div className="mt-8 h-28 border-2 border-dashed border-[#0260fe] rounded-2xl flex items-center justify-center">
              <span className="text-[#0260fe] font-bold">
                AQUÍ VA EL WIDGET DE TOURS
              </span>
            </div>
          </div>
        </section> */}

        {/* ==========================================
                TOURS DESTACADOS
        ========================================== */}

        <section id="tours" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[#ff6600] font-bold uppercase">
                Experiencias favoritas
              </span>

              <h2 className="text-5xl font-black text-[#253777] mt-4">
                Tours destacados
              </h2>

              <p className="text-gray-500 mt-4 text-lg">
                Explora lugares increíbles con actividades diseñadas para ti.
              </p>
            </div>

            <CardsTours />
          </div>
        </section>

        {/* ==========================================
                BANNER
        ========================================== */}

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto rounded-[40px] overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1800&auto=format&fit=crop"
              className="w-full h-[320px] object-cover"
              alt=""
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#001233]/90 to-[#0260fe]/60"></div>

            <div className="absolute inset-0 flex items-center px-12">
              <div className="max-w-xl">
                <h2 className="text-white text-5xl font-black">
                  Crea recuerdos inolvidables
                </h2>

                <p className="text-blue-100 mt-5 text-lg">
                  Reserva actividades, excursiones y experiencias para
                  complementar tus vacaciones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
                CTA FINAL
        ========================================== */}

        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-black text-[#253777]">
              ¿Listo para tu próxima aventura?
            </h2>

            <p className="text-gray-500 text-xl mt-5">
              Nuestro equipo te ayuda a encontrar el tour perfecto.
            </p>

            <button
              href="https://api.whatsapp.com/send/?phone=5219984954637"
              className="inline-block bg-[#ff6600] text-white px-10 py-4 rounded-full font-bold mt-8"
            >
              Cotizar por WhatsApp
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Tours;
