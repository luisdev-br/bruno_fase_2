const express = require('express');
const Order = require('../models/orderModel');
const router = express.Router();

// Criar pedido
router.post('/', async (req, res) => {
  const { userId, products, total } = req.body;

  console.log('Dados recebidos para criar o pedido:', req.body);  

  try {
    const order = new Order({ user: userId, products, total });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error('Erro ao criar pedido:', err);  
    res.status(500).json({ msg: 'Erro ao criar o pedido', error: err.message });
  }
});

// Listar pedidos de um usuário
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).populate('products');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao listar pedidos', error: err.message });
  }
});

module.exports = router;
