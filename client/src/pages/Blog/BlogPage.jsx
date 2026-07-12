import React from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

export default function Home() {
  const posts = [
    {
      title: "Los mejores hoteles todo incluido en Cancún",
      excerpt:
        "Descubre opciones premium para tus próximas vacaciones en el Caribe Mexicano.",
      tag: "Cancún",
      img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    },
    {
      title: "Vuelos baratos desde México en 2026",
      excerpt:
        "Estrategias reales para encontrar vuelos más baratos sin complicaciones.",
      tag: "Vuelos",
      img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    },
    {
      title: "Paquetes todo incluido con meses sin intereses",
      excerpt:
        "Viaja hoy y paga después con opciones flexibles para tu presupuesto.",
      tag: "Ofertas",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
      title: "Riviera Maya: guía completa de viaje",
      excerpt:
        "Todo lo que necesitas saber para disfrutar la Riviera Maya al máximo.",
      tag: "Guías",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="bg-white text-gray-800">
        {/* HERO EDITORIAL */}
        <section className="relative h-[450px] flex items-center justify-center text-center">
          <img
            src="https://res.cloudinary.com/duaysiozi/image/upload/v1783824133/f8d3xgu961lepnrtotu0.png"
            className="absolute inset-0 w-full h-full object-cover"
            alt="caribe"
          />

          <div className="absolute inset-0 bg-black/20" />
        </section>

        {/* CATEGORÍAS */}
        <section className="bg-[#0260fe] text-white py-6">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <span className="bg-white/10 px-4 py-2 rounded-full">Cancún</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">
              Riviera Maya
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full">
              Vuelos baratos
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full">Hoteles</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">Ofertas</span>
          </div>
        </section>

        {/* ARTÍCULOS BLOG */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                ✈️ Últimos artículos
              </h2>
              <p className="text-gray-500 mt-2">
                Contenido actualizado para viajar mejor y más barato
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {posts.map((post, i) => (
              <article
                key={i}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition bg-white"
              >
                <div className="relative">
                  <img
                    src={post.img}
                    className="h-48 w-full object-cover"
                    alt={post.title}
                  />

                  <span className="absolute top-3 left-3 bg-[#ff6600] text-white text-xs px-3 py-1 rounded-full">
                    {post.tag}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mt-2 text-sm">{post.excerpt}</p>

                  <a
                    href="#"
                    className="inline-block mt-4 text-[#0260fe] font-semibold hover:underline"
                  >
                    Leer artículo →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* BANNER CTA */}
        <section className="bg-[#ff6600] text-white py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            ¿Quieres que te encontremos una oferta real?
          </h2>

          <p className="mt-2 text-white/90">
            Escríbenos y te enviamos opciones en minutos
          </p>

          <a
            href="https://api.whatsapp.com/send/?phone=5219984954637&text&type=phone_number&app_absent=0"
            className="mt-6 inline-block bg-black text-white px-8 py-3 rounded-full font-bold"
          >
            🚀 Hablar por WhatsApp
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
}
