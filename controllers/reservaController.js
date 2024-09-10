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
    const { fecha, nombreHuesped, tipoHabitacion, cantidadAdultos, cantidadMenores, estadoPago, hotel } = req.body;
  
    // Validar que los campos requeridos estén presentes
    if (!fecha || !nombreHuesped || !tipoHabitacion || !cantidadAdultos || !hotel || !hotel.id || !hotel.nombre) {
      return res.status(400).json({ error: "Todos los campos son requeridos: fecha, nombreHuesped, tipoHabitacion, cantidadAdultos, hotel (id y nombre)" });
    }
  
    // Crear la nueva reserva
    const nuevaReserva = {
      numeroReserva: reservas.length + 1, // Generar número de reserva automáticamente
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
 * Descripción: Devuelve la lista completa de reservas.
 * Respuesta: Un objeto JSON que contiene un mensaje y la lista de reservas.
 */
const obtenerReservas = (req, res) => {
  res.json({ mensaje: "Lista de reservas", reservas });
};


// Exporta los controladores para ser utilizados en las rutas
module.exports = {
    crearReserva,
    obtenerReservas,
};