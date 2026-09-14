import { useCallback, useEffect, useMemo, useState } from "react";

import {
  FaCheckCircle,
  FaChevronRight,
  FaGlobe,
  FaSave,
  FaSearch,
  FaSpinner,
} from "react-icons/fa";

import Swal from "sweetalert2";

import api from "../../services/api";
import SEOEditor from "../components/SEOEditor";

// ======================================================
// CONFIG
// ======================================================

const SCHEMA_TYPES = [
  {
    value: "WebPage",
    label: "Página web",
  },
  {
    value: "CollectionPage",
    label: "Página de colección",
  },
  {
    value: "AboutPage",
    label: "Acerca de nosotros",
  },
  {
    value: "ContactPage",
    label: "Contacto",
  },
];

// ======================================================
// FORM VACÍO
// ======================================================

const EMPTY_FORM = {
  pageKey: "",
  label: "",
  path: "/",
  schemaType: "WebPage",
  isActive: true,

  seo: {
    focusKeyword: "",
    title: "",
    description: "",
    canonicalUrl: "",
    image: "",
    socialTitle: "",
    socialDescription: "",
    index: true,
    follow: true,
  },
};

// ======================================================
// NORMALIZAR DOCUMENTO
// ======================================================

const normalizePage = (page) => ({
  pageKey: page?.pageKey || "",

  label: page?.label || "",

  path: page?.path || "/",

  schemaType: page?.schemaType || "WebPage",

  isActive: page?.isActive !== false,

  seo: {
    focusKeyword: page?.seo?.focusKeyword || "",

    title: page?.seo?.title || "",

    description: page?.seo?.description || "",

    canonicalUrl: page?.seo?.canonicalUrl || "",

    image: page?.seo?.image || "",

    socialTitle: page?.seo?.socialTitle || "",

    socialDescription: page?.seo?.socialDescription || "",

    index: page?.seo?.index !== false,

    follow: page?.seo?.follow !== false,
  },
});

// ======================================================
// ERROR MESSAGE
// ======================================================

const getErrorMessage = (error) => {
  const apiMessage = error?.response?.data?.message;

  if (apiMessage) {
    return apiMessage;
  }

  return "Ocurrió un error inesperado.";
};

// ======================================================
// COMPONENT
// ======================================================

const SeoAdmin = () => {
  // ====================================================
  // STATE
  // ====================================================

  const [pages, setPages] = useState([]);

  const [selectedKey, setSelectedKey] = useState("");

  const [form, setForm] = useState(EMPTY_FORM);

  const [originalForm, setOriginalForm] = useState(EMPTY_FORM);

  const [loadingPages, setLoadingPages] = useState(true);

  const [loadingPage, setLoadingPage] = useState(false);

  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  // ====================================================
  // CAMBIOS SIN GUARDAR
  // ====================================================

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(originalForm),
    [form, originalForm],
  );

  // ====================================================
  // FILTRAR PÁGINAS
  // ====================================================

  const filteredPages = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return pages;
    }

    return pages.filter((page) => {
      const content = [page.label, page.pageKey, page.path]
        .join(" ")
        .toLowerCase();

      return content.includes(term);
    });
  }, [pages, search]);

  // ====================================================
  // CARGAR LISTADO
  // ====================================================

  const loadPages = useCallback(async () => {
    setLoadingPages(true);

    setError("");

    try {
      const response = await api.get("/page-seo/admin");

      const data = Array.isArray(response.data) ? response.data : [];

      setPages(data);

      if (data.length > 0 && !selectedKey) {
        const home = data.find((page) => page.pageKey === "home");

        setSelectedKey(home?.pageKey || data[0].pageKey);
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoadingPages(false);
    }
  }, [selectedKey]);

  // ====================================================
  // CARGAR PÁGINA
  // ====================================================

  const loadPage = useCallback(async (pageKey) => {
    if (!pageKey) {
      return;
    }

    setLoadingPage(true);

    setError("");

    try {
      const response = await api.get(
        `/page-seo/admin/${encodeURIComponent(pageKey)}`,
      );

      const normalized = normalizePage(response.data);

      setForm(normalized);

      setOriginalForm(normalized);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoadingPage(false);
    }
  }, []);

  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {
    loadPages();
  }, []);

  // ====================================================
  // LOAD SELECTED PAGE
  // ====================================================

  useEffect(() => {
    if (selectedKey) {
      loadPage(selectedKey);
    }
  }, [selectedKey, loadPage]);

  // ====================================================
  // AVISO AL CERRAR CON CAMBIOS
  // ====================================================

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isDirty) {
        return;
      }

      event.preventDefault();

      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  // ====================================================
  // CAMBIAR PÁGINA
  // ====================================================

  const handleSelectPage = async (pageKey) => {
    if (pageKey === selectedKey) {
      return;
    }

    if (isDirty) {
      const result = await Swal.fire({
        title: "Cambios sin guardar",

        text: "Si cambias de página perderás los cambios que todavía no has guardado.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Cambiar de página",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#0260fe",
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    setSelectedKey(pageKey);
  };

  // ====================================================
  // CAMBIAR SEO
  // ====================================================

  const handleSeoChange = (newSeo) => {
    setForm((current) => ({
      ...current,
      seo: newSeo,
    }));
  };

  // ====================================================
  // CAMBIAR CONFIG GENERAL
  // ====================================================

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // ====================================================
  // GUARDAR
  // ====================================================

  const handleSave = async () => {
    if (!form.pageKey) {
      return;
    }

    setSaving(true);

    try {
      const payload = {
        label: form.label,

        schemaType: form.schemaType,

        isActive: form.isActive,

        seo: form.seo,
      };

      const response = await api.put(
        `/page-seo/${encodeURIComponent(form.pageKey)}`,
        payload,
      );

      const normalized = normalizePage(response.data);

      setForm(normalized);

      setOriginalForm(normalized);

      // Actualizar listado lateral
      setPages((current) =>
        current.map((page) =>
          page.pageKey === normalized.pageKey
            ? {
                ...page,
                ...normalized,
              }
            : page,
        ),
      );

      await Swal.fire({
        icon: "success",

        title: "SEO actualizado",

        text: `La configuración SEO de ${normalized.label} se guardó correctamente.`,

        confirmButtonText: "Aceptar",

        confirmButtonColor: "#0260fe",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",

        title: "No se pudo guardar",

        text: getErrorMessage(error),

        confirmButtonText: "Aceptar",

        confirmButtonColor: "#0260fe",
      });
    } finally {
      setSaving(false);
    }
  };

  // ====================================================
  // DESCARTAR CAMBIOS
  // ====================================================

  const handleDiscard = async () => {
    if (!isDirty) {
      return;
    }

    const result = await Swal.fire({
      title: "Descartar cambios",

      text: "Se restaurará la última configuración guardada.",

      icon: "question",

      showCancelButton: true,

      confirmButtonText: "Descartar",

      cancelButtonText: "Cancelar",

      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      setForm(originalForm);
    }
  };

  // ====================================================
  // LOADING GENERAL
  // ====================================================

  if (loadingPages) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <FaSpinner className="mx-auto animate-spin text-3xl text-[#0260fe]" />

          <p className="mt-4 text-sm font-bold text-slate-500">
            Cargando VTD SEO...
          </p>
        </div>
      </div>
    );
  }

  // ====================================================
  // ERROR SIN PÁGINAS
  // ====================================================

  if (error && pages.length === 0) {
    return (
      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
          <h2 className="text-xl font-black text-red-700">
            No pudimos cargar VTD SEO
          </h2>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={loadPages}
            className="mt-5 rounded-xl bg-[#0260fe] px-5 py-3 text-sm font-black text-white"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-slate-200 bg-white">
        <div className="px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0260fe]">
                  <FaSearch />
                </span>

                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                  VTD SEO
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-black text-[#023e73] sm:text-3xl">
                Optimización SEO
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Administra cómo aparecen las páginas de Viaja a tu Destino en
                buscadores y redes sociales.
              </p>
            </div>

            {/* SAVE ACTIONS */}

            <div className="flex flex-wrap items-center gap-3">
              {isDirty && (
                <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-black text-amber-700">
                  Cambios sin guardar
                </span>
              )}

              <button
                type="button"
                onClick={handleDiscard}
                disabled={!isDirty || saving}
                className="min-h-[44px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Descartar
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!isDirty || saving || loadingPage}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#0260fe] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#0251d4] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}

                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* =================================================
            SIDEBAR PAGES
        ================================================= */}

        <aside className="border-b border-slate-200 bg-white lg:min-h-[calc(100vh-154px)] lg:border-b-0 lg:border-r">
          <div className="sticky top-0 p-4 sm:p-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                Páginas del sitio
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Selecciona una página para configurar su SEO.
              </p>
            </div>

            {/* SEARCH */}

            <div className="relative mt-4">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar página..."
                className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0260fe] focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

            {/* MOBILE */}

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {filteredPages.map((page) => {
                const active = page.pageKey === selectedKey;

                return (
                  <button
                    key={page._id || page.pageKey}
                    type="button"
                    onClick={() => handleSelectPage(page.pageKey)}
                    className={`shrink-0 rounded-xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-[#0260fe] bg-blue-50 text-[#0260fe]"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    <p className="whitespace-nowrap text-sm font-black">
                      {page.label}
                    </p>

                    <p className="mt-0.5 whitespace-nowrap text-[11px] opacity-60">
                      {page.path}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* DESKTOP */}

            <div className="mt-4 hidden space-y-1.5 lg:block">
              {filteredPages.map((page) => {
                const active = page.pageKey === selectedKey;

                return (
                  <button
                    key={page._id || page.pageKey}
                    type="button"
                    onClick={() => handleSelectPage(page.pageKey)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      active ? "bg-blue-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? "bg-[#0260fe] text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <FaGlobe className="text-xs" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-sm font-black ${
                          active ? "text-[#0260fe]" : "text-slate-700"
                        }`}
                      >
                        {page.label}
                      </span>

                      <span className="mt-0.5 block truncate text-[11px] font-medium text-slate-400">
                        {page.path}
                      </span>
                    </span>

                    {page.isActive !== false ? (
                      <FaCheckCircle className="shrink-0 text-xs text-emerald-500" />
                    ) : (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                    )}

                    <FaChevronRight
                      className={`shrink-0 text-[10px] ${
                        active ? "text-[#0260fe]" : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}

              {filteredPages.length === 0 && (
                <div className="py-8 text-center text-sm font-semibold text-slate-400">
                  No encontramos páginas.
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* =================================================
            EDITOR
        ================================================= */}

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          {loadingPage ? (
            <div className="flex min-h-[500px] items-center justify-center">
              <div className="text-center">
                <FaSpinner className="mx-auto animate-spin text-3xl text-[#0260fe]" />

                <p className="mt-4 text-sm font-bold text-slate-500">
                  Cargando configuración...
                </p>
              </div>
            </div>
          ) : form.pageKey ? (
            <div className="mx-auto max-w-6xl space-y-6">
              {/* =========================================
                  PAGE INFORMATION
              ========================================= */}

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0260fe]">
                      Página seleccionada
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-[#023e73]">
                      {form.label}
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-slate-500">
                        {form.path}
                      </span>

                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 font-bold text-[#0260fe]">
                        {form.pageKey}
                      </span>
                    </div>
                  </div>

                  {/* ACTIVE */}

                  <button
                    type="button"
                    onClick={() => updateField("isActive", !form.isActive)}
                    className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                      form.isActive
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-black text-slate-700">
                        SEO público
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {form.isActive
                          ? "Configuración activa"
                          : "Configuración desactivada"}
                      </p>
                    </div>

                    <span
                      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
                        form.isActive ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                          form.isActive ? "left-6" : "left-1"
                        }`}
                      />
                    </span>
                  </button>
                </div>

                {/* =======================================
                    SCHEMA TYPE
                ======================================= */}

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <label className="block text-sm font-black text-slate-700">
                    Tipo de página para datos estructurados
                  </label>

                  <select
                    value={form.schemaType}
                    onChange={(event) =>
                      updateField("schemaType", event.target.value)
                    }
                    className="mt-2 min-h-[48px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0260fe] focus:ring-4 focus:ring-blue-50 sm:max-w-md"
                  >
                    {SCHEMA_TYPES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Este valor se utilizará posteriormente para generar
                    Schema.org automáticamente.
                  </p>
                </div>
              </section>

              {/* =========================================
                  SEO EDITOR
              ========================================= */}

              <SEOEditor
                seo={form.seo}
                onChange={handleSeoChange}
                pageLabel={form.label}
                pagePath={form.path}
              />

              {/* =========================================
                  BOTTOM SAVE
              ========================================= */}

              <div className="sticky bottom-4 z-20">
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-700">
                      {isDirty
                        ? "Tienes cambios sin guardar"
                        : "Todos los cambios están guardados"}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Página: {form.label}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleDiscard}
                      disabled={!isDirty || saving}
                      className="min-h-[44px] rounded-xl border border-slate-200 px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                    >
                      Descartar
                    </button>

                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={!isDirty || saving}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0260fe] px-5 text-sm font-black text-white transition hover:bg-[#0251d4] disabled:opacity-50"
                    >
                      {saving ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaSave />
                      )}

                      {saving ? "Guardando..." : "Guardar SEO"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <FaGlobe className="mx-auto text-4xl text-slate-300" />

              <h2 className="mt-4 text-xl font-black text-[#023e73]">
                Selecciona una página
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Elige una página para comenzar a configurar su SEO.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SeoAdmin;
