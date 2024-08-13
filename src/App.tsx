import { lazy } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutCustom from "./components/Layout";
import LayoutCustomAuth from "./components/LayoutCustomAuth";
import LayoutCustomClient from "./components/LayoutCustomClient";
import Auth from "./pages/Auth";
import Computers from "./pages/Computers";
import Register from "./pages/Register";

const CrearComputadora = lazy(() => import("./pages/CrearComputadora"));
const Users = lazy(() => import("./pages/Users"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const Clients = lazy(() => import("./pages/Clients"));

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="*"
            element={
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Navigate to="/computers" replace />
                <h2>Page not found 404...</h2>
              </div>
            }
          />

          <Route path="/" element={<LayoutCustomAuth />}>
            <Route index path="" element={<Auth />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/dashboard/clients" element={<LayoutCustomClient />}>
            <Route index path="computers" element={<Computers />} />
            <Route path="maintenance" element={<Maintenance />} />
          </Route>

          <Route path="/" element={<LayoutCustom />}>
            <Route index path="computers" element={<Computers />} />
            <Route path="crear_computers" element={<CrearComputadora />} />
            <Route path="crear_computers/:id" element={<CrearComputadora />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="users" element={<Users />} />
            <Route path="clients" element={<Clients />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
