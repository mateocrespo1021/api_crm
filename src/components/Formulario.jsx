import { Formik, Form, Field } from "formik";
//Funcion para navegar entre rutas
import { useNavigate } from "react-router-dom";
import * as Yup from "Yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente,cargando}) => {
  //Habilito navigate
  const navigate = useNavigate();
  //Objeto para configuracion de validacion con Yup
  const nuevoClienteShema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligaotrio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .positive("Número no valido")
      .integer("Númerp no válido")
      .typeError("El número no es valido"),
    notas: "",
  });

  //Cuando hace submit
  const handleSubmit = async (values) => {
    try {
      let respuesta
      if (cliente.id) {
        //Modo editar
        const url = `http://localhost:4003/clientes/${cliente.id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
       
      }else{
        //Modo nuevo registro
        const url = "http://localhost:4003/clientes";
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      const resultado = await respuesta.json();
      //Me regresa a mi pagina principal
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    cargando? <Spinner></Spinner>:(
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h2 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h2>
      {/*Componente formik para formularios*/}
      <Formik
        //Valores inciales
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        //Esta propiedad llena mis inputs
        enableReinitialize={true}
        //Cuando hace submit
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        //Añade un esquema de validaciones a mi formik
        validationSchema={nuevoClienteShema}
      >
        {/*Con esta sintaxis accedo a mi datos del formulario,el touched es cuando salgo y entro del input*/}
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="text-gray-800">
                  Nombre:
                </label>
                <Field
                  id="name"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="tel" className="text-gray-800">
                  Teléfono:
                </label>
                <Field
                  id="tel"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">
                  Notas
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg "
              />
            </Form>
          );
        }}
      </Formik>
    </div>
    ) 
   
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando:false
};

export default Formulario;
