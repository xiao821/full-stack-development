const Item = require('../models/item');

exports.list = (req, res) => {
  res.json(Item.findAll());
};

exports.create = (req, res) => {
  const { name } = req.body || {};
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name is required' });
  }
  res.status(201).json(Item.create({ name }));
};
