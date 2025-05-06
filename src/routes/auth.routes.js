const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const {
  registrationValidator,
  loginValidator,
} = require("../validators/auth.validatos");
const validate = require("../middlewares/validate.middleware");

router.post("/register", registrationValidator, validate, register);
router.post("/login", loginValidator, validate, login);

module.exports = router;
