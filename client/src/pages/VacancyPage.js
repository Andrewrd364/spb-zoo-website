import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { fetchVacancies } from "../services/api"; // Ensure the path is correct
import VacancyCard from "../components/VacancyCard/VacancyCard"; // Import the VacancyCard component

function VacanciesPage() {
    const [vacancies, setVacancies] = useState([]);
    const [openVacancyId, setOpenVacancyId] = useState(null); // State for open vacancy

    // Load vacancies when the page loads
    useEffect(() => {
        const loadVacancies = async () => {
            const vacancyData = await fetchVacancies();
            setVacancies(vacancyData.data);
        };

        loadVacancies();
    }, []);

    const handleVacancyClick = (id) => {
        setOpenVacancyId(openVacancyId === id ? null : id); // Toggle open vacancy
    };

    return (
        <div className="container mt-4">
            <h1 style={{ marginBottom: '50px' }}>Вакансии</h1>

            {/* Display Vacancy Cards */}
            <Row className="mt-3">
                {vacancies.map((vacancy) => (
                    <Col key={vacancy.id} xs={12}>
                        <VacancyCard 
                            vacancy={vacancy} 
                            onClick={() => handleVacancyClick(vacancy.id)} 
                            isOpen={openVacancyId === vacancy.id} // Check if this vacancy is open
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default VacanciesPage;
