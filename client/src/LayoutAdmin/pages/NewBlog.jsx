import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import "./NewOfferEditor.css";

import {
  FaArrowLeft,
  FaEye,
  FaImage,
  FaPen,
  FaSave,
  FaStar,
  FaTrash,
} from "react-icons/fa";

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../services/api";
import SEOEditor from "../components/SEOEditor";

// ======================================================
// CONFIGURACIÓN
// ======================================================

const BLOG_CATEGORIES = [
  "Cancún",
  "Riviera Maya",
  "Vuelos",
  "Hoteles",
  "Ofertas",
  "Guías",
];

const createEmptyValues = () => ({
  title: "",
  excerpt: "",
  content: "",
  author: "Viaja a tu Destino",
  category: "",
  tagsText: "",

  featuredImage: {
    url: "",
    alt: "",
  },

  status: "draft",
  isFeatured: false,
  publishedAt: "",

  seo: {
    focusKeyword: "",
    title: "",
    description: "",
    image: "",
    socialTitle: "",
    socialDescription: "",
    canonicalUrl: "",
    index: true,
    follow: true,
  },
});

// ======================================================
// HELPERS
// ======================================================

const textFromHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const asText = (value) =>
  value === undefined || value === null ? "" : String(value);

const createSlugPreview = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const parseTags = (value = "") =>
  [
    ...new Set(
      String(value)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ].slice(0, 20);

const toLocalDateTimeInput = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);

  return local.toISOString().slice(0, 16);
};

const toISOStringOrNull = (value) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};

const mapBlogToFormValues = (blog) => ({
  ...createEmptyValues(),

  title: asText(blog?.title),
  excerpt: asText(blog?.excerpt),
  content: asText(blog?.content),
  author: asText(blog?.author) || "Viaja a tu Destino",
  category: asText(blog?.category),

  tagsText: Array.isArray(blog?.tags) ? blog.tags.join(", ") : "",

  featuredImage: {
    url: asText(blog?.featuredImage?.url),
    alt: asText(blog?.featuredImage?.alt),
  },

  status: ["draft", "published", "archived"].includes(blog?.status)
    ? blog.status
    : "draft",

  isFeatured: Boolean(blog?.isFeatured),

  publishedAt: toLocalDateTimeInput(blog?.publishedAt),

  seo: {
    focusKeyword: asText(blog?.seo?.focusKeyword),
    title: asText(blog?.seo?.title),
    description: asText(blog?.seo?.description),
    image: asText(blog?.seo?.image),
    socialTitle: asText(blog?.seo?.socialTitle),
    socialDescription: asText(blog?.seo?.socialDescription),
    canonicalUrl: asText(blog?.seo?.canonicalUrl),
    index: blog?.seo?.index !== false,
    follow: blog?.seo?.follow !== false,
  },
});

const normalizeEditorLinkUrl = (value = "") => {
  const url = String(value).trim();

  if (!url) return "";

  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(url)) {
    return url;
  }

  return `https://${url}`;
};

const normalizeEditorVideoUrl = (value = "") => {
  const rawUrl = String(value).trim();

  if (!rawUrl) return "";

  try {
    const url = new URL(
      /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`,
    );

    const hostname = url.hostname.replace(/^www\./, "").toLowerCase();

    if (hostname === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];

      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "youtube-nocookie.com"
    ) {
      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");

        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }

      const parts = url.pathname.split("/").filter(Boolean);

      if (parts[0] === "shorts" && parts[1]) {
        return `https://www.youtube.com/embed/${parts[1]}`;
      }

      if (parts[0] === "embed" && parts[1]) {
        return `https://www.youtube.com/embed/${parts[1]}`;
      }
    }

    if (hostname === "vimeo.com" || hostname === "player.vimeo.com") {
      const parts = url.pathname.split("/").filter(Boolean);

      const videoId =
        hostname === "player.vimeo.com" && parts[0] === "video"
          ? parts[1]
          : parts[0];

      return videoId ? `https://player.vimeo.com/video/${videoId}` : "";
    }

    return url.toString();
  } catch {
    return "";
  }
};

// ======================================================
// VALIDACIÓN
// ======================================================

const optionalUrl = yup
  .string()
  .trim()
  .test(
    "optional-url",
    "Ingresa una URL válida",
    (value) => !value || /^https?:\/\/.+/i.test(value),
  );

const validationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(5, "Ingresa mínimo 5 caracteres")
    .max(220, "Ingresa máximo 220 caracteres")
    .required("El título es obligatorio"),

  excerpt: yup.string().trim().max(700, "Ingresa máximo 700 caracteres"),

  content: yup
    .string()
    .required("El contenido es obligatorio")
    .test(
      "content-content",
      "El artículo debe tener al menos 20 caracteres",
      (value) => textFromHtml(value).length >= 20,
    ),

  author: yup
    .string()
    .trim()
    .min(2, "Ingresa un autor válido")
    .max(100, "Ingresa máximo 100 caracteres")
    .required("El autor es obligatorio"),

  category: yup
    .string()
    .trim()
    .min(2, "Selecciona una categoría")
    .max(80, "Ingresa máximo 80 caracteres")
    .required("La categoría es obligatoria"),

  tagsText: yup
    .string()
    .test(
      "tags-count",
      "Solo puedes agregar hasta 20 etiquetas",
      (value) => parseTags(value).length <= 20,
    )
    .test(
      "tag-length",
      "Cada etiqueta puede tener máximo 60 caracteres",
      (value) => parseTags(value).every((tag) => tag.length <= 60),
    ),

  featuredImage: yup.object({
    url: optionalUrl,

    alt: yup.string().trim().max(255, "Máximo 255 caracteres"),
  }),

  status: yup
    .string()
    .oneOf(["draft", "published", "archived"], "Selecciona un estado válido")
    .required("El estado es obligatorio"),

  isFeatured: yup.boolean(),

  publishedAt: yup.string(),

  seo: yup.object({
    focusKeyword: yup.string().trim().max(150, "Máximo 150 caracteres"),

    title: yup.string().trim().max(220, "Máximo 220 caracteres"),

    description: yup.string().trim().max(320, "Máximo 320 caracteres"),

    image: optionalUrl,

    socialTitle: yup.string().trim().max(220, "Máximo 220 caracteres"),

    socialDescription: yup.string().trim().max(320, "Máximo 320 caracteres"),

    canonicalUrl: optionalUrl,

    index: yup.boolean(),

    follow: yup.boolean(),
  }),
});

// ======================================================
// COMPONENTE
// ======================================================

function NewBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(id);

  const [initialValues, setInitialValues] = useState(createEmptyValues);

  const [loadingBlog, setLoadingBlog] = useState(isEditing);

  const widgetRef = useRef(null);
  const currentImageFieldRef = useRef(null);
  const formikRef = useRef(null);

  const contentEditorRef = useRef(null);
  const lastContentSelectionRef = useRef(null);
  const linkSelectionRef = useRef(null);
  const videoSelectionRef = useRef(null);

  const [contentMode, setContentMode] = useState("visual");
  const [customTextColor, setCustomTextColor] = useState("#ff6600");
  const [customBackgroundColor, setCustomBackgroundColor] = useState("#fff0e6");

  const [linkDialog, setLinkDialog] = useState({
    open: false,
    url: "",
    text: "",
    newTab: true,
    nofollow: false,
  });

  const [videoDialog, setVideoDialog] = useState({
    open: false,
    url: "",
  });

  // ====================================================
  // FORMIK
  // ====================================================

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payload = {
          title: values.title.trim(),

          excerpt: values.excerpt.trim(),

          content: values.content,

          author: values.author.trim() || "Viaja a tu Destino",

          category: values.category.trim(),

          tags: parseTags(values.tagsText),

          featuredImage: {
            url: values.featuredImage.url.trim(),

            alt: values.featuredImage.alt.trim(),
          },

          status: values.status,

          isFeatured: Boolean(values.isFeatured),

          publishedAt: toISOStringOrNull(values.publishedAt),

          seo: {
            focusKeyword: values.seo.focusKeyword.trim(),

            title: values.seo.title.trim(),

            description: values.seo.description.trim(),

            image: values.seo.image.trim(),

            socialTitle: values.seo.socialTitle.trim(),

            socialDescription: values.seo.socialDescription.trim(),

            canonicalUrl: values.seo.canonicalUrl.trim(),

            index: values.seo.index !== false,

            follow: values.seo.follow !== false,
          },
        };

        if (isEditing) {
          await api.put(`/blog/${id}`, payload);
        } else {
          await api.post("/blog", payload);
        }

        await Swal.fire({
          icon: "success",

          title: isEditing
            ? "Artículo actualizado correctamente"
            : values.status === "published"
              ? "Artículo publicado correctamente"
              : "Artículo guardado correctamente",

          showConfirmButton: false,
          timer: 1700,
        });

        if (isEditing) {
          navigate("/auth/blog", {
            replace: true,
          });

          return;
        }

        const emptyValues = createEmptyValues();

        setInitialValues(emptyValues);

        resetForm({
          values: emptyValues,
        });
      } catch (error) {
        const backendMessage =
          error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          "No fue posible guardar el artículo. Intenta nuevamente.";

        Swal.fire({
          icon: "error",
          title: "No se pudo guardar",
          text: backendMessage,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  formikRef.current = formik;

  // ====================================================
  // CARGAR ARTÍCULO PARA EDITAR
  // ====================================================

  useEffect(() => {
    let mounted = true;

    const loadBlog = async () => {
      if (!isEditing) {
        const emptyValues = createEmptyValues();

        setInitialValues(emptyValues);

        setLoadingBlog(false);

        return;
      }

      try {
        setLoadingBlog(true);

        const response = await api.get(`/blog/admin/${id}`);

        if (!mounted) {
          return;
        }

        setInitialValues(mapBlogToFormValues(response.data));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Artículo no encontrado",
          text:
            error?.response?.data?.message ||
            "No fue posible cargar el artículo para editar.",
        });

        navigate("/auth/blog", {
          replace: true,
        });
      } finally {
        if (mounted) {
          setLoadingBlog(false);
        }
      }
    };

    loadBlog();

    return () => {
      mounted = false;
    };
  }, [id, isEditing, navigate]);

  // ====================================================
  // CLOUDINARY
  // ====================================================

  useEffect(() => {
    if (!window.cloudinary || widgetRef.current) {
      return undefined;
    }

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "duaysiozi",

        uploadPreset: "viajaatudestino",

        multiple: false,

        resourceType: "image",

        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      },

      (error, result) => {
        if (error || result?.event !== "success") {
          return;
        }

        const field = currentImageFieldRef.current;

        const currentFormik = formikRef.current;

        if (!field || !currentFormik) {
          return;
        }

        const imageUrl = result.info.secure_url;

        /*
         * Imagen dentro del contenido del artículo.
         * La imagen sigue almacenándose en Cloudinary;
         * aquí solo insertamos su secure_url en ReactQuill.
         */
        if (field === "content") {
          const editor = contentEditorRef.current?.getEditor?.();

          if (!editor) return;

          const range =
            editor.getSelection(true) || lastContentSelectionRef.current;

          const insertAt = range?.index ?? Math.max(editor.getLength() - 1, 0);

          editor.insertEmbed(insertAt, "image", imageUrl, "user");

          editor.insertText(insertAt + 1, "\n", "user");

          editor.setSelection(insertAt + 2, 0, "silent");

          lastContentSelectionRef.current = {
            index: insertAt + 2,
            length: 0,
          };

          currentFormik.setFieldValue("content", editor.root.innerHTML);

          currentFormik.setFieldTouched("content", true, false);

          return;
        }

        currentFormik.setFieldValue(field, imageUrl);

        currentFormik.setFieldTouched(field, true, false);

        /*
         * Si subimos la portada y SEO todavía
         * no tiene imagen, reutilizamos la portada.
         */
        if (field === "featuredImage.url" && !currentFormik.values.seo.image) {
          currentFormik.setFieldValue("seo.image", imageUrl);
        }
      },
    );

    return () => {
      widgetRef.current?.close?.();
      widgetRef.current = null;
    };
  }, []);

  const openWidget = (event, field) => {
    event.preventDefault();

    if (!widgetRef.current) {
      Swal.fire({
        icon: "error",
        title: "Cloudinary no está disponible",
        text: "Verifica que el script de Cloudinary esté cargado.",
      });

      return;
    }

    currentImageFieldRef.current = field;

    widgetRef.current.open();
  };

  const openContentImageWidget = (event) => {
    event.preventDefault();

    setContentMode("visual");

    if (!widgetRef.current) {
      Swal.fire({
        icon: "error",
        title: "Cloudinary no está disponible",
        text: "Verifica que el script de Cloudinary esté cargado.",
      });

      return;
    }

    currentImageFieldRef.current = "content";

    widgetRef.current.open();
  };

  const applyContentFormat = (format, value) => {
    const editor = contentEditorRef.current?.getEditor?.();

    if (!editor) return;

    const range = editor.getSelection() ||
      lastContentSelectionRef.current || {
        index: Math.max(editor.getLength() - 1, 0),
        length: 0,
      };

    if (range.length > 0) {
      editor.formatText(range.index, range.length, format, value, "user");
    } else {
      editor.setSelection(range.index, 0, "silent");

      editor.format(format, value, "user");
    }

    lastContentSelectionRef.current = range;

    editor.setSelection(range.index, range.length, "silent");

    editor.focus();
  };

  const handleCustomTextColor = (event) => {
    const color = event.target.value;

    setCustomTextColor(color);

    applyContentFormat("color", color);
  };

  const handleCustomBackgroundColor = (event) => {
    const color = event.target.value;

    setCustomBackgroundColor(color);

    applyContentFormat("background", color);
  };

  const closeAdvancedLinkDialog = () => {
    setLinkDialog({
      open: false,
      url: "",
      text: "",
      newTab: true,
      nofollow: false,
    });
  };

  const openAdvancedLinkDialog = () => {
    const editor = contentEditorRef.current?.getEditor?.();

    if (!editor) return;

    const range = editor.getSelection(true) ||
      lastContentSelectionRef.current || {
        index: Math.max(editor.getLength() - 1, 0),
        length: 0,
      };

    linkSelectionRef.current = range;
    lastContentSelectionRef.current = range;

    const selectedText =
      range.length > 0 ? editor.getText(range.index, range.length) : "";

    const currentFormat = editor.getFormat(range);

    const currentLink =
      typeof currentFormat?.link === "string"
        ? currentFormat.link
        : currentFormat?.link?.href || "";

    let target = "_blank";
    let rel = "";

    try {
      const [leaf] = editor.getLeaf(range.index);
      const node = leaf?.domNode;

      const element = node?.nodeType === 3 ? node.parentElement : node;

      const anchor = element?.closest?.("a");

      if (anchor) {
        target = anchor.getAttribute("target") || "";

        rel = anchor.getAttribute("rel") || "";
      }
    } catch {
      // Conservamos valores por defecto.
    }

    setLinkDialog({
      open: true,
      url: currentLink || "",
      text: selectedText || "",
      newTab: target === "_blank",
      nofollow: rel.split(/\s+/).includes("nofollow"),
    });
  };

  const applyAdvancedLink = () => {
    const editor = contentEditorRef.current?.getEditor?.();
    const range = linkSelectionRef.current;

    if (!editor || !range) return;

    const url = normalizeEditorLinkUrl(linkDialog.url);

    if (!url) {
      Swal.fire({
        icon: "warning",
        title: "Enlace inválido",
        text: "Escribe una URL válida, por ejemplo: https://viajaatudestino.com",
      });

      return;
    }

    let start = range.index;
    let length = range.length;

    const currentText = length > 0 ? editor.getText(start, length) : "";

    const displayText =
      String(linkDialog.text || "").trim() ||
      String(currentText || "").trim() ||
      url;

    if (length > 0) {
      if (displayText !== String(currentText).trim()) {
        editor.deleteText(start, length, "user");

        editor.insertText(start, displayText, "user");

        length = displayText.length;
      }
    } else {
      editor.insertText(start, displayText, "user");

      length = displayText.length;
    }

    editor.formatText(start, length, "link", url, "user");

    requestAnimationFrame(() => {
      try {
        const [leaf] = editor.getLeaf(start);
        const node = leaf?.domNode;

        const element = node?.nodeType === 3 ? node.parentElement : node;

        const anchor = element?.closest?.("a");

        if (anchor) {
          if (linkDialog.newTab) {
            anchor.setAttribute("target", "_blank");
          } else {
            anchor.removeAttribute("target");
          }

          const relValues = [];

          if (linkDialog.newTab) {
            relValues.push("noopener", "noreferrer");
          }

          if (linkDialog.nofollow) {
            relValues.push("nofollow");
          }

          if (relValues.length > 0) {
            anchor.setAttribute("rel", [...new Set(relValues)].join(" "));
          } else {
            anchor.removeAttribute("rel");
          }
        }

        formik.setFieldValue("content", editor.root.innerHTML);
      } catch {
        formik.setFieldValue("content", editor.root.innerHTML);
      }
    });

    editor.setSelection(start + length, 0, "silent");

    lastContentSelectionRef.current = {
      index: start + length,
      length: 0,
    };

    closeAdvancedLinkDialog();
  };

  const removeAdvancedLink = () => {
    const editor = contentEditorRef.current?.getEditor?.();
    const range = linkSelectionRef.current;

    if (!editor || !range) {
      closeAdvancedLinkDialog();
      return;
    }

    if (range.length > 0) {
      editor.formatText(range.index, range.length, "link", false, "user");

      formik.setFieldValue("content", editor.root.innerHTML);
    }

    closeAdvancedLinkDialog();
  };

  const closeAdvancedVideoDialog = () => {
    setVideoDialog({
      open: false,
      url: "",
    });
  };

  const openAdvancedVideoDialog = () => {
    const editor = contentEditorRef.current?.getEditor?.();

    if (!editor) return;

    const range = editor.getSelection(true) ||
      lastContentSelectionRef.current || {
        index: Math.max(editor.getLength() - 1, 0),
        length: 0,
      };

    videoSelectionRef.current = range;
    lastContentSelectionRef.current = range;

    setVideoDialog({
      open: true,
      url: "",
    });
  };

  const applyAdvancedVideo = () => {
    const editor = contentEditorRef.current?.getEditor?.();
    const range = videoSelectionRef.current;

    if (!editor || !range) return;

    const embedUrl = normalizeEditorVideoUrl(videoDialog.url);

    if (!embedUrl) {
      Swal.fire({
        icon: "warning",
        title: "Video inválido",
        text: "Pega una URL válida de YouTube, Vimeo o una URL de inserción.",
      });

      return;
    }

    const insertAt = range.index;

    editor.insertEmbed(insertAt, "video", embedUrl, "user");

    editor.insertText(insertAt + 1, "\\n", "user");

    editor.setSelection(insertAt + 2, 0, "silent");

    lastContentSelectionRef.current = {
      index: insertAt + 2,
      length: 0,
    };

    formik.setFieldValue("content", editor.root.innerHTML);

    closeAdvancedVideoDialog();
  };

  useEffect(() => {
    if (contentMode !== "visual" || loadingBlog) {
      return undefined;
    }

    let timer = null;
    let attempts = 0;
    let cancelled = false;

    const registerToolbarHandlers = () => {
      if (cancelled) return;

      const editor = contentEditorRef.current?.getEditor?.();

      const toolbar = editor?.getModule?.("toolbar");

      if (editor && toolbar) {
        toolbar.addHandler("link", openAdvancedLinkDialog);

        toolbar.addHandler("video", openAdvancedVideoDialog);

        return;
      }

      attempts += 1;

      /*
       * Al editar, ReactQuill puede montarse unos milisegundos
       * después de que loadingBlog cambie a false.
       * Reintentamos hasta que el toolbar esté disponible.
       */
      if (attempts < 20) {
        timer = window.setTimeout(registerToolbarHandlers, 50);
      }
    };

    timer = window.setTimeout(registerToolbarHandlers, 0);

    return () => {
      cancelled = true;

      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [contentMode, loadingBlog]);

  // ====================================================
  // INFORMACIÓN DERIVADA
  // ====================================================

  const slugPreview = useMemo(
    () => createSlugPreview(formik.values.title),
    [formik.values.title],
  );

  const articleTextLength = textFromHtml(formik.values.content).length;

  const tagCount = parseTags(formik.values.tagsText).length;

  const statusLabel = {
    draft: "Borrador",
    published: "Publicado",
    archived: "Archivado",
  }[formik.values.status];

  // ====================================================
  // LOADING
  // ====================================================

  if (loadingBlog) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-[#0260fe]" />

          <p className="mt-4 text-lg font-bold text-slate-800">
            Cargando artículo...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Estamos preparando la información.
          </p>
        </div>
      </div>
    );
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="min-h-full rounded-3xl bg-[#f4f7fb] p-3 sm:p-5">
      {/* =================================================
          ENCABEZADO
      ================================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#023e73] via-[#0252ad] to-[#0260fe] px-5 py-7 text-white shadow-xl sm:px-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10" />

        <div className="absolute -bottom-28 right-32 h-56 w-56 rounded-full bg-cyan-300/10" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl shadow-inner backdrop-blur">
              <FaPen />
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
                  Administración del blog
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    formik.values.status === "published"
                      ? "bg-emerald-400/20 text-emerald-100"
                      : formik.values.status === "archived"
                        ? "bg-slate-300/20 text-slate-100"
                        : "bg-amber-300/20 text-amber-100"
                  }`}
                >
                  {statusLabel}
                </span>

                {formik.values.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-400/20 px-3 py-1 text-xs font-bold text-orange-100">
                    <FaStar />
                    Destacado
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                {isEditing ? "Editar artículo" : "Crear nuevo artículo"}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Crea contenido de viajes, agrega una imagen destacada y prepara
                el SEO antes de publicar.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outlined"
            startIcon={<FaArrowLeft />}
            onClick={() => navigate("/auth/blog")}
            sx={{
              alignSelf: {
                xs: "flex-start",
                lg: "center",
              },

              borderRadius: "14px",

              borderColor: "rgba(255,255,255,0.5)",

              color: "#ffffff",

              px: 2.2,
              py: 1,

              fontWeight: 800,

              textTransform: "none",

              "&:hover": {
                borderColor: "#ffffff",

                backgroundColor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            Volver al blog
          </Button>
        </div>
      </section>

      {/* =================================================
          FORMULARIO
      ================================================= */}

      <form onSubmit={formik.handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
          {/* =============================================
              COLUMNA PRINCIPAL
          ============================================= */}

          <div className="space-y-6">
            {/* ===========================================
                INFORMACIÓN PRINCIPAL
            =========================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                number="1"
                title="Información principal"
                description="Título, categoría y resumen que identificarán el artículo."
              />

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField
                    select
                    fullWidth
                    name="category"
                    label="Categoría"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                    sx={fieldSx}
                  >
                    {BLOG_CATEGORIES.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    name="author"
                    label="Autor visible"
                    placeholder="Viaja a tu Destino"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.author && Boolean(formik.errors.author)
                    }
                    helperText={formik.touched.author && formik.errors.author}
                    sx={fieldSx}
                  />

                  <TextField
                    fullWidth
                    name="title"
                    label="Título del artículo"
                    placeholder="Ej. Guía completa para viajar a Cancún"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={
                      (formik.touched.title && formik.errors.title) ||
                      `${formik.values.title.length}/220 caracteres`
                    }
                    sx={{
                      ...fieldSx,

                      gridColumn: {
                        md: "span 2",
                      },
                    }}
                  />

                  <div className="md:col-span-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        URL estimada
                      </p>

                      <p className="mt-1 break-all text-sm font-semibold text-[#0260fe]">
                        /blog/
                        {slugPreview || "titulo-del-articulo"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        El slug definitivo lo genera automáticamente el backend.
                      </p>
                    </div>
                  </div>
                </div>

                <TextField
                  fullWidth
                  name="excerpt"
                  label="Resumen del artículo"
                  placeholder="Describe en pocas líneas qué encontrará el lector."
                  multiline
                  minRows={3}
                  value={formik.values.excerpt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.excerpt && Boolean(formik.errors.excerpt)
                  }
                  helperText={
                    (formik.touched.excerpt && formik.errors.excerpt) ||
                    `${formik.values.excerpt.length}/700 caracteres`
                  }
                  sx={{
                    ...fieldSx,
                    mt: 2,
                  }}
                />

                <TextField
                  fullWidth
                  name="tagsText"
                  label="Etiquetas"
                  placeholder="Cancún, Todo Incluido, Caribe Mexicano"
                  value={formik.values.tagsText}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.tagsText && Boolean(formik.errors.tagsText)
                  }
                  helperText={
                    (formik.touched.tagsText && formik.errors.tagsText) ||
                    `${tagCount}/20 etiquetas · sepáralas con comas`
                  }
                  sx={{
                    ...fieldSx,
                    mt: 2,
                  }}
                />
              </div>
            </section>

            {/* ===========================================
                CONTENIDO
            =========================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                number="2"
                title="Contenido del artículo"
                description="Redacta el contenido principal que verá el lector."
              />

              <div className="p-5 sm:p-6">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {/* HERRAMIENTAS SUPERIORES */}
                  <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-3 py-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={openContentImageWidget}
                        className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-black text-[#0260fe] shadow-sm transition hover:border-[#0260fe] hover:bg-blue-50"
                      >
                        <span aria-hidden="true">🖼️</span>
                        Añadir imagen
                      </button>

                      {/* COLOR PERSONALIZADO */}
                      <label
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#ff6600]"
                        title="Seleccionar cualquier color para el texto"
                      >
                        <span
                          className="text-base font-black"
                          style={{
                            color: customTextColor,
                          }}
                        >
                          A
                        </span>

                        <span className="hidden sm:inline">Color texto</span>

                        <input
                          type="color"
                          value={customTextColor}
                          onMouseDown={() => {
                            const editor =
                              contentEditorRef.current?.getEditor?.();

                            const range = editor?.getSelection?.();

                            if (range) {
                              lastContentSelectionRef.current = range;
                            }
                          }}
                          onChange={handleCustomTextColor}
                          className="h-7 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                          aria-label="Color personalizado del texto"
                        />

                        <span className="hidden font-mono text-[11px] uppercase text-slate-400 xl:inline">
                          {customTextColor}
                        </span>
                      </label>

                      {/* FONDO PERSONALIZADO */}
                      <label
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#ff6600]"
                        title="Seleccionar cualquier color para resaltar el texto"
                      >
                        <span
                          className="rounded px-1.5 py-0.5 text-xs font-black text-slate-800"
                          style={{
                            backgroundColor: customBackgroundColor,
                          }}
                        >
                          A
                        </span>

                        <span className="hidden sm:inline">Fondo</span>

                        <input
                          type="color"
                          value={customBackgroundColor}
                          onMouseDown={() => {
                            const editor =
                              contentEditorRef.current?.getEditor?.();

                            const range = editor?.getSelection?.();

                            if (range) {
                              lastContentSelectionRef.current = range;
                            }
                          }}
                          onChange={handleCustomBackgroundColor}
                          className="h-7 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                          aria-label="Color personalizado del fondo"
                        />
                      </label>
                    </div>

                    {/* VISUAL / CÓDIGO */}
                    <div className="inline-flex w-fit overflow-hidden rounded-xl border border-slate-200 bg-white p-1">
                      <button
                        type="button"
                        onClick={() => setContentMode("visual")}
                        className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                          contentMode === "visual"
                            ? "bg-[#0260fe] text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Visual
                      </button>

                      <button
                        type="button"
                        onClick={() => setContentMode("html")}
                        className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                          contentMode === "html"
                            ? "bg-[#0260fe] text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Código
                      </button>
                    </div>
                  </div>

                  {/* EDITOR */}
                  {contentMode === "visual" ? (
                    <ReactQuill
                      ref={contentEditorRef}
                      theme="snow"
                      className="offer-description-editor"
                      value={formik.values.content}
                      onChange={(value) =>
                        formik.setFieldValue("content", value)
                      }
                      onChangeSelection={(range) => {
                        if (range) {
                          lastContentSelectionRef.current = range;
                        }
                      }}
                      onBlur={() => formik.setFieldTouched("content", true)}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Escribe el contenido completo del artículo..."
                    />
                  ) : (
                    <textarea
                      className="min-h-[460px] w-full resize-y border-0 bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none"
                      value={formik.values.content}
                      onChange={(event) =>
                        formik.setFieldValue("content", event.target.value)
                      }
                      onBlur={() => formik.setFieldTouched("content", true)}
                      spellCheck={false}
                      placeholder="<h2>Subtítulo</h2><p>Escribe o edita aquí el HTML del artículo...</p>"
                    />
                  )}
                </div>

                {/* MODAL ENLACE */}
                {linkDialog.open && (
                  <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]"
                    onMouseDown={(event) => {
                      if (event.target === event.currentTarget) {
                        closeAdvancedLinkDialog();
                      }
                    }}
                  >
                    <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-[#ff6600]">
                            Enlace
                          </p>

                          <h3 className="mt-1 text-xl font-black text-[#023e73]">
                            Configurar enlace
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={closeAdvancedLinkDialog}
                          className="flex h-10 w-10 items-center justify-center rounded-full text-2xl font-light text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          aria-label="Cerrar"
                        >
                          ×
                        </button>
                      </div>

                      <div className="space-y-4 p-5 sm:p-6">
                        <div>
                          <label className="mb-1.5 block text-sm font-black text-slate-700">
                            URL
                          </label>

                          <input
                            type="url"
                            value={linkDialog.url}
                            onChange={(event) =>
                              setLinkDialog((previous) => ({
                                ...previous,
                                url: event.target.value,
                              }))
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                applyAdvancedLink();
                              }

                              if (event.key === "Escape") {
                                closeAdvancedLinkDialog();
                              }
                            }}
                            autoFocus
                            placeholder="https://www.ejemplo.com"
                            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#0260fe] focus:ring-4 focus:ring-blue-100"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-black text-slate-700">
                            Texto del enlace
                          </label>

                          <input
                            type="text"
                            value={linkDialog.text}
                            onChange={(event) =>
                              setLinkDialog((previous) => ({
                                ...previous,
                                text: event.target.value,
                              }))
                            }
                            placeholder="Ej. Ver oferta"
                            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#0260fe] focus:ring-4 focus:ring-blue-100"
                          />

                          <p className="mt-1.5 text-xs leading-5 text-slate-400">
                            Si seleccionaste texto antes de pulsar el enlace,
                            aparecerá aquí automáticamente.
                          </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <input
                              type="checkbox"
                              checked={linkDialog.newTab}
                              onChange={(event) =>
                                setLinkDialog((previous) => ({
                                  ...previous,
                                  newTab: event.target.checked,
                                }))
                              }
                              className="mt-0.5 h-5 w-5 accent-[#0260fe]"
                            />

                            <span>
                              <span className="block text-sm font-black text-slate-800">
                                Abrir en otra pestaña
                              </span>

                              <span className="mt-1 block text-xs leading-5 text-slate-500">
                                Agrega target="_blank" y noopener/noreferrer.
                              </span>
                            </span>
                          </label>

                          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <input
                              type="checkbox"
                              checked={linkDialog.nofollow}
                              onChange={(event) =>
                                setLinkDialog((previous) => ({
                                  ...previous,
                                  nofollow: event.target.checked,
                                }))
                              }
                              className="mt-0.5 h-5 w-5 accent-[#ff6600]"
                            />

                            <span>
                              <span className="block text-sm font-black text-slate-800">
                                Marcar como nofollow
                              </span>

                              <span className="mt-1 block text-xs leading-5 text-slate-500">
                                Útil para determinados enlaces externos.
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                          {linkSelectionRef.current?.length > 0 ? (
                            <button
                              type="button"
                              onClick={removeAdvancedLink}
                              className="rounded-xl px-4 py-2.5 text-sm font-black text-red-600 transition hover:bg-red-50"
                            >
                              Quitar enlace
                            </button>
                          ) : null}
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={closeAdvancedLinkDialog}
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-100"
                          >
                            Cancelar
                          </button>

                          <button
                            type="button"
                            onClick={applyAdvancedLink}
                            className="rounded-xl bg-[#ff6600] px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-[#e65c00]"
                          >
                            Aplicar enlace
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODAL VIDEO */}
                {videoDialog.open && (
                  <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]"
                    onMouseDown={(event) => {
                      if (event.target === event.currentTarget) {
                        closeAdvancedVideoDialog();
                      }
                    }}
                  >
                    <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-[#ff6600]">
                            Multimedia
                          </p>

                          <h3 className="mt-1 text-xl font-black text-[#023e73]">
                            Insertar video
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={closeAdvancedVideoDialog}
                          className="flex h-10 w-10 items-center justify-center rounded-full text-2xl font-light text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          aria-label="Cerrar"
                        >
                          ×
                        </button>
                      </div>

                      <div className="p-5 sm:p-6">
                        <label className="mb-1.5 block text-sm font-black text-slate-700">
                          URL del video
                        </label>

                        <input
                          type="url"
                          value={videoDialog.url}
                          onChange={(event) =>
                            setVideoDialog((previous) => ({
                              ...previous,
                              url: event.target.value,
                            }))
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              applyAdvancedVideo();
                            }

                            if (event.key === "Escape") {
                              closeAdvancedVideoDialog();
                            }
                          }}
                          autoFocus
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#0260fe] focus:ring-4 focus:ring-blue-100"
                        />

                        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                          <p className="text-sm font-black text-[#023e73]">
                            YouTube y Vimeo
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-600">
                            Puedes pegar el enlace normal. El editor lo
                            convierte automáticamente a una URL de inserción
                            compatible.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-6">
                        <button
                          type="button"
                          onClick={closeAdvancedVideoDialog}
                          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-100"
                        >
                          Cancelar
                        </button>

                        <button
                          type="button"
                          onClick={applyAdvancedVideo}
                          className="rounded-xl bg-[#0260fe] px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-[#014fd3]"
                        >
                          Insertar video
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-400">
                    Títulos, tamaños, colores, resaltado, listas, citas, código,
                    alineación, enlaces avanzados, imágenes y video.
                  </p>

                  <p className="text-xs font-semibold text-slate-500">
                    {articleTextLength} caracteres
                  </p>
                </div>

                {formik.touched.content && formik.errors.content && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    {formik.errors.content}
                  </p>
                )}
              </div>
            </section>

            {/* ===========================================
                IMAGEN DESTACADA
            =========================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                number="3"
                title="Imagen destacada"
                description="Será la imagen principal de la tarjeta y del artículo."
              />

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
                  <div className="space-y-4">
                    <TextField
                      fullWidth
                      name="featuredImage.url"
                      label="URL de la imagen"
                      placeholder="https://..."
                      value={formik.values.featuredImage.url}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.featuredImage?.url &&
                        Boolean(formik.errors.featuredImage?.url)
                      }
                      helperText={
                        formik.touched.featuredImage?.url &&
                        formik.errors.featuredImage?.url
                      }
                      sx={fieldSx}
                    />

                    <Button
                      type="button"
                      variant="contained"
                      startIcon={<FaImage />}
                      onClick={(event) =>
                        openWidget(event, "featuredImage.url")
                      }
                      sx={primaryButtonSx}
                    >
                      Cargar desde Cloudinary
                    </Button>

                    <TextField
                      fullWidth
                      name="featuredImage.alt"
                      label="Texto alternativo"
                      placeholder="Ej. Playa de Cancún frente a un hotel"
                      value={formik.values.featuredImage.alt}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.featuredImage?.alt &&
                        Boolean(formik.errors.featuredImage?.alt)
                      }
                      helperText={
                        (formik.touched.featuredImage?.alt &&
                          formik.errors.featuredImage?.alt) ||
                        "Describe brevemente la imagen para accesibilidad y SEO."
                      }
                      sx={fieldSx}
                    />
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    {formik.values.featuredImage.url ? (
                      <div className="group relative aspect-[16/10]">
                        <img
                          src={formik.values.featuredImage.url}
                          alt={
                            formik.values.featuredImage.alt || "Vista previa"
                          }
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            formik.setFieldValue("featuredImage.url", "")
                          }
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-red-600 shadow-lg transition hover:bg-red-600 hover:text-white"
                          aria-label="Eliminar imagen"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] flex-col items-center justify-center px-5 text-center">
                        <FaImage className="text-3xl text-slate-300" />

                        <p className="mt-3 font-bold text-slate-600">
                          Sin imagen destacada
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Puedes agregarla antes de publicar.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ===========================================
                VTD SEO
            =========================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                number="4"
                title="VTD SEO"
                description="Optimiza el artículo para buscadores, redes sociales e indexación."
              />

              <div className="p-5 sm:p-6">
                <SEOEditor
                  seo={formik.values.seo}
                  onChange={(nextSeo) => {
                    formik.setFieldValue("seo", nextSeo, false);
                  }}
                  pageLabel={formik.values.title.trim() || "Artículo del blog"}
                  pagePath={`/blog/${slugPreview || "articulo"}`}
                  fallbackTitle={formik.values.title}
                  fallbackDescription={
                    formik.values.excerpt ||
                    textFromHtml(formik.values.content).slice(0, 160)
                  }
                  fallbackImage={formik.values.featuredImage.url}
                  content={formik.values.content}
                  slug={slugPreview}
                  imageAlt={formik.values.featuredImage.alt}
                />

                {/* Herramientas de imagen SEO */}
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-black text-slate-800">
                    Imagen para buscadores y redes
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Puedes cargar una imagen específica para SEO o reutilizar la
                    imagen destacada del artículo.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outlined"
                      startIcon={<FaImage />}
                      onClick={(event) => openWidget(event, "seo.image")}
                      sx={secondaryButtonSx}
                    >
                      Cargar imagen SEO
                    </Button>

                    {formik.values.featuredImage.url && (
                      <Button
                        type="button"
                        variant="text"
                        onClick={() =>
                          formik.setFieldValue(
                            "seo.image",
                            formik.values.featuredImage.url,
                          )
                        }
                        sx={{
                          textTransform: "none",
                          fontWeight: 800,
                        }}
                      >
                        Usar imagen destacada
                      </Button>
                    )}
                  </div>

                  {formik.values.seo.image && (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <img
                        src={formik.values.seo.image}
                        alt="Vista previa de la imagen SEO"
                        className="aspect-[1200/630] w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* =============================================
              PANEL LATERAL
          ============================================= */}

          <aside className="h-fit space-y-5 xl:sticky xl:top-5">
            {/* VISTA PREVIA */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#023e73] to-[#0260fe]">
                {formik.values.featuredImage.url ? (
                  <>
                    <img
                      src={formik.values.featuredImage.url}
                      alt="Vista previa"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center px-5 text-center text-white/80">
                    <FaImage className="text-3xl" />

                    <p className="mt-3 font-bold">Vista previa de portada</p>

                    <p className="mt-1 text-xs">
                      La imagen destacada aparecerá aquí.
                    </p>
                  </div>
                )}

                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-black shadow ${
                    formik.values.status === "published"
                      ? "bg-emerald-500 text-white"
                      : formik.values.status === "archived"
                        ? "bg-slate-700 text-white"
                        : "bg-white/90 text-amber-600"
                  }`}
                >
                  {statusLabel.toUpperCase()}
                </span>

                {formik.values.category && (
                  <span className="absolute bottom-4 left-4 rounded-full bg-[#0260fe] px-3 py-1 text-xs font-bold text-white">
                    {formik.values.category}
                  </span>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-widest text-[#0260fe]">
                  Vista previa
                </p>

                <h3 className="mt-2 text-xl font-black leading-tight text-slate-900">
                  {formik.values.title || "Título del artículo"}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {formik.values.excerpt ||
                    "Aquí aparecerá el resumen del artículo."}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-lg font-black text-slate-900">
                      {articleTextLength}
                    </p>

                    <p className="text-xs font-semibold text-slate-400">
                      Caracteres
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-lg font-black text-slate-900">
                      {tagCount}
                    </p>

                    <p className="text-xs font-semibold text-slate-400">
                      Etiquetas
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* PUBLICACIÓN */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-slate-900">Publicación</h3>

              <p className="mt-1 text-sm text-slate-500">
                Define cómo quieres guardar este artículo.
              </p>

              <TextField
                select
                fullWidth
                name="status"
                label="Estado"
                value={formik.values.status}
                onChange={formik.handleChange}
                sx={{
                  ...fieldSx,
                  mt: 3,
                }}
              >
                <MenuItem value="draft">Guardar como borrador</MenuItem>

                <MenuItem value="published">Publicar</MenuItem>

                <MenuItem value="archived">Archivar</MenuItem>
              </TextField>

              <TextField
                fullWidth
                type="datetime-local"
                name="publishedAt"
                label="Fecha de publicación"
                value={formik.values.publishedAt}
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={
                  formik.values.status === "published" &&
                  !formik.values.publishedAt
                    ? "Si la dejas vacía, se publicará inmediatamente."
                    : "Puedes programar la fecha de publicación."
                }
                sx={{
                  ...fieldSx,
                  mt: 2,
                }}
              />

              <TextField
                select
                fullWidth
                name="isFeatured"
                label="Artículo destacado"
                value={formik.values.isFeatured ? "true" : "false"}
                onChange={(event) =>
                  formik.setFieldValue(
                    "isFeatured",
                    event.target.value === "true",
                  )
                }
                sx={{
                  ...fieldSx,
                  mt: 2,
                }}
              >
                <MenuItem value="false">No</MenuItem>

                <MenuItem value="true">Sí, destacar</MenuItem>
              </TextField>

              <div className="mt-5 space-y-3">
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  startIcon={<FaSave />}
                  disabled={formik.isSubmitting}
                  sx={{
                    borderRadius: "14px",

                    background:
                      "linear-gradient(135deg, #0260fe 0%, #023e73 100%)",

                    py: 1.35,

                    fontWeight: 900,

                    textTransform: "none",

                    boxShadow: "0 14px 30px -16px rgba(2,96,254,0.9)",

                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #014fd3 0%, #02335e 100%)",
                    },
                  }}
                >
                  {formik.isSubmitting
                    ? "Guardando..."
                    : isEditing
                      ? "Guardar cambios"
                      : formik.values.status === "published"
                        ? "Crear y publicar"
                        : "Guardar artículo"}
                </Button>

                <Button
                  fullWidth
                  type="button"
                  variant="outlined"
                  startIcon={<FaEye />}
                  onClick={() => {
                    if (!formik.values.title) {
                      Swal.fire({
                        icon: "info",
                        title: "Agrega un título",
                        text: "Completa el título para preparar una vista previa.",
                      });

                      return;
                    }

                    Swal.fire({
                      title: formik.values.title,

                      html: `
                        <div style="text-align:left">
                          <p style="color:#64748b;margin-bottom:12px">
                            ${formik.values.excerpt || "Sin resumen"}
                          </p>

                          <div>
                            ${formik.values.content}
                          </div>
                        </div>
                      `,

                      width: 800,

                      confirmButtonText: "Cerrar",
                    });
                  }}
                  sx={secondaryButtonSx}
                >
                  Vista previa rápida
                </Button>

                <Button
                  fullWidth
                  type="button"
                  variant="outlined"
                  onClick={() => navigate("/auth/blog")}
                  sx={{
                    ...secondaryButtonSx,

                    color: "#475569",

                    borderColor: "#dbe4f0",
                  }}
                >
                  Cancelar
                </Button>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                Revisa título, imagen, contenido y SEO antes de publicar.
              </p>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
}

// ======================================================
// COMPONENTE ENCABEZADO DE SECCIÓN
// ======================================================

function SectionHeader({ number, title, description }) {
  return (
    <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#0260fe]">
          {number}
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-900">{title}</h2>

          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// ESTILOS MUI
// ======================================================

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
  },
};

const primaryButtonSx = {
  borderRadius: "12px",
  backgroundColor: "#0260fe",
  fontWeight: 800,
  textTransform: "none",
  boxShadow: "none",

  "&:hover": {
    backgroundColor: "#014fd3",
    boxShadow: "none",
  },
};

const secondaryButtonSx = {
  borderRadius: "14px",
  textTransform: "none",
  fontWeight: 800,
  borderColor: "#dbe4f0",
};

// ======================================================
// REACT QUILL
// ======================================================

const quillModules = {
  toolbar: [
    [
      {
        header: [1, 2, 3, 4, 5, 6, false],
      },
    ],

    [
      {
        font: [],
      },
      {
        size: ["small", false, "large", "huge"],
      },
    ],

    ["bold", "italic", "underline", "strike"],

    [
      {
        color: [
          "#000000",
          "#334155",
          "#64748b",
          "#0260fe",
          "#023e73",
          "#ff6600",
          "#16a34a",
          "#dc2626",
          "#9333ea",
          "#ffffff",
          false,
        ],
      },

      {
        background: [
          "#ffffff",
          "#f8fafc",
          "#eff6ff",
          "#dbeafe",
          "#fff0e6",
          "#fef3c7",
          "#dcfce7",
          "#fee2e2",
          "#f3e8ff",
          false,
        ],
      },
    ],

    [
      {
        script: "sub",
      },
      {
        script: "super",
      },
    ],

    ["blockquote", "code-block"],

    [
      {
        list: "ordered",
      },
      {
        list: "bullet",
      },
    ],

    [
      {
        indent: "-1",
      },
      {
        indent: "+1",
      },
    ],

    [
      {
        align: [],
      },
    ],

    ["link", "video"],

    ["clean"],
  ],

  history: {
    delay: 1000,
    maxStack: 100,
    userOnly: true,
  },

  clipboard: {
    matchVisual: false,
  },
};

const quillFormats = [
  "header",
  "font",
  "size",

  "bold",
  "italic",
  "underline",
  "strike",

  "color",
  "background",

  "script",

  "blockquote",
  "code-block",

  "list",
  "bullet",
  "indent",

  "align",

  "link",
  "image",
  "video",
];

export default NewBlog;
