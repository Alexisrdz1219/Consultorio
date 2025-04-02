// import express, { Application, Request, Response, NextFunction } from "express";
// import * as dotenv from "dotenv";
// import cors from "cors";
// import { pool } from "./database";
// import doctoresRoutes from "./routes/doctores.routes";
// import citasRoutes from "./routes/citas";
// import pacientesRoutes from "./routes/pacientes.routes";
// import authRoutes from "./routes/auth.routes";


// // Cargar variables de entorno
// dotenv.config();

// const app: Application = express();
// const PORT = process.env.PORT || 3000;

// // ✅ Configurar CORS correctamente
// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "https://consultorio6-mega-kato-citys-projects.vercel.app",
//     "https://denuevo123.vercel.app",
//     "https://tuproducto.vercel.app", // Agrega todos los que uses
//     "https://consultorio6-mfni.vercel.app"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// app.use(cors(corsOptions));
// app.use(express.json()); // Permite recibir datos en formato JSON

// // ✅ Ruta de prueba para asegurar que el servidor funciona
// app.get("/", (req: Request, res: Response) => {
//   res.send("🚀 Servidor del sistema de consultorio funcionando correctamente.");
// });

// // ✅ Rutas de la API
// app.use("/doctores", doctoresRoutes);
// app.use("/api/citas", citasRoutes);
// app.use("/pacientes", pacientesRoutes);
// app.use("/api/auth", authRoutes);

// // ✅ Conexión a la base de datos
// pool
//   .connect()
//   .then(() => {
//     console.log("✅ Conexión exitosa a PostgreSQL");
//   })
//   .catch((err: Error) => {
//     console.error("❌ Error al conectar con PostgreSQL:", err);
//   });

// // ✅ Middleware de manejo de errores
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error("❌ Error:", err);
//   res.status(500).json({ message: "Error interno del servidor" });
// });

// // ✅ Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
// });

import express, { Application, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { pool } from "./database";

// Rutas
import doctoresRoutes from "./routes/doctores.routes";
import citasRoutes from "./routes/citas";
import pacientesRoutes from "./routes/pacientes.routes";
import authRoutes from "./routes/auth.routes";

// Cargar variables de entorno
dotenv.config();

// Verificación de variables necesarias
if (!process.env.JWT_SECRET || !process.env.ENCRYPTION_SECRET || !process.env.DATABASE_URL) {
  console.error("❌ Faltan variables de entorno necesarias.");
  process.exit(1);
}

const app: Application = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

// 🔐 Seguridad básica con Helmet
app.use(helmet());

// 🚦 Limitar tráfico abusivo
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "🚫 Demasiadas solicitudes. Intenta más tarde.",
});
app.use(limiter);

// 🌐 Configuración de CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://consultorio6-mega-kato-citys-projects.vercel.app",
  "https://denuevo123.vercel.app",
  "https://tuproducto.vercel.app",
  "https://consultorio6-mfni.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origen no permitido por CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// 🚀 Middleware para recibir JSON
app.use(express.json());

// ✅ Ruta de prueba
app.get("/", (_req: Request, res: Response) => {
  res.send("🚀 Backend del sistema de consultorio funcionando correctamente.");
});

// 📌 Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/doctores", doctoresRoutes);
app.use("/pacientes", pacientesRoutes);
app.use("/api/citas", citasRoutes);

// 🔌 Conexión a la base de datos
pool.connect()
  .then(() => {
    console.log(`✅ Conectado a PostgreSQL (${isProduction ? "Producción" : "Local"})`);
  })
  .catch((err: Error) => {
    console.error("❌ Error al conectar a PostgreSQL:", err);
  });

// 🛑 Middleware global de errores
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error("🔥 Error global:", err.message);
  res.status(500).json({ message: "Error interno del servidor" });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Error al iniciar el servidor:", err);
  process.exit(1);
});
