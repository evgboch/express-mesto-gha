// eslint-disable-next-line no-unused-vars
function catchErrors(err, req, res, next) {
  const { statusCode = 500, message } = err;

  res.status(statusCode);
  res.send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
}

module.exports = catchErrors;
