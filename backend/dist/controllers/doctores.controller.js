"use strict";
// import { Request, Response } from "express";
// import { pool } from "../database";
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
exports.registerDoctor = void 0;
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// 🧑‍⚕️ Registrar un nuevo doctor
const registerDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, usuario, contrasena } = req.body;
        // Validación básica
        if (!nombre || !usuario || !contrasena) {
            res.status(400).json({ message: "Todos los campos son obligatorios." });
            return;
        }
        // Verificar si el usuario ya existe (caso-insensitive)
        const existingDoctor = yield database_1.pool.query("SELECT * FROM doctores WHERE LOWER(usuario) = LOWER($1)", [usuario]);
        if (existingDoctor.rows.length > 0) {
            res.status(409).json({ message: "El usuario ya existe." });
            return;
        }
        // Encriptar la contraseña
        const hashedPassword = yield bcryptjs_1.default.hash(contrasena, 10);
        // Insertar en la base de datos
        const result = yield database_1.pool.query("INSERT INTO doctores (nombre, usuario, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, usuario, rol", [nombre, usuario, hashedPassword, "Doctor"]);
        res.status(201).json({
            message: "Doctor registrado exitosamente.",
            doctor: result.rows[0] // Devuelve info básica para confirmar
        });
    }
    catch (error) {
        console.error("Error al registrar doctor:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});
exports.registerDoctor = registerDoctor;
