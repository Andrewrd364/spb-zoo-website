import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { fetchVacancies } from "../services/api"; 
import VacancyCard from "../components/VacancyCard/VacancyCard"; 

function VacanciesPage() {
    const [vacancies, setVacancies] = useState([]);
    const [openVacancyId, setOpenVacancyId] = useState(null); 

    useEffect(() => {
        const loadVacancies = async () => {
            const vacancyData = await fetchVacancies();
            setVacancies(vacancyData.data);
        };

        loadVacancies();
    }, []);

    const handleVacancyClick = (id) => {
        setOpenVacancyId(openVacancyId === id ? null : id); 
    };

    return (
        <div className="container mt-4">
            <h1 style={{ marginBottom: '50px' }}>Вакансии</h1>

            <Row className="mt-3">
                {vacancies.map((vacancy) => (
                    <Col key={vacancy.id} xs={12}>
                        <VacancyCard 
                            vacancy={vacancy} 
                            onClick={() => handleVacancyClick(vacancy.id)} 
                            isOpen={openVacancyId === vacancy.id} 
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default VacanciesPage;
