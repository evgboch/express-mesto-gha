// const { errorStatusList } = require('../utils/constants');
const NotFoundError = require('../errors/NotFound');

function handleIncorrectPath(req, res, next) {
  // res.status(errorStatusList.notFound);
  // res.send({
  //   message: 'Ошибка: указанный путь не существует',
  // });

  next(new NotFoundError('Указанный путь не существует'));
}

module.exports = { handleIncorrectPath };
