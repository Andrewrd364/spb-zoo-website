const {AnimalSpecies } = require('../models/models.js');

exports.getAllSpecies = async (req, res) => {
    try {
      const species = await AnimalSpecies.findAll();
      return res.json(species);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Произошла ошибка при получении видов животных' });
    }
  };
  
  exports.getSpeciesById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const species = await AnimalSpecies.findByPk(id);
      if (!species) {
        return res.status(404).json({ message: 'Вид животных не найден' });
      }
      return res.json(species);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Произошла ошибка при получении вида животных' });
    }
  };
  
  exports.createSpecies = async (req, res) => {
    const { species } = req.body;
  
    try {
      const newSpecies = await AnimalSpecies.create({ species });
      return res.status(201).json(newSpecies);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Произошла ошибка при создании нового вида животных' });
    }
  };
  
  exports.updateSpecies = async (req, res) => {
    const { id } = req.params;
    const { species } = req.body;
  
    try {
      const updatedSpecies = await AnimalSpecies.update({ species }, { where: { id } });
  
      if (updatedSpecies[0] === 0) {
        return res.status(404).json({ message: 'Вид животных не найден или не обновлен' });
      }
  
      return res.json({ message: 'Вид животных успешно обновлен' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Произошла ошибка при обновлении вида животных' });
    }
  };
  
  exports.deleteSpecies = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedSpecies = await AnimalSpecies.destroy({ where: { id } });
  
      if (!deletedSpecies) {
        return res.status(404).json({ message: 'Вид животных не найден' });
      }
  
      return res.json({ message: 'Вид животных успешно удален' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Произошла ошибка при удалении вида животных' });
    }
  };