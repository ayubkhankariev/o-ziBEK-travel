const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllAttractions = async (req, res) => {
  try {
    const { city, category } = req.query;
    
    const where = {};
    if (city) where.city = city;
    if (category) where.category = category;

    const attractions = await prisma.attraction.findMany({ where });
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttractionById = async (req, res) => {
  try {
    const { id } = req.params;
    const attraction = await prisma.attraction.findUnique({ where: { id: parseInt(id) } });
    if (!attraction) return res.status(404).json({ message: 'Attraction not found' });
    res.json(attraction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAttraction = async (req, res) => {
  try {
    const attraction = await prisma.attraction.create({ data: req.body });
    res.status(201).json(attraction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
