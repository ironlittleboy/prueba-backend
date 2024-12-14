const { Router } = require("express");

module.exports = function ({ UserController }) {
  const router = Router();

  router.get("/getWithReservations/:id", UserController.getWithReservations);
  router.post("/login", UserController.loginUser);
  router.get("/getAll", UserController.getAllUsers);
  router.get("/getById/:id", UserController.getUserById);
  router.post("/create", UserController.createUser);
  router.patch("/update/:id", UserController.updateUser);
  router.delete("/delete/:id", UserController.deleteUser);

  return router;
};
