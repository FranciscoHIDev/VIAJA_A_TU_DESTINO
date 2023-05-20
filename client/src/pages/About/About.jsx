import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function About() {
  return (
    <>
      <NavBar />
      <div>
        <h1>Quiénes Somos</h1>
        <p>
          Somos un buscador de ofertas de viajes en México, diariamente buscamos
          las mejores tarifas del mercado y las compartimos con los viajeros
          para que puedan viajar barato a los mejores destinos, te dejamos toda
          la información de las ofertas en nuestro sitio web de donde te
          enlazamos para que puedas comprarla al mejor precio y además pagar a
          meses sin intereses, ya sea vuelos, hoteles, paquetes o experiencias,
          todas tus compras son 100% seguras y confiables ya que las reservas
          las realizas directamente con los proveedores como agencias de viajes
          o aerolíneas.{" "}
        </p>
        <p>
          Los únicos productos o servicios que vendemos directamente como
          intermediarios son todas las experiencias del Grupo Xcaret, ya que
          contamos con alianzas comerciales por lo que te podemos ofrecer todas
          la entradas a los diferentes parques desde nuestros canales oficiales.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;
