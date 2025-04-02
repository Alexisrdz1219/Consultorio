// import { Request, Response, Router } from "express";
// import { pool } from "../database";
// import { encrypt, decrypt } from "../utils/crypto.util";

// const router = Router();

// // ✅ Registrar un nuevo paciente
// export const registerPaciente = async (req: Request, res: Response): Promise<void> => {
//   try {
// const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = req.body;

//     // Validar que todos los campos estén completos
//     if (!nombre || !edad || !padecimientos || !tipo_sangre || !discapacidades || !diagnostico) {
//       res.status(400).json({ message: "Todos los campos son obligatorios." });
//       return;
//     }

//     // Encriptar datos sensibles
//     const encryptedNombre = encrypt(nombre);
//     const encryptedPadecimientos = encrypt(padecimientos);
//     const encryptedTipoSangre = encrypt(tipo_sangre);
//     const encryptedDiscapacidades = encrypt(discapacidades);
//     const encryptedDiagnostico = encrypt(diagnostico);

//     // Insertar datos en la base de datos
//     const result = await pool.query(
//       "INSERT INTO pacientes (nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
//       [encryptedNombre, edad, encryptedPadecimientos, encryptedTipoSangre, encryptedDiscapacidades, encryptedDiagnostico]
//     );

//     res.status(201).json({ message: "Paciente registrado exitosamente.", paciente: result.rows[0] });
//   } catch (error) {
//     console.error("❌ Error al registrar paciente:", error);
//     res.status(500).json({ message: "Error interno al registrar paciente." });
//   }
// };

// // ✅ Obtener todos los pacientes con datos desencriptados
// export const getPacientes = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = await pool.query("SELECT * FROM pacientes");

//     if (result.rows.length === 0) {
//       res.status(404).json({ message: "No hay pacientes registrados." });
//       return;
//     }

//     const pacientes = result.rows.map((paciente) => ({
//       id: paciente.id,
//       nombre: decrypt(paciente.nombre),
//       edad: paciente.edad,
//       padecimientos: decrypt(paciente.padecimientos),
//       tipo_sangre: decrypt(paciente.tipo_sangre),
//       discapacidades: decrypt(paciente.discapacidades),
//       diagnostico: decrypt(paciente.diagnostico),
//     }));

//     res.status(200).json(pacientes);
//   } catch (error) {
//     console.error("❌ Error al obtener pacientes:", error);
//     res.status(500).json({ message: "Error interno al obtener pacientes." });
//   }
// };

// // ✅ Lista de pacientes con datos encriptados (para pruebas en Thunder Client)
// export const listarPacientes = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = await pool.query("SELECT * FROM pacientes");
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error("Error al listar pacientes:", error);
//     res.status(500).json({ message: "Error al listar pacientes." });
//   }
// };

// // ✅ Obtener un paciente por ID con datos desencriptados
// export const getPacienteById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);

//     if (result.rows.length === 0) {
//       res.status(404).json({ message: "Paciente no encontrado." });
//       return;
//     }

//     const paciente = {
//       id: result.rows[0].id,
//       nombre: decrypt(result.rows[0].nombre),
//       edad: result.rows[0].edad,
//       padecimientos: decrypt(result.rows[0].padecimientos),
//       tipo_sangre: decrypt(result.rows[0].tipo_sangre),
//       discapacidades: decrypt(result.rows[0].discapacidades),
//       diagnostico: decrypt(result.rows[0].diagnostico),
//     };

//     res.status(200).json(paciente);
//   } catch (error) {
//     console.error("❌ Error al obtener paciente por ID:", error);
//     res.status(500).json({ message: "Error interno al obtener paciente." });
//   }
// };

// // ✅ Actualizar un paciente
// export const updatePaciente = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = req.body;

//     // Verificar si el paciente existe
//     const checkPaciente = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
//     if (checkPaciente.rows.length === 0) {
//       res.status(404).json({ message: "Paciente no encontrado." });
//       return;
//     }

//     // Encriptar datos antes de la actualización
//     const encryptedNombre = encrypt(nombre);
//     const encryptedPadecimientos = encrypt(padecimientos);
//     const encryptedTipoSangre = encrypt(tipo_sangre);
//     const encryptedDiscapacidades = encrypt(discapacidades);
//     const encryptedDiagnostico = encrypt(diagnostico);

//     await pool.query(
//       "UPDATE pacientes SET nombre = $1, edad = $2, padecimientos = $3, tipo_sangre = $4, discapacidades = $5, diagnostico = $6 WHERE id = $7",
//       [encryptedNombre, edad, encryptedPadecimientos, encryptedTipoSangre, encryptedDiscapacidades, encryptedDiagnostico, id]
//     );

//     res.status(200).json({ message: "Paciente actualizado correctamente." });
//   } catch (error) {
//     console.error("❌ Error al actualizar paciente:", error);
//     res.status(500).json({ message: "Error interno al actualizar paciente." });
//   }
// };

// // ✅ Eliminar un paciente
// export const deletePaciente = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;

//     // Verificar si el paciente existe
//     const checkPaciente = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
//     if (checkPaciente.rows.length === 0) {
//       res.status(404).json({ message: "Paciente no encontrado." });
//       return;
//     }

//     await pool.query("DELETE FROM pacientes WHERE id = $1", [id]);
//     res.status(200).json({ message: `Paciente con ID ${id} eliminado correctamente.` });
//   } catch (error) {
//     console.error("❌ Error al eliminar paciente:", error);
//     res.status(500).json({ message: "Error interno al eliminar paciente." });
//   }
// };

// // ✅ Definir rutas principales
// router.get("/", getPacientes);
// router.get("/:id", getPacienteById);
// router.post("/agregar", registerPaciente);
// router.put("/actualizar/:id", updatePaciente);
// router.delete("/eliminar/:id", deletePaciente);

// export default router;
import { Request, Response, Router } from "express";
import { pool } from "../database";
import { encrypt, decrypt } from "../utils/crypto.util";

const router = Router();

// 🔹 Registrar un nuevo paciente
export const registerPaciente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = req.body;

    if (!nombre || !edad || !padecimientos || !tipo_sangre || !discapacidades || !diagnostico) {
      res.status(400).json({ message: "Todos los campos son obligatorios." });
      return;
    }

    const result = await pool.query(
      `INSERT INTO pacientes 
        (nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`,
      [
        encrypt(nombre),
        edad,
        encrypt(padecimientos),
        encrypt(tipo_sangre),
        encrypt(discapacidades),
        encrypt(diagnostico)
      ]
    );

    res.status(201).json({ message: "Paciente registrado exitosamente.", paciente: result.rows[0] });
  } catch (error) {
    console.error("❌ Error al registrar paciente:", error);
    res.status(500).json({ message: "Error interno al registrar paciente." });
  }
};

// 🔹 Obtener todos los pacientes (desencriptados)
export const getPacientes = async (_: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM pacientes");

    if (result.rows.length === 0) {
      res.status(404).json({ message: "No hay pacientes registrados." });
      return;
    }

    const pacientes = result.rows.map((p) => ({
      id: p.id,
      nombre: decrypt(p.nombre),
      edad: p.edad,
      padecimientos: decrypt(p.padecimientos),
      tipo_sangre: decrypt(p.tipo_sangre),
      discapacidades: decrypt(p.discapacidades),
      diagnostico: decrypt(p.diagnostico)
    }));

    res.status(200).json(pacientes);
  } catch (error) {
    console.error("❌ Error al obtener pacientes:", error);
    res.status(500).json({ message: "Error interno al obtener pacientes." });
  }
};

// 🔹 Obtener paciente por ID (desencriptado)
export const getPacienteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Paciente no encontrado." });
      return;
    }

    const p = result.rows[0];
    const paciente = {
      id: p.id,
      nombre: decrypt(p.nombre),
      edad: p.edad,
      padecimientos: decrypt(p.padecimientos),
      tipo_sangre: decrypt(p.tipo_sangre),
      discapacidades: decrypt(p.discapacidades),
      diagnostico: decrypt(p.diagnostico)
    };

    res.status(200).json(paciente);
  } catch (error) {
    console.error("❌ Error al obtener paciente por ID:", error);
    res.status(500).json({ message: "Error interno al obtener paciente." });
  }
};

// 🔹 Actualizar paciente
export const updatePaciente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = req.body;

    const check = await pool.query("SELECT id FROM pacientes WHERE id = $1", [id]);
    if (check.rows.length === 0) {
      res.status(404).json({ message: "Paciente no encontrado." });
      return;
    }

    await pool.query(
      `UPDATE pacientes SET 
        nombre = $1, edad = $2, padecimientos = $3, 
        tipo_sangre = $4, discapacidades = $5, diagnostico = $6 
        WHERE id = $7`,
      [
        encrypt(nombre),
        edad,
        encrypt(padecimientos),
        encrypt(tipo_sangre),
        encrypt(discapacidades),
        encrypt(diagnostico),
        id
      ]
    );

    res.status(200).json({ message: "Paciente actualizado correctamente." });
  } catch (error) {
    console.error("❌ Error al actualizar paciente:", error);
    res.status(500).json({ message: "Error interno al actualizar paciente." });
  }
};

// 🔹 Eliminar paciente
export const deletePaciente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const check = await pool.query("SELECT id FROM pacientes WHERE id = $1", [id]);
    if (check.rows.length === 0) {
      res.status(404).json({ message: "Paciente no encontrado." });
      return;
    }

    await pool.query("DELETE FROM pacientes WHERE id = $1", [id]);
    res.status(200).json({ message: `Paciente con ID ${id} eliminado correctamente.` });
  } catch (error) {
    console.error("❌ Error al eliminar paciente:", error);
    res.status(500).json({ message: "Error interno al eliminar paciente." });
  }
};

// 🔹 Obtener lista encriptada (solo para pruebas)
export const listarPacientes = async (_: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM pacientes");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al listar pacientes:", error);
    res.status(500).json({ message: "Error al listar pacientes." });
  }
};

// 🔹 Definir rutas
router.get("/", getPacientes);
router.get("/raw", listarPacientes); // Solo para debug
router.get("/:id", getPacienteById);
router.post("/agregar", registerPaciente);
router.put("/actualizar/:id", updatePaciente);
router.delete("/eliminar/:id", deletePaciente);

export default router;
