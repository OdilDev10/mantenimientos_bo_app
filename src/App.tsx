import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutCustom from "./components/Layout";
import Computers from "./pages/Computers";
import Maintenance from "./pages/Maintenance";
import Users from "./pages/Users";
import CrearComputadora from "./pages/CrearComputadora";
import { useEffect } from "react";
import axiosInstance from "./services/axiosconfig";

function App() {
  useEffect(() => {
    const DEBUG: boolean = JSON.parse(import.meta.env.VITE_DEBUG);

    if (DEBUG == false) {
      axiosInstance
        .get(`/`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
