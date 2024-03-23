import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutCustom from "./components/Layout";
import Computers from "./pages/Computers";
import { lazy, useEffect } from "react";
import axiosInstance from "./services/axiosconfig";

const CrearComputadora = lazy(() => import('./pages/CrearComputadora'))
const Users = lazy(() => import('./pages/Users'))
const Maintenance = lazy(() => import('./pages/Maintenance'))


function App() {
  useEffect(() => {
    const DEBUG: boolean = JSON.parse(import.meta.env.VITE_DEBUG);

    if (DEBUG == false) {
      axiosInstance
        .get(`/`)
        .then(() => {
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);


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

          <Route path="/" element={<LayoutCustom />}>
            <Route index path="computers" element={<Computers />} />
            <Route path="crear_computers" element={<CrearComputadora />} />

            <Route path="crear_computers/:id" element={<CrearComputadora />} />

            <Route path="maintenance" element={<Maintenance />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
