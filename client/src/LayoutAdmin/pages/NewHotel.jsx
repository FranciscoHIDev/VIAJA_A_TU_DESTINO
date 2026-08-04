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

const createInitialValues = () => ({
  category: {
    name: "Hotel",
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
  buyLinks: [],
  author: "Francisco",
  active: false,
});

const cleanHtmlText = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();

const toText = (value) =>
  value === undefined || value === null ? "" : String(value);

const toImageArray = (value) => {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item);
  }

  return typeof value === "string" && value ? [value] : [];
};

const mapHotelToFormValues = (offer) => ({
  ...createInitialValues(),

  category: {
    name: "Hotel",
    ...(offer?.category?.image ? { image: offer.category.image } : {}),
  },

  title: toText(offer?.title),
  price: toText(offer?.price),

  destination: {
    name: toText(
      typeof offer?.destination === "string"
        ? offer.destination
        : offer?.destination?.name,
    ),
  },

  summary: toText(offer?.summary),
  description: toText(offer?.description),
  image: toImageArray(offer?.image),
  sampleImages: toImageArray(offer?.sampleImages),
  promotion: toText(offer?.promotion),
  availability: toText(offer?.availability),
  daysOfStay: toText(offer?.daysOfStay),
  hotel: toText(offer?.hotel),

  buyLinks: Array.isArray(offer?.buyLinks)
    ? offer.buyLinks.map((link) => ({
        departureDate: toText(link?.departureDate),
        returnDate: toText(link?.returnDate),
        price: toText(link?.price),
        link: toText(link?.link),
      }))
    : [],

  author: offer?.author === "Susana" ? "Susana" : "Francisco",
  active: Boolean(offer?.active),
});

const validationSchema = yup.object({
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
    .required("Ingresa un resumen del hotel"),

  description: yup
    .string()
    .required("Ingresa una descripción del hotel")
    .test(
      "description-content",
      "La descripción debe tener al menos 20 caracteres",
      (value) => cleanHtmlText(value).length >= 20,
    ),

  image: yup
    .array()
    .of(yup.string().url("Una imagen no tiene una URL válida"))
    .min(1, "Debes cargar al menos una imagen principal"),

  sampleImages: yup
    .array()
    .of(yup.string().url("Una imagen no tiene una URL válida"))
    .min(1, "Debes cargar al menos una imagen de ejemplo"),

  hotel: yup
    .string()
    .trim()
    .min(2, "Ingresa el nombre del hotel")
    .max(150, "Máximo 150 caracteres")
    .required("El nombre del hotel es requerido"),

  promotion: yup.string().trim().max(100, "Máximo 100 caracteres"),
  availability: yup.string().trim().max(120, "Máximo 120 caracteres"),
  daysOfStay: yup.string().trim().max(80, "Máximo 80 caracteres"),

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
          .required("El enlace de compra es requerido"),
      }),
    )
    .min(1, "Debes agregar al menos un enlace de compra"),

  author: yup.string().oneOf(["Francisco", "Susana"]),
  active: yup.boolean(),
});

function NewHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [initialValues, setInitialValues] = useState(createInitialValues);
  const [newLink, setNewLink] = useState(createEmptyLink);
  const [loadingHotel, setLoadingHotel] = useState(isEditing);

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
            name: "Hotel",
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
            ? "Hotel actualizado correctamente"
            : "Hotel creado correctamente",
          showConfirmButton: false,
          timer: 1800,
        });

        if (isEditing) {
          navigate("/auth/ofertas", { replace: true });
          return;
        }

        const emptyValues = createInitialValues();
        setInitialValues(emptyValues);
        resetForm({ values: emptyValues });
        setNewLink(createEmptyLink());
      } catch (error) {
        const backendMessage =
          error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          "No fue posible guardar el hotel. Intenta nuevamente.";

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

    const loadHotel = async () => {
      if (!isEditing) {
        setLoadingHotel(false);
        return;
      }

      try {
        setLoadingHotel(true);

        const response = await api.get(`/offers/${id}`);

        if (!mounted) return;

        setInitialValues(mapHotelToFormValues(response.data));
      } catch {
        Swal.fire({
          icon: "error",
          title: "Hotel no encontrado",
          text: "No fue posible cargar el hotel para editar.",
        });

        navigate("/auth/ofertas", { replace: true });
      } finally {
        if (mounted) {
          setLoadingHotel(false);
        }
      }
    };

    loadHotel();

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

    setNewLink((previousLink) => ({
      ...previousLink,
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

  if (loadingHotel) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <p className="text-lg font-semibold text-[#035373]">
          Cargando hotel...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl bg-white px-5 py-5">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <FaPen className="text-[#035373]" />

          <div className="ml-2">
            <h1 className="text-2xl font-semibold">
              {isEditing ? "Editar hotel" : "Nuevo hotel"}
            </h1>

            <p className="text-sm text-gray-500">
              {isEditing
                ? "Actualiza la información y guarda los cambios."
                : "Completa la información para crear una oferta de hotel."}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outlined"
          startIcon={<FaArrowLeft />}
          onClick={() => navigate("/auth/ofertas")}
        >
          Volver a ofertas
        </Button>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField fullWidth label="Categoría" value="Hotel" disabled />

          <TextField
            fullWidth
            name="title"
            label="Título de la oferta"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            fullWidth
            name="price"
            label="Precio desde"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          <TextField
            fullWidth
            name="destination.name"
            label="Destino"
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
          />
        </div>

        <TextField
          fullWidth
          multiline
          minRows={2}
          className="mt-4"
          name="summary"
          label="Resumen"
          value={formik.values.summary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.summary && Boolean(formik.errors.summary)}
          helperText={formik.touched.summary && formik.errors.summary}
        />

        <div className="mt-5">
          <label className="font-semibold" htmlFor="description">
            Descripción
          </label>

          <ReactQuill
            className="mt-2"
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue("description", value)}
            onBlur={() => formik.setFieldTouched("description", true)}
          />

          {formik.touched.description && formik.errors.description && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.description}
            </p>
          )}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded border p-4">
            <p className="mb-3 font-semibold">Imágenes principales</p>

            <Button
              type="button"
              variant="contained"
              onClick={(event) => openWidget(event, "image")}
            >
              Cargar imágenes
            </Button>

            <div className="mt-3 flex flex-wrap gap-3">
              {formik.values.image.map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  className="relative overflow-hidden rounded"
                >
                  <img
                    src={imageUrl}
                    className="h-[100px] w-[150px] object-cover"
                    alt={`Imagen principal ${index + 1}`}
                  />

                  <button
                    type="button"
                    onClick={() => removeImage("image", imageUrl)}
                    className="absolute right-1 top-1 rounded bg-red-600 p-2 text-white"
                    aria-label="Eliminar imagen"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {formik.touched.image && formik.errors.image && (
              <p className="mt-3 text-sm text-red-600">{formik.errors.image}</p>
            )}
          </div>

          <div className="rounded border p-4">
            <p className="mb-3 font-semibold">Imágenes de ejemplo</p>

            <Button
              type="button"
              variant="contained"
              onClick={(event) => openWidget(event, "sampleImages")}
            >
              Cargar imágenes
            </Button>

            <div className="mt-3 flex flex-wrap gap-3">
              {formik.values.sampleImages.map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  className="relative overflow-hidden rounded"
                >
                  <img
                    src={imageUrl}
                    className="h-[100px] w-[150px] object-cover"
                    alt={`Imagen ejemplo ${index + 1}`}
                  />

                  <button
                    type="button"
                    onClick={() => removeImage("sampleImages", imageUrl)}
                    className="absolute right-1 top-1 rounded bg-red-600 p-2 text-white"
                    aria-label="Eliminar imagen"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {formik.touched.sampleImages && formik.errors.sampleImages && (
              <p className="mt-3 text-sm text-red-600">
                {formik.errors.sampleImages}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <TextField
            name="promotion"
            label="Promoción destacada"
            value={formik.values.promotion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.promotion && Boolean(formik.errors.promotion)}
            helperText={formik.touched.promotion && formik.errors.promotion}
          />

          <TextField
            name="availability"
            label="Disponibilidad"
            value={formik.values.availability}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.availability && Boolean(formik.errors.availability)
            }
            helperText={
              formik.touched.availability && formik.errors.availability
            }
          />

          <TextField
            name="daysOfStay"
            label="Días de estancia"
            value={formik.values.daysOfStay}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.daysOfStay && Boolean(formik.errors.daysOfStay)
            }
            helperText={formik.touched.daysOfStay && formik.errors.daysOfStay}
          />

          <TextField
            name="hotel"
            label="Nombre del hotel"
            value={formik.values.hotel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.hotel && Boolean(formik.errors.hotel)}
            helperText={formik.touched.hotel && formik.errors.hotel}
          />

          <TextField
            select
            name="active"
            label="Estado"
            value={formik.values.active ? "true" : "false"}
            onChange={(event) =>
              formik.setFieldValue("active", event.target.value === "true")
            }
          >
            <MenuItem value="true">Activa</MenuItem>
            <MenuItem value="false">Borrador</MenuItem>
          </TextField>

          <TextField
            select
            name="author"
            label="Autor"
            value={formik.values.author}
            onChange={formik.handleChange}
          >
            <MenuItem value="Francisco">Francisco</MenuItem>
            <MenuItem value="Susana">Susana</MenuItem>
          </TextField>
        </div>

        <div className="mt-5 rounded border p-4">
          <h2 className="font-semibold">Enlaces de compra</h2>

          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <TextField
              name="departureDate"
              label="Fecha de entrada"
              value={newLink.departureDate}
              onChange={handleLinkChange}
            />

            <TextField
              name="returnDate"
              label="Fecha de salida"
              value={newLink.returnDate}
              onChange={handleLinkChange}
            />

            <TextField
              name="price"
              label="Precio"
              value={newLink.price}
              onChange={handleLinkChange}
            />

            <TextField
              name="link"
              label="Enlace de compra"
              value={newLink.link}
              onChange={handleLinkChange}
            />
          </div>

          <div className="mt-4">
            <Button
              type="button"
              variant="contained"
              onClick={handleAddLink}
              disabled={isNewLinkIncomplete}
            >
              Agregar enlace
            </Button>
          </div>

          {formik.touched.buyLinks &&
            typeof formik.errors.buyLinks === "string" && (
              <p className="mt-3 text-sm text-red-600">
                {formik.errors.buyLinks}
              </p>
            )}

          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {formik.values.buyLinks.map((link, index) => (
              <div key={`${link.link}-${index}`} className="rounded border p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-semibold">Enlace {index + 1}</p>

                  <Button
                    type="button"
                    color="error"
                    size="small"
                    startIcon={<FaTrash />}
                    onClick={() => removeLink(index)}
                  >
                    Eliminar
                  </Button>
                </div>

                <TextField
                  fullWidth
                  margin="dense"
                  label="Enlace de compra"
                  value={link.link}
                  InputProps={{ readOnly: true }}
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <TextField
                    margin="dense"
                    label="Entrada"
                    value={link.departureDate}
                    InputProps={{ readOnly: true }}
                  />

                  <TextField
                    margin="dense"
                    label="Salida"
                    value={link.returnDate}
                    InputProps={{ readOnly: true }}
                  />

                  <TextField
                    margin="dense"
                    label="Precio"
                    value={link.price}
                    InputProps={{ readOnly: true }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex justify-center gap-3">
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate("/auth/ofertas")}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Crear hotel"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewHotel;
