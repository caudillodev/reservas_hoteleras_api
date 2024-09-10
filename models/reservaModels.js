// Simulamos una base de datos con listas de reservas
const reservas = [
    {
        "reserva": {
            "id":"0",
            "numeroReserva": "12345",
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
            "id":"1",
            "numeroReserva": "33424",
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