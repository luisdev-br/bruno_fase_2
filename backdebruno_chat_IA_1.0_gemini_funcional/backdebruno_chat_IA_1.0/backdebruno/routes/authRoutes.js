const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const router = express.Router();

// Registrar usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'Usuário já existe' });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ msg: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao registrar o usuário:', err);  
    res.status(500).json({ msg: 'Erro no servidor', error: err.message });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuário não encontrado:', email);  
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Senha incorreta para usuário:', email);  
      return res.status(400).json({ msg: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user._id }, 'secrectkey', { expiresIn: '1h' });
    res.json({ token, userId: user._id });  
  } catch (err) {
    console.error('Erro ao realizar login:', err);  
    res.status(500).json({ msg: 'Erro no servidor', error: err.message });
  }
});

module.exports = router;
