const { Animal, AnimalSpecies, News, Event } = require('../models/models.js');
const uuid = require('uuid')
const path = require('path');
const fs = require('fs');

// Получить всех животных
exports.getAllAnimals = async (req, res) => {
  const { page = 1, limit = 10, species } = req.query; // Добавлен параметр species для фильтрации
  const offset = (page - 1) * limit;

  let whereCondition = {};
  if (species) {
    whereCondition = { speciesId: species }; // Фильтрация по виду, если передан параметр species
  }

  try {
    const animals = await Animal.findAndCountAll({
      where: whereCondition, // Условие для фильтрации по виду
      include: [
        { model: AnimalSpecies, as: 'species' } // Включение вида животных
      ],
      limit: parseInt(limit), // Ограничение на количество записей
      offset: parseInt(offset) // Смещение для пагинации
    });

    return res.json({
      totalItems: animals.count, // Общее количество животных
      totalPages: Math.ceil(animals.count / limit), // Общее количество страниц
      currentPage: parseInt(page), // Текущая страница
      data: animals.rows // Данные с животными
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении животных' });
  }
};

// Получить животное по ID
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id, {
      include: [
        { model: AnimalSpecies, as: 'species' }, // Включение вида животных
        { model: News, as: 'news' }, // Включение связанных новостей
        { model: Event, as: 'events' } // Включение связанных мероприятий
      ],
    });

    if (animal) {
      res.status(200).json(animal);
    } else {
      res.status(404).json({ error: 'Animal not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve animal' });
  }
};


// Создать новое животное
exports.createAnimal = async (req, res) => {
  try {
    let {name, latinName, description, food, habitat, speciesId} = req.body
    const {imageUrl} = req.files
    let fileName = uuid.v4() + ".jpg"
    imageUrl.mv(path.resolve(__dirname, '..', 'static', fileName))
    req.body.imageUrl = fileName;
    const animal = await Animal.create({name, latinName, description, food, habitat, speciesId, imageUrl: fileName});
    res.status(201).json(animal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create animal' });
  }
};

// Обновить информацию о животном
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);

    if (!animal) {
      return res.status(404).json({ error: 'Animal not found' });
    }

    let { name, latinName, description, food, habitat, speciesId } = req.body;
    let fileName = animal.imageUrl; // Изначально оставляем текущее имя файла изображения

    // Проверяем, есть ли новый файл изображения в запросе
    if (req.files && req.files.imageUrl) {
      const { imageUrl } = req.files;

      // Удаляем старый файл, если он существует
      if (fileName) {
        const oldFilePath = path.resolve(__dirname, '..', 'static', fileName);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Генерируем новое имя для файла и сохраняем его
      fileName = uuid.v4() + ".jpg";
      const newFilePath = path.resolve(__dirname, '..', 'static', fileName);
      await imageUrl.mv(newFilePath); // Сохраняем новый файл
    }

    // Обновляем информацию о животном в базе данных
    await animal.update({
      name,
      latinName,
      description,
      food,
      habitat,
      speciesId,
      imageUrl: fileName // Присваиваем новое имя файла
    });

    res.status(200).json(animal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update animal' });
  }
};

// Удалить животное
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    
    if (!animal) {
      return res.status(404).json({ error: 'Animal not found' });
    }

    // Получаем путь к изображению
    const imageUrl = animal.imageUrl;
    if (imageUrl) {
      const filePath = path.resolve(__dirname, '..', 'static', imageUrl);

      // Проверяем, существует ли файл изображения
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Удаляем файл
      }
    }

    // Удаляем запись о животном из базы данных
    await animal.destroy();

    res.status(200).json({ message: 'Animal and image deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete animal' });
  }
};
