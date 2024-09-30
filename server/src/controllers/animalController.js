const { Animal, AnimalSpecies, News, Event } = require('../models/models.js');
const uuid = require('uuid')
const path = require('path');
const fs = require('fs');

exports.getAllAnimals = async (req, res) => {
  const { page = 1, limit = 10, species } = req.query; 
  const offset = (page - 1) * limit;

  let whereCondition = {};
  if (species) {
    whereCondition = { speciesId: species }; 
  }

  try {
    const animals = await Animal.findAndCountAll({
      where: whereCondition, 
      include: [
        { model: AnimalSpecies, as: 'species' } 
      ],
      order: [['id', 'ASC']],
      limit: parseInt(limit), 
      offset: parseInt(offset) 
    });

    return res.json({
      totalItems: animals.count, 
      totalPages: Math.ceil(animals.count / limit), 
      currentPage: parseInt(page), 
      data: animals.rows 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении животных' });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id, {
      include: [
        { model: AnimalSpecies, as: 'species' }, 
        { model: News, as: 'news' }, 
        { model: Event, as: 'events' } 
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

exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);

    if (!animal) {
      return res.status(404).json({ error: 'Animal not found' });
    }

    let { name, latinName, description, food, habitat, speciesId } = req.body;
    let fileName = animal.imageUrl; 

    if (req.files && req.files.imageUrl) {
      const { imageUrl } = req.files;

      if (fileName) {
        const oldFilePath = path.resolve(__dirname, '..', 'static', fileName);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      fileName = uuid.v4() + ".jpg";
      const newFilePath = path.resolve(__dirname, '..', 'static', fileName);
      await imageUrl.mv(newFilePath); 
    }

    await animal.update({
      name,
      latinName,
      description,
      food,
      habitat,
      speciesId,
      imageUrl: fileName 
    });

    res.status(200).json(animal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update animal' });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    
    if (!animal) {
      return res.status(404).json({ error: 'Animal not found' });
    }

    const imageUrl = animal.imageUrl;
    if (imageUrl) {
      const filePath = path.resolve(__dirname, '..', 'static', imageUrl);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); 
      }
    }

    await animal.destroy();

    res.status(200).json({ message: 'Animal and image deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete animal' });
  }
};
