const { NewsCategory } = require('../models/models');

// Получить все категории новостей
exports.getAllNewsCategories = async (req, res) => {
  try {
    const categories = await NewsCategory.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении категорий новостей' });
  }
};
