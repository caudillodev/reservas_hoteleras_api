// Importa el módulo de modelo de reservas desde el archivo reservaModel en el directorio 'models'
const reservas = require("../models/reservaModels");


/**
 * Ruta: POST /reservas
 * Descripción: Crea una nueva reserva con los datos proporcionados.
 * Cuerpo de la solicitud:
 *  - numero de reserva
 * Respuesta: Un objeto JSON que contiene un mensaje y los detalles de la reserva recién creada.
 */
const crearReserva = (req, res) => {
    const {fecha, nombreHuesped, tipoHabitacion, cantidadAdultos, cantidadMenores, estadoPago, hotel } = req.body;
  
    // Validar que los campos requeridos estén presentes
    if (!fecha || !nombreHuesped || !tipoHabitacion || !cantidadAdultos || !hotel || !hotel.id || !hotel.nombre) {
      return res.status(400).json({ error: "Todos los campos son requeridos: numeroReserva, fecha, nombreHuesped, tipoHabitacion, cantidadAdultos, hotel (id y nombre)" });
    }
  
    // Crear la nueva reserva
    const nuevaReserva = {
      id: reservas.length + 1, // Generar número de reserva automáticamente
      fecha,
      nombreHuesped,
      tipoHabitacion,
      cantidadAdultos,
      cantidadMenores: cantidadMenores || 0, // Por defecto 0 si no se provee
      estadoPago: estadoPago || 'pendiente', // Estado de pago por defecto "pendiente"
      hotel: {
        id: hotel.id,
        nombre: hotel.nombre
      }
    };
  
    // Guardar la nueva reserva
    reservas.push(nuevaReserva);
  
    // Responder con la nueva reserva
    res.status(201).json({ mensaje: "Reserva creada exitosamente", reserva: nuevaReserva });
  };

/**
 * Ruta: GET /api/reservas
 * Descripción: Devuelve la lista de reservas en su totalidad o por filtros:
 *  - nombreHotel : Nombre del Hotel en el cual está hecha la reserva.
 *  - fecha_inicio, fecha_fin: Por rango de fechas.
 *  - tipo_habitacion: Por tipo de habitación.
 *  - estado: Por estado del pago de la reserva.
 *  - num_huespedes: Por la cantidad de huéspedes (considerado adultos y menores)
 * Respuesta: Un objeto JSON que contiene un mensaje y la lista de reservas.
 */
const obtenerReservas = (req, res) => {
  const { nombreHotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;  // Obtenemos los query params

  let reservasFiltradas = reservas;

  // Filtrar por nombre del hotel si se proporciona
  if (nombreHotel) {
    reservasFiltradas = reservasFiltradas.filter((reserva) =>
      reserva.hotel.nombre.toLowerCase() === nombreHotel.toLowerCase()
    );

    if (reservasFiltradas.length === 0) {
      return res.status(404).json({ mensaje: `No se encontraron reservas para el hotel ${nombreHotel}.` });
    }
  }

  // Filtrar por rango de fechas si se proporciona
  if (fecha_inicio && fecha_fin) {
    const fechaInicio = new Date(fecha_inicio);
    const fechaFin = new Date(fecha_fin);

    reservasFiltradas = reservasFiltradas.filter((reserva) => {
      const fechaReserva = new Date(reserva.fecha);
      return fechaReserva >= fechaInicio && fechaReserva <= fechaFin;
    });

    if (reservasFiltradas.length === 0) {
      return res.status(404).json({ mensaje: `No se encontraron reservas en el rango de fechas proporcionado.` });
    }
  }

  // Filtrar por tipo de habitación si se proporciona
  if (tipo_habitacion) {
    reservasFiltradas = reservasFiltradas.filter((reserva) =>
      reserva.tipoHabitacion.toLowerCase() === tipo_habitacion.toLowerCase()
    );

    if (reservasFiltradas.length === 0) {
      return res.status(404).json({ mensaje: `No se encontraron reservas con tipo de habitación ${tipo_habitacion}.` });
    }
  }

  // Filtrar por estado de pago si se proporciona
  if (estado) {
    reservasFiltradas = reservasFiltradas.filter((reserva) =>
      reserva.estadoPago.toLowerCase() === estado.toLowerCase()
    );

    if (reservasFiltradas.length === 0) {
      return res.status(404).json({ mensaje: `No se encontraron reservas con estado de pago ${estado}.` });
    }
  }

  // Filtrar por número de huéspedes (suma de adultos y menores)
  if (num_huespedes) {
    reservasFiltradas = reservasFiltradas.filter((reserva) => {
      const totalHuespedes = reserva.cantidadAdultos + reserva.cantidadMenores;
      return totalHuespedes === parseInt(num_huespedes);
    });

    if (reservasFiltradas.length === 0) {
      return res.status(404).json({ mensaje: `No se encontraron reservas con ${num_huespedes} huéspedes.` });
    }
  }

  // Retornar las reservas filtradas o todas si no hay filtros aplicados
  res.json({
    mensaje: reservasFiltradas.length ? "Reservas encontradas:" : "No se encontraron reservas.",
    reservas: reservasFiltradas
  });
};

/**
 * Ruta: GET /api/reservas/:id
 * Descripción: Devuelve la información de una reserva según su ID.
 * Parámetros:
 *  - id (requerido): El ID de la reserva que se desea obtener.
 * Respuesta:
 *  - Si la reserva es encontrada: Un objeto JSON con un mensaje y la información de la reserva.
 *  - Si no se encuentra la reserva: Un mensaje de error con el código 404.
 */
const obtenerReservaPorId = (req, res) => {
  const idReserva = parseInt(req.params.id)
  const reserva = reservas.find((c) => c.id === idReserva);

  if (!reserva) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }

  res.json({ mensaje: `Información de la reserva con ID: ${idReserva}`, reserva });
};

/**
 * Ruta: PUT /api/reservas/:id
 * Descripción: Actualiza los datos de una reserva
 * Parámetros:
 *  - id (requerido): El ID de la reserva que se desea actualizar.
 * Cuerpo de la solicitud:
 *  - fecha: Fecha de la reserva.
 *  - nombreHuesped: Nombre de quien hizo la reserva.
 *  - tipoHabitacion: Indica el tipo de habitación reservada (habitación doble, suite familiar)
 *  - cantidadAdultos: Cantidad de adultos que ocuparán la habitación.
 *  - cantidadMenores: Cantidad de menores de edad que ocuparán la habitación.
 *  - estadoPago: Estado de pago de la reserva.
 * Respuesta:
 *  - Si la reserva es encontrada y actualizado: Un objeto JSON con el mensaje y los datos actualizados.
 *  - Si no se encuentra la reserva: Un mensaje de error con el código 404.
 */
const actualizarReserva = (req, res) => {
  const { id } = req.params;
  const { fecha, nombreHuesped,tipoHabitacion,cantidadAdultos,cantidadMenores,estadoPago  } = req.body;

  const reserva = reservas.find((c) => c.id === parseInt(id));

  if (!reserva) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }

  reserva.fecha = fecha || reserva.fecha;
  reserva.nombreHuesped = nombreHuesped || reserva.nombreHuesped;
  reserva.tipoHabitacion = tipoHabitacion || reserva.tipoHabitacion;
  reserva.cantidadAdultos = cantidadAdultos || reserva.cantidadAdultos;
  reserva.cantidadMenores = cantidadMenores || reserva.cantidadMenores;
  reserva.estadoPago = estadoPago || reserva.estadoPago;

  res.json({ mensaje: `Reserva con ID: ${id} actualizada exitosamente`, reserva });
};

/**
 * Ruta: DELETE /api/reversa/:id
 * Descripción: Elimina una reserva de la lista según su ID.
 * Parámetros:
 *  - id (requerido): El ID de la reserva que se desea eliminar.
 * Respuesta:
 *  - Si la reserva es encontrada y eliminada: Un objeto JSON con el mensaje de éxito.
 *  - Si no se encuentra la reserva: Un mensaje de error con el código 404.
 */
const eliminarReserva = (req, res) => {
  const { id } = req.params;
  const indice = reservas.findIndex((c) => c.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }

  reservas.splice(indice, 1);

  res.json({ mensaje: `Reserva con ID: ${id} eliminada exitosamente` });
};

// Exporta los controladores para ser utilizados en las rutas
module.exports = {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId,
    actualizarReserva,
    eliminarReserva,
};