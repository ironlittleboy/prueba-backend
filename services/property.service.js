const { get } = require("lodash");
const BaseService = require("./base.service");

module.exports = class PropertyService extends BaseService {
  constructor({ Property }) {
    super(Property);

  }
  getPropertiesWithLocation = async () => {
    return await this.model.find().populate("location");
  }
}