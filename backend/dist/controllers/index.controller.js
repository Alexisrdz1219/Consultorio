"use strict";
// import { Request, Response } from "express";
// import { pool } from "../database";
// import { QueryResult } from "pg";
// import bcrypt from "bcryptjs";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTareas = exports.updateTareas = exports.createTareas = exports.getTareasById = exports.getTareas = exports.deletePacientes = exports.updatePacientes = exports.createPacientes = exports.getPacientesById = exports.getPacientes = exports.deleteDoctores = exports.updateDoctores = exports.createDoctores = exports.getDoctoresById = exports.getDoctores = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// 🔹 USUARIOS
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.pool.query("SELECT id, nombre, usuario, rol FROM users ORDER BY id ASC");
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield database_1.pool.query("SELECT id, nombre, usuario, rol FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, usuario, contrasena, rol } = req.body;
        if (!nombre || !usuario || !contrasena || !rol) {
            res.status(400).json({ message: "Todos los campos son obligatorios." });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(contrasena, 10);
        const result = yield database_1.pool.query("INSERT INTO users (nombre, usuario, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, usuario, rol", [nombre, usuario, hashedPassword, rol]);
        res.status(201).json({ message: "Usuario agregado exitosamente", user: result.rows[0] });
    }
    catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombre, usuario, contrasena, rol } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(contrasena, 10);
        const result = yield database_1.pool.query("UPDATE users SET nombre = $1, usuario = $2, contrasena = $3, rol = $4 WHERE id = $5 RETURNING id, nombre, usuario, rol", [nombre, usuario, hashedPassword, rol, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.json({ message: "Usuario actualizado correctamente", user: result.rows[0] });
    }
    catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield database_1.pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.json({ message: `Usuario ${id} eliminado exitosamente` });
    }
    catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.deleteUser = deleteUser;
// 🔹 DOCTORES
const getDoctores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.pool.query("SELECT * FROM doctores ORDER BY id ASC");
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error al obtener doctores:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getDoctores = getDoctores;
const getDoctoresById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield database_1.pool.query("SELECT * FROM doctores WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Doctor no encontrado" });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Error al obtener doctor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getDoctoresById = getDoctoresById;
const createDoctores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, cedula, especializacion, area, telefono } = req.body;
        yield database_1.pool.query("INSERT INTO doctores (nombre, cedula, especializacion, area, telefono) VALUES ($1, $2, $3, $4, $5)", [nombre, cedula, especializacion, area, telefono]);
        res.status(201).json({ message: "Doctor agregado correctamente" });
    }
    catch (error) {
        console.error("Error al crear doctor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.createDoctores = createDoctores;
const updateDoctores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombre, cedula, especializacion, area, telefono } = req.body;
        const result = yield database_1.pool.query("UPDATE doctores SET nombre = $1, cedula = $2, especializacion = $3, area = $4, telefono = $5 WHERE id = $6 RETURNING *", [nombre, cedula, especializacion, area, telefono, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Doctor no encontrado" });
            return;
        }
        res.json({ message: "Doctor actualizado correctamente", doctor: result.rows[0] });
    }
    catch (error) {
        console.error("Error al actualizar doctor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.updateDoctores = updateDoctores;
const deleteDoctores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield database_1.pool.query("DELETE FROM doctores WHERE id = $1 RETURNING id", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Doctor no encontrado" });
            return;
        }
        res.json({ message: `Doctor ${id} eliminado correctamente` });
    }
    catch (error) {
        console.error("Error al eliminar doctor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.deleteDoctores = deleteDoctores;
// 🔹 PACIENTES
const getPacientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.pool.query("SELECT * FROM pacientes ORDER BY id ASC");
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error al obtener pacientes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getPacientes = getPacientes;
const getPacientesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield database_1.pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Paciente no encontrado" });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Error al obtener paciente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getPacientesById = getPacientesById;
const createPacientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = req.body;
        yield database_1.pool.query("INSERT INTO pacientes (nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico) VALUES ($1, $2, $3, $4, $5, $6)", [nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico]);
        res.status(201).json({ message: "Paciente agregado correctamente" });
    }
    catch (error) {
        console.error("Error al agregar paciente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.createPacientes = createPacientes;
const updatePacientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombre, edad, padecimientos, tipo_sangre, discapacidades } = req.body;
        const result = yield database_1.pool.query("UPDATE pacientes SET nombre = $1, edad = $2, padecimientos = $3, tipo_sangre = $4, discapacidades = $5 WHERE id = $6 RETURNING *", [nombre, edad, padecimientos, tipo_sangre, discapacidades, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Paciente no encontrado" });
            return;
        }
        res.json({ message: "Paciente actualizado correctamente", paciente: result.rows[0] });
    }
    catch (error) {
        console.error("Error al actualizar paciente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.updatePacientes = updatePacientes;
const deletePacientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield database_1.pool.query("DELETE FROM pacientes WHERE id = $1 RETURNING id", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Paciente no encontrado" });
            return;
        }
        res.json({ message: `Paciente ${id} eliminado correctamente` });
    }
    catch (error) {
        console.error("Error al eliminar paciente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.deletePacientes = deletePacientes;
// 🔹 TAREAS Y PROYECTOS
const getTareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.pool.query("SELECT * FROM tareas_proyectos ORDER BY id ASC");
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getTareas = getTareas;
const getTareasById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield database_1.pool.query("SELECT * FROM tareas_proyectos WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Tarea no encontrada" });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Error al obtener tarea:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getTareasById = getTareasById;
const createTareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_tarea, fecha_inicio, fecha_limite, descripcion } = req.body;
        yield database_1.pool.query("INSERT INTO tareas_proyectos (nombre_tarea, fecha_inicio, fecha_limite, descripcion) VALUES ($1, $2, $3, $4)", [nombre_tarea, fecha_inicio, fecha_limite, descripcion]);
        res.status(201).json({ message: "Tarea agregada correctamente" });
    }
    catch (error) {
        console.error("Error al crear tarea:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.createTareas = createTareas;
const updateTareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombre_tarea, fecha_inicio, fecha_limite, descripcion } = req.body;
        const result = yield database_1.pool.query("UPDATE tareas_proyectos SET nombre_tarea = $1, fecha_inicio = $2, fecha_limite = $3, descripcion = $4 WHERE id = $5 RETURNING *", [nombre_tarea, fecha_inicio, fecha_limite, descripcion, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Tarea no encontrada" });
            return;
        }
        res.json({ message: "Tarea actualizada correctamente", tarea: result.rows[0] });
    }
    catch (error) {
        console.error("Error al actualizar tarea:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.updateTareas = updateTareas;
const deleteTareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield database_1.pool.query("DELETE FROM tareas_proyectos WHERE id = $1 RETURNING id", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Tarea no encontrada" });
            return;
        }
        res.json({ message: `Tarea ${id} eliminada correctamente` });
    }
    catch (error) {
        console.error("Error al eliminar tarea:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.deleteTareas = deleteTareas;
