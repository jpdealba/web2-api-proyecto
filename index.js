const express = require("express");
const database = require("./database");
const apiRoutes = require("./src/api");
const app = express();
const CoinModel = require("./src/coins/model");
const Coin = new CoinModel();
const cron = require("node-cron");
const data = require("./src/middlewares/db.middleware");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger.json");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const path = require("path");
const socketIo = require("socket.io");

require("dotenv").config();

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const googleClient = new OAuth2Client(process.env.GOOGLE_ID);
var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var defaults = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
app.use(cors(defaults));
app.use("/public", express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 3000;
app.use(express.json());

database
  .connect()
  .then((client) => {
    const db = client.db("CoinCap");
    database.db(db);

    const server = app.listen(port, () => {
      console.log("app is running in port " + port);
    });

    const io = socketIo(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("Alguien se conecto!");

      socket.on("share", (data) => {
        console.log("Alguien compartio un meme", data);
        socket.broadcast.emit("onShared", data);
      });
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to connect to database");
  });

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
cron.schedule("*/5 * * * *", () => {
  Coin.updateDB();
});
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
      res.send("api works!");
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed to connect to database");
      res.send("Not connected to db");
    });
});

app.use("/api", data.dbConnection, apiRoutes);

module.exports = app;
