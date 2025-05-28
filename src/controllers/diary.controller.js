const Diary = require("../models/diary.model");
const chalk = require("chalk");

exports.getDiary = async (req, res) => {
  try {
    const userId = req.userId;

    const diarysUser = await Diary.find({ userId }).sort({ createdAt: -1 });

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
      createdAt: new Date(),
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

exports.updateDiary = async (req, res) => {
  try {
    const userId = req.userId;
    const diaryId = req.params.id;

    const diary = await Diary.findById(diaryId);

    if (!diary) {
      return res.status(400).json({
        error: "Entrada no encontrada",
      });
    }

    const { title, description, mood } = req.body;

    if (diary.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Error, no tiene permisos para editar esta entrada",
      });
    }

    const updatedDiary = await Diary.findByIdAndUpdate(
      diaryId,
      { title, description, mood },
      { new: true }
    );

    res.status(200).json({
      message: "Entrada Actualizada correctamente",
      diary: updatedDiary,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

exports.deletItemDiary = async (req, res) => {
  try {
    const userId = req.userId || req.userId;
    const diaryId = req.params.id;

    const diary = await Diary.findById(diaryId);

    if (!diary) {
      res.status(400).json({
        message: "Error al eliminar, Entrada no encontrada",
      });
    }

    if (diary.userId.toString() !== userId.toString()) {
      res.status(403).json({
        messaje: "No tienes permiso para eliminar este diario",
      });
    }

    await Diary.findByIdAndDelete(diaryId);

    res.status(200).json({
      message: "Entrada Eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
