const { Event } = require('../models/models.js');
const uuid = require('uuid')
const path = require('path');
const fs = require('fs');

// Получить все события с пагинацией
exports.getAllEvents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Параметры для пагинации
  const offset = (page - 1) * limit;

  try {
    const events = await Event.findAndCountAll({
      limit: parseInt(limit), // количество записей на одной странице
      offset: parseInt(offset), // смещение для выборки
      order: [['date', 'DESC']] // сортировка по дате
    });

    res.json({
      total: events.count, // общее количество событий
      totalPages: Math.ceil(events.count / limit), // общее количество страниц
      currentPage: parseInt(page),
      data: events.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении событий', error });
  }
};

// Создать новое событие
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, price, animalId } = req.body; // Получаем данные из тела запроса

    // Проверяем, прикреплен ли файл
    let fileName;
    if (req.files && req.files.imageUrl) {
      const { imageUrl } = req.files;
      // Генерируем уникальное имя для файла
      fileName = uuid.v4() + ".jpg"
      const filePath = path.resolve(__dirname, '..', 'static', fileName);
      // Перемещаем файл в папку static
      await imageUrl.mv(filePath);
    }

    // Проверяем, указан ли id животного
    const eventData = {title, description, date, price, imageUrl: fileName ? fileName : null, animalId: animalId || null,};

    // Создаём событие с указанными данными
    const event = await Event.create(eventData);

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при создании события', error });
  }
};

// Обновить событие
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, price, animalId } = req.body;

  try {
    // Найти событие по ID
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    // Обновить основные поля события
    event.title = title;
    event.description = description;
    event.date = date;
    event.price = price;

    // Если указан animalId, обновить его
    if (animalId) {
      event.animalId = animalId;
    }

    // Обработка изображения
    if (req.files && req.files.imageUrl) {
      const { imageUrl } = req.files;
      
      // Удалить старое изображение, если оно существует
      if (event.imageUrl) {
        const oldImagePath = path.resolve(__dirname, '..', 'static', event.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Удаление старого изображения
        }
      }

      // Генерация нового имени для изображения и перемещение его в папку static
      let fileName = uuid.v4() + ".jpg"
      await imageUrl.mv(path.resolve(__dirname, '..', 'static', fileName));

      // Обновление поля imageUrl в базе данных
      event.imageUrl = fileName;
    }

    // Сохранить изменения
    await event.save();

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при обновлении события', error });
  }
};

// Удалить событие
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    // Найти событие по id
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    // Проверить, есть ли изображение, и удалить его
    if (event.imageUrl) {
      const imagePath = path.resolve(__dirname, '..', 'static', event.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Удалить файл изображения
      }
    }

    // Удалить само событие
    await event.destroy();
    res.json({ message: 'Событие и изображение успешно удалены' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении события', error });
  }
};

// Получить событие по id
exports.getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении события', error });
  }
};
