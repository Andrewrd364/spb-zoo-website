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

exports.addNewsCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ message: 'Категория новостей не указана' });
    }
    const newCategory = await NewsCategory.create({ category });
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Категория новостей уже существует' });
    }
    return res.status(500).json({ message: 'Ошибка при добавлении категории новостей' });
  }
};

exports.updateNewsCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ message: 'Категория новостей не указана' });
    }
    const updatedCategory = await NewsCategory.findByPk(id);
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Категория новостей не найдена' });
    }
    await updatedCategory.update({ category });
    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Категория новостей уже существует' });
    }
    return res.status(500).json({ message: 'Ошибка при обновлении категории новостей' });
  }
};

exports.deleteNewsCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await NewsCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Категория новостей не найдена' });
    }
    await category.destroy();
    return res.status(200).json({ message: 'Категория новостей удалена' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при удалении категории новостей' });
  }
};
