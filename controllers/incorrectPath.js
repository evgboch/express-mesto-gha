function handleIncorrectPath(req, res) {
  res.send({
    message: 'Ошибка: указанный путь не существует',
  });
}

module.exports = { handleIncorrectPath };
