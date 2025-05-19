const Photo = require("../models/photo.model");

exports.getPhoto = async (req, res) => {
  try {
    const userId = req.userId;

    const photosUser = await Photo.find({ userId }).sort({ date: -1 });

    if (!photosUser || photosUser.length == 0) {
      return res.status(200).json({
        message: "No hay fotos para mostrar",
        posts: [],
      });
    }
    res.status(200).json({
      message: "Fotos obtenidas correctamente",
      posts: photosUser,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error al obtener las fotos: ${error}`,
    });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    const userId = req.userId;
    const { description } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({
        message: "la foto es requerida",
      });
    }

    const newPhoto = new Photo({
      description,
      userId,
      photo: req.file.path, // url publica en cloudinary
    });

    const savePhoto = await newPhoto.save();

    res.status(200).json({
      message: "Foto agregada correctamente",
      photo: savePhoto,
      error: console.log(savePhoto),
    });
  } catch (error) {
    res.status(500).json({
      error: console.log(error),
      message: "Error en el servidor",
    });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const userId = req.userId;
    const photoId = req.params.id;

    const photo = await Photo.findById(photoId);

    if (photo.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "No tienes permisos para eliminar esta foto",
      });
    }

    await Photo.findByIdAndDelete(photoId);
    res.status(200).json({
      message: "Imagen eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};
