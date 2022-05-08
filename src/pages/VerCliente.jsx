//Este hook sirve para leer parametros
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setCargando(!cargando);
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
    <div>
      {cargando ? (
        <Spinner></Spinner>
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            Ver cliente: {cliente.nombre}
          </h1>

          <p className="mt-3">Información de Cliente</p>
          <p className="text-2xl text-gray-700">
            <span className="uppercase font-bold">Cliente:</span>
            {cliente.nombre}
          </p>
          <p className="text-2xl text-gray-700 mt-4">
            <span className="uppercase font-bold">Email:</span>
            {cliente.email}
          </p>
          <p className="text-2xl text-gray-700 mt-4">
            <span className="uppercase font-bold">Teléfono:</span>
            {cliente.telefono !== "" ? cliente.telefono : "No hay teléfono"}
          </p>
          <p className="text-2xl text-gray-700 mt-4">
            <span className="uppercase font-bold">Empresa:</span>
            {cliente.empresa}
          </p>
          <p className="text-2xl text-gray-700 mt-4">
            <span className="uppercase font-bold">Notas:</span>
            {cliente.notas !== "" ? cliente.notas : "No hay notas"}
          </p>
        </>
      )}
    </div>
  );
};

export default VerCliente;
