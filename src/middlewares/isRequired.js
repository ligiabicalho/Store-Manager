const isRequired = (fieldValue, next, value) => {
  if (fieldValue === undefined) {
    return next({
      status: 400,
      message: `"${value}" is required`,
    });
  }
};

module.exports = isRequired;