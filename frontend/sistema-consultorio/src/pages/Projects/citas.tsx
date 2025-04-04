import { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar, Toolbar, Typography, Box, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, IconButton, InputBase
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import log from "@/utils/logger";

const pageTransition = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};

interface Cita {
  id: number;
  fecha: string;
  nombre_paciente: string;
  nombre_doctor: string;
  motivo: string;
  estado: string;
}

const Citas = () => {
  const navigate = useNavigate();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [customErrorLogs, setCustomErrorLogs] = useState<string[]>([]);  // ✅ Guardar los errores

  useEffect(() => {
    const fetchCitas = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        log.warn("Intento de acceso sin token.");
        setError("No tienes acceso. Inicia sesión.");
        setLoading(false);
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL || "https://consultorio5.onrender.com";
        log.info("Iniciando solicitud a:", API_URL);

        const response = await axios.get(`${API_URL}/citas`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        log.debug("Datos obtenidos:", response.data);
        setCitas(response.data);
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || err.message || 'Error desconocido';
        log.error("Error al obtener la lista de citas:", errorMessage);
        setCustomErrorLogs((prev) => [...prev, `Error al obtener la lista de citas: ${errorMessage}`]);  // ✅ Guardar error
        setError("Error al obtener la lista de citas.");
      } finally {
        setLoading(false);
        log.info("Finalizó la carga de citas.");
      }
    };

    fetchCitas();
  }, []);

  // ✅ Función para descargar los errores
  const descargarErrores = () => {
    if (customErrorLogs.length === 0) {
      alert("No hay errores para descargar.");
      return;
    }

    const contenido = customErrorLogs.join("\n");
    const blob = new Blob([contenido], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `errores_${new Date().toISOString()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <AppBar position="static" sx={{ backgroundColor: "rgb(0, 111, 191)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
            Gestión de Citas
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button sx={{ color: "#FFFFFF" }} onClick={() => navigate("/dashboard")}>Dashboard Principal</Button>
            <Button sx={{ color: "#FFFFFF" }} onClick={() => navigate("/doctores")}>Doctores</Button>
            <Button sx={{ color: "#FFFFFF" }} onClick={() => navigate("/pacientes")}>Pacientes</Button>
            <Button sx={{ color: "#FFFFFF" }}>Departamentos</Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease-in-out",
              width: isSearchVisible ? "300px" : "50px",
              backgroundColor: isSearchVisible ? "white" : "transparent",
              borderRadius: 3,
              padding: isSearchVisible ? "5px 10px" : "0px",
            }}
            onMouseEnter={() => setIsSearchVisible(true)}
            onMouseLeave={() => setIsSearchVisible(false)}
          >
            <IconButton><SearchIcon sx={{ color: isSearchVisible ? "#0090FF" : "white" }} /></IconButton>
            {isSearchVisible && (
              <InputBase placeholder="Buscar..." sx={{ ml: 1, flex: 1, color: "black", "& input": { padding: "5px" } }} />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>Lista de Citas</Typography>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="contained" color="success" onClick={() => navigate("/crear-citas")}>Crear Cita</Button>
          </motion.div>
        </Box>

        {/* ✅ Botón que descarga los errores */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outlined" color="error" onClick={descargarErrores} sx={{ marginBottom: 2 }}>
            Descargar Logs de Errores
          </Button>
        </motion.div>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Nombre del Paciente</TableCell>
                  <TableCell>Nombre del Doctor</TableCell>
                  <TableCell>Motivo</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {citas.map((cita) => (
                  <TableRow key={cita.id}>
                    <TableCell>{cita.id}</TableCell>
                    <TableCell>{new Date(cita.fecha).toLocaleString()}</TableCell>
                    <TableCell>{cita.nombre_paciente}</TableCell>
                    <TableCell>{cita.nombre_doctor}</TableCell>
                    <TableCell>{cita.motivo}</TableCell>
                    <TableCell>{cita.estado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </motion.div>
  );
};

export default Citas;
