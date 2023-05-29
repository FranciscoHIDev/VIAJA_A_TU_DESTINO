import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function About() {
  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow my-10">
          <div className=" md:mx-20 mx-5 flex flex-col items-center ">
            <div>
              <h1 className="md:text-3xl text-2xl uppercase text-[#035373] font-bold">
                Quiénes Somos
              </h1>
            </div>
            <div className="mt-10">
              <p className="md:text-[20px] text-justify">
                ¡Bienvenido a Viaja a tu Destino! Somos un buscador de ofertas
                de viajes en México, y nuestro objetivo es ayudarte a encontrar
                las mejores tarifas del mercado para que puedas viajar de manera
                económica a los destinos más increíbles. Todos los días,
                rastreamos y seleccionamos cuidadosamente las ofertas más
                atractivas y las compartimos contigo en nuestro sitio web.
              </p>
              <p className="md:text-[20px] mt-5 text-justify">
                Te proporcionamos toda la información necesaria sobre las
                ofertas que encontramos. Te enlazamos directamente a nuestro
                sitio asociado, donde podrás comprar los vuelos, hoteles,
                paquetes turísticos o experiencias al mejor precio disponible.
                Además, ofrecemos opciones de pago a meses sin intereses para
                que puedas disfrutar de tus viajes sin preocupaciones
                financieras.
              </p>
              <p className="md:text-[20px] mt-5 text-justify">
                La seguridad y la confiabilidad son fundamentales para nosotros.
                Todas tus compras en Viaja a tu Destino son 100% seguras, ya que
                las reservas las realizas directamente con los proveedores, como
                agencias de viajes o aerolíneas. Trabajamos únicamente con
                socios confiables y reconocidos en la industria del turismo,
                garantizando que obtengas el mejor servicio y una experiencia de
                viaje satisfactoria.
              </p>
            </div>
          </div>
        </main>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default About;
