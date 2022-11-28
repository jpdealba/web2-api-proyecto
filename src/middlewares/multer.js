const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(".")[0].toLowerCase();
    const ext = "png";
    cb(null, `${name}.${ext}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
