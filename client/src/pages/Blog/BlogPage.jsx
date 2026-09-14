import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaHotel,
  FaMapMarkerAlt,
  FaPlane,
  FaSearch,
  FaSuitcase,
  FaTimes,
  FaUmbrellaBeach,
  FaWhatsapp,
} from "react-icons/fa";

import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import PageSEO from "../../components/PageSEO/PageSEO";

import api from "../../services/api";

// ======================================================
// CONFIGURACIÓN
// ======================================================

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/duaysiozi/image/upload/v1784166871/f6thrmw2fynxpyo0ak5e.png";

const categoryIcons = {
  Todos: FaBookOpen,
  Guías: FaBookOpen,
  Cancún: FaUmbrellaBeach,
  "Riviera Maya": FaMapMarkerAlt,
  Vuelos: FaPlane,
  Hoteles: FaHotel,
  Ofertas: FaSuitcase,
  Paquetes: FaSuitcase,
  Tours: FaUmbrellaBeach,
};

const categoryPriority = [
  "Guías",
  "Cancún",
  "Riviera Maya",
  "Vuelos",
  "Hoteles",
  "Ofertas",
  "Paquetes",
  "Tours",
];

const travelShortcuts = [
  {
    title: "Hoteles",
    description: "Encuentra resorts, Todo Incluido y opciones de hospedaje.",
    path: "/hoteles/?s=1#1",
    icon: FaHotel,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=1400&auto=format&fit=crop",
  },

  {
    title: "Paquetes",
    description: "Combina vuelo + hotel para preparar tu próximo viaje.",
    path: "/paquetes/?s=3#3",
    icon: FaSuitcase,
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=85&w=1400&auto=format&fit=crop",
  },

  {
    title: "Vuelos",
    description: "Consulta opciones de vuelos para tu próximo destino.",
    path: "/vuelos/?s=2#2",
    icon: FaPlane,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=85&w=1400&auto=format&fit=crop",
  },

  {
    title: "Tours",
    description:
      "Descubre actividades y experiencias para complementar tu viaje.",
    path: "/tours/?s=5#5",
    icon: FaUmbrellaBeach,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=85&w=1400&auto=format&fit=crop",
  },
];

// ======================================================
// HELPERS
// ======================================================

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const normalizeText = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const getPostImage = (post) => post?.featuredImage?.url || FALLBACK_IMAGE;

const getPostAlt = (post) =>
  post?.featuredImage?.alt || post?.title || "Artículo de Viaja a tu Destino";

const getPostTag = (post) => {
  if (Array.isArray(post?.tags) && post.tags.length > 0) {
    return post.tags[0];
  }

  return post?.category || "Viajes";
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] = useState("Todos");

  const [searchTerm, setSearchTerm] = useState("");

  // ====================================================
  // CARGAR ARTÍCULOS
  // ====================================================

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/blog");

      setPosts(Array.isArray(response.data) ? response.data : []);
    } catch (requestError) {
      console.error("Error cargando blog:", requestError);

      setError(
        requestError?.response?.data?.message ||
          "No fue posible cargar los artículos del blog.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // ====================================================
  // CATEGORÍAS DINÁMICAS
  // ====================================================

  const categories = useMemo(() => {
    const foundCategories = [
      ...new Set(posts.map((post) => post?.category?.trim()).filter(Boolean)),
    ];

    foundCategories.sort((a, b) => {
      const indexA = categoryPriority.indexOf(a);

      const indexB = categoryPriority.indexOf(b);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      if (indexA !== -1) {
        return -1;
      }

      if (indexB !== -1) {
        return 1;
      }

      return a.localeCompare(b, "es");
    });

    return [
      {
        label: "Todos",
        icon: FaBookOpen,
      },

      ...foundCategories.map((category) => ({
        label: category,

        icon: categoryIcons[category] || FaBookOpen,
      })),
    ];
  }, [posts]);

  // ====================================================
  // DESTACADO
  // ====================================================

  const featuredPost = useMemo(() => {
    if (posts.length === 0) {
      return null;
    }

    return posts.find((post) => post.isFeatured) || posts[0];
  }, [posts]);

  // ====================================================
  // FILTROS
  // ====================================================

  const filteredPosts = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return posts.filter((post) => {
      const categoryMatches =
        activeCategory === "Todos" ||
        post.category === activeCategory ||
        post.tags?.includes(activeCategory);

      if (!categoryMatches) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableText = normalizeText(
        [
          post.title,
          post.excerpt,
          post.category,

          ...(Array.isArray(post.tags) ? post.tags : []),
        ]
          .filter(Boolean)
          .join(" "),
      );

      return searchableText.includes(normalizedSearch);
    });
  }, [posts, activeCategory, searchTerm]);

  const isFiltering = activeCategory !== "Todos" || Boolean(searchTerm.trim());

  const regularPosts = useMemo(() => {
    if (isFiltering) {
      return filteredPosts;
    }

    if (!featuredPost) {
      return filteredPosts;
    }

    return filteredPosts.filter((post) => post._id !== featuredPost._id);
  }, [filteredPosts, featuredPost, isFiltering]);

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("Todos");
  };

  const handleCategory = (category) => {
    setActiveCategory(category);
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <React.Fragment>
      <PageSEO pageKey="blog" />

      <div className="flex min-h-screen flex-col bg-[#f5f8fc] text-slate-800">
        <NavBar />

        <main className="flex-1">
          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative isolate overflow-hidden bg-[#023e73]">
            <img
              src={FALLBACK_IMAGE}
              alt="Inspiración para viajar"
              fetchPriority="high"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,27,52,0.98)_0%,rgba(2,62,115,0.91)_43%,rgba(2,96,254,0.43)_100%)]" />

            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#001b34]/75 via-transparent to-black/10" />

            <div className="mx-auto flex min-h-[420px] max-w-7xl items-center px-4 py-14 sm:px-6 md:min-h-[520px] lg:px-8">
              <div className="max-w-3xl text-white">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur-md">
                  <FaBookOpen className="text-[#ff9b4a]" aria-hidden="true" />
                  Blog de viajes
                </span>

                <h1 className="mt-5 max-w-3xl text-[2.55rem] font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[4.15rem]">
                  Inspírate.
                  <span className="block text-[#74b4ff]">
                    Planea mejor tu próximo viaje.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/80 md:text-lg">
                  Guías, destinos, consejos y recomendaciones para ayudarte a
                  convertir una idea en tu próxima experiencia.
                </p>

                {/* BUSCADOR */}

                <div className="mt-8 max-w-2xl">
                  <label className="relative block">
                    <span className="sr-only">Buscar artículos</span>

                    <FaSearch
                      className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    />

                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Busca Cancún, hoteles, vuelos, playas..."
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white pl-12 pr-12 text-sm font-semibold text-slate-700 shadow-[0_18px_50px_rgba(0,0,0,0.18)] outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-[#3794ff]/30 sm:h-16 sm:text-base"
                    />

                    {searchTerm ? (
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        aria-label="Limpiar búsqueda"
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <FaTimes />
                      </button>
                    ) : null}
                  </label>

                  {/* SUGERENCIAS */}

                  {categories.length > 1 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="mr-1 text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                        Explora:
                      </span>

                      {categories
                        .filter((category) => category.label !== "Todos")
                        .slice(0, 4)
                        .map((category) => (
                          <button
                            key={category.label}
                            type="button"
                            onClick={() => handleCategory(category.label)}
                            className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/90 backdrop-blur transition hover:bg-white hover:text-[#023e73]"
                          >
                            {category.label}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              CATEGORÍAS
          ================================================= */}

          {!loading && posts.length > 0 && (
            <section className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {categories.map((category) => {
                    const Icon = category.icon;

                    const active = activeCategory === category.label;

                    return (
                      <button
                        key={category.label}
                        type="button"
                        onClick={() => handleCategory(category.label)}
                        aria-pressed={active}
                        className={`inline-flex min-h-[42px] flex-none items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition ${
                          active
                            ? "bg-[#0260fe] text-white shadow-md"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-[#0260fe]/30 hover:bg-[#f7faff] hover:text-[#0260fe]"
                        }`}
                      >
                        <Icon className="text-xs" />

                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && <BlogLoading />}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <section className="bg-[#f5f8fc] px-4 py-20 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl rounded-3xl border border-red-100 bg-white px-6 py-12 text-center shadow-sm">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-500">
                  <FaBookOpen />
                </span>

                <h2 className="mt-5 text-2xl font-black text-[#023e73]">
                  No pudimos cargar el blog
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">{error}</p>

                <button
                  type="button"
                  onClick={loadPosts}
                  className="mt-6 rounded-xl bg-[#0260fe] px-5 py-3 text-sm font-black text-white transition hover:bg-[#014fd3]"
                >
                  Intentar nuevamente
                </button>
              </div>
            </section>
          )}

          {/* =================================================
              SIN ARTÍCULOS
          ================================================= */}

          {!loading && !error && posts.length === 0 && (
            <section className="bg-[#f5f8fc] px-4 py-20 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl text-[#0260fe]">
                  <FaBookOpen />
                </span>

                <h2 className="mt-5 text-2xl font-black text-[#023e73]">
                  Estamos preparando nuevas historias
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                  Muy pronto encontrarás guías, consejos y recomendaciones para
                  ayudarte a planear tus próximos viajes.
                </p>
              </div>
            </section>
          )}

          {/* =================================================
              CONTENIDO
          ================================================= */}

          {!loading && !error && posts.length > 0 && (
            <>
              {/* =============================================
                    DESTACADO
                ============================================= */}

              {!isFiltering && featuredPost && (
                <section className="bg-white px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                  <div className="mx-auto max-w-7xl">
                    <div className="mb-7">
                      <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6600]">
                        Recomendado
                      </span>

                      <h2 className="mt-2 text-3xl font-black tracking-[-0.025em] text-[#023e73] sm:text-4xl">
                        Empieza por aquí
                      </h2>

                      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                        Una selección de nuestro contenido para ayudarte a
                        preparar mejor tu próxima experiencia.
                      </p>
                    </div>

                    <article className="group grid overflow-hidden rounded-[30px] border border-slate-200 bg-[#f8fbff] shadow-[0_14px_45px_rgba(2,62,115,0.08)] transition duration-300 hover:shadow-[0_24px_65px_rgba(2,62,115,0.14)] lg:grid-cols-[1.15fr_0.85fr]">
                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        className="relative min-h-[320px] overflow-hidden sm:min-h-[390px] lg:min-h-[480px]"
                      >
                        <img
                          src={getPostImage(featuredPost)}
                          alt={getPostAlt(featuredPost)}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#001b34]/60 via-transparent to-transparent" />

                        <span className="absolute left-5 top-5 rounded-full bg-[#ff6600] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg">
                          {getPostTag(featuredPost)}
                        </span>
                      </Link>

                      <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#0260fe]">
                            {featuredPost.category}
                          </span>

                          {featuredPost.publishedAt && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-slate-300" />

                              <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
                                <FaCalendarAlt />

                                {formatDate(featuredPost.publishedAt)}
                              </span>
                            </>
                          )}
                        </div>

                        <h3 className="mt-4 text-3xl font-black leading-[1.12] tracking-[-0.025em] text-[#023e73] sm:text-4xl">
                          {featuredPost.title}
                        </h3>

                        <p className="mt-4 text-base leading-8 text-slate-600">
                          {featuredPost.excerpt ||
                            "Descubre recomendaciones y consejos para preparar mejor tu próximo viaje."}
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-4">
                          <Link
                            to={`/blog/${featuredPost.slug}`}
                            className="inline-flex min-h-[48px] w-fit items-center gap-3 rounded-2xl bg-[#0260fe] px-6 py-3 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#014fd3] hover:shadow-lg"
                          >
                            Leer artículo
                            <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                          </Link>

                          {featuredPost.author && (
                            <span className="text-xs font-semibold text-slate-400">
                              Por {featuredPost.author}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                </section>
              )}

              {/* =============================================
                    ARTÍCULOS
                ============================================= */}

              <section className="bg-[#f5f8fc] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto max-w-7xl">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-3xl">
                      <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                        {isFiltering ? "Resultados" : "Más inspiración"}
                      </span>

                      <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.025em] text-[#023e73] sm:text-4xl">
                        {isFiltering
                          ? activeCategory === "Todos"
                            ? "Resultados de búsqueda"
                            : `Explorando ${activeCategory}`
                          : "Últimos artículos"}
                      </h2>

                      <p className="mt-3 text-base leading-7 text-slate-600">
                        Consejos, destinos y recomendaciones para ayudarte a
                        tomar mejores decisiones antes de viajar.
                      </p>
                    </div>

                    {isFiltering && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-600 transition hover:border-[#0260fe]/30 hover:text-[#0260fe]"
                      >
                        <FaTimes className="text-xs" />
                        Limpiar filtros
                      </button>
                    )}
                  </div>

                  {/* RESULTADOS */}

                  {regularPosts.length > 0 ? (
                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {regularPosts.map((post) => (
                        <BlogCard key={post._id || post.slug} post={post} />
                      ))}
                    </div>
                  ) : isFiltering ? (
                    <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-xl text-[#0260fe]">
                        <FaSearch />
                      </span>

                      <h3 className="mt-5 text-xl font-black text-[#023e73]">
                        No encontramos artículos
                      </h3>

                      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                        Intenta buscar otra palabra o vuelve a mostrar todas las
                        categorías.
                      </p>

                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0260fe] px-5 py-2.5 text-sm font-black text-white"
                      >
                        Mostrar todos
                      </button>
                    </div>
                  ) : (
                    <div className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
                      <p className="font-black text-[#023e73]">
                        Muy pronto publicaremos más contenido.
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Mientras tanto, puedes comenzar con nuestra guía
                        destacada.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* =============================================
                    DESTINOS / PRODUCTOS
                ============================================= */}

              <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto max-w-7xl">
                  <div className="mx-auto max-w-3xl text-center">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6600]">
                      De la inspiración al viaje
                    </span>

                    <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.025em] text-[#023e73] sm:text-4xl">
                      ¿Qué quieres buscar ahora?
                    </h2>

                    <p className="mt-4 text-base leading-7 text-slate-600">
                      Encuentra opciones para comenzar a convertir tus planes en
                      tu próximo viaje.
                    </p>
                  </div>

                  <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {travelShortcuts.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.title}
                          to={item.path}
                          className="group relative min-h-[300px] overflow-hidden rounded-3xl bg-[#023e73] shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                        >
                          <img
                            src={item.image}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[#001b34]/95 via-[#001b34]/38 to-transparent" />

                          <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-lg text-white backdrop-blur">
                            <Icon />
                          </span>

                          <div className="absolute inset-x-0 bottom-0 p-6">
                            <h3 className="text-2xl font-black text-white">
                              {item.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-white/75">
                              {item.description}
                            </p>

                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-white">
                              Explorar
                              <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* =============================================
                    CTA
                ============================================= */}

              <section className="bg-white px-4 pb-16 pt-2 sm:px-6 md:pb-24 lg:px-8">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#023e73] via-[#0260fe] to-[#3794ff] p-7 text-white shadow-xl sm:p-10 lg:p-14">
                  <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

                  <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#ff6600]/25 blur-3xl" />

                  <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
                      <span className="text-xs font-black uppercase tracking-[0.18em] text-white/65">
                        ¿Listo para viajar?
                      </span>

                      <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.025em] sm:text-4xl md:text-5xl">
                        Tu próxima experiencia puede empezar aquí
                      </h2>

                      <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                        Dinos a dónde quieres viajar, tus fechas, ciudad de
                        salida y número de viajeros. Nosotros te ayudamos a
                        encontrar opciones.
                      </p>
                    </div>

                    <a
                      href="https://wa.me/529984954637?text=Hola,%20quiero%20cotizar%20un%20viaje.%0A%0ADestino:%20%0AFechas:%20%0ACiudad%20de%20salida:%20%0ANúmero%20de%20viajeros:%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[54px] flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
                    >
                      <FaWhatsapp className="text-xl" />
                      Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

// ======================================================
// TARJETA DE ARTÍCULO
// ======================================================

function BlogCard({ post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(2,62,115,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/20 hover:shadow-[0_18px_45px_rgba(2,62,115,0.11)]">
      <Link
        to={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
        aria-label={`Leer ${post.title}`}
      >
        <img
          src={getPostImage(post)}
          alt={getPostAlt(post)}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#001b34]/35 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-[#023e73] shadow backdrop-blur">
          {getPostTag(post)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-[#ff6600]">
            {post.category}
          </span>

          {post.publishedAt && (
            <>
              <span className="h-1 w-1 rounded-full bg-slate-300" />

              <span className="text-xs font-semibold text-slate-400">
                {formatDate(post.publishedAt)}
              </span>
            </>
          )}
        </div>

        <h3 className="mt-3 text-xl font-black leading-snug text-[#023e73] transition group-hover:text-[#0260fe]">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
          {post.excerpt ||
            "Descubre consejos y recomendaciones para preparar mejor tu próximo viaje."}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex min-h-[40px] items-center gap-2 text-sm font-black text-[#0260fe]"
          >
            Leer artículo
            <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
          </Link>

          {post.author && (
            <span className="max-w-[120px] truncate text-xs font-semibold text-slate-400">
              {post.author}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ======================================================
// LOADING
// ======================================================

function BlogLoading() {
  return (
    <section className="bg-[#f5f8fc] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="animate-pulse">
          <div className="h-4 w-28 rounded bg-slate-200" />

          <div className="mt-3 h-9 w-72 max-w-full rounded bg-slate-200" />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
              >
                <div className="aspect-[16/10] bg-slate-200" />

                <div className="p-6">
                  <div className="h-3 w-20 rounded bg-slate-200" />

                  <div className="mt-4 h-6 w-full rounded bg-slate-200" />

                  <div className="mt-2 h-6 w-4/5 rounded bg-slate-200" />

                  <div className="mt-5 h-3 w-full rounded bg-slate-100" />

                  <div className="mt-2 h-3 w-3/4 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
