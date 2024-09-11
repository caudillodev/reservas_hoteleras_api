// Cargar variables de entorno
require("dotenv").config();

// Importamos el módulo de Express
const express = require("express");

// Importar el módulo de Swagger UI Express
const swaggerUi = require("swagger-ui-express");

// Importar el módulo de Swagger Jsdoc
const swaggerJsdoc = require("swagger-jsdoc");

// Módulo para manejar rutas de archivos
const path = require("path");

// Creamos una instancia de la aplicación
const app = express();

// Definimos el hostname en que publicará el servicio
const HOSTNAME = process.env.HOSTNAME || 'localhost';
// Definimos el puerto en el que correrá el servidor
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Configuración de Swagger, para documentar la API
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Reservas",
      version: "1.0.0",
      description:
        "Documentación de la API de Reservas Hoteleras - BOOTCAMP - Rodrigo Espinoza",
    },
    servers: [
      {
        url: `http://${HOSTNAME}:${PORT}`,
      },
    ],
  },
  // Documentar automáticamente las rutas en la carpeta routes
  apis: ["./routes/*.js"],
};

// Middleware para servir la documentación de Swagger en la ruta /api-docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para parsear el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Creamos una ruta de ejemplo
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Importar las rutas de los recursos (reservas)
const reservaRoutes = require("./routes/reservaRoutes");

// Usar las rutas de los recursos (reservas)
app.use("/api/reservas", reservaRoutes);

// Iniciamos el servidor
app.listen(PORT,HOSTNAME, () => {
  console.log(`Servidor corriendo en el hostname ${HOSTNAME} y el puerto ${PORT}`);
});