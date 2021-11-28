const express = require("express");
const Customer = require("../Database/customerRegistrationSchema");
const createError = require("http-errors");
const moment = require("moment");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome To the Admin Section" });
});

router.get("/getCustomerList", async (req, res, next) => {
  try {
    const resp = await Customer.find({}).sort({ _id: -1 }).lean();
    return res.json({ resp });
  } catch (error) {
    next(error);
  }
});

router.get("/getCustomerByUid/:uid", async (req, res, next) => {
  try {
    const resp = await Customer.findOne({ uid: req.params.uid }).lean();

    if (!resp) {
      throw createError.NotFound("No record Found");
    }

    return res.json({ resp });
  } catch (error) {
    next(error);
  }
});

//try with this format to search YYYY-MM-DD
router.get(
  "/getCustomerRegistrationsByDate/:createdAt",
  async (req, res, next) => {
    try {
      const registrationDate = req.params.createdAt;

      if (moment().valueOf() < new Date(registrationDate).getTime()) {
        throw createError(403, "Future Dates are not allowed");
      }

      const resp = await Customer.find({ createdAt: registrationDate }).lean();

      if (!resp) {
        throw createError.NotFound("No record Found");
      }

      return res.json({ resp });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
