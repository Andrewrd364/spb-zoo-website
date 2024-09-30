/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './AnimalCard.css'; 
import { IMAGE_URL } from '../../config';

const AnimalCard = ({ animal }) => {
    return (
        <Link to={`/animals/${animal.id}`} style={{ textDecoration: 'none' }}>
            <Card className="animal-card mb-3 d-flex flex-column"> 
                <Card.Img 
                    variant="top" 
                    src={`${IMAGE_URL}${animal.imageUrl}`} 
                    alt={animal.name} 
                    style={{ objectFit: 'cover', height: '200px' }} 
                />
                <Card.Body>
                    <Card.Title>{animal.name}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default AnimalCard;
