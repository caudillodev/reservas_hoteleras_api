// Propósito: Manejar las rutas de la API relacionadas con las reservas
const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reservaController");

// Rutas de reservas

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtener todas las reservas o aplicar filtros
 *     description: Devuelve una lista de reservas filtradas por los parámetros proporcionados.
 *     parameters:
 *       - in: query
 *         name: nombreHotel
 *         schema:
 *           type: string
 *         description: Filtra por nombre del hotel.
 *       - in: query
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio para el filtro de rango.
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin para el filtro de rango.
 *       - in: query
 *         name: tipo_habitacion
 *         schema:
 *           type: string
 *         description: Filtra por tipo de habitación.
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Filtra por estado del pago.
 *       - in: query
 *         name: num_huespedes
 *         schema:
 *           type: integer
 *         description: Filtra por el número de huéspedes (suma de adultos y menores).
 *     responses:
 *       200:
 *         description: Lista de reservas obtenidas correctamente.
 *       404:
 *         description: No se encontraron reservas para los filtros aplicados.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/", reservaController.obtenerReservas);


/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     description: Crea una nueva reserva en el hotel y devuelve los detalles de la misma.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la reserva en formato YYYY-MM-DD.
 *                 example: "2024-09-11"
 *               nombreHuesped:
 *                 type: string
 *                 description: Nombre del huésped.
 *                 example: "Paz Espinoza"
 *               tipoHabitacion:
 *                 type: string
 *                 description: Tipo de habitación reservada (por ejemplo, "doble").
 *                 example: "doble"
 *               cantidadAdultos:
 *                 type: integer
 *                 description: Cantidad de adultos que ocuparán la habitación.
 *                 example: 2
 *               cantidadMenores:
 *                 type: integer
 *                 description: Cantidad de menores que ocuparán la habitación. Valor opcional.
 *                 example: 1
 *               estadoPago:
 *                 type: string
 *                 description: Estado del pago de la reserva. El valor por defecto es "pendiente".
 *                 example: "pagado"
 *               hotel:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del hotel.
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     description: Nombre del hotel.
 *                     example: "Hotel Paraíso"
 *             required:
 *               - fecha
 *               - nombreHuesped
 *               - tipoHabitacion
 *               - cantidadAdultos
 *               - hotel
 *               - hotel.id
 *               - hotel.nombre
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de confirmación.
 *                   example: "Reserva creada exitosamente"
 *                 reserva:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de la reserva creada.
 *                       example: 1
 *                     fecha:
 *                       type: string
 *                       format: date
 *                       description: Fecha de la reserva.
 *                       example: "2024-09-11"
 *                     nombreHuesped:
 *                       type: string
 *                       description: Nombre del huésped.
 *                       example: "Paz Espinoza"
 *                     tipoHabitacion:
 *                       type: string
 *                       description: Tipo de habitación reservada.
 *                       example: "doble"
 *                     cantidadAdultos:
 *                       type: integer
 *                       description: Cantidad de adultos en la reserva.
 *                       example: 2
 *                     cantidadMenores:
 *                       type: integer
 *                       description: Cantidad de menores en la reserva.
 *                       example: 1
 *                     estadoPago:
 *                       type: string
 *                       description: Estado del pago de la reserva.
 *                       example: "pendiente"
 *                     hotel:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: ID del hotel.
 *                           example: 1
 *                         nombre:
 *                           type: string
 *                           description: Nombre del hotel.
 *                           example: "Hotel Paraíso"
 *       400:
 *         description: Error de validación. Faltan campos requeridos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: "Todos los campos son requeridos: numeroReserva, fecha, nombreHuesped, tipoHabitacion, cantidadAdultos, hotel (id y nombre)"
 */
router.post("/",reservaController.crearReserva);


/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     description: Devuelve los detalles de una reserva específica basada en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva a obtener.
 *         example: 1
 *     responses:
 *       200:
 *         description: Reserva obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje con la información de la reserva.
 *                   example: "Información de la reserva con ID: 1"
 *                 reserva:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de la reserva.
 *                       example: 1
 *                     fecha:
 *                       type: string
 *                       format: date
 *                       description: Fecha de la reserva.
 *                       example: "2024-09-11"
 *                     nombreHuesped:
 *                       type: string
 *                       description: Nombre del huésped.
 *                       example: "Paz Espinoza"
 *                     tipoHabitacion:
 *                       type: string
 *                       description: Tipo de habitación reservada.
 *                       example: "doble"
 *                     cantidadAdultos:
 *                       type: integer
 *                       description: Número de adultos en la reserva.
 *                       example: 2
 *                     cantidadMenores:
 *                       type: integer
 *                       description: Número de menores en la reserva.
 *                       example: 1
 *                     estadoPago:
 *                       type: string
 *                       description: Estado del pago de la reserva.
 *                       example: "pendiente"
 *                     hotel:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: ID del hotel.
 *                           example: 1
 *                         nombre:
 *                           type: string
 *                           description: Nombre del hotel.
 *                           example: "Hotel Paraíso"
 *       404:
 *         description: Reserva no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: "Reserva no encontrada"
 *       500:
 *         description: Error en el servidor.
 */
router.get("/:id", reservaController.obtenerReservaPorId);

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva existente
 *     description: Actualiza los detalles de una reserva específica basada en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva a actualizar.
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha de la reserva.
 *                 example: "2024-09-15"
 *               nombreHuesped:
 *                 type: string
 *                 description: Nuevo nombre del huésped.
 *                 example: "Paz Espinoza"
 *               tipoHabitacion:
 *                 type: string
 *                 description: Nuevo tipo de habitación.
 *                 example: "suite"
 *               cantidadAdultos:
 *                 type: integer
 *                 description: Nueva cantidad de adultos en la reserva.
 *                 example: 2
 *               cantidadMenores:
 *                 type: integer
 *                 description: Nueva cantidad de menores en la reserva.
 *                 example: 1
 *               estadoPago:
 *                 type: string
 *                 description: Nuevo estado del pago de la reserva.
 *                 example: "pagado"
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: "Reserva con ID: 1 actualizada exitosamente"
 *                 reserva:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de la reserva.
 *                       example: 1
 *                     fecha:
 *                       type: string
 *                       format: date
 *                       description: Fecha de la reserva.
 *                       example: "2024-09-15"
 *                     nombreHuesped:
 *                       type: string
 *                       description: Nombre del huésped.
 *                       example: "Paz Espinoza"
 *                     tipoHabitacion:
 *                       type: string
 *                       description: Tipo de habitación reservada.
 *                       example: "suite"
 *                     cantidadAdultos:
 *                       type: integer
 *                       description: Número de adultos en la reserva.
 *                       example: 2
 *                     cantidadMenores:
 *                       type: integer
 *                       description: Número de menores en la reserva.
 *                       example: 1
 *                     estadoPago:
 *                       type: string
 *                       description: Estado del pago de la reserva.
 *                       example: "pagado"
 *       404:
 *         description: Reserva no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: "Reserva no encontrada"
 *       500:
 *         description: Error en el servidor.
 */
router.put("/:id", reservaController.actualizarReserva);

/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva
 *     description: Elimina una reserva específica basada en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva a eliminar.
 *         example: 1
 *     responses:
 *       200:
 *         description: Reserva eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: "Reserva con ID: 1 eliminada exitosamente"
 *       404:
 *         description: Reserva no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error si la reserva no es encontrada.
 *                   example: "Reserva no encontrada"
 *       500:
 *         description: Error en el servidor.
 */
router.delete("/:id", reservaController.eliminarReserva);

// Exporta el router para ser utilizado en la aplicación principal
module.exports = router;