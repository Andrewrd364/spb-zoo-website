const { Service } = require('../models/models');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

exports.getAllServices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 
  const offset = (page - 1) * limit;

  try {
    const services = await Service.findAndCountAll({
      limit: parseInt(limit), 
      offset: parseInt(offset),
    });

    return res.json({
      totalItems: services.count, 
      totalPages: Math.ceil(services.count / limit),
      currentPage: parseInt(page),
      data: services.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении услуг' });
  }
};

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

exports.createService = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    let imageUrl = null;

    if (req.files && req.files.imageUrl) {
      const file = req.files.imageUrl;
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, '..', 'static', fileName);
      await file.mv(filePath); 
      imageUrl = fileName;
    }

    const newService = await Service.create({
      title,
      description,
      price: price || null,
      imageUrl,
    });

    return res.status(201).json(newService);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при создании услуги', error });
  }
};

exports.updateService = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Услуга не найдена' });
    }

    let imageUrl = service.imageUrl;

    if (req.files && req.files.imageUrl) {
      const oldFilePath = path.resolve(__dirname, '..', 'static', service.imageUrl);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); 
      }

      const file = req.files.imageUrl;
      const newFileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, '..', 'static', newFileName);
      await file.mv(filePath); 
      imageUrl = newFileName;
    }

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

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Услуга не найдена' });
    }

    if (service.imageUrl) {
      const filePath = path.resolve(__dirname, '..', 'static', service.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); 
      }
    }

    await service.destroy();

    return res.status(200).json({ message: 'Услуга успешно удалена' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при удалении услуги', error });
  }
};
