const User = require("../models/user.model");

exports.userGetData = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "error al obtener los datos",
      error,
    });
  }
};

exports.userUpdateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        lastname,
        username,
        email,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "Datos de usuario no encontrados",
      });
    }

    const userUpdate = user;

    res.status(200).json({
      userUpdate,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};
