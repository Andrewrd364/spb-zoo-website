const { Event } = require('../models/models.js');
const uuid = require('uuid')
const path = require('path');
const fs = require('fs');

exports.getAllEvents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 
  const offset = (page - 1) * limit;

  try {
    const events = await Event.findAndCountAll({
      limit: parseInt(limit), 
      offset: parseInt(offset), 
      order: [['date', 'DESC']] 
    });

    res.json({
      total: events.count, 
      totalPages: Math.ceil(events.count / limit), 
      currentPage: parseInt(page),
      data: events.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении событий', error });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, price, animalId } = req.body; 

    let fileName;
    if (req.files && req.files.imageUrl) {
      const { imageUrl } = req.files;

      fileName = uuid.v4() + ".jpg"
      const filePath = path.resolve(__dirname, '..', 'static', fileName);

      await imageUrl.mv(filePath);
    }

    const eventData = {title, description, date, price: price || null, imageUrl: fileName ? fileName : null, animalId: animalId || null,};

    const event = await Event.create(eventData);

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при создании события', error });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, price, animalId } = req.body;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.price = price || null;

    if (animalId) {
      event.animalId = animalId;
    }

    if (req.files && req.files.imageUrl) {
      const { imageUrl } = req.files;
      
      if (event.imageUrl) {
        const oldImagePath = path.resolve(__dirname, '..', 'static', event.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); 
        }
      }

      let fileName = uuid.v4() + ".jpg"
      await imageUrl.mv(path.resolve(__dirname, '..', 'static', fileName));

      event.imageUrl = fileName;
    }

    await event.save();

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при обновлении события', error });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    if (event.imageUrl) {
      const imagePath = path.resolve(__dirname, '..', 'static', event.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); 
      }
    }

    await event.destroy();
    res.json({ message: 'Событие и изображение успешно удалены' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении события', error });
  }
};

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
