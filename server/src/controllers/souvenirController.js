const { Souvenir, SouvenirCategory } = require('../models/models');

// Получить все сувениры с пагинацией и фильтрацией по категории
exports.getAllSouvenirs = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;
  const offset = (page - 1) * limit;

  let whereCondition = {};
  if (category) {
    whereCondition = { category };
  }

  try {
    const souvenirs = await Souvenir.findAndCountAll({
      include: [
        {
          model: SouvenirCategory,
          as: 'souvenir_category',
          where: whereCondition
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    return res.json({
      totalItems: souvenirs.count,
      totalPages: Math.ceil(souvenirs.count / limit),
      currentPage: parseInt(page),
      data: souvenirs.rows
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении сувениров' });
  }
};

// Получить сувенир по ID
exports.getSouvenirById = async (req, res) => {
  try {
    const souvenir = await Souvenir.findByPk(req.params.id, {
      include: [{ model: SouvenirCategory, as: 'souvenir_category' }]
    });
    if (souvenir) {
      return res.json(souvenir);
    } else {
      return res.status(404).json({ message: 'Сувенир не найден' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении сувенира' });
  }
};

// Создать новый сувенир
exports.createSouvenir = async (req, res) => {
  const { name, description, inStock, categoryId } = req.body;

  try {
    const newSouvenir = await Souvenir.create({
      name,
      description,
      inStock,
      souvenirCategoryId: categoryId
    });
    return res.status(201).json(newSouvenir);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при создании сувенира' });
  }
};

// Обновить существующий сувенир
exports.updateSouvenir = async (req, res) => {
  const { name, description, inStock, categoryId } = req.body;

  try {
    const souvenir = await Souvenir.findByPk(req.params.id);
    if (souvenir) {
      await souvenir.update({
        name,
        description,
        inStock,
        souvenirCategoryId: categoryId
      });
      return res.json(souvenir);
    } else {
      return res.status(404).json({ message: 'Сувенир не найден' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при обновлении сувенира' });
  }
};

// Удалить сувенир
exports.deleteSouvenir = async (req, res) => {
  try {
    const souvenir = await Souvenir.findByPk(req.params.id);
    if (souvenir) {
      await souvenir.destroy();
      return res.status(200).json({ message: 'Сувенир успешно удален' });
    } else {
      return res.status(404).json({ message: 'Сувенир не найден' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при удалении сувенира' });
  }
};
