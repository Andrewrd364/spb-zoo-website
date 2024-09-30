const { Souvenir, SouvenirCategory } = require('../models/models');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

exports.getAllSouvenirs = async (req, res) => {
  const { page = 1, limit = 10, category, inStockOnly = false } = req.query;
  const offset = (page - 1) * limit;

  let whereCondition = {};

  if (category) {
    whereCondition.souvenirCategoryId = category;  
  }

  if (inStockOnly === "true") {
    whereCondition.inStock = true;
  }

  try {
    const souvenirs = await Souvenir.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: SouvenirCategory,
          as: 'souvenir_category',
        },
      ],
      order: [['id', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.json({
      totalItems: souvenirs.count,
      totalPages: Math.ceil(souvenirs.count / limit),
      currentPage: parseInt(page),
      data: souvenirs.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении сувениров' });
  }
};

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

exports.createSouvenir = async (req, res) => {
  const { name, description, inStock, categoryId } = req.body;
  console.log(req.files)
  try {
    let imageUrl = null;

    if (req.files && req.files.imageUrl) {
      const file = req.files.imageUrl;
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, '..', 'static', fileName);
      await file.mv(filePath);
      imageUrl = fileName;  
    }

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

exports.updateSouvenir = async (req, res) => {
  const { name, description, inStock, categoryId } = req.body;

  try {
    const souvenir = await Souvenir.findByPk(req.params.id);

    if (!souvenir) {
      return res.status(404).json({ message: 'Сувенир не найден' });
    }

    let imageUrl = souvenir.imageUrl;

    if (req.files && req.files.imageUrl) {
      const oldFilePath = path.resolve(__dirname, '..', 'static', souvenir.imageUrl);
      
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      const file = req.files.imageUrl;
      const newFileName = uuid.v4() + ".jpg";
      const newFilePath = path.resolve(__dirname, '..', 'static', newFileName);
      await file.mv(newFilePath);
      imageUrl = newFileName; 
    }

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

exports.deleteSouvenir = async (req, res) => {
  try {
    const souvenir = await Souvenir.findByPk(req.params.id);

    if (!souvenir) {
      return res.status(404).json({ message: 'Сувенир не найден' });
    }

    if (souvenir.imageUrl) {
      const filePath = path.resolve(__dirname, '..', 'static', souvenir.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await souvenir.destroy();
    return res.status(200).json({ message: 'Сувенир успешно удален' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при удалении сувенира', error });
  }
};