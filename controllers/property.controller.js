const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
module.exports = class PropertyController extends BaseController {
  constructor({ PropertyService }) {
    super(PropertyService);
  }

  getWithLocation = catchControllerAsync(async (req, res) => {
    const result = await this.service.getPropertiesWithLocation();
    res.status(200).send(result);
  });

}