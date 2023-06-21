import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "react-quill/dist/quill.snow.css";
import { FaPen } from "react-icons/fa";
import { MenuItem } from "@mui/material";
import { useState } from "react";

const validationSchema = yup.object({
  price: yup.string("Agrega el precio").required("Precio requerido"),
});

function NewOffer() {
  const formik = useFormik({
    initialValues: {
      price: "",
      buyLinks: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
  return (
    <>
      <div className="flex flex-col bg-white px-5 py-5 rounded-xl">
        <div className="flex flex-row items-center mb-5">
          <FaPen className="mt-1 text-[#035373]" />
          <h1 className="text-2xl  font-semibold ml-2">Nueva oferta</h1>
        </div>
        <form>
          <div>
            <TextField
              select
              fullWidth
              margin="normal"
              name="category"
              label="Categoría"
            >
              <MenuItem value="paquete">Paquete</MenuItem>
              <MenuItem value="hotel">Hotel</MenuItem>
              <MenuItem value="vuelo">Vuelo</MenuItem>
              <MenuItem value="tour">Tour</MenuItem>
            </TextField>
          </div>
          <div>
            <TextField fullWidth margin="normal" name="titulo" label="Titulo" />
          </div>
          <div>
            <TextField
              fullWidth
              margin="normal"
              name="resumen"
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
              // value={"descripcion"}
              // onChange={""}
            />
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <TextField
                fullWidth
                margin="normal"
                name="precio"
                label="Promoción"
              />
            </div>
            {formik.values.category === "paquete" ? (
              <div>
                <TextField
                  fullWidth
                  margin="normal"
                  name="precio"
                  label="Aeropuerto de salida"
                />
              </div>
            ) : null}

            {formik.values.category === "paquete" ? (
              <div>
                <TextField
                  fullWidth
                  margin="normal"
                  name="precio"
                  label="Aeropuerto de llegada"
                />
              </div>
            ) : null}

            <div>
              <TextField
                fullWidth
                margin="normal"
                name="precio"
                label="Disponibilidad"
              />
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                name="precio"
                label="Días de estancia"
              />
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                name="precio"
                label="Nombre del hotel"
              />
            </div>
          </div>

          <label className="text-2xl">Crear enlaces de cada oferta</label>
          <div className="flex flex-row justify-between">
            <div>
              <TextField
                fullWidth
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
          <label className="text-2xl">Lista de ofertas</label>
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
