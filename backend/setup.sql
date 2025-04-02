-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT,
    password TEXT
);

-- Insertar usuarios por defecto
INSERT INTO users (name, email, password)
VALUES 
  ('Angel', 'angel@gmail.com', '1234'),
  ('Willy', 'willy@gmail.com', '1234'),
  ('Sergio', 'sergio@gmail.com', '1234');

-- Tabla de doctores
CREATE TABLE IF NOT EXISTS doctores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cedula VARCHAR(50) UNIQUE NOT NULL,
    especializacion VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL
);

-- Tabla de usuarios doctores (login)
CREATE TABLE IF NOT EXISTS doctores_users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    contraseña TEXT NOT NULL,
    rol VARCHAR(20) DEFAULT 'Doctor'
);

-- Tabla de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    edad INT NOT NULL,
    padecimientos TEXT NOT NULL,
    tipo_sangre VARCHAR(5) NOT NULL,
    discapacidades TEXT,
    diagnostico TEXT
);

-- Tabla de tareas y proyectos
CREATE TABLE IF NOT EXISTS tareas_proyectos (
    id SERIAL PRIMARY KEY,
    nombre_tarea VARCHAR(255) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_limite DATE NOT NULL,
    descripcion TEXT
);
