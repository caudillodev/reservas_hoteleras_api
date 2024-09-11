// Simulamos una base de datos con listas de reservas
const reservas = [
    {
        "id":0,
        "fecha": "2024-09-11",
        "nombreHuesped": "Rodrigo Espinoza",
        "tipoHabitacion": "suite",
        "cantidadAdultos": 2,
        "cantidadMenores": 2,
        "estadoPago": "pagado",
            "hotel": {
                "id": 1,
                "nombre": "Hotel Paraíso"
            }
    },
    {
        "id":1,
        "fecha": "2024-09-11",
        "nombreHuesped": "Paz Espinoza",
        "tipoHabitacion": "doble",
        "cantidadAdultos": 1,
        "cantidadMenores": 0,
        "estadoPago": "pendiente",
            "hotel": {
                "id": 1,
                "nombre": "Hotel Paraíso"
            }
    }
  ];
  
  module.exports = reservas;