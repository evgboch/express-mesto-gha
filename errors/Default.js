const { errorStatusList } = require('../utils/constants');

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorStatusList.default;
  }
}

module.exports = DefaultError;
