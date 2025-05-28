const express = require('express');
const router = express.Router();

const {verifyToken} = require('../middlewares/auth.middleware');
const {getNotesUser, createNoteUser} = require('../controllers/note.controller');


router.get('/getNotes', verifyToken, getNotesUser);
router.post('/createNote', verifyToken, createNoteUser);


module.exports = router;