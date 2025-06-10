const Task = require("../models/task.model");

exports.getUserTask = async (req, res) => {
  try {
    const userId = req.userId;
    const taskUser = await Task.find({ userId }).sort({ createdAt: -1 });

    if (taskUser == "" || taskUser.length == 0) {
      return res.status(201).json({
        message: "No tienes entradas registradas",
        getTask: [],
      });
    }

    res.status(200).json({
      message: "Entradas obtenidas correctamente",
      getTask: taskUser,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error en el servidor: ${error}`,
    });
  }
};

exports.createUserTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        message: "Todos los datos son requeridos",
      });
    }

    const createTask = new Task({
      description,
      date: Date.now(),
      createdAt: new Date(),
      userId: userId,
    });

    await createTask.save();

    res.status(200).json({
      meesage: "Entrada creada correctamente",
      postTask: createTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error en el servidor: ${error}`,
    });
  }
};

exports.updateUserTask = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(400).json({
        message: "Entrada no encontrada",
      });
    }

    const { description } = req.body;

    if (task.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "No tienes permisos para editar esta entrada",
      });
    }

    const updateTask = await Task.findByIdAndUpdate(
      taskId,
      { description },
      { new: true }
    );

    res.status(200).json({
      message: "Entrada actualizada correctamente",
      task: updateTask,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error en el servidor: ${error}`,
    });
  }
};

exports.completeUserTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(400).json({
        message: "Entrada no encontrada",
      });
    }

    task.isComplete = !task.isComplete;

    await task.save;

    res.status(200).json({
      message: "Estado de la entrada actualizado",
      isComplete: task.isComplete,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error en el servidor: ${error}`,
    });
  }
};

exports.taskUserDelete = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(400).json({
        message: "Entrada no encontrada",
      });
    }

    if (task.userId.toString() !== userId.toString()) {
      res.status(403).json({
        message: "No tienes permisos para editar esta entrada",
      });
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      message: "Entrada eliminada correctamente",
    });
    
  } catch (error) {
    res.status(500).json({
      message: `Error en el servidor: ${error}`,
    });
  }
};
