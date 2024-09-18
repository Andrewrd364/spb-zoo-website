const { Event } = require('../models/models.js');

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
  const { title, description, date, price, imageUrl } = req.body;

  try {
    const event = await Event.create({ title, description, date, price, imageUrl });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании события', error });
  }
};

// Обновить событие
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, price, imageUrl } = req.body;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.price = price;
    event.imageUrl = imageUrl;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении события', error });
  }
};

// Удалить событие
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    await event.destroy();
    res.json({ message: 'Событие удалено' });
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
