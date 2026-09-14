import { useMemo } from "react";
import {
  FaCheck,
  FaExclamationTriangle,
  FaGlobe,
  FaImage,
  FaLink,
  FaRobot,
  FaSearch,
  FaShareAlt,
  FaTimes,
} from "react-icons/fa";

import { analyzeSeo } from "../../utils/seoAnalyzer";

// ======================================================
// CONFIGURACIÓN
// ======================================================

const SITE_NAME = "Viaja a tu Destino";

const SITE_URL = "https://www.viajaatudestino.com";

// ======================================================
// SEO EDITOR
// ======================================================

const SEOEditor = ({
  seo = {},

  onChange,

  pageLabel = "",

  pagePath = "/",

  fallbackTitle = "",

  fallbackDescription = "",

  fallbackImage = "",

  content = "",

  slug = "",

  imageAlt = "",
}) => {
  // ====================================================
  // VALORES EFECTIVOS
  // ====================================================

  const effectiveTitle = seo.title || fallbackTitle || "";

  const effectiveDescription = seo.description || fallbackDescription || "";

  const effectiveSocialTitle = seo.socialTitle || effectiveTitle;

  const effectiveSocialDescription =
    seo.socialDescription || effectiveDescription;

  const effectiveImage = seo.image || fallbackImage || "";

  const generatedCanonical =
    pagePath === "/" ? SITE_URL : `${SITE_URL}${pagePath}`;

  const effectiveCanonical = seo.canonicalUrl || generatedCanonical;

  // ====================================================
  // ANÁLISIS
  // ====================================================

  const analysis = useMemo(
    () =>
      analyzeSeo({
        focusKeyword: seo.focusKeyword || "",

        title: effectiveTitle,

        description: effectiveDescription,

        canonicalUrl: effectiveCanonical,

        image: effectiveImage,

        socialTitle: seo.socialTitle || "",

        socialDescription: seo.socialDescription || "",

        index: seo.index !== false,

        follow: seo.follow !== false,

        content,

        slug,

        imageAlt,
      }),
    [
      seo.focusKeyword,
      seo.title,
      seo.description,
      seo.canonicalUrl,
      seo.image,
      seo.socialTitle,
      seo.socialDescription,
      seo.index,
      seo.follow,
      effectiveTitle,
      effectiveDescription,
      effectiveCanonical,
      effectiveImage,
      content,
      slug,
      imageAlt,
    ],
  );

  // ====================================================
  // CAMBIAR CAMPO
  // ====================================================

  const updateSeo = (field, value) => {
    if (!onChange) {
      return;
    }

    onChange({
      ...seo,
      [field]: value,
    });
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="space-y-6">
      {/* =================================================
          CABECERA
      ================================================= */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-[#023e73] via-[#0251b5] to-[#0260fe] px-5 py-6 text-white sm:px-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FaSearch className="text-blue-200" />

                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-100">
                  VTD SEO
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-black">Optimización SEO</h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-blue-100">
                {pageLabel
                  ? `Configura cómo debe aparecer ${pageLabel} en buscadores y redes sociales.`
                  : "Configura cómo debe aparecer esta página en buscadores y redes sociales."}
              </p>
            </div>

            <ScoreBadge analysis={analysis} />
          </div>
        </div>

        {/* =================================================
            RESUMEN
        ================================================= */}

        <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
          <SummaryCard
            label="Correcto"
            value={analysis.summary.good}
            type="good"
          />

          <SummaryCard
            label="Por mejorar"
            value={analysis.summary.warning}
            type="warning"
          />

          <SummaryCard
            label="Errores"
            value={analysis.summary.error}
            type="error"
          />
        </div>
      </section>

      {/* =================================================
          SEO PRINCIPAL
      ================================================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <SectionHeading
          icon={FaSearch}
          title="SEO para buscadores"
          description="Configura la información principal que usarán los motores de búsqueda."
        />

        <div className="mt-6 space-y-6">
          {/* FRASE CLAVE */}

          <Field>
            <FieldHeader>
              <Label>Frase clave objetivo</Label>
            </FieldHeader>

            <input
              type="text"
              value={seo.focusKeyword || ""}
              onChange={(event) =>
                updateSeo("focusKeyword", event.target.value)
              }
              placeholder="Ej. ofertas de viajes"
              className={inputClass}
            />

            <HelpText>
              Es la búsqueda principal para la que quieres optimizar esta
              página.
            </HelpText>
          </Field>

          {/* TITLE */}

          <Field>
            <FieldHeader>
              <Label>Título SEO</Label>

              <CharacterCounter value={seo.title || ""} recommended={60} />
            </FieldHeader>

            <input
              type="text"
              value={seo.title || ""}
              onChange={(event) => updateSeo("title", event.target.value)}
              placeholder={fallbackTitle || "Título que aparecerá en Google"}
              className={inputClass}
            />

            {!seo.title && fallbackTitle && (
              <FallbackNotice>
                Se está usando el título predeterminado:{" "}
                <strong>{fallbackTitle}</strong>
              </FallbackNotice>
            )}
          </Field>

          {/* DESCRIPTION */}

          <Field>
            <FieldHeader>
              <Label>Meta descripción</Label>

              <CharacterCounter
                value={seo.description || ""}
                recommended={160}
              />
            </FieldHeader>

            <textarea
              rows={4}
              value={seo.description || ""}
              onChange={(event) => updateSeo("description", event.target.value)}
              placeholder={
                fallbackDescription ||
                "Describe esta página para los resultados de búsqueda."
              }
              className={`${inputClass} resize-none py-3`}
            />

            {!seo.description && fallbackDescription && (
              <FallbackNotice>
                Se está usando la descripción predeterminada.
              </FallbackNotice>
            )}
          </Field>

          {/* CANONICAL */}

          <Field>
            <FieldHeader>
              <Label>URL canónica</Label>

              <FaLink className="text-slate-400" />
            </FieldHeader>

            <input
              type="url"
              value={seo.canonicalUrl || ""}
              onChange={(event) =>
                updateSeo("canonicalUrl", event.target.value)
              }
              placeholder={generatedCanonical}
              className={inputClass}
            />

            <HelpText>
              Si la dejas vacía, utilizaremos automáticamente:{" "}
              <strong>{generatedCanonical}</strong>
            </HelpText>
          </Field>
        </div>
      </section>

      {/* =================================================
          GOOGLE PREVIEW
      ================================================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <SectionHeading
          icon={FaGlobe}
          title="Vista previa en Google"
          description="Esta es una aproximación de cómo podría verse el resultado."
        />

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0260fe] text-sm font-black text-white">
              V
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800">{SITE_NAME}</p>

              <p className="truncate text-xs text-slate-500">
                {effectiveCanonical}
              </p>
            </div>
          </div>

          <h3 className="mt-4 text-xl font-medium leading-snug text-[#1a0dab] sm:text-[21px]">
            {effectiveTitle || "Título SEO de la página"}
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {effectiveDescription ||
              "Agrega una meta descripción para mostrar una vista previa del resultado."}
          </p>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-400">
          Google puede modificar el título o la descripción que muestra
          dependiendo de la búsqueda del usuario.
        </p>
      </section>

      {/* =================================================
          SOCIAL
      ================================================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <SectionHeading
          icon={FaShareAlt}
          title="Redes sociales"
          description="Personaliza cómo se verá la página cuando se comparta."
        />

        <div className="mt-6 grid gap-7 xl:grid-cols-[1fr_1.05fr]">
          {/* FIELDS */}

          <div className="space-y-6">
            <Field>
              <FieldHeader>
                <Label>Título social</Label>

                <CharacterCounter
                  value={seo.socialTitle || ""}
                  recommended={70}
                />
              </FieldHeader>

              <input
                type="text"
                value={seo.socialTitle || ""}
                onChange={(event) =>
                  updateSeo("socialTitle", event.target.value)
                }
                placeholder={effectiveTitle || "Título para redes sociales"}
                className={inputClass}
              />

              <HelpText>
                Si lo dejas vacío, utilizaremos el título SEO.
              </HelpText>
            </Field>

            <Field>
              <FieldHeader>
                <Label>Descripción social</Label>

                <CharacterCounter
                  value={seo.socialDescription || ""}
                  recommended={160}
                />
              </FieldHeader>

              <textarea
                rows={3}
                value={seo.socialDescription || ""}
                onChange={(event) =>
                  updateSeo("socialDescription", event.target.value)
                }
                placeholder={
                  effectiveDescription || "Descripción para redes sociales"
                }
                className={`${inputClass} resize-none py-3`}
              />

              <HelpText>
                Si la dejas vacía, utilizaremos la meta descripción.
              </HelpText>
            </Field>

            <Field>
              <FieldHeader>
                <Label>Imagen social</Label>

                <FaImage className="text-slate-400" />
              </FieldHeader>

              <input
                type="url"
                value={seo.image || ""}
                onChange={(event) => updateSeo("image", event.target.value)}
                placeholder="https://..."
                className={inputClass}
              />

              {fallbackImage && !seo.image && (
                <button
                  type="button"
                  onClick={() => updateSeo("image", fallbackImage)}
                  className="inline-flex items-center gap-2 text-sm font-black text-[#0260fe] transition hover:text-[#023e73]"
                >
                  <FaImage />
                  Usar imagen predeterminada
                </button>
              )}
            </Field>
          </div>

          {/* SOCIAL PREVIEW */}

          <div>
            <p className="mb-3 text-sm font-black text-slate-700">
              Vista previa al compartir
            </p>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[1.91/1] bg-slate-100">
                {effectiveImage ? (
                  <img
                    src={effectiveImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
                    <FaImage className="text-3xl" />

                    <span className="text-sm font-bold">Sin imagen social</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 bg-slate-50 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">
                  VIAJAATUDESTINO.COM
                </p>

                <h4 className="mt-2 text-base font-black leading-snug text-slate-900">
                  {effectiveSocialTitle || "Título de la página"}
                </h4>

                <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">
                  {effectiveSocialDescription ||
                    "Descripción de la página para redes sociales."}
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-400">
              Esta vista será usada más adelante como base para Open Graph y
              Twitter/X Cards.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          INDEXACIÓN
      ================================================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <SectionHeading
          icon={FaRobot}
          title="Indexación"
          description="Controla cómo deben tratar los buscadores esta página."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ToggleCard
            title="Permitir indexación"
            description="Permite que esta página pueda aparecer en los resultados de búsqueda."
            checked={seo.index !== false}
            onChange={(value) => updateSeo("index", value)}
          />

          <ToggleCard
            title="Seguir enlaces"
            description="Permite que los buscadores sigan los enlaces encontrados en esta página."
            checked={seo.follow !== false}
            onChange={(value) => updateSeo("follow", value)}
          />
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-400">
            Robots resultante
          </p>

          <code className="mt-2 block text-sm font-bold text-[#023e73]">
            {seo.index !== false ? "index" : "noindex"},{" "}
            {seo.follow !== false ? "follow" : "nofollow"}
          </code>
        </div>
      </section>

      {/* =================================================
          ANÁLISIS
      ================================================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeading
            icon={FaSearch}
            title="Análisis VTD SEO"
            description="Recomendaciones editoriales para mejorar la configuración."
          />

          <ScoreBadge analysis={analysis} compact />
        </div>

        <div className="mt-6 space-y-3">
          {analysis.checks.map((check) => (
            <SeoCheck key={check.id} check={check} />
          ))}
        </div>
      </section>

      {/* =================================================
          MÉTRICAS
      ================================================= */}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Título"
          value={analysis.metrics.titleLength}
          suffix="/60"
        />

        <MetricCard
          label="Descripción"
          value={analysis.metrics.descriptionLength}
          suffix="/160"
        />

        <MetricCard
          label="Título social"
          value={analysis.metrics.socialTitleLength}
          suffix="/70"
        />

        <MetricCard
          label="Descripción social"
          value={analysis.metrics.socialDescriptionLength}
          suffix="/160"
        />
      </section>
    </div>
  );
};

// ======================================================
// CLASES
// ======================================================

const inputClass =
  "min-h-[48px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0260fe] focus:ring-4 focus:ring-blue-50";

// ======================================================
// FIELD
// ======================================================

const Field = ({ children }) => <div className="space-y-2">{children}</div>;

const FieldHeader = ({ children }) => (
  <div className="flex items-center justify-between gap-3">{children}</div>
);

const Label = ({ children }) => (
  <label className="text-sm font-black text-slate-700">{children}</label>
);

const HelpText = ({ children }) => (
  <p className="text-xs leading-5 text-slate-400">{children}</p>
);

const FallbackNotice = ({ children }) => (
  <div className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs leading-5 text-blue-700">
    {children}
  </div>
);

// ======================================================
// SECTION HEADING
// ======================================================

const SectionHeading = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0260fe]">
      <Icon />
    </div>

    <div>
      <h3 className="font-black text-[#023e73]">{title}</h3>

      {description && (
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      )}
    </div>
  </div>
);

// ======================================================
// CHARACTER COUNTER
// ======================================================

const CharacterCounter = ({ value, recommended }) => {
  const length = String(value || "").length;

  const over = length > recommended;

  return (
    <span
      className={`text-xs font-black ${
        over ? "text-red-500" : "text-slate-400"
      }`}
    >
      {length}/{recommended}
    </span>
  );
};

// ======================================================
// SCORE BADGE
// ======================================================

const ScoreBadge = ({ analysis, compact = false }) => {
  const styles = {
    good: "bg-emerald-100 text-emerald-700 border-emerald-200",

    warning: "bg-amber-100 text-amber-700 border-amber-200",

    poor: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div
      className={`inline-flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 font-black ${styles[analysis.status]}`}
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-30" />

        <span className="relative inline-flex h-3 w-3 rounded-full bg-current" />
      </span>

      <div>
        <p className={compact ? "text-sm" : "text-base"}>
          SEO {analysis.score}
          /100
        </p>

        {!compact && (
          <p className="text-xs font-bold opacity-80">{analysis.statusLabel}</p>
        )}
      </div>
    </div>
  );
};

// ======================================================
// SUMMARY CARD
// ======================================================

const SummaryCard = ({ label, value, type }) => {
  const config = {
    good: {
      icon: FaCheck,
      style: "text-emerald-600",
    },

    warning: {
      icon: FaExclamationTriangle,
      style: "text-amber-500",
    },

    error: {
      icon: FaTimes,
      style: "text-red-500",
    },
  };

  const Icon = config[type].icon;

  return (
    <div className="flex items-center justify-between bg-white px-5 py-4">
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-xl font-black text-slate-800">{value}</p>
      </div>

      <Icon className={`text-lg ${config[type].style}`} />
    </div>
  );
};

// ======================================================
// SEO CHECK
// ======================================================

const SeoCheck = ({ check }) => {
  const config = {
    good: {
      icon: FaCheck,

      wrapper: "border-emerald-100 bg-emerald-50",

      iconWrapper: "bg-emerald-100 text-emerald-600",
    },

    warning: {
      icon: FaExclamationTriangle,

      wrapper: "border-amber-100 bg-amber-50",

      iconWrapper: "bg-amber-100 text-amber-600",
    },

    error: {
      icon: FaTimes,

      wrapper: "border-red-100 bg-red-50",

      iconWrapper: "bg-red-100 text-red-600",
    },
  };

  const selected = config[check.status] || config.warning;

  const Icon = selected.icon;

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 ${selected.wrapper}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs ${selected.iconWrapper}`}
      >
        <Icon />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-bold leading-6 text-slate-700">
          {check.label}
        </p>

        <p className="mt-0.5 text-[11px] font-black uppercase tracking-wider text-slate-400">
          {check.earned}/{check.points} pts
        </p>
      </div>
    </div>
  );
};

// ======================================================
// TOGGLE
// ======================================================

const ToggleCard = ({ title, description, checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition ${
      checked ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50"
    }`}
  >
    <div>
      <p className="text-sm font-black text-slate-700">{title}</p>

      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
    </div>

    <span
      className={`relative mt-1 inline-flex h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-[#0260fe]" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </span>
  </button>
);

// ======================================================
// METRIC
// ======================================================

const MetricCard = ({ label, value, suffix = "" }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
      {label}
    </p>

    <p className="mt-2 text-xl font-black text-[#023e73]">
      {value}

      <span className="ml-1 text-xs text-slate-400">{suffix}</span>
    </p>
  </div>
);

export default SEOEditor;
