import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "react-quill/dist/quill.snow.css";
import { FaPen } from "react-icons/fa";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

const validationSchema = yup.object({
  price: yup.string("Agrega el precio").required("Precio requerido"),
});

function NewOffer() {
  const formik = useFormik({
    initialValues: {
      category: "",
      title: "",
      price: "",
      destination: "",
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
      author: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New car has been created successfully",
        showConfirmButton: true,
      });
    },
  });
  const [newLink, setNewLink] = useState({
    departureDate: "",
    returnDate: "",
    price: "",
    link: "",
  });

  const handleLinkChange = (e) => {
    setNewLink((prevLink) => ({
      ...prevLink,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddLink = () => {
    formik.setFieldValue("buyLinks", [...formik.values.buyLinks, newLink]);
    setNewLink({
      departureDate: "",
      returnDate: "",
      price: "",
      link: "",
    });
  };

  const openWidget = (e, field) => {
    e.preventDefault();
    var widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "duaysiozi",
        uploadPreset: "pmba0f4i",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.url;
          if (field === "image") {
            formik.setFieldValue("image", imageUrl);
          } else if (field === "samplesImage") {
            formik.setFieldValue("samplesImage", imageUrl);
          }
          console.log(imageUrl);
        }
      }
    );
    widget.open();
  };

  return (
    <>
      <div className="flex flex-col bg-white px-5 py-5 rounded-xl">
        <div className="flex flex-row items-center mb-5">
          <FaPen className="mt-1 text-[#035373]" />
          <h1 className="text-2xl  font-semibold ml-2">Nueva oferta</h1>
        </div>
        <form onSubmit={""}>
          <div>
            <TextField
              select
              fullWidth
              margin="normal"
              name="category"
              label="Categoría"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <MenuItem value="paquete">Paquete</MenuItem>
              <MenuItem value="hotel">Hotel</MenuItem>
              <MenuItem value="vuelo">Vuelo</MenuItem>
              <MenuItem value="tour">Tour</MenuItem>
            </TextField>
          </div>
          <div>
            <TextField
              fullWidth
              type="text"
              margin="normal"
              name="title"
              label="Titulo"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              type="text"
              margin="normal"
              name="price"
              label="Precio desde"
            />
          </div>
          <div>
            <TextField
              fullWidth
              type="text"
              margin="normal"
              name="destination"
              label="Destino"
            />
          </div>
          <div>
            <TextField
              fullWidth
              type="text"
              margin="normal"
              name="summary"
              label="Resumen"
            />
          </div>
          <div className="">
            <label className="font-semibold" htmlFor="description">
              Descripción:
            </label>
            <ReactQuill
              className="mt-3"
              id="descripcion"
              name="description"
              value={formik.values.description}
              // onChange={""}
            />
          </div>
          <div className="flex justify-between mt-5 mb-5">
            <div className="flex   justify-center items-center border p-2 border-slate-300">
              <label className="font-semibold mr-5">
                Imagenes de las ofertas:
              </label>
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => openWidget(e, "image")}
              >
                Cargar archivos
              </Button>
            </div>
            <div className="flex justify-center items-center border p-2 border-slate-300">
              <label className="font-semibold mr-5">
                Imagenes de ejemplos:
              </label>
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => openWidget(e, "samplesImage")}
              >
                Cargar archivos
              </Button>
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div>
              <TextField
                type="text"
                fullWidth
                margin="normal"
                name="promotion"
                label="Promoción"
              />
            </div>

            <div>
              <TextField
                fullWidth
                type="text"
                margin="normal"
                name="availability"
                label="Disponibilidad"
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="text"
                margin="normal"
                name="daysOfStay"
                label="Días de estancia"
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="text"
                margin="normal"
                name="hotel"
                label="Nombre del hotel"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center">
            {formik.values.category === "paquete" ? (
              <div className="mr-12">
                <TextField
                  fullWidth
                  margin="normal"
                  name="departure"
                  label="Aeropuerto de salida"
                />
              </div>
            ) : null}

            {formik.values.category == "paquete" ? (
              <div>
                <TextField
                  fullWidth
                  type="text"
                  margin="normal"
                  name="arrival"
                  label="Aeropuerto de llegada"
                />
              </div>
            ) : null}
          </div>

          <label className="font-semibold">Crear enlaces de cada oferta</label>
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
          <div className="flex justify-center mt-5">
            <Button color="primary" variant="contained" onClick={handleAddLink}>
              Agregar enlace
            </Button>
          </div>
          <label className="font-semibold">Lista de ofertas</label>
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
            <TextField
              select
              fullWidth
              margin="normal"
              name="author"
              label="Autor"
            >
              <MenuItem value="Francisco">Francisco</MenuItem>
              <MenuItem value="Susana">Susana</MenuItem>
            </TextField>
          </div>

          <div className="flex mt-5 justify-center">
            <Button color="primary" variant="contained" type="submit">
              Crear nueva oferta
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewOffer;
