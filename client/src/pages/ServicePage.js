import React from 'react';
import { useParams } from 'react-router-dom';

const ServicePage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Услуга {id}</h2>
      {/* Здесь может быть дополнительная логика для отображения информации об услуге */}
    </div>
  );
};

export default ServicePage;
