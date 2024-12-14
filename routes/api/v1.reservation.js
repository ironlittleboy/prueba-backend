const { Router } = require("express");

module.exports = function ({ ReservationController }) {
  const router = Router();

 /*  router.get("/getByUserId/:id", ReservationController.getReservationsByUser); */
  router.get("/getAll", ReservationController.getAll);
  router.get("/getById/:id", ReservationController.getOne);
  router.post("/create", ReservationController.createReservation);
  router.patch("/update/:id", ReservationController.update);
  router.delete("/delete/:id", ReservationController.delete);

  return router;
}