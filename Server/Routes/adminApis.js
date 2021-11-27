const express = require("express");
const Customer = require("../Database/customerRegistrationSchema");
const createError = require("http-errors");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome To the Admin Section" });
});

router.get("/getCustomerList", async (req, res, next) => {
  try {
    const resp = await Customer.find({}).sort({ createdAt: -1 }).lean();
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

module.exports = router;
