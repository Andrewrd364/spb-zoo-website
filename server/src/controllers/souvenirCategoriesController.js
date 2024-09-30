const { SouvenirCategory } = require('../models/models');

exports.getAllSouvenirCategories = async (req, res) => {
  try {
    const categories = await SouvenirCategory.findAll();
    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении категорий сувениров' });
  }
};

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

exports.createSouvenirCategory = async (req, res) => {
  const { category } = req.body;

  try {
    if (!category) {
      return res.status(400).json({ message: 'Название категории обязательно' });
    }

    const newCategory = await SouvenirCategory.create({ category });
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при создании категории сувениров' });
  }
};

exports.updateSouvenirCategory = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const prevCategory = await SouvenirCategory.findByPk(id);

    if (!prevCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    if (!category) {
      return res.status(400).json({ message: 'Название категории обязательно для обновления' });
    }

    prevCategory.category = category; 
    await prevCategory.save();

    return res.status(200).json(prevCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при обновлении категории сувениров' });
  }
};
exports.deleteSouvenirCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await SouvenirCategory.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    await category.destroy();
    return res.status(204).json({ message: 'Категория успешно удалена' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при удалении категории сувениров' });
  }
};
