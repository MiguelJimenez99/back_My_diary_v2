const Note = require("../models/note.model");

exports.getNotesUser = async (req, res) => {
  try {
    const userId = req.userId;
    const notesUser = await Note.find({ userId }).sort({ createdAt: -1 });

    if (notesUser == "" || notesUser.legth == 0) {
      return res.status(201).json({
        message: "No tienes Entradas registradas",
        getNotes: [],
      });
    }

    res.status(200).json({
      message: "Entrada obtenidas correctamente",
      getNotes: notesUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error en el servidor: ${error}`,
    });
  }
};

exports.createNoteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { description } = req.body;

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
      message: "Entrada creada correctamente",
      postNote: createNote,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error en el servidor: ${error}` });
  }
};

exports.updateNoteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(400).json({
        message: "Entrada no encontrada",
      });
    }

    const { description } = req.body;

    if (note.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "No tienes permiso para editar esta entrada",
      });
    }

    const updateNote = await Note.findByIdAndUpdate(
      noteId,
      {
        description,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Entrada actualizada correctamente",
      note: updateNote,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error en el servidor: ${error}`,
    });
  }
};

exports.favoriteNoteUser = async (req, res) => {
  try {
    
    const noteId = req.params.id;

    const note = await Note.findById(noteId);

    if(!note) {
      return res.status(400).json({
        message: 'Entrada no encontrada'
      });
    }

    note.isFavorite = !note.isFavorite;

    await note.save();

    res.status(200).json({
      message: 'Estado de la entrada actualizado',
      isFavorite: note.isFavorite,
    })

  } catch (error) {
     res.status(500).json({
      message: `Error en el servidor: ${error}`,
    });
  }
}

exports.deleteNoteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;

    const note = await Note.findById(noteId);

    if (!noteId) {
      return res.status(400).json({
        messaje: "Entrada no encontrada",
      });
    }

    if (note.userId.toString() !== userId.toString()) {
      res.status(403).json({
        message: "No tienes permisos para eliminar esta entrada",
      });
    }

    await Note.findByIdAndDelete(noteId);

    res.status(200).json({
      message: "Entrada eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error en el servidor: ${error}`,
    });
  }
};
