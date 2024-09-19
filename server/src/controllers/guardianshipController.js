const { Guardianship, Animal } = require('../models/models.js'); 
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Получение всех опекунств с информацией о животных
exports.getAllGuardianships = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query; // Получение параметров пагинации из запроса
      const offset = (page - 1) * limit;
  
      const guardianships = await Guardianship.findAndCountAll({
        include: [
          {
            model: Animal,
            as: 'animal' // Используем правильный алиас
          }
        ],
        limit: parseInt(limit),  // Лимит на количество записей
        offset: parseInt(offset)  // Смещение для пагинации
      });
  
      return res.json({
        data: guardianships.rows,  // Сами записи
        totalItems: guardianships.count,  // Общее количество записей
        totalPages: Math.ceil(guardianships.count / limit),  // Общее количество страниц
        currentPage: parseInt(page)  // Текущая страница
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при получении опекунств' });
    }
  };

// Получение опекунства по ID с информацией о животных
exports.getGuardianshipById = async (req, res) => {
  const { id } = req.params;

  try {
    const guardianship = await Guardianship.findOne({
      where: { id },
      include: [
        {
          model: Animal, // Включаем модель Animal
          as: 'animal' // Название ассоциации
        }
      ]
    });

    if (!guardianship) {
      return res.status(404).json({ message: 'Опекунство не найдено' });
    }

    return res.json(guardianship); // Возвращаем JSON с опекунством и животными
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении опекунства' });
  }
};

exports.createGuardianship = async (req, res) => {
  const { name, guardianUrl, animalId } = req.body;
  let guardianImg = null;

  try {
    // Если есть прикрепленный файл, сохраняем его
    if (req.files && req.files.guardianImg) {
      const img = req.files.guardianImg;
      const fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      guardianImg = fileName;
    }

    const guardianship = await Guardianship.create({
      name,
      guardianUrl,
      guardianImg
    });

    // Если было передано животное, привязываем его к опекунству
    if (animalId) {
      const animal = await Animal.findByPk(animalId);
      if (animal) {
        await guardianship.setAnimal(animal);
      }
    }

    return res.status(201).json(guardianship);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при создании опекунства' });
  }
};

exports.updateGuardianship = async (req, res) => {
  const { id } = req.params;
  const { name, guardianUrl, animalId } = req.body;
  let guardianImg = null;

  try {
    const guardianship = await Guardianship.findByPk(id);
    if (!guardianship) {
      return res.status(404).json({ message: 'Опекунство не найдено' });
    }

    // Проверяем, есть ли новое изображение и удаляем старое
    if (req.files && req.files.guardianImg) {
      const oldImg = guardianship.guardianImg;
      const img = req.files.guardianImg;
      const fileName = uuid.v4() + ".jpg";

      // Удаляем старое изображение, если оно существует
      if (oldImg) {
        const oldImgPath = path.resolve(__dirname, '..', 'static', oldImg);
        if (fs.existsSync(oldImgPath)) {
          fs.unlinkSync(oldImgPath);
        }
      }

      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      guardianImg = fileName;
    }

    // Обновляем данные
    guardianship.name = name || guardianship.name;
    guardianship.guardianUrl = guardianUrl || guardianship.guardianUrl;
    guardianship.guardianImg = guardianImg || guardianship.guardianImg;

    await guardianship.save();

    // Если передано новое животное, обновляем связь
    if (animalId) {
      const animal = await Animal.findByPk(animalId);
      if (animal) {
        await guardianship.setAnimal(animal);
      }
    }

    return res.json(guardianship);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при обновлении опекунства' });
  }
};

exports.deleteGuardianship = async (req, res) => {
  const { id } = req.params;

  try {
    const guardianship = await Guardianship.findByPk(id);
    if (!guardianship) {
      return res.status(404).json({ message: 'Опекунство не найдено' });
    }

    // Удаляем изображение, если оно существует
    if (guardianship.guardianImg) {
      const imgPath = path.resolve(__dirname, '..', 'static', guardianship.guardianImg);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await guardianship.destroy();

    return res.json({ message: 'Опекунство и изображение успешно удалены' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при удалении опекунства', error });
  }
};
