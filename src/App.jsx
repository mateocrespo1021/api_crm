import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import EditarCliente from "./pages/EditarCliente";
import Inicio from "./pages/Inicio";
import NuevoCliente from "./pages/NuevoCliente";
import VerCliente from "./pages/VerCliente";

function App() {
  //Qué es el routing
  //Con una libreria de routing puedes tener diferentes URL´s y
  //mostrar diferentes componentes,así como restringir acceso a ciertas paginas
  //Un proyecto grandes es mejor manejarlo en múltiples pantallas,
  //en lugar de un solo componente que revise multiples condiciones

  //Librerias
  //React Router

  //Qué es una rest api
  //Rest=representational state tranfer
  //Puede ser diseñada en cualquier lenguaje
  //Debe responder a los request http:get,post,put,patch,delete
  //Tiene una forma ordenada y estructurada de poner a desposición los
  //recuersos
  //UNA REST API CUANTA CON ENDPOINTS(O URLS) PARA HACER OPERACIONES CRUD

  //Verbos http
  //GET:OBTENER
  //POST:CREACION
  //PUT:ACTUALIZAR
  //DELETE:ELIMINAR

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout></Layout>}>
          <Route index element={<Inicio></Inicio>} />
          <Route path="nuevo" element={<NuevoCliente></NuevoCliente>} />
          <Route
            path="editar/:id"
            element={<EditarCliente></EditarCliente>}
          ></Route>
          <Route path=":id" element={<VerCliente></VerCliente>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
