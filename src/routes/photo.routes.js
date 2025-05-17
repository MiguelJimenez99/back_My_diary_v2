const express = require("express");
const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const path = require("path");
const { uploadPhoto, getPhoto } = require("../controllers/photo.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const router = express.Router();


//configuracion almacenamiento en cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Mi galeria", // nombre de la carpeta en cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
     public_id: (req, file) => Date.now(),
  },
});

const upload = multer({ storage });

router.get("/getPhotos", verifyToken, getPhoto);
router.post("/newPhoto", verifyToken, upload.single("photo"), uploadPhoto);

module.exports = router;
