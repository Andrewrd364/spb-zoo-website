/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import './VacancyCard.css'; // Import CSS for the card

const VacancyCard = ({ vacancy, onClick, isOpen }) => {
    return (
        <div>
            <Card 
                className="vacancy-card mb-3 d-flex flex-column" 
                onClick={onClick} // Toggle state on click
                style={{ cursor: 'pointer' }} 
            >
                <Card.Body>
                    <Card.Title>{vacancy.name}</Card.Title>
                    {/* Collapse for description */}
                    <Collapse in={isOpen}>
                        <div className="description">
                            <Card.Text>{vacancy.content}</Card.Text>
                        </div>
                    </Collapse>
                </Card.Body>
            </Card>
        </div>
    );
};

export default VacancyCard;
