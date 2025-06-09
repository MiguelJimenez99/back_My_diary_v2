const express = require("express");
const path = require("path");
const router = express.Router();

const upload = require("../middlewares/cloudinary.middleware");
const {
  uploadPhoto,
  getPhoto,
  deletePhoto,
  favoritePhotoUser,
} = require("../controllers/photo.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/getPhotos", verifyToken, getPhoto);
router.post("/newPhoto", verifyToken, upload.single("photo"), uploadPhoto);
router.patch("/:id/favorite", verifyToken, favoritePhotoUser);
router.delete("/delPhoto/:id", verifyToken, deletePhoto);

module.exports = router;
