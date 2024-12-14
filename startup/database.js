const mongoose = require("mongoose");
let _server = null;
let _mongoURI = null;

module.exports = class Database {
  constructor({ Server, config }) {
    _server = Server;
    _mongoURI = config.DB_URL;
  }

  connect() {
    mongoose
      .connect(_mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        readPreference: "secondaryPreferred",
      })
      .then(() => {
        return _server.start();
      })
      .catch((error) => {
        process.exit(1);
      });
  }
};
