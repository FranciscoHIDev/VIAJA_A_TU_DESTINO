import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { FaArrowLeft, FaPen, FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";

const createEmptyLink = () => ({
  departureDate: "",
  returnDate: "",
  price: "",
  link: "",
});

const createEmptyValues = () => ({
  category: {
    name: "Paquete",
  },
  title: "",
  price: "",
  destination: {
    name: "",
  },
  summary: "",
  description: "",
  image: [],
  sampleImages: [],
  promotion: "",
  availability: "",
  daysOfStay: "",
  hotel: "",
  departure: "",
  arrival: "",
  buyLinks: [],
  author: "Francisco",
  active: false,
});

const textFromHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();

const asText = (value) =>
  value === undefined || value === null ? "" : String(value);

const asArray = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return typeof value === "string" && value ? [value] : [];
};

const mapPackageToFormValues = (offer) => ({
  ...createEmptyValues(),

  category: {
    name: "Paquete",
    ...(offer?.category?.image ? { image: offer.category.image } : {}),
  },

  title: asText(offer?.title),
  price: asText(offer?.price),

  destination: {
    name: asText(
      typeof offer?.destination === "string"
        ? offer.destination
        : offer?.destination?.name,
    ),
  },

  summary: asText(offer?.summary),
  description: asText(offer?.description),
  image: asArray(offer?.image),
  sampleImages: asArray(offer?.sampleImages),
  promotion: asText(offer?.promotion),
  availability: asText(offer?.availability),
  daysOfStay: asText(offer?.daysOfStay),
  hotel: asText(offer?.hotel),
  departure: asText(offer?.departure),
  arrival: asText(offer?.arrival),

  buyLinks: Array.isArray(offer?.buyLinks)
    ? offer.buyLinks.map((item) => ({
        departureDate: asText(item?.departureDate),
        returnDate: asText(item?.returnDate),
        price: asText(item?.price),
        link: asText(item?.link),
      }))
    : [],

  author: offer?.author === "Susana" ? "Susana" : "Francisco",
  active: Boolean(offer?.active),
});

const validationSchema = yup.object({
  category: yup.object({
    name: yup
      .string()
      .oneOf(["Paquete"], "La categoría debe ser Paquete")
      .required("La categoría es requerida"),
  }),

  title: yup
    .string()
    .trim()
    .min(20, "Ingresa mínimo 20 caracteres")
    .max(80, "Ingresa máximo 80 caracteres")
    .required("El título es requerido"),

  price: yup
    .string()
    .trim()
    .min(1, "El precio es requerido")
    .max(30, "Ingresa máximo 30 caracteres")
    .required("El precio es requerido"),

  destination: yup.object({
    name: yup
      .string()
      .trim()
      .min(2, "Ingresa un destino válido")
      .max(80, "Ingresa máximo 80 caracteres")
      .required("El destino es requerido"),
  }),

  summary: yup
    .string()
    .trim()
    .min(10, "Ingresa mínimo 10 caracteres")
    .max(300, "Ingresa máximo 300 caracteres")
    .required("Ingresa un resumen del paquete"),

  description: yup
    .string()
    .required("Ingresa una descripción del paquete")
    .test(
      "description-content",
      "La descripción debe tener al menos 20 caracteres",
      (value) => textFromHtml(value).length >= 20,
    ),

  image: yup
    .array()
    .of(yup.string().url("Una imagen no tiene una URL válida"))
    .min(1, "Debes cargar al menos una imagen principal"),

  sampleImages: yup
    .array()
    .of(yup.string().url("Una imagen no tiene una URL válida"))
    .min(1, "Debes cargar al menos una imagen de ejemplo"),

  promotion: yup.string().trim().max(100, "Máximo 100 caracteres"),
  availability: yup.string().trim().max(120, "Máximo 120 caracteres"),
  daysOfStay: yup.string().trim().max(80, "Máximo 80 caracteres"),
  hotel: yup.string().trim().max(150, "Máximo 150 caracteres"),
  departure: yup.string().trim().max(100, "Máximo 100 caracteres"),
  arrival: yup.string().trim().max(100, "Máximo 100 caracteres"),

  buyLinks: yup
    .array()
    .of(
      yup.object({
        departureDate: yup
          .string()
          .trim()
          .required("Fecha de salida requerida"),
        returnDate: yup.string().trim().required("Fecha de retorno requerida"),
        price: yup.string().trim().required("Precio requerido"),
        link: yup
          .string()
          .trim()
          .url("Ingresa una URL válida")
          .required("El enlace es requerido"),
      }),
    )
    .min(1, "Debes agregar al menos un enlace de compra"),

  author: yup.string().oneOf(["Francisco", "Susana"]),
  active: yup.boolean(),
});

function NewOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [initialValues, setInitialValues] = useState(createEmptyValues);
  const [newLink, setNewLink] = useState(createEmptyLink);
  const [loadingPackage, setLoadingPackage] = useState(isEditing);

  const widgetRef = useRef(null);
  const currentFieldRef = useRef(null);
  const formikRef = useRef(null);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payload = {
          ...values,
          category: {
            ...values.category,
            name: "Paquete",
          },
        };

        if (isEditing) {
          await api.put(`/offers/${id}`, payload);
        } else {
          await api.post("/offers", payload);
        }

        await Swal.fire({
          icon: "success",
          title: isEditing
            ? "Paquete actualizado correctamente"
            : "Paquete creado correctamente",
          showConfirmButton: false,
          timer: 1700,
        });

        if (isEditing) {
          navigate("/auth/ofertas", { replace: true });
          return;
        }

        const emptyValues = createEmptyValues();
        setInitialValues(emptyValues);
        resetForm({ values: emptyValues });
        setNewLink(createEmptyLink());
      } catch (error) {
        const backendMessage =
          error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          "No fue posible guardar el paquete. Intenta nuevamente.";

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

  useEffect(() => {
    let mounted = true;

    const loadPackage = async () => {
      if (!isEditing) {
        const emptyValues = createEmptyValues();
        setInitialValues(emptyValues);
        setLoadingPackage(false);
        return;
      }

      try {
        setLoadingPackage(true);

        const response = await api.get(`/offers/${id}`);

        if (!mounted) return;

        setInitialValues(mapPackageToFormValues(response.data));
      } catch {
        Swal.fire({
          icon: "error",
          title: "Paquete no encontrado",
          text: "No fue posible cargar el paquete para editar.",
        });

        navigate("/auth/ofertas", { replace: true });
      } finally {
        if (mounted) {
          setLoadingPackage(false);
        }
      }
    };

    loadPackage();

    return () => {
      mounted = false;
    };
  }, [id, isEditing, navigate]);

  useEffect(() => {
    if (!window.cloudinary || widgetRef.current) return undefined;

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "duaysiozi",
        uploadPreset: "viajaatudestino",
        multiple: true,
      },
      (error, result) => {
        if (error || result?.event !== "success") return;

        const field = currentFieldRef.current;
        const currentFormik = formikRef.current;

        if (!field || !currentFormik) return;

        const imageUrl = result.info.secure_url;
        const currentImages = currentFormik.values[field] || [];

        currentFormik.setFieldValue(field, [...currentImages, imageUrl]);
        currentFormik.setFieldTouched(field, true, false);
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

    currentFieldRef.current = field;
    widgetRef.current.open();
  };

  const removeImage = (field, imageUrl) => {
    formik.setFieldValue(
      field,
      formik.values[field].filter((image) => image !== imageUrl),
    );

    formik.setFieldTouched(field, true, false);
  };

  const handleLinkChange = (event) => {
    const { name, value } = event.target;

    setNewLink((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const isNewLinkIncomplete = Object.values(newLink).some(
    (value) => !value.trim(),
  );

  const handleAddLink = () => {
    if (isNewLinkIncomplete) return;

    try {
      new URL(newLink.link);
    } catch {
      Swal.fire({
        icon: "warning",
        title: "Enlace inválido",
        text: "Escribe una URL completa, por ejemplo: https://ejemplo.com",
      });
      return;
    }

    formik.setFieldValue("buyLinks", [
      ...formik.values.buyLinks,
      {
        departureDate: newLink.departureDate.trim(),
        returnDate: newLink.returnDate.trim(),
        price: newLink.price.trim(),
        link: newLink.link.trim(),
      },
    ]);

    formik.setFieldTouched("buyLinks", true, false);
    setNewLink(createEmptyLink());
  };

  const removeLink = (index) => {
    formik.setFieldValue(
      "buyLinks",
      formik.values.buyLinks.filter(
        (_, currentIndex) => currentIndex !== index,
      ),
    );

    formik.setFieldTouched("buyLinks", true, false);
  };

  if (loadingPackage) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-[#0260fe]" />

          <p className="mt-4 text-lg font-bold text-slate-800">
            Cargando paquete...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Estamos preparando la información.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full rounded-3xl bg-[#f4f7fb] p-3 sm:p-5">
      {/* ENCABEZADO */}

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
                  Administración de paquetes
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    formik.values.active
                      ? "bg-emerald-400/20 text-emerald-100"
                      : "bg-amber-300/20 text-amber-100"
                  }`}
                >
                  {formik.values.active ? "Oferta activa" : "Borrador"}
                </span>
              </div>

              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                {isEditing ? "Editar paquete" : "Crear nuevo paquete"}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Completa los datos, agrega imágenes y publica una nueva oferta
                de viaje para tus clientes.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outlined"
            startIcon={<FaArrowLeft />}
            onClick={() => navigate("/auth/ofertas")}
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
            Volver a ofertas
          </Button>
        </div>
      </section>

      <form onSubmit={formik.handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* COLUMNA PRINCIPAL */}

          <div className="space-y-6">
            {/* INFORMACIÓN PRINCIPAL */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#0260fe]">
                    1
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-900">
                      Información principal
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Datos que aparecerán primero en la publicación.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField
                    fullWidth
                    label="Categoría"
                    value="Paquete"
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        backgroundColor: "#f8fafc",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    name="destination.name"
                    label="Destino"
                    placeholder="Ej. Cancún, Riviera Maya o Huatulco"
                    value={formik.values.destination.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.destination?.name &&
                      Boolean(formik.errors.destination?.name)
                    }
                    helperText={
                      formik.touched.destination?.name &&
                      formik.errors.destination?.name
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    name="title"
                    label="Título de la oferta"
                    placeholder="Ej. Vacaciones todo incluido en Cancún"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={
                      (formik.touched.title && formik.errors.title) ||
                      `${formik.values.title.length}/80 caracteres`
                    }
                    sx={{
                      gridColumn: {
                        md: "span 2",
                      },

                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    name="price"
                    label="Precio desde"
                    placeholder="Ej. $12,999 MXN por persona"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    name="promotion"
                    label="Promoción"
                    placeholder="Ej. Aparta con $500 o hasta 12 MSI"
                    value={formik.values.promotion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.promotion &&
                      Boolean(formik.errors.promotion)
                    }
                    helperText={
                      formik.touched.promotion && formik.errors.promotion
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                      },
                    }}
                  />
                </div>

                <TextField
                  fullWidth
                  name="summary"
                  label="Resumen comercial"
                  placeholder="Describe brevemente los principales beneficios del paquete."
                  multiline
                  minRows={3}
                  value={formik.values.summary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.summary && Boolean(formik.errors.summary)
                  }
                  helperText={
                    (formik.touched.summary && formik.errors.summary) ||
                    `${formik.values.summary.length}/300 caracteres`
                  }
                  sx={{
                    mt: 2,

                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                    },
                  }}
                />
              </div>
            </section>

            {/* DESCRIPCIÓN */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#0260fe]">
                    2
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-900">
                      Descripción del paquete
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Explica qué incluye el viaje y por qué deberían
                      reservarlo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <ReactQuill
                    className="min-h-[230px]"
                    value={formik.values.description}
                    onChange={(value) =>
                      formik.setFieldValue("description", value)
                    }
                    onBlur={() => formik.setFieldTouched("description", true)}
                  />
                </div>

                <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-400">
                    Puedes utilizar títulos, listas y texto destacado.
                  </p>

                  <p className="text-xs font-semibold text-slate-500">
                    {textFromHtml(formik.values.description).length} caracteres
                  </p>
                </div>

                {formik.touched.description && formik.errors.description && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    {formik.errors.description}
                  </p>
                )}
              </div>
            </section>

            {/* IMÁGENES */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#0260fe]">
                    3
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-900">
                      Galería de imágenes
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Agrega imágenes atractivas del hotel y del destino.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">
                {/* IMÁGENES PRINCIPALES */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-black text-slate-900">
                        Imágenes principales
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        La primera imagen será la portada.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="contained"
                      onClick={(event) => openWidget(event, "image")}
                      sx={{
                        borderRadius: "12px",
                        backgroundColor: "#0260fe",
                        fontWeight: 800,
                        textTransform: "none",
                        boxShadow: "none",

                        "&:hover": {
                          backgroundColor: "#014fd3",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Cargar imágenes
                    </Button>
                  </div>

                  {formik.values.image.length === 0 ? (
                    <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-5 text-center">
                      <p className="font-bold text-slate-700">
                        No hay imágenes principales
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Sube fotografías en formato JPG, PNG o WEBP.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {formik.values.image.map((imageUrl, index) => (
                        <div
                          key={`${imageUrl}-${index}`}
                          className={`group relative overflow-hidden rounded-2xl bg-slate-200 ${
                            index === 0
                              ? "col-span-2 aspect-[16/8]"
                              : "aspect-[4/3]"
                          }`}
                        >
                          <img
                            src={imageUrl}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            alt={`Imagen principal ${index + 1}`}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800">
                            {index === 0
                              ? "Imagen de portada"
                              : `Imagen ${index + 1}`}
                          </span>

                          <button
                            type="button"
                            onClick={() => removeImage("image", imageUrl)}
                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg transition hover:bg-red-600 hover:text-white"
                            aria-label="Eliminar imagen"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {formik.touched.image && formik.errors.image && (
                    <p className="mt-3 text-sm font-medium text-red-600">
                      {formik.errors.image}
                    </p>
                  )}
                </div>

                {/* IMÁGENES DE EJEMPLO */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-black text-slate-900">
                        Imágenes de referencia
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Capturas o imágenes del proveedor.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="contained"
                      onClick={(event) => openWidget(event, "sampleImages")}
                      sx={{
                        borderRadius: "12px",
                        backgroundColor: "#0260fe",
                        fontWeight: 800,
                        textTransform: "none",
                        boxShadow: "none",

                        "&:hover": {
                          backgroundColor: "#014fd3",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Cargar imágenes
                    </Button>
                  </div>

                  {formik.values.sampleImages.length === 0 ? (
                    <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-5 text-center">
                      <p className="font-bold text-slate-700">
                        No hay imágenes de referencia
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Agrega al menos una imagen de ejemplo.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {formik.values.sampleImages.map((imageUrl, index) => (
                        <div
                          key={`${imageUrl}-${index}`}
                          className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200"
                        >
                          <img
                            src={imageUrl}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            alt={`Imagen de referencia ${index + 1}`}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800">
                            Referencia {index + 1}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              removeImage("sampleImages", imageUrl)
                            }
                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg transition hover:bg-red-600 hover:text-white"
                            aria-label="Eliminar imagen"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {formik.touched.sampleImages &&
                    formik.errors.sampleImages && (
                      <p className="mt-3 text-sm font-medium text-red-600">
                        {formik.errors.sampleImages}
                      </p>
                    )}
                </div>
              </div>
            </section>

            {/* DETALLES DEL VIAJE */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#0260fe]">
                    4
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-900">
                      Detalles del viaje
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Hotel, estancia, disponibilidad y aeropuertos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
                <TextField
                  fullWidth
                  name="hotel"
                  label="Nombre del hotel"
                  placeholder="Ej. Flamingo Cancún Resort"
                  value={formik.values.hotel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.hotel && Boolean(formik.errors.hotel)}
                  helperText={formik.touched.hotel && formik.errors.hotel}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="daysOfStay"
                  label="Días de estancia"
                  placeholder="Ej. 4 días / 3 noches"
                  value={formik.values.daysOfStay}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.daysOfStay &&
                    Boolean(formik.errors.daysOfStay)
                  }
                  helperText={
                    formik.touched.daysOfStay && formik.errors.daysOfStay
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="availability"
                  label="Disponibilidad"
                  placeholder="Ej. Viaja de agosto a diciembre"
                  value={formik.values.availability}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.availability &&
                    Boolean(formik.errors.availability)
                  }
                  helperText={
                    formik.touched.availability && formik.errors.availability
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="departure"
                  label="Aeropuerto de salida"
                  placeholder="Ej. Ciudad de México"
                  value={formik.values.departure}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.departure && Boolean(formik.errors.departure)
                  }
                  helperText={
                    formik.touched.departure && formik.errors.departure
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="arrival"
                  label="Aeropuerto de llegada"
                  placeholder="Ej. Aeropuerto de Cancún"
                  value={formik.values.arrival}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.arrival && Boolean(formik.errors.arrival)
                  }
                  helperText={formik.touched.arrival && formik.errors.arrival}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                    },
                  }}
                />

                <TextField
                  select
                  fullWidth
                  name="author"
                  label="Autor"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                    },
                  }}
                >
                  <MenuItem value="Francisco">Francisco</MenuItem>
                  <MenuItem value="Susana">Susana</MenuItem>
                </TextField>
              </div>
            </section>

            {/* ENLACES */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#0260fe]">
                      5
                    </div>

                    <div>
                      <h2 className="text-lg font-black text-slate-900">
                        Fechas y enlaces de compra
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Agrega las salidas disponibles para esta oferta.
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0260fe]">
                    {formik.values.buyLinks.length} opciones
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <TextField
                      fullWidth
                      type="date"
                      name="departureDate"
                      label="Fecha de salida"
                      value={newLink.departureDate}
                      onChange={handleLinkChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                          backgroundColor: "#ffffff",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      type="date"
                      name="returnDate"
                      label="Fecha de retorno"
                      value={newLink.returnDate}
                      onChange={handleLinkChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                          backgroundColor: "#ffffff",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      name="price"
                      label="Precio"
                      placeholder="$12,999 MXN"
                      value={newLink.price}
                      onChange={handleLinkChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                          backgroundColor: "#ffffff",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      name="link"
                      label="Enlace de compra"
                      placeholder="https://..."
                      value={newLink.link}
                      onChange={handleLinkChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                          backgroundColor: "#ffffff",
                        },
                      }}
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      type="button"
                      variant="contained"
                      onClick={handleAddLink}
                      disabled={isNewLinkIncomplete}
                      sx={{
                        borderRadius: "13px",
                        backgroundColor: "#0260fe",
                        px: 2.5,
                        py: 1.1,
                        fontWeight: 900,
                        textTransform: "none",
                        boxShadow: "0 12px 25px -15px rgba(2,96,254,0.8)",

                        "&:hover": {
                          backgroundColor: "#014fd3",
                        },
                      }}
                    >
                      Agregar fecha
                    </Button>
                  </div>
                </div>

                {formik.touched.buyLinks &&
                  typeof formik.errors.buyLinks === "string" && (
                    <p className="mt-3 text-sm font-medium text-red-600">
                      {formik.errors.buyLinks}
                    </p>
                  )}

                <div className="mt-5 space-y-3">
                  {formik.values.buyLinks.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-slate-200 px-5 py-9 text-center">
                      <p className="font-bold text-slate-700">
                        No hay fechas agregadas
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Completa los campos para agregar una salida.
                      </p>
                    </div>
                  ) : (
                    formik.values.buyLinks.map((link, index) => (
                      <article
                        key={`${link.link}-${index}`}
                        className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-md"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#0260fe]">
                              {index + 1}
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0260fe]">
                                  Salida: {link.departureDate}
                                </span>

                                <span className="text-xs font-semibold text-slate-400">
                                  Regreso: {link.returnDate}
                                </span>
                              </div>

                              <p className="mt-2 text-lg font-black text-slate-900">
                                {link.price}
                              </p>

                              <p className="mt-1 break-all text-xs text-slate-400">
                                {link.link}
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <a
                              href={link.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-[#0260fe] transition hover:bg-blue-100"
                            >
                              Abrir enlace
                            </a>

                            <button
                              type="button"
                              onClick={() => removeLink(index)}
                              className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
                            >
                              <FaTrash />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* PANEL LATERAL */}

          <aside className="h-fit space-y-5 xl:sticky xl:top-5">
            {/* VISTA PREVIA */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#023e73] to-[#0260fe]">
                {formik.values.image[0] ? (
                  <>
                    <img
                      src={formik.values.image[0]}
                      alt="Vista previa"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center px-5 text-center text-white/80">
                    <p className="font-bold">Vista previa de portada</p>

                    <p className="mt-1 text-xs">
                      La primera imagen aparecerá aquí.
                    </p>
                  </div>
                )}

                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-black shadow ${
                    formik.values.active
                      ? "bg-emerald-500 text-white"
                      : "bg-white/90 text-amber-600"
                  }`}
                >
                  {formik.values.active ? "PUBLICADA" : "BORRADOR"}
                </span>

                {formik.values.destination.name && (
                  <span className="absolute bottom-4 left-4 text-sm font-bold text-white">
                    {formik.values.destination.name}
                  </span>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-widest text-[#0260fe]">
                  Vista previa
                </p>

                <h3 className="mt-2 text-xl font-black leading-tight text-slate-900">
                  {formik.values.title || "Título del paquete de viaje"}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {formik.values.summary ||
                    "Aquí aparecerá el resumen comercial de la oferta."}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold text-slate-400">
                    Precio desde
                  </p>

                  <p className="mt-1 text-2xl font-black text-[#ff6600]">
                    {formik.values.price || "$0 MXN"}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-lg font-black text-slate-900">
                      {formik.values.image.length}
                    </p>

                    <p className="text-xs font-semibold text-slate-400">
                      Imágenes
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-lg font-black text-slate-900">
                      {formik.values.buyLinks.length}
                    </p>

                    <p className="text-xs font-semibold text-slate-400">
                      Fechas
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* PUBLICACIÓN */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-slate-900">Publicación</h3>

              <p className="mt-1 text-sm text-slate-500">
                Selecciona cómo deseas guardar esta oferta.
              </p>

              <TextField
                select
                fullWidth
                name="active"
                label="Estado"
                value={formik.values.active ? "true" : "false"}
                onChange={(event) =>
                  formik.setFieldValue("active", event.target.value === "true")
                }
                sx={{
                  mt: 3,

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                  },
                }}
              >
                <MenuItem value="true">Activa y visible</MenuItem>
                <MenuItem value="false">Guardar como borrador</MenuItem>
              </TextField>

              <div className="mt-5 space-y-3">
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
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
                      : formik.values.active
                        ? "Crear y publicar"
                        : "Guardar paquete"}
                </Button>

                <Button
                  fullWidth
                  type="button"
                  variant="outlined"
                  onClick={() => navigate("/auth/ofertas")}
                  sx={{
                    borderRadius: "14px",
                    borderColor: "#dbe4f0",
                    color: "#475569",
                    py: 1.15,
                    fontWeight: 800,
                    textTransform: "none",

                    "&:hover": {
                      borderColor: "#94a3b8",
                      backgroundColor: "#f8fafc",
                    },
                  }}
                >
                  Cancelar
                </Button>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                Revisa precios, fechas e imágenes antes de publicar.
              </p>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
}
export default NewOffer;
