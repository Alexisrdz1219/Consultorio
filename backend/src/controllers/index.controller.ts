// import { Request, Response } from "express";
// import { pool } from "../database";
// import { QueryResult } from "pg";
// import bcrypt from "bcryptjs";


// // 🔹 Obtener todos los usuarios
// export const getUsers = async (req: Request, res: Response): Promise<void> => {
//   try {
//       const response = await pool.query("SELECT * FROM users ORDER BY id ASC");
//       res.status(200).json(response.rows);
//   } catch (e) {
//       console.error(e);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// // 🔹 Obtener usuario por ID
// export const getUserById = async (req: Request, res: Response): Promise<void> => {
//   try {
//       const id = parseInt(req.params.id);
//       const response: QueryResult = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//       res.json(response.rows);
//   } catch (e) {
//       console.error(e);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // 🔹 Crear nuevo usuario
// export const createUser = async (req: Request, res: Response) => {
//   const { nombre, usuario, contrasena, rol } = req.body;
//   const hashedPassword = await bcrypt.hash(contrasena, 10); // Cifrar la contraseña

//   await pool.query(
//       "INSERT INTO users (nombre, usuario, contrasena, rol) VALUES ($1, $2, $3, $4)",
//       [nombre, usuario, hashedPassword, rol]
//   );

//   res.json({
//       message: "Usuario agregado exitosamente",
//       body: {
//           user: { nombre, usuario, rol }
//       }
//   });
// };

// // 🔹 Actualizar usuario
// export const updateUser = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const { nombre, usuario, contrasena, rol } = req.body;
//   const hashedPassword = await bcrypt.hash(contrasena, 10);

//   await pool.query(
//       "UPDATE users SET nombre = $1, usuario = $2, contrasena = $3, rol = $4 WHERE id = $5",
//       [nombre, usuario, hashedPassword, rol, id]
//   );
//   res.json("Usuario actualizado correctamente");
// };

// // 🔹 Eliminar usuario
// export const deleteUser = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   await pool.query("DELETE FROM users WHERE id = $1", [id]);
//   res.json(`Usuario ${id} eliminado exitosamente`);
// };

// // 🔹 Obtener todos los doctores
// export const getDoctores = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const response: QueryResult = await pool.query("SELECT * FROM doctores ORDER BY id ASC");
//     res.status(200).json(response.rows);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// // 🔹 Obtener doctor por ID
// export const getDoctoresById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const id = parseInt(req.params.id);
//     const response: QueryResult = await pool.query("SELECT * FROM doctores WHERE id = $1", [id]);
//     res.json(response.rows); // ✅ Quitamos `return`
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// // 🔹 Crear nuevo doctor
// export const createDoctores = async (req: Request, res: Response) => {
//   const { nombre, cedula, especializacion, area, telefono } = req.body;
//   await pool.query(
//     "INSERT INTO doctores (nombre, cedula, especializacion, area, telefono) VALUES ($1, $2, $3, $4, $5)",
//     [nombre, cedula, especializacion, area, telefono]
//   );
//   res.json({ message: "Doctor agregado correctamente" });
// };

// // 🔹 Actualizar doctor
// export const updateDoctores = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const { nombre, cedula, especializacion, area, telefono } = req.body;
//   await pool.query(
//     "UPDATE doctores SET nombre = $1, cedula = $2, especializacion = $3, area = $4, telefono = $5 WHERE id = $6",
//     [nombre, cedula, especializacion, area, telefono, id]
//   );
//   res.json("Doctor actualizado correctamente");
// };

// // 🔹 Eliminar doctor
// export const deleteDoctores = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   await pool.query("DELETE FROM doctores WHERE id = $1", [id]);
//   res.json(`Doctor ${id} eliminado correctamente`);
// };

// // 🔹 Controladores para Pacientes
// export const getPacientes = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const response: QueryResult = await pool.query("SELECT * FROM pacientes ORDER BY id ASC");
//     res.status(200).json(response.rows);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getPacientesById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const id = parseInt(req.params.id);
//     const response: QueryResult = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
//     res.json(response.rows);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const createPacientes = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = req.body;
    
//     await pool.query(
//       "INSERT INTO pacientes (nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico) VALUES ($1, $2, $3, $4, $5, $6)",
//       [nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico]
//     );

//     res.status(201).json({ message: "Paciente agregado correctamente" });
//   } catch (error) {
//     console.error("Error al agregar paciente:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// export const updatePacientes = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const { nombre, edad, padecimientos, tipo_sangre, discapacidades } = req.body;
//   await pool.query(
//     "UPDATE pacientes SET nombre = $1, edad = $2, padecimientos = $3, tipo_sangre = $4, discapacidades = $5 WHERE id = $6",
//     [nombre, edad, padecimientos, tipo_sangre, discapacidades, id]
//   );
//   res.json("Paciente actualizado correctamente");
// };

// export const deletePacientes = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   await pool.query("DELETE FROM pacientes WHERE id = $1", [id]);
//   res.json(`Paciente ${id} eliminado correctamente`);
// };

// // 🔹 Controladores para Tareas y Proyectos
// export const getTareas = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const response: QueryResult = await pool.query("SELECT * FROM tareas_proyectos ORDER BY id ASC");
//     res.status(200).json(response.rows);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getTareasById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const id = parseInt(req.params.id);
//     const response: QueryResult = await pool.query("SELECT * FROM tareas_proyectos WHERE id = $1", [id]);
//     res.json(response.rows);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// export const createTareas = async (req: Request, res: Response) => {
//   const { nombre_tarea, fecha_inicio, fecha_limite, descripcion } = req.body;
//   await pool.query(
//     "INSERT INTO tareas_proyectos (nombre_tarea, fecha_inicio, fecha_limite, descripcion) VALUES ($1, $2, $3, $4)",
//     [nombre_tarea, fecha_inicio, fecha_limite, descripcion]
//   );
//   res.json({ message: "Tarea agregada correctamente" });
// };

// export const updateTareas = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const { nombre_tarea, fecha_inicio, fecha_limite, descripcion } = req.body;
//   await pool.query(
//     "UPDATE tareas_proyectos SET nombre_tarea = $1, fecha_inicio = $2, fecha_limite = $3, descripcion = $4 WHERE id = $5",
//     [nombre_tarea, fecha_inicio, fecha_limite, descripcion, id]
//   );
//   res.json("Tarea actualizada correctamente");
// };

// export const deleteTareas = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   await pool.query("DELETE FROM tareas_proyectos WHERE id = $1", [id]);
//   res.json(`Tarea ${id} eliminada correctamente`);
// };
import { Request, Response } from "express";
import { pool } from "../database";
import bcrypt from "bcryptjs";
import { QueryResult } from "pg";

// 🔹 USUARIOS

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT id, nombre, usuario, rol FROM users ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("SELECT id, nombre, usuario, rol FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nombre, usuario, contrasena, rol } = req.body;

    if (!nombre || !usuario || !contrasena || !rol) {
      res.status(400).json({ message: "Todos los campos son obligatorios." });
      return;
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const result = await pool.query(
      "INSERT INTO users (nombre, usuario, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, usuario, rol",
      [nombre, usuario, hashedPassword, rol]
    );

    res.status(201).json({ message: "Usuario agregado exitosamente", user: result.rows[0] });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, usuario, contrasena, rol } = req.body;

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const result = await pool.query(
      "UPDATE users SET nombre = $1, usuario = $2, contrasena = $3, rol = $4 WHERE id = $5 RETURNING id, nombre, usuario, rol",
      [nombre, usuario, hashedPassword, rol, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json({ message: "Usuario actualizado correctamente", user: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json({ message: `Usuario ${id} eliminado exitosamente` });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// 🔹 DOCTORES

export const getDoctores = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM doctores ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener doctores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getDoctoresById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("SELECT * FROM doctores WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Doctor no encontrado" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener doctor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createDoctores = async (req: Request, res: Response) => {
  try {
    const { nombre, cedula, especializacion, area, telefono } = req.body;

    await pool.query(
      "INSERT INTO doctores (nombre, cedula, especializacion, area, telefono) VALUES ($1, $2, $3, $4, $5)",
      [nombre, cedula, especializacion, area, telefono]
    );

    res.status(201).json({ message: "Doctor agregado correctamente" });
  } catch (error) {
    console.error("Error al crear doctor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateDoctores = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, cedula, especializacion, area, telefono } = req.body;

    const result = await pool.query(
      "UPDATE doctores SET nombre = $1, cedula = $2, especializacion = $3, area = $4, telefono = $5 WHERE id = $6 RETURNING *",
      [nombre, cedula, especializacion, area, telefono, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Doctor no encontrado" });
      return;
    }

    res.json({ message: "Doctor actualizado correctamente", doctor: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar doctor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteDoctores = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("DELETE FROM doctores WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Doctor no encontrado" });
      return;
    }

    res.json({ message: `Doctor ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar doctor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// 🔹 PACIENTES

export const getPacientes = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM pacientes ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getPacientesById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Paciente no encontrado" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createPacientes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = req.body;

    await pool.query(
      "INSERT INTO pacientes (nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico) VALUES ($1, $2, $3, $4, $5, $6)",
      [nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico]
    );

    res.status(201).json({ message: "Paciente agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updatePacientes = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, edad, padecimientos, tipo_sangre, discapacidades } = req.body;

    const result = await pool.query(
      "UPDATE pacientes SET nombre = $1, edad = $2, padecimientos = $3, tipo_sangre = $4, discapacidades = $5 WHERE id = $6 RETURNING *",
      [nombre, edad, padecimientos, tipo_sangre, discapacidades, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Paciente no encontrado" });
      return;
    }

    res.json({ message: "Paciente actualizado correctamente", paciente: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deletePacientes = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("DELETE FROM pacientes WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Paciente no encontrado" });
      return;
    }

    res.json({ message: `Paciente ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// 🔹 TAREAS Y PROYECTOS

export const getTareas = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM tareas_proyectos ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getTareasById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("SELECT * FROM tareas_proyectos WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener tarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createTareas = async (req: Request, res: Response) => {
  try {
    const { nombre_tarea, fecha_inicio, fecha_limite, descripcion } = req.body;

    await pool.query(
      "INSERT INTO tareas_proyectos (nombre_tarea, fecha_inicio, fecha_limite, descripcion) VALUES ($1, $2, $3, $4)",
      [nombre_tarea, fecha_inicio, fecha_limite, descripcion]
    );

    res.status(201).json({ message: "Tarea agregada correctamente" });
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateTareas = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre_tarea, fecha_inicio, fecha_limite, descripcion } = req.body;

    const result = await pool.query(
      "UPDATE tareas_proyectos SET nombre_tarea = $1, fecha_inicio = $2, fecha_limite = $3, descripcion = $4 WHERE id = $5 RETURNING *",
      [nombre_tarea, fecha_inicio, fecha_limite, descripcion, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    res.json({ message: "Tarea actualizada correctamente", tarea: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteTareas = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("DELETE FROM tareas_proyectos WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    res.json({ message: `Tarea ${id} eliminada correctamente` });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
