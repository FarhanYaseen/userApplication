const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;

var corsOptions = {
  origin: `http://localhost:${CLIENT_PORT}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});


const appRoute = require('./routes')

app.use('/app', appRoute)

// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`App is now running at port http://localhost:${PORT}`)
});