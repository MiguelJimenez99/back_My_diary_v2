const { body } = require("express-validator");

exports.registrationValidator = [
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("lastname").notEmpty().withMessage("El apellido no puede ir vacio"),
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario no puede ir vacio"),
  body("email").isEmail().withMessage("Ingrese un email valido"),
  body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

exports.loginValidator = [
    body('email').isEmail().withMessage('Ingrese un email valido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ]
