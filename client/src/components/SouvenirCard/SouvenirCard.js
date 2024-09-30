/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import { IMAGE_URL } from '../../config';
import './SouvenirCard.css'; 

const SouvenirCard = ({ souvenir, onClick, isOpen }) => {
    return (
        <div className="souvenir-card-container">
            <Card 
                className="souvenir-card mb-3 d-flex flex-column" 
                onClick={onClick} 
                style={{ cursor: 'pointer' }} 
            >
                <Card.Img 
                    variant="top" 
                    src={`${IMAGE_URL}${souvenir.imageUrl}`} 
                    alt={souvenir.name} 
                    className="souvenir-image"
                />
                <Card.Body className="souvenir-body">
                    <Card.Title>{souvenir.name}</Card.Title>
                    <Card.Text className="souvenir-status" style={{ color: souvenir.inStock ? 'green' : 'red' }}>
                        {souvenir.inStock ? "В наличии" : "Нет в наличии"}
                    </Card.Text>
                    <Collapse in={isOpen}>
                        <div className="description-overlay">
                            <Card.Body>
                                <Card.Text>{souvenir.description}</Card.Text>
                            </Card.Body>
                        </div>
                    </Collapse>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SouvenirCard;
