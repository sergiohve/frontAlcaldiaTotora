import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Login from "../views/Login.js";



/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Dashboard = lazy(() => import("../views/Dashboard.js"));
const Settings = lazy(() => import("../views/Settings.js"));
const Administracion = lazy(() => import("../views/ui/Administracion"));
const Productos = lazy(() => import("../views/ui/Productos"));
const Compras = lazy(() => import("../views/ui/Compras"));
const Ventas = lazy(() => import("../views/ui/Ventas"));
const Deudores = lazy(() => import("../views/ui/Deudores"));
const Devoluciones = lazy(() => import("../views/ui/Devoluciones"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Reportes = lazy(() => import("../views/ui/Reportes"));
const Cajasregistradas = lazy(() => import("../views/ui/Cajasregistradas.js"));
const Proveedores = lazy(() => import("../views/ui/Proveedores.js"));
const Updatecaja = lazy(() => import("../views/ui/Updatecaja.js"));
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/", element: <Login /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/settings", exact: true, element: <Settings /> },
      { path: "/administracion", exact: true, element: <Administracion /> },
      { path: "/productos", exact: true, element: <Productos /> },
      { path: "/compras", exact: true, element: <Compras /> },
      { path: "/ventas", exact: true, element: <Ventas /> },
      { path: "/deudores", exact: true, element: <Deudores /> },
      { path: "/dashboard/cajas/cajasregistradas", exact: true, element: <Cajasregistradas /> },
      { path: "/dashboard/cajas/updatecaja", exact: true, element: <Updatecaja /> },
      { path: "/dashboard/proveedores", exact: true, element: <Proveedores /> },
      { path: "/devoluciones", exact: true, element: <Devoluciones /> },
      { path: "/kardex", exact: true, element: <Forms /> },
      { path: "/reportes", exact: true, element: <Reportes /> },
    ],
  },
];

export default ThemeRoutes;
