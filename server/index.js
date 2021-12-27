const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const router = require("./routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);


app.use((res, req, next) => {
    next();
  });
  
app.listen(port, "0.0.0.0", () => {
    console.log("server on port ", port);
  });

module.exports = app;
