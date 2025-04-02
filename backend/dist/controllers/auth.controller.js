"use strict";
// import { Request, Response } from "express";
// import { pool } from "../database";
// import jwt, { Secret, SignOptions } from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import * as dotenv from "dotenv";
// import * as crypto from "crypto"; // ✅ Corrección para crypto en TypeScript
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loginUser = void 0;
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv = __importStar(require("dotenv"));
const crypto = __importStar(require("crypto"));
dotenv.config();
const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_SECRET;
if (!secretKey || secretKey.length !== 32) {
    throw new Error("ENCRYPTION_SECRET debe tener exactamente 32 caracteres.");
}
// 🔐 Función para encriptar
const encrypt = (text) => {
    const iv = crypto.randomBytes(16); // ✅ Ahora es dinámico
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, "utf-8"), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
};
// 🔓 Función para desencriptar
const decrypt = (text) => {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts[0], "hex");
    const encryptedText = Buffer.from(textParts[1], "hex");
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, "utf-8"), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
// 🔐 Login y generación de JWT
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, contrasena, rol } = req.body;
        // Validación básica
        if (!usuario || !contrasena || !rol) {
            res.status(400).json({ message: "Todos los campos son obligatorios" });
            return;
        }
        const result = yield database_1.pool.query("SELECT * FROM users WHERE usuario = $1 AND rol = $2", [usuario, rol]);
        if (result.rows.length === 0) {
            res.status(401).json({ message: "Usuario o contraseña incorrecta" });
            return;
        }
        const user = result.rows[0];
        const validPassword = yield bcryptjs_1.default.compare(contrasena, user.contrasena);
        if (!validPassword) {
            res.status(401).json({ message: "Usuario o contraseña incorrecta" });
            return;
        }
        const decryptedEmail = decrypt(user.email); // Por si lo necesitas internamente
        const jwtSecret = process.env.JWT_SECRET;
        const options = { expiresIn: "1h" };
        const token = jsonwebtoken_1.default.sign({ id: user.id, usuario: user.usuario, rol: user.rol }, jwtSecret, options);
        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token,
            user: {
                id: user.id,
                usuario: user.usuario,
                rol: user.rol,
                // email: decryptedEmail // Si realmente necesitas devolverlo (aunque no se recomienda)
            }
        });
    }
    catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.loginUser = loginUser;
