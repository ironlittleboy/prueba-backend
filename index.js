const container = require("./config/container");
const database = container.resolve("Database");


// Conectar a la base de datos e iniciar el servidor
database.connect();
