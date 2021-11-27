require("./Database/connection");
const express = require("express");
const cors = require("cors");
const customer = require("./Routes/customerRegistration");
const admin = require("./Routes/adminApis");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/customer", customer);
app.use("/admin", admin);

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Api running at: http://localhost:${PORT}`);
});
