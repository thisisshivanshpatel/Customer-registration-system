const express = require("express");
const crypto = require("crypto");
const { validator, registrationSchema } = require("../Helper/SchemaValidator");
const Customer = require("../Database/customerRegistrationSchema");
const createError = require("http-errors");
const moment = require("moment");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome To the Customer Registration App" });
});

router.post(
  "/registration",
  validator(registrationSchema),
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { name, address, mobile, email } = req.body;

      const emailExist = await Customer.findOne({ email });

      if (emailExist) {
        throw createError.Conflict(`${email} is already been registered`);
      }

      //generating customers unique id from inbuilt crypto module
      //i am not using uuid package because it generates too long uuids

      const uid = crypto.randomBytes(5).toString("hex");

      //generating cuurent formaated date using moment

      const createdAt = moment(moment().valueOf()).format("YYYY-MM-DD");

      const customer = new Customer({
        name,
        email,
        mobile,
        address,
        uid,
        createdAt,
      });
      await customer.save();

      res.status(201).json({
        message: "Customer registered successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
