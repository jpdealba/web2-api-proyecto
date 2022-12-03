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
const UserModel = require("./src/users/model");
//import socket conf
const socket = require("./src/core/index");

require("dotenv").config();

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const googleClient = new OAuth2Client(process.env.GOOGLE_ID);
var cors = require("cors");
const { default: axios } = require("axios");
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
    cron.schedule("*/5 * * * *", async () => {
      // Coin.updateDB();
      try {
        const url =
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false";
        const res = await axios.get(url, {
          headers: { "accept-encoding": null },
        });

        const collection = db.collection("coins");
        if (res.data && res.data.length > 0) {
          const bulk = collection.initializeUnorderedBulkOp();
          res.data.map((coin) => {
            bulk
              .find({ id: coin.id })
              .upsert()
              .updateOne({
                $set: {
                  id: coin.id,
                  symbol: coin.symbol,
                  name: coin.name,
                  image: coin.image,
                  current_price: coin.current_price,
                  market_cap: coin.market_cap,
                  market_cap_rank: coin.market_cap_rank,
                  fully_diluted_valuation: coin.fully_diluted_valuation,
                  total_volume: coin.total_volume,
                  high_24h: coin.high_24h,
                  low_24h: coin.low_24h,
                  price_change_24h: coin.price_change_24h,
                  price_change_percentage_24h: coin.price_change_percentage_24h,
                  market_cap_change_24h: coin.market_cap_change_24h,
                  market_cap_change_percentage_24h:
                    coin.market_cap_change_percentage_24h,
                  circulating_supply: coin.circulating_supply,
                  total_supply: coin.total_supply,
                  max_supply: coin.imax_supplyd,
                  ath: coin.ath,
                  ath_change_percentage: coin.ath_change_percentage,
                  ath_date: coin.ath_date,
                  atl: coin.atl,
                  atl_change_percentage: coin.atl_change_percentage,
                  atl_date: coin.atl_date,
                  roi: coin.roi,
                  last_updated: coin.last_updated,
                },
              });
          });
          bulk.execute(function (err, updateResult) {
            console.log(err, updateResult);
          });
        }
      } catch (err) {
        console.log(err);
      }
      console.log(res.data.length);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to connect to database");
  });

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//List to port
const server = app.listen(port, () =>
  console.log(`app is listening to port: ${port}`)
);
//connect to socket
socket.connect(server);

app.get("/google/:token", (req, res) => {
  const token = req.params.token;
  googleClient
    .verifyIdToken({ idToken: token })
    .then(async (response) => {
      const data = response.getPayload();
      console.log("Data: ", data);
      console.log("valid");
      const User = new UserModel();
      const user = await User.findByEmail(data.email);
      res.send({ ...user, isvalid: true });
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
