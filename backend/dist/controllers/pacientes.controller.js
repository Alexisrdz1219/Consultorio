"use strict";
// import { Request, Response, Router } from "express";
// import { pool } from "../database";
// import { encrypt, decrypt } from "../utils/crypto.util";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarPacientes = exports.deletePaciente = exports.updatePaciente = exports.getPacienteById = exports.getPacientes = exports.registerPaciente = void 0;
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
const express_1 = require("express");
const database_1 = require("../database");
const crypto_util_1 = require("../utils/crypto.util");
const router = (0, express_1.Router)();
// 🔹 Registrar un nuevo paciente
const registerPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = req.body;
        if (!nombre || !edad || !padecimientos || !tipo_sangre || !discapacidades || !diagnostico) {
            res.status(400).json({ message: "Todos los campos son obligatorios." });
            return;
        }
        const result = yield database_1.pool.query(`INSERT INTO pacientes 
        (nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`, [
            (0, crypto_util_1.encrypt)(nombre),
            edad,
            (0, crypto_util_1.encrypt)(padecimientos),
            (0, crypto_util_1.encrypt)(tipo_sangre),
            (0, crypto_util_1.encrypt)(discapacidades),
            (0, crypto_util_1.encrypt)(diagnostico)
        ]);
        res.status(201).json({ message: "Paciente registrado exitosamente.", paciente: result.rows[0] });
    }
    catch (error) {
        console.error("❌ Error al registrar paciente:", error);
        res.status(500).json({ message: "Error interno al registrar paciente." });
    }
});
exports.registerPaciente = registerPaciente;
// 🔹 Obtener todos los pacientes (desencriptados)
const getPacientes = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.pool.query("SELECT * FROM pacientes");
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No hay pacientes registrados." });
            return;
        }
        const pacientes = result.rows.map((p) => ({
            id: p.id,
            nombre: (0, crypto_util_1.decrypt)(p.nombre),
            edad: p.edad,
            padecimientos: (0, crypto_util_1.decrypt)(p.padecimientos),
            tipo_sangre: (0, crypto_util_1.decrypt)(p.tipo_sangre),
            discapacidades: (0, crypto_util_1.decrypt)(p.discapacidades),
            diagnostico: (0, crypto_util_1.decrypt)(p.diagnostico)
        }));
        res.status(200).json(pacientes);
    }
    catch (error) {
        console.error("❌ Error al obtener pacientes:", error);
        res.status(500).json({ message: "Error interno al obtener pacientes." });
    }
});
exports.getPacientes = getPacientes;
// 🔹 Obtener paciente por ID (desencriptado)
const getPacienteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield database_1.pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Paciente no encontrado." });
            return;
        }
        const p = result.rows[0];
        const paciente = {
            id: p.id,
            nombre: (0, crypto_util_1.decrypt)(p.nombre),
            edad: p.edad,
            padecimientos: (0, crypto_util_1.decrypt)(p.padecimientos),
            tipo_sangre: (0, crypto_util_1.decrypt)(p.tipo_sangre),
            discapacidades: (0, crypto_util_1.decrypt)(p.discapacidades),
            diagnostico: (0, crypto_util_1.decrypt)(p.diagnostico)
        };
        res.status(200).json(paciente);
    }
    catch (error) {
        console.error("❌ Error al obtener paciente por ID:", error);
        res.status(500).json({ message: "Error interno al obtener paciente." });
    }
});
exports.getPacienteById = getPacienteById;
// 🔹 Actualizar paciente
const updatePaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = req.body;
        const check = yield database_1.pool.query("SELECT id FROM pacientes WHERE id = $1", [id]);
        if (check.rows.length === 0) {
            res.status(404).json({ message: "Paciente no encontrado." });
            return;
        }
        yield database_1.pool.query(`UPDATE pacientes SET 
        nombre = $1, edad = $2, padecimientos = $3, 
        tipo_sangre = $4, discapacidades = $5, diagnostico = $6 
        WHERE id = $7`, [
            (0, crypto_util_1.encrypt)(nombre),
            edad,
            (0, crypto_util_1.encrypt)(padecimientos),
            (0, crypto_util_1.encrypt)(tipo_sangre),
            (0, crypto_util_1.encrypt)(discapacidades),
            (0, crypto_util_1.encrypt)(diagnostico),
            id
        ]);
        res.status(200).json({ message: "Paciente actualizado correctamente." });
    }
    catch (error) {
        console.error("❌ Error al actualizar paciente:", error);
        res.status(500).json({ message: "Error interno al actualizar paciente." });
    }
});
exports.updatePaciente = updatePaciente;
// 🔹 Eliminar paciente
const deletePaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const check = yield database_1.pool.query("SELECT id FROM pacientes WHERE id = $1", [id]);
        if (check.rows.length === 0) {
            res.status(404).json({ message: "Paciente no encontrado." });
            return;
        }
        yield database_1.pool.query("DELETE FROM pacientes WHERE id = $1", [id]);
        res.status(200).json({ message: `Paciente con ID ${id} eliminado correctamente.` });
    }
    catch (error) {
        console.error("❌ Error al eliminar paciente:", error);
        res.status(500).json({ message: "Error interno al eliminar paciente." });
    }
});
exports.deletePaciente = deletePaciente;
// 🔹 Obtener lista encriptada (solo para pruebas)
const listarPacientes = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.pool.query("SELECT * FROM pacientes");
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error al listar pacientes:", error);
        res.status(500).json({ message: "Error al listar pacientes." });
    }
});
exports.listarPacientes = listarPacientes;
// 🔹 Definir rutas
router.get("/", exports.getPacientes);
router.get("/raw", exports.listarPacientes); // Solo para debug
router.get("/:id", exports.getPacienteById);
router.post("/agregar", exports.registerPaciente);
router.put("/actualizar/:id", exports.updatePaciente);
router.delete("/eliminar/:id", exports.deletePaciente);
exports.default = router;
