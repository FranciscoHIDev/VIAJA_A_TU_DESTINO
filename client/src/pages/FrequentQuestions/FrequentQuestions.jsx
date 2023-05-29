import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function FrequentQuestions() {
  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow my-10">
          <div className=" md:mx-20 mx-5 flex flex-col items-center">
            <div>
              <h1 className="md:text-3xl text-2xl uppercase text-[#035373] font-bold">
                Preguntas Frecuentes
              </h1>
            </div>
            <div className="mt-10 ">
              <div>
                <span className="md:text-2xl">
                  1.¿Qué es Viaja a tu Destino?
                </span>
              </div>
              <div className="mt-2">
                <p className="md:text-[20px] text-justify">
                  Es un buscador de ofertas de viajes en México. Nuestro
                  objetivo es encontrar las mejores tarifas del mercado para que
                  puedas viajar de manera económica a los destinos más
                  increíbles del país.
                </p>
              </div>

              <div className="mt-5">
                <span className="md:text-2xl">
                  2. ¿Cómo funciona Viaja a tu Destino?
                </span>
              </div>
              <div className="mt-2">
                <p className="md:text-[20px] text-justify">
                  Diariamente, rastreamos y seleccionamos cuidadosamente las
                  mejores ofertas de vuelos, hoteles, paquetes turísticos y
                  experiencias. Estas ofertas se comparten en nuestro sitio web,
                  donde puedes encontrar información detallada y enlaces
                  directos para realizar la compra.
                </p>
              </div>
              <div className="mt-5">
                <span className="md:text-2xl">
                  3. ¿Es seguro reservar a través de Viaja a tu Destino?
                </span>
              </div>
              <div className="mt-2">
                <p className="md:text-[20px] text-justify">
                  Absolutamente. En Viaja a tu Destino trabajamos en
                  colaboración con proveedores confiables, como agencias de
                  viajes y aerolíneas reconocidas. Todas las reservas las
                  realizas directamente con ellos, lo que garantiza la seguridad
                  y confiabilidad de tus compras.
                </p>
              </div>
              <div className="mt-5">
                <span className="md:text-2xl">
                  4. ¿Viaja a tu Destino es una agencia de viajes?
                </span>
              </div>
              <div className="mt-2">
                <p className="md:text-[20px] text-justify">
                  No, Viaja a tu Destino no es una agencia de viajes. Somos un
                  buscador de ofertas de viajes en México que te ayuda a
                  encontrar las mejores tarifas disponibles y te conecta
                  directamente con agencias de viajes y aerolíneas para que
                  puedas realizar tus reservas de manera segura y confiable.
                </p>
              </div>

              <div className="mt-5">
                <span className="md:text-2xl">
                  5. ¿Puedo pagar a meses sin intereses?
                </span>
              </div>
              <div className="mt-2">
                <p className="md:text-[20px] text-justify">
                  Sí, ofrecemos la opción de pago a meses sin intereses en
                  muchas de nuestras ofertas. Al realizar la compra, podrás
                  seleccionar la opción de pago a meses y aprovechar esta
                  facilidad para ajustar tus pagos a tus necesidades
                  financieras.
                </p>
              </div>
              <div className="mt-5">
                <span className="md:text-2xl">
                  6. ¿Cómo puedo contactar con el equipo de Viaja a tu Destino?
                </span>
              </div>
              <div className="mt-2">
                <p className="md:text-[20px] text-justify">
                  Si tienes alguna pregunta o necesitas asistencia, puedes
                  ponerte en contacto con nuestro equipo de soporte a través de
                  nuestro formulario de contacto en el sitio web, o a traves de
                  nuestras redes sociales oficiales. Estaremos encantados de
                  ayudarte y resolver cualquier duda que puedas tener.
                </p>
              </div>
              <div className="mt-5">
                <span className="md:text-2xl">
                  7. ¿Puedo cancelar o modificar una reserva realizada a través
                  de Viaja a tu Destino?
                </span>
              </div>
              <div className="mt-2">
                <p className="md:text-[20px] text-justify">
                  Las políticas de cancelación y modificación pueden variar
                  según el proveedor con el que hayas realizado la reserva. Te
                  recomendamos revisar cuidadosamente los términos y condiciones
                  al momento de realizar la compra. Si necesitas realizar
                  cambios, comunícate directamente con el proveedor
                  correspondiente.
                </p>
              </div>
              <div className="mt-5">
                <span className="md:text-2xl">
                  8. ¿Qué tipo de ofertas puedo encontrar en Viaja a tu Destino?
                </span>
              </div>
              <div className="mt-2">
                <p className="md:text-[20px] text-justify">
                  En Viaja a tu Destino, podrás encontrar una amplia variedad de
                  ofertas, desde vuelos y hoteles hasta paquetes turísticos y
                  experiencias. Nuestro objetivo es ofrecerte opciones para
                  todos los gustos y presupuestos, para que puedas encontrar la
                  oferta que mejor se adapte a tus necesidades de viaje.
                </p>
              </div>
              <div className="mt-5">
                <span className="md:text-2xl">
                  9. ¿Cuánto tiempo duran las ofertas en Viaja a tu Destino?
                </span>
              </div>
              <div className="mt-2">
                <p className="md:text-[20px] text-justify">
                  Las ofertas pueden variar en cuanto a su duración. Algunas
                  ofertas pueden ser de corta duración y tener una fecha límite
                  específica, mientras que otras pueden estar disponibles por un
                  período más prolongado. Te recomendamos revisar la información
                  de cada oferta para conocer su vigencia y aprovecharlas antes
                  de que expiren.
                </p>
              </div>
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

export default FrequentQuestions;
