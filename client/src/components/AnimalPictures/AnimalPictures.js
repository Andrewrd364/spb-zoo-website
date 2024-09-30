// src/components/AnimalPictures.js
import React, { useEffect, useState } from "react";
import { fetchAnimals } from "../../services/api"; 
import { IMAGE_URL } from "../../config"; 
import './AnimalPictures.css'; 

const delay = 5000; 
const fadeDuration = 2.5; 

const AnimalPictures = () => {
    const [animals, setAnimals] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false); 

    useEffect(() => {
        const getAnimals = async () => {
            try {
                const allAnimals = await fetchAnimals(1, "", 1000);
                setAnimals(allAnimals.data);
            } catch (error) {
                console.error("Ошибка при загрузке животных:", error);
            }
        };

        getAnimals();

        const intervalId = setInterval(() => {
            setIsTransitioning(true); 
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % animals.length);
                setIsTransitioning(false);
            }, fadeDuration * 1000); 
        }, delay);

        return () => clearInterval(intervalId); 
    }, [animals.length]);

    return (
        <div className="animal-slider">
            {animals.length > 0 && (
                <img
                    src={`${IMAGE_URL}${animals[currentIndex].imageUrl}`} 
                    alt={animals[currentIndex].name} 
                    className={`animal-image ${isTransitioning ? 'fade-out' : ''}`} 
                />
            )}
        </div>
    );
};

export default AnimalPictures;
