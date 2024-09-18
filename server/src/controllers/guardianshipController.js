const { Guardianship, Animal } = require('../models/models.js'); // Импортируем модели

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
    const { name, guardianUrl, guardianImg, animalId } = req.body;
  
    try {
      const guardianship = await Guardianship.create({
        name,
        guardianUrl,
        guardianImg
      });
  
      // Если было передано животное, привязываем его к опекунству
      if (animalId) {
        const animal = await Animal.findByPk(animalId);
        if (animal) {
          await guardianship.addAnimal(animal);
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
    const { name, guardianUrl, guardianImg, animalId } = req.body;
  
    try {
      const guardianship = await Guardianship.findByPk(id);
      if (!guardianship) {
        return res.status(404).json({ message: 'Опекунство не найдено' });
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
  
      await guardianship.destroy();
  
      return res.json({ message: 'Опекунство удалено' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при удалении опекунства' });
    }
  };
