import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { pool } from "./database"; // ✅ Correcto
import authRoutes from "./routes/auth.routes";
import indexRoutes from "./routes/index";
import doctoresRoutes from "./routes/doctores.routes";
import pacientesRoutes from "./routes/pacientes.routes";
import citasRoutes from "./routes/citas";

dotenv.config();

// ✅ Verificación de variables de entorno
if (!process.env.JWT_SECRET || !process.env.ENCRYPTION_SECRET || !process.env.DB_HOST) {
  console.error("❌ Error: Faltan variables de entorno requeridas.");
  process.exit(1);
}

console.log("✅ JWT_SECRET loaded:", process.env.JWT_SECRET ? "✔️ Loaded" : "❌ Not Loaded");
console.log("✅ ENCRYPTION_SECRET length:", process.env.ENCRYPTION_SECRET?.length || "❌ Not Loaded");

// 🚀 Configuración del servidor
const PORT = process.env.PORT || 3000;
const app = express();

// 🔒 Configuración de seguridad con Helmet
app.use(helmet());

// 🔒 Configuración de rate limit para evitar ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por IP
  message: "🚫 Demasiadas solicitudes desde esta IP. Intenta de nuevo más tarde.",
});
app.use(limiter);

// ✅ Configuración de CORS con múltiples orígenes permitidos
const allowedOrigins = [
  "https://consultorio6-9bn5-5dqiwlto9-kato-citys-projects.vercel.app", // URL de Vercel
  "http://localhost:5173", // Para desarrollo local
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Asegurar que CORS se aplica antes de definir rutas

// 🚀 Habilitar el parsing de JSON
app.use(express.json());

// 📌 Definición de rutas
app.use("/auth", authRoutes);
app.use("/doctores", doctoresRoutes);
app.use("/pacientes", pacientesRoutes);
app.use("/", indexRoutes);
app.use("/api", citasRoutes);

// ✅ Ruta de prueba para verificar conexión a la base de datos
app.get("/check-db", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW();"); // Prueba simple a PostgreSQL
    res.json({ message: "Conexión exitosa a la base de datos", time: result.rows[0] });
  } catch (error) {
    console.error("❌ Error en la conexión a la base de datos:", error);
    res.status(500).json({ message: "Error al conectar con la base de datos", error });
  }
});

// 🛑 Middleware global para manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Error detectado:", err.message);
  res.status(500).json({ message: "Error interno del servidor" });
});

// 🔥 Iniciar servidor
app.listen(PORT, async () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);

  // ✅ Verificar conexión con la base de datos al iniciar
  try {
    await pool.query("SELECT NOW();");
    console.log("✅ Conectado a la base de datos PostgreSQL");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }
}).on("error", (err) => {
  console.error("❌ Error al iniciar el servidor:", err);
  process.exit(1);
});
