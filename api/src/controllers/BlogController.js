const mongoose = require("mongoose");
const { z } = require("zod");
const sanitizeHtml = require("sanitize-html");

const Blog = require("../models/Blog");

// ======================================================
// VALIDACIÓN IMAGEN PRINCIPAL
// ======================================================

const featuredImageSchema = z
  .object({
    url: z
      .union([
        z
          .string()
          .trim()
          .url("La imagen principal debe ser una URL válida.")
          .max(2000, "La URL de la imagen es demasiado larga."),
        z.literal(""),
      ])
      .optional()
      .default(""),

    alt: z
      .string()
      .trim()
      .max(
        255,
        "El texto alternativo no puede superar 255 caracteres."
      )
      .optional()
      .default(""),
  })
  .strict()
  .optional()
  .default({
    url: "",
    alt: "",
  });

// ======================================================
// VALIDACIÓN SEO
// ======================================================

const seoSchema = z
  .object({
    focusKeyword: z
      .string()
      .trim()
      .max(
        150,
        "La palabra clave objetivo no puede superar 150 caracteres."
      )
      .optional()
      .default(""),

    title: z
      .string()
      .trim()
      .max(
        220,
        "El título SEO no puede superar 220 caracteres."
      )
      .optional()
      .default(""),

    description: z
      .string()
      .trim()
      .max(
        320,
        "La descripción SEO no puede superar 320 caracteres."
      )
      .optional()
      .default(""),

    image: z
      .union([
        z
          .string()
          .trim()
          .url("La imagen SEO debe ser una URL válida.")
          .max(
            2000,
            "La URL de la imagen SEO es demasiado larga."
          ),
        z.literal(""),
      ])
      .optional()
      .default(""),

    socialTitle: z
      .string()
      .trim()
      .max(
        220,
        "El título para redes sociales no puede superar 220 caracteres."
      )
      .optional()
      .default(""),

    socialDescription: z
      .string()
      .trim()
      .max(
        320,
        "La descripción para redes sociales no puede superar 320 caracteres."
      )
      .optional()
      .default(""),

    canonicalUrl: z
      .union([
        z
          .string()
          .trim()
          .url("La URL canónica debe ser una URL válida.")
          .max(
            2000,
            "La URL canónica es demasiado larga."
          ),
        z.literal(""),
      ])
      .optional()
      .default(""),

    index: z
      .boolean({
        message: "El campo SEO index debe ser true o false.",
      })
      .optional()
      .default(true),

    follow: z
      .boolean({
        message: "El campo SEO follow debe ser true o false.",
      })
      .optional()
      .default(true),
  })
  .strict()
  .optional()
  .default({
    focusKeyword: "",
    title: "",
    description: "",
    image: "",
    socialTitle: "",
    socialDescription: "",
    canonicalUrl: "",
    index: true,
    follow: true,
  });

// ======================================================
// VALIDACIÓN GENERAL DEL BLOG
// ======================================================

const blogInputSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(
        5,
        "El título debe tener mínimo 5 caracteres."
      )
      .max(
        220,
        "El título no puede superar 220 caracteres."
      ),

    excerpt: z
      .string()
      .trim()
      .max(
        700,
        "El resumen no puede superar 700 caracteres."
      )
      .optional()
      .default(""),

    content: z
      .string()
      .trim()
      .min(
        20,
        "El contenido debe tener mínimo 20 caracteres."
      )
      .max(
        200000,
        "El contenido del artículo es demasiado largo."
      ),

    author: z
      .string()
      .trim()
      .min(
        2,
        "El autor debe tener mínimo 2 caracteres."
      )
      .max(
        100,
        "El autor no puede superar 100 caracteres."
      )
      .optional()
      .default("Viaja a tu Destino"),

    category: z
      .string()
      .trim()
      .min(
        2,
        "La categoría debe tener mínimo 2 caracteres."
      )
      .max(
        80,
        "La categoría no puede superar 80 caracteres."
      ),

    tags: z
      .array(
        z
          .string()
          .trim()
          .min(
            1,
            "Las etiquetas no pueden estar vacías."
          )
          .max(
            60,
            "Una etiqueta no puede superar 60 caracteres."
          )
      )
      .max(
        20,
        "Solo puedes agregar hasta 20 etiquetas."
      )
      .optional()
      .default([]),

    featuredImage: featuredImageSchema,

    status: z
      .enum(
        [
          "draft",
          "published",
          "archived",
        ],
        {
          message:
            "El estado debe ser draft, published o archived.",
        }
      )
      .optional()
      .default("draft"),

    isFeatured: z
      .boolean({
        message:
          "El campo isFeatured debe ser true o false.",
      })
      .optional()
      .default(false),

    publishedAt: z
      .union([
        z
          .string()
          .datetime({
            message:
              "La fecha de publicación debe estar en formato ISO.",
          }),

        z.date(),

        z.literal(""),

        z.null(),
      ])
      .optional()
      .default(null),

    seo: seoSchema,
  })
  .strict();

// ======================================================
// SANITIZACIÓN
// ======================================================

const cleanText = (value) =>
  sanitizeHtml(value || "", {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim();

const cleanContent = (value) =>
  sanitizeHtml(value || "", {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "h2",
      "h3",
      "h4",
      "blockquote",
      "a",
      "img",
      "figure",
      "figcaption",
      "hr",
    ],

    allowedAttributes: {
      a: [
        "href",
        "target",
        "rel",
      ],

      img: [
        "src",
        "alt",
        "title",
        "width",
        "height",
        "loading",
      ],
    },

    allowedSchemes: [
      "http",
      "https",
      "mailto",
    ],

    allowedSchemesByTag: {
      img: [
        "http",
        "https",
      ],
    },

    disallowedTagsMode: "discard",
  }).trim();

// ======================================================
// SLUG
// ======================================================

const createSlug = (value = "") =>
  cleanText(value)
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .replace(
      /[^a-z0-9\s-]/g,
      ""
    )
    .trim()
    .replace(
      /\s+/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    );

const createUniqueSlug = async (
  title,
  excludeId = null
) => {
  const baseSlug =
    createSlug(title);

  if (!baseSlug) {
    throw new Error(
      "No fue posible generar el slug del artículo."
    );
  }

  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const filter = {
      slug,
    };

    /*
     * IMPORTANTE:
     * mongoose.trusted evita que sanitizeFilter
     * transforme el operador $ne.
     */
    if (excludeId) {
      filter._id =
        mongoose.trusted({
          $ne: excludeId,
        });
    }

    const exists =
      await Blog.exists(
        filter
      );

    if (!exists) {
      return slug;
    }

    slug =
      `${baseSlug}-${counter}`;

    counter += 1;
  }
};

// ======================================================
// FORMATEAR ERRORES DE ZOD
// ======================================================

const formatZodErrors = (
  issues = []
) => {
  return issues.flatMap(
    (issue) => {
      if (
        issue.code ===
          "unrecognized_keys" &&
        Array.isArray(
          issue.keys
        )
      ) {
        return issue.keys.map(
          (key) => ({
            field:
              issue.path?.length > 0
                ? `${issue.path.join(".")}.${key}`
                : key,

            code:
              issue.code,

            message:
              `El campo "${key}" no está permitido por el backend.`,
          })
        );
      }

      return [
        {
          field:
            issue.path?.length > 0
              ? issue.path.join(".")
              : "body",

          code:
            issue.code ||
            "validation_error",

          message:
            issue.message,
        },
      ];
    }
  );
};

// ======================================================
// PREPARAR BLOG
// ======================================================

const prepareBlog = (
  body
) => {
  const result =
    blogInputSchema.safeParse(
      body
    );

  // ==================================================
  // ERROR DE ZOD
  // ==================================================

  if (!result.success) {
    return {
      success: false,

      type:
        "ZOD_VALIDATION_ERROR",

      errors:
        formatZodErrors(
          result.error.issues
        ),
    };
  }

  const blog =
    result.data;

  // ==================================================
  // SANITIZAR CONTENIDO
  // ==================================================

  const content =
    cleanContent(
      blog.content
    );

  /*
   * Comprobamos el contenido sin etiquetas HTML
   * para evitar artículos que solo contengan HTML vacío.
   */
  if (
    cleanText(
      content
    ).length < 20
  ) {
    return {
      success: false,

      type:
        "CONTENT_VALIDATION_ERROR",

      errors: [
        {
          field:
            "content",

          code:
            "invalid_content",

          message:
            "El artículo debe contener al menos 20 caracteres de texto válido.",
        },
      ],
    };
  }

  // ==================================================
  // LIMPIAR INFORMACIÓN
  // ==================================================

  const cleanBlog = {
    title:
      cleanText(
        blog.title
      ),

    excerpt:
      cleanText(
        blog.excerpt
      ),

    content,

    author:
      cleanText(
        blog.author
      ),

    category:
      cleanText(
        blog.category
      ),

    tags: [
      ...new Set(
        blog.tags
          .map(
            (tag) =>
              cleanText(
                tag
              )
          )
          .filter(
            Boolean
          )
      ),
    ],

    featuredImage: {
      url:
        blog
          .featuredImage
          ?.url
          ?.trim() ||
        "",

      alt:
        cleanText(
          blog
            .featuredImage
            ?.alt
        ),
    },

    status:
      blog.status,

    isFeatured:
      blog.isFeatured,

    publishedAt:
      blog.publishedAt ||
      null,

    // ==================================================
    // VTD SEO DEL ARTÍCULO
    // ==================================================

    seo: {
      focusKeyword:
        cleanText(
          blog.seo
            ?.focusKeyword
        ),

      title:
        cleanText(
          blog.seo
            ?.title
        ),

      description:
        cleanText(
          blog.seo
            ?.description
        ),

      image:
        blog.seo
          ?.image
          ?.trim() ||
        "",

      socialTitle:
        cleanText(
          blog.seo
            ?.socialTitle
        ),

      socialDescription:
        cleanText(
          blog.seo
            ?.socialDescription
        ),

      canonicalUrl:
        blog.seo
          ?.canonicalUrl
          ?.trim() ||
        "",

      index:
        blog.seo
          ?.index !==
        false,

      follow:
        blog.seo
          ?.follow !==
        false,
    },
  };

  // ==================================================
  // FECHA DE PUBLICACIÓN
  // ==================================================

  if (
    cleanBlog.status ===
      "published" &&
    !cleanBlog.publishedAt
  ) {
    cleanBlog.publishedAt =
      new Date();
  }

  if (
    typeof cleanBlog
      .publishedAt ===
    "string"
  ) {
    cleanBlog.publishedAt =
      new Date(
        cleanBlog.publishedAt
      );
  }

  return {
    success: true,
    blog: cleanBlog,
  };
};

// ======================================================
// VALIDAR OBJECT ID
// ======================================================

const isValidId = (
  id
) =>
  mongoose.isValidObjectId(
    id
  );

// ======================================================
// MANEJO GLOBAL DE ERRORES
// ======================================================

const sendError = (
  res,
  error,
  context =
    "BlogController"
) => {
  console.error("\n");

  console.error(
    "========================================"
  );

  console.error(
    `ERROR: ${context}`
  );

  console.error(
    "========================================"
  );

  console.error(
    "Nombre:",
    error?.name
  );

  console.error(
    "Mensaje:",
    error?.message
  );

  console.error(
    "Código:",
    error?.code
  );

  if (error?.path) {
    console.error(
      "Path:",
      error.path
    );
  }

  if (
    error?.value !==
    undefined
  ) {
    console.error(
      "Value:",
      error.value
    );
  }

  if (
    error?.keyValue
  ) {
    console.error(
      "KeyValue:",
      error.keyValue
    );
  }

  if (
    error?.errors
  ) {
    console.error(
      "Errors:",
      error.errors
    );
  }

  console.error(
    "Stack:",
    error?.stack
  );

  console.error(
    "========================================"
  );

  console.error("\n");

  // ==================================================
  // VALIDACIÓN MONGOOSE
  // ==================================================

  if (
    error?.name ===
    "ValidationError"
  ) {
    const errors =
      Object.values(
        error.errors ||
          {}
      ).map(
        (item) => ({
          field:
            item?.path ||
            "unknown",

          code:
            item?.kind ||
            "mongoose_validation",

          message:
            item?.message ||
            "El campo contiene un valor inválido.",

          value:
            item?.value !==
            undefined
              ? String(
                  item.value
                )
              : undefined,
        })
      );

    return res
      .status(400)
      .json({
        success: false,

        type:
          "MONGOOSE_VALIDATION_ERROR",

        message:
          "MongoDB rechazó uno o más campos del artículo.",

        errors,
      });
  }

  // ==================================================
  // CAST ERROR
  // ==================================================

  if (
    error?.name ===
    "CastError"
  ) {
    return res
      .status(400)
      .json({
        success: false,

        type:
          "MONGOOSE_CAST_ERROR",

        message:
          `El campo "${error.path}" contiene un valor inválido.`,

        errors: [
          {
            field:
              error.path ||
              "unknown",

            code:
              "cast_error",

            message:
              error.message ||
              "No fue posible convertir el valor.",

            value:
              error.value !==
              undefined
                ? String(
                    error.value
                  )
                : undefined,
          },
        ],
      });
  }

  // ==================================================
  // DUPLICADO MONGODB
  // ==================================================

  if (
    error?.code ===
    11000
  ) {
    const duplicatedFields =
      Object.keys(
        error?.keyValue ||
          error?.keyPattern ||
          {}
      );

    const errors =
      duplicatedFields.map(
        (field) => ({
          field,

          code:
            "duplicate",

          message:
            `El valor del campo "${field}" ya existe.`,

          value:
            error
              ?.keyValue
              ?.[field] !==
            undefined
              ? String(
                  error
                    .keyValue[
                    field
                  ]
                )
              : undefined,
        })
      );

    return res
      .status(409)
      .json({
        success: false,

        type:
          "DUPLICATE_KEY_ERROR",

        message:
          duplicatedFields.length >
          0
            ? `Ya existe un artículo con: ${duplicatedFields.join(", ")}.`
            : "Ya existe un artículo con esos datos.",

        errors,
      });
  }

  // ==================================================
  // ERROR INTERNO
  // ==================================================

  return res
    .status(500)
    .json({
      success: false,

      type:
        "INTERNAL_SERVER_ERROR",

      message:
        "No fue posible procesar el artículo. Revisa los logs del servidor.",
    });
};

// ======================================================
// POST - CREAR ARTÍCULO
// ======================================================

const routerPostBlog = async (
  req,
  res
) => {
  try {
    console.log("\n");

    console.log(
      "========================================"
    );

    console.log(
      "POST /api/blog"
    );

    console.log(
      "========================================"
    );

    console.log(
      "Campos recibidos:",
      Object.keys(
        req.body || {}
      )
    );

    // ==================================================
    // VALIDAR
    // ==================================================

    const prepared =
      prepareBlog(
        req.body
      );

    if (
      !prepared.success
    ) {
      console.error(
        "VALIDACIÓN DE BLOG RECHAZADA"
      );

      console.error(
        JSON.stringify(
          prepared.errors,
          null,
          2
        )
      );

      return res
        .status(400)
        .json({
          success: false,

          type:
            prepared.type,

          message:
            "El artículo contiene datos inválidos.",

          errors:
            prepared.errors,
        });
    }

    // ==================================================
    // GENERAR SLUG
    // ==================================================

    const slug =
      await createUniqueSlug(
        prepared.blog
          .title
      );

    // ==================================================
    // DESTACADO
    // ==================================================

    if (
      prepared.blog
        .isFeatured
    ) {
      await Blog.updateMany(
        {
          isFeatured:
            true,
        },
        {
          $set: {
            isFeatured:
              false,
          },
        }
      );
    }

    // ==================================================
    // CREAR
    // ==================================================

    const newBlog =
      await Blog.create({
        ...prepared.blog,
        slug,
      });

    console.log(
      "Artículo creado correctamente:",
      newBlog._id
    );

    console.log(
      "========================================"
    );

    return res
      .status(201)
      .json(
        newBlog
      );
  } catch (error) {
    return sendError(
      res,
      error,
      "POST /api/blog"
    );
  }
};

// ======================================================
// GET ADMIN - TODOS LOS ARTÍCULOS
// ======================================================

const routerGetBlog = async (
  req,
  res
) => {
  try {
    /*
     * No cargamos content en el listado.
     * El contenido completo se obtiene al editar.
     */

    const blogs =
      await Blog.find()
        .select(
          "-content"
        )
        .sort({
          createdAt: -1,
        });

    return res
      .status(200)
      .json(
        blogs
      );
  } catch (error) {
    return sendError(
      res,
      error,
      "GET /api/blog/admin"
    );
  }
};

// ======================================================
// GET ADMIN - ARTÍCULO POR ID O SLUG
// ======================================================

const routerGetByIdBlog = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const identifier =
      String(
        id || ""
      ).trim();

    if (
      !identifier
    ) {
      return res
        .status(400)
        .json({
          success: false,

          type:
            "MISSING_IDENTIFIER",

          message:
            "Debes indicar un artículo.",
        });
    }

    let blog;

    // ==================================================
    // OBJECT ID
    // ==================================================

    if (
      isValidId(
        identifier
      )
    ) {
      blog =
        await Blog.findById(
          identifier
        );
    }

    // ==================================================
    // SLUG
    // ==================================================

    else {
      blog =
        await Blog.findOne({
          slug:
            identifier.toLowerCase(),
        });
    }

    if (!blog) {
      return res
        .status(404)
        .json({
          success: false,

          type:
            "BLOG_NOT_FOUND",

          message:
            "Artículo no encontrado.",
        });
    }

    return res
      .status(200)
      .json(
        blog
      );
  } catch (error) {
    return sendError(
      res,
      error,
      "GET /api/blog/admin/:id"
    );
  }
};

// ======================================================
// GET PÚBLICO - ARTÍCULOS PUBLICADOS
// ======================================================

const routerGetPublishedBlog = async (
  req,
  res
) => {
  try {
    const {
      category,
      search,
      featured,
    } = req.query;

    /*
     * IMPORTANTE:
     * mongoose.trusted es necesario porque el proyecto
     * utiliza sanitización global de filtros.
     *
     * Sin trusted(), $lte puede ser interpretado como
     * valor de publishedAt y provocar un CastError.
     */

    const filter = {
      status:
        "published",

      publishedAt:
        mongoose.trusted({
          $lte:
            new Date(),
        }),
    };

    // ==================================================
    // CATEGORÍA
    // ==================================================

    if (category) {
      const escaped =
        String(
          category
        ).replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );

      filter.category =
        new RegExp(
          `^${escaped}$`,
          "i"
        );
    }

    // ==================================================
    // DESTACADO
    // ==================================================

    if (
      featured ===
      "true"
    ) {
      filter.isFeatured =
        true;
    }

    // ==================================================
    // BÚSQUEDA
    // ==================================================

    if (
      search &&
      String(
        search
      ).trim()
    ) {
      filter.$text =
        mongoose.trusted({
          $search:
            String(
              search
            ).trim(),
        });
    }

    const blogs =
      await Blog.find(
        filter
      )
        .select(
          "-content"
        )
        .sort({
          publishedAt:
            -1,

          createdAt:
            -1,
        });

    return res
      .status(200)
      .json(
        blogs
      );
  } catch (error) {
    return sendError(
      res,
      error,
      "GET /api/blog"
    );
  }
};

// ======================================================
// GET PÚBLICO - ARTÍCULO POR SLUG
// ======================================================

const routerGetPublishedBySlugBlog =
  async (
    req,
    res
  ) => {
    try {
      const slug =
        String(
          req.params
            .slug ||
            ""
        )
          .trim()
          .toLowerCase();

      if (!slug) {
        return res
          .status(400)
          .json({
            success: false,

            type:
              "MISSING_SLUG",

            message:
              "Debes indicar un artículo.",
          });
      }

      // ==================================================
      // BUSCAR PUBLICADO
      // ==================================================

      const blog =
        await Blog.findOne({
          slug,

          status:
            "published",

          publishedAt:
            mongoose.trusted({
              $lte:
                new Date(),
            }),
        });

      if (!blog) {
        return res
          .status(404)
          .json({
            success: false,

            type:
              "BLOG_NOT_FOUND",

            message:
              "Artículo no encontrado.",
          });
      }

      // ==================================================
      // INCREMENTAR VISTAS
      // ==================================================

      await Blog.updateOne(
        {
          _id:
            blog._id,
        },
        {
          $inc: {
            views:
              1,
          },
        }
      );

      blog.views += 1;

      return res
        .status(200)
        .json(
          blog
        );
    } catch (error) {
      return sendError(
        res,
        error,
        "GET /api/blog/:slug"
      );
    }
  };

// ======================================================
// PUT - ACTUALIZAR ARTÍCULO
// ======================================================

const routerPutBlog = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    console.log("\n");

    console.log(
      "========================================"
    );

    console.log(
      `PUT /api/blog/${id}`
    );

    console.log(
      "========================================"
    );

    console.log(
      "Campos recibidos:",
      Object.keys(
        req.body || {}
      )
    );

    // ==================================================
    // VALIDAR ID
    // ==================================================

    if (
      !isValidId(id)
    ) {
      return res
        .status(400)
        .json({
          success: false,

          type:
            "INVALID_ID",

          message:
            "El identificador del artículo no es válido.",

          errors: [
            {
              field:
                "id",

              code:
                "invalid_id",

              message:
                `El valor "${id}" no es un ObjectId válido.`,
            },
          ],
        });
    }

    // ==================================================
    // VALIDAR BODY
    // ==================================================

    const prepared =
      prepareBlog(
        req.body
      );

    if (
      !prepared.success
    ) {
      console.error(
        "VALIDACIÓN DE BLOG RECHAZADA"
      );

      console.error(
        JSON.stringify(
          prepared.errors,
          null,
          2
        )
      );

      return res
        .status(400)
        .json({
          success: false,

          type:
            prepared.type,

          message:
            "El artículo contiene datos inválidos.",

          errors:
            prepared.errors,
        });
    }

    // ==================================================
    // BUSCAR
    // ==================================================

    const blog =
      await Blog.findById(
        id
      );

    if (!blog) {
      return res
        .status(404)
        .json({
          success: false,

          type:
            "BLOG_NOT_FOUND",

          message:
            "Artículo no encontrado.",
        });
    }

    // ==================================================
    // SLUG
    // ==================================================

    let slug =
      blog.slug;

    if (
      prepared.blog
        .title !==
      blog.title
    ) {
      slug =
        await createUniqueSlug(
          prepared.blog
            .title,

          blog._id
        );
    }

    // ==================================================
    // DESTACADO
    // ==================================================

    if (
      prepared.blog
        .isFeatured
    ) {
      /*
       * IMPORTANTE:
       * mongoose.trusted evita que sanitizeFilter
       * transforme $ne.
       */
      await Blog.updateMany(
        {
          _id:
            mongoose.trusted({
              $ne:
                blog._id,
            }),

          isFeatured:
            true,
        },

        {
          $set: {
            isFeatured:
              false,
          },
        }
      );
    }

    // ==================================================
    // ACTUALIZAR
    // ==================================================

    blog.set({
      ...prepared.blog,
      slug,
    });

    await blog.save();

    console.log(
      "Artículo actualizado correctamente:",
      blog._id
    );

    console.log(
      "========================================"
    );

    return res
      .status(200)
      .json(
        blog
      );
  } catch (error) {
    return sendError(
      res,
      error,
      "PUT /api/blog/:id"
    );
  }
};

// ======================================================
// DELETE - ELIMINAR ARTÍCULO
// ======================================================

const routerDeleteBlog = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    // ==================================================
    // VALIDAR ID
    // ==================================================

    if (
      !isValidId(id)
    ) {
      return res
        .status(400)
        .json({
          success: false,

          type:
            "INVALID_ID",

          message:
            "El identificador del artículo no es válido.",

          errors: [
            {
              field:
                "id",

              code:
                "invalid_id",

              message:
                `El valor "${id}" no es un ObjectId válido.`,
            },
          ],
        });
    }

    // ==================================================
    // ELIMINAR
    // ==================================================

    const blog =
      await Blog.findByIdAndDelete(
        id
      );

    if (!blog) {
      return res
        .status(404)
        .json({
          success: false,

          type:
            "BLOG_NOT_FOUND",

          message:
            "Artículo no encontrado.",
        });
    }

    return res
      .status(204)
      .send();
  } catch (error) {
    return sendError(
      res,
      error,
      "DELETE /api/blog/:id"
    );
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  routerPostBlog,
  routerGetBlog,
  routerGetByIdBlog,
  routerGetPublishedBlog,
  routerGetPublishedBySlugBlog,
  routerPutBlog,
  routerDeleteBlog,
};