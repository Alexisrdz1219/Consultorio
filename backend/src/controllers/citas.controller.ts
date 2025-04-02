// import { Request, Response } from "express";

// // Ejemplo de funciones básicas (ajústalas según tu lógica de negocio)
// export const getCitas = async (req: Request, res: Response) => {
//   res.json({ message: "Lista de citas obtenida correctamente" });
// };

// export const getCitaById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({ message: `Detalles de la cita con ID ${id}` });
// };

// export const createCita = async (req: Request, res: Response) => {
//   res.json({ message: "Cita creada exitosamente" });
// };

// export const updateCita = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({ message: `Cita con ID ${id} actualizada` });
// };

// export const deleteCita = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({ message: `Cita con ID ${id} eliminada` });
// };

import { Request, Response } from "express";
import { pool } from "../database";

// ✅ Obtener todas las citas
export const getCitas = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM citas");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    res.status(500).json({ message: "Error al obtener las citas" });
  }
};

// ✅ Obtener una cita por ID
export const getCitaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM citas WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Cita no encontrada" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error al obtener cita:", error);
    res.status(500).json({ message: "Error al obtener la cita" });
  }
};

// ✅ Crear una nueva cita
export const createCita = async (req: Request, res: Response) => {
  const { fecha, hora, usuario_id, descripcion } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO citas (fecha, hora, usuario_id, descripcion) VALUES ($1, $2, $3, $4) RETURNING *",
      [fecha, hora, usuario_id, descripcion]
    );
    res.status(201).json({ message: "Cita creada exitosamente", cita: result.rows[0] });
  } catch (error) {
    console.error("Error al crear cita:", error);
    res.status(500).json({ message: "Error al crear la cita" });
  }
};

// ✅ Actualizar una cita
export const updateCita = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fecha, hora, usuario_id, descripcion } = req.body;
  try {
    const result = await pool.query(
      "UPDATE citas SET fecha = $1, hora = $2, usuario_id = $3, descripcion = $4 WHERE id = $5 RETURNING *",
      [fecha, hora, usuario_id, descripcion, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Cita no encontrada" });
    } else {
      res.status(200).json({ message: "Cita actualizada", cita: result.rows[0] });
    }
  } catch (error) {
    console.error("Error al actualizar cita:", error);
    res.status(500).json({ message: "Error al actualizar la cita" });
  }
};

// ✅ Eliminar una cita
export const deleteCita = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM citas WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Cita no encontrada" });
    } else {
      res.status(200).json({ message: "Cita eliminada", cita: result.rows[0] });
    }
  } catch (error) {
    console.error("Error al eliminar cita:", error);
    res.status(500).json({ message: "Error al eliminar la cita" });
  }
};
