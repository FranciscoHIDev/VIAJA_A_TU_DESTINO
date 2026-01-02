import axios from "axios";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { FaPen } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";

/* ================= VALIDATION ================= */
const validationSchema = yup.object({
  title: yup
    .string()
    .min(20, "Ingrese mínimo 20 caracteres")
    .max(40, "Ingresa máximo 40 caracteres")
    .required("El Titulo es requerido"),

  price: yup
    .string()
    .min(3, "Ingrese mínimo 3 caracteres")
    .max(8, "Ingrese máximo 8 caracteres")
    .required("El precio es requerido"),

  summary: yup
    .string()
    .min(10, "Ingrese mínimo 10 caracteres")
    .max(40, "Ingrese máximo 40 caracteres")
    .required("Ingrese un resumen de la oferta"),

  description: yup
    .string()
    .min(50, "Ingrese mínimo 50 caracteres")
    .required("Ingrese una descripción de la oferta"),

  promotion: yup
    .string()
    .min(10, "Mínimo 10 caracteres")
    .max(25, "Máximo 25 caracteres")
    .required("Ingrese una frase destacada"),

  availability: yup
    .string()
    .min(10, "Mínimo 10 caracteres")
    .max(40, "Máximo 40 caracteres")
    .required("La disponibilidad es requerida"),

  daysOfStay: yup
    .string()
    .min(5, "Mínimo 5 caracteres")
    .max(30, "Máximo 30 caracteres")
    .required("Días de estancia requerida"),

  hotel: yup.string().required("El nombre del hotel es requerido"),
  departure: yup.string().required("Aeropuerto de salida requerido"),
  arrival: yup.string().required("Aeropuerto de llegada requerido"),

  buyLinks: yup.array().min(1, "Debes agregar al menos un enlace"),
});

/* ================= COMPONENT ================= */
function NewOffer() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedSampleImages, setSelectedSampleImages] = useState([]);

  const [newLink, setNewLink] = useState({
    departureDate: "",
    returnDate: "",
    price: "",
    link: "",
  });

  const formik = useFormik({
    initialValues: {
      category: { name: "Paquete" },
      title: "",
      price: "",
      destination: { name: "" },
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
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios.post("api/offers", values);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Oferta creada con exito",
      });

      formik.resetForm();
      setSelectedImages([]);
      setSelectedSampleImages([]);
    },
  });

  /* ================= BUY LINKS ================= */
  const handleLinkChange = (e) => {
    setNewLink((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddLink = () => {
    formik.setFieldValue("buyLinks", [
      ...formik.values.buyLinks,
      newLink,
    ]);

    setNewLink({
      departureDate: "",
      returnDate: "",
      price: "",
      link: "",
    });
  };

  const isFormEmpty = () =>
    !newLink.departureDate ||
    !newLink.returnDate ||
    !newLink.price ||
    !newLink.link;

  /* ================= EDITOR ================= */
  const handleEditorChange = (value) => {
    formik.setFieldValue("description", value);
  };

  /* ================= CLOUDINARY ================= */
  const openWidget = (e, field) => {
    e.preventDefault();

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "duaysiozi",
        uploadPreset: "viajaatudestino",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.url;

          if (field === "image") {
            setSelectedImages((prev) => [...prev, imageUrl]);
            formik.setFieldValue("image", [
              ...formik.values.image,
              imageUrl,
            ]);
          }

          if (field === "sampleImages") {
            setSelectedSampleImages((prev) => [...prev, imageUrl]);
            formik.setFieldValue("sampleImages", [
              ...formik.values.sampleImages,
              imageUrl,
            ]);
          }
        }
      }
    );

    widget.open();
  };

  /* ================= RENDER ================= */
  return (
    <>
      <div className="flex flex-col bg-white px-5 py-5 rounded-xl">
        <div className="flex items-center mb-5">
          <FaPen className="mt-1 text-[#035373]" />
          <h1 className="text-2xl font-semibold ml-2">
            Nueva oferta
          </h1>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* CATEGORÍA */}
          <TextField
            select
            fullWidth
            margin="normal"
            name="category.name"
            label="Categoría"
            value={formik.values.category.name.toLowerCase()}
            onChange={formik.handleChange}
          >
            <MenuItem value="Paquete">Paquete</MenuItem>
          </TextField>

          {/* TÍTULO */}
          <TextField
            fullWidth
            margin="normal"
            name="title"
            label="Titulo"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            required
          />

          {/* PRECIO */}
          <TextField
            fullWidth
            margin="normal"
            name="price"
            label="Precio desde"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          {/* DESTINO */}
          <TextField
            fullWidth
            margin="normal"
            name="destination.name"
            label="Destino"
            value={formik.values.destination.name}
            onChange={formik.handleChange}
            required
          />

          {/* RESUMEN */}
          <TextField
            fullWidth
            margin="normal"
            name="summary"
            label="Resumen"
            value={formik.values.summary}
            onChange={formik.handleChange}
            error={formik.touched.summary && Boolean(formik.errors.summary)}
            helperText={formik.touched.summary && formik.errors.summary}
          />

          {/* DESCRIPCIÓN */}
          <label className="font-semibold">Descripción:</label>
          <ReactQuill
            className="mt-3"
            value={formik.values.description}
            onChange={handleEditorChange}
          />

          {/* SUBMIT */}
          <div className="flex mt-5 justify-center">
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >
              Crear nueva oferta
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewOffer;
