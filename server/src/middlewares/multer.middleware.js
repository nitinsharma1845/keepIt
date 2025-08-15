import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, res, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, res, file, cb) {
    cb(null, file.originalname);
  },
});


export const upload = multer({storage})