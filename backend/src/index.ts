import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import indexRoutes from "./routes/index";
import doctoresRoutes from "./routes/doctores.routes";
import pacientesRoutes from "./routes/pacientes.routes";
import citasRoutes from './routes/citas';

dotenv.config();

// ✅ Verificación de variables de entorno
if (!process.env.JWT_SECRET || !process.env.ENCRYPTION_SECRET) {
  console.error("❌ Error: Faltan variables de entorno requeridas.");
  process.exit(1);
}

console.log("✅ JWT_SECRET loaded:", process.env.JWT_SECRET ? "✔️ Loaded" : "❌ Not Loaded");
console.log("✅ ENCRYPTION_SECRET length:", process.env.ENCRYPTION_SECRET?.length || "❌ Not Loaded");

const PORT = process.env.PORT || 3000;
const app = express();

// 🔒 Configuración de seguridad con Helmet
app.use(helmet());

// 🔒 Configuración de rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por IP
  message: "🚫 Demasiadas solicitudes desde esta IP. Intenta de nuevo más tarde.",
});
app.use(limiter);

// 🛡️ Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Actualiza esto según el frontend en producción
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// 🚀 Habilitar el parsing de JSON
app.use(express.json());

// 📌 Definición de rutas
app.use("/auth", authRoutes);
app.use("/doctores", doctoresRoutes);
app.use("/pacientes", pacientesRoutes);
app.use("/", indexRoutes);
app.use('/api', citasRoutes);


const allowedOrigins = [
  "https://consultorio6-9bn5-5dqiwlto9-kato-citys-projects.vercel.app", // URL de Vercel
  "http://localhost:5173", // Para desarrollo local
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// 🛑 Middleware global para manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Error detectado:", err.message);
  res.status(500).json({ message: "Error interno del servidor" });
});

// 🔥 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Error al iniciar el servidor:", err);
  process.exit(1);
});

app.use(cors(corsOptions));