import React, { useEffect, useState } from "react";

function HomeAdmin() {
  const [visits, setVisits] = useState(0);
  const [pageVisit, setPageVisit] = useState(0);
  const [durationProm, setDurationProm] = useState(0);
  const [bounceRate, setBounceRate] = useState(0);
  const [pagePopulate, setPagePopulate] = useState([]);

  // useEffect(() => {
  //   ReactGA.initialize("G-8RTX9TMWS7");
  //   // ReactGA.pageview(window.location.pathname);
  //   const getAnalytics = () => {
  //     try {
  //       const analytics = ReactGA.pageview("/");
  //       console.log(analytics, "prueba");
  //       setVisits(analytics.visits);
  //       setPageVisit(analytics.pageviews);
  //       setDurationProm(analytics.avgTimeOnPage);
  //       setBounceRate(analytics.bounceRate);
  //       setPagePopulate(analytics.topPages);
  //     } catch (e) {
  //       console.log("Error al obtener estadisticas");
  //     }
  //   };
  //   getAnalytics();
  // }, []);
  return (
    <>
      <div className="flex  flex-col text-3xl text-white">
        <div>
          <h1>Estadisticas de Google Analytics</h1>
        </div>
        <div className="mt-10">
          {/* <p>Visitas: {visits}</p>
          <p>Pagínas vistas: {pageVisit}</p>
          <p>Duración promedio de la sesión: {durationProm} segundos</p>
          <p>Tasa de rebote: {bounceRate}%</p>
          <p>Paginas Populares</p>
          <ul>
            {pagePopulate.map((pages, index) => {
              <li key={index}>
                {pages.page}-{pages.pageviews} paginas vistas
              </li>;
            })}
          </ul> */}
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;
