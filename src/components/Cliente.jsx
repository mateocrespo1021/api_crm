import React from "react";
import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleEliminar}) => {
   
  const navigate=useNavigate()
  const { nombre, empresa, email, telefono, notas, id } = cliente;
  return (
    <tr className="border-b">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p className="text-gray-800 uppercase font-bold">
          Email: <span className="lowercase">{email}</span>
        </p>
        <p className="text-gray-800 uppercase font-bold">
          Tel: <span className="lowercase">{telefono}</span>
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          type="button"
          className="bg-yellow-600 hover:bg-yellow-700 block w-full text-while p-2 uppercase font-bold text-xs"
          onClick={()=>navigate(`/clientes/${id}`)}
        >
          Ver
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 block w-full text-while p-2 uppercase font-bold text-xs mt-3"
          onClick={()=>navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 block w-full text-while p-2 uppercase font-bold text-xs mt-3"
          onClick={()=>handleEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
