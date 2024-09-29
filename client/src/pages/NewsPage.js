import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import NewsCard from "../components/NewsCard/NewsCard";
import { fetchNews, fetchNewsCategories } from "../services/api"; 

function NewsPage() {
  const [newsList, setNewsList] = useState([]); // Список новостей
  const [categories, setCategories] = useState([]); // Список категорий
  const [selectedCategory, setSelectedCategory] = useState(""); // Выбранная категория

  // Загружаем новости и категории при загрузке страницы или при изменении категории
  useEffect(() => {
    const loadNews = async () => {
      try {
        // Получаем все новости с учетом текущей категории
        const newsData = await fetchNews(selectedCategory);
        setNewsList(newsData.data); // Устанавливаем список новостей
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const loadCategories = async () => {
      try {
        // Загружаем категории новостей
        const categoriesData = await fetchNewsCategories();
        setCategories(categoriesData); // Устанавливаем список категорий
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadNews(); // Загружаем новости
    loadCategories(); // Загружаем категории
  }, [selectedCategory]); // Перезагрузка при изменении категории

  // Обработчик изменения категории в фильтре
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Устанавливаем выбранную категорию
  };

  return (
    <div className="container mt-4">
      <h1 style={{ marginBottom: '50px' }}>Новости</h1>

      {/* Фильтр по категориям */}
      <Form className="mb-4">
        <Form.Group controlId="newsCategoryFilter">
          <Form.Label>Фильтр по категории</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {/* Опция для всех категорий */}
            <option value="">Все категории</option>
            {/* Отображаем категории, загруженные из API */}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>

      {/* Отображение новостей */}
      <Row>
        {newsList.map((news) => (
          <Col xs={12} key={news.id} className="mb-3">
            <NewsCard news={news} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default NewsPage;
