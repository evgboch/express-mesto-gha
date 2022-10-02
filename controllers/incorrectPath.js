const { errorStatusList } = require('../utils/constants');

function handleIncorrectPath(req, res) {
  res.status(errorStatusList.notFound);
  res.send({
    message: 'Ошибка: указанный путь не существует',
  });
}

module.exports = { handleIncorrectPath };
