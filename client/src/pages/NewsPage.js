import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import NewsCard from "../components/NewsCard/NewsCard"
import { fetchNews, fetchNewsCategories } from "../services/api"; 

function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadNews = async () => {
      const newsData = await fetchNews(currentPage, selectedCategory);
      setNewsList(newsData.data);
      setTotalPages(newsData.totalPages);
    };

    const loadCategories = async () => {
      const categoriesData = await fetchNewsCategories();
      setCategories(categoriesData);
    };

    loadNews();
    loadCategories();
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="container mt-4">
      <h1>Новости</h1>

      {/* Фильтр по категориям */}
      <Form className="mb-4">
        <Form.Group controlId="newsCategoryFilter">
          <Form.Label>Фильтр по категории</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Все категории</option>
            {categories.map((category) => (
              <option key={category.id} value={category.category}>
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

      {/* Пагинация */}
      <div className="pagination mt-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn btn-primary mx-1 ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
