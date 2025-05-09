const User = require("../models/user.model");

exports.userGetData = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
    
        if (!user) {
          return res.status(400).json({
            message: 'Usuario no encontrado'
          })
        }
    
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({
          message: 'error al obtener los datos', error
        })
      }
};
