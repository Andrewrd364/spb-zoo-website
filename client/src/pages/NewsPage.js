import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import NewsCard from "../components/NewsCard/NewsCard";
import { fetchNews, fetchNewsCategories } from "../services/api"; 

function NewsPage() {
  const [newsList, setNewsList] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(""); 

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNews(selectedCategory);
        setNewsList(newsData.data); 
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const loadCategories = async () => {
      try {
        const categoriesData = await fetchNewsCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadNews(); 
    loadCategories(); 
  }, [selectedCategory]); 

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); 
  };

  return (
    <div className="container mt-4">
      <h1 style={{ marginBottom: '50px' }}>Новости</h1>

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
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>

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
