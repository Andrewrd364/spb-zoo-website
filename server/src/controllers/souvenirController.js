const { Souvenir, SouvenirCategory } = require('../models/models');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

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
    let imageUrl = null;

    // Если в запросе есть файл изображения
    if (req.files && req.files.imageUrl) {
      const file = req.files.imageUrl;
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, '..', 'static', fileName);
      await file.mv(filePath);
      imageUrl = fileName;  // Присваиваем новое имя файла
    }

    // Создаем новый сувенир
    const newSouvenir = await Souvenir.create({
      name,
      description,
      inStock,
      souvenirCategoryId: categoryId,
      imageUrl
    });

    return res.status(201).json(newSouvenir);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при создании сувенира', error });
  }
};


// Обновить существующий сувенир
exports.updateSouvenir = async (req, res) => {
  const { name, description, inStock, categoryId } = req.body;

  try {
    const souvenir = await Souvenir.findByPk(req.params.id);

    if (!souvenir) {
      return res.status(404).json({ message: 'Сувенир не найден' });
    }

    let imageUrl = souvenir.imageUrl;

    // Если передан новый файл изображения
    if (req.files && req.files.imageUrl) {
      const oldFilePath = path.resolve(__dirname, '..', 'static', souvenir.imageUrl);
      
      // Удаляем старый файл, если он существует
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      const file = req.files.imageUrl;
      const newFileName = uuid.v4() + ".jpg";
      const newFilePath = path.resolve(__dirname, '..', 'static', newFileName);
      await file.mv(newFilePath);
      imageUrl = newFileName;  // Присваиваем новое имя файла
    }

    // Обновляем сувенир
    await souvenir.update({
      name,
      description,
      inStock,
      souvenirCategoryId: categoryId,
      imageUrl
    });

    return res.status(200).json(souvenir);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при обновлении сувенира', error });
  }
};
// Удалить сувенир
exports.deleteSouvenir = async (req, res) => {
  try {
    const souvenir = await Souvenir.findByPk(req.params.id);

    if (!souvenir) {
      return res.status(404).json({ message: 'Сувенир не найден' });
    }

    // Удаляем изображение, если оно существует
    if (souvenir.imageUrl) {
      const filePath = path.resolve(__dirname, '..', 'static', souvenir.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Удаляем сам сувенир
    await souvenir.destroy();
    return res.status(200).json({ message: 'Сувенир успешно удален' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при удалении сувенира', error });
  }
};