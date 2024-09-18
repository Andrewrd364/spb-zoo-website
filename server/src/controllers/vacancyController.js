const { Vacancy } = require('../models/models'); // Подключение модели Vacancy

// Получение всех вакансий с пагинацией
exports.getAllVacancies = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Страница и лимит по умолчанию
  const offset = (page - 1) * limit;

  try {
    const vacancies = await Vacancy.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    return res.json({
      totalItems: vacancies.count, // Общее количество вакансий
      totalPages: Math.ceil(vacancies.count / limit), // Общее количество страниц
      currentPage: parseInt(page), // Текущая страница
      data: vacancies.rows // Список вакансий
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении вакансий' });
  }
};

// Получение одной вакансии по ID
exports.getVacancyById = async (req, res) => {
  const { id } = req.params;

  try {
    const vacancy = await Vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Вакансия не найдена' });
    }

    return res.json(vacancy);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении вакансии' });
  }
};

// Создание новой вакансии
exports.createVacancy = async (req, res) => {
  const { name, content } = req.body;

  try {
    const newVacancy = await Vacancy.create({ name, content });
    return res.status(201).json(newVacancy);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при создании вакансии' });
  }
};

// Обновление вакансии
exports.updateVacancy = async (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;

  try {
    const vacancy = await Vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Вакансия не найдена' });
    }

    vacancy.name = name;
    vacancy.content = content;
    await vacancy.save();

    return res.json(vacancy);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при обновлении вакансии' });
  }
};

// Удаление вакансии
exports.deleteVacancy = async (req, res) => {
  const { id } = req.params;

  try {
    const vacancy = await Vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Вакансия не найдена' });
    }

    await vacancy.destroy();
    return res.json({ message: 'Вакансия успешно удалена' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при удалении вакансии' });
  }
};
