/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './EventCard.css';
import { IMAGE_URL } from '../../config';

const EventCard = ({ event }) => {
    const formattedDate = new Date(event.date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <Link to={`/event/${event.id}`} style={{ textDecoration: 'none' }}>
            <Card className="event-card mb-3 d-flex flex-row align-items-center">
                <div className="event-date">
                    {formattedDate}
                </div>

                <Card.Img 
                    variant="left" 
                    src={`${IMAGE_URL}${event.imageUrl}`} 
                    alt={event.title} 
                    className="event-image"
                />

                <Card.Body className="d-flex flex-column justify-content-center">
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.price ? `${event.price}₽` : 'Бесплатно'}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default EventCard;
