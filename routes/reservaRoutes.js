// Propósito: Manejar las rutas de la API relacionadas con las reservas
const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reservaController");

// Rutas de reservas
router.get("/", reservaController.obtenerReservas);
router.post("/",reservaController.crearReserva);
router.get("/:id", reservaController.obtenerReservaPorId);
router.put("/:id", reservaController.actualizarReserva);

// Exporta el router para ser utilizado en la aplicación principal
module.exports = router;