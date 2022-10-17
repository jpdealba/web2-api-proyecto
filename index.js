const express = require("express");
const app = express();
const path = require("path");
const rutasCoins = require("./coins/routes.js");
const rutasUsers = require("./coins/routes.js");
app.use("/assets", express.static(path.join(__dirname, "public")));

const middleWare = (req, res, next) => {
  next();
};

app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "/index.html"));
  res.send("Success");
});

app.listen(3000, () => {
  console.log("app is running in port 3000");
});

// app.use("/noticias", middleWare, rutasNoticias);
app.use("/coins", middleWare, rutasCoins);
app.use("/users", middleWare, rutasUsers);
