const { z } = require("zod");
const sanitizeHtml = require("sanitize-html");

const PageSeo = require("../models/PageSeo");

// ======================================================
// CONFIGURACIÓN
// ======================================================

const SCHEMA_TYPES = [
  "WebPage",
  "CollectionPage",
  "AboutPage",
  "ContactPage",
];

// ======================================================
// PÁGINAS SEO PREDETERMINADAS
// ======================================================

const DEFAULT_PAGES = [
  {
    pageKey: "home",
    label: "Página principal",
    path: "/",
    schemaType: "WebPage",

    seo: {
      focusKeyword: "ofertas de viajes",

      title:
        "Ofertas de Viajes, Vuelos, Hoteles y Paquetes",

      description:
        "Encuentra vuelos, hoteles, paquetes, tours y ofertas para tus próximas vacaciones con Viaja a tu Destino.",

      canonicalUrl:
        "https://www.viajaatudestino.com/",

      image: "",

      socialTitle:
        "Viaja a tu Destino | Cazadores de Ofertas de Viajes",

      socialDescription:
        "Cazamos las mejores ofertas de viaje para ti. Encuentra vuelos, hoteles, paquetes y tours.",

      index: true,
      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "offers",
    label: "Ofertas",
    path: "/ofertas",
    schemaType: "CollectionPage",

    seo: {
      focusKeyword: "ofertas de viajes",

      title:
        "Ofertas de Viajes y Vacaciones",

      description:
        "Descubre ofertas de viajes, hoteles, paquetes, vuelos y experiencias para tus próximas vacaciones.",

      canonicalUrl:
        "https://www.viajaatudestino.com/ofertas",

      image: "",

      socialTitle:
        "Ofertas de Viajes | Viaja a tu Destino",

      socialDescription:
        "Encuentra promociones y ofertas para preparar tus próximas vacaciones.",

      index: true,
      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "hotels",
    label: "Hoteles",
    path: "/hoteles",
    schemaType: "CollectionPage",

    seo: {
      focusKeyword:
        "hoteles para vacaciones",

      title:
        "Hoteles y Resorts para tus Vacaciones",

      description:
        "Encuentra hoteles, resorts y opciones Todo Incluido para tus próximas vacaciones con Viaja a tu Destino.",

      canonicalUrl:
        "https://www.viajaatudestino.com/hoteles",

      image: "",

      socialTitle:
        "Encuentra Hoteles para tus Próximas Vacaciones",

      socialDescription:
        "Descubre hoteles, resorts y opciones Todo Incluido para tu próximo viaje.",

      index: true,
      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "packages",
    label: "Paquetes",
    path: "/paquetes",
    schemaType: "CollectionPage",

    seo: {
      focusKeyword:
        "paquetes de viajes",

      title:
        "Paquetes de Viaje Vuelo + Hotel",

      description:
        "Encuentra paquetes de viaje con vuelo y hotel para tus próximas vacaciones y compara diferentes destinos.",

      canonicalUrl:
        "https://www.viajaatudestino.com/paquetes",

      image: "",

      socialTitle:
        "Paquetes de Viaje | Vuelo + Hotel",

      socialDescription:
        "Encuentra paquetes de viaje para tus próximas vacaciones con Viaja a tu Destino.",

      index: true,
      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "flights",
    label: "Vuelos",
    path: "/vuelos",
    schemaType: "CollectionPage",

    seo: {
      focusKeyword:
        "vuelos para viajar",

      title:
        "Vuelos para tus Próximas Vacaciones",

      description:
        "Encuentra opciones de vuelos para tus próximos viajes y descubre alternativas para diferentes destinos.",

      canonicalUrl:
        "https://www.viajaatudestino.com/vuelos",

      image: "",

      socialTitle:
        "Encuentra Vuelos para tu Próximo Viaje",

      socialDescription:
        "Consulta opciones de vuelos y comienza a preparar tus próximas vacaciones.",

      index: true,
      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "tours",
    label: "Tours",
    path: "/tours",
    schemaType: "CollectionPage",

    seo: {
      focusKeyword:
        "tours y actividades",

      title:
        "Tours, Actividades y Experiencias de Viaje",

      description:
        "Descubre tours, actividades y experiencias para disfrutar aún más de tus próximas vacaciones.",

      canonicalUrl:
        "https://www.viajaatudestino.com/tours",

      image: "",

      socialTitle:
        "Tours y Actividades | Viaja a tu Destino",

      socialDescription:
        "Encuentra experiencias y actividades para complementar tu próximo viaje.",

      index: true,
      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "destinations",
    label: "Destinos",
    path: "/destinos",
    schemaType: "CollectionPage",

    seo: {
      focusKeyword:
        "destinos para viajar",

      title:
        "Destinos para tus Próximas Vacaciones",

      description:
        "Descubre destinos, playas, ciudades y lugares para inspirarte y comenzar a planear tu próximo viaje.",

      canonicalUrl:
        "https://www.viajaatudestino.com/destinos",

      image: "",

      socialTitle:
        "Descubre Destinos para tu Próximo Viaje",

      socialDescription:
        "Inspírate con destinos para tus próximas vacaciones.",

      index: true,
      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "blog",
    label: "Blog",
    path: "/blog",
    schemaType: "CollectionPage",

    seo: {
      focusKeyword:
        "blog de viajes",

      title:
        "Blog de Viajes, Guías y Consejos",

      description:
        "Descubre guías de viaje, destinos, hoteles, vuelos y consejos para organizar mejor tus próximas vacaciones.",

      canonicalUrl:
        "https://www.viajaatudestino.com/blog",

      image: "",

      socialTitle:
        "Blog de Viajes | Viaja a tu Destino",

      socialDescription:
        "Guías, destinos y consejos para ayudarte a preparar tu próxima experiencia.",

      index: true,
      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "about",
    label: "Acerca de nosotros",
    path: "/acerca-de-nosotros",
    schemaType: "AboutPage",

    seo: {
      focusKeyword:
        "Viaja a tu Destino",

      title:
        "Acerca de Viaja a tu Destino",

      description:
        "Conoce Viaja a tu Destino y nuestra forma de ayudarte a encontrar opciones para tus próximas vacaciones.",

      canonicalUrl:
        "https://www.viajaatudestino.com/acerca-de-nosotros",

      image: "",

      socialTitle:
        "Conoce Viaja a tu Destino",

      socialDescription:
        "Conoce más sobre Viaja a tu Destino y nuestra forma de ayudarte a planear tus viajes.",

      index: true,
      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "privacy-notice",
    label: "Aviso de privacidad",
    path: "/aviso-de-privacidad",
    schemaType: "WebPage",

    seo: {
      focusKeyword: "",

      title:
        "Aviso de Privacidad",

      description:
        "Consulta el Aviso de Privacidad de Viaja a tu Destino.",

      canonicalUrl:
        "https://www.viajaatudestino.com/aviso-de-privacidad",

      image: "",

      socialTitle: "",

      socialDescription: "",

      index: true,

      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "privacy-policy",
    label: "Política de privacidad",
    path: "/politica-de-privacidad",
    schemaType: "WebPage",

    seo: {
      focusKeyword: "",

      title:
        "Política de Privacidad",

      description:
        "Consulta la Política de Privacidad de Viaja a tu Destino.",

      canonicalUrl:
        "https://www.viajaatudestino.com/politica-de-privacidad",

      image: "",

      socialTitle: "",

      socialDescription: "",

      index: true,

      follow: true,
    },

    isActive: true,
  },

  {
    pageKey: "terms",
    label: "Términos y condiciones",
    path: "/terminos-y-condiciones",
    schemaType: "WebPage",

    seo: {
      focusKeyword: "",

      title:
        "Términos y Condiciones",

      description:
        "Consulta los términos y condiciones de uso y contratación de Viaja a tu Destino.",

      canonicalUrl:
        "https://www.viajaatudestino.com/terminos-y-condiciones",

      image: "",

      socialTitle: "",

      socialDescription: "",

      index: true,

      follow: true,
    },

    isActive: true,
  },
];

// ======================================================
// HELPERS
// ======================================================

const sanitizeText = (value = "") =>
  sanitizeHtml(
    String(value),
    {
      allowedTags: [],
      allowedAttributes: {},
    }
  ).trim();

const normalizePath = (
  value = ""
) => {
  const path =
    String(value).trim();

  if (
    !path ||
    path === "/"
  ) {
    return "/";
  }

  return `/${path.replace(
    /^\/+|\/+$/g,
    ""
  )}`;
};

const normalizePageKey = (
  value = ""
) =>
  String(value)
    .trim()
    .toLowerCase();

const formatZodErrors = (
  error
) =>
  error.issues.map(
    (issue) => ({
      field:
        issue.path.join(
          "."
        ),

      message:
        issue.message,
    })
  );

// ======================================================
// ERROR HANDLER
// ======================================================

const sendError = (
  res,
  error,
  context
) => {
  console.error(
    `ERROR: ${context}`,
    error
  );

  // ====================================================
  // ZOD
  // ====================================================

  if (
    error instanceof
    z.ZodError
  ) {
    return res
      .status(400)
      .json({
        message:
          "Revisa los datos enviados.",

        errors:
          formatZodErrors(
            error
          ),
      });
  }

  // ====================================================
  // DUPLICADOS MONGODB
  // ====================================================

  if (
    error?.code ===
    11000
  ) {
    const duplicatedField =
      Object.keys(
        error.keyPattern ||
          {}
      )[0] || "campo";

    return res
      .status(409)
      .json({
        message:
          duplicatedField ===
          "pageKey"
            ? "Ya existe una configuración SEO con esa clave."
            : duplicatedField ===
                "path"
              ? "Ya existe una configuración SEO para esa ruta."
              : "Ya existe un registro con esos datos.",
      });
  }

  // ====================================================
  // VALIDACIÓN MONGOOSE
  // ====================================================

  if (
    error?.name ===
    "ValidationError"
  ) {
    return res
      .status(400)
      .json({
        message:
          "Revisa los datos enviados.",

        errors:
          Object.values(
            error.errors ||
              {}
          ).map(
            (item) => ({
              field:
                item.path,

              message:
                item.message,
            })
          ),
      });
  }

  return res
    .status(500)
    .json({
      message:
        "Ocurrió un error interno al procesar la configuración SEO.",
    });
};

// ======================================================
// VALIDACIÓN URL
// ======================================================

const optionalUrl =
  z.union([
    z
      .string()
      .trim()
      .url(
        "La URL no es válida"
      ),

    z.literal(""),
  ]);

// ======================================================
// CAMPOS SEO BASE
// ======================================================

const seoFields = {
  focusKeyword: z
    .string()
    .trim()
    .max(
      150,
      "La frase clave es demasiado larga"
    ),

  title: z
    .string()
    .trim()
    .max(
      220,
      "El título SEO es demasiado largo"
    ),

  description: z
    .string()
    .trim()
    .max(
      320,
      "La meta descripción es demasiado larga"
    ),

  canonicalUrl:
    optionalUrl,

  image:
    optionalUrl,

  socialTitle: z
    .string()
    .trim()
    .max(
      220,
      "El título social es demasiado largo"
    ),

  socialDescription: z
    .string()
    .trim()
    .max(
      320,
      "La descripción social es demasiado larga"
    ),

  index:
    z.boolean(),

  follow:
    z.boolean(),
};

// ======================================================
// SEO SCHEMA - CREAR
// ======================================================

const seoCreateSchema =
  z
    .object({
      focusKeyword:
        seoFields.focusKeyword
          .optional()
          .default(""),

      title:
        seoFields.title
          .optional()
          .default(""),

      description:
        seoFields.description
          .optional()
          .default(""),

      canonicalUrl:
        seoFields.canonicalUrl
          .optional()
          .default(""),

      image:
        seoFields.image
          .optional()
          .default(""),

      socialTitle:
        seoFields.socialTitle
          .optional()
          .default(""),

      socialDescription:
        seoFields.socialDescription
          .optional()
          .default(""),

      index:
        seoFields.index
          .optional()
          .default(true),

      follow:
        seoFields.follow
          .optional()
          .default(true),
    })
    .strict();

// ======================================================
// SEO SCHEMA - ACTUALIZAR
//
// IMPORTANTE:
// Aquí NO usamos default().
// Así un PUT parcial no borra accidentalmente los demás
// campos SEO existentes.
// ======================================================

const seoUpdateSchema =
  z
    .object({
      focusKeyword:
        seoFields.focusKeyword
          .optional(),

      title:
        seoFields.title
          .optional(),

      description:
        seoFields.description
          .optional(),

      canonicalUrl:
        seoFields.canonicalUrl
          .optional(),

      image:
        seoFields.image
          .optional(),

      socialTitle:
        seoFields.socialTitle
          .optional(),

      socialDescription:
        seoFields.socialDescription
          .optional(),

      index:
        seoFields.index
          .optional(),

      follow:
        seoFields.follow
          .optional(),
    })
    .strict();

// ======================================================
// CREATE SCHEMA
// ======================================================

const createPageSeoSchema =
  z
    .object({
      pageKey: z
        .string()
        .trim()
        .min(
          2,
          "La clave de la página es obligatoria"
        )
        .max(100),

      label: z
        .string()
        .trim()
        .min(
          2,
          "El nombre de la página es obligatorio"
        )
        .max(120),

      path: z
        .string()
        .trim()
        .min(
          1,
          "La ruta de la página es obligatoria"
        )
        .max(250),

      schemaType:
        z
          .enum(
            SCHEMA_TYPES
          )
          .optional()
          .default(
            "WebPage"
          ),

      seo:
        seoCreateSchema
          .optional()
          .default({}),

      isActive:
        z
          .boolean()
          .optional()
          .default(true),
    })
    .strict();

// ======================================================
// UPDATE SCHEMA
// ======================================================

const updatePageSeoSchema =
  z
    .object({
      label: z
        .string()
        .trim()
        .min(
          2,
          "El nombre de la página es obligatorio"
        )
        .max(120)
        .optional(),

      path: z
        .string()
        .trim()
        .min(
          1,
          "La ruta de la página es obligatoria"
        )
        .max(250)
        .optional(),

      schemaType:
        z
          .enum(
            SCHEMA_TYPES
          )
          .optional(),

      seo:
        seoUpdateSchema
          .optional(),

      isActive:
        z
          .boolean()
          .optional(),
    })
    .strict();

// ======================================================
// PREPARAR SEO COMPLETO
// ======================================================

const prepareSeo = (
  seo = {}
) => ({
  focusKeyword:
    sanitizeText(
      seo.focusKeyword ||
        ""
    ),

  title:
    sanitizeText(
      seo.title || ""
    ),

  description:
    sanitizeText(
      seo.description ||
        ""
    ),

  canonicalUrl:
    String(
      seo.canonicalUrl ||
        ""
    ).trim(),

  image:
    String(
      seo.image || ""
    ).trim(),

  socialTitle:
    sanitizeText(
      seo.socialTitle ||
        ""
    ),

  socialDescription:
    sanitizeText(
      seo.socialDescription ||
        ""
    ),

  index:
    seo.index !== false,

  follow:
    seo.follow !== false,
});

// ======================================================
// PREPARAR SEO PARCIAL
// ======================================================

const prepareSeoUpdate = (
  seo = {}
) => {
  const prepared = {};

  if (
    Object.prototype.hasOwnProperty.call(
      seo,
      "focusKeyword"
    )
  ) {
    prepared.focusKeyword =
      sanitizeText(
        seo.focusKeyword
      );
  }

  if (
    Object.prototype.hasOwnProperty.call(
      seo,
      "title"
    )
  ) {
    prepared.title =
      sanitizeText(
        seo.title
      );
  }

  if (
    Object.prototype.hasOwnProperty.call(
      seo,
      "description"
    )
  ) {
    prepared.description =
      sanitizeText(
        seo.description
      );
  }

  if (
    Object.prototype.hasOwnProperty.call(
      seo,
      "canonicalUrl"
    )
  ) {
    prepared.canonicalUrl =
      String(
        seo.canonicalUrl ||
          ""
      ).trim();
  }

  if (
    Object.prototype.hasOwnProperty.call(
      seo,
      "image"
    )
  ) {
    prepared.image =
      String(
        seo.image || ""
      ).trim();
  }

  if (
    Object.prototype.hasOwnProperty.call(
      seo,
      "socialTitle"
    )
  ) {
    prepared.socialTitle =
      sanitizeText(
        seo.socialTitle
      );
  }

  if (
    Object.prototype.hasOwnProperty.call(
      seo,
      "socialDescription"
    )
  ) {
    prepared.socialDescription =
      sanitizeText(
        seo.socialDescription
      );
  }

  if (
    Object.prototype.hasOwnProperty.call(
      seo,
      "index"
    )
  ) {
    prepared.index =
      seo.index;
  }

  if (
    Object.prototype.hasOwnProperty.call(
      seo,
      "follow"
    )
  ) {
    prepared.follow =
      seo.follow;
  }

  return prepared;
};

// ======================================================
// PREPARAR DOCUMENTO
// ======================================================

const prepareCreatePageSeo = (
  data
) => ({
  pageKey:
    normalizePageKey(
      data.pageKey
    ),

  label:
    sanitizeText(
      data.label
    ),

  path:
    normalizePath(
      data.path
    ),

  schemaType:
    data.schemaType,

  seo:
    prepareSeo(
      data.seo
    ),

  isActive:
    data.isActive,
});

// ======================================================
// POST /api/page-seo
// ADMIN
// ======================================================

const routerPostPageSeo =
  async (
    req,
    res
  ) => {
    try {
      const parsed =
        createPageSeoSchema.parse(
          req.body
        );

      const payload =
        prepareCreatePageSeo(
          parsed
        );

      // ==================================================
      // COMPROBAR PAGE KEY
      // ==================================================

      const existingKey =
        await PageSeo.findOne({
          pageKey:
            payload.pageKey,
        })
          .select(
            "_id pageKey"
          )
          .lean();

      if (existingKey) {
        return res
          .status(409)
          .json({
            message:
              "Ya existe una configuración SEO para esa página.",
          });
      }

      // ==================================================
      // COMPROBAR PATH
      // ==================================================

      const existingPath =
        await PageSeo.findOne({
          path:
            payload.path,
        })
          .select(
            "_id path"
          )
          .lean();

      if (existingPath) {
        return res
          .status(409)
          .json({
            message:
              "Ya existe una configuración SEO para esa ruta.",
          });
      }

      const pageSeo =
        new PageSeo(
          payload
        );

      await pageSeo.save();

      return res
        .status(201)
        .json(pageSeo);
    } catch (error) {
      return sendError(
        res,
        error,
        "POST /api/page-seo"
      );
    }
  };

// ======================================================
// GET /api/page-seo/admin
// ADMIN
// ======================================================

const routerGetPageSeo =
  async (
    req,
    res
  ) => {
    try {
      const pages =
        await PageSeo.find(
          {}
        )
          .sort({
            label: 1,
          })
          .lean();

      return res.json(
        pages
      );
    } catch (error) {
      return sendError(
        res,
        error,
        "GET /api/page-seo/admin"
      );
    }
  };

// ======================================================
// GET /api/page-seo/admin/:pageKey
// ADMIN
// ======================================================

const routerGetByPageKeyAdmin =
  async (
    req,
    res
  ) => {
    try {
      const pageKey =
        normalizePageKey(
          req.params
            .pageKey
        );

      const page =
        await PageSeo.findOne({
          pageKey,
        }).lean();

      if (!page) {
        return res
          .status(404)
          .json({
            message:
              "No se encontró la configuración SEO de esta página.",
          });
      }

      return res.json(
        page
      );
    } catch (error) {
      return sendError(
        res,
        error,
        "GET /api/page-seo/admin/:pageKey"
      );
    }
  };

// ======================================================
// GET /api/page-seo/:pageKey
// PUBLIC
// ======================================================

const routerGetPublicPageSeo =
  async (
    req,
    res
  ) => {
    try {
      const pageKey =
        normalizePageKey(
          req.params
            .pageKey
        );

      const page =
        await PageSeo.findOne({
          pageKey,
          isActive: true,
        })
          .select(
            "pageKey label path schemaType seo updatedAt"
          )
          .lean();

      if (!page) {
        return res
          .status(404)
          .json({
            message:
              "No se encontró la configuración SEO de esta página.",
          });
      }

      return res.json(
        page
      );
    } catch (error) {
      return sendError(
        res,
        error,
        "GET /api/page-seo/:pageKey"
      );
    }
  };

// ======================================================
// PUT /api/page-seo/:pageKey
// ADMIN
// ======================================================

const routerPutPageSeo =
  async (
    req,
    res
  ) => {
    try {
      const pageKey =
        normalizePageKey(
          req.params
            .pageKey
        );

      const parsed =
        updatePageSeoSchema.parse(
          req.body
        );

      let page =
        await PageSeo.findOne({
          pageKey,
        });

      // ==================================================
      // SI NO EXISTE
      // ==================================================

      if (!page) {
        if (
          !parsed.label ||
          !parsed.path
        ) {
          return res
            .status(404)
            .json({
              message:
                "La página todavía no existe. Para crearla debes enviar label y path.",
            });
        }

        const newPath =
          normalizePath(
            parsed.path
          );

        const existingPath =
          await PageSeo.findOne({
            path:
              newPath,
          })
            .select(
              "_id pageKey path"
            )
            .lean();

        if (
          existingPath
        ) {
          return res
            .status(409)
            .json({
              message:
                "Ya existe una configuración SEO para esa ruta.",
            });
        }

        page =
          new PageSeo({
            pageKey,

            label:
              sanitizeText(
                parsed.label
              ),

            path:
              newPath,

            schemaType:
              parsed.schemaType ||
              "WebPage",

            seo:
              prepareSeo(
                parsed.seo ||
                  {}
              ),

            isActive:
              parsed.isActive !==
              false,
          });

        await page.save();

        return res
          .status(201)
          .json(page);
      }

      // ==================================================
      // ACTUALIZAR LABEL
      // ==================================================

      if (
        parsed.label !==
        undefined
      ) {
        page.label =
          sanitizeText(
            parsed.label
          );
      }

      // ==================================================
      // ACTUALIZAR PATH
      // ==================================================

      if (
        parsed.path !==
        undefined
      ) {
        const newPath =
          normalizePath(
            parsed.path
          );

        const conflictingPage =
          await PageSeo.findOne({
            path:
              newPath,
          })
            .select("_id")
            .lean();

        if (
          conflictingPage &&
          String(
            conflictingPage._id
          ) !==
            String(
              page._id
            )
        ) {
          return res
            .status(409)
            .json({
              message:
                "Ya existe una configuración SEO para esa ruta.",
            });
        }

        page.path =
          newPath;
      }

      // ==================================================
      // SCHEMA TYPE
      // ==================================================

      if (
        parsed.schemaType !==
        undefined
      ) {
        page.schemaType =
          parsed.schemaType;
      }

      // ==================================================
      // ACTIVE
      // ==================================================

      if (
        parsed.isActive !==
        undefined
      ) {
        page.isActive =
          parsed.isActive;
      }

      // ==================================================
      // SEO PARCIAL
      // ==================================================

      if (
        parsed.seo !==
        undefined
      ) {
        const currentSeo =
          page.seo?.toObject
            ? page.seo.toObject()
            : page.seo ||
              {};

        const seoChanges =
          prepareSeoUpdate(
            parsed.seo
          );

        page.seo = {
          ...currentSeo,
          ...seoChanges,
        };
      }

      await page.save();

      return res.json(
        page
      );
    } catch (error) {
      return sendError(
        res,
        error,
        "PUT /api/page-seo/:pageKey"
      );
    }
  };

// ======================================================
// DELETE /api/page-seo/:pageKey
// ADMIN
// ======================================================

const routerDeletePageSeo =
  async (
    req,
    res
  ) => {
    try {
      const pageKey =
        normalizePageKey(
          req.params
            .pageKey
        );

      const page =
        await PageSeo.findOne({
          pageKey,
        });

      if (!page) {
        return res
          .status(404)
          .json({
            message:
              "No se encontró la configuración SEO de esta página.",
          });
      }

      await page.deleteOne();

      return res
        .status(204)
        .send();
    } catch (error) {
      return sendError(
        res,
        error,
        "DELETE /api/page-seo/:pageKey"
      );
    }
  };

// ======================================================
// POST /api/page-seo/initialize
// ADMIN
//
// Inicializa las páginas SEO predeterminadas.
// NO sobrescribe configuraciones existentes.
// ======================================================

const routerInitializePageSeo =
  async (
    req,
    res
  ) => {
    try {
      const results =
        [];

      for (
        const item of
        DEFAULT_PAGES
      ) {
        const pageKey =
          normalizePageKey(
            item.pageKey
          );

        const path =
          normalizePath(
            item.path
          );

        // ================================================
        // PAGE KEY EXISTENTE
        // ================================================

        const existingPage =
          await PageSeo.findOne({
            pageKey,
          })
            .select(
              "_id pageKey path"
            )
            .lean();

        if (
          existingPage
        ) {
          results.push({
            pageKey,
            path,
            status:
              "existing",
          });

          continue;
        }

        // ================================================
        // PATH EXISTENTE
        // ================================================

        const existingPath =
          await PageSeo.findOne({
            path,
          })
            .select(
              "_id pageKey path"
            )
            .lean();

        if (
          existingPath
        ) {
          results.push({
            pageKey,
            path,

            status:
              "path-conflict",

            existingPageKey:
              existingPath.pageKey,
          });

          continue;
        }

        // ================================================
        // CREAR
        // ================================================

        const page =
          new PageSeo({
            pageKey,

            label:
              sanitizeText(
                item.label
              ),

            path,

            schemaType:
              item.schemaType,

            seo:
              prepareSeo(
                item.seo
              ),

            isActive:
              item.isActive !==
              false,
          });

        await page.save();

        results.push({
          pageKey:
            page.pageKey,

          path:
            page.path,

          status:
            "created",
        });
      }

      // ================================================
      // RESUMEN
      // ================================================

      const created =
        results.filter(
          (item) =>
            item.status ===
            "created"
        ).length;

      const existing =
        results.filter(
          (item) =>
            item.status ===
            "existing"
        ).length;

      const conflicts =
        results.filter(
          (item) =>
            item.status ===
            "path-conflict"
        ).length;

      return res
        .status(200)
        .json({
          message:
            "Configuración SEO inicial procesada correctamente.",

          created,

          existing,

          conflicts,

          total:
            results.length,

          pages:
            results,
        });
    } catch (error) {
      return sendError(
        res,
        error,
        "POST /api/page-seo/initialize"
      );
    }
  };

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  routerPostPageSeo,
  routerGetPageSeo,
  routerGetByPageKeyAdmin,
  routerGetPublicPageSeo,
  routerPutPageSeo,
  routerDeletePageSeo,
  routerInitializePageSeo,
};