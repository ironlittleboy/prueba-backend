const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const AppError = require("../utils/app-error");
const { Property, User } = require("../models");
module.exports = class ReservationController extends BaseController {
  constructor({ ReservationService }) {
    super(ReservationService);
  }
  createReservation = catchControllerAsync(async (req, res) => {
      const { name, arrivalDate, departureDate, user, property } = req.body;
  
      // comprobar que todos los campos estén presentes
      if (!name || !arrivalDate || !departureDate || !user || !property) {
        throw new AppError("Missing fields", 400);
      }
      
      // objeto con los datos de la reserva
      const reservationData = {
        name,
        arrivalDate,
        departureDate,
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
  
      const result = await this.service.create(reservationData);
      res.status(200).send(result);
    });

   /*  getReservationsByUser = catchControllerAsync(async (req, res) => {
      const { id } = req.params;
      const result = await this.service.getReservationsByUser(id);
      res.status(200).send(result);
    }); */
}