import { useEffect, useMemo, useState } from "react";
import {
  FaArrowRight,
  FaBoxOpen,
  FaEdit,
  FaEye,
  FaPlus,
  FaRedo,
  FaSearch,
  FaTag,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";

const OFFER_TYPES = ["Todas", "Paquete", "Hotel", "Vuelo", "Tour"];

const getText = (...values) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value;
    if (value?.name) return value.name;
    if (value?.title) return value.title;
  }

  return "";
};

const getOfferCategory = (offer) =>
  getText(
    offer.category?.name,
    offer.category,
    offer.categoryName,
    offer.type?.name,
    offer.type,
  ).trim();

const getImage = (offer) => {
  const image =
    offer.image?.[0] ||
    offer.image ||
    offer.images?.[0] ||
    offer.coverImage ||
    "";

  return typeof image === "string" ? image : "";
};

const getPrice = (offer) => {
  const value =
    offer.price ?? offer.precio ?? offer.priceFrom ?? offer.totalPrice;

  if (value === undefined || value === null || value === "") {
    return "Consultar precio";
  }

  const numericValue = Number(String(value).replace(/,/g, ""));

  if (Number.isFinite(numericValue)) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(numericValue);
  }

  return String(value);
};

const getEditPath = (offer) => {
  const id = offer._id || offer.id;
  const category = getOfferCategory(offer).toLowerCase();

  switch (category) {
    case "hotel":
      return `/auth/hoteles/${id}/editar`;

    case "tour":
      return `/auth/tours/${id}/editar`;

    default:
      return `/auth/ofertas/${id}/editar`;
  }
};

function OffersAdmin() {
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const loadOffers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/offers");

      const list = Array.isArray(response.data)
        ? response.data
        : response.data?.offers || response.data?.data || [];

      setOffers(list);
    } catch {
      setError("No fue posible cargar las ofertas. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleDelete = async (offer) => {
    const id = offer._id || offer.id;

    if (!id || deletingId) return;

    const result = await Swal.fire({
      title: "¿Eliminar esta oferta?",
      text: `"${offer.title}" se eliminará de forma permanente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);

    try {
      await api.delete(`/offers/${id}`);

      setOffers((currentOffers) =>
        currentOffers.filter((currentOffer) => {
          const currentId = currentOffer._id || currentOffer.id;
          return currentId !== id;
        }),
      );

      await Swal.fire({
        title: "Oferta eliminada",
        text: "La oferta se eliminó correctamente.",
        icon: "success",
        confirmButtonColor: "#0260fe",
      });
    } catch (requestError) {
      await Swal.fire({
        title: "No se pudo eliminar",
        text:
          requestError.response?.data?.message ||
          "Intenta nuevamente más tarde.",
        icon: "error",
        confirmButtonColor: "#0260fe",
      });
    } finally {
      setDeletingId("");
    }
  };

  const filteredOffers = useMemo(() => {
    const term = search.trim().toLowerCase();

    return offers.filter((offer) => {
      const title = getText(offer.title, offer.name);
      const destination = getText(
        offer.destination,
        offer.destinationName,
        offer.location,
        offer.city,
      );
      const hotel = getText(offer.hotel, offer.hotelName);
      const category = getOfferCategory(offer);

      const matchesSearch =
        !term ||
        `${title} ${destination} ${hotel} ${category}`
          .toLowerCase()
          .includes(term);

      const matchesCategory =
        categoryFilter === "Todas" ||
        category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [offers, search, categoryFilter]);

  const hasFilters = search.trim() || categoryFilter !== "Todas";

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0260fe]">
            Administración
          </p>

          <h1 className="mt-1 text-3xl font-black text-[#253777]">
            Ofertas de viajes
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Crea, edita y elimina las ofertas de tu sitio web.
          </p>
        </div>

        <Link
          to="/auth/new-package"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0260fe] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#014ad4]"
        >
          <FaPlus />
          Nueva oferta
        </Link>
      </div>

      <div className="mt-7 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="relative w-full md:max-w-md">
              <label
                htmlFor="offer-search"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500"
              >
                Buscar
              </label>

              <FaSearch className="absolute left-4 top-[58%] -translate-y-1/2 text-gray-400" />

              <input
                id="offer-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Oferta, hotel o destino..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#0260fe] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="w-full md:max-w-[220px]">
              <label
                htmlFor="offer-category"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500"
              >
                Tipo de oferta
              </label>

              <select
                id="offer-category"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-[#253777] outline-none transition focus:border-[#0260fe] focus:ring-4 focus:ring-blue-100"
              >
                {OFFER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type === "Todas" ? "Todos los tipos" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 xl:justify-end">
            <p className="whitespace-nowrap text-sm text-gray-500">
              <span className="font-black text-[#253777]">
                {filteredOffers.length}
              </span>{" "}
              ofertas encontradas
            </p>

            <button
              type="button"
              onClick={loadOffers}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-[#0260fe] transition hover:bg-blue-50"
            >
              <FaRedo />
              Actualizar
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-72 animate-pulse rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-bold text-red-600">{error}</p>

          <button
            type="button"
            onClick={loadOffers}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && filteredOffers.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <FaBoxOpen className="mx-auto text-4xl text-gray-300" />

          <h2 className="mt-4 text-xl font-black text-[#253777]">
            No encontramos ofertas
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {hasFilters
              ? "Cambia la búsqueda o selecciona otro tipo de oferta."
              : "Crea tu primera oferta para comenzar."}
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategoryFilter("Todas");
              }}
              className="mt-4 rounded-xl bg-[#0260fe] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#014ad4]"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {!loading && !error && filteredOffers.length > 0 && (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredOffers.map((offer) => {
            const id = offer._id || offer.id;
            const title =
              getText(offer.title, offer.name) || "Oferta sin título";

            const destination =
              getText(
                offer.destination,
                offer.destinationName,
                offer.location,
                offer.city,
              ) || "Destino por definir";

            const category = getOfferCategory(offer) || "Sin categoría";
            const image = getImage(offer);
            const isActive = offer.active === true;

            return (
              <article
                key={id || title}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-44 bg-gradient-to-br from-[#0260fe] to-[#253777]">
                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FaTag className="text-4xl text-white/50" />
                    </div>
                  )}

                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0260fe] shadow-sm">
                      {category}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                        isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {isActive ? "Activa" : "Borrador"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm font-semibold text-[#0260fe]">
                    {destination}
                  </p>

                  <h2 className="mt-1 line-clamp-2 text-lg font-black text-[#253777]">
                    {title}
                  </h2>

                  <p className="mt-4 text-xl font-black text-[#ff6600]">
                    {getPrice(offer)}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {id && (
                      <Link
                        to={getEditPath(offer)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#0260fe] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#014ad4]"
                      >
                        <FaEdit />
                        Editar
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(offer)}
                      disabled={deletingId === id}
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaTrash />
                      {deletingId === id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>

                  {id && (
                    <Link
                      to={`/oferta/${id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-[#0260fe] px-4 py-3 text-sm font-bold text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white"
                    >
                      <FaEye />
                      Ver en sitio
                      <FaArrowRight />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default OffersAdmin;
