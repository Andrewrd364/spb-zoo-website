const { Service } = require('../models/models');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Получить все услуги с пагинацией
exports.getAllServices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Значения по умолчанию: страница 1, лимит 10
  const offset = (page - 1) * limit;

  try {
    const services = await Service.findAndCountAll({
      limit: parseInt(limit), // Ограничение на количество записей
      offset: parseInt(offset), // Смещение для пагинации
    });

    return res.json({
      totalItems: services.count, // Общее количество услуг
      totalPages: Math.ceil(services.count / limit), // Общее количество страниц
      currentPage: parseInt(page), // Текущая страница
      data: services.rows, // Список услуг
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении услуг' });
  }
};

// Получить услугу по ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (service) {
      return res.status(200).json(service);
    } else {
      return res.status(404).json({ message: 'Услуга не найдена' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении услуги' });
  }
};

// Создать новую услугу
exports.createService = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    let imageUrl = null;

    // Если в запросе есть файл изображения, сохраняем его
    if (req.files && req.files.imageUrl) {
      const file = req.files.imageUrl;
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, '..', 'static', fileName);
      await file.mv(filePath); // Перемещаем файл в папку static
      imageUrl = fileName;
    }

    // Создаем новую услугу
    const newService = await Service.create({
      title,
      description,
      price,
      imageUrl,
    });

    return res.status(201).json(newService);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при создании услуги', error });
  }
};

// Обновить услугу по ID
exports.updateService = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Услуга не найдена' });
    }

    let imageUrl = service.imageUrl;

    // Если передан новый файл изображения, удаляем старый и сохраняем новый
    if (req.files && req.files.imageUrl) {
      const oldFilePath = path.resolve(__dirname, '..', 'static', service.imageUrl);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); // Удаляем старый файл
      }

      const file = req.files.imageUrl;
      const newFileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, '..', 'static', newFileName);
      await file.mv(filePath); // Перемещаем новый файл в папку static
      imageUrl = newFileName;
    }

    // Обновляем услугу
    await service.update({
      title,
      description,
      price,
      imageUrl,
    });

    return res.status(200).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при обновлении услуги', error });
  }
};

// Удалить услугу по ID
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Услуга не найдена' });
    }

    // Удаляем изображение, если оно существует
    if (service.imageUrl) {
      const filePath = path.resolve(__dirname, '..', 'static', service.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Удаляем файл изображения
      }
    }

    // Удаляем услугу
    await service.destroy();

    return res.status(200).json({ message: 'Услуга успешно удалена' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при удалении услуги', error });
  }
};
