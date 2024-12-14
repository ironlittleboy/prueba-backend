const { Router } = require('express');

module.exports = function({ PropertyController }) {
  const router = Router();

  router.get("/getWithLocation", PropertyController.getWithLocation);
  router.get("/getAll", PropertyController.getAll);
  router.get("/getById/:id", PropertyController.getOne);
  router.post("/create", PropertyController.create);
  router.patch("/update/:id", PropertyController.update);
  router.delete("/delete/:id", PropertyController.delete);

  return router;
}