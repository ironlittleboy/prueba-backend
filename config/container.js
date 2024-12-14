//Configurar nuestro contenedor de injección de depencia
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require(".");

//Routes
const Routes = require("../routes");

//Services
const {
    LocationService,
    PropertyService,
    ReservationService,
    UserService

} = require("../services");

//Controllers
const {
    LocationController,
    PropertyController,
    ReservationController,
    UserController

} = require("../controllers");

//Startup
const { Database, Server } = require("../startup");

//Routes

const {
    LocationRoutes,
    PropertyRoutes,
    ReservationRoutes,
    UserRoutes

} = require("../routes/api/index");

//Models
const {
    Location,
    Property,
    Reservation,
    User
} = require("../models");

const { protect } = require("../middleware/authMiddleware");
const AuthUtils = require("../utils/auth");
const container = createContainer();
container
    .register({
        //Configuración principal
        router: asFunction(Routes).singleton(),
        config: asValue(config),
        AuthUtils: asClass(AuthUtils).singleton(),
        Database: asClass(Database).singleton(),
        Server: asClass(Server).singleton(),
    })
    .register({
        //Configuración de los servicios
        LocationService: asClass(LocationService).singleton(),
        UserService: asClass(UserService).singleton(),
        PropertyService: asClass(PropertyService).singleton(),
        ReservationService: asClass(ReservationService).singleton(),
    })
    .register({
        //Configuración de los controladores
        UserController: asClass(UserController).singleton(),
        LocationController: asClass(LocationController).singleton(),
        PropertyController: asClass(PropertyController).singleton(),
        ReservationController: asClass(ReservationController).singleton(),
    })
    .register({
        //Configuración de rutas
        UserRoutes: asFunction(UserRoutes).singleton(),
        LocationRoutes: asFunction(LocationRoutes).singleton(),
        PropertyRoutes: asFunction(PropertyRoutes).singleton(),
        ReservationRoutes: asFunction(ReservationRoutes).singleton(),
        
    })
    .register({
        //Configuración de modelos
        User: asValue(User),
        Location: asValue(Location),
        Property: asValue(Property),
        Reservation: asValue(Reservation),

    })
    .register({
        //middlewares
        AuthMiddleware: asFunction(protect).singleton(),
    });

module.exports = container;
