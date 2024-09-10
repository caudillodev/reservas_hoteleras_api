// Simulamos una base de datos con listas de reservas
const reservas = [
    {
        "reserva": {
            "numeroReserva": "123456",
            "fecha": "2024-09-10",
            "nombreHuesped": "Rodrigo Espinoza",
            "tipoHabitacion": "doble",
            "santidadAdultos": "2",
            "cantidadMenores": "1",
            "estadoPago": "pendiente",
            "hotel": {
                "id": "1",
                "nombre": "Hotel Paraíso"
            }
        }
    },
    {
        "reserva": {
            "numeroReserva": "334243",
            "fecha": "2024-09-11",
            "nombreHuesped": "Paz Espinoza",
            "tipoHabitacion": "doble",
            "santidadAdultos": "1",
            "cantidadMenores": "0",
            "estadoPago": "pendiente",
            "hotel": {
                "id": "1",
                "nombre": "Hotel Paraíso"
            }
        }
    }
  ];
  
  module.exports = reservas;