const multer = require("multer");
const path = require("path");
const UserModel = require("../users/model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(".")[0].toLowerCase();
    const ext = "png";
    const User = new UserModel();
    User.updateOne(
      {
        photo_url: name,
      },
      name
    ).then((res) => console.log(res));
    cb(null, `${name}.${ext}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
