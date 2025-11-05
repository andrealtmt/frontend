import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./views/Landing";
import { Participantes } from "./views/Participantes";
import { Registro } from "./views/Registro";
import { Gafete } from "./views/Gafete";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/participantes", element: <Participantes /> },
  { path: "/registro", element: <Registro /> },
  { path: "/gafete/:id", element: <Gafete /> },
]);
