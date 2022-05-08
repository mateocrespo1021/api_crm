import Formulario from "../components/Formulario";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4003/clientes/${id}`;
        const resp = await fetch(url);
        const resul = await resp.json();
        setCliente(resul);
      } catch (error) {
        console.log(error);
      }

      setCargando(false);
    };
    obtenerClienteAPI();
  }, []);



  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="">
        Utilize este formulario para editar datos de un cliente
      </p>
      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando}></Formulario>
      ) : (
        <p>Cliente no valido</p>
      )}
    </>
  );
};

export default EditarCliente;
