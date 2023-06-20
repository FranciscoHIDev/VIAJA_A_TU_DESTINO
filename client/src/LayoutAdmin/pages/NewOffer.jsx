import ReactQuill from "react-quill";
import { useFormik, Field, Form, useField } from "formik";
import "react-quill/dist/quill.snow.css";
import { FaPen } from "react-icons/fa";

function NewOffer() {
  return (
    <>
      <div className="flex flex-col bg-white px-5 py-5 rounded-xl">
        <div className="flex flex-row items-center">
          <FaPen className="mt-1 text-[#035373]" />
          <h1 className="text-2xl  font-semibold ml-2">Nueva oferta</h1>
        </div>
        <form>
          <div>
            {/* <Field as="select" name="type">
              <option value="Paquetes">Paquete</option>
              <option value="Hotel">Hotel</option>
              <option value="Vuelo">Vuelo</option>
              <option value="Tours">Tours</option>
            </Field> */}
          </div>
          <div className="mt-10">
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
        </form>
      </div>
    </>
  );
}

export default NewOffer;
