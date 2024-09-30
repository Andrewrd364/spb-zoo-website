/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import './VacancyCard.css';

const VacancyCard = ({ vacancy, onClick, isOpen }) => {
    return (
        <div>
            <Card 
                className="vacancy-card mb-3 d-flex flex-column" 
                onClick={onClick} 
                style={{ cursor: 'pointer' }} 
            >
                <Card.Body>
                    <Card.Title>{vacancy.name}</Card.Title>
                    <Collapse in={isOpen}>
                        <div className="description">
                            <Card.Text>
                                {vacancy.content.split('\n').map((line, index) => (
                                    <p key={index} style={{ marginBottom: '10px' }}>
                                        {line}
                                    </p>
                                ))}
                            </Card.Text>
                        </div>
                    </Collapse>
                </Card.Body>
            </Card>
        </div>
    );
};

export default VacancyCard;
