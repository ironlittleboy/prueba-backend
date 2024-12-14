const { Router } = require('express'); 
module.exports = function({ LocationController }) {
  const router = Router();

  router.get("/getAll", LocationController.getAll);
  router.get("/getById/:id", LocationController.getOne);
  router.post("/create", LocationController.create);
  router.patch("/update/:id", LocationController.update);
  router.delete("/delete/:id", LocationController.delete);

  return router;
}