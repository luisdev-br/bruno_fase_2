const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar produtos', error: err.message });
  }
});

// Rota para adicionar carros pré-definidos ao banco
router.post('/seed', async (req, res) => {
  const cars = [
    { name: 'Honda Civic 2019', price: 85000, description: 'Carro da Honda', imageUrl: 'car1.jpg' },
    { name: 'Toyota Corolla 2020', price: 90000, description: 'Carro da Toyota', imageUrl: 'car2.jpg' },
    { name: 'Ford KA 2013', price: 70000, description: 'Carro da Ford', imageUrl: 'car3.jpg' },
    { name: 'Porsche 911 Carrera', price: 60000, description: 'Carro da Porsche', imageUrl: 'car4.jpg' },
    { name: 'VW Fusca 1990', price: 40000, description: 'Carro da Volkswagen', imageUrl: 'car5.jpg' },
    { name: 'VW Gol 2010', price: 30000, description: 'Carro da Volkswagen', imageUrl: 'car6.jpg' },
  ];

  try {
    
    await Product.insertMany(cars);

    res.status(201).json({ msg: 'Carros adicionados ao banco de dados com sucesso!' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao adicionar os carros', error: err.message });
  }
});

module.exports = router;
