const express = require("express");
require("dotenv").config();
const database = require("./database");
const apiRoutes = require("./src/api");
const app = express();
const CoinModel = require("./src/coins/model");
// const Coin = new CoinModel();
var cron = require("node-cron");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger.json");
const { OAuth2Client } = require("google-auth-library");
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const googleClient = new OAuth2Client(process.env.GOOGLE_ID);
var cors = require("cors");
app.use(cors());

const port = process.env.PORT || 3000;
app.use(express.json());

database
  .connect()
  .then((client) => {
    const db = client.db("CoinCap");
    database.db(db);
    cron.schedule("*/5 * * * *", () => {
      Coin.updateDB();
    });
    app.listen(port, () => {
      console.log("app is running in port " + port);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to connect to database");
  });

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/google/:token", (req, res) => {
  const token = req.params.token;
  googleClient
    .verifyIdToken({ idToken: token })
    .then((response) => {
      const data = response.getPayload();
      console.log("Data: ", data);
      console.log("valid");
      res.send({ isvalid: true });
    })
    .catch((err) => {
      console.log("Failed to validate token");
      res.status(401).send({ isvalid: false });
    });
});

app.get("", (req, res) => {
  database
    .connect()
    .then((client) => {
      const db = client.db("CoinCap");
      database.db(db);
      console.log("si");
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed to connect to database");
    });
  console.log("aqui");
  res.send("api works!");
});

app.use("/api", apiRoutes);

module.exports = app;
