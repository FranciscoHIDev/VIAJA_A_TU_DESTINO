import axios from "axios";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "react-quill/dist/quill.snow.css";
import { FaPen } from "react-icons/fa";
import { MenuItem } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

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

  buyLinks: yup.array().min(1, "Debes agregar al menos un enlace")
})

function NewOffer() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedSampleImages, setSelectedSampleImages] = useState([]);
  console.log(selectedImages)

   const [newLink, setNewLink] = useState({
    departureDate: "",
    returnDate: "",
    price: "",
    link: "",
  });


  const widgetRef = useRef(null);
  const currentField = useRef(null);

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

      Swal.fire("Oferta creada con éxito", "", "success");

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
  const handleEditorChanges = (value) => {
    formik.setFieldValue("description", value);
  };





  // ✅ Cloudinary Widget (se inicializa UNA SOLA VEZ)
  useEffect(() => {
    if (!window.cloudinary || widgetRef.current) return;

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "duaysiozi",
        uploadPreset: "viajaatudestino",
        multiple: true,
      },
      (error, result) => {
        if (!error && result?.event === "success") {
          const imageUrl = result.info.secure_url;

          if (currentField.current === "image") {
            setSelectedImages((prev) => [...prev, imageUrl]);
            formik.setFieldValue("image", [
              ...formik.values.image,
              imageUrl,
            ]);
          }

          if (currentField.current === "sampleImages") {
            setSelectedSampleImages((prev) => [...prev, imageUrl]);
            formik.setFieldValue("sampleImages", [
              ...formik.values.sampleImages,
              imageUrl,
            ]);
          }
        }
      }
    );
  }, [formik]);

  const openWidget = (e, field) => {
    e.preventDefault();
    currentField.current = field;
    widgetRef.current?.open();
  };

  
  return (
    <div className="flex flex-col bg-white px-5 py-5 rounded-xl">
      <div className="flex items-center mb-5">
        <FaPen className="text-[#035373]" />
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
                              type="text"
                              margin="normal"
                              name="title"
                              label="Titulo"
                              value={formik.values.title}
                              onChange={formik.handleChange}
                              error={formik.touched.title && Boolean(formik.errors.title)}
                              helperText={formik.touched.title && formik.errors.title}
                            />
      
                {/* PRECIO */}
                <TextField
                              fullWidth
                              type="text"
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
                              type="text"
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
                              type="text"
                              margin="normal"
                              name="summary"
                              label="Resumen"
                              value={formik.values.summary}
                              onChange={formik.handleChange}
                              error={formik.touched.summary && Boolean(formik.errors.summary)}
                              helperText={formik.touched.summary && formik.errors.summary}
                            />
      
                {/* DESCRIPCIÓN */}
                <label className="font-semibold" htmlFor="description">
                              Descripción:
                            </label>
                
                            <ReactQuill
                              className="mt-3"
                              name="description"
                              value={formik.values.description}
                              onChange={handleEditorChanges}
                            />

        {/* IMÁGENES PRINCIPALES */}
        <div className="border p-3 mt-5 rounded">
          <Button
            variant="contained"
            onClick={(e) => openWidget(e, "image")}
          >
            Cargar imágenes de la oferta
          </Button>

          <div className="flex flex-wrap mt-3">
            {selectedImages.map((img) => (
              <img
                key={img}
                src={img}
                className="w-[150px] h-[100px] m-2 object-cover rounded"
                alt=""
              />
            ))}
          </div>
        </div>

        {/* IMÁGENES DE EJEMPLO */}
        <div className="border p-3 mt-5 rounded">
          <Button
            variant="contained"
            onClick={(e) => openWidget(e, "sampleImages")}
          >
            Cargar imágenes de ejemplo
          </Button>

          <div className="flex flex-wrap mt-3">
            {selectedSampleImages.map((img) => (
              <img
                key={img}
                src={img}
                className="w-[150px] h-[100px] m-2 object-cover rounded"
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between border  rounded mt-4 p-2">
         <div>
                       <TextField
                         type="text"
                         fullWidth
                         margin="normal"
                         name="promotion"
                         label="Promoción"
                         value={formik.values.promotion}
                         onChange={formik.handleChange}
                         error={
                           formik.touched.promotion && Boolean(formik.errors.promotion)
                         }
                         helperText={formik.touched.promotion && formik.errors.promotion}
                       />
                     </div>
                      <div>
                                   <TextField
                                     fullWidth
                                     type="text"
                                     margin="normal"
                                     name="availability"
                                     label="Disponibilidad"
                                     value={formik.values.availability}
                                     onChange={formik.handleChange}
                                     error={
                                       formik.touched.availability &&
                                       Boolean(formik.errors.availability)
                                     }
                                     helperText={
                                       formik.touched.availability && formik.errors.availability
                                     }
                                   />
                                 </div>
                                 <div>
                                   <TextField
                                     fullWidth
                                     type="text"
                                     margin="normal"
                                     name="daysOfStay"
                                     label="Días de estancia"
                                     value={formik.values.daysOfStay}
                                     onChange={formik.handleChange}
                                     error={
                                       formik.touched.daysOfStay && Boolean(formik.errors.daysOfStay)
                                     }
                                     helperText={
                                       formik.touched.daysOfStay && formik.errors.daysOfStay
                                     }
                                   />
                                 </div>
                                 <div>
                                   <TextField
                                     fullWidth
                                     type="text"
                                     margin="normal"
                                     name="hotel"
                                     label="Nombre del hotel"
                                     value={formik.values.hotel}
                                     onChange={formik.handleChange}
                                     error={formik.touched.hotel && Boolean(formik.errors.hotel)}
                                     helperText={formik.touched.hotel && formik.errors.hotel}
                                   />
                                 </div>
                                 </div>
                                 <div className="flex flex-row justify-center  border  rounded mt-4 p-2">
                                             <div className="mr-12">
                                               <TextField
                                                 fullWidth
                                                 margin="normal"
                                                 name="departure"
                                                 label="Aeropuerto de salida"
                                                 value={formik.values.departure}
                                                 onChange={formik.handleChange}
                                                 error={
                                                   formik.touched.departure && Boolean(formik.errors.departure)
                                                 }
                                                 helperText={formik.touched.departure && formik.errors.departure}
                                               />
                                             </div>
                                 
                                             <div>
                                               <TextField
                                                 fullWidth
                                                 type="text"
                                                 margin="normal"
                                                 name="arrival"
                                                 label="Aeropuerto de llegada"
                                                 value={formik.values.arrival}
                                                 onChange={formik.handleChange}
                                                 error={formik.touched.arrival && Boolean(formik.errors.arrival)}
                                                 helperText={formik.touched.arrival && formik.errors.arrival}
                                               />
                                             </div>
                                           </div>   
                                           




        
        
        <div className="border p-3 mt-5 rounded">
         <label className="font-semibold mt-5">Crear Deep Links</label>
         
          <div className="flex flex-row justify-between">
            
            <div>
              <TextField
                fullWidth
                type="text"
                margin="normal"
                name="departureDate"
                label="Fecha de salida"
                value={newLink.departureDate}
                onChange={handleLinkChange}
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="text"
                margin="normal"
                name="returnDate"
                label="Fecha de retorno"
                value={newLink.returnDate}
                onChange={handleLinkChange}
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="text"
                margin="normal"
                name="price"
                label="Precio"
                value={newLink.price}
                onChange={handleLinkChange}
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="text"
                margin="normal"
                name="link"
                label="Enlace de compra"
                value={newLink.link}
                onChange={handleLinkChange}
              />
            </div>
          </div>
          <div className="flex justify-center items-center mt-8">
            <Button
              color="primary"
              variant="contained"
              onClick={handleAddLink}
              disabled={isFormEmpty()}
            >
              Agregar enlace
            </Button>
            <p className="mr-1 ">
              {formik.touched.buyLinks && Boolean(formik.errors.buyLinks)}
            </p>
            <p className="text-[#d32f2f]">
              {formik.touched.buyLinks && formik.errors.buyLinks}
            </p>
          </div>
          <label className="font-semibold">Lista Deep Links</label>
          <div className=" flex mt-5">
            {formik.values.buyLinks.map((link, index) => (
              <div key={index}>
                <TextField
                  fullWidth
                  margin="normal"
                  label={`Enlace ${index + 1}`}
                  value={link.link}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={`Fecha de salida ${index + 1}`}
                  value={link.departureDate}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={`Fecha de retorno ${index + 1}`}
                  value={link.returnDate}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={`Precio ${index + 1}`}
                  value={link.price}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            ))}
          </div>
          <div>   
          </div>
          </div>

          <div>
                      <TextField
                        select
                        fullWidth
                        margin="normal"
                        name="author"
                        label="Autor"
                        value={formik.values.author}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="Francisco">Francisco</MenuItem>
                        <MenuItem value="Susana">Susana</MenuItem>
                      </TextField>
                    </div>

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
  );
}

export default NewOffer;

