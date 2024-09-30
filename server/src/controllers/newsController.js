const { News, NewsCategory } = require('../models/models');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

exports.getAllNews = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query; 
  const offset = (page - 1) * limit;

  let whereClause = {};

  if (category) {
    const newsCategory = await NewsCategory.findByPk(category)
    if (newsCategory) {
      whereClause = { newsCategoryId: newsCategory.id };
    } else {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
  }

  try {
    const news = await News.findAndCountAll({
      where: whereClause,
      include: [{ model: NewsCategory, as: 'news_category' }], 
      limit: parseInt(limit), 
      offset: parseInt(offset), 
      order: [['createdAt', 'DESC']] 
    });

    res.json({
      total: news.count, 
      totalPages: Math.ceil(news.count / limit), 
      currentPage: parseInt(page),
      data: news.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении новостей', error });
  }
};

exports.createNews = async (req, res) => {
  const { title, content, category, animalId } = req.body;
  let imageUrl = null;

  try {
    if (req.files && req.files.imageUrl) {
      const img = req.files.imageUrl;
      const fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      imageUrl = fileName;
    }

    const newsCategory = await NewsCategory.findByPk(category);
    if (!newsCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    const news = await News.create({
      title,
      content,
      imageUrl,
      newsCategoryId: newsCategory.id,
      animalId: animalId || null 
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании новости', error });
  }
};

exports.updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, animalId } = req.body;
  let imageUrl = null;

  try {
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: 'Новость не найдена' });
    }

    const newsCategory = await NewsCategory.findByPk(category);
    if (!newsCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    if (req.files && req.files.imageUrl) {
      const oldImg = news.imageUrl;
      const img = req.files.imageUrl;
      const fileName = uuid.v4() + ".jpg";

      if (oldImg) {
        const oldImgPath = path.resolve(__dirname, '..', 'static', oldImg);
        if (fs.existsSync(oldImgPath)) {
          fs.unlinkSync(oldImgPath);
        }
      }

      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      imageUrl = fileName;
    }

    news.title = title || news.title;
    news.content = content || news.content;
    news.imageUrl = imageUrl || news.imageUrl;
    news.newsCategoryId = newsCategory.id;

    news.animalId = animalId || null;

    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении новости', error });
  }
};

exports.deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: 'Новость не найдена' });
    }

    if (news.imageUrl) {
      const imgPath = path.resolve(__dirname, '..', 'static', news.imageUrl);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await news.destroy();
    res.json({ message: 'Новость и изображение успешно удалены' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении новости', error });
  }
};

exports.getNewsById = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findByPk(id, {
      include: [{ model: NewsCategory, as: 'news_category' }] 
    });
    if (!news) {
      return res.status(404).json({ message: 'Новость не найдена' });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении новости', error });
  }
};
