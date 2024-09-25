import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { getServiceById } from '../services/api'; 
import { IMAGE_URL } from '../config';

function ServicesPage() {
  const { id } = useParams(); 
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        const serviceData = await getServiceById(id);
        setService(serviceData); 
      } catch (error) {
        setError("Ошибка при загрузке услуги.");
      } finally {
        setLoading(false); 
      }
    };

    loadService();
  }, [id]); 

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!service) {
    return <div>Услуга не найдена</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-3">{service.title}</h1>
          <div className="text-center mb-4">
            <img
              src={`${IMAGE_URL}${service.imageUrl}`}
              alt={service.title}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "auto", objectFit: "contain", width: "100%" }}
            />
          </div>


          <h3 className="text-center text-success mb-4">{service.price} ₽</h3>

          <p className="lead text-center">{service.description}</p>

          <p className="lead text-center">Подробную информацию можно узнать по телефону:

+7 921-422-21-96 с 10:00 до 18:00 с понедельника по пятницу.

Мы ждем вас в Зоопарке!</p>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
