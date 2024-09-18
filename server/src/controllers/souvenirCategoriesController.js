const { SouvenirCategory } = require('../models/models');

// Получить все категории сувениров
exports.getAllSouvenirCategories = async (req, res) => {
  try {
    const categories = await SouvenirCategory.findAll();
    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении категорий сувениров' });
  }
};

// Получить одну категорию по ID
exports.getSouvenirCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await SouvenirCategory.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    return res.json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении категории сувенира' });
  }
};
