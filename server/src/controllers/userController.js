const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/models'); 

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

