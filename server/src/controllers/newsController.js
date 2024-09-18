const { News, NewsCategory } = require('../models/models');

// Получить все новости с пагинацией и фильтрацией по категории
exports.getAllNews = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query; // Параметры для пагинации и фильтрации
  const offset = (page - 1) * limit;

  let whereClause = {};

  // Если категория указана, добавляем её в запрос
  if (category) {
    const newsCategory = await NewsCategory.findOne({ where: { category } });
    if (newsCategory) {
      whereClause = { newsCategoryId: newsCategory.id };
    } else {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
  }

  try {
    const news = await News.findAndCountAll({
      where: whereClause,
      include: [{ model: NewsCategory, as: 'news_category' }], // Включаем категорию в ответ
      limit: parseInt(limit), // Количество записей на странице
      offset: parseInt(offset), // Смещение для выборки
      order: [['createdAt', 'DESC']] // Сортировка по дате создания
    });

    res.json({
      total: news.count, // Общее количество новостей
      totalPages: Math.ceil(news.count / limit), // Общее количество страниц
      currentPage: parseInt(page),
      data: news.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении новостей', error });
  }
};

// Создать новость
exports.createNews = async (req, res) => {
  const { title, content, imageUrl, category } = req.body;

  try {
    const newsCategory = await NewsCategory.findOne({ where: { category } });
    if (!newsCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    const news = await News.create({
      title,
      content,
      imageUrl,
      newsCategoryId: newsCategory.id
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании новости', error });
  }
};

// Обновить новость
exports.updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, imageUrl, category } = req.body;

  try {
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: 'Новость не найдена' });
    }

    const newsCategory = await NewsCategory.findOne({ where: { category } });
    if (!newsCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    news.title = title;
    news.content = content;
    news.imageUrl = imageUrl;
    news.newsCategoryId = newsCategory.id;

    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении новости', error });
  }
};

// Удалить новость
exports.deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: 'Новость не найдена' });
    }

    await news.destroy();
    res.json({ message: 'Новость удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении новости', error });
  }
};

// Получить новость по id
exports.getNewsById = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findByPk(id, {
      include: [{ model: NewsCategory, as: 'news_category' }] // Включаем категорию в ответ
    });
    if (!news) {
      return res.status(404).json({ message: 'Новость не найдена' });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении новости', error });
  }
};
