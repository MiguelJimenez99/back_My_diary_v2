const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const {
  getNotesUser,
  createNoteUser,
  updateNoteUser,
  favoriteNoteUser,
  deleteNoteUser,
} = require("../controllers/note.controller");

router.get("/getNotes", verifyToken, getNotesUser);
router.post("/createNote", verifyToken, createNoteUser);
router.put("/updateNote/:id", verifyToken, updateNoteUser);
router.patch("/:id/favorite", verifyToken, favoriteNoteUser);
router.delete("/deleteNote/:id", verifyToken, deleteNoteUser);

module.exports = router;
