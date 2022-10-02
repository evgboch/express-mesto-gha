const { errorStatusList } = require('./constants');

function handleBadRequestError(res) {
  res.status(errorStatusList.badRequest);
  res.send({
    message: 'Ошибка: запрошены некорректные данные.',
  });
}

function handleDefaultError(res) {
  res.status(errorStatusList.internalServerError);
  res.send({
    message: 'На сервере произошла ошибка.',
  });
}

function handleNotFoundError(res) {
  res.status(errorStatusList.notFound);
  res.send({
    message: 'Ошибка: данные с запрошенным идентификатором не найдены.',
  });
}

module.exports = {
  handleBadRequestError,
  handleDefaultError,
  handleNotFoundError,
};
