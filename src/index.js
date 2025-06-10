const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes.js");
const diaryRoutes = require("./routes/diary.routes.js");
const photoRoutes = require("./routes/photo.routes.js");
const noteRoutes = require("./routes/note.routes.js");
const taskRoutes = require("./routes/task.routes.js");

app.use("/api/auth", authRoutes);
app.use("/api/user", authRoutes);
app.use("/api/user/diary", diaryRoutes);

app.use("/uploads", express.static("uploads"));
app.use("/api/user/photos", photoRoutes);
app.use("/api/user/notes", noteRoutes);
app.use("/api/user/tasks", taskRoutes);

mongoose
  .connect(process.env.URL_DATABASE)
  .then(() => console.log("MongoDb conectado correctamente"))
  .catch((err) => console.log("Error al establecer la coneccion", err));

const PUERTO = process.env.PUERTO;

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});
