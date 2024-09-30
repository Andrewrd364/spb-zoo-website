import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { fetchSouvenirs, fetchSouvenirCategories } from "../services/api";
import SouvenirCard from "../components/SouvenirCard/SouvenirCard";

function SouvenirsPage() {
  const [souvenirs, setSouvenirs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false); 
  const [limit] = useState(12); 
  const [currentOpen, setCurrentOpen] = useState(null);

  useEffect(() => {
    const loadSouvenirs = async () => {
      const souvenirData = await fetchSouvenirs(currentPage, categoryFilter, limit, inStockOnly);
      setSouvenirs(souvenirData.data);
      setTotalPages(souvenirData.totalPages);
    };

    const loadCategoryOptions = async () => {
      const categoryData = await fetchSouvenirCategories();
      setCategoryOptions(categoryData);
    };

    loadSouvenirs();
    loadCategoryOptions();
  }, [categoryFilter, currentPage, limit, inStockOnly]);

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCardClick = (id) => {
    setCurrentOpen(currentOpen === id ? null : id);
  };

  const toggleInStockOnly = () => {
    setInStockOnly(!inStockOnly);
    setCurrentPage(1); 
  };

  return (
    <div className="container mt-4">
      <h1 style={{ marginBottom: "50px" }}>Сувениры</h1>

          <Form>
            <Form.Group controlId="categoryFilter">
              <Form.Label>Фильтр по категории</Form.Label>
              <Row className="align-items-center mb-4">
              <Col xs={12} md={8}>
              <Form.Control
                as="select"
                value={categoryFilter}
                onChange={handleCategoryChange}
              >
                <option value="">Все категории</option>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </Form.Control>
              </Col>
              <Col xs={12} md={4} className="text-md-right mt-3 mt-md-0">

          <Button onClick={toggleInStockOnly} variant="primary">
            {inStockOnly ? "Показать все" : "Показать только в наличии"}
          </Button>
        </Col>
      </Row>
            </Form.Group>
          </Form>

      <Row className="mt-3 justify-content-center">
        {souvenirs.map((souvenir) => (
          <Col key={souvenir.id} xs={12} sm={6} md={4} lg={2} className="d-flex justify-content-center">
            <SouvenirCard
              souvenir={souvenir}
              onClick={() => handleCardClick(souvenir.id)}
              isOpen={currentOpen === souvenir.id}
            />
          </Col>
        ))}
      </Row>

      <div className="pagination mt-3 d-flex justify-content-center">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1"
        >
          Назад
        </Button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-1"
        >
          Вперед
        </Button>
      </div>
    </div>
  );
}

export default SouvenirsPage;
