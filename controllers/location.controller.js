const catchControllerAsync = require('../utils/catch-controller-async');
const BaseController = require("./base.controller");

module.exports = class LocationController extends BaseController {
  constructor({ LocationService }) {
    super(LocationService);
  }
}