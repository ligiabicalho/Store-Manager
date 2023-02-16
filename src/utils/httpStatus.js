const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT_STATUS = 204;
const SERVER_ERR = 500;

const errorMap = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
  PRODUCT_CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || SERVER_ERR;

module.exports = {
  mapError,
  OK_STATUS,
  CREATED_STATUS,
  NO_CONTENT_STATUS,
  SERVER_ERR,
};