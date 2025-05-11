const Diary = require("../models/diary.model");

exports.getDiary = async (req, res) => {
  try {
    const userId = req.userId;

    const diarysUser = await Diary.find({ userId }).sort({ date: -1 });

    if (!diarysUser || diarysUser.length == 0) {
      return res.status(200).json({
        message: "No tienes actividades registradas",
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
    const { title, description, date, mood } = req.body;

    if (!title || !description || !date || !mood) {
      return res.status(400).json({
        message: "Todos los datos son requeridos",
      });
    }

    const newPostDiary = new Diary({
      title,
      description,
      date,
      mood,
      idUser,
    });

    await newPostDiary.save();
    res.status(200).json({
      message: "Actividad registrada",
      post: newPostDiary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el diario." });
  }
};

// exports.updatePost = async (req, res) => {
//   try {
//     const diaryId = req.params;
//     const userId = req.userId;

//     const diary = await Diary.findById(diaryId);

//     if (!diary) {
//       return res.status(400).json({
//         message: "actividad no encontrada",
//       });
//     }

//     if (diary.userId.toString() !== userId) {
//       return res
//         .status(403)
//         .json({ message: "No tienes permisos para actualizar esta actividad" });
//     }

//     const { title, description, date, mood } = req.body;

//     if (title !== undefined) diary.title = title;
//     if (description !== undefined) diary.description = description;
//     if (date !== undefined) diary.date = date;
//     if (mood !== undefined) diary.mood = mood;

//     await diary.save(); // Guardar cambios

//     res
//       .status(200)
//       .json({ message: "Actividad actualizada exitosamente", diary });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al actualizar la actividad" });
//   }
// };
