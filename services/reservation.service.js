const catchControllerAsync = require("../utils/catch-controller-async");
const BaseService = require("./base.service");
const User = require("../models/user.model");
const Property = require("../models/property.model");

module.exports = class ReservationService extends BaseService {
  constructor({ Reservation }) {
    super(Reservation);
  }

  createReservation = catchControllerAsync(async (req, res) => {
    const { name, arrivateDate, departureDate, guests, user, property } = req.body;

    // comprobar que todos los campos estén presentes
    if (!name || !arrivateDate || !departureDate || !guests || !user || !property) {
      throw new AppError("Missing fields", 400);
    }
    
    // objeto con los datos de la reserva
    const reservationData = {
      name,
      arrivateDate,
      departureDate,
      guests,
      user,
      property,
    }

    // validar si existe el usuario
    const userExists = await User.findById(user);
    if (!userExists) {
      throw new AppError("User not found", 404);
    }

    // validar si existe la propiedad
    const propertyExists = await Property.findById(property);
    if (!propertyExists) {
      throw new AppError("Property not found", 404);
    }

    // la fecha de llegada debe ser antes de la fecha de salida
    if (new Date(arrivalDate) >= new Date(departureDate)) {
      throw new AppError("Arrival date must be before departure date", 400);
    }

    const result = await this.model.create(reservationData);
    res.status(200).send(result);
  });
/* 
  getReservationsByUser = catchControllerAsync(async (req, res) => {
    const { id } = req.params;
    const result = await this.model.find({ user: id });
    res.status(200).send(result);
  }); */
}