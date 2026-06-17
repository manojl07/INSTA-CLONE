const ApiError = require('../utils/ApiError');

const validate = (schema) => {
  return (req, res, next) => {

  

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        body: req.body,
        issues: result.error.issues
      });
    }

    req.body = result.data;
    next();
  };
};

module.exports = validate;