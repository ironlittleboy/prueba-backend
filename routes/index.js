const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// const { ErrorMiddleware } = require("../middleware");

module.exports = function ({
  UserRoutes,
  ReservationRoutes,
  PropertyRoutes,
  LocationRoutes
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  // Configuración de CORS
  apiRouter.use(
    cors({
      origin: "http://localhost:5173", // Dirección del frontend
      methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
      allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
    })
  );

  // Middlewares generales
  apiRouter
    .use(express.json()) // Manejo de JSON
    .use(morgan("dev")) // Logger HTTP
    .use(express.urlencoded({ extended: true })); // Manejo de URL codificada

  // Rutas de la API
  apiRouter.use("/user", UserRoutes);
  apiRouter.use("/reservation", ReservationRoutes);
  apiRouter.use("/property", PropertyRoutes);
  apiRouter.use("/location", LocationRoutes);

  // Montaje del router API en la ruta base
  router.use("/v1/api", apiRouter);

  // Ruta base para verificar que el servidor está funcionando
  router.use("/", (req, res) => {
    res.send("v.0.1.0.3");
  });

  // Middleware de manejo de errores
  // router.use(ErrorMiddleware);

  return router;
};
