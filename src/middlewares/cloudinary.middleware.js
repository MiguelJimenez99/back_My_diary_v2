const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");


//configuracion almacenamiento en cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'users_photos',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: `${Date.now()}`,
  }),
});

const upload = multer({ storage });

module.exports = upload;