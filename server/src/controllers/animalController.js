const { Animal, AnimalSpecies, News, Event } = require('../models/models.js');
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
    const animal = await Animal.create(req.body);
    res.status(201).json(animal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create animal' });
  }
};

// Обновить информацию о животном
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (animal) {
      await animal.update(req.body);
      res.status(200).json(animal);
    } else {
      res.status(404).json({ error: 'Animal not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update animal' });
  }
};

// Удалить животное
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (animal) {
      await animal.destroy();
      res.status(200).json({ message: 'Animal deleted successfully' });
    } else {
      res.status(404).json({ error: 'Animal not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete animal' });
  }
};
