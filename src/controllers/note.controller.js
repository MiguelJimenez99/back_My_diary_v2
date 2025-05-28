const Note = require("../models/note.model");

exports.getNotesUser = async (req, res) => {
  try {
    const userId = req.userId;
    const notesUser = await Note.find({ userId }).sort({ createdAt: -1 });

    if (notesUser == "" || notesUser.legth == 0) {
      return res.status(201).json({
        message: "No tienes notas registradas",
        getNotes: [],
      });
    }

    res.status(200).json({
      message: "Notas obtenidas correctamente",
      getNotes: notesUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

exports.createNoteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { description} = req.body;

    if (!description) {
      return res.status(400).json({
        message: "Todos los datos son requeridos",
      });
    }

    const createNote = new Note({
      description,
      date: Date.now(),
      createdAt: new Date(),
      userId: userId,
    });

    await createNote.save();

    res.status(200).json({
      message: "Nota creada correctamente",
      postNote: createNote,
    });
  } catch (error) {
    return res.status(500).json({ messaje: "Error en el servidor" });
  }
};
