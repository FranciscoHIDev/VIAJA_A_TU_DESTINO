import React, { useCallback, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaFacebookF,
  FaHome,
  FaTag,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO/SEO";

import api from "../../services/api";

// ======================================================
// CONFIGURACIÓN
// ======================================================

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/duaysiozi/image/upload/v1784166871/f6thrmw2fynxpyo0ak5e.png";

const SITE_URL = "https://www.viajaatudestino.com";

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

const textFromHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const calculateReadingTime = (content = "") => {
  const text = textFromHtml(content);

  if (!text) {
    return 1;
  }

  const words = text.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
};

// ======================================================
// BLOG ARTICLE
// ======================================================

function BlogArticle() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ====================================================
  // CARGAR ARTÍCULO
  // ====================================================

  const loadArticle = useCallback(async () => {
    if (!slug) {
      setError("No se encontró el artículo.");

      setLoading(false);

      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/blog/${encodeURIComponent(slug)}`);

      setArticle(response.data);
    } catch (requestError) {
      console.error("Error cargando artículo:", requestError);

      if (requestError?.response?.status === 404) {
        setError(
          "El artículo que buscas no existe o todavía no está disponible.",
        );
      } else {
        setError(
          requestError?.response?.data?.message ||
            "No fue posible cargar este artículo.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadArticle();
  }, [loadArticle]);

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <React.Fragment>
        <div className="flex min-h-screen flex-col bg-[#f5f8fc]">
          <NavBar />

          <main className="flex-1">
            <ArticleLoading />
          </main>

          <Footer />
        </div>
      </React.Fragment>
    );
  }

  // ====================================================
  // ERROR
  // ====================================================

  if (error || !article) {
    return (
      <React.Fragment>
        <SEO
          title="Artículo no encontrado"
          description="El artículo que buscas no está disponible."
          image={FALLBACK_IMAGE}
          url={`${SITE_URL}/blog`}
        />

        <div className="flex min-h-screen flex-col bg-[#f5f8fc]">
          <NavBar />

          <main className="flex flex-1 items-center justify-center px-4 py-20 sm:px-6">
            <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-[#0260fe]">
                <FaBookOpen />
              </div>

              <h1 className="mt-6 text-2xl font-black text-[#023e73] sm:text-3xl">
                No encontramos este artículo
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                {error}
              </p>

              <Link
                to="/blog"
                className="mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#0260fe] px-6 py-3 text-sm font-black text-white transition hover:bg-[#014fd3]"
              >
                <FaArrowLeft />
                Volver al blog
              </Link>
            </div>
          </main>

          <Footer />
        </div>
      </React.Fragment>
    );
  }

  // ====================================================
  // INFORMACIÓN
  // ====================================================

  const articleImage = article?.featuredImage?.url || FALLBACK_IMAGE;

  const articleAlt = article?.featuredImage?.alt || article.title;

  const publishedDate = formatDate(article.publishedAt);

  const readingTime = calculateReadingTime(article.content);

  const articleUrl =
    article?.seo?.canonicalUrl || `${SITE_URL}/blog/${article.slug}`;

  const seoTitle = article?.seo?.title || article.title;

  const seoDescription =
    article?.seo?.description ||
    article.excerpt ||
    textFromHtml(article.content).slice(0, 160);

  const seoImage = article?.seo?.image || articleImage;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${article.title} ${articleUrl}`,
  )}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    articleUrl,
  )}`;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <React.Fragment>
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={articleUrl}
      />

      <div className="flex min-h-screen flex-col bg-white text-slate-800">
        <NavBar />

        <main className="flex-1">
          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-hidden px-4 py-4 text-xs font-semibold text-slate-500 sm:px-6 lg:px-8">
              <Link
                to="/"
                className="inline-flex shrink-0 items-center gap-2 transition hover:text-[#0260fe]"
              >
                <FaHome />
                Inicio
              </Link>

              <span className="text-slate-300">/</span>

              <Link
                to="/blog"
                className="shrink-0 transition hover:text-[#0260fe]"
              >
                Blog
              </Link>

              <span className="text-slate-300">/</span>

              <span className="truncate text-slate-400">{article.title}</span>
            </div>
          </section>

          {/* =================================================
              HERO ARTÍCULO
          ================================================= */}

          <header className="bg-[#f5f8fc]">
            <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pb-16">
              <div className="mx-auto max-w-4xl text-center">
                {/* CATEGORÍA */}

                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#0260fe]"
                >
                  <FaTag />

                  {article.category}
                </Link>

                {/* TÍTULO */}

                <h1 className="mt-6 text-4xl font-black leading-[1.06] tracking-[-0.035em] text-[#023e73] sm:text-5xl lg:text-6xl">
                  {article.title}
                </h1>

                {/* EXCERPT */}

                {article.excerpt && (
                  <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                    {article.excerpt}
                  </p>
                )}

                {/* META */}

                <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-semibold text-slate-500">
                  {article.author && (
                    <span className="inline-flex items-center gap-2">
                      <FaUser className="text-[#0260fe]" />

                      {article.author}
                    </span>
                  )}

                  {publishedDate && (
                    <span className="inline-flex items-center gap-2">
                      <FaCalendarAlt className="text-[#0260fe]" />

                      {publishedDate}
                    </span>
                  )}

                  <span className="inline-flex items-center gap-2">
                    <FaClock className="text-[#0260fe]" />
                    {readingTime} {readingTime === 1 ? "minuto" : "minutos"} de
                    lectura
                  </span>
                </div>
              </div>

              {/* IMAGEN PRINCIPAL */}

              <div className="relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-[2rem] bg-slate-200 shadow-[0_24px_70px_rgba(2,62,115,0.14)]">
                <img
                  src={articleImage}
                  alt={articleAlt}
                  fetchPriority="high"
                  className="aspect-[16/8] w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b34]/20 via-transparent to-transparent" />
              </div>
            </div>
          </header>

          {/* =================================================
              CUERPO
          ================================================= */}

          <section className="bg-white px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,760px)_280px] lg:justify-center">
              {/* ===============================================
                  ARTÍCULO
              =============================================== */}

              <article className="min-w-0">
                {/* BOTÓN VOLVER */}

                <Link
                  to="/blog"
                  className="mb-8 inline-flex items-center gap-2 text-sm font-black text-[#0260fe] transition hover:gap-3"
                >
                  <FaArrowLeft />
                  Volver al blog
                </Link>

                {/* =============================================
                    CONTENIDO HTML
                ============================================= */}

                <div
                  className="
                    blog-content
                    text-[17px]
                    leading-[1.85]
                    text-slate-700

                    [&_p]:mb-6

                    [&_h2]:mb-4
                    [&_h2]:mt-12
                    [&_h2]:text-3xl
                    [&_h2]:font-black
                    [&_h2]:leading-tight
                    [&_h2]:tracking-[-0.025em]
                    [&_h2]:text-[#023e73]

                    [&_h3]:mb-3
                    [&_h3]:mt-9
                    [&_h3]:text-2xl
                    [&_h3]:font-black
                    [&_h3]:leading-tight
                    [&_h3]:text-[#023e73]

                    [&_h4]:mb-3
                    [&_h4]:mt-8
                    [&_h4]:text-xl
                    [&_h4]:font-black
                    [&_h4]:text-[#023e73]

                    [&_strong]:font-black
                    [&_strong]:text-slate-900

                    [&_a]:font-bold
                    [&_a]:text-[#0260fe]
                    [&_a]:underline
                    [&_a]:decoration-blue-200
                    [&_a]:underline-offset-4

                    [&_ul]:my-6
                    [&_ul]:list-disc
                    [&_ul]:space-y-3
                    [&_ul]:pl-6

                    [&_ol]:my-6
                    [&_ol]:list-decimal
                    [&_ol]:space-y-3
                    [&_ol]:pl-6

                    [&_li]:pl-1

                    [&_blockquote]:my-8
                    [&_blockquote]:rounded-r-2xl
                    [&_blockquote]:border-l-4
                    [&_blockquote]:border-[#0260fe]
                    [&_blockquote]:bg-blue-50
                    [&_blockquote]:px-6
                    [&_blockquote]:py-5
                    [&_blockquote]:font-semibold
                    [&_blockquote]:italic
                    [&_blockquote]:text-[#023e73]

                    [&_img]:my-8
                    [&_img]:h-auto
                    [&_img]:w-full
                    [&_img]:rounded-3xl
                    [&_img]:object-cover

                    [&_figure]:my-8

                    [&_figcaption]:mt-2
                    [&_figcaption]:text-center
                    [&_figcaption]:text-sm
                    [&_figcaption]:text-slate-400

                    [&_hr]:my-10
                    [&_hr]:border-slate-200
                  "
                  dangerouslySetInnerHTML={{
                    __html: article.content,
                  }}
                />

                {/* =============================================
                    ETIQUETAS
                ============================================= */}

                {Array.isArray(article.tags) && article.tags.length > 0 && (
                  <div className="mt-12 border-t border-slate-200 pt-7">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                      Temas relacionados
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* =============================================
                    COMPARTIR MÓVIL
                ============================================= */}

                <div className="mt-10 rounded-3xl bg-[#f5f8fc] p-6 lg:hidden">
                  <ShareArticle
                    whatsappUrl={whatsappUrl}
                    facebookUrl={facebookUrl}
                  />
                </div>
              </article>

              {/* ===============================================
                  SIDEBAR
              =============================================== */}

              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-5">
                  {/* COMPARTIR */}

                  <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <ShareArticle
                      whatsappUrl={whatsappUrl}
                      facebookUrl={facebookUrl}
                    />
                  </section>

                  {/* CTA */}

                  <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#023e73] via-[#0252ad] to-[#0260fe] p-6 text-white shadow-lg">
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10" />

                    <div className="relative">
                      <span className="text-xs font-black uppercase tracking-[0.14em] text-blue-100">
                        Viaja a tu Destino
                      </span>

                      <h3 className="mt-3 text-2xl font-black leading-tight">
                        ¿Quieres cotizar tu próximo viaje?
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-white/75">
                        Cuéntanos tu destino, fechas, ciudad de salida y número
                        de viajeros.
                      </p>

                      <a
                        href="https://wa.me/529984954637?text=Hola,%20quiero%20cotizar%20un%20viaje.%0A%0ADestino:%20%0AFechas:%20%0ACiudad%20de%20salida:%20%0ANúmero%20de%20viajeros:%20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-black text-white transition hover:bg-[#1ebe5d]"
                      >
                        <FaWhatsapp />
                        Cotizar viaje
                      </a>
                    </div>
                  </section>
                </div>
              </aside>
            </div>
          </section>

          {/* =================================================
              CTA FINAL
          ================================================= */}

          <section className="bg-[#f5f8fc] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#023e73] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
              <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#0260fe]/50 blur-3xl" />

              <div className="absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[#ff6600]/20 blur-3xl" />

              <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-blue-200">
                    Sigue explorando
                  </span>

                  <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                    Encuentra más ideas para tu próximo viaje
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                    Descubre más destinos, consejos, hoteles y recomendaciones
                    en nuestro blog.
                  </p>
                </div>

                <Link
                  to="/blog"
                  className="inline-flex min-h-[52px] flex-none items-center justify-center gap-3 rounded-2xl bg-white px-6 py-3 text-sm font-black text-[#023e73] transition hover:-translate-y-0.5"
                >
                  Ver más artículos
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

// ======================================================
// COMPARTIR
// ======================================================

function ShareArticle({ whatsappUrl, facebookUrl }) {
  return (
    <>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
        Compartir artículo
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-xs font-black text-white transition hover:bg-[#1ebe5d]"
        >
          <FaWhatsapp />
          WhatsApp
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-3 py-2.5 text-xs font-black text-white transition hover:bg-[#1265d1]"
        >
          <FaFacebookF />
          Facebook
        </a>
      </div>
    </>
  );
}

// ======================================================
// LOADING
// ======================================================

function ArticleLoading() {
  return (
    <section className="bg-[#f5f8fc] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mx-auto h-7 w-28 rounded-full bg-slate-200" />

        <div className="mx-auto mt-7 h-12 max-w-3xl rounded-2xl bg-slate-200" />

        <div className="mx-auto mt-3 h-12 max-w-2xl rounded-2xl bg-slate-200" />

        <div className="mx-auto mt-6 h-5 max-w-xl rounded bg-slate-200" />

        <div className="mt-10 aspect-[16/8] w-full rounded-[2rem] bg-slate-200" />

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          <div className="h-4 w-full rounded bg-slate-200" />

          <div className="h-4 w-full rounded bg-slate-200" />

          <div className="h-4 w-10/12 rounded bg-slate-200" />

          <div className="mt-8 h-8 w-7/12 rounded bg-slate-200" />

          <div className="h-4 w-full rounded bg-slate-200" />

          <div className="h-4 w-11/12 rounded bg-slate-200" />
        </div>
      </div>
    </section>
  );
}

export default BlogArticle;
