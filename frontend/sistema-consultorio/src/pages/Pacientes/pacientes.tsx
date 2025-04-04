import { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

// Animaciones
const pageTransition = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};

const buttonAnimation = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.95 },
};

// Interfaz del Paciente
interface Paciente {
  id: number;
  nombre: string;
  edad: number;
  padecimientos: string;
  tipo_sangre: string;
  discapacidades: string;
  diagnostico: string;
}

const Pacientes = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No tienes acceso. Inicia sesión.");
        setLoading(false);
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL || "https://consultorio5.onrender.com/api";
        const response = await axios.get(`${API_URL}/pacientes/desencriptados`, {
          headers: { Authorization: `Bearer ${token}` },
        });    
        setPacientes(response.data);
      } catch (err) {
        console.error("Error al obtener la lista de pacientes:", err);
        setError("Error al obtener la lista de pacientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  // Eliminar paciente
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este paciente?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL || "https://consultorio5.onrender.com/api";

      await axios.delete(`${API_URL}/pacientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Paciente eliminado exitosamente.");
      setPacientes((prevPacientes) => prevPacientes.filter((paciente) => paciente.id !== id));
    } catch (err) {
      console.error("Error al eliminar el paciente:", err);
      alert("Error al eliminar el paciente.");
    }
  };

  // Redirigir al formulario para añadir paciente
  const handleAddPaciente = () => {
    navigate("/añadir-paciente");
  };

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <Box sx={{ paddingBottom: 5 }}>
        {/* Barra de navegación */}
        <AppBar position="static" sx={{ backgroundColor: "rgb(0, 111, 191)" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
              Gestión de Pacientes
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button sx={{ color: "#FFFFFF" }} onClick={() => navigate("/dashboard")}>
                Dashboard Principal
              </Button>
              <Button sx={{ color: "#FFFFFF" }} onClick={() => navigate("/doctores")}>
                Doctores
              </Button>
              <Button sx={{ color: "#FFFFFF" }} onClick={() => navigate("/citas")}>
                Gestión de Citas
              </Button>
              <Button sx={{ color: "#FFFFFF" }}>Departamentos</Button>
            </Box>

            {/* Barra de búsqueda interactiva */}
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
              <IconButton>
                <SearchIcon sx={{ color: isSearchVisible ? "#0090FF" : "white" }} />
              </IconButton>
              {isSearchVisible && (
                <InputBase
                  placeholder="Buscar..."
                  sx={{ ml: 1, flex: 1, color: "black", "& input": { padding: "5px" } }}
                />
              )}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Contenedor de la tabla con botón para añadir pacientes */}
        <Box sx={{ padding: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Lista de Pacientes
            </Typography>

            {/* Botón para añadir paciente */}
            <motion.div variants={buttonAnimation} whileHover="whileHover" whileTap="whileTap">
              <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleAddPaciente}>
                Añadir Paciente
              </Button>
            </motion.div>
          </Box>

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
                    <TableCell>Nombre</TableCell>
                    <TableCell>Edad</TableCell>
                    <TableCell>Padecimientos</TableCell>
                    <TableCell>Tipo de Sangre</TableCell>
                    <TableCell>Discapacidades</TableCell>
                    <TableCell>Diagnóstico</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pacientes.length > 0 ? (
                    pacientes.map((paciente) => (
                      <TableRow key={paciente.id}>
                        <TableCell>{paciente.id}</TableCell>
                        <TableCell>{paciente.nombre}</TableCell>
                        <TableCell>{paciente.edad}</TableCell>
                        <TableCell>{paciente.padecimientos}</TableCell>
                        <TableCell>{paciente.tipo_sangre}</TableCell>
                        <TableCell>{paciente.discapacidades}</TableCell>
                        <TableCell>{paciente.diagnostico}</TableCell>
                        <TableCell>
                          <IconButton color="error" onClick={() => handleDelete(paciente.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} style={{ textAlign: "center" }}>
                        No hay pacientes registrados en la base de datos.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Pacientes;

