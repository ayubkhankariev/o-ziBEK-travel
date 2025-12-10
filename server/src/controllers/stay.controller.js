const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllStays = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice } = req.query;
    
    const where = {};
    if (city) where.city = city;
    if (type) where.type = type;
    if (minPrice || maxPrice) {
      where.price_per_night = {};
      if (minPrice) where.price_per_night.gte = parseFloat(minPrice);
      if (maxPrice) where.price_per_night.lte = parseFloat(maxPrice);
    }

    const stays = await prisma.stay.findMany({ where });
    res.json(stays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStayById = async (req, res) => {
  try {
    const { id } = req.params;
    const stay = await prisma.stay.findUnique({ where: { id: parseInt(id) } });
    if (!stay) return res.status(404).json({ message: 'Stay not found' });
    res.json(stay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStay = async (req, res) => {
  try {
    const stay = await prisma.stay.create({ data: req.body });
    res.status(201).json(stay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
