import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers } from "../../redux/actions/actions";
import CardTop from "../CardTop/CardTop";
import Paginated from "../Paginated/Paginated";

/* =========================================================
   SKELETON DE TARJETA
========================================================= */
function OfferSkeleton() {
  return (
    <div className="w-full sm:w-[350px] md:w-[380px] bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
      {/* Imagen */}
      <div className="relative h-[220px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
        {/* Badge */}
        <div className="absolute top-4 left-4 w-20 h-7 bg-gray-300 rounded-full"></div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Destino */}
        <div className="h-3 bg-gray-200 rounded-full w-1/3 mb-3"></div>

        {/* Título */}
        <div className="h-5 bg-gray-300 rounded-full w-11/12 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded-full w-7/12 mb-5"></div>

        {/* Descripción */}
        <div className="h-3 bg-gray-200 rounded-full w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded-full w-9/12 mb-6"></div>

        {/* Separador */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="h-3 bg-gray-200 rounded-full w-16 mb-2"></div>
              <div className="h-7 bg-gray-300 rounded-full w-28"></div>
            </div>

            <div className="h-11 bg-gray-300 rounded-xl w-28"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LOADING GENERAL
========================================================= */
function OffersLoading() {
  return (
    <div className="w-full py-10">
      {/* Encabezado loading */}
      <div className="flex flex-col items-center justify-center mb-8">
        {/* Icono */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-blue-50"></div>

          <div className="absolute w-14 h-14 rounded-full border-4 border-transparent border-t-[#0260fe] animate-spin"></div>

          <span className="absolute text-2xl">✈️</span>
        </div>

        <p className="text-gray-800 font-semibold text-lg">
          Buscando las mejores ofertas
        </p>

        <p className="text-gray-400 text-sm mt-1">
          Estamos cazando buenos precios para ti...
        </p>
      </div>

      {/* Skeleton cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <OfferSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */
function CardsOferts() {
  const dispatch = useDispatch();

  const allOffers = useSelector((state) => state.topOffers || []);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [offerPerPage] = useState(6);

  /* =========================================================
     CARGAR OFERTAS
  ========================================================= */
  useEffect(() => {
    const loadOffers = async () => {
      try {
        setLoading(true);

        await dispatch(getAllOffers());
      } catch (error) {
        console.error("Error cargando ofertas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, [dispatch]);

  /* =========================================================
     ORDENAR POR MÁS RECIENTES
  ========================================================= */
  const all = [...allOffers].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  /* =========================================================
     PAGINACIÓN
  ========================================================= */
  const lastOffer = page * offerPerPage;
  const firstOffer = lastOffer - offerPerPage;

  const totalOffers = all.slice(firstOffer, lastOffer);

  const maxPage = Math.ceil(allOffers.length / offerPerPage);

  function paginate(e, num) {
    e.preventDefault();

    setPage(num);

    /* Llevar al usuario arriba de las ofertas */
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================================================
     LOADING
  ========================================================= */
  if (loading) {
    return <OffersLoading />;
  }

  /* =========================================================
     SIN OFERTAS
  ========================================================= */
  if (!loading && allOffers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="text-5xl mb-4">✈️</div>

        <h3 className="text-xl font-bold text-gray-800">
          Estamos preparando nuevas ofertas
        </h3>

        <p className="text-gray-500 mt-2 max-w-md">
          Muy pronto encontrarás nuevas oportunidades para viajar más y pagar
          menos.
        </p>
      </div>
    );
  }

  /* =========================================================
     OFERTAS
  ========================================================= */
  return (
    <React.Fragment>
      <div className="flex flex-wrap justify-center gap-6">
        {totalOffers.map((e) => (
          <CardTop
            key={e._id}
            _id={e._id}
            slug={e.slug}
            title={e.title}
            image={e.image}
            category={e.category}
            summary={e.summary}
            promotion={e.promotion}
            price={e.price}
            availability={e.availability}
            departure={e.departure}
            arrival={e.arrival}
            destination={e.destination}
            author={e.author}
            date={e.date}
          />
        ))}
      </div>

      {maxPage > 1 && (
        <Paginated
          offerPerPage={offerPerPage}
          offers={allOffers.length}
          paginate={paginate}
          setPage={setPage}
          page={page}
          maxPage={maxPage}
        />
      )}
    </React.Fragment>
  );
}

export default CardsOferts;
