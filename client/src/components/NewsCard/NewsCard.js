/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NewsCard.css';
import { IMAGE_URL } from '../../config';

const NewsCard = ({ news }) => {
    const formattedDate = new Date(news.createdAt).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <Link to={`/news/${news.id}`} style={{ textDecoration: 'none' }}>
            <Card className="news-card mb-3 d-flex flex-row align-items-center">
                <div className="news-date">
                    {formattedDate}
                </div>

                <Card.Img 
                    variant="left" 
                    src={`${IMAGE_URL}${news.imageUrl}`} 
                    alt={news.title} 
                    className="news-image"
                />

                <Card.Body className="d-flex flex-column justify-content-center">
                    <Card.Title>{news.title}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default NewsCard;
