import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { fetchAnimals, fetchSpeciesOptions } from "../services/api"; // Adjust the path as needed
import AnimalCard from "../components/AnimalCard/AnimalCard"; // Import your AnimalCard component

function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [speciesFilter, setSpeciesFilter] = useState(""); // For filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [speciesOptions, setSpeciesOptions] = useState([]); // For species selection
  const [limit] = useState(8); // Количество животных на странице

  // Загружаем животных и список видов при изменении страницы или фильтра
  useEffect(() => {
    const loadAnimals = async () => {
      const animalData = await fetchAnimals(currentPage, speciesFilter, limit); // Передаем limit
      setAnimals(animalData.data); // Use the correct data path
      setTotalPages(animalData.totalPages);
    };

    const loadSpeciesOptions = async () => {
      const speciesData = await fetchSpeciesOptions();
      setSpeciesOptions(speciesData); // Set species options directly
    };

    loadAnimals();
    loadSpeciesOptions();
  }, [speciesFilter, currentPage, limit]);

  const handleSpeciesChange = (event) => {
    setSpeciesFilter(event.target.value); // Update species filter
    setCurrentPage(1); // Reset page on filter change
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mt-4">
      <h1 style={{ marginBottom: '50px' }}>Животные</h1>

      {/* Filter Form */}
      <Form>
        <Form.Group controlId="speciesFilter">
          <Form.Label>Фильтр по виду</Form.Label>
          <Form.Control
            as="select"
            value={speciesFilter}
            onChange={handleSpeciesChange}
          >
            <option value="">Все виды</option>
            {speciesOptions.map((species) => (
              <option key={species.id} value={species.id}>
                {species.species}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>

      {/* Display Animal Cards */}
      <Row className="mt-3">
        {" "}
        {/* Add margin top */}
        {animals.map((animal) => (
          <Col key={animal.id} xs={12} sm={6} md={4} lg={3}>
            {" "}
            {/* Adjust column sizes */}
            <AnimalCard animal={animal} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
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

export default AnimalsPage;
