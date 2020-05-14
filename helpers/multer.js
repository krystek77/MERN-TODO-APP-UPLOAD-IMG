const multer = require("multer");
module.exports = multer({
  storage: multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, "./upload_image/");
    // },
    filename: function (req, file, cb) {
      // - .jpeg
      const extension = file.originalname.substring(
        file.originalname.lastIndexOf(".")
      );
      cb(null, file.originalname);
    },
    fileFilter: function (req, file, cb) {
      cb(null, true);
      cb(new Error("Something went wrong..."));
    },
  }),
});
