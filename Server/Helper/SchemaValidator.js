const yup = require("yup");
const createError = require("http-errors");

//here i am using yup package for schema validation because it is much lighter(size) than joi

const registrationSchema = yup.object({
  body: yup.object({
    //name,address,photo,mobile-number,emailid
    name: yup.string().min(3).max(30).required(),
    address: yup.string().min(2).max(50).required(),
    mobile: yup.string().min(10).max(10).required(),
    email: yup.string().email().required(),
  }),
});

const validator = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });
    return next();
  } catch (err) {
    let message = err?.message.replace("body.", "");
    const error = createError(400, message);
    next(error);
  }
};

module.exports = { registrationSchema, validator };
