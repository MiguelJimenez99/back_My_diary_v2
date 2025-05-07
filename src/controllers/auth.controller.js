const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const { name, lastname, username, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!name || !lastname || !username || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    if (userExist) {
      return res.status(400).json({
        message: "El correo ya esta registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User({
      name,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      user: {
        name: user.name + " " + user.lastname,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al iniciar sesión",
      error,
    });
  }
};
