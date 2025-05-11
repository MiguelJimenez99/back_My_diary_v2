const express = require("express");
const router = express.Router();

const {
  postDiary,
  getDiary,
  updatePost,
} = require("../controllers/diary.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/newPost", verifyToken, postDiary);
router.get("/getPost", verifyToken, getDiary);
// router.put("/putPost/:id", verifyToken, updatePost);

module.exports = router;
