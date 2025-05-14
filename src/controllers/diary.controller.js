const Diary = require("../models/diary.model");

exports.getDiary = async (req, res) => {
  try {
    const userId = req.userId;

    const diarysUser = await Diary.find({ userId }).sort({ date: -1 });

    if (!diarysUser || diarysUser.length == 0) {
      return res.status(200).json({
        message: "No tienes actividades registradas",
        posts: [],
      });
    }

    res.status(200).json({
      message: "Actividades obtenidas correctamente",
      posts: diarysUser,
    });
  } catch (error) {
    console.error(error);
    return "Error al obtener las actividades del servidor";
  }
};

  exports.postDiary = async (req, res) => {
    try {
      const idUser = req.userId;
      
      const { title, description, mood, date } = req.body;

      if (!title || !description || !date || !mood) {
        return res.status(400).json({
          message: "Todos los datos son requeridos",
        });
      }

      const newPostDiary = new Diary({
        title,
        description,
        date: new Date(date),
        mood,
        userId: idUser,
      });

      await newPostDiary.save();
      res.status(200).json({
        message: "Actividad registrada",
        post: newPostDiary,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el diario.",
      });
    }
  };
